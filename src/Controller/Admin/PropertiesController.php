<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Database\Expression\QueryExpression;
use Cake\Event\Event;
use Cake\ORM\Query;
use Cake\ORM\TableRegistry;

/**
 * Properties Controller
 *
 * @property \App\Model\Table\PropertiesTable $Properties
 */
class PropertiesController extends AppController
{
    public $paginate = [
        'limit' => 1000,
        'sortWhitelist' => ['id','district_id', 'size_net','PropertiesLayouts.room','Streets.street','PropertiesVariations.id' ,'PropertiesVariations.price','PropertiesVariations.price_dev', 'date'], //these fields can be paginated
        'order' => ['id' => 'desc']
    ];

    /**
     * Index method
     *
     * @return void
     */
    function test(){
        $data=$this->{$this->modelClass}->get(53); 
       // var_dump($data->toArray());
        
         $this->EventHandler->add(array(
            'user_id'=>$this->Auth->user('id'),
            'link_model'=>'Properties',
            'link_model_id'=> $data['id'],
            'old_data' => $data->toArray(),
            'new_data' => $data->toArray()
            )
         );          
        
        /*
         $this->EventHandler->add(array(
            'type'=>1,
            'user_id'=>$this->Auth->user('id'),
            'link_model'=>'Properties',
            'link_model_id'=> '2',
            'note'=>'azigen!'
            )
         );
         */
        /*
            $data['city_id']=1;
            $data['street_id']=1;
            $data['user_id']=5;
            $data['contacts'] = [
                    ['phone1type' => '1','phone1' => '36203132224','user_id'=>5],
                    ['phone1type' => '1','phone1' => '36203132235','user_id'=>5]
                ];
            var_dump($data);      
            $ent = $this->{$this->modelClass}->newEntity($data,['associated'=>['Users','Contacts','PropertiesContacts']]);
            $ent = $this->{$this->modelClass}->patchEntity($ent, $data,['associated'=>['Users','Contacts','PropertiesContacts']]);
            $ret=$this->{$this->modelClass}->save($ent);        
            var_dump($ent->errors());
         */
    } 
     
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
        if(empty($this->request->query['active']) && empty($this->request->query['variation_id_search']) &&
            empty($this->request->query['variation_id']) && empty($this->request->query['ident']) &&
            empty($this->request->query['ids']) && empty($this->request->query['street'])  && empty($this->request->query['contact_name']) &&
            empty($this->request->query['city_id']) && empty($this->request->query['contact_phone']) && empty($this->request->query['contact_email']) &&
            empty($this->request->query['query'])
        )
        {
            $this->request->query['active'][]=1;
        }
        if(empty($this->request->query['cooffice']) && empty($this->request->query['ident']) && empty($this->request->query['ids']))
        {
            $this->request->query['cooffice']=0;
        }
        if(!empty($this->request->query['cooffice_all']))
        {
            unset($this->request->query['cooffice']);
        }
        if(!empty($this->request->query['ident']))
        {
            $this->request->query['ident']=explode(',',$this->request->query['ident']);    
        }

        if(!empty($this->request->query['ids']))
        {
            $this->request->query['ident']=explode(',',$this->request->query['ids']);    
        }
    
        if(!empty($this->request->query['variation_id']))
        {
            $this->request->query['variation_id']=explode(',',$this->request->query['variation_id']);
        }
        
        if(!empty($this->request->query['district_id']) || !empty($this->request->query['district_sort']))
        {
            unset($this->request->query['sort']);
            $this->paginate['order']=['district_id'=>'ASC', 'PropertiesVariations.id'=>'DESC'] ;
            //$this->request->query['variation_id']=explode(',',$this->request->query['variation_id']);
        }     
        
        if(!empty($this->request->query['sortIdent']))
        {
            unset($this->request->query['sort']);
            //$this->request->query['variation_id']=explode(',',$this->request->query['variation_id']);
        }

        if(empty($this->request->query['archived']))
        {
            $this->request->query['archived']=0;
        }

