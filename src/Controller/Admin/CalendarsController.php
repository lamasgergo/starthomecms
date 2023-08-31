<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * Calendars Controller
 *
 * @property \App\Model\Table\CalendarsTable $Calendars
 */
class CalendarsController extends AppController
{
    public $paginate = [
        'limit' => 25,
        'order' => [
            'Calendars.date' => 'desc'
        ],
        'sortWhitelist' => ['id', 'date'] //these fields can be paginated
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
        
        //Grid filter part
        if(!empty($this->request->query['filter'])){
             foreach(json_decode($this->request->query['filter']) as $oneFilter){
                $this->request->query[$oneFilter->property]=$oneFilter->value;    
             }
        }           
           

        //Search part
        $query = $this->Calendars
            ->find('search', $this->request->query)
            ->select(['Calendars.date','Calendars.note','Calendars.active', 'Properties.id', 'Streets.street', 'Contacts.id',
                    'Contacts.firstname', 'Contacts.lastname','Contacts.phone1','Contacts.email1']
            )
            ->join([
                'table' => 'properties',
                'alias' => 'Properties',
                'type' => 'LEFT',
                'conditions' => 'Calendars.link_model_id = Properties.id and Calendars.link_model="Properties" ',
            ])
            ->join([
                'table' => 'streets',
                'alias' => 'Streets',
                'type' => 'LEFT',
                'conditions' => 'Properties.street_id = Streets.id',
            ])
            ->join([
                'table' => 'contacts',
                'alias' => 'Contacts',
                'type' => 'LEFT',
                'conditions' => 'Calendars.link_model_id = Contacts.id and Calendars.link_model="Contact" ',
            ])

            ->where(['Calendars.user_id' => $this->Auth->user('id')]) ;
            //->contain('Properties');  
  

        $this->set('total',$query->count());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * View method
     *
     * @param string|null $id Calendar id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->Calendars->get($id, [
            'contain' => ['Users']
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
        if($this->request->is(['patch', 'post', 'put']))
        {
            $ret=$this->_saveData(null,__('Calendars save success!'),__('Calendars save failed!'));
            if($ret and $ret['success'])
            {
                //Do something if record saved   
            }            
            $this->set([
                'success'=>$ret['success'],
                'data'=>$ret['data'],
                'errors'=>$ret['errors'],
                'message'=>$ret['message']
                
            ]); 
        }else{
    
            $users = $this->Calendars->Users->find('list', ['limit' => 200]);
        }
        $this->set(compact('data', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Calendar id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        if($this->request->is(['patch', 'post', 'put']))
        {    
            $ret=$this->_saveData($id,__('Calendars módosítása sikeres volt!'),__('Calendars módosítás!'),['action' => 'index'],false,[]);
            if($ret and $ret['success'])
            {
                //Do something if record saved
            }        
            $this->set([
                'success'=>$ret['success'],
                'data'=>$ret['data'],
                'errors'=>$ret['errors'],
                'message'=>$ret['message']
                
            ]);
        }else{ 
            $users = $this->Calendars->Users->find('list', ['limit' => 200]);
        }
        $this->set(compact('data', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Calendar id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Calendars->get($id);
        $ret=$this->_deleteData($data,__('Calendar delete success!'),__('Calendar delete failed!'));
        
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
