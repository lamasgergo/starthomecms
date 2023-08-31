<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;

/**
 * Contact Entity.
 */
class Contact extends Entity
{
    protected $_virtual = ['fullname','marial_status_name','nationality_name', 'variations',
    'phone1_formatted','phone2_formatted','phone3_formatted','phone4_formatted', 'user_list'
    ];
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    //protected $_accessible = ['*'];
    protected function _getFullname()
    {
        return (!empty($this->_properties['prename'])?Configure::read('Static.prename_type.'.$this->_properties['prename']).' ':'').(!empty($this->_properties['lastname'])?$this->_properties['lastname']:'').' '.(!empty($this->_properties['firstname'])?$this->_properties['firstname']:'') ;
    }   
    protected function _setFirstname($firstname)
    {
        $this->set('fullname', (!empty($this->_properties['prename'])?$this->_properties['prename'].' ':'').(!empty($this->_properties['lastname'])?trim($this->_properties['lastname']):'').' '.(!empty($this->_properties['firstname'])?trim($this->_properties['firstname']):''));
        return  $firstname;
    }  
    protected function _setLastname($lastname)
    {
        $this->set('fullname', (!empty($this->_properties['prename'])?$this->_properties['prename'].' ':'').(!empty($this->_properties['lastname'])?trim($this->_properties['lastname']):'').' '.(!empty($this->_properties['firstname'])?trim($this->_properties['firstname']):''));
        return  $lastname;
    }       

     
    protected function _getMarialStatusName()
    {
        if(!empty($this->_properties['marial_status']) and Configure::read('Static.marial_status_type.'.$this->_properties['marial_status']))
        {
            return Configure::read('Static.marial_status_type.'.$this->_properties['marial_status']);
        }else{
            return '';
        }          
    }   
    protected function _getNationalityName()
    {
        if(!empty($this->_properties['nationality']) and Configure::read('Static.nationality_type.'.$this->_properties['nationality']))
        {
            return Configure::read('Static.nationality_type.'.$this->_properties['nationality']);
        }else{
            return '';
        }          
    }
    protected function _getVariations()
    {
        if(!empty($this->_properties['variation_data'])){
            return json_decode($this->_properties['variation_data']);
        }
    }   
    
    protected function _getPhone1Formatted()
    {
        if(!empty($this->_properties['phone1']))  return $this->transformPhone($this->_properties['phone1type'], $this->_properties['phone1']);  
    }  
    
    protected function _getPhone2Formatted()
    {
        if(!empty($this->_properties['phone2'])) return $this->transformPhone($this->_properties['phone2type'], $this->_properties['phone2']); 
    }  
    protected function _getPhone3Formatted()
    {
        if(!empty($this->_properties['phone3'])) return $this->transformPhone($this->_properties['phone3type'], $this->_properties['phone3']);   
    }   
    protected function _getPhone4Formatted()
    {
        if(!empty($this->_properties['phone4'])) return $this->transformPhone($this->_properties['phone4type'], $this->_properties['phone4']);
  
    }   
    protected function transformPhone($type, $number)
    {      
        if(!empty($type) && ($type == 1 || $type == 3)){
            return '(36) '.substr($number,2,2).' / '.substr($number,4,3).'-'.substr($number,7,4);
        }else if(!empty($type) && $type == 2){
            return '(36) '.substr($number,2,1).' / '.substr($number,3,3).'-'.substr($number,6,4);
        }else if(!empty($type) && $type == 4){
            return '('.substr($number,0,2).') '.substr($number,2,strlen($number));
        } else{
            return $number;
        }
    }   
    
    protected function _getUserList()
    {
        $userList = [];
        if(!empty($this->_properties['creator'])) {
            $userList[]= $this->_properties['creator']->fullname;
        }
        if(!empty($this->_properties['users'])) {
            foreach($this->_properties['users'] as $user){
                if(!empty($user->fullname)){
                    $userList[]= $user->fullname;   
                }
            }   
            
        }
        if(!empty($userList)){
            return implode(', ', $userList);
        }
  
    }   
}
