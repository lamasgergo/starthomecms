<?php
namespace App\Controller\Admin;

use Cake\Core\Configure;
use App\Controller\AppController;
use Cake\Event\Event;

/**
 * Roles Controller
 *
 * @property \App\Model\Table\RolesTable $Roles
 */
class StaticsController extends AppController
{
    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
    }
    public function index()
    {   
       // if(empty($this->request['data']['type']))return false;
        /*
        
            Ezta  részt átdolgozni, első körben configból hozza az adatokat, ha szükséges átírni table alapúra
        */
        if($this->request['data']['type']=='event_type')
        {
            //Események típusait más tömbből kérdezzük
            foreach(Configure::read('EventTypes') as $valKey=>$oneValue){
                    $static['event_type'][]=array(
                        'val' => $valKey,
                        'name' => $oneValue
                    );                
            }
                
        }else{
            foreach(Configure::read('Static') as $staticKey=>$oneStaticElement)
            {
                foreach($oneStaticElement as $valKey=>$oneValue)
                {
                    $static[$staticKey][]=array(
                        'val' => $valKey,
                        'name' => $oneValue
                    );   
                } 
            }
        }

        $datas=$static[$this->request['data']['type']];

        $this->set('datas',$datas);
        $this->set('_serialize', ['datas']);
    }            
}
