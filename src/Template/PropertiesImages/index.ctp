<?php
    foreach($data as $image){
        if($image->ordered == 0){
            echo $this->Html->link(
                    $this->Html->image($this->Url->build(['action' =>'tn', base64_encode($image->image_original)])),
                    $this->Url->build(['action' =>'tn', base64_encode($image->image_original)]).'.jpg',
                    ['class'=>'fb mainimage', 'rel'=>'gallery', 'escape' => false]
            );   
            echo $this->Html->tag('div', '', ['class' => 'clearfix']);
        }else{
            echo $this->Html->link(
                    $this->Html->image($this->Url->build(['action' =>'tn', base64_encode($image->image_tn)])),
                    $this->Url->build(['action' =>'tn', base64_encode($image->image_original)]).'.jpg',
                    ['class'=>'fb', 'rel'=>'gallery', 'escape' => false]
            );            
        }


    }
?>
