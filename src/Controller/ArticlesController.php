<?php
namespace App\Controller;

use Cake\Filesystem\File;
//use Cake\Core\Configure;

class ArticlesController extends AppController {
    public $paginate = [
        'limit' => 25,
        'order' => [
            'Article.title' => 'asc'
        ]
    ];  
    
    
    public function index() {
        $datas =  $this->paginate();  
        $total=$this->request->params['paging'][$this->modelClass]['count'];
        $this->set(compact('datas','total'));
        $this->set('_serialize', ['datas','total']);
    }   
    public function add() {
        $row = $this->{$this->modelClass}->newEntity($this->request->data());
        if ($this->request->is('post')) {
            $row = $this->{$this->modelClass}->patchEntity($row, $this->request->data());
            if ($this->{$this->modelClass}->save($row)) {
                if ($this->request->is('ajax')) {
                    $success=true;
                    $message=__('Your row has been saved.');
                }else{
                    $this->Flash->success(__('Your row has been saved.'));
                    return $this->redirect(['action' => 'index']);                    
                }

            }else{
                if ($this->request->is('ajax')) {
                    $success=false;
                    $message=__('Unable to add your article.');
                    $errors=$article->errors();                    
                }else{                
                     $this->Flash->error(__('Unable to add your article.'));
                }
            }
           
        }
        $this->set(compact('success','row', 'errors', 'message'));
        $this->set('_serialize', ['success','errors', 'message']);
    }  
    public function view($id=null) {
        if($this->request->is('ajax'))
        {
            $id=$this->request->query['id'];
        }
        //ha nicns id error
        
        $datas = $this->{$this->modelClass}->get($id); 
        
        //ha nicns data error
        
        $this->set(compact('datas'));
        $this->set('_serialize', ['datas']);
    }        
}