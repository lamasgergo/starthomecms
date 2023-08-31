<?php
namespace App\Model\Table;

use App\Model\Entity\PropertiesContact;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Search\Manager;
/**
 * Properties Model
 */
class PropertiesContactsTable extends Table
{
    public function initialize(array $config)
    {
        $this->addBehavior('Search.Search');
        $this->addBehavior('Timestamp');
        $this->belongsTo('Properties');
        $this->belongsTo('Contacts');
    }
    
    /*
        search configs
    */
    public function searchConfiguration()
    {
        $search = new Manager($this);
        $search
        ->value('property_id', [
            'field' => $this->alias() . '.property_id'
        ]) ;
        return $search;
    }          
}