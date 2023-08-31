<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\Controller\Controller;
use Cake\I18n\I18n;

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link http://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller
{
    
    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading components.
     *
     * @return void
     */
    var $theme ='StudioTheme';
    public function initialize()
    {
        Configure::load('static', 'default', true);
	$login='';
	if (!empty($this->request->params['prefix']) and $this->request->params['prefix']=='admin') {
		$login='admin/users/login';
	}
        $this->loadComponent('Flash');
        $this->loadComponent('RequestHandler');
        $this->loadComponent('Paginator');         
        $this->loadComponent('Auth', [
            'authorize' => 'Controller',
            'loginAction' => $login,
            /*'loginRedirect' => [
            'controller' => 'Users',
            'action' => 'dashboard'
            ],*/
            'loginRedirect' => '/ext',
            'logoutRedirect' => '/ext'
        ]);   
        $this->loadComponent('EventHandler'); 
        
        if ($this->request->action === 'index'){
            $this->loadComponent('Search.Prg');
        }     
                
                
    }
    
    public function beforeFilter(Event $event)
    {
        $this->theme="StudioTheme"; 
        //$this->Auth->allow(['index', 'view', 'add','edit', 'delete']);
      
        
     
    }
    
    public function beforeRender(Event $event)
    {
        $this->set('user',$this->Auth->user());
        $this->set('isMobile',$this->request->isMobile());

        if(!empty( $this->request->params['prefix']) and $this->request->params['prefix']=='admin' and empty($this->layout))
        {
            $this->layout="admin";   
        }   
    }  
    
    public function _saveData($id=null,$successText="Save success!", $failureText="Save failed!", $successRedirect=['action' => 'index'], $failureRedirect=false, $contain=[], $associated=[],$validator = 'default'){
        if ($this->request->is(['patch', 'post', 'put'])) {
            $ret = array('data'=>[],'success'=>false,'message'=>$failureText, 'errors'=>[]);
                
            if(empty($this->request->data['id']) and empty($id))
            {
                $ret['data'] = $this->{$this->modelClass}->newEntity($this->request->data,['associated'=>$associated , 'validate' => $validator]);   
               // var_dump($ret['data']->errors());
                if ($ret['data']->errors()) {
                    // Do work to show error messages.
                     
                } 
               
               // die();
            }else{;
                if(empty($id))
                {
                    $id=$this->request->data['id'];
                }  
                
                $ret['data'] = $this->{$this->modelClass}->get($id, [
                    'contain' => $contain
                ]); 
                $ret['original_data']=$ret['data']->toArray();   

            } 
        
            
            $ret['data'] = $this->{$this->modelClass}->patchEntity($ret['data'], $this->request->data(),['associated'=>$associated]);

            if ($this->{$this->modelClass}->save($ret['data'])) {
                if ($this->request->is('ajax')) {
                    $ret['success']=true;
                    $ret['message']=$successText;
                }else{
                    $this->Flash->success($successText);
                    $this->redirect($successRedirect);                    
                }

            }else{
                if ($this->request->is('ajax')) {
                    $ret['success']=false;
                    $ret['message']=$failureText;
                    $ret['errors']=$ret['data']->errors();

                                     
                }else{                
                     $this->Flash->error($failureText);
                     //$this->redirect($failureRedirect);
                }
            }

        }else{
            $ret=false;
        }  
        return $ret;  
    }
    
    public function _deleteData($data,$successText="Delete success!", $failureText="Delete failed!", $successRedirect=['action' => 'index'], $failureRedirect=false){
        $ret = array('data'=>$data,'success'=>false,'message'=>$failureText, 'errors'=>[]);
        
        if ($this->{$this->modelClass}->delete($ret['data'])) {
                if ($this->request->is('ajax')) {
                    $ret['success']=true;
                    $ret['message']=$successText;
                }else{            
                    $this->Flash->success($successText);
                    $this->redirect($successRedirect);
                }
        } else {
                if ($this->request->is('ajax')) {
                    $ret['success']=false;
                    $ret['message']=$failureText;                 
                }else{                
                    $this->Flash->error($failureText);
                    $this->redirect($failureRedirect);
                }            
        } 
        
        return $ret;         
    }
    
    
    public function isAuthorized($user)
    {
        //Itt ellenõrizzük le majd queryvel, hogy van e engedélye az adott usernak az adott mûvelethez
        
        // Admin can access every action
        if ($this->Auth->user('id')) {
            return true;
        }

    }  
        
}
