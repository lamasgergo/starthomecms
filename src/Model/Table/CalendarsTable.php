<?php
namespace App\Model\Table;

use App\Model\Entity\Calendar;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;

/**
 * Calendars Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsTo $PropertiesVariations
 */
class CalendarsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('calendars');
        $this->displayField('date');
        $this->primaryKey('id');
        
        $this->addBehavior('Timestamp');
        $this->addBehavior('Search.Search');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
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
         /*
        $validator
            ->add('date', 'valid', ['rule' => 'datetime'])
            ->allowEmpty('date');

        $validator
            ->allowEmpty('note');
        */
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
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['properties_variations_id'], 'PropertiesVariations'));
        $rules->add($rules->existsIn(['properties_variations_property_id'], 'PropertiesVariations'));
        return $rules;
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
            'field' => [$this->alias() . '.date']
        ])
        ->callback('dashboard', [
            'callback' => [$this, 'searchDashboard']
        ]);

        return $search;
    }

    public function searchDashboard(Query $query, array $args, \Search\Type\Base $search) {
        $query->where([
            'Calendars.active' => 1 ,
            'Calendars.date <=' => date('Y-m-d', strtotime('+7 days')),
            'Calendars.date >=' => date('Y-m-d', strtotime('-3 days')),
            
        ]);
    }
}
