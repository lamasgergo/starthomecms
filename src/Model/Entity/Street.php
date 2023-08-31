<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Street Entity.
 */
class Street extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'city_id' => true,
        'district_id' => true,
        'street' => true,
        'active' => true,
        'deleted' => true,
        'city' => true,
        'district' => true,
        'properties' => true,
    ];
}
