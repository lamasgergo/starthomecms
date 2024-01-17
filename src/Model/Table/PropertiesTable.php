<?php
namespace App\Model\Table;

use App\Model\Entity\Property;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use App\Model\Table\Event;
use Search\Manager;
use SoftDelete\Model\Table\SoftDeleteTrait;
use Cake\Core\Configure;

/**
 * Properties Model
 */
class PropertiesTable extends Table
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
        $this->table('properties');
        $this->displayField('id');
        $this->primaryKey(['id']);

        $this->addBehavior('Timestamp');
        $this->addBehavior('Search.Search');
        $this->addBehavior('UserId');

        $this->belongsTo('Cities', [
            'foreignKey' => 'city_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Districts', [
            'foreignKey' => 'district_id',
            'joinType' => 'LEFT'
        ]);
        $this->belongsTo('Streets', [
            'foreignKey' => 'street_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Cityparts', [
            'foreignKey' => 'citypart_id',
            'joinType' => 'LEFT'
        ]);
        $this->belongsTo('Users', [
            'className' => 'Creator',
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsToMany('Users');

        $this->belongsTo('Editor', [
            'className' => 'Users',
            'foreignKey' => 'now_editing_user_id',
            'joinType' => 'LEFT'
        ]);

        $this->belongsToMany('Contacts',[
            'through' => 'PropertiesContacts',
            'saveStrategy' => 'append'
        ]);

        $this->hasOne('Rentvar',[
            'className'=>'PropertiesVariations',
            'conditions'=>['Rentvar.type'=>'1'],
            'joinType'=>'LEFT'
        ]);

        $this->hasOne('Sellvar',[
            'className'=>'PropertiesVariations',
            'conditions'=>['Sellvar.type'=>'2'],
            'joinType'=>'LEFT'
        ]);

        $this->hasOne('Mainimage',[
            'className'=>'PropertiesImages',
            'conditions'=>['Mainimage.main'=>'1', 'Mainimage.active'=>'1', 'Mainimage.deleted IS'=>null],
            'joinType'=>'LEFT'
        ]);

        /*       
        $this->belongsToMany('Contact', [
            'className'=>'Contacts',
            'through' => 'PropertiesContacts',
            'conditions'=>['PropertiesContacts.main'=>'1', 'PropertiesContacts.type'=>2],
        ]);      
        
        $this->belongsToMany('Owner', [
            'className'=>'Contacts',
            'through' => 'PropertiesContacts',
            'targetForeignKey' => 'contact_id',
            'conditions'=>['PropertiesContacts.main'=>'1', 'PropertiesContacts.type'=>1],
        ]);  
        */

        $this->hasOne('PropertiesVariations', [
            'joinType' => 'LEFT',
            'conditions' => ['PropertiesVariations.deleted IS'=>null],
            'dependent' => true,
            'cascadeCallbacks' => true,
        ]);
        $this->hasOne('PropertiesLayouts', [
            'joinType' => 'LEFT',
            'conditions' => ['PropertiesLayouts.main'=>1]
        ]);
        //'PropertiesVariations.active'=>'1', 

        $this->hasMany('PropertiesImages', [
            'conditions' => ['PropertiesImages.active'=>1, 'PropertiesImages.deleted IS'=>null],
            'sort' => ['PropertiesImages.ordered' => 'ASC'],
            'dependent' => true,
            'cascadeCallbacks' => true,
        ]);
        $this->hasMany('PropertiesImagesAll', [
            'conditions' => ['PropertiesImagesAll.deleted IS'=>null],
            'sort' => ['PropertiesImagesAll.active' => 'DESC', 'PropertiesImagesAll.ordered' => 'ASC'] ,
            'className' => 'PropertiesImages',
            'dependent' => true,
            'cascadeCallbacks' => true,
        ]);

        $this->hasMany('PropertiesDocuments', [
            'conditions' => ['PropertiesDocuments.deleted IS'=>null]
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
            ->add('contacts', 'custom', ['rule' => function($value, $context){
                $phone = [];
                foreach($context['data']['contacts'] as $contact){
                    if(!empty($contact['phone1'])) {
                        if (in_array($contact['phone1'], $phone)) {
                            return false;
                        } else {
                            $phone[] = $contact['phone1'];
                        }
                    }
                    if(!empty($contact['phone2'])) {
                        if (in_array($contact['phone2'], $phone)) {
                            return false;
                        } else {
                            $phone[] = $contact['phone2'];
                        }
                    }
                }
                return true;

            },
                'message' => 'Duplikált telefonszám'
            ])
            ->allowEmpty('id', 'create')
            ->add('city_id', 'valid', ['rule' => 'numeric'])
            ->requirePresence('city_id')
            ->notEmpty('city_id', __('Kötelező mező'))
            ->add('street_id', 'valid', ['rule' => 'numeric'])
            ->requirePresence('street_id', __('Kötelező mező'))
            ->notEmpty('street_id', __('Kötelező mező'))
            ->allowEmpty('streetnum');


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
        $rules->add($rules->existsIn(['citiy_id'], 'Cities'));
        $rules->add($rules->existsIn(['district_id'], 'Districts'));
        $rules->add($rules->existsIn(['street_id'], 'Streets'));
        $rules->add($rules->existsIn(['citypart_id'], 'Cityparts'));
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
            ->value('variation_id', [
                'field' => 'PropertiesVariations.id'
            ])
            ->like('variation_id_search', [
                'after'=>true,
                'before'=>false,
                'field' => 'PropertiesVariations.id'
            ])
            ->value('type', [
                'mode' => 'or',
                'field' =>  'PropertiesVariations.type'
            ])
            ->value('city_id', [
                'mode' => 'or',
                'field' =>  $this->alias() .'.city_id'
            ])
            ->value('offer', [
                'field' =>  'PropertiesVariations.offer'
            ])
            /*
            ->value('district_id', [
                'mode' => 'or',
                'field' =>  $this->alias() .'.district_id'
            ])
            */
            ->callback('district_id', [
                'callback' => [$this, 'districtId']
            ])

            ->like('query', [
                'after'=>true,
                'before'=>false,
                'mode' => 'or',
                'field' =>  ['Streets.street', 'PropertiesVariations.id']
            ])
            ->like('city', [
                'after'=>true,
                'before'=>false,
                'field' =>  'Cities.city'
            ])

            ->callback('street', [
                'callback' => [$this, 'streetSearch']
            ])

            ->callback('price_from', [
                'callback' => [$this, 'priceSearchFrom']
            ])
            ->callback('price_to', [
                'callback' => [$this, 'priceSearchTo']
            ])
            ->callback('streetnum_from', [
                'callback' => [$this, 'streetNumSearchFrom']
            ])
            ->callback('streetnum_to', [
                'callback' => [$this, 'streetNumSearchTo']
            ])
            /*
            ->compare('streetnum_from', [
            'operator'=>'>=',
            'field' =>  $this->alias() .'.streetnum'
            ])
            ->compare('streetnum_to', [
                'operator'=>'<=',
                'field' =>  $this->alias() .'.streetnum'
            ])
            */
            ->value('building_type', [
                'mode' => 'or',
                'field' =>  $this->alias() .'.building_type'
            ])
            ->value('furniture_type', [
                'mode' => 'or',
                'field' =>  'PropertiesVariations.furniture_type'
            ])
            ->callback('panorama_type', [
                'callback' => [$this, 'searchPanorama']
            ])
            ->callback('parking', [
                'callback' => [$this, 'parkingType']
            ])

            ->value('petallowed', [
                'field' =>  $this->alias() .'.petallowed'
            ])
            ->value('gardencontact', [
                'field' =>  $this->alias() .'.gardencontact'
            ])
            ->value('lowerlevel', [
                'field' =>  $this->alias() .'.lowerlevel'
            ])
            ->value('upperlevel', [
                'field' =>  $this->alias() .'.upperlevel'
            ])
            ->value('shortterm', [
                'field' =>  'PropertiesVariations.shortterm'
            ])
            ->value('outlook', [
                'mode' => 'or',
                'field' =>  $this->alias() .'.outlook'
            ])
            ->callback('terrace', [
                'callback' => [$this, 'searchTerrace']
            ])
            ->value('newlybuilt', [
                'field' =>  $this->alias() .'.newlybuilt'
            ])
            ->value('aircondition', [
                'field' =>  $this->alias() .'.aircondition'
            ])
            ->compare('builddate_from', [
                'operator'=>'>=',
                'includeEmpty' => true,
                'field' =>  $this->alias() .'.builddate'
            ])
            ->compare('builddate_to', [
                'operator'=>'<=',
                'includeEmpty' => true,
                'field' =>  $this->alias() .'.builddate'
            ])
            ->callback('pool_type', [
                'callback' => [$this, 'poolType']
            ])
            ->compare('rate', [
                'operator'=>'>=',
                'field' =>  $this->alias() .'.rate'
            ])
            ->compare('size_net_from', [
                'operator'=>'>=',
                'includeEmpty' => true,
                'field' =>  $this->alias() .'.size_net'
            ])
            ->compare('size_net_to', [
                'operator'=>'<=',
                'includeEmpty' => true,
                'field' =>  $this->alias() .'.size_net'
            ])
            ->callback('contact_name', [
                'callback' => [$this, 'contactName']
            ])
            /*
            ->like('contact_phone', [
                'after'=>true,
                'before'=>true,
                'mode' => 'or',
                'field' =>  array('Owner.phone1','Owner.phone2','Owner.phone3','Owner.phone4')
            ])
            */
            ->callback('contact_phone', [
                'callback' => [$this, 'contactPhone']
            ])
            ->callback('contact_email', [
                'callback' => [$this, 'contactEmail']
            ])
            ->callback('contact_id', [
                'callback' => [$this, 'contactId']
            ])
            ->value('active', [
                'mode' => 'or',
                'field' =>  'PropertiesVariations.active'
            ])
            ->value('ing_com', [
                'field' =>  'PropertiesVariations.ing_com'
            ])
            ->value('gdn', [
                'field' =>  'PropertiesVariations.gdn'
            ])
            ->value('user_id', [
                'mode' => 'or',
                'field' =>  $this->alias() .'.user_id'
            ])
            ->value('ident', [
                'mode' => 'or',
                'field' =>   'PropertiesVariations.id'
            ])
            ->compare('bedroom_from', [
                'operator'=>'>=',
                'includeEmpty' => true,
                'field' =>  'COALESCE(PropertiesLayouts.room,0)'
            ])
            ->compare('bedroom_to', [
                'operator'=>'<=',
                'includeEmpty' => true,
                'field' =>  'COALESCE(PropertiesLayouts.room,0)'
            ])
            ->compare('bathroom_from', [
                'operator'=>'>=',
                'includeEmpty' => true,
                'field' =>  'COALESCE(`PropertiesLayouts`.`bathroom`,0)'
            ])
            ->compare('bathroom_to', [
                'operator'=>'<=',
                'includeEmpty' => true,
                'field' =>  'COALESCE(`PropertiesLayouts`.`bathroom`,0)'
            ])
            ->callback('archived', [
                'callback' => [$this, 'searchArchived']
            ])
            ->callback('close_enddate', [
                'callback' => [$this, 'closeEnddate']
            ])

            ->callback('last_enddate', [
                'callback' => [$this, 'lastEnddate']
            ])

            ->callback('selector', [
                'callback' => [$this, 'trash']
            ])

            //ez m?g nicns meg

            ->value('americankitchen', [
                'mode' => 'or',
                'field' =>  $this->alias() .'.americankitchen'
            ])
            ->compare('lastdate_from', [
                'operator'=>'>=',
                'field' =>  $this->alias() .'.lastevent'
            ])
            ->compare('lastdate_to', [
                'operator'=>'<=',
                'field' =>  $this->alias() .'.lastevent'
            ]);
        return $search;
    }

    public function districtId(Query $query, array $args, \Search\Type\Base $search) {
        if(in_array('9999',$args['district_id'])){
            $query->where(['OR' => ['Properties.district_id IN' => $args['district_id'], 'Properties.city_id !=' => 2]]);

        }else{
            $query->where(['Properties.district_id IN' => $args['district_id'], 'Properties.city_id =' => 2]);
        }
    }

    public function contactPhone(Query $query, array $args, \Search\Type\Base $search) {

        $matchingContact = $this->association('Contacts')->find()
            ->select(['PropertiesContacts.property_id'])
            ->join([
                'table' => 'properties_contacts',
                'alias' => 'PropertiesContacts',
                'type' => 'INNER',
                'conditions' => 'PropertiesContacts.contact_id = Contacts.id',
            ])
            ->distinct()
            ->andWhere(['OR' =>[['phone1 LIKE' => '%'.$args['contact_phone'].'%'], ['phone2 LIKE' => '%'.$args['contact_phone'].'%'], ['phone3 LIKE' => '%'.$args['contact_phone'].'%','phone4 LIKE' => '%'.$args['contact_phone'].'%']]]);
        $query->where(['Properties.id IN' => $matchingContact]);
    }

    public function contactEmail(Query $query, array $args, \Search\Type\Base $search) {

        $matchingContact = $this->association('Contacts')->find()
            ->select(['PropertiesContacts.property_id'])
            ->join([
                'table' => 'properties_contacts',
                'alias' => 'PropertiesContacts',
                'type' => 'INNER',
                'conditions' => 'PropertiesContacts.contact_id = Contacts.id',
            ])
            ->distinct()
            ->andWhere(['OR' => [['email1 LIKE' => '%'.$args['contact_email'].'%'], ['email2 LIKE' => '%'.$args['contact_email'].'%']]]);
        $query->where(['Properties.id IN' => $matchingContact]);
    }

    public function contactName(Query $query, array $args, \Search\Type\Base $search) {

        $search = ['Contacts.`fullname` LIKE "'.$args['contact_name'].'%"'];
        foreach(Configure::read('Static.prename_type') as $prename){
            if(substr_count($args['contact_name'], $prename)){
                $noPrename = false;
                break;
            }else{
                $noPrename = true;

            }
            $searchAll['OR'] [] = [ 'Contacts.fullname LIKE "'. $prename.' '. $args['contact_name'].'%"'];

        }

        if($noPrename){
            $searchAll['OR'] [] = [ 'Contacts.fullname LIKE "'.$args['contact_name'].'%"'];
            $search = $searchAll;
        }
        $matchingContact = $this->association('Contacts')->find()
            ->select(['PropertiesContacts.property_id'])
            ->join([
                'table' => 'properties_contacts',
                'alias' => 'PropertiesContacts',
                'type' => 'INNER',
                'conditions' => 'PropertiesContacts.contact_id = Contacts.id',
            ])
            ->distinct()
            ->andWhere($search);
        $query->where(['Properties.id IN' => $matchingContact]);
    }

    public function contactId(Query $query, array $args, \Search\Type\Base $search) {

        $matchingContact = $this->association('Contacts')->find()
            ->select(['PropertiesContacts.property_id'])
            ->join([
                'table' => 'properties_contacts',
                'alias' => 'PropertiesContacts',
                'type' => 'INNER',
                'conditions' => 'PropertiesContacts.contact_id = Contacts.id',
            ])
            ->distinct()
            ->where(['Contacts.id' => $args['contact_id'], 'type IN (1,2)']);

        $query->where(['Properties.id IN' => $matchingContact]);
    }

    public function parkingType(Query $query, array $args, \Search\Type\Base $search) {

        $matchingParking = [];
        if($args['parking']==1){
            $matchingParking= [1,2,3,4,5,8,9,10,11];
        }
        if($args['parking']==2){
            $matchingParking= [2];
        }
        if($matchingParking) {
            $query->where(['Properties.parking IN' => $matchingParking]);
        }
    }

    public function poolType(Query $query, array $args, \Search\Type\Base $search) {

        $matchingPool = $args['pool_type'];

        if(in_array(1,$args['pool_type'])){
            $matchingPool= [1,2,3];
        }

        if($matchingPool) {
            $query->where(['Properties.pool_type IN' => $matchingPool]);
        }
    }

    public function closeEnddate(Query $query, array $args, \Search\Type\Base $search) {

        $query->where(['PropertiesVariations.enddate >' => date('Y-m-d'), 'PropertiesVariations.enddate <' => date('Y-m-d',strtotime('+2 months'))]);

    }

    public function lastEnddate(Query $query, array $args, \Search\Type\Base $search) {

        $query->where(['PropertiesVariations.enddate <=' => date('Y-m-d')]);

    }
    public function streetSearch(Query $query, array $args, \Search\Type\Base $search) {

        $query->where(['LOWER(Streets.street) LIKE "'.mb_strtolower($args['street']).'%" collate utf8_bin']);

    }

    public function streetNumSearchFrom(Query $query, array $args, \Search\Type\Base $search) {
        $query->where(['Properties.streetnum >='.$args['streetnum_from']]);
    }
    public function streetNumSearchTo(Query $query, array $args, \Search\Type\Base $search) {
        $query->where(['Properties.streetnum <='.$args['streetnum_to']]);
    }
    public function searchTerrace(Query $query, array $args, \Search\Type\Base $search) {
        $query->where(['Properties.terrace > 0']);
    }
    public function searchArchived(Query $query, array $args, \Search\Type\Base $search) {
        if(empty($args['archived'])) {
            $query->where(['Properties.archived'=> 0]);
        }
    }

    public function searchPanorama(Query $query, array $args, \Search\Type\Base $search) {
        if(!empty($args['panorama_type'])) {
            if (in_array(1, $args['panorama_type'])) {
                $args['panorama_type'][] = 2;
                $args['panorama_type'][] = 6;

            }
            $query->where(['outlook IN' => $args['panorama_type']]);
        }
    }



    public function priceSearchFrom(Query $query, array $args, \Search\Type\Base $search)
    {

        if(isset($args['price_from'])){
            if(!empty($args['price_type'])){
                switch($args['price_type']){
                    //Ft netto
                    case 1:
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "HUF" AND PropertiesVariations.price_net >= '.($args['price_from']*1000000).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "EUR" AND PropertiesVariations.price_net >= '.($args['price_from']*1000000/Configure::read('EUR')).')';
                        break;
                    //Ft Bruttó
                    case 2:
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "HUF" AND PropertiesVariations.price >= '.($args['price_from']*1000000).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "EUR" AND PropertiesVariations.price >= '.(($args['price_from'])).')';
                        break;
                    //Eur nettó
                    case 3:
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "HUF" AND PropertiesVariations.price_net >= '.($args['price_from']*Configure::read('EUR')).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "EUR" AND PropertiesVariations.price_net >= '.($args['price_from']).')';
                        break;
                    //Eur bruttó
                    case 4:
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "HUF" AND PropertiesVariations.price >= '.($args['price_from']*Configure::read('EUR')).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "EUR" AND PropertiesVariations.price >= '.($args['price_from']).')';
                        break;
                }
            }else{
                $matchingPrice[] =  '(PropertiesVariations.price_dev = "HUF" AND PropertiesVariations.price >= '.($args['price_from']*1000000).')';
                $matchingPrice[] =  '(PropertiesVariations.price_dev = "EUR" AND PropertiesVariations.price >= '.($args['price_from']*1000000/Configure::read('EUR')).')';
            }
            $query->where(['OR' => $matchingPrice]);
        }

    }

    public function priceSearchTo(Query $query, array $args, \Search\Type\Base $search)
    {
        if (!empty($args['price_to'])) {
            if (!empty($args['price_type'])) {
                switch($args['price_type']){
                    //Ft netto
                    case 1:
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "HUF" AND PropertiesVariations.price_net <= '.($args['price_to']*1000000).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "EUR" AND PropertiesVariations.price_net <= '.($args['price_to']*1000000/Configure::read('EUR')).')';
                        break;
                    //Ft Bruttó
                    case 2:
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "HUF" AND PropertiesVariations.price <= '.($args['price_to']*1000000).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "EUR" AND PropertiesVariations.price <= '.(($args['price_to']*1000000)/Configure::read('EUR')).')';
                        break;
                    //Eur nettó
                    case 3:
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "HUF" AND PropertiesVariations.price_net <= '.($args['price_to']*Configure::read('EUR')).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_net_dev = "EUR" AND PropertiesVariations.price_net <= '.($args['price_to']).')';
                        break;
                    //Eur bruttó
                    case 4:
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "HUF" AND PropertiesVariations.price <= '.($args['price_to']*Configure::read('EUR')).')';
                        $matchingPrice[] =  '(PropertiesVariations.price_dev = "EUR" AND PropertiesVariations.price <= '.($args['price_to']).')';
                        break;
                }
            } else {


                $matchingPrice[] = '(PropertiesVariations.price_dev = "HUF" AND PropertiesVariations.price <= ' . ($args['price_to'] * 1000000) . ')';
                $matchingPrice[] = '(PropertiesVariations.price_dev = "EUR" AND PropertiesVariations.price <= ' . ($args['price_to'] * 1000000 / Configure::read('EUR')) . ')';
            }
            $query->where(['OR' => $matchingPrice]);
        }

    }
    public function trash(Query $query, array $args, \Search\Type\Base $search)
    {

    }
}
