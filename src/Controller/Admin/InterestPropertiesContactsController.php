<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * InterestPropertiesContacts Controller
 *
 * @property \App\Model\Table\InterestPropertiesContactsTable $InterestPropertiesContacts
 */
class InterestPropertiesContactsController extends AppController
{
     public $paginate = [
        'limit' => 25,
        'order' => [
            'InterestPropertiesContacts.created' => 'desc'
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
        $query = $this->InterestPropertiesContacts
            ->find('search', $this->request->query)
            ->select([
                'InterestPropertiesContacts.id',
                'InterestPropertiesContacts.created',
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
                'Contacts.email1',
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
                'PropertiesLayouts.halfroom',
                'PropertiesLayouts.livingroom',
                'Users.lastname',
                'Users.firstname',
                'Cities.city',
                'showed_properties_contact.id',
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
                'Contact.email1'
            ])

                ->join([

                    'SentProperty' => [
                        'table' => 'showed_properties_contacts',
                        'alias' => 'showed_properties_contact',
                        'type' => 'LEFT',
                        'conditions' => '(showed_properties_contact.properties_variation_id = InterestPropertiesContacts.properties_variation_id and showed_properties_contact.contact_id = InterestPropertiesContacts.contact_id)',
                    ],
                    'PropVariation' => [
                        'table' => 'properties_variations',
                        'alias' => 'PropVariation',
                        'type' => 'LEFT',
                        'conditions' => '(InterestPropertiesContacts.properties_variation_id = PropVariation.id)',
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
            $this->InterestPropertiesContacts->setUser($this->Auth->user('id'));
            $this->InterestPropertiesContacts->Contacts->setUser($this->Auth->user('id'));
            
            $ret=$this->_saveData(null,__('Érdeklődés mentése sikeres volt!'),__('Érdeklődés létrehozása sikertelen volt!'),null,null,['Contacts'],['Contacts']);

            if($ret and $ret['success'])
            {
                $this->EventHandler->add(
                    array(
                        'user_id'=>$this->Auth->user('id'),
                        'controller' => 'InterestPropertiesContact',
                        'link_model'=>'Contacts',
                        'link_model_id'=> $ret['data']['contact']['id'],
                        'referer_model'=>'Properties',
                        'referer_model_id'=> $ret['data']['properties_variation_id']
                    )
                );         
            }
            $this->set([
                'success'=>$ret['success'],
                'data'=>$ret['data'],
                'errors'=>$ret['errors'],
                'message'=>$ret['message']
                
            ]); 
        }else{
            $contacts = $this->InterestPropertiesContacts->Contacts->find('list', ['limit' => 200]);
            $users = $this->InterestPropertiesContacts->Users->find('list', ['limit' => 200]);
        }
        $this->set(compact('data', 'contacts', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }


}
