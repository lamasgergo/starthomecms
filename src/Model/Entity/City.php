<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * City Entity.
 */
class City extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'city' => true,
        'active' => true,
        'deleted' => true,
        'cityparts' => true,
        'districts' => true,
        'properties' => true,
        'streets' => true,
    ];
}
