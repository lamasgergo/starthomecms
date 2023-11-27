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
        Típus: <?=$property->building_type_name?> 
        </td>
        <td>
        Alapterület: <?=$property->size_net?> nm
        </td>
    </tr>
    <tr>
        <td>
            Hálószobák: <?=$property->properties_layout->room?>?>
        </td>
        <td>
        Konyha: <?=($property->properties_layout->american_kitchen?__d('start','Amerikai konyha'):'')?><?=($property->properties_layout->eating_kitchen?__d('start','Étkezős konyha'):'')?><?=($property->properties_layout->kitchen?__d('start','Szeparált konyha'):'')?>
        </td>
    </tr>
    <tr>
        <td>
        Fürdőszoba: <?=$property->properties_layout->bathroom?> 
        </td>
        <td>
        Garázs: <?=$property->parking_type_name?> 
        </td>
    </tr>
</table> 
<?php
    echo $property->properties_variation->description;
?>
    <br><br>
    <b>A kép nagyításához kattintson a képre! (Ctrl + klikk)</b><br><br>
    <?php echo $this->element('image', ['property' => $property]);?>

<br><br>

<?php
if($property->properties_variation->type == 1)
{
    echo $this->Html->tag('b',__d('start', 'Bérleti díj: {0}',$property->properties_variation->price_formatted));
}else{
    echo $this->Html->tag('b',__d('start', 'Ingatlan ára: {0}',$property->properties_variation->price_formatted));
}
    echo '<hr>';
    endforeach;
?>
</td>
</tr>
</table>