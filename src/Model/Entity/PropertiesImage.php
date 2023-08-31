<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;

/**
 * PropertiesImage Entity.
 */
class PropertiesImage extends Entity
{
    protected $_virtual = ['image_tn','image_mini','image_original'];
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
     /*
    protected $_accessible = [
        'title' => true,
        'main' => true,
        'image' => true,
        'ordered' => true,
        'width' => true,
        'height' => true,
        'size' => true,
        'active' => true,
        'deleted' => true,
        'property' => true,
    ];
    */
     //TODO: remove file exists
    protected function _getImageTn()
    {
        if(file_exists(WWW_ROOT.DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.$this->_properties['property_id'].DS.'tn'.DS.$this->_properties['image'])){
            return DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.$this->_properties['property_id'].DS.'tn'.DS.$this->_properties['image'] ;
        }else{
            return DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.'tn'.$this->_properties['image'] ;
        }

    }
    protected function _getImageMini()
    {
        if(file_exists(WWW_ROOT.DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.$this->_properties['property_id'].DS.'mini'.DS.$this->_properties['image'])){
            return DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.$this->_properties['property_id'].DS.'mini'.DS.$this->_properties['image'] ;
        }else{
            return DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.'mini'.$this->_properties['image'] ;
        }
    }
    protected function _getImageOriginal()
    {
        if(file_exists(WWW_ROOT.DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.$this->_properties['property_id'].DS.'original'.DS.$this->_properties['image'])){
            return DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.$this->_properties['property_id'].DS.'original'.DS.$this->_properties['image'] ;
        }else{
            return DS.'uploads'.DS.Configure::read('ProperitiesImages.dir').DS.'original'.$this->_properties['image'] ;
        }
    }       
}
