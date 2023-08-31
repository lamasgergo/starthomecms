<?php
namespace App\Model\Table;

use App\Model\Entity\PropertiesVariation;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Search\Manager;
use Cake\Validation\Validator;
use SoftDelete\Model\Table\SoftDeleteTrait;

/**
 * PropertiesVariations Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Properties
 */
class PropertiesVariationsTable extends Table
{
    use SoftDeleteTrait;
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('properties_variations');
        $this->displayField('id');
        $this->primaryKey(['id']);
        $this->addBehavior('Timestamp');
        $this->addBehavior('Search.Search');        
        $this->belongsTo('Properties', [
            'foreignKey' => 'property_id',
            'joinType' => 'INNER'
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
        $rules->add($rules->existsIn(['property_id'], 'Properties'));
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
        ->value('sell', [
            'mode' => 'or',
            'field' => 'Properties.sell'
        ])
        ->value('rent', [
            'mode' => 'or',
            'field' => 'Properties.rent'
        ]);
        return $search;
    }       
}