        if(!empty($this->request->query['selector']))
        {
           $this->paginate['fields']=[
                'Properties.id',
                'Properties.sell',
                'Properties.rent',
                'Properties.building_type',
                'Properties.size_net',
                'Properties.size_gross',
                'Properties.streetnum',
                'Properties.building',
                'Properties.note',
                'Properties.heat_type', 
                'Properties.parking',
                'Properties.cooffice',
                'Properties.created',
                'Properties.modified',
                'Properties.lastevent',
                'Properties.has_key',
                'Districts.district', 
                'Cityparts.citypart', 
                'Streets.street',
                'Mainimage.id',
                'Mainimage.property_id',
                'Mainimage.image',
                'Cities.city',
                'Owner.id',
                'Owner.phone1',
                'Owner.phone1type',
                'Owner.firstname',
                'Owner.lastname',
                'Owner.email1',
                'Contact.id',
                'Contact.phone1',
                'Contact.phone1type',
                'Contact.firstname',
                'Contact.lastname',
                'Contact.email1'
                ];            
            $query = $this->Properties
                ->find('search', $this->request->query)
                ->select(array(
                'Properties.id',
                'Properties.sell',
                'Properties.rent',
                'Properties.building_type',
                'Properties.size_net',
                'Properties.size_gross',
                'Properties.streetnum',
                'Properties.building',
                'Properties.note',
                'Properties.heat_type', 
                'Properties.parking',
                'Properties.cooffice',
                'Properties.created',
                'Properties.modified',
                'Properties.lastevent',
                'Properties.has_key',
                'Districts.district', 
                'Cityparts.citypart', 
                'Streets.street',
                'Mainimage.id',
                'Mainimage.property_id',
                'Mainimage.image',
                'Cities.city',
                'PropertiesVariations.id',
                'PropertiesVariations.type',
                'PropertiesVariations.price',
                'PropertiesVariations.price_dev',
                'PropertiesVariations.furniture_type',
                'PropertiesVariations.active',
                'PropertiesVariations.description',
                'PropertiesVariations.description_en',
                'PropertiesVariations.nocontract',
                'PropertiesVariations.enddate',
                'PropertiesVariations.gdn',
                'PropertiesVariations.ing_com',
                'Owner.id',
                'Owner.phone1',
                'Owner.firstname',
                'Owner.lastname',
                'Owner.email1',
                'Contact.id',
                'Contact.phone1',
                'Contact.firstname',
                'Contact.lastname',
                'Contact.email1'                
                )) 
                ->join([
                    'PropertiesContactsOwner' => [
                        'table' => 'properties_contacts',
                        'type' => 'LEFT',
                        'conditions' => ['PropertiesContactsOwner.property_id = Properties.id', 'PropertiesContactsOwner.main =1 ', 'PropertiesContactsOwner.type = 1 ' ],
                    ],
                    'Owner' => [
                        'table' => 'contacts',
                        'type' => 'LEFT',
                        'conditions' => 'Owner.id = PropertiesContactsOwner.contact_id',
                    ],
                    'PropertiesContactsContact' => [
                        'table' => 'properties_contacts',
                        'type' => 'LEFT',
                        'conditions' => ['PropertiesContactsContact.property_id = Properties.id', 'PropertiesContactsContact.main =1 ', 'PropertiesContactsContact.type = 2 ' ],
                    ],
                    'Contact' => [
                        'table' => 'contacts',
                        'type' => 'LEFT',
                        'conditions' => 'Contact.id = PropertiesContactsContact.contact_id',
                    ]                    
                ])                
                ->contain([
                    'Cities', 'Districts', 'Streets', 'Cityparts',  'Mainimage', 'PropertiesVariations'
                ]
            );              
        }elseif(!empty($this->request->query['alldata'])){
            $query = $this->Properties
                ->find('search', $this->request->query)
                ->contain([
                    'Cities', 'Districts', 'Streets', 'Cityparts', 'Users', 'Mainimage', 'Contacts', 'PropertiesVariations', 'PropertiesImages','PropertiesDocuments', 'PropertiesLayouts'
                ]); 

                if(!empty($this->request->query['sortIdent'])){
                    $query->order('FIELD(`PropertiesVariations__id`, "'.trim($this->request->query['sortIdent'],',').'")');
                }
         
        }else{
           $this->paginate['fields']=[
                'Properties.id',
                'Properties.sell',
                'Properties.rent',
                'Properties.building_type',
                'Properties.size_net',
                'Properties.size_gross',
                'Properties.streetnum',
                'Properties.building',
                'Properties.note',
                'Properties.heat_type', 
                'Properties.parking',
                'Properties.cooffice',
                'Properties.created',
                'Properties.modified',
                'Properties.lastevent',          
                'Properties.floor',          
                'Properties.door',   
                'Properties.has_key',       
                'Properties.archived',
                'Districts.district',
                'Cityparts.citypart', 
                'Streets.street',
                'Mainimage.id',
                'Mainimage.property_id',
                'Mainimage.image',
                'Cities.city',
                'PropertiesVariations.id',
                'PropertiesVariations.type',
                'PropertiesVariations.price',
                'PropertiesVariations.price_dev',
                'PropertiesVariations.furniture_type',
                'PropertiesVariations.active',
                'PropertiesVariations.description',
                'PropertiesVariations.description_en',
                'PropertiesVariations.nocontract',
                'PropertiesVariations.enddate',
                'PropertiesLayouts.id',
                'PropertiesLayouts.room',
                'PropertiesLayouts.halfroom',
                'PropertiesLayouts.livingroom',
                'PropertiesLayouts.american_kitchen',
                'PropertiesLayouts.eating_kitchen',
                'PropertiesLayouts.bathroom',
                'PropertiesVariations.gdn',
                'PropertiesVariations.ing_com',                
                'Owner.id',
                'Owner.phone1type',
                'Owner.phone1',
                'Owner.prename',
                'Owner.firstname',
                'Owner.lastname',
                'Owner.email1',
                'Contact.prename',
                'Contact.id',
                'Contact.phone1type',
                'Contact.phone1',
                'Contact.firstname',
                'Contact.lastname',
                'Contact.email1'
                ];   
            $query = $this->Properties
                ->find('search', $this->request->query) 
                ->join([
                    'PropertiesContactsOwner' => [
                        'table' => 'properties_contacts',
                        'type' => 'LEFT',
                        'conditions' => ['PropertiesContactsOwner.property_id = Properties.id', 'PropertiesContactsOwner.main =1 ', 'PropertiesContactsOwner.type = 1 ' ],
                    ],
                    'Owner' => [
                        'table' => 'contacts',
                        'type' => 'LEFT',
                        'conditions' => 'Owner.id = PropertiesContactsOwner.contact_id',
                    ],
                    'PropertiesContactsContact' => [
                        'table' => 'properties_contacts',
                        'type' => 'LEFT',
                        'conditions' => ['PropertiesContactsContact.property_id = Properties.id', 'PropertiesContactsContact.main =1 ', 'PropertiesContactsContact.type = 2 ' ],
                    ],
                    'Contact' => [
                        'table' => 'contacts',
                        'type' => 'LEFT',
                        'conditions' => 'Contact.id = PropertiesContactsContact.contact_id',
                    ]                    
                ])                
                ->contain([
                    'Cities', 
                    'Districts', 
                    'Streets', 
                    'Cityparts', 
                    'Mainimage', 
                    'PropertiesVariations',
                    'PropertiesLayouts'/*,
                    'Contact'=> function ($q) {
                            return $q->autoFields(false)->select(['id','lastname','firstname','phone1','email1','phone1note']);
                    },
                    'Owner'=> function ($q) {
                            return $q->autoFields(false)->select(['id','lastname','firstname','phone1','email1','phone1note']);
                    }   */
                   ]
                ); 

        }
        $this->set('total',$query->count());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas','total']);

