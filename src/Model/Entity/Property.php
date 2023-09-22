<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;
use DateTime;

/**
 * Property Entity.
 */
class Property extends Entity
{
    protected $_virtual = [
        'address',
        'address_list',
        'address_short',
        'name',
        'building_type_name',
        'heat_type_name', 
        'panorama_type_name', 
        'energy_rating_type_name', 
        'rating_type_name', 
        'pool_type_name',
        'conveniences_type_name',
        'building_condition_type_name',
        'valuta_type_name',
        'furniture_type_name',
        'caution_type_name',
        'active_name',
        'parking_type_name',
        'panorama_type_name',
        'islocked',
        'owner_phone',
        'contact_phone',
        'owner_name'
    ];
    
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
     /*
    protected $_accessible = [
        'sell' => true,
        'rent' => true,
        'citiy_id' => true,
        'district_id' => true,
        'street_id' => true,
        'citypart_id' => true,
        'streetnum' => true,
        'street_hidden' => true,
        'building' => true,
        'building_park' => true,
        'floor' => true,
        'door' => true,
        'address_note' => true,
        'zip' => true,
        'localident' => true,
        'building_type' => true,
        'size_net' => true,
        'size_gross' => true,
        'heat_type' => true,
        'note' => true,
        'propertiescol' => true,
        'cooffice' => true,
        'upperlevel' => true,
        'atticlevel' => true,
        'newlybuilt' => true,
        'elevator' => true,
        'gardencontact' => true,
        'petallowed' => true,
        'outlook' => true,
        'terrace' => true,
        'energy_rating' => true,
        'lotsize' => true,
        'builddate' => true,
        'building_levels' => true,
        'rate' => true,
        'pool' => true,
        'conveniences' => true,
        'condition' => true,
        'parking' => true,
        'active' => true,
        'deleted' => true,
        'city' => true,
        'district' => true,
        'street' => true,
        'citypart' => true,
        'user' => true,
    ];  */

    protected function _getAddress()
    {
        $address='';

        if(!empty($this->_properties['city']['city']))
        {
            $address.=$this->_properties['city']['city'];
        }  
        if(!empty($this->_properties['citypart']['citypart']))
        {
            $address.=', '.$this->_properties['citypart']['citypart'];
        }    
        if(!empty($this->_properties['district']['district']))
        {
            $address.=', '.$this->_properties['district']['district'].'. '.__('kerület');
        }                           
        
        if(!empty($this->_properties['street']['street']))
        {
            $address.=', '.$this->_properties['street']['street'] ;
        }
        if(!empty($this->_properties['streetnum']))
        {
            $address.=' '.$this->_properties['streetnum'].'.' ;
        }

        if(!empty($this->_properties['building']))
        {
            $address.=' '.$this->_properties['building'].' ' ;
        }

        if(!empty($this->_properties['floor']))
        {
            $address.=' '.$this->_properties['floor']. ($this->_properties['floor']!='fszt.'?' em.':'') ;
        } 
        if(!empty($this->_properties['door']))
        {
            $address.=' '.$this->_properties['door'] ;
        }         

        return $address;
        
    }  
    protected function _getAddressList()
    {
        $address='';

        if(!empty($this->_properties['city']['city']))
        {
            $address.=$this->_properties['city']['city'];
        }  
        if(!empty($this->_properties['citypart']['citypart']))
        {
            $address.=', '.$this->_properties['citypart']['citypart'];
        }    
        if(!empty($this->_properties['district']['district']))
        {
            $address.=', '.$this->_properties['district']['district'].' '.__('kerület');
        }                           
        $address.='<br>';
        if(!empty($this->_properties['street']['street']))
        {
            $address.=', '.$this->_properties['street']['street'] ;
        }
        if(!empty($this->_properties['streetnum']))
        {
            $address.=' '.$this->_properties['streetnum'] ;
        }        

        return $address;
        
    }      
    
    protected function _getAddressShort()
    {
        $address='';


  
        if(!empty($this->_properties['district']['district']))
        {
            $address.=$this->_properties['district']['district'].'. ';
        }else{
            if(!empty($this->_properties['city']['city'])){
                $address.=$this->_properties['city']['city'].', ';
            }
        }                           
        
        if(!empty($this->_properties['street']['street']))
        {
            $address.=''.$this->_properties['street']['street'] ;
        }      

        return $address;
        
    }

    protected function _getCitypartWithDistrict()
    {
        $address='';



        if(!empty($this->_properties['district']['district']))
        {
            $address.=$this->_properties['district']['district'].'. ';
        }else{
            $address.=$this->_properties['city']['city'].', ';
        }

        if(!empty($this->_properties['citypart']['citypart']))
        {
            $address.=''.$this->_properties['citypart']['citypart'] ;
        }

        return $address;

    }

    protected function _getAddressShortEn()
    {
        $address='';



        if(!empty($this->_properties['district']['district']))
        {
            $address.=$this->_properties['district']['district'].'. district, ';
        }else{
            $address.=$this->_properties['city']['city'].', ';
        }                           
        
        if(!empty($this->_properties['street']['street']))
        {
            $address.=''.$this->_properties['street']['street'] ;
        }      

        return $address;
        
    }      
    
