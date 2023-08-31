<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * PropertiesLayouts Controller
 *
 * @property \App\Model\Table\PropertiesLayoutsTable $PropertiesLayouts
 */
class PropertiesLayoutsController extends AppController
{

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
        $query = $this->PropertiesLayouts
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
     * @param string|null $id Properties Layout id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->PropertiesLayouts->get($id, [
            'contain' => ['Properties']
        ]);
        $this->set('data', $data);
        $this->set('_serialize', ['data']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {

        //Check out if main layout is available, if not, set param main
        $savedMain=$this->PropertiesLayouts->find()->where(['property_id'=>$this->request->data['property_id'], 'main'=>1])->first();
        if(empty($savedMain)){
            $this->request->data['main']=1;    
        }elseif(!empty($savedMain) and isset($this->request->data['main']) and $this->request->data['main']==1){
            //if main saved but the edited set to main, the old main have to be set not main
            $this->PropertiesLayouts->updateAll(['main' => 0], ['property_id' => $this->request->data['property_id']]);
        }
        
        $ret=$this->_saveData(null,__('Elrendezés sikeresen létrehozva!'),__('Elrendezés létrehozása sikertelen volt!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
    
        $properties = $this->PropertiesLayouts->Properties->find('list', ['limit' => 200]);
        $this->set(compact('data', 'properties'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Properties Layout id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
    
        //Check out if main layout is available, if not, set param main
        $savedMain=$this->PropertiesLayouts->find()->where(['property_id'=>$this->request->data['property_id'], 'main'=>1])->first();
        if(empty($this->request->data['main']))$this->request->data['main']=0;
        if(empty($savedMain)){
            $this->request->data['main']=1;    
        }else if(!empty($savedMain) and $this->request->data['main']==1){
            //if main saved but the edited set to main, the old main have to be set not main
           $this->PropertiesLayouts->updateAll(['main' => 0], ['property_id' => $this->request->data['property_id']]);
        }elseif(!empty($savedMain) and $this->request->data['main']==0 and $savedMain->id=$this->request->data['id']){
           $this->request->data['main']=1; 
        }
                
        $ret=$this->_saveData($id,__('Az elrendezés módosítása sikeres volt!'),__('Az elrendezés módosítása sikertelen volt!'),['action' => 'index'],false,[]);
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $properties = $this->PropertiesLayouts->Properties->find('list', ['limit' => 200]);
        $this->set(compact('data', 'properties'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Properties Layout id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->PropertiesLayouts->get($id);
        $ret=$this->_deleteData($data,__('Elrendezés sikeresen törölve!'),__('Elrendezés tölése sikertelen volt!'));
        
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
