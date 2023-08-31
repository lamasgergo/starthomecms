<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * Cityparts Controller
 *
 * @property \App\Model\Table\CitypartsTable $Cityparts
 */
class CitypartsController extends AppController
{

    public $paginate = [
        'limit' => 80,
        'order' => [
            'citypart' => 'asc'
        ] //these fields can be paginated
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
        $query = $this->Cityparts
            ->find('search', $this->request->query)
            ->contain([
                'Cities', 'Districts'
            ]
        );

        $this->set('total',$query->count());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas','total']);
    }

    /**
     * View method
     *
     * @param string|null $id Citypart id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->Cityparts->get($id, [
            'contain' => ['Cities', 'Districts', 'Properties']
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

        $ret=$this->_saveData(null,__('Városrész sikeresen hozzáadva!'),__('Városrész létrehozás sikertelen volt!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
    
        $cities = $this->Cityparts->Cities->find('list', ['limit' => 200]);
        $districts = $this->Cityparts->Districts->find('list', ['limit' => 200]);
        $this->set(compact('data', 'cities', 'districts'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Citypart id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
    
        $ret=$this->_saveData($id,__('Városrész módosítás sikeres volt!'),__('Városrész módosítás sikertelen volt!'),['action' => 'index'],false,[]);
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $cities = $this->Cityparts->Cities->find('list', ['limit' => 200]);
        $districts = $this->Cityparts->Districts->find('list', ['limit' => 200]);
        $this->set(compact('data', 'cities', 'districts'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Citypart id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Citypart->get($id);
        $ret=$this->_deleteData($data,__('Cityparts delete success!'),__('Cityparts delete failed!'));
        
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
