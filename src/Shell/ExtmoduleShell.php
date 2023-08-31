<?php
namespace App\Shell;

use Cake\Console\Shell;
use Cake\Utility\Inflector;
use Cake\ORM\Table;
use Cake\Datasource\ConnectionManager;

class ExtmoduleShell extends Shell
{

    public function main()
    {
        $this->out('Total Studio ExtJS Modul generáló');
        
        $table = $this->in('Add meg a mysql tábal nevét:');
        $this->out('A következő tábla alapján generálunk: '.$table);
        $db = ConnectionManager::get('default');
        $collection = $db->schemaCollection();
        $tables = $collection->listTables();
        
        if(!in_array($table,$tables))
        {
            $this->error('Nem található az adatbázis tábla!');    
        }
        
        $fields=$collection->describe($table)->columns();
        $ignoreFields=['created','modified','deleted','active'];
        
        //Generate field dependent codes
        $formFields='';
        foreach($fields as $f){
            if(!in_array($f,$ignoreFields))
            {
                $formFields.=$this->generateFormField($f,$collection->describe($table)->column($f));
            }
        }
        
        $gridFields='';
        foreach($fields as $f){
            $selection[$f] = $this->in('Szeretnéd ezt a "'.$f.'" mezőt a gridbe?', ['I', 'N'], 'I');
        }   
        
        foreach($selection as $k=>$onesel){
            if(strtolower($onesel)=='i')
            {
                $gridFields.=$this->generateGrid($k,$collection->describe($table)->column($k));    
            }
        }

        $commaSeparatedFieldList='\''.implode('\',\'',$fields).'\'';
        $articles=$this->loadModel(Inflector::classify($table));
        
        $calssName=Inflector::camelize($table);
        $tableizeName=Inflector::tableize($table);
        $lcFirstName=lcfirst($calssName);
        $templateDir=ROOT.DS.'plugins'.DS.'StudioTheme'.DS.'src'.DS.'Template'.DS.'Bake'.DS.'Extjs';
        //Generating files
        $files['model'.DS.$calssName.'.js']=file_get_contents($templateDir.DS.'model'.DS.'Model.js');
        $files['store'.DS.$calssName.'.js']=file_get_contents($templateDir.DS.'store'.DS.'Store.js');
        $files['store'.DS.$calssName.'View.js']=file_get_contents($templateDir.DS.'store'.DS.'StoreView.js');
        $files['controller'.DS.$calssName.'.js']=file_get_contents($templateDir.DS.'controller'.DS.'Controller.js');
        $files['view'.DS.$tableizeName.DS.'Form.js']=file_get_contents($templateDir.DS.'view'.DS.'Form.js');
        $files['view'.DS.$tableizeName.DS.'List.js']=file_get_contents($templateDir.DS.'view'.DS.'List.js');
        $files['view'.DS.$tableizeName.DS.'View.js']=file_get_contents($templateDir.DS.'view'.DS.'View.js');
        $files['view'.DS.$tableizeName.DS.'Controller.js']=file_get_contents($templateDir.DS.'view'.DS.'Controller.js');
        $files['view'.DS.$tableizeName.DS.'Model.js']=file_get_contents($templateDir.DS.'view'.DS.'Model.js');
        
        foreach($files as $filename=>$onefile){
            $onefileData=str_replace(
                array('__CLASSNAME__','__COMMA_SEPARATED_FIELD_LIST__','__TABLEIZE__','__LCFIRST__','__FORMFIELDS__','__GRIDCOLUMNS__'),
                array($calssName,$commaSeparatedFieldList,$tableizeName,$lcFirstName,$formFields,$gridFields),
                $onefile
            );    
            $this->createFile(TMP.DS.'extjs'.DS.$filename, $onefileData);
        }

    }
    
    private function generateFormField($fieldName,$fieldData){
       $oneField='';
       if($fieldName=='id'){
           //simple id field
           $oneField="
                {
                    xtype:'hidden',
                    name: '".$fieldName."'
                },
           ";
       }else if(substr_count($fieldName,'_id')>0){
           //some combobox field
           $oneField="
                {
                    name: '".$fieldName."',
                    xtype: 'combobox',
                    fieldLabel: '".ucfirst($fieldName)."',
                    allowBlank: false,
                    queryMode: 'remote',
                    bind: {
                        store: '{".str_replace('_id','',$fieldName)."List}'
                    }, 
                    typeAhead: false,
                    displayField: '".str_replace('_id','',$fieldName)."',
                    minChars:2,
                    valueField: 'id',
                    listeners: {
                        select: 'onChange".ucfirst(str_replace('_id','',$fieldName))."'
                    }, 
                    allowBlank: ".($fieldData['null']?'true':'false')."
                },";
       }else{
           //simple field
           if($fieldData['type']=='float' ||  $fieldData['type']=='integer')
           {
           $oneField="
                {
                    name: '".$fieldName."',
                    xtype:'numberfield',
                    fieldLabel: '".ucfirst($fieldName)."', 
                    allowBlank: ".($fieldData['null']?'true':'false')."
                },";                 
           }else{
           $oneField="
                {
                    name: '".$fieldName."',
                    xtype:'textfield',
                    fieldLabel: '".ucfirst($fieldName)."', 
                    allowBlank: ".($fieldData['null']?'true':'false')."
                },";   
           }
       }
       
       return $oneField; 
    }
    
    private function generateGrid($fieldName,$fieldData){
        $oneField='';
       if($fieldName=='id'){
               //simple id field
               $oneField="
                    {
                        xtype:'hidden',
                        name: '".$fieldName."',
                        hidden: true
                    },
               ";
       }else if(substr_count($fieldName,'_id')>0){
               //some combobox field
               $oneField="
                    {
                        text: '".Inflector::camelize(str_replace('_id','',$fieldName)).".".str_replace('_id','',$fieldName)."',
                        dataIndex: '".Inflector::camelize(str_replace('_id','',$fieldName)).".".str_replace('_id','',$fieldName)."',
                        flex: 1,
                        filter: {
                            type: 'string'
                        }
                    },";   
       }else{
               //simple field
               if($fieldData['type']=='float' ||  $fieldData['type']=='integer')
               {
               $oneField="
                    {
                        text: '".$fieldName."',
                        dataIndex: '".$fieldName."',
                        flex: 1,
                        filter: {
                            type: 'number'
                        }
                    },";            
               }elseif($fieldData['type']=='datetime' ||  $fieldData['type']=='date'){
                $oneField="
                    {
                        text: '".$fieldName."',
                        dataIndex: '".$fieldName."',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                        flex: 1,
                        filter: {
                            type: 'date'
                        }
                    },";               
               }else{ 
               $oneField="
                    {
                        text: '".$fieldName."',
                        dataIndex: '".$fieldName."',
                        flex: 1,
                        filter: {
                            type: 'string'
                        }
                    },";   
               }
       }
       
       return $oneField;        
    }
}
