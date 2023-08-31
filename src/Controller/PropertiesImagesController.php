<?php
namespace App\Controller;

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
        $this->Auth->allow(['index','tn', 'main']);
    }
    
    public function index()
    {
        Configure::write('debug', false);
        $this->theme =false;
        if(!empty($this->request->params['id'])){
                    //Search part
            $variation = $this->PropertiesImages->Properties->Rentvar->find('all')->where(['id'=>$this->request->params['id']])->first();
            if(empty($variation)) {
                $variation = $this->PropertiesImages->Properties->Sellvar->find('all')->where(['id' => $this->request->params['id']])->first();
            }
            if(empty($variation)){
                die('Missing property');
            }
            $data = $this->PropertiesImages
                ->find('all')->where(['property_id'=>$variation->property_id, 'active' => 1])->order(['ordered' => 'asc']);
            $this->set('data', $data);
            $this->set('property', $this->PropertiesImages->Properties->get($variation->property_id, [
            'contain' => ['Cities', 'Districts', 'Streets', 'Cityparts', 'Users', 'Contacts', 'Sellvar', 'Rentvar', 'PropertiesImages','PropertiesDocuments','PropertiesLayouts', 'Editor']
            ]));
        }
    }  
    
    public function main()
    {
        $data = $this->PropertiesImages->Properties
                ->find('all')->where(['id > ' => 16468]);
        foreach($data as $row){
            $count = $this->PropertiesImages
                ->findByPropertyId($row->id)->where(['main' => 1])->count();;  
    
                if($count == 0){
                    $setMain = $this->PropertiesImages
                        ->findByPropertyId($row->id)->where(['main' => 0])->order(['ordered' => 'asc'])->first() ;
                        if($setMain){
                            $setMain->main=1;
                            $setMain = $this->PropertiesImages->save($setMain);
                            echo  $row->id .'->'.$setMain->id.'<br>';
                        }
                }
        }
        die();
    }      
    
    public function tn($image)
    {
        $img = base64_decode(str_replace('.jpg','',$image));
        $imageContent = file_get_contents(WWW_ROOT.$img);
        $this->autoRender = false;
        $this->response->type('jpg');
        $this->response->body($imageContent);
    }       
   
}