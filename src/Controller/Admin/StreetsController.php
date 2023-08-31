<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * Streets Controller
 *
 * @property \App\Model\Table\StreetsTable $Streets
 */
class StreetsController extends AppController
{
    public $paginate = [
        'limit' => 80,
        'order' => [
            'street' => 'asc'
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
        $query = $this->Streets
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
     * @param string|null $id Street id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->Streets->get($id, [
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
        $this->request->data('active' , 1);
        $ret=$this->_saveData(null,__('Az utca mentés sikeres volt!'),__('Az utca mentés sikeretelen volt!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
    
        $cities = $this->Streets->Cities->find('list', ['limit' => 200]);
        $districts = $this->Streets->Districts->find('list', ['limit' => 200]);
        $this->set(compact('data', 'cities', 'districts'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Street id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
    
        $ret=$this->_saveData($id,__('Az utca mentés sikeres volt!'),__('Az utca mentés sikeretelen volt!'),['action' => 'index'],false,[]);
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $cities = $this->Streets->Cities->find('list', ['limit' => 200]);
        $districts = $this->Streets->Districts->find('list', ['limit' => 200]);
        $this->set(compact('data', 'cities', 'districts'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id Street id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Street->get($id);
        $ret=$this->_deleteData($data,__('Streets delete success!'),__('Streets delete failed!'));
        
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
