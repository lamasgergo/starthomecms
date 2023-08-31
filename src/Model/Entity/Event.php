<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;

/**
 * Event Entity.
 */
class Event extends Entity
{
     protected $_virtual = ['event_action','event_type','changes_formatted'];
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
     /*
    protected $_accessible = [
        'type' => true,
        'link_model' => true,
        'link_model_id' => true,
        'referer_model' => true,
        'referer_model_id' => true,
        'note' => true,
        'changes' => true,
        'user_id' => true,
        'link_model' => true,
        'referer_model' => true,
        'user' => true,
    ];
    */
    
    protected function _getEventAction()
    {
        if(!empty($this->_properties['controller']) and !empty($this->_properties['action']))
        {
            if(Configure::read('EventsDescriptions.'.$this->_properties['controller'].'.'.$this->_properties['action']))
            {
                return Configure::read('EventsDescriptions.'.$this->_properties['controller'].'.'.$this->_properties['action']);    
            }else{
                return 'N/A (please add to configuration file this action type of event)' ;
            }
        }
        
    }
    protected function _getEventType()
    {
        if(!empty($this->_properties['type']) and Configure::read('EventTypes.'.$this->_properties['type']))
        {
            return Configure::read('EventTypes.'.$this->_properties['type']);    
        }
        
    }    
    
    protected function _getChangesFormatted()
    {
        
        if(!empty($this->_properties['changes']))
        {
            $ret="";
            $datas=json_decode($this->_properties['changes']);
            if(!empty($datas))
            {
                foreach($datas as $onechange)
                {
                    //debug($onechange);

                    if(is_object($onechange->new)){
                        $new='<br>';
                        foreach($onechange->new as $k=>$items){
                            $new .= '&nbsp;&nbsp;&nbsp;&nbsp;'.$k . '->' . $items.'<br>';
                        }
                    }else{
                        $new=$onechange->new;
                    }
                    $ret.=(Configure::read('FieldNames.'.$onechange->field)?Configure::read('FieldNames.'.$onechange->field):$onechange->field).": ".(!empty($onechange->old)?$onechange->old:'')." -> ".(!empty($new)?$new:'')."<br>";
                }
            }
            return $ret;    

        }
    }     
    
    protected function _getNote($note)
    {
       return str_replace(',',', ',$note);
        
    }               
}
