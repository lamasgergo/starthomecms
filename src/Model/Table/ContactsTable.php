<?php
namespace App\Model\Table;

use App\Model\Entity\Contact;
use Cake\Core\Configure;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Search\Manager;
use SoftDelete\Model\Table\SoftDeleteTrait;
use Cake\ORM\TableRegistry;
use Cake\Event\Event;
use ArrayObject;

/**
 * Contacts Model
 */
class ContactsTable extends Table
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
        $this->table('contacts');
        $this->displayField('title');
        $this->primaryKey('id');
        $this->addBehavior('Timestamp');
        $this->addBehavior('Search.Search');
        $this->addBehavior('UserId');
          
        $this->belongsTo('Companies', [
            'joinType' => 'LEFT',
            'foreignKey' => 'company_id'
        ]);
        
        $this->belongsTo('InternalCompany', [
            'className' => 'Companies',
            'foreignKey' => 'internal_company_id',
            'joinType' => 'LEFT'
        ]);   
        $this->belongsTo('InternalCompanyContact', [
            'className' => 'Contacts',
            'foreignKey' => 'internal_agent',
            'joinType' => 'LEFT'
        ]);                        
      
        $this->belongsTo('Creator', [
            'className' => 'Users',
            'foreignKey' => 'user_id',
            'joinType' => 'LEFT'
        ]);
        $this->belongsToMany('Users');
        $this->belongsToMany('Properties',
        [
            'through' => 'PropertiesContacts'
            
        ]);
        $this->hasMany('ContactsSearches', [
            'className' => 'ContactsSearches',
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
        $validator->provider('phone', 'App\Model\Validation\PhoneValidator');
        
        $validator
            ->add('id', 'valid', ['rule' => 'numeric'])
            ->allowEmpty('id', 'create')
            //->requirePresence('phone1')
            ->add('phone1', 'exists', [
                'message'=> 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){
                    
                    $cond['OR']=[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ];
                    if(!empty($context['data']['id'])){
                        $cond['AND']=[
                                        'id <>'=>$context['data']['id']
                                    ];
                    }

                    $query=$this->find('all', ['conditions'=>$cond]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }  
                }
            ])
           // ->notEmpty('phone1','Adja meg a telefonszámot')
            ->allowEmpty('phone1')
            ->add('phone1', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone1type'],
                'provider' => 'phone'
            ])
            ->allowEmpty('phone2')
            ->add('phone2', 'exists', [
                'message' => 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){            
                    $cond['OR']=[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ];
                    if(!empty($context['data']['id'])){
                        $cond['AND']=[
                                        'id <>'=>$context['data']['id']
                                    ];
                    }
                    
                    $query=$this->find('all', ['conditions'=>$cond]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }   
                } 
            ])
            ->add('phone2', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone2type'],
                'provider' => 'phone'
            ])
            ->allowEmpty('phone3')
            ->add('phone3', 'custom', [
                'message'=> 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){
                    // Custom logic that returns true/false
                    $query=$this->find('all', [
                            'conditions'=>[
                                'OR'=>[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ],
                                'AND'=>[
                                    'id <>'=>$context['data']['id']
                                ]
                            ]
                    ]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }
                }
            ])
            ->add('phone3', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone3type'],
                'provider' => 'phone'
            ])
            ->allowEmpty('phone4')
            ->add('phone4', 'custom', [
                'message'=> 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){
                    // Custom logic that returns true/false
                    $query=$this->find('all', [
                            'conditions'=>[
                                'OR'=>[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ],
                                'AND'=>[
                                    'id <>'=>$context['data']['id']
                                ]
                            ]
                    ]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }
                }
            ])
            ->add('phone4', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone4type'],
                'provider' => 'phone'
            ])                
            ->allowEmpty('email1')
            ->add('email1', 'validFormat', [
                'rule' => 'email',
                'message' => 'Valós email címet adjon meg!'
            ])
            ->allowEmpty('email2')
            ->add('email2', 'validFormat', [
                'rule' => 'email',
                'message' => 'Valós email címet adjon meg!'
            ])
            ->allowEmpty('email3')
            ->add('email3', 'validFormat', [
                'rule' => 'email',
                'message' => 'Valós email címet adjon meg!'
            ])
            ->allowEmpty('email4')
            ->add('email4', 'validFormat', [
                'rule' => 'email',
                'message' => 'Valós email címet adjon meg!'
            ]);
         
        return $validator;
    }
    
    public function validationEasy(Validator $validator)
    {
        $validator->provider('phone', 'App\Model\Validation\PhoneValidator');
        
        $validator
            ->add('id', 'valid', ['rule' => 'numeric'])
            ->allowEmpty('id', 'create')
            ->requirePresence('phone1')
            ->add('phone1', 'exists', [
                'message'=> 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){
                    
                    $cond['OR']=[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ];
                    if(!empty($context['data']['id'])){
                        $cond['AND']=[
                                        'id <>'=>$context['data']['id']
                                    ];
                    }

                    $query=$this->find('all', ['conditions'=>$cond]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }
                }
            ])
            ->allowEmpty('phone1')
            ->add('phone1', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone1type'],
                'provider' => 'phone'
            ])
            ->allowEmpty('phone2')
            ->add('phone2', 'exists', [
                'message' => 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){
                    $cond['OR']=[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ];
                    if(!empty($context['data']['id'])){
                        $cond['AND']=[
                                        'id <>'=>$context['data']['id']
                                    ];
                    }
                    
                    $query=$this->find('all', ['conditions'=>$cond]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }
                } 
            ])
            ->add('phone2', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone2type'],
                'provider' => 'phone'
            ])
            ->allowEmpty('phone3')
            ->add('phone3', 'custom', [
                'message'=> 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){
                    // Custom logic that returns true/false
                    $query=$this->find('all', [
                            'conditions'=>[
                                'OR'=>[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ],
                                'AND'=>[
                                    'id <>'=>$context['data']['id']
                                ]
                            ]
                    ]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }
                }
            ])
            ->add('phone3', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone3type'],
                'provider' => 'phone'
            ])
            ->allowEmpty('phone4')
            ->add('phone4', 'custom', [
                'message'=> 'Az adott telefonszám már létezik!',
                'rule' => function ($value, $context){
                    // Custom logic that returns true/false
                    $query=$this->find('all', [
                            'conditions'=>[
                                'OR'=>[
                                    'phone1'=>$value,
                                    'phone2'=>$value,
                                    'phone3'=>$value,
                                    'phone4'=>$value
                                ],
                                'AND'=>[
                                    'id <>'=>$context['data']['id']
                                ]
                            ]
                    ]);
                    $results = $query->count();
                    if($results>0)
                    {
                        return false;
                    }else{
                        return true;
                    }
                }
            ])
            ->add('phone4', 'custom',[
                'message'=> 'Hibás számformátum!',
                'rule'=>['phone','phone4type'],
                'provider' => 'phone'
            ])                
            ->allowEmpty('email1')
            ->add('email1', 'validFormat', [
                'rule' => 'email',
                'message' => 'Valós email címet adjon meg!'
            ])
            ->allowEmpty('email2')
            ->add('email2', 'validFormat', [
                'rule' => 'email',
                'message' => 'Valós email címet adjon meg!'
            ]);
         
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
        $rules->add($rules->existsIn(['companies_id'], 'Companies'));
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        return $rules;
    }
    
    
    //Telefonszám ellenőrés
    public function phoneExists($value,$context)
    {
        // Custom logic that returns true/false
        $query=$this->find('all', [
                'conditions'=>[
                    'OR'=>[
                        'phone1'=>$value,
                        'phone2'=>$value,
                        'phone3'=>$value,
                        'phone4'=>$value
                    ],
                    'AND'=>[
                        'id <>'=>$context['data']['id']
                    ]
                ]
        ]);
        $results = $query->count();
        if($results>0)
        {
            return false;
        }else{
            return true;
        }

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
        ->value('contact_status', [
            'field' => $this->alias() . '.contact_status'
        ])
        ->like('query', [
            'before' => true,
            'after' => true,
            'mode' => 'or',
            'field' => [
                $this->alias() . '.fullname', $this->alias() . '.phone1', $this->alias() . '.phone2', $this->alias() . '.phone3',
                $this->alias() . '.phone4', $this->alias() . '.email1', $this->alias() . '.email2', 'Companies.name', $this->alias() . '.variation_data'
            ]
        ])
        ->like('name', [
            'before' => true,
            'after' => true,

            'field' => [$this->alias() . '.fullname']
        ])       
        ->like('email', [
            'before' => true,
            'after' => true,
            'mode' => 'or',
            'field' => [$this->alias() . '.email1', $this->alias() . '.email2']
        ])
        ->like('phone', [
            'before' => true,
            'after' => true,
            'mode' => 'or',
            'field' => [$this->alias() . '.phone1', $this->alias() . '.phone2', $this->alias() . '.phone3', $this->alias() . '.phone4']
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
        ->value('company_id', [
            'field' => 'Contacts.company_id'
        ])        
        ->callback('company_type', [
            'callback' => [$this, 'byCompany']
        ])
        ->callback('onlysearchers', [ 
            'callback' => [$this, 'onlySearchers']
        ])
        ->callback('onlyowners', [
            'callback' => [$this, 'onlyOwners']
        ])
        ->callback('list', [
            'callback' => [$this, 'searchByFullname']
        ])
        ->callback('user_id', [
            'callback' => [$this, 'searchByUserId']
        ])           
        ->callback('seen_user_id', [
            'callback' => [$this, 'searchBySeenUserId']
        ])
        ->like('company', [
            'before' => true,
            'after' => true,
            'mode' => 'or',
            'field' => [
                'Companies.name'
            ]
        ])



        ;
        return $search;
    }

// In a table or behavior class
    public function beforeMarshal(Event $event, ArrayObject $data, ArrayObject $options)
    {
        if(!empty($data['company_id']) and !is_numeric($data['company_id'])){
            $companiesTable = TableRegistry::get('Companies');
            if($companiesTable->findByName($data['company_id'])->count() == 0){
                $rec=$companiesTable->newEntity(array('name'=>$data['company_id'],'active'=>'1','type'=>'1'));
                if ($companiesTable->save($rec)) {
                    $data['company_id']=$rec->id;
                }
            }
        }
        if(!empty($data['internal_company_id']) and !is_numeric($data['internal_company_id'])){
            $companiesTable = TableRegistry::get('Companies');
            if($companiesTable->findByName($data['internal_company_id'])->count() == 0){
                $rec=$companiesTable->newEntity(array('name'=>$data['internal_company_id'],'active'=>'1','type'=>'2'));
                if ($companiesTable->save($rec)) {
                    $data['internal_company_id']=$rec->id;
                }
            }
        }
        if(!empty($data['internal_agent']) and !is_numeric($data['internal_agent'])){

            if($this->find()->where(['fullname' => $data['internal_agent'], 'company_id' => $data['internal_company_id']])->count() == 0){
                $name = explode(' ',$data['internal_agent']) ;
                $save = [
                    'fullname'=>$data['internal_agent'], 
                    'Contacts.company_id' => $data['internal_company_id'],
                    'active'=>'1'
                ];
                if(!empty($name[0]))$save['lastname']=$name[0];
                if(!empty($name[1]))$save['firstname']=$name[1];
                $rec=$this->newEntity($save);
                if ($this->save($rec)) {
                    $data['internal_agent']=$rec->id;
                }
            }
        }

        if(!empty($data['firstname'])){
            $data['firstname'] = trim($data['firstname']);
        }

        if(!empty($data['lastname'])){
            $data['lastname'] = trim($data['lastname']);
        }

        if(empty($data['phone3type']))$data['phone3type']=1;
        if(empty($data['phone4type']))$data['phone4type']=1;
        
    }
    

    public function onlySearchers(Query $query, array $args, \Search\Type\Base $search)
    {
        $query->where(['AND' => ['(SELECT count(contacts_searches.id) FROM contacts_searches WHERE contact_id = Contacts.id) >0']]);
    }

    public function onlyOwners(Query $query, array $args, \Search\Type\Base $search)
    {
        $query->where(['AND' => ['(SELECT count(properties_contacts.property_id) FROM properties_contacts WHERE contact_id = Contacts.id and type=1 ) >0']]);

    }

    public function searchByFullname(Query $query, array $args, \Search\Type\Base $search)
    {
        $noPrename = false;
        $search = ['Contacts.`fullname` LIKE "'.$args['list'].'%"'];
        foreach(Configure::read('Static.prename_type') as $prename){
            if(substr_count($args['list'], $prename)){
                $noPrename = false;
                break;
            }else{
                $noPrename = true;

            }
            $searchAll['OR'] [] = [ 'Contacts.fullname LIKE "'. $prename.' '. $args['list'].'%"'];

        }

        if($noPrename){
            $searchAll['OR'] [] = [ 'Contacts.fullname LIKE "'.$args['list'].'%"'];
            $search = $searchAll;
        }
        $query->where($search);
        
    }   
    public function searchByUserId(Query $query, array $args, \Search\Type\Base $search)
    {
      
        $query->where(['Contacts.user_id IN' => $args['user_id']]);         
     
        
    } 
    public function searchBySeenUserId(Query $query, array $args, \Search\Type\Base $search)
    {
        $query->join([
            'table' => 'contacts_users',
            'alias' => 'ContactsUsers',
            'type' => 'INNER',
            'conditions' => 'ContactsUsers.contact_id = Contacts.id'
        ]
        );

        $matchingContact = $this->association('Users')->find()
            ->select(['ContactsUsers.contact_id'])
            ->join([
                'table' => 'contacts_users',
                'alias' => 'ContactsUsers',
                'type' => 'INNER',
                'conditions' => 'ContactsUsers.user_id = Users.id',
            ])
            ->distinct()
            ->andWhere(['Contacts.user_id IN' => $args['seen_user_id']]);
        $query->where(['Contacts.id IN' => $matchingContact]);         
     
        
    } 
    
    public function byCompany(Query $query, array $args, \Search\Type\Base $search)
    {
        $query->where(['AND' => ['Companies.type' => $args['company_type']]]);
        
    }     
}
