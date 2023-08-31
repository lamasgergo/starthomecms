<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;

/**
 * ContactsSearches Controller
 *
 * @property \App\Model\Table\ContactsSearchesTable $ContactsSearches
 */
class ContactsSearchesController extends AppController
{
    public $paginate = [
        'fields' => [
            'Contacts.firstname',
            'Contacts.lastname',
            'Contacts.phone1',
            'Contacts.phone1type',
            'Contacts.email1',
            'Contacts.id',
            'Users.firstname',
            'Users.lastname',
            'ContactsSearches.note',
            'ContactsSearches.type',
            'ContactsSearches.city',
            'ContactsSearches.district',
            'ContactsSearches.price_from',
            'ContactsSearches.price_to',
            'ContactsSearches.bedroom_from',
            'ContactsSearches.bedroom_to',
            'ContactsSearches.id',
            'ContactsSearches.created',
            'ContactsSearches.contact_id',
            'InternalCompany.name'
        ],
        'limit' => 50,
        'order' => [
            'ContactsSearches.created' => 'desc'
        ],
        'contain' => ['Contacts.InternalCompany','Contacts.InternalCompanyContact', 'Users']
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
        $query = $this->ContactsSearches
            ->find('search', $this->request->query)
            ->contain(['Contacts.InternalCompany','Contacts.InternalCompanyContact', 'Users']);

        $this->set('total',$query->count());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas', 'total']);
    }

    /**
     * View method
     *
     * @param string|null $id Contacts Search id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->ContactsSearches->get($id, [
            'contain' => ['Contacts']
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
        $district=[];
        
        $this->ContactsSearches->setUser($this->Auth->user('id'));
        $this->ContactsSearches->Contacts->setUser($this->Auth->user('id'));
        
        /* Convert fields */
        $query_district = TableRegistry::get('Districts')->find('all')->select(['district'])->where(['id' => $this->request->data['district_id']], ['id' => 'integer[]']);
        foreach ($query_district as $district) {
            $districts[]=$district->district;
        } 
        $query_city = TableRegistry::get('Cities')->find('all')->select(['city'])->where(['id' => $this->request->data['city_id']], ['id' => 'integer[]']);
        foreach ($query_city as $city) {
            $cities[]=$city->city;
        } 

        if(!empty($districts))$this->request->data['district']=implode(', ',$districts);          
        if(!empty($cities))$this->request->data['city']=implode(', ',$cities);          
        if(!empty($this->request->data['type']))$this->request->data['type']=ltrim(rtrim(implode(',',$this->request->data['type']),','),',');
        if(!empty($this->request->data['city_id']))$this->request->data['city_id']=implode(',',$this->request->data['city_id']);
        if(!empty($this->request->data['district_id']))$this->request->data['district_id']=implode(',',$this->request->data['district_id']);
        if(!empty($this->request->data['building_type']))$this->request->data['building_type']=implode(',',$this->request->data['building_type']);
        if(!empty($this->request->data['furniture_type']))$this->request->data['furniture_type']=implode(',',$this->request->data['furniture_type']);
        if(!empty($this->request->data['parking']))$this->request->data['parking']=implode(',',$this->request->data['parking']);
        if(!empty($this->request->data['pool_type']))$this->request->data['pool_type']=implode(',',$this->request->data['pool_type']);
        $this->request->data['active']=1;
        $this->ContactsSearches->Contacts->validator('easy');
        $ret=$this->_saveData(null,__('Keresési igény mentése sikeres volt!'),__('Keresési igény létrehozása sikertelen volt!'),null,null,['Contacts'],['Contacts' => ['validate'=> 'easy']]);

        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]);
        if($ret['success']) {
            $this->EventHandler->add(
                array(
                    'user_id' => $this->Auth->user('id'),
                    'link_model' => 'Contacts',
                    'link_model_id' => $ret['data']['contact']['id'],
                    'new_data' => $ret['data']->toArray()
                )
            );

            if (!empty($this->request->data['selected_properties'])) {
                $this->loadModel('SentPropertiesContacts');
                $sentProperties = explode(',', $this->request->data['selected_properties']);
                if (!empty($sentProperties)) {
                    foreach ($sentProperties as $property) {
                        $entity = $this->SentPropertiesContacts->newEntity();
                        $entity->properties_variation_id = $property;
                        $entity->contact_id = $ret['data']['contact']['id'];
                        $entity->user_id = $this->Auth->user('id');
                        $this->SentPropertiesContacts->save($entity);
                    }
                }
                $this->EventHandler->add(
                    array(
                        'controller' => 'SentPropertiesContacts',
                        'action' => 'add',
                        'user_id' => $this->Auth->user('id'),
                        'link_model' => 'Contacts',
                        'link_model_id' => $ret['data']['contact']['id'],
                        'note' => $this->request->data['selected_properties']
                    )
                );
            }

        }
        $contacts = $this->ContactsSearches->Contacts->find('list', ['limit' => 200]);
        $users = $this->ContactsSearches->Users->find('list', ['limit' => 200]);
        $this->set(compact('data', 'contacts', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Contacts Search id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $district=[];
        
        $this->ContactsSearches->setUser($this->Auth->user('id'));
        $this->ContactsSearches->Contacts->setUser($this->Auth->user('id'));
        
        /* Convert fields */
        $query_district = TableRegistry::get('Districts')->find('all')->select(['district'])->where(['id' => $this->request->data['district_id']], ['id' => 'integer[]']);
        foreach ($query_district as $district) {
            $districts[]=$district->district;
        } 
        $query_city = TableRegistry::get('Cities')->find('all')->select(['city'])->where(['id' => $this->request->data['city_id']], ['id' => 'integer[]']);
        foreach ($query_city as $city) {
            $cities[]=$city->city;
        } 

        if(!empty($districts))$this->request->data['district']=implode(', ',$districts);          
        if(!empty($cities))$this->request->data['city']=implode(', ',$cities);          
        if(!empty($this->request->data['type']))$this->request->data['type']=rtrim(implode(',',$this->request->data['type']),',');
        if(!empty($this->request->data['city_id']))$this->request->data['city_id']=implode(',',$this->request->data['city_id']);
        if(!empty($this->request->data['district_id']))$this->request->data['district_id']=implode(',',$this->request->data['district_id']);
        if(!empty($this->request->data['building_type']))$this->request->data['building_type']=implode(',',$this->request->data['building_type']);
        if(!empty($this->request->data['furniture_type']))$this->request->data['furniture_type']=implode(',',$this->request->data['furniture_type']);
        if(!empty($this->request->data['parking']))$this->request->data['parking']=implode(',',$this->request->data['parking']);
        if(!empty($this->request->data['pool_type']))$this->request->data['pool_type']=implode(',',$this->request->data['pool_type']);
        $this->request->data['active']=1;        
    
        $ret=$this->_saveData($id,__('Keresési igény módosítása sikeres volt!'),__('Keresési igény módosítás sikertelen volt!'),['action' => 'index'],false,[]);
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $contacts = $this->ContactsSearches->Contacts->find('list', ['limit' => 200]);
        $users = $this->ContactsSearches->Users->find('list', ['limit' => 200]);
        $this->set(compact('data', 'contacts', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Contacts Search id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->ContactsSearches->get($id);
        $ret=$this->_deleteData($data,__('Keresési igény törlése sikeres volt!'),__('Keresési igény törlése sikertelen volt!'));
        
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
