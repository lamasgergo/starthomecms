<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * SentPropertiesContact Entity.
 */
class ShowedPropertiesContact extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
     /*
    protected $_accessible = [
        'property' => true,
        'contact' => true,
        'user' => true,
    ];
    */
    
    protected $_virtual = [
        'owner_phone',
        'contact_phone'
    ];
        
    protected function _getOwnerPhone()
    {
        if(!empty($this->_properties['Owner']['phone1'] )){
            return $this->transformPhone($this->_properties['Owner']['phone1type'], $this->_properties['Owner']['phone1']);    
        }

    }  
    protected function _getContactPhone()
    {
        if(!empty($this->_properties['Contact']['phone1'] )){
            return $this->transformPhone($this->_properties['Contact']['phone1type'], $this->_properties['Contact']['phone1']);    
        }

    }   
    protected function transformPhone($type, $number)
    {
        if(!empty($type) && ($type == 1 || $type == 3)){
            return '(36) '.substr($number,2,2).' / '.substr($number,4,3).'-'.substr($number,7,4);
        }else if(!empty($type) && $type == 2){
            return '(36) '.substr($number,2,1).' / '.substr($number,3,3).'-'.substr($number,6,4);
        }else if(!empty($type) && $type == 4){
            return '('.substr($number,0,2).') '.substr($number,2,10);
        } else{
            return $number;
        }
    }     
}
