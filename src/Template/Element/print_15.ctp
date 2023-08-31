<table style="width:100%;">
<?php foreach ($datas as $k=>$property): ?>
<tr>
<td height="<?=($k==count($datas)-1?'auto':1035)?>" valign="top">
<div class="header">
    <table>
        <tr>
            <td>
            </td>
            <td style="text-align: center;">
                <span style="font-size:16px;font-family: Times New Roman;font-weight:normal; text-align: center;font-style:italic;background-color:#fff;"> Tel +36-20/935-0018</span>
                <hr style="color:green;background-color: green;height:1px">
                <span style="font-size:16px;font-family: Times New Roman;font-weight:normal; text-align: center;background-color:#fff;">starthomebudapest.hu</span>
            </td>
        </tr>
    </table>
</div>
<?php

    echo $this->Html->tag('b',
        ($this->request->query('stck')=='true'?$property->citypart_with_district:$property->address_short).
        ($this->request->query('stnck')=='true'?' '.$property->streetnum.'.':'').
        ' ('.$property->properties_variation->id.')'
    );
?><br>
<?php
    echo nl2br($property->properties_variation->description_en);
    echo '<br>';
if($property->properties_variation->type == 1)
{
    echo $this->Html->tag('b',__d('start', 'Bérleti díj: {0}',$property->properties_variation->price_eur_formatted_en));
}else{
    echo $this->Html->tag('b',__d('start', 'Ingatlan ára: {0}',$property->properties_variation->price_eur_formatted_en));
}
?>
    <br><br>

    <?php echo $this->element('image', ['property' => $property]);?>
<hr>   
<br><br>     
More images on starthomebudapest.hu.<br><br>
Note:
<?php

    endforeach;
?>
</td>
</tr>
</table>