        //Print request
        if(!empty($this->request->query['print']))
        {
            $this->layout='print';
            $this->render('index_print');
            
        }

        //Print request
        if(!empty($this->request->query['clipboard']))
        {
            $this->layout='clipboard';
            $this->render('index_print');

        }
    }

    /**
     * View method
     *
     * @param string|null $id Property id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if(!empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }
        $data = $this->Properties->get($id, [
            'contain' => ['Cities', 'Districts', 'Streets', 'Cityparts', 'Users', 'Contacts', 'Sellvar', 
            'Rentvar', 'PropertiesImages','PropertiesDocuments','PropertiesLayouts', 'PropertiesImagesAll', 'Mainimage',
            'Editor']
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
           
        $this->Properties->setUser($this->Auth->user('id'));
        
        if($this->request->is(['patch', 'post', 'put']))
        {
            if(!empty($this->request->data['rentvar'])){
                $this->request->data['rentvar']['nocontract'] = 1;    
            }
            
            if(!empty($this->request->data['sellvar'])){
                $this->request->data['sellvar']['nocontract'] = 1;    
            }            
            
            if(isset($this->request->data['contacts'][1]['dontsave']) and $this->request->data['contacts'][1]['dontsave']=='1')unset($this->request->data['contacts'][1]);
            if(empty($this->request->data['contacts'][0]['id']))$this->request->data['contacts'][0]['user_id']=$this->Auth->user('id');
            if(isset($this->request->data['contacts'][1]['dontsave']) and $this->request->data['contacts'][1]['dontsave']=='0' and empty($this->request->data['contacts'][1]['id']))$this->request->data['contacts'][1]['user_id']=$this->Auth->user('id');
            if(empty($this->request->data['contacts'][0]['id']))unset($this->request->data['contacts'][0]['id']);
            if(empty($this->request->data['contacts'][1]['id']))unset($this->request->data['contacts'][1]['id']);

            $ret=$this->_saveData(null,__('Ingatlan létrehozása sikeres volt!'),__('Ingatlan létrehozás sikertelen!'),null,null,['Users','Contacts','Sellvar','Rentvar', 'PropertiesLayouts'],['Users','Contacts','Contacts._joinData','Sellvar','Rentvar', 'PropertiesLayouts']);
            if($ret and $ret['success'])
            {                  
                //Event save if Property created
                $this->EventHandler->add(
                    array(
                        'user_id'=>$this->Auth->user('id'),
                        'link_model'=>'Properties',
                        'link_model_id'=> $ret['data']['id'],
                        'new_data' => $ret['data']->toArray()
                    ),
                    array(
                        'check_related'=>array('rentvar','sellvar')
                    )
                );  
                //Event save contact created
                if(!empty($ret['data']['contacts'][0]))
                {
                    $this->EventHandler->add(
                        array(
                            'user_id'=>$this->Auth->user('id'),
                            'controller' => 'Contacts',
                            'link_model'=>'Contacts',
                            'link_model_id'=> $ret['data']['contacts'][0]['id'],
                            'referer_model'=>'Properties',
                            'referer_model_id'=> $ret['data']['id'],                
                            'new_data' => $ret['data']['contacts'][0]->toArray()
                        )
                    );    
                }
                //Event save contact 1 change
                if(!empty($ret['data']['contacts'][1]))
                {        
                    $this->EventHandler->add(
                        array(
                            'user_id'=>$this->Auth->user('id'),
                            'controller' => 'Contacts',
                            'link_model'=>'Contacts',
                            'link_model_id'=> $ret['data']['contacts'][1]['id'],
                            'referer_model'=>'Properties',
                            'referer_model_id'=> $ret['data']['id'],                
                            'new_data' => $ret['data']['contacts'][1]->toArray()
                        )
                    );         
                }             
            }
            $this->set([
                'success'=>$ret['success'],
                'data'=>$ret['data'],
                'errors'=>$ret['errors'],
                'message'=>$ret['message']
                
            ]); 
        }else{
            $cities = $this->Properties->Cities->find('list', ['limit' => 200]);
            $districts = $this->Properties->Districts->find('list', ['limit' => 200]);
            $streets = $this->Properties->Streets->find('list', ['limit' => 200]);
            $cityparts = $this->Properties->Cityparts->find('list', ['limit' => 200]);
            $users = $this->Properties->Users->find('list', ['limit' => 200]);
            $contacts = $this->Properties->Contacts->find('list', ['limit' => 200]);   
        } 
        $this->set(compact('cities', 'districts', 'streets', 'cityparts', 'users', 'contacts'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Property id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        if($this->request->is(['patch', 'post', 'put']))
        {
            //if(isset($this->request->data['contacts'][1]['dontsave']) and $this->request->data['contacts'][1]['dontsave']=='1')unset($this->request->data['contacts'][1]);
            if(empty($this->request->data['contacts'][0]['id']))$this->request->data['contacts'][0]['user_id']=$this->Auth->user('id');
            if(isset($this->request->data['contacts'][1]['dontsave']) and $this->request->data['contacts'][1]['dontsave']=='0' and empty($this->request->data['contacts'][1]['id']))$this->request->data['contacts'][1]['user_id']=$this->Auth->user('id');
            if(empty($this->request->data['contacts'][0]['id']))unset($this->request->data['contacts'][0]['id']);
            if(empty($this->request->data['contacts'][1]['id']))unset($this->request->data['contacts'][1]['id']);
            if(empty($this->request->data['contacts'][1]['lastname']) &&
            empty($this->request->data['contacts'][1]['firstname']) &&
            empty($this->request->data['contacts'][1]['phone1'])&&
            empty($this->request->data['contacts'][1]['email1'])){
                unset($this->request->data['contacts'][1]);  
            }
            $this->request->data['now_editing_user_id'] = NULL;
            $this->request->data['now_editing_login_time'] = NULL;

            //$this->Properties->save($ret['data']);
            $ret=$this->_saveData($id,__('Ingatlan módosítása sikeres volt!'),__('Ingatlan módosítás sikertelen volt!'),['action' => 'index'],null,['Users','Contacts','Sellvar','Rentvar', 'PropertiesLayouts'],['Users','Contacts','Contacts._joinData','Sellvar','Rentvar', 'PropertiesLayouts']);
            if($ret and $ret['success'])
            {             
                //Ha contact módosítás volt be kell állítani a maint
                $properties_contacts = TableRegistry::get('PropertiesContacts');
                $filter_update['property_id'] = $ret['data']['id'];
                $filter_update[]['`contact_id` != '] = $ret['data']['contacts'][0]['id'];
                if(!empty($ret['data']['contacts'][1]['id'])){
                    $filter_update[]['`contact_id` != '] = $ret['data']['contacts'][1]['id'];    
                }
                $properties_contacts -> updateAll(['main' => 0], $filter_update);


                unset($ret['original_data']['now_editing_user_id'],$ret['original_data']['now_editing_login_time'],$ret['original_data']['islocked']);
                //Event save if Property changed
                $this->EventHandler->add(
                    array(
                        'user_id'=>$this->Auth->user('id'),
                        'link_model'=>'Properties',
                        'link_model_id'=> $ret['data']['id'],
                        'old_data' => $ret['original_data'],
                        'new_data' => $ret['data']->toArray()
                    ),
                    array(
                        'check_related'=>array('rentvar','sellvar')
                    )
                ); 
                 
                //Event save contact 0 change
                if(!empty($ret['data']['contacts'][0]))
                {
                    if(empty($ret['original_data']['contacts'][0]) and $ret['data']['contacts'][0]){
                        //New contact to the property
                        $this->EventHandler->add(
                            array(
                                'user_id'=>$this->Auth->user('id'),
                                'controller' => 'PropertiesContacts',
                                'action' => 'add',
                                'link_model'=>'Properties',
                                'link_model_id'=> $ret['data']['id'],
                                'referer_model'=>'Contacts',
                                'referer_model_id'=> $ret['data']['contacts'][0]['id']
                            )
                        );                 
                    }else{ 
                        if($ret['original_data']['contacts'][0]['id'] != $ret['data']['contacts'][0]['id']){                           
                            //Contact change
                            $this->EventHandler->add(
                                array(
                                    'user_id'=>$this->Auth->user('id'),
                                    'controller' => 'PropertiesContacts',
                                    'action' => 'edit',
                                    'link_model'=>'Properties',
                                    'link_model_id'=> $ret['data']['id'],
                                    'referer_model'=>'Contacts',
                                    'referer_model_id'=> $ret['data']['contacts'][0]['id']
                                )
                            );                     
                        }else{
                            $this->EventHandler->add(
                                array(
                                    'user_id'=>$this->Auth->user('id'),
                                    'controller' => 'Contacts',
                                    'link_model'=>'Contacts',
                                    'link_model_id'=> $ret['data']['contacts'][0]['id'],
                                    'referer_model'=>'Properties',
                                    'referer_model_id'=> $ret['data']['id'],                
                                    'old_data' => $ret['original_data']['contacts'][0],
                                    'new_data' => $ret['data']['contacts'][0]->toArray()
                                )
                            );                     
                        } 
                    }  
                }
                //Event save contact 1 change
                if(!empty($ret['data']['contacts'][1]))
                {     
                    if(empty($ret['original_data']['contacts'][1]) and $ret['data']['contacts'][1]){
                        //New contact to the property
                        $this->EventHandler->add(
                            array(
                                'user_id'=>$this->Auth->user('id'),
                                'controller' => 'PropertiesContacts',
                                'action' => 'add',
                                'link_model'=>'Properties',
                                'link_model_id'=> $ret['data']['id'],
                                'referer_model'=>'Contacts',
                                'referer_model_id'=> $ret['data']['contacts'][1]['id']
                            )
                        );                 
                    }else{
                        if($ret['original_data']['contacts'][0]['id'] != $ret['data']['contacts'][0]['id']){                           
                            //Contact change   
                            $this->EventHandler->add(
                                array(
                                    'user_id'=>$this->Auth->user('id'),
                                    'controller' => 'PropertiesContacts',
                                    'action' => 'edit',
                                    'link_model'=>'Properties',
                                    'link_model_id'=> $ret['data']['id'],
                                    'referer_model'=>'Contacts',
                                    'referer_model_id'=> $ret['data']['contacts'][1]['id']
                                )
                            );                         
                        }else{          
                            $this->EventHandler->add(
                                array(
                                    'user_id'=>$this->Auth->user('id'),
                                    'controller' => 'Contacts',
                                    'link_model'=>'Contacts',
                                    'link_model_id'=> $ret['data']['contacts'][1]['id'],
                                    'referer_model'=>'Properties',
                                    'referer_model_id'=> $ret['data']['id'],                
                                    'old_data' => $ret['original_data']['contacts'][1],
                                    'new_data' => $ret['data']['contacts'][1]->toArray()
                                )
                            ); 
                        }
                    }   
                }     
            }

            $this->set([
                'success' => $ret['success'],
                'data' => $ret['data'],
                'errors' => $ret['errors'],
                'message' => $ret['message']
                
            ]); 
        }else{
            $cities = $this->Properties->Cities->find('list', ['limit' => 200]);
            $districts = $this->Properties->Districts->find('list', ['limit' => 200]);
            $streets = $this->Properties->Streets->find('list', ['limit' => 200]);
            $cityparts = $this->Properties->Cityparts->find('list', ['limit' => 200]);
            $users = $this->Properties->Users->find('list', ['limit' => 200]);
        }
        $this->set(compact('data', 'cities', 'districts', 'streets', 'cityparts', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Éppen módosító user elmentése
     *
     * @param $id
     * @param int $status
     */
    function updateEditor(){

        if(!empty($this->request->data['id'])) {

            $id = $this->request->data['id'];
            $property = $this->Properties->get($id);
            if(!empty($this->request->data['status']))
                $status = $this->request->data['status'];
            else
                $status=1;

            if($status == 1){
                $property->now_editing_user_id = $this->Auth->user('id');
                $property->now_editing_login_time = date('Y-m-d H:i:s');
            }
            if($status == 2) {
                $property->now_editing_user_id = NULL;
                $property->now_editing_login_time = NULL;
            }
            $this->Properties->save($property);
            $success = true;

        }else {
            $success = false;
        }


        $this->set(compact('success'));
        $this->set('_serialize', ['success']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Property id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Properties->get($id);
        $ret=$this->_deleteData($data,__('Ingatlan törlése sikeres volt!'),__('Ingatlan törlése sikertelen!'));
        
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
