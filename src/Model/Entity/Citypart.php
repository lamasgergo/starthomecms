<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Citypart Entity.
 */
class Citypart extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'city_id' => true,
        'district_id' => true,
        'citypart' => true,
        'active' => true,
        'deleted' => true,
        'city' => true,
        'district' => true,
        'properties' => true,
    ];
}
