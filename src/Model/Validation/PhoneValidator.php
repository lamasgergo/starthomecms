<?php
//Phone Number validator by Total Studio

namespace App\Model\Validation;

use Cake\Validation\Validator;

class PhoneValidator extends Validator
{
    public function __construct()
    {
        parent::__construct();
        // Add validation rules here.
    }
    
    public static function phone($value, $field, $context) {
        //magyar mobil sz�m
        if(strlen($value)>2){
            if($context['data'][$field]=='1')
            {
                if(substr($value,0,2)!='36'){
                    return __d('start', '36 -al kezdődjön a szám!');
                }
                
                if(!in_array(substr($value,2,2),array('20','30','70'))){
                    return __d('start', 'Hibás szolgáltató szám (20/30/70)');
                }            
                
                if(strlen($value)!='11'){
                    return __d('start', '11 hosszúságú számot várok!');
                }            
            }elseif($context['data'][$field]=='2'){
                if(substr($value,0,2)!='36'){
                    return  __d('start', '36 -al kezdődjön a szám!');
                }
                
                if(substr($value,2,1)!='1'){
                    return  __d('start', 'A 3. számjegy nem 1 -es!');
                }            
                
                if(strlen($value)!='10'){
                    return __d('start', '10 hosszúságú számot várok!');
                }              
            }
        }   
        return true;
    }    
}