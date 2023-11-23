<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * SentPropertiesContacts Controller
 *
 * @property \App\Model\Table\SentPropertiesContactsTable $SentPropertiesContacts
 */
class SentPropertiesContactsController extends AppController
{
     public $paginate = [
        'limit' => 25,
        'order' => [
            'SentPropertiesContacts.created' => 'desc'
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
        $query = $this->SentPropertiesContacts
            ->find('search', $this->request->query)
            ->select([
                'SentPropertiesContacts.id',
                'SentPropertiesContacts.created',
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
                'PropertiesVariations.nocontract',
                'PropertiesLayouts.id',
                'PropertiesLayouts.room',
                'PropertiesLayouts.halfroom',
                'PropertiesLayouts.livingroom',
                'Users.lastname',
                'Users.firstname',
                'Cities.city',
                'showed_properties_contact.id',                
                'interest_properties_contact.id',
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
                        'conditions' => '(showed_properties_contact.properties_variation_id = SentPropertiesContacts.properties_variation_id and showed_properties_contact.contact_id = SentPropertiesContacts.contact_id)',
                    ],
                    'InterestProperty' => [
                        'table' => 'interest_properties_contacts',
                        'alias' => 'interest_properties_contact',
                        'type' => 'LEFT',
                        'conditions' => '(interest_properties_contact.properties_variation_id = SentPropertiesContacts.properties_variation_id and interest_properties_contact.contact_id = SentPropertiesContacts.contact_id)',
                    ],
                    'PropVariation' => [
                        'table' => 'properties_variations',
                        'alias' => 'PropVariation',
                        'type' => 'LEFT',
                        'conditions' => '(SentPropertiesContacts.properties_variation_id = PropVariation.id)',
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
               'PropertiesVariations.Properties.PropertiesLayouts','PropertiesVariations.Properties.Mainimage', 'PropertiesVariations.Properties.Contacts'
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
        $data = [];
        if($this->request->is(['patch', 'post', 'put']))
        {

            $this->SentPropertiesContacts->Contacts->setUser($this->Auth->user('id'));
            $rec_contact = $this->SentPropertiesContacts->Contacts->newEntity($this->request->data['contact']);

            if ($this->SentPropertiesContacts->Contacts->save($rec_contact) ) {
                //do something if faliled?
                $contact_id=$rec_contact->id;
                if (!empty($this->request->data['properties_variation_ids']) and !empty($contact_id)) {
                    $properties=explode(',',$this->request->data['properties_variation_ids']);

                    if(!empty($properties))
                    {
                        $hash = md5('Y-m-d H:i:s'.rand(100,999));
                        foreach($properties as $oneprop)
                        {
                            if(!empty($oneprop))
                            {    
                                $this->SentPropertiesContacts->setUser($this->Auth->user('id'));
                                $rec_sent=$this->SentPropertiesContacts->newEntity(array('properties_variation_id'=>$oneprop,'contact_id'=>$contact_id, 'hash' => $hash));
                                if ($this->SentPropertiesContacts->save($rec_sent)) {
                                    //do something if faliled?
                                    $this->EventHandler->add(
                                        array(
                                            'user_id'=>$this->Auth->user('id'),
                                            'controller' => 'SentPropertiesContacts',
                                            'link_model'=>'Contacts',
                                            'link_model_id'=> $contact_id,
                                            'note' => $oneprop,
                                            'referer_model'=>'Properties',
                                            'referer_model_id'=> $oneprop
                                        )
                                    );                                      
                                    
                                }
                            }
                        }
                        $ret['success']=true;
                        $data['hash']=$hash;
                        $ret['message']=__('Kiajánlás elmentve');
                        $ret['errors']=false;                       
                    } 
                }else{
                    $ret['success']=false;
                    $ret['message']=__('Nincs kiválasztott ingatlan!');
                    $ret['errors']=true;                   
                }                            
                
            }else{
                if ($this->request->is('ajax')) {
                    $ret['success']=false;
                    $ret['message']=__('Nem sikerült a kapcsolattartó létrehozása!');
                    $ret['errors']=$rec_contact->errors();

                                     
                }else{                
                     $this->Flash->error($failureText);
                     //$this->redirect($failureRedirect);
                }            
            }        

            $this->set([
                'success'=>$ret['success'],
                'data'=>$data,
                'errors'=>$ret['errors'],
                'message'=>$ret['message']
                
            ]);
        }else{ 
            //$properties = $this->SentPropertiesContacts->Properties->find('list', ['limit' => 200]);
            $contacts = $this->SentPropertiesContacts->Contacts->find('list', ['limit' => 200]);
            $users = $this->SentPropertiesContacts->Users->find('list', ['limit' => 200]);
        }
        $this->set(compact('data', 'properties', 'contacts', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }


}
