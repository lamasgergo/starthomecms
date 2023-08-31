<?php
namespace App\Model\Table;

use App\Model\Entity\City;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;

/**
 * Cities Model
 */
class CitiesTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('cities');
        $this->displayField('id');
        $this->primaryKey('id');
        $this->addBehavior('Timestamp');
  
        $this->addBehavior('Search.Search');
        $this->hasMany('Cityparts', [
            'foreignKey' => 'city_id'
        ]);
        $this->hasMany('Districts', [
            'foreignKey' => 'city_id'
        ]);
        $this->hasMany('Properties', [
            'foreignKey' => 'city_id'
        ]);
        $this->hasMany('Streets', [
            'foreignKey' => 'city_id'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->add('id', 'valid', ['rule' => 'numeric'])
            ->allowEmpty('id', 'create')
            ->notEmpty('city');

        return $validator;
    }
  

    /*
        search configs
    */
    public function searchConfiguration()
    {
        $search = new Manager($this);
        $search
        ->like('query', [
            'before' => true,
            'after' => true,
            'field' => [$this->alias() . '.city']
        ])
        ->value('id', [
            'field' => 'Cities.id'
        ]);
        return $search;
    }    
}
