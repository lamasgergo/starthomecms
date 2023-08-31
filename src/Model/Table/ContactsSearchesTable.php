<?php
namespace App\Model\Table;

use App\Model\Entity\ContactsSearch;
use Cake\Core\Configure;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;
use SoftDelete\Model\Table\SoftDeleteTrait;
use Cake\ORM\TableRegistry;

/**
 * ContactsSearches Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Contacts
 * @property \Cake\ORM\Association\BelongsTo $Users
 */
class ContactsSearchesTable extends Table
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
        parent::initialize($config);

        $this->table('contacts_searches');
        $this->displayField('id');
        $this->primaryKey(['id']);

        $this->addBehavior('Timestamp');
        $this->addBehavior('Search.Search');
        $this->addBehavior('UserId');

        $this->belongsTo('Contacts', [
            'foreignKey' => 'contact_id',
            'joinType' => 'LEFT'
        ]);
        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'LEFT'
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
        $rules->add($rules->existsIn(['contacts_id'], 'Contacts'));
        $rules->add($rules->existsIn(['users_id'], 'Users'));
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
            ->value('contact_id', [
                'field' => $this->alias() . '.contact_id'
            ])
            ->callback('contact_name', [
                'callback' => [$this, 'filterByName']
            ])
            ->like('email', [
                'before' => true,
                'after' => true,
                'mode' => 'or',
                'field' => ['Contacts.email1','Contacts.email2']
            ])
            ->like('phone', [
                'before' => true,
                'after' => true,
                'mode' => 'or',
                'field' => ['Contacts.phone1', 'Contacts.phone2', 'Contacts.phone3', 'Contacts.phone4']
            ])
            ->like('internal_company', [
                'before' => true,
                'after' => true,
                'field' => 'InternalCompany.name'
            ])
            ->like('internal_agent', [
                'before' => true,
                'after' => true,
                'field' => 'InternalCompanyContact.fullname'
            ])
            ->like('note', [
                'before' => true,
                'after' => true,
                'field' => $this->alias().'.note'
            ])
            ->value('user_id', [
                'field' => $this->alias() . '.user_id'
            ])
            ->value('active', [
                'field' => $this->alias() . '.active'
            ])
            ->callback('property_id', [
                'callback' => [$this, 'filterByProperty']
            ])         ;
        return $search;
    }

    public function filterByName(Query $query, array $args, $search) {


        $nameSearch= [];

        foreach(Configure::read('Static.prename_type') as $prename){
            if(substr_count($args['contact_name'], $prename)){
                $prenameId =array_search($prename, Configure::read('Static.prename_type'));
                $nameSearch['prename'] = $prenameId;

            }
            $args['contact_name'] = str_replace($prename.' ','',$args['contact_name']);

        }

        $nameSearch['Contacts.fullname LIKE'] = $args['contact_name'];

        $query->where($nameSearch);
    }

    public function filterByProperty(Query $query, array $args, $search) {

        $propertyTable = TableRegistry::get('Properties');
        $porperty = $propertyTable->findById($args['property_id'])->contain('PropertiesLayouts')->first();

        $search=[
            'FIND_IN_SET("'.$porperty->city_id.'", city_id)',
            'FIND_IN_SET("'.$porperty->district_id.'", district_id)',
            'bedroom_from <=' => $porperty->properties_layout->room,
            'bedroom_to >=' => $porperty->properties_layout->room
        ];
        if($porperty->rent==1)array_push($search,  'FIND_IN_SET("1", type)') ;
        if($porperty->sell==1)array_push($search,  'FIND_IN_SET("2", type)') ;
        $query->where($search);
    }
    
    public function afterSave($event, $entity, $options){
        $num = $this->find()->where(['contact_id' => $entity->contact_id])->count();
        $contact = $this->Contacts->get($entity->contact_id);
        $contact->search_count =    $num;
        $this->Contacts->save($contact);
    }

    /*
        before save actions
    */
    /*  
    public function beforeSave($event, $entity, $options){
        //var_dump($entity);
        //die();
        //$entity->building_type=implode(',',$entity->building_type);
    }
    */
}
