<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Machine Entity.
 */
class Machine extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'shop' => true,
        'type' => true,
        'default_machine' => true,
        'default_parts' => true,
        'serialnumber' => true,
        'extra_parts' => true,
        'checklist' => true,
        'note' => true,
        'internalnote' => true,
        'worker' => true,
    ];
}
