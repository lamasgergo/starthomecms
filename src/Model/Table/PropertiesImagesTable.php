<?php
namespace App\Model\Table;

use App\Model\Entity\PropertiesImage;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;
use SoftDelete\Model\Table\SoftDeleteTrait;

/**
 * PropertiesImages Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Properties
 */
class PropertiesImagesTable extends Table
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
        $this->table('properties_images');
        $this->displayField('title');
        $this->primaryKey(['id']);
        $this->addBehavior('Timestamp');
        $this->addBehavior('Search.Search');
        $this->addBehavior('Burzum/Imagine.Imagine');
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
        $validator
            ->add('id', 'valid', ['rule' => 'numeric'])
            ->allowEmpty('id', 'create');


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
        ->value('active', [
            'field' => $this->alias() . '.active'
        ])
        ->value('property_id', [
            'field' => $this->alias() . '.property_id'
        ]);
        return $search;
    }

    public function afterSave($event, $entity, $options){
        $this->Properties->updateAll(['modified' => date('Y-m-d H:i:s')], ['id' => $entity->property_id]);
    }
}
