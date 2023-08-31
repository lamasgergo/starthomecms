<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 */
class UsersController extends AppController
{
    public $paginate = [
        'fields' => ['Users.id', 'Users.email', 'Users.username', 'Users.firstname', 'Users.lastname', 'Users.created', 'Roles.name'],
        'limit' => 25,
        'order' => [
            'Users.created' => 'desc'
        ],
        'sortWhitelist' => ['Roles.name', 'username']
    ];
    
    
    public function beforeFilter(Event $event)
    {
        $this->Auth->allow(['login','logout']);
    }
        
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
        //Searching part
        $query = $this->Users
            ->find('search', $this->request->query)
            ->contain([
                'Roles'
            ]
        );

        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * View method
     *
     * @param string|null $id User id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->Users->get($id, [
            'contain' => ['Roles']
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

        $ret=$this->_saveData(null,__('Felhasználó mentés sikeres volt!'),__('Felhasználó mentése sikertelen volt!'));
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
    
        $roles = $this->Users->Roles->find('list', ['limit' => 200]);
        $this->set(compact('roles'));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id User id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
    
        $ret=$this->_saveData($id,__('Felhasználó módosítása sikeres volt!'),__('Felhasználó módosítás!'),['action' => 'index'],false,[]);
        
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]); 
        $roles = $this->Users->Roles->find('list', ['limit' => 200]);
        $this->set(compact('data', 'roles'));
        $this->set('_serialize', ['data','success','errors', 'message']);    
    }

    /**
     * Delete method
     *
     * @param string|null $id User id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }

        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Users->get($id);

        $ret=$this->_deleteData($data,__('Felhasználó törlése sikeres volt!'),__('Felhasználó törlése sikertelen volt!'));
              var_dump($ret);
        die();  
        $this->set([
            'success'=>$ret['success'],
            'data'=>$ret['data'],
            'errors'=>$ret['errors'],
            'message'=>$ret['message']
            
        ]);   
              

        $this->set(compact('data'));
        $this->set('_serialize', ['data','success','errors', 'message']);        
        
    }

    /**
     * Login method
     *
     * @return void
     */
    public function login()
    {
        if($this->Auth->user('id'))
        {
            $data = $this->Users->get($this->Auth->user('id'), [
                'contain' => ['Roles']
            ]);                
            return $this->redirect($data->role->login_redirect);
        }
        if ($this->request->is('post')) {
            $user = $this->Auth->identify();
            if ($user) {
                $this->Auth->setUser($user);
                $data = $this->Users->get($user['id'], [
                    'contain' => ['Roles'],
                    'fields' => ['id','firstname','lastname','email','picture','Roles.name','Roles.id']
                ]);
                
                if($this->request->is('ajax'))
                {
                    $message = __('Sikeresen bejelentkezett a {0} felhasználóval!',$data->fullname);
                    $success = true;
                    $this->set(compact('data','success','message'));
                    $this->set('_serialize', ['data','success', 'message']);    
                }else{
                    if(!empty($data->role->login_redirect))
                    {
                        return $this->redirect($data->role->login_redirect);
                    }else{

                        if($this->request->data('mobile')){
                            return $this->redirect(['controller' => 'Properties']);
                        }else {

                            return $this->redirect($this->Auth->redirectUrl());
                        }
                    }
                }
            }else{
                if($this->request->is('ajax'))
                {                
                    $message=__('Sikertelen bejelentkezés');
                    $success = false;
                    $this->set(compact('data','success','message'));
                    $this->set('_serialize', ['data','success', 'message']);
                }
                $this->Flash->error(__('Hibás felhasználónév vagy jelszó!'));
                return $this->redirect('/');
            }
            
        }else{
            $this->layout="login";    
        }
        
    } 
    
    public function dashboard(){
        $propertiesTable = TableRegistry::get('Properties');
        $contactsTable = TableRegistry::get('Contacts');
        $contactsSearchesTable = TableRegistry::get('ContactsSearches');

        $data['property_num'] = $propertiesTable->find()->contain('PropertiesVariations')->where(['PropertiesVariations.active'=>1])->count();
        $data['contact_num'] = $contactsTable->find()->count();
        $data['closedate_num'] = $propertiesTable->find()->contain('PropertiesVariations')->where(['PropertiesVariations.enddate <=' => date('Y-m-d')])->count();
        $data['search_num'] = $contactsSearchesTable->find()->count();
        $data = array_merge($data,$this->Users->findById($this->Auth->user('id'))->select(['id', 'username', 'firstname', 'lastname', 'picture'])->first()->toArray());

        $this->set(compact('data','success','message'));
        $this->set('_serialize', ['data','success', 'message']);        
    }
    
    /**
     * Logout method
     *
     * @return void
     */    
    public function logout()
    {
        $this->Auth->logout();
        return $this->redirect(['action'=> 'login']);
    }       
}
