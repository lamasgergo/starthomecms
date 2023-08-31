<?php
namespace App\Shell;

use Cake\Console\Shell;
use Cake\Utility\Inflector;
use Cake\ORM\Table;
use Cake\Datasource\ConnectionManager;
use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class FixerShell extends Shell
{

    public function main()
    {
        $this->out('Start');
        $db = ConnectionManager::get('default');
        /*
        $this->loadModel('Properties');
        
        $properties = $this->Properties->find()->contain(['Streets']);      //->where(['Properties.id' => 5])->limit(1)
        $wrong = 0;
        $canfix = 0;
        $cantfix = 0;
        foreach($properties as $row){

            $debugval = json_decode($row->debug_vals);
            if(!empty($debugval->{'@attributes'}->Utca)){
                $strt = str_replace(['*', 'rkp.', 'krt.', 'Szt.'],['', 'rakpart', 'körút', 'Szent'],$debugval->{'@attributes'}->Utca);
                
            }
            if(!empty($strt) && $strt != $row->street->street &&
              substr_count($row->street->street,$strt) == 0  
            ){
                $fixStreet = $this->Properties->Streets->find()->where(['street' => $strt, 'district_id' =>$row->street->district_id])->first();
                if($fixStreet){
                    $this->out($row->id .' - ' .$strt.' NOT '.$row->street->street. ' FIX TO '. $fixStreet->id. ' '. $fixStreet->street);
                    //$this->log($row->id .' - ' .$strt.' NOT '.$row->street->street. ' FIX TO '. $fixStreet->id. ' '. $fixStreet->street);
                    $canfix ++;
                    
                    // $db->query('UPDATE properties SET street_id="'.$fixStreet->id.'" WHERE id='.$row->id.';');
                }else{
                    $this->out($row->id .' - ' .$strt.' NOT '.$row->street->street. ' CANT FIND TO FIX ');
                    $this->log($row->id .' - ' .$strt.' NOT '.$row->street->street. ' CANT FIND TO FIX ');
                    $cantfix ++;
                }
            //debug($debugval->{'@attributes'}->Utca);
            
            }
        }
        debug($canfix. '/ Cantfix '.$cantfix);
         */
          /*
        //Kép 4-3 átalakító
        $this->loadModel('PropertiesImages');
        $result = $db->query('SELECT image from properties_images');
        $upDir = WWW_ROOT.'uploads'.DS.'properties_images' .DS. 'original';
        $upDirSm = WWW_ROOT.'uploads'.DS.'properties_images' .DS.'mini';
        foreach($result as $k=>$row){
            $this->out($k);
            
            
            $this->PropertiesImages->processImage(
                $upDir.$row['image'],
                $upDirSm.$row['image'],
                ['jpeg_quality' => 60],
                [
                    'thumbnail' => [
                        'height' => 75,
                        'width' => 100
                    ],
                ]
            );             
        }
        
         */
      
        
         
        //Full név beállító
         
        $result = $db->query('SELECT id,firstname, lastname from contacts');
        foreach($result as $row){
           // echo  'UPDATE contacts SET fullname="'.$row['lastname'].' '.$row['firstname'].'" WHERE id='.$row['id'].'  ';
            $db->query('UPDATE contacts SET fullname="'.trim($row['lastname']).' '.trim($row['firstname']).'", firstname ="'.trim($row['firstname']).'", lastname ="'.trim($row['lastname']).'" WHERE id='.$row['id'].'  ');
        } 
               
         /*
        $result = $db->query('SELECT id FROm properties WHERE
                    (SELECT count(id) FROM properties_images where property_id=properties.id and main=1)=0 AND
                    (SELECT count(id) FROM properties_images where property_id=properties.id)>0');
        foreach($result as $row){
            $db->query('UPDATE properties_images SET main=1 WHERE property_id='.$row['id'].' AND ordered=1 ');
        }
         */
         
        /*
        $result = $db->query('SELECT id FROm properties WHERE
                              (SELECT count(id) FROM properties_layouts where property_id=properties.id and main=1)>1');
        foreach($result as $row){
            $db->query('DELETE FROM  properties_layouts WHERE property_id='.$row['id'].' LIMIT 1');
        }
        */
        /*
        $dir = new Folder(WWW_ROOT.'/migration/interpic/');
        $files = $dir->find('.*\.jpg');
        foreach ($files as $file) {
            $file1 = new File(WWW_ROOT.'/migration/interpic/'. $file);
            $file2 = new File(WWW_ROOT.'/migration/interpic_ok/'. $file);
            if($file2->exists() && $file1->size()==$file2->size()){
               // $file1->delete();
            }else{
                $this->out('Ez marad:'. $file);
            }

        }
        */

    }

}