<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * District Entity.
 */
class District extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'city_id' => true,
        'district' => true,
        'active' => true,
        'deleted' => true,
        'city' => true,
        'cityparts' => true,
        'properties' => true,
        'streets' => true,
    ];
}
