<table style="width:100%;">
<?php foreach ($datas as $property): ?>
<tr>
<td>
<?php

    echo $this->Html->tag('b',
        ($this->request->query('stck')=='true'?$property->citypart_with_district:$property->address_short).
        ($this->request->query('stnck')=='true'?' '.$property->streetnum.'.':'').
        ' ('.$property->properties_variation->id.')'
    );
?><br><br>
<table>
    <tr>
        <td>
        Type: <?=$property->building_type_name?> 
        </td>
        <td>
        Area: <?=$property->size_net?> sqm
        </td>
    </tr>
    <tr>
        <td>
        Bedrooms: <?=$property->properties_layout->room?> <?=($property->properties_layout->halfroom?$property->properties_layout->halfroom:'')?>
        </td>
        <td>
        Kitchen: <?=($property->properties_layout->american_kitchen?__d('start','Amerikai konyha'):'')?><?=($property->properties_layout->eating_kitchen?__d('start','Étkezős konyha'):'')?><?=($property->properties_layout->kitchen?__d('start','Szeparált konyha'):'')?>
        </td>
    </tr>
    <tr>
        <td>
        Bathroom: <?=$property->properties_layout->bathroom?> 
        </td>
        <td>
        Garage: <?=$property->parking_type_name?> 
        </td>
    </tr>
</table> 
<?php
    echo nl2br($property->properties_variation->description_en);
echo '<br>';
if($property->properties_variation->type == 1)
{
    echo $this->Html->tag('b',__d('start', 'Bérleti díj: {0}',$property->properties_variation->price_formatted));
}else{
    echo $this->Html->tag('b',__d('start', 'Ingatlan ára: {0}',$property->properties_variation->price_formatted));
}
?>
    <br><br>
    <b>Click on the images for larger view!</b><br><br>
    <?php echo $this->element('image', ['property' => $property]);?>
<br>
<?php
    endforeach;
?>
</td>
</tr>
</table>