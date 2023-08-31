<?php
namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\ORM\TableRegistry;

class EventHandlerComponent extends Component
{
    var $params = null;
    var $disabledFields = array('created','modified');
    var $writeEvent=true;
    function startup(){
        $controller = $this->_registry->getController();
        $this->data = $controller->request->data;
        $this->params = $controller->request->params;
    } 

    public function add($data,$opt=null ){
        $this->writeEvent=true;
        $saveData=array(
            'plugin' => $this->params['plugin'],
            'controller' => $this->params['controller'],
            'action' => $this->params['action']
        );
        foreach($data as $key=>$value)
        {
            
            if(!empty($value))
            {
              switch($key){
                  case 'plugin':
                        $saveData['plugin']=$value;
                  break;      
                  case 'controller':
                        $saveData['controller']=$value;
                  break;     
                  case 'action':
                        $saveData['action']=$value;
                  break;                                       
                  
                  case 'type':
                        $saveData=array_merge($saveData,array('type'=>$value))  ;
                  break;
                  case 'user_id':
                        $saveData=array_merge($saveData,array('user_id'=>$value))  ;
                  break;                      
                  case 'link_model':
                        $saveData=array_merge($saveData,array('link_model'=>$value))  ;
                  break;
                  case 'link_model_id':
                        $saveData=array_merge($saveData,array('link_model_id'=>$value))  ;
                  break;
                  case 'referer_model':
                        $saveData=array_merge($saveData,array('referer_model'=>$value))  ;
                  break;
                  case 'referer_model_id':
                        $saveData=array_merge($saveData,array('referer_model_id'=>$value))  ;
                  break;                      
                  case 'note':
                        $saveData=array_merge($saveData,array('note'=>$value))  ;
                  break;                                                                                                                                  
              }  
            }
        }                               

        //new record created
        if(!empty($data['new_data']) and empty($data['old_data']))
        {
            $saveData['action']='add';      
        }

        //modification
        if(!empty($data['new_data']) and !empty($data['old_data']))
        {
            $saveData['action']='edit'; 
            $change=array();
            if($data['old_data']['id']==$data['new_data']['id'])
            {
                foreach($data['old_data'] as $one_field=>$field_value){

                    if(!is_array($field_value) and !in_array($one_field,$this->disabledFields)){
                        if($field_value!=$data['new_data'][$one_field])       
                        {
                            $change[]=[
                                'field'=>$one_field,
                                'old'=>$field_value,
                                'new'=>$data['new_data'][$one_field]
                            ];
                        }
                    }
                    
                    if(is_array($field_value) and !empty($opt['check_related']) and in_array($one_field,$opt['check_related'])){
                        foreach($field_value as $one_related_field=>$related_field_value){
                            if(!is_array($related_field_value) and !in_array($one_related_field,$this->disabledFields)) {
                                if($related_field_value!=$data['new_data'][$one_field][$one_related_field])       
                                {
                                    $change[]=[
                                        'field'=>$one_field.'.'.$one_related_field,
                                        'old'=>$related_field_value,
                                        'new'=>$data['new_data'][$one_field][$one_related_field]
                                    ];
                                }                        
                            }    
                        }    
                    }
                } 
            
                if(!empty($change))
                {
                    $saveData=array_merge($saveData,array('changes'=>json_encode($change)))  ;   
                }else{
                    $this->writeEvent=false;
                }
            }
        }               
        if($this->writeEvent)
        {

            $eventTable = TableRegistry::get('Events');
            $rec=$eventTable->newEntity($saveData);

            $eventTable->save($rec);
            //save to target model the lastevent field
            if(!empty($saveData['link_model']) and !empty($saveData['link_model_id'])){
                $modelTable = TableRegistry::get($saveData['link_model']);  
                $modelData = $modelTable->get($saveData['link_model_id']);
  
                $modelData->lastevent = date('Y-m-d H:i:s');
                $modelTable->save($modelData);  
                
            }
            

        }

    }
}