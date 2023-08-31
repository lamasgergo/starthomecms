<?php
if(empty($this->request->params['_ext'])):
    ?>

<table style="width:100%;">
    <?php foreach ($datas as $k=>$property): ?>
<tr>
<td height="<?=($k==count($datas)-1?'auto':1035)?>" valign="top">
<center><h1>Ajánlat</h1></center>
<?php

    echo $this->Html->tag('b',
        ($this->request->query('stck')=='true'?$property->citypart_with_district:$property->address_short).
        ($this->request->query('stnck')=='true'?' '.$property->streetnum.'.':'').
        ' ('.$property->properties_variation->id.')'
    );
?><br>
<?php
    echo nl2br($property->properties_variation->description);
    echo '<br>';
    if($property->properties_variation->type == 1)
    {
        echo $this->Html->tag('b',__d('start', 'Bérleti díj: {0}',$property->properties_variation->price_formatted));
    }else{
        echo $this->Html->tag('b',__d('start', 'Ingatlan ára: {0}',$property->properties_variation->price_formatted));
    }

    echo $this->element('image', ['property' => $property]);
    ?>
    <hr>
    <br><br>
    Megjegyzés:

</td>
</tr>
        <?php

    endforeach;
    ?>
</table>

    <?php
else:
    ?>
<?php foreach ($datas as $k=>$property): ?>
    <table style="width:100%;">
            <tr>
                <td valign="top">
                    <center><h1>Ajánlat</h1></center>
                    <?php

                    echo $this->Html->tag('b',
                        ($this->request->query('stck')=='true'?$property->citypart_with_district:$property->address_short).
                        ($this->request->query('stnck')=='true'?' '.$property->streetnum.'.':'').
                        ' ('.$property->properties_variation->id.')'
                    );
                    ?><br>
                    <?php
                    echo $property->properties_variation->description;
                    echo '<br>';
                    if($property->properties_variation->type == 1)
                    {
                        echo $this->Html->tag('b',__d('start', 'Bérleti díj: {0}',$property->properties_variation->price_formatted));
                    }else{
                        echo $this->Html->tag('b',__d('start', 'Ingatlan ára: {0}',$property->properties_variation->price_formatted));
                    }
                    ?>

                </td>
            </tr>

    </table>


<?php

    echo $this->element('image_notable', ['property' => $property]);
    ?>
    <hr>
    <br><br>
    Megjegyzés:
<?php

if(count($datas)-1!=$k)echo '<pagebreak />';
endforeach;

    endif;
?>

