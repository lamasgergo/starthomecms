<?php 
foreach ($datas as $property): 
    echo $this->Html->link('https://starthomebudapest.hu/index.php?s='.$property->properties_variation->id,'https://starthomebudapest.hu/index.php?s='.$property->properties_variation->id);
    echo '<br>';
endforeach;

?>