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
?><br>
<?php
    echo nl2br($property->properties_variation->description);
?>
<br>
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