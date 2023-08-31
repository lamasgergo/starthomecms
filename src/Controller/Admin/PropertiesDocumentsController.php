<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\Filesystem\File;

/**
 * PropertiesDocuments Controller
 *
 * @property \App\Model\Table\PropertiesDocumentsTable $PropertiesDocuments
 */
class PropertiesDocumentsController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Upload');
    } 
    
    function beforeFilter(Event $event) {

        $this->Upload->fileVar = 'documents';
        $this->Upload->uploadDir = 'uploads'.DS.Configure::read('ProperitiesDocuments.dir'); 
        $this->Upload->tmpDir = 'uploads'.DS.Configure::read('ProperitiesDocuments.dir').DS.'tmp'; 
 
    }  
            
    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {

        //Sorter part
        if(!empty($this->request->query['sort']) and is_array(json_decode($this->request->query['sort'])))
        {
            $sorter=json_decode($this->request->query['sort']);
            foreach($sorter as $onesort){
                $this->request->query['sort']=$onesort->property;
                $this->request->query['direction']=$onesort->direction;
            }
        }       

        //Search part
        $query = $this->PropertiesDocuments
            ->find('search', $this->request->query)
            ->contain([
                'Properties'
            ]
        );  
  

        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * View method
     *
     * @param string|null $id Properties Document id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->PropertiesDocuments->get($id, [
            'contain' => ['Properties']
        ]);
        $this->set('data', $data);
        $this->set('_serialize', ['data']);
    }
    
    /**
     * download method
     *
     * @param string|null $id Properties Document hash.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function download($hash = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['hash']))
        {
            $hash=$this->request->query['hash'];
        }    
    
        $data = $this->PropertiesDocuments->findByHash($hash)->first();

        $this->response->file(
            $this->Upload->uploadDir.DS.$data->property_id.DS.$data->file,
            ['download' => true, 'name' => $data->originalname]
        );  
        return $this->response;
    }    

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        if ($this->request->is(['patch', 'post', 'put'])) {
            $files=$this->Upload->upload();
            
            if(!empty($this->request->data['property_id']))
            {
                $success=true;
                $start=0;
                $dir=WWW_ROOT.$this->Upload->uploadDir.DS.$this->request->data['property_id'];
                if(!is_dir($dir))
                {
                    mkdir($dir,0766);
                }

                foreach($files as $k=>$onedoc){
                    $file = new File($onedoc['tmp']);
                    $filename=time().rand(1000,9999).'.'.$file->ext();
                    
                    if(copy($onedoc['tmp'], $dir.DS.$filename)){
                        
                        $data=[
                            'property_id' => $this->request->data['property_id'],
                            'title' => $this->request->data['title'],
                            'document_type' => $this->request->data['document_type'],
                            'file' => $filename,
                            'filetype' => $file->mime(),
                            'hash' => md5($onedoc['tmp']),
                            'active' => 1,
                            'originalname' => $onedoc['filename'],
                            'size' => $file->size()
                        ];  
                        $save=$this->{$this->modelClass}->newEntity($data); 
                        if ($this->{$this->modelClass}->save($save)) {                            

        
                        }else{
                            $success=false;
                        }
                    }else{
                        $success=false;
                    }

                }
                $this->set([
                    'success'=>$success,
                    'data'=>$files,
                    'errors'=>$this->Upload->errors,
                    'message'=>__('Dokumentumok feltöltése sikeres')
                    
                ]);              
            }else{

                $this->set([
                    'success'=>true,
                    'data'=>$files,
                    'errors'=>$this->Upload->errors,
                    'message'=>__('Dokumentumok feltöltése sikertelen')
                    
                ]);              
            }
        }else{
            $data=$this->{$this->modelClass}->newEntity();    
        }
        $properties = $this->PropertiesDocuments->Properties->find('list', ['limit' => 200]);
        $this->set(compact('data', 'properties'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Properties Document id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        
        $ret=$this->_saveData($id,__('Dokumentumok módosítása sikeres volt!'),__('Dokumentumok módosítás sikertelen volt!'),['action' => 'index'],false,[]);
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $properties = $this->PropertiesDocuments->Properties->find('list', ['limit' => 200]);
        $this->set(compact('data', 'properties'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Properties Document id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->PropertiesDocuments->get($id);
        $ret=$this->_deleteData($data,__('Dokumentum sikeresen törölve!'),__('Dokumentum törlés sikertelen!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]);         

        $this->set(compact('data'));
        $this->set('_serialize', ['data','success','errors', 'message']);        
        
    }
}
