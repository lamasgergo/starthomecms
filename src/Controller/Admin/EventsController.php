<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;

/**
 * Events Controller
 *
 * @property \App\Model\Table\EventsTable $Events
 */
class EventsController extends AppController
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
        $query = $this->Events
            ->find('search', $this->request->query)
            ->contain([
                'Users'
            ]
        );  
  
        $this->paginate['fields']=array(
            'Events.id',
            'Events.controller',
            'Events.action',
            'Events.type',
            'Events.link_model',
            'Events.link_model_id',            
            'Events.referer_model',
            'Events.referer_model_id',
            'Events.note',
            'Events.changes',
            'Events.created',
            'Users.id',
            'Users.firstname',
            'Users.lastname'
        );
        $this->set('total',$query->count());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas','total']);
    }

    /**
     * View method
     *
     * @param string|null $id Event id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->Events->get($id, [
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
        $this->request->data['controller']='Events';
        $this->request->data['action']='add';
        $this->request->data['user_id']=$this->Auth->user('id');
        
        if(!empty($this->request->data['property_id']))
        {
            $this->request->data['link_model']='Properties';
            $this->request->data['link_model_id']=$this->request->data['property_id'];
        }
        if(!empty($this->request->data['contact_id']))
        {
            $this->request->data['link_model']='Contacts';
            $this->request->data['link_model_id']=$this->request->data['contact_id'];
        }
        
        $ret=$this->_saveData(null,__('Az esemény mentése sikeres volt!'),__('Az esemény mentése nem sikerült!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        
        if(!empty($this->request->data['calendar']['date'])){
            $calendarTable = TableRegistry::get('Calendars');
            $addToUser[]=$this->Auth->user('id');
            if(!empty($this->request->data['calendar']['users'])){
               $addToUser=array_merge($addToUser,$this->request->data['calendar']['users']) ;
            }
            
            $calendarData = $this->request->data['calendar'];


            if(!empty($this->request->data['property_id'])){
                $saveModel = 'Properties';
                $saveId = $this->request->data['property_id'];
            }
            if(!empty($this->request->data['contact_id'])){
                $saveModel = 'Contact';
                $saveId = $this->request->data['contact_id'];
            }

            if(!empty($saveModel) && !empty($saveId)) {
                foreach ($addToUser as $oneSave) {
                    if(!empty($oneSave)) {
                        $save = [
                            'user_id' => $oneSave,
                            'date' => $calendarData['date'] . ' ' . (!empty($calendarData['time']) ? $calendarData['time'] : '10:00'),
                            'note' => $calendarData['note'],
                            'active' => 1,
                            'link_model' => $saveModel,
                            'link_model_id' => $saveId
                        ];
                        $calendarEntity = $calendarTable->newEntity($save);
                        $calendarTable->save($calendarEntity);
                    }
                }
            }
        }
        
        $users = $this->Events->Users->find('list', ['limit' => 200]);
        $this->set(compact('data', 'users'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

}
