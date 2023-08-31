<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Core\Configure;

/**
 * PropertiesVariation Entity.
 */
class PropertiesVariation extends Entity
{
    protected $_virtual = [
        'valuta_type_name',
        'furniture_type_name',
        'caution_type_name',
        'active_name',
        'price_formatted',
        'price_huf_formatted',
        'price_eur_formatted',
        'price_usd_formatted',
        'description_breaked',
    ];
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected function _getFurnitureTypeName()
    {
        if(!empty($this->_properties['furniture_type']) and Configure::read('Static.furniture_type.'.$this->_properties['furniture_type']))
        {
            return Configure::read('Static.furniture_type.'.$this->_properties['furniture_type']);
        }else{
            return '';
        }        
    }  
    protected function _getValutaTypeName()
    {
        if(!empty($this->_properties['valuta_type']) and Configure::read('Static.valuta_type.'.$this->_properties['valuta_type']))
        {
            return Configure::read('Static.valuta_type.'.$this->_properties['valuta_type']);
        }else{
            return '';
        }        
    }    
    protected function _getCautionTypeName()
    {
        if(!empty($this->_properties['caution_type']) and Configure::read('Static.caution_type.'.$this->_properties['caution_type']))
        {
            return Configure::read('Static.caution_type.'.$this->_properties['caution_type']);
        }else{
            return '';
        }        
    }   
    protected function _getActiveName()
    {
        if(!empty($this->_properties['active']) and Configure::read('Static.active.'.$this->_properties['active']))
        {
            return Configure::read('Static.active.'.$this->_properties['active']);
        }else{
            return '';
        }        
    }

    protected function _getPriceFormatted(){

        $p=number_format($this->_properties['price'],0,'.',' ').' '.$this->_properties['price_dev']. ($this->_properties['type']==1?__d('start', '/hó'):'');
        return $p;
    }
    
    protected function _getPriceEurFormatted(){
        if($this->_properties['price_dev'] == 'EUR'){
            $p=number_format($this->_properties['price'],0,'.',' ').' '.$this->_properties['price_dev']. ($this->_properties['type']==1?__d('start', '/hó'):'');
        }else{
            $p=number_format($this->_properties['price']/Configure::read('EUR'),0,'.',' ').' EUR'. ($this->_properties['type']==1?__d('start', '/hó'):'');
        }
        return $p;
    }

    protected function _getPriceUsdFormatted(){
        if($this->_properties['price_dev'] == 'USD'){
            $p=number_format($this->_properties['price'],0,'.',' ').' '.$this->_properties['price_dev']. ($this->_properties['type']==1?__d('start', '/hó'):'');
        }else{
            $p=number_format($this->_properties['price']/Configure::read('USD'),0,'.',' ').' USD'. ($this->_properties['type']==1?__d('start', '/hó'):'');
        }
        return $p;
    }
    
    protected function _getPriceEurFormattedEn(){
        if($this->_properties['price_dev'] == 'EUR'){
            $p=number_format($this->_properties['price'],0,'.',' ').' '.$this->_properties['price_dev']. ($this->_properties['type']==1?__d('start', '/month'):'');
        }else{
            $p=number_format($this->_properties['price']/Configure::read('EUR'),0,'.',' ').' EUR'. ($this->_properties['type']==1?__d('start', '/month'):'');
        }
        return $p;
    }

    protected function _getPriceUsdFormattedEn(){
        if($this->_properties['price_dev'] == 'USD'){
            $p=number_format($this->_properties['price'],0,'.',' ').' '.$this->_properties['price_dev']. ($this->_properties['type']==1?__d('start', '/month'):'');
        }else{
            $p=number_format($this->_properties['price']/Configure::read('USD'),0,'.',' ').' USD'. ($this->_properties['type']==1?__d('start', '/month'):'');
        }
        return $p;
    }

    protected function _getPriceHufFormatted(){
         if($this->_properties['price_dev'] == 'HUF'){
            $p=number_format($this->_properties['price'],0,'.',' ').' '.$this->_properties['price_dev']. ($this->_properties['type']==1?__d('start', '/hó'):'');
        }else if($this->_properties['price_dev'] == 'USD'){
            $p=number_format($this->_properties['price']*Configure::read('USD'),0,'.',' ').' HUF'. ($this->_properties['type']==1?__d('start', '/hó'):'');
        }else{
            $p=number_format($this->_properties['price']*Configure::read('EUR'),0,'.',' ').' HUF'. ($this->_properties['type']==1?__d('start', '/hó'):'');
        }
        return $p;
    } 
    
    protected function _getEnddate()
    {
        if(!empty($this->_properties['enddate']))
        {
            return $this->_properties['enddate']->format('Y-m-d');
        }else{
            return NULL;
        }        
    }

    protected function _getDescriptionBreaked()
    {
        if(!empty($this->_properties['description']))
        {
            return $this->_properties['description'];
        }else{
            return NULL;
        }
    }

}
