<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\I18n\Time;
use DateTime;

/**
 * InterestPropertiesContacts Controller
 *
 * @property \App\Model\Table\InterestPropertiesContactsTable $InterestPropertiesContacts
 */
class ShowedPropertiesContactsController extends AppController
{
     public $paginate = [
        'limit' => 25,
        'order' => [
            'ShowedPropertiesContacts.created' => 'desc'
        ]
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
        $query = $this->ShowedPropertiesContacts
            ->find('search', $this->request->query)
            ->select([
                'ShowedPropertiesContacts.id',
                'ShowedPropertiesContacts.created',
                'Properties.id',
                'Properties.sell',
                'Properties.rent',
                'Properties.building_type',
                'Properties.size_net',
                'Properties.size_gross',
                'Properties.streetnum',
                'Properties.note', 
                'Properties.heat_type', 
                'Properties.parking',
                'Districts.district', 
                'Cityparts.citypart', 
                'Streets.street',     
                'Mainimage.id',
                'Mainimage.property_id',
                'Mainimage.image',                       
                'Contacts.id',
                'Contacts.firstname',
                'Contacts.lastname',
                'Contacts.phone1',
                'Contacts.phone1type',
                'PropertiesVariations.id',
                'PropertiesVariations.property_id',
                'PropertiesVariations.type',
                'PropertiesVariations.price',
                'PropertiesVariations.price_dev',
                'PropertiesVariations.furniture_type',
                'PropertiesVariations.active',
                'PropertiesVariations.description',
                'PropertiesLayouts.id',
                'PropertiesLayouts.room',
                'PropertiesLayouts.livingroom',
                'Users.lastname',
                'Users.firstname',
                'Cities.city',
                'Owner.id',
                'Owner.phone1type',
                'Owner.phone1',
                'Owner.firstname',
                'Owner.lastname',
                'Owner.email1',
                'Contact.id',
                'Contact.phone1type',
                'Contact.phone1',
                'Contact.firstname',
                'Contact.lastname',
                'Contact.email1' ,
                'PropertiesRenter.property_id'
            ])
                ->join([

                    'PropVariation' => [
                        'table' => 'properties_variations',
                        'alias' => 'PropVariation',
                        'type' => 'LEFT',
                        'conditions' => '(ShowedPropertiesContacts.properties_variation_id = PropVariation.id)',
                    ],                    
                    'PropertiesContactsOwner' => [
                        'table' => 'properties_contacts',
                        'type' => 'LEFT',
                        'conditions' => ['PropertiesContactsOwner.property_id = PropVariation.property_id', 'PropertiesContactsOwner.main =1 ', 'PropertiesContactsOwner.type = 1 ' ],
                    ],
                    'Owner' => [
                        'table' => 'contacts',
                        'type' => 'LEFT',
                        'conditions' => 'Owner.id = PropertiesContactsOwner.contact_id',
                    ],
                    'PropertiesContactsContact' => [
                        'table' => 'properties_contacts',
                        'type' => 'LEFT',
                        'conditions' => ['PropertiesContactsContact.property_id = PropVariation.property_id', 'PropertiesContactsContact.main =1 ', 'PropertiesContactsContact.type = 2 ' ],
                    ],
                    'PropertiesRenter' => [
                        'table' => 'properties_contacts',
                        'type' => 'LEFT',
                        'conditions' => ['PropertiesRenter.property_id = PropVariation.property_id',  'ShowedPropertiesContacts.contact_id = PropertiesRenter.contact_id', 'PropertiesRenter.type IN (1,3)'  ],
                    ],
                    'Contact' => [
                        'table' => 'contacts',
                        'type' => 'LEFT',
                        'conditions' => 'Contact.id = PropertiesContactsContact.contact_id',
                    ]                    
                ])            
            ->contain([
               'PropertiesVariations', 'PropertiesVariations.Properties', 'Contacts', 'Users', 'PropertiesVariations.Properties.Cities',
               'PropertiesVariations.Properties.Districts','PropertiesVariations.Properties.Cityparts' ,'PropertiesVariations.Properties.Streets',
               'PropertiesVariations.Properties.PropertiesLayouts','PropertiesVariations.Properties.Mainimage'
            ]);
        ;  
  
        $this->set('total',$query->count());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        if($this->request->is(['patch', 'post', 'put']))
        {        
            $this->ShowedPropertiesContacts->setUser($this->Auth->user('id'));
            $this->ShowedPropertiesContacts->Contacts->setUser($this->Auth->user('id'));
            
            $ret=$this->_saveData(null,__('Mutatás mentése sikeres volt!'),__('Mutatás létrehozása sikertelen volt!'),null,null,['Contacts'],['Contacts']);
            if($ret and $ret['success'])
            {                  
                //Event save if Property showed
                $this->EventHandler->add(
                    array(
                        'user_id'=>$this->Auth->user('id'),
                        'controller' => 'ShowedPropertiesContacts',
                        'link_model'=>'Contacts',
                        'link_model_id'=> $this->request->data['contact_id'],
                        'referer_model'=>'Properties',
                        'referer_model_id'=> $this->request->data['properties_variation_id']
                    )
                );  
                $this->set([
                    'success'=>$ret['success'],
                    'data'=>$ret['data'],
                    'errors'=>$ret['errors'],
                    'message'=>$ret['message']
                    
                ]); 
            }
        }else{
            $contacts = $this->ShowedPropertiesContacts->Contacts->find('list', ['limit' => 200]);
            $users = $this->ShowedPropertiesContacts->Users->find('list', ['limit' => 200]);
        }
        $this->set(compact('data', 'contacts', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function rental()
    {
        if($this->request->is(['patch', 'post', 'put']))
        {
            $ret['success'] = true;

            $contact = $this->ShowedPropertiesContacts->Contacts->get($this->request->data['contact_id']);
            if($contact) {
                $contact->contact_status = $this->request->data['contact_status'];
                $this->ShowedPropertiesContacts->Contacts->save($contact);
            }

            $this->loadModel('PropertiesVariations');
            $property = $this->PropertiesVariations->get($this->request->data['property_id']);
            if($property) {
                $property->enddate = new Time($this->request->data['enddate']);

                try {
                    $this->PropertiesVariations->save($property);
                }catch (\Exception $e){
                    $ret['success'] = false;
                }
            }


            $this->loadModel('PropertiesContacts');

            $contactProperty = $this->PropertiesContacts->newEntity([
                'contact_id' => $this->request->data['contact_id'],
                'property_id' => $property->property_id,
                'type' => 3
            ]);

            $this->PropertiesContacts->save($contactProperty);


            $ret['message'] = 'Sikeres mentés';

            if($ret and $ret['success'])
            {
                //Event save if Property showed
                $this->EventHandler->add(
                    array(
                        'user_id'=>$this->Auth->user('id'),
                        'controller' => 'RentedPropertiesContacts',
                        'link_model'=>'Contacts',
                        'link_model_id'=> $this->request->data['contact_id'],
                        'referer_model'=>'Properties',
                        'referer_model_id'=> $property->property_id,
                        'note'=> $this->request->data['note']
                    )
                );
                $this->set([
                    'success'=>$ret['success'],
                    'data'=>$ret['data'],
                    'errors'=>$ret['errors'],
                    'message'=>$ret['message']

                ]);
            }


       }


        $this->set('_serialize', ['data','success','errors', 'message']);
    }

}
