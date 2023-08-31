<?php 
$linkhu='https://starthomebudapest.hu/hu/ingatlanjaink/fs:1/oldid:';
$linken='https://starthomebudapest.hu/en/our-properties/fs:1/oldid:';
$id='';
foreach ($datas as $k=>$property) {
	$id.=$property->properties_variation->id.',';
//	$link.=$id.',';
//	print_r($property->id);
//	echo "<hr>";
}
if ($id!='') $id=substr($id,0,strlen($id)-1);
echo '<button id="clip_buttonhu">Másolás a vágólapra -> </button>&nbsp;<span id="copyhu">'.$this->Html->link('Ajánlott ingatlanok:'.$id,$linkhu.$id).'</span>';
echo '<br>';
echo '<button id="clip_buttonen">Másolás a vágólapra -> </button>&nbsp;<span id="copyen">'.$this->Html->link('Recommended properties:'.$id,$linken.$id).'</span>';
echo '<br>';
//echo $id;
//print_r($datas);
?>