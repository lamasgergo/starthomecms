<?php
namespace App\Controller\Admin;

use Cake\Core\Configure;
use App\Controller\AppController;
use Cake\Event\Event;

/**
 * Roles Controller
 *
 * @property \App\Model\Table\RolesTable $Roles
 */
class RolesController extends AppController
{

    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
    }
        
    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $query = $this->Roles
            ->find('search', $this->request->query
        );            
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * View method
     *
     * @param string|null $id Role id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }
        
        $data = $this->Roles->get($id, [
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
        $ret=$this->_saveData(null,__('Csoport létrehozása sikeres volt!'),__('Sikertelen létrehozás!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Role id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        
        $ret=$this->_saveData($id,__('Csoport módosítása sikeres volt!'),__('Sikertelen módosítás!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        
        $this->set('_serialize', ['data','success','errors', 'message']);
        
    }

    /**
     * Delete method
     *
     * @param string|null $id Role id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Roles->get($id);
        $ret=$this->_deleteData($data,__('Csoport törlés sikeres volt!'),__('Csoportot nem sikerült törölni!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]);         

        $this->set('_serialize', ['data','success','errors', 'message']);
                
    }
}
