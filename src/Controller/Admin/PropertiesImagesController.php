<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;
use \ZipArchive;


/**
 * PropertiesImages Controller
 *
 * @property \App\Model\Table\PropertiesImagesTable $PropertiesImages
 */
class PropertiesImagesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Upload');
    }

    function beforeFilter(Event $event) {

        $this->Upload->fileVar = 'images';
        $this->Upload->uploadDir = 'uploads'.DS.Configure::read('ProperitiesImages.dir');
        $this->Upload->tmpDir = 'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.'tmp';

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
        $query = $this->PropertiesImages
            ->find('search', $this->request->query);


        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * View method
     *
     * @param string|null $id Properties Image id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }

        $data = $this->PropertiesImages->get($id, [
            'contain' => ['Properties']
        ]);
        $this->set('data', $data);
        $this->set('_serialize', ['data']);
    }

    /**
     * Download method
     *
     * @param string|null $id Properties Image id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function download($poperty_id = null)
    {
        if(empty($poperty_id))
        {
            return false;
        }


        $data = $this->PropertiesImages->findByPropertyId($poperty_id)->where(['active'=>1]);
        if($data){
            $zip = new ZipArchive();
            $zipnameRealName = $poperty_id.'_'.time().'.zip';
            $zipname = TMP.DS.$zipnameRealName;
                         
            if ($zip->open($zipname, ZipArchive::CREATE) === true) {
                           
                foreach ($data as $k => $row) {

                    if (file_exists(WWW_ROOT . $this->Upload->uploadDir .  DS . 'original' . DS . $row->image)) {

                        $zip->addFile(WWW_ROOT . $this->Upload->uploadDir . DS . 'original' . DS . $row->image, $poperty_id . '_' . $k . '_' . $row->ordered. '.jpg');
                    }
                }
                $zip->close();
            }
          //   echo $zip->file();
        }
       
        header('Content-Type: application/zip');
        header('Content-disposition: attachment; filename='.$zipnameRealName);
        header('Content-Length: ' . filesize($zipname));
        readfile($zipname);
        unlink($zipname);
        
        die();

    }
    
    public function downloadImage($imageId = null)
    {
        if(empty($imageId))
        {
            return false;
        }


        $data = $this->PropertiesImages->findById($imageId)->first();

        header('Content-Type: image/jpeg');
        header('Content-disposition: attachment; filename='. $data->property_id . '_' . $data->ordered. '.jpg');
        header('Content-Length: ' . filesize(WWW_ROOT . $this->Upload->uploadDir . DS . 'original' . DS . $data->image));
        echo file_get_contents(WWW_ROOT . $this->Upload->uploadDir . DS . 'original' . DS . $data->image);
        die();

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
                set_time_limit (1000000);
                $success=true;
                $start=0;
                $uploaded='';
                //kikérdezzük mi volt a legnagyobb sorrend szám
                $query = $this->PropertiesImages->find()->where(['property_id'=>$this->request->data['property_id'], 'active' => (!empty($this->request->data['active'])?$this->request->data['active']:0)]);
                $max = $query->select(['max_order' => $query->func()->max('ordered')])->first();

                if(!empty($max->max_order)){
                    $start = $max->max_order+1;
                }
                $query = $this->PropertiesImages->find()->where(['property_id'=>$this->request->data['property_id'], 'active' => (!empty($this->request->data['active'])?$this->request->data['active']:0)]);
                $query->select(['max_size' => $query->func()->max('size')]);

                $variations=$this->PropertiesImages->Properties->PropertiesVariations->find('list')->where(['property_id' => $this->request->data['property_id']])->toArray();
                $ids=$this->request->data['property_id'];
                foreach($variations as $variation){
                    $ids.='_'.$variation;
                }

                $savedId = $this->request->data['property_id'];
                $roundcheck = $savedId % 1000;
                $thousand = floor($savedId / 1000);
                $folder = sprintf("%03d",$roundcheck);
                $parentfolder = sprintf("%04d",$thousand);

                $dir = WWW_ROOT.$this->Upload->uploadDir;

                if(!is_dir($dir))
                {
                    mkdir($dir,0755);
                }
                if(!is_dir($dir.DS.'tmp'))
                {
                    mkdir($dir.DS.'tmp',0755);
                }
                foreach($files as $k=>$oneimage){
                    $main=0;
                    $filename=$ids.'_'.time().rand(1000,9999).'.jpg';

                    if(copy($oneimage['tmp'], $dir.DS.'tmp'.DS.$filename)){
                        //If no main image, set this one
                        if(!empty($this->request->data['active']) and $this->request->data['active']==1)
                        {
                            $query = $this->{$this->modelClass}->find('all', [
                                'conditions' => ['main' => '1', 'property_id'=>$this->request->data['property_id']]
                            ]);
                            $row = $query->first();
                            if(empty($row))
                            {
                                $main=1;
                            }
                        }
                        $data=[
                            'property_id'=>$this->request->data['property_id'],
                            'image'=>DS.$parentfolder.DS.$folder.DS.$filename,
                            'active'=>(!empty($this->request->data['active'])?$this->request->data['active']:0),
                            'original_name' => $oneimage['filename'],
                            'main'=>$main,
                            'ordered'=>$start+$k
                        ];
                        $uploaded.=$oneimage['filename'].' ';
                        $save=$this->{$this->modelClass}->newEntity($data);
                        if ($this->{$this->modelClass}->save($save)) {
                            //Create variations of the image. Readed from config file.
                            if(Configure::read('ProperitiesImages.sizes'))
                            {
                                foreach(Configure::read('ProperitiesImages.sizes') as $process=>$oneSize)
                                {
                                    if(!is_dir($dir.DS.$oneSize['dir']))
                                    {
                                        mkdir($dir.DS.$oneSize['dir'],0755);
                                    }
                                    if(!is_dir($dir.DS.$oneSize['dir'].DS.$parentfolder))
                                    {
                                        mkdir($dir.DS.$oneSize['dir'].DS.$parentfolder,0755);
                                    }
                                    if(!is_dir($dir.DS.$oneSize['dir'].DS.$parentfolder.DS.$folder))
                                    {
                                        mkdir($dir.DS.$oneSize['dir'].DS.$parentfolder.DS.$folder,0755);
                                    }
                                    $this->{$this->modelClass}->processImage(
                                        $dir.DS.'tmp'.DS.$filename,
                                        $dir.DS.$oneSize['dir'].DS.$parentfolder.DS.$folder.DS.$filename,
                                        ['jpeg_quality' => 60],
                                        [
                                            $oneSize['process'] => [
                                                'height' => (!empty($oneSize['height'])?$oneSize['height']:null),
                                                'width' => (!empty($oneSize['width'])?$oneSize['width']:null),
                                                'size' => (!empty($oneSize['size'])?$oneSize['size']:null),
                                                'mode' => (!empty($oneSize['mode'])?$oneSize['mode']:null)
                                            ],
                                        ]
                                    );
                                }
                            }
                        }else{
                            $success=false;
                        }
                        unlink($dir.DS.'tmp'.DS.$filename);
                    }else{
                        $success=false;
                    }





                }

                //do something if faliled?
                $this->EventHandler->add(
                    array(
                        'user_id'=>$this->Auth->user('id'),
                        'controller' => 'PropertiesImages',
                        'link_model'=>'Properties',
                        'link_model_id'=> $this->request->data['property_id'],
                        'note' => $uploaded,
                    )
                );

                $this->set([
                    'success'=>$success,
                    'data'=>$files,
                    'errors'=>$this->Upload->errors,
                    'message'=>__('Képek feltöltése sikeres')

                ]);
            }else{

                $this->set([
                    'success'=>true,
                    'data'=>$files,
                    'errors'=>$this->Upload->errors,
                    'message'=>__('Képek feltöltése sikertelen')

                ]);
            }
        }

        $properties = $this->PropertiesImages->Properties->find('list', ['limit' => 200]);

        $this->set(compact('data', 'properties'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Properties Image id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {

        $ret=$this->_saveData($id,__('PropertiesImages módosítása sikeres volt!'),__('PropertiesImages módosítás!'),['action' => 'index'],false,[]);

        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']

        ]);

        if ($this->request->is(['patch', 'post', 'put'])) {

            $imageData = $this->request->data;
            if(isset($imageData['originalPos'])) {
                if ($imageData['ordered'] > $imageData['originalPos']) {
                    $this->PropertiesImages->updateAll(['ordered = ordered - 1'],
                        [
                            'property_id' => $imageData['property_id'],
                            'ordered >=' => $imageData['originalPos'],
                            'ordered <=' => $imageData['ordered'],
                            '`deleted` IS' => NULL,
                            'id !=' => $id
                        ]);
                } else {
                    $this->PropertiesImages->updateAll(['ordered = ordered + 1'],
                        [
                            'property_id' => $imageData['property_id'],
                            'ordered >=' => $imageData['ordered'],
                            'ordered <=' => $imageData['originalPos'],
                            '`deleted` IS' => NULL,
                            'id !=' => $id
                        ]);
                }
            }
            //főkép beállítás ha nincsen
            $this->PropertiesImages->updateAll(['main'=>0],
                [
                    'property_id' => $ret['data']['property_id'],
                    'active' => 1
                ]);

            $mainNewImgage = $this->PropertiesImages->find()->where(['property_id' => $ret['data']['property_id'], 'active' => 1])->order(['ordered' => 'ASC'])->first();
            $mainNewImgage->main =1;
            $this->PropertiesImages->save($mainNewImgage);
        }

        $this->set(compact('data'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Properties Image id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->PropertiesImages->get($id);
        $ret=$this->_deleteData($data,__('PropertiesImages delete success!'),__('PropertiesImages delete failed!'));

        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']

        ]);

        if(Configure::read('ProperitiesImages.sizes'))
        {
            foreach(Configure::read('ProperitiesImages.sizes') as $process=>$oneSize)
            {
                if(file_exists(WWW_ROOT.$this->Upload->uploadDir.DS.$oneSize['dir'].DS.$data->image)){
                    unlink(WWW_ROOT.$this->Upload->uploadDir.DS.$oneSize['dir'].DS.$data->image);
                }
            }
        }
        //főkép beállítás ha nincsen
        $this->PropertiesImages->updateAll(['main'=>0],
            [
                'property_id' => $ret['data']['property_id'],
                'active' => 1
            ]);

        $mainNewImgage = $this->PropertiesImages->find()->where(['property_id' => $data['property_id'], 'active' => 1])->order(['ordered' => 'ASC'])->first();
        if($mainNewImgage) {
            $mainNewImgage->main = 1;
            $this->PropertiesImages->save($mainNewImgage);
        }

        $this->set(compact('data'));
        $this->set('_serialize', ['data','success','errors', 'message']);

    }
    
    public function delete_all()
    {

        $this->request->allowMethod(['post', 'delete']);
        $data = $this->PropertiesImages->findByPropertyId($this->request->data['property_id']);
        if($data){
            foreach($data as $row){
                $ret=$this->_deleteData($row,__('PropertiesImages delete success!'),__('PropertiesImages delete failed!')); 
                if(Configure::read('ProperitiesImages.sizes'))
                {
                    foreach(Configure::read('ProperitiesImages.sizes') as $process=>$oneSize)
                    {
                        unlink(WWW_ROOT.$this->Upload->uploadDir.DS.$oneSize['dir'].DS.$row->image);
                    }
                }                   
            }
        }
        
        $this->set([
            'success'=>true,
            'data'=>'',
            'errors'=>'',
            'message'=> 'Képek sikeresen törölve!'

        ]);

        $this->set(compact('data'));
        $this->set('_serialize', ['data','success','errors', 'message']);

    }    
}
