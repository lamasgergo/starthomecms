<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * PropertiesLayout Entity.
 */
class PropertiesLayout extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */

    protected function _getRooms()
    {
        $room = null;
        if(!empty($this->_properties['room']))
        {
            $room.=$this->_properties['room'];
        }
        if(!empty($this->_properties['half_room']))
        {
            $room.='+'.$this->_properties['half_room'];
        }
        return $room;
    }
}
