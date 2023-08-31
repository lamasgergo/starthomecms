<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;

/**
 * Contacts Controller
 *
 * @property \App\Model\Table\ContactsTable $Contact
 */
class ContactsController extends AppController
{

    public $paginate = [
        'fields' => [
            'Contacts.id', 
            'Contacts.email1',  
            'Contacts.prename',
            'Contacts.firstname', 
            'Contacts.lastname', 
            'Contacts.created', 
            'Contacts.phone1type',
            'Contacts.phone1',
            'Contacts.phone2type',
            'Contacts.phone2',
            'Contacts.note',
            'Contacts.lastevent',
            'InternalCompany.name',
            'InternalCompanyContact.fullname',
            'Creator.id',
            'Creator.firstname',
            'Creator.lastname',
            'Creator.username',
            ],
        'limit' => 70,
        'order' => [
            'Contacts.firstname' => 'asc',
            'Contacts.lastname' => 'asc',
        ],
        'contains' => ['Companies','InternalCompany', 'Creator']
    ];    
    
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
  
        $query = $this->Contacts->find('search', $this->request->query)->contain(['Companies','InternalCompany', 'Users', 'Creator', 'InternalCompanyContact']);

        $this->set('total',$query->count());        
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas','total']);
    }

    /**
     * View method
     *
     * @param string|null $id Contacts id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->Contacts->get($id, [
            'contain' => ['Users','Companies','InternalCompany', 'InternalCompanyContact', 'ContactsSearches']
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
        $this->Contacts->setUser($this->Auth->user('id'));
        
        //Set fileds before save
        if ($this->request->is(['patch', 'post', 'put'])) {
            /*
            if(!empty($this->request->data['company_id']) and !is_numeric($this->request->data['company_id'])){
                $companiesTable = TableRegistry::get('Companies');
                $rec=$companiesTable->newEntity(array('name'=>$this->request->data['company_id'],'active'=>'1','type'=>'1'));
                if ($companiesTable->save($rec)) {
                    $this->request->data['company_id']=$rec->id;    
                } 
            }
            if(!empty($this->request->data['internal_company_id']) and !is_numeric($this->request->data['internal_company_id'])){
                $companiesTable = TableRegistry::get('Companies');
                $rec=$companiesTable->newEntity(array('name'=>$this->request->data['internal_company_id'],'active'=>'1','type'=>'2'));
                if ($companiesTable->save($rec)) {
                    $this->request->data['internal_company_id']=$rec->id;    
                } 
            }
            */
        }else{
            $companies=$this->Contacts->Companies->find('list');
            $this->set(compact('companies'));    
        } 
        
        $ret=$this->_saveData(null,__('Az ügyfél létrehozás sikeres volt!'),__('Az ügyfél létrehozás sikeretelen volt!'));

        //Event save if Property changed
        $this->EventHandler->add(
            array(
                'user_id'=>$this->Auth->user('id'),
                'link_model'=>'Contacts',
                'link_model_id'=> $ret['data']['id'],
                'new_data' => $ret['data']->toArray()
            ),
            array(
                'check_related'=>array('rentvar','sellvar')
            )
        );

        //Set ManyToMay linkings after save
        if ($this->request->is(['patch', 'post', 'put']) and !empty($ret['data']['id'])) {
            if(!empty($this->request->data['users']) and count($this->request->data['users'])>0){
                foreach($this->request->data['users'] as $oneuser){
                    if(!empty($oneuser))
                    {
                        $setUserLink[] = $this->Contacts->Users->findById($oneuser)->first();
                    }
                }
                if(!empty($setUserLink) and is_array($setUserLink))
                {
                    $this->Contacts->Users->link($ret['data'], $setUserLink);
                }
                    
            }            
        }  
        
        if ($this->request->is(['patch', 'post', 'put']) and !empty($this->request->data['property_id']) and !empty($ret['data']['id'])) {      
            $propertiesContactsTable = TableRegistry::get('PropertiesContacts');
            $rec=$propertiesContactsTable->newEntity(array('property_id'=>$this->request->data['property_id'],'contact_id'=>$ret['data']['id'], 'type'=>$this->request->data['type_id']));
            if ($propertiesContactsTable->save($rec)) {
                //do something if faliled?
            } 
        }
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
    
        $this->set(compact('data'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Contacts id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->Contacts->setUser($this->Auth->user('id'));
        
        //Set fileds before save
        if ($this->request->is(['patch', 'post', 'put'])) {
            /*
            if(!empty($this->request->data['company_id']) and !is_numeric($this->request->data['company_id'])){
                $companiesTable = TableRegistry::get('Companies');
                $rec=$companiesTable->newEntity(array('name'=>$this->request->data['company_id'],'active'=>'1','type'=>'1'));
                if ($companiesTable->save($rec)) {
                    $this->request->data['company_id']=$rec->id;    
                } 
            }
            if(!empty($this->request->data['internal_company_id']) and !is_numeric($this->request->data['internal_company_id'])){
                $companiesTable = TableRegistry::get('Companies');
                $rec=$companiesTable->newEntity(array('name'=>$this->request->data['internal_company_id'],'active'=>'1','type'=>'2'));
                if ($companiesTable->save($rec)) {
                    $this->request->data['internal_company_id']=$rec->id;    
                } 
            }
            */
        }else{
            $companies=$this->Contacts->Companies->find('list');
            $this->set(compact('companies'));    
        }        
        
        $ret=$this->_saveData($id,__('Az ügyfél módosítása sikeres volt!'),__('Az ügyfél módosítás sikertelen volt!'),['action' => 'index'],false,['Users']);

        //Event save if Property changed
        $this->EventHandler->add(
            array(
                'user_id'=>$this->Auth->user('id'),
                'link_model'=>'Contacts',
                'link_model_id'=> $ret['data']['id'],
                'old_data' => $ret['original_data'],
                'new_data' => $ret['data']->toArray()
            ),
            array(
                'check_related'=>array('rentvar','sellvar')
            )
        );        
        
        //Set ManyToMay linkings after save
        if ($this->request->is(['patch', 'post', 'put'])) {
            if(!empty($this->request->data['users']) and count($this->request->data['users'])>0){
                foreach($this->request->data['users'] as $oneuser){
                    if(!empty($oneuser))
                    {
                        $setUserLink[] = $this->Contacts->Users->findById($oneuser)->first();
                    }
                }
                if(!empty($setUserLink) and is_array($setUserLink))
                {
                    $this->Contacts->Users->link($ret['data'], $setUserLink);
                }
                    
            }            
        }

        if ($this->request->is(['patch', 'post', 'put']) and !empty($this->request->data['properties_variation_ids']) and !empty($ret['data']['id'])) {
            $properties=explode(',',$this->request->data['properties_variation_ids']);

            if(!empty($properties))
            {
                
                foreach($properties as $oneprop)
                {
                    if(!empty($oneprop))
                    {
                        $sentPropertiesContactsTable = TableRegistry::get('SentPropertiesContacts');
                        $sentPropertiesContactsTable->setUser($this->Auth->user('id'));
                        $rec2=$sentPropertiesContactsTable->newEntity(array('properties_variation_id'=>$oneprop,'contact_id'=>$ret['data']['id']));
                        if ($sentPropertiesContactsTable->save($rec2)) {
                            //do something if faliled?
                        }
                    }
                }
            } 
        }    
              
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $this->set(compact('data'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Contact id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Contacts->get($id);
        $ret=$this->_deleteData($data,__('Az ügyfél sikeresen törölve!'),__('Az ügyfél törlése sikertelen volt!'));
        
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
