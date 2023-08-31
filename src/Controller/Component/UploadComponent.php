<?php
namespace App\Controller\Component;

use Cake\Controller\Component;

class UploadComponent extends Component
{
    
  var $uploadDir='';
  var $fileVar='';
  var $tmpDir='';
  var $convertName='';
  var $data = array();
  var $params = array();
  var $finalFile = array();
  var $errors = array();
  
  function startup(){
      $controller = $this->_registry->getController();
      $this->data = $controller->request->data;
      $this->params = $controller->request->params;
  }  
      
  public function upload($tmp=true)
  {
      if(is_array($this->data[$this->fileVar]))
      {
          foreach($this->data[$this->fileVar] as $onefile){
                $this->finalFile[]=$this->_processUpload($onefile,$tmp);    
          }
      }else{
          $this->finalFile[]=$this->_processUpload($onefile,$tmp);
      }
      
      return  $this->finalFile;
        //return $amount1 + $amount2;
  }
  
  private function _processUpload($onefile,$tmp){
      
      //file type check!
      

      if($tmp)
      {
        $destDir=$this->tmpDir.DS;
      }else{
        $destDir=$this->uploadDir.DS; 
      }
      
      if(!empty($this->convertName))
      {
        $fileName=$this->convertName;
      }else{
        $fileName=$onefile['name']; 
      }      
      if(!empty($fileName))
      {
          //Create destination directory
          if(!is_dir($destDir))
          {
              mkdir($destDir);
          }
          $tmpHash=md5(time().rand(1000,9999));
          if(move_uploaded_file($onefile['tmp_name'], WWW_ROOT.$destDir.$tmpHash.$fileName)) {
            return array('tmp'=>WWW_ROOT.$destDir.$tmpHash.$fileName, 'filename'=>$fileName);     
          }else{
            $this->errors[$fileName]=__('Upload failed');  
            return false;   
          }
      }else{
            $this->errors[$fileName]=__('Empty file');  
            return false;  
      }
      
        
  }

}