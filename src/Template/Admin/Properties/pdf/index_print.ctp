<?php 
   if($this->request->query['todo']=='25') {
        echo $this->element('print_25');
	print_r($this->request->data);
	
    } else {
?>
<div id="copy">
    <br>
    <?php
    if(empty($this->request->query['ids'])){
        echo $this->Html->tag('div', 'Nem választott ki egy ingatlant se!', ['style'=> 'padding:20px; text-align:center; background-color: red; color: #ffffff;']);
    }
    //Adatlap
    if($this->request->query['todo']=='18'):
        echo $this->element('print_18');
    endif;
    //Adatlap  angol
    if($this->request->query['todo']=='19'):
        echo $this->element('print_19');
    endif;
    //Adatlap  angol
    if($this->request->query['todo']=='16'):
        echo $this->element('print_16');
    endif;
    //Adatlap  angol
    if($this->request->query['todo']=='17'):
        echo $this->element('print_17');
    endif;
    ?>
</div>
<?php } ?>
