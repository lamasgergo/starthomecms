<?php
namespace App\Model\Table;

use App\Model\Entity\Street;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;

/**
 * Streets Model
 */
class StreetsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('streets');
        $this->displayField('id');
        $this->primaryKey('id');
        $this->addBehavior('Timestamp');
  
        $this->addBehavior('Search.Search');
        $this->belongsTo('Cities', [
            'foreignKey' => 'city_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Districts', [
            'foreignKey' => 'district_id',
            'joinType' => 'LEFT'
        ]);
        $this->hasMany('Properties', [
            'foreignKey' => 'street_id'
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
            ->allowEmpty('street')
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
        $rules->add($rules->existsIn(['district_id'], 'Districts'));
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
        ->value('district_id', [
            'field' => $this->alias() . '.district_id'
        ])
        ->like('query', [
            'after'=>true,
            'before'=>false,
            'field' =>   $this->alias() . '.street'
        ]) ;
        return $search;
    }    
}
