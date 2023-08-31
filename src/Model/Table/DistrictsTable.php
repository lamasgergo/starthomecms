<?php
namespace App\Model\Table;

use App\Model\Entity\District;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;

/**
 * Districts Model
 */
class DistrictsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('districts');
        $this->displayField('district');
        $this->primaryKey('id');
        $this->addBehavior('Timestamp');
  
        $this->addBehavior('Search.Search');
        $this->belongsTo('Cities', [
            'foreignKey' => 'city_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('Cityparts', [
            'foreignKey' => 'district_id'
        ]);
        $this->hasMany('Properties', [
            'foreignKey' => 'district_id'
        ]);
        $this->hasMany('Streets', [
            'foreignKey' => 'district_id'
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
            ->allowEmpty('district')
            ->add('active', 'valid', ['rule' => 'numeric'])
            ->requirePresence('active', 'create')
            ->notEmpty('active')
            ->add('deleted', 'valid', ['rule' => 'datetime'])
            ->allowEmpty('deleted');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['city_id'], 'Cities'));
        return $rules;
    }
  

    /*
        search configs
    */
    public function searchConfiguration()
    {
        $search = new Manager($this);
        $search
        ->value('id', [
            'field' => $this->alias() . '.id'
        ])
        ->value('city_id', [
            'field' => $this->alias() . '.city_id'
        ])
        ;
        return $search;
    }    
}
