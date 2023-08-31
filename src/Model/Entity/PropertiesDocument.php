<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;

/**
 * PropertiesDocument Entity.
 */
class PropertiesDocument extends Entity
{
    protected $_virtual = [
        'document_type_name'
    ];
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
     
    protected function _getDocumentTypeName()
    {
        if(!empty($this->_properties['document_type']) and Configure::read('Static.document_type.'.$this->_properties['document_type']))
        {
            return Configure::read('Static.document_type.'.$this->_properties['document_type']);
        }else{
            return '';
        }          
    }      

}
