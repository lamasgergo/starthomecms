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
        return $room;
    }

    protected function _getBathRooms()
    {
        $room = 0;
        if(!empty($this->_properties['bathroom']))
        {
            $room+=$this->_properties['bathroom'];
        }
        return $room;
    }
}
