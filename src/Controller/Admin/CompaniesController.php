<?php
namespace App\Controller\Admin;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;

/**
 * Companies Controller
 *
 * @property \App\Model\Table\CompaniesTable $Companies
 */
class CompaniesController extends AppController
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
  
        $query = $this->Companies->find('search', $this->request->query);  
  

        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }

    /**
     * View method
     *
     * @param string|null $id Company id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        if($this->request->is('ajax') and !empty($this->request->query['id']))
        {
            $id=$this->request->query['id'];
        }    
    
        $data = $this->Companies->get($id, [
            'contain' => []
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

        $ret=$this->_saveData(null,__('Companies save success!'),__('Companies save failed!'));
        
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
     * Edit method
     *
     * @param string|null $id Company id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
    
        $ret=$this->_saveData($id,__('Companies módosítása sikeres volt!'),__('Companies módosítás!'),['action' => 'index'],false,[]);
        
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
     * Delete method
     *
     * @param string|null $id Company id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {

        if(!empty($this->request->data['id'])){
            $id=$this->request->data['id'];
        }
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->Company->get($id);
        $ret=$this->_deleteData($data,__('Companies delete success!'),__('Companies delete failed!'));
        
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
