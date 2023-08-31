<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;

/**
 * ContactsSearch Entity.
 */
class ContactsSearch extends Entity
{
    protected $_virtual = ['type_list'];
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     * Note that '*' is set to true, which allows all unspecified fields to be
     * mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
     /*
    protected $_accessible = [
        '*' => true,
        'id' => false,
        'contacts_id' => false,
        'users_id' => false,
    ]; */
    
    protected function _getTypeList()
    {
        if(!empty($this->_properties['type']))
        {
            $formatted=[];
            $types=explode(',',$this->_properties['type']);
            foreach($types as $onetype)
            {
                if(Configure::read('Static.advert_type.'.$onetype)){
                    $formatted[]=Configure::read('Static.advert_type.'.$onetype);    
                }
            }
            return implode(', ',$formatted);
        }else{
            return '';
        }          
    }     
       
}
