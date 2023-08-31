<?php
namespace App\Model\Table;

use App\Model\Entity\Event;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;

/**
 * Events Model
 */
class EventsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('events');
        $this->displayField('id');
        $this->primaryKey('id');
        $this->addBehavior('Timestamp');
  
        $this->addBehavior('Search.Search');
        $this->belongsTo('Users', [
            'foreignKey' => 'user_id'
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
            ->add('id', 'valid', ['rule' => 'numeric']);

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
        ->value('controller', [
            'field' => $this->alias() . '.controller'
        ])
        ->value('link_model', [
            'mode' => 'or',
            'field' => [$this->alias() . '.link_model', $this->alias() . '.referer_model' ]
        ])
        ->value('link_id', [
            'field' => $this->alias() . '.link_id'
        ])
        ->callback('bymodel', [
            'callback' => [$this, 'allEvent']
        ])   ;
        return $search;
    }   
    
    public function allEvent(Query $query, array $args, \Search\Type\Base $search) {
        $query->where([
            'or'=>[
                ['Events.link_model' => $args['bymodel'], 'Events.link_model_id'=>$args['byid']],
                ['Events.referer_model' => $args['bymodel'], 'Events.referer_model_id'=>$args['byid']]
            ]
        ]); 
       // $query->where(['PropertiesContacts.link_model' => $args['allevent']]); 
    }  
      
     
}
