<?php
namespace App\Model\Behavior;

use Cake\Event\Event;
use Cake\ORM\Behavior;
use Cake\ORM\Entity;
use Cake\ORM\Query;
use Cake\Utility\Inflector;

class UserIdBehavior extends Behavior
{
    protected $_user = null;  
    
    public function setUser($user = null) {
        if ($user) {
            $this->_user = $user;
        }  
        return $this->_user;
    }    
    
    public function beforeSave(Event $event, Entity $entity)
    {
        if(!empty($this->_user))
        {
            $entity->set('user_id', $this->_user);
        }     

    }

}