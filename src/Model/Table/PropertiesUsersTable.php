<?php
namespace App\Model\Table;

use App\Model\Entity\Property;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;


/**
 * Properties Model
 */
class PropertiesUsersTable extends Table
{
    public function initialize(array $config)
    {
        $this->belongsTo('Properties');
        $this->belongsTo('Users');
    }
}