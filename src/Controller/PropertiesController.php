<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;
use \ZipArchive;


/**
 * PropertiesImages Controller
 *
 * @property \App\Model\Table\PropertiesTable $Properties
 */
class PropertiesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->Auth->allow(['offer']);
    }
    public function offer($hash)
    {
        $this->layout = 'offer';
        $this->loadModel('SentPropertiesContacts');

        $subquery = $this->SentPropertiesContacts->find()->select(['properties_variation_id'])
            ->where(['SentPropertiesContacts.hash' => $hash, 'SentPropertiesContacts.created >=' => date('Y-m-d', strtotime('-2 months'))]);

        $user = $this->SentPropertiesContacts->find()->select(['id'])
            ->where(['SentPropertiesContacts.hash' => $hash, 'SentPropertiesContacts.created >=' => date('Y-m-d', strtotime('-2 months'))]);


        if($subquery) {
            $this->Properties->PropertiesVariations->hasOne('Owner', [
                'className'=>'SentPropertiesContacts',
                'foreignKey' =>  'properties_variation_id',
                'conditions'=>['Owner.hash' => $hash],
                'joinType'=>'LEFT'
            ]);


            $data = $this->Properties->PropertiesVariations->find()
                ->contain([ 'Properties.Cities',
                    'Properties.Districts',
                    'Properties.Streets',
                    'Properties.Cityparts',
                    'Properties.Mainimage',
                    'Properties.Cities',
                    'Properties.PropertiesImages',
                    'Properties.PropertiesLayouts',
                    'Owner.Users'])
                ->where(['PropertiesVariations.id IN' => $subquery]);
            $this->set(compact('data', 'subquery', 'user'));
        }else{

        }
    }
}