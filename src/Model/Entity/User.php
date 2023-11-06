<?php
namespace App\Model\Entity;

use Cake\Auth\DefaultPasswordHasher;
use Cake\ORM\Entity;
use Cake\Utility\Text;

/**
 * User Entity.
 */
class User extends Entity
{
    protected $_virtual = ['fullname', 'avatar_mini'];
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
   /*  
    protected $_accessible = [
        'email' => true,
        'activation_key' => true,
        'lastname' => true,
        'firstname' => true,
        'picture' => true,
        'active' => true,
        'deleted' => true,
        'deleted_date' => true,
        'role_id' => true
    ];   
    */
    protected function _getFullname()
    {
        return Text::wrap($this->_properties['lastname'].' '.$this->_properties['firstname'], 22) ;
    }   
    
    protected function _getAvatarMini()
    {

        if(empty($this->_properties['picture'])){
            return '/img/nousericon.png';   
        }
        return '/uploads/users/'.$this->_properties['picture'] ;
    }     
       
    protected function _setPassword($password)
    {
        return (new DefaultPasswordHasher)->hash($password);
    }  
         
}
