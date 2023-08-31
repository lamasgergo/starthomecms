<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * PropertiesContacts Controller
 *
 * @property \App\Model\Table\PropertiesContactsTable $PropertiesContacts
 */
class PropertiesContactsController extends AppController
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
        $query = $this->PropertiesContacts
            ->find('search', $this->request->query)
            ->contain([
                'Properties', 'Contacts'
            ]
        );  
  

        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * View method
     *
     * @param string|null $id Properties Contact id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->PropertiesContacts->get($id, [
            'contain' => ['Properties', 'Contacts']
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

        $ret=$this->_saveData(null,__('PropertiesContacts save success!'),__('PropertiesContacts save failed!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
    
        $properties = $this->PropertiesContacts->Properties->find('list', ['limit' => 200]);
        $contacts = $this->PropertiesContacts->Contacts->find('list', ['limit' => 200]);
        $this->set(compact('data', 'properties', 'contacts'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Properties Contact id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
    
        $ret=$this->_saveData($id,__('PropertiesContacts módosítása sikeres volt!'),__('PropertiesContacts módosítás!'),['action' => 'index'],false,[]);
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $properties = $this->PropertiesContacts->Properties->find('list', ['limit' => 200]);
        $contacts = $this->PropertiesContacts->Contacts->find('list', ['limit' => 200]);
        $this->set(compact('data', 'properties', 'contacts'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Properties Contact id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete()
    {

        $this->request->allowMethod(['post', 'delete']);
       // $data = $this->PropertiesContacts->get($id);  
        $query = $this->PropertiesContacts->find('all', [
            'conditions' => ['PropertiesContacts.contact_id ' =>$this->request->data['contact_id'],'PropertiesContacts.property_id ' =>$this->request->data['property_id'] ],
        ]);
        $data = $query->first();
           
        $ret=$this->_deleteData($data,__('Properties Contact delete success!'),__('Properties Contact delete failed!'));
        
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