    protected function _getAddressShortWithStreetnum()
    {
        $address='';


        if(!empty($this->_properties['city']['city']))
        {
            $address.=$this->_properties['city']['city'].', ';
        }    
        if(!empty($this->_properties['district']['district']))
        {
            $address.=$this->_properties['district']['district'].'. ';
        }                           
        
        if(!empty($this->_properties['street']['street']))
        {
            $address.=''.$this->_properties['street']['street'] ;
        }      

        if(!empty($this->_properties['streetnum']))
        {
            $address.=' '.$this->_properties['streetnum'].'.' ;
        }          
        return $address;
        
    }      
    protected function _getName()
    {
       // var_dump($this->_properties['street']);
        if(!empty($this->_properties['street']['street']))
        {
            return $this->_properties['street']['street'] ;
        }else{
            return '';
        }
        
    }     
    protected function _getBuildingTypeName()
    {
        if(!empty($this->_properties['building_type']) and Configure::read('Static.building_type.'.$this->_properties['building_type']))
        {
            return Configure::read('Static.building_type.'.$this->_properties['building_type']);
        }else{
            return '';
        }          
    } 
    protected function _getHeatTypeName()
    {
        if(!empty($this->_properties['heat_type']) and Configure::read('Static.heat_type.'.$this->_properties['heat_type']))
        {
            return Configure::read('Static.heat_type.'.$this->_properties['heat_type']);
        }else{
            return '';
        }        
    }  
    protected function _getPanoramaTypeName()
    {
        if(!empty($this->_properties['outlook']) and Configure::read('Static.panorama_type.'.$this->_properties['outlook']))
        {
            return Configure::read('Static.panorama_type.'.$this->_properties['outlook']);
        }else{
            return '';
        }
    }  
    protected function _getEnergyRatingTypeName()
    {
        if(!empty($this->_properties['energy_rating_type']) and Configure::read('Static.energy_rating_type.'.$this->_properties['energy_rating_type']))
        {
            return Configure::read('Static.energy_rating_type.'.$this->_properties['energy_rating_type']);
        }else{
            return '';
        }        
    }  
    protected function _getRatingTypeName()
    {
        if(!empty($this->_properties['rating_type']) and Configure::read('Static.rating_type.'.$this->_properties['rating_type']))
        {
            return Configure::read('Static.rating_type.'.$this->_properties['rating_type']);
        }else{
            return '';
        }        
    }      
    protected function _getPoolTypeName()
    {
        if(!empty($this->_properties['pool_type']) and Configure::read('Static.pool_type.'.$this->_properties['pool_type']))
        {
            return Configure::read('Static.pool_type.'.$this->_properties['pool_type']);
        }else{
            return '';
        }        
    }  
    protected function _getConveniencesTypeName()
    {
        if(!empty($this->_properties['conveniences_type']) and Configure::read('Static.conveniences_type.'.$this->_properties['conveniences_type']))
        {
            return Configure::read('Static.conveniences_type.'.$this->_properties['conveniences_type']);
        }else{
            return '';
        }        

    }   
    protected function _getBuildingConditionTypeName()
    {
        if(!empty($this->_properties['building_condition']) and Configure::read('Static.building_condition_type.'.$this->_properties['building_condition']))
        {
            return Configure::read('Static.building_condition_type.'.$this->_properties['building_condition']);
        }else{
            return '';
        }        

    }
    
    protected function _getParkingTypeName()
    {
        if(!empty($this->_properties['parking']) and Configure::read('Static.parking_type.'.$this->_properties['parking']))
        {
            return Configure::read('Static.parking_type.'.$this->_properties['parking']);
        }else{
            return '';
        }        

    }
    protected function _getTerraceName()
    {
        if(!empty($this->_properties['terrace']) and Configure::read('Static.terrace_type.'.$this->_properties['terrace']))
        {
            return Configure::read('Static.terrace_type.'.$this->_properties['terrace']);
        }else{
            return '';
        }

    }
    
    protected function _getOwnerPhone()
    {
        if(!empty($this->_properties['Owner']['phone1'] )){
            return $this->transformPhone($this->_properties['Owner']['phone1type'], $this->_properties['Owner']['phone1']);    
        }

    }  
    protected function _getContactPhone()
    {
        if(!empty($this->_properties['Contact']['phone1'] )){
            return $this->transformPhone($this->_properties['Contact']['phone1type'], $this->_properties['Contact']['phone1']);    
        }

    } 
    
    protected function _getOwnerName()
    {
        
        if(!empty($this->_properties['Owner'] )){
            return (!empty($this->_properties['Owner']['prename'])?Configure::read('Static.prename_type.'.$this->_properties['Owner']['prename']).' ':'').(!empty($this->_properties['Owner']['lastname'])?$this->_properties['Owner']['lastname']:'').' '.(!empty($this->_properties['Owner']['firstname'])?$this->_properties['Owner']['firstname']:'') ;
        }

    } 
    
    protected function transformPhone($type, $number)
    {
        if(!empty($type) && ($type == 1 || $type == 3)){
            return '(36) '.substr($number,2,2).' / '.substr($number,4,3).'-'.substr($number,7,4);
        }else if(!empty($type) && $type == 2){
            return '(36) '.substr($number,2,1).' / '.substr($number,3,3).'-'.substr($number,6,4);
        }else if(!empty($type) && $type == 4){
            return '('.substr($number,0,2).') '.substr($number,2,10);
        } else{
            return $number;
        }
    }     

    protected function _getIslocked(){
        if(!empty($this->_properties['now_editing_user_id'])){
            $interval=strtotime($this->_properties['now_editing_login_time']->format('Y-m-d H:i:s'));
            return ceil((time()-$interval)/60);
        }else{
            return false;
        }
    }


}
