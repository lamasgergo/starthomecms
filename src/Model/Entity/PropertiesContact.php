<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;

/**
 * PropertiesImage Entity.
 */
class PropertiesContact extends Entity
{
    protected $_virtual = ['type_name'];

    protected function _getTypeName()
    {      
        if(!empty($this->_properties['type']) and Configure::read('Static.contact_property_type.'.$this->_properties['type']))
        {
            return Configure::read('Static.contact_property_type.'.$this->_properties['type']);
        }else{
            return '';
        }        
    }
 
}
