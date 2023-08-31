<?php
if(empty($this->request->params['_ext'])):
?>
    <table style="width:100%;">
    <?php foreach ($datas as $k=>$property): ?>
    <tr>
    <td height="<?=($k==count($datas)-1?'auto':1035)?>" valign="top">
    <center><h1>Offer</h1></center>
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
    Note:
    <?php

        endforeach;
    ?>
    </td>
    </tr>
    </table>
<?php
else:
?>
<?php foreach ($datas as $k=>$property): ?>
    <table style="width:100%;">
        <tr>
            <td valign="top">
                <center><h1>Offer</h1></center>
                <?php

                echo $this->Html->tag('b',
                    ($this->request->query('stck')=='true'?$property->citypart_with_district:$property->address_short).
                    ($this->request->query('stnck')=='true'?' '.$property->streetnum.'.':'').
                    ' ('.$property->properties_variation->id.')'
                );
                ?><br>
                <?php
                echo $property->properties_variation->description_en;
                echo '<br>';
                if($property->properties_variation->type == 1)
                {
                    echo $this->Html->tag('b',__d('start', 'Bérleti díj: {0}',$property->properties_variation->price_eur_formatted_en));
                }else{
                    echo $this->Html->tag('b',__d('start', 'Ingatlan ára: {0}',$property->properties_variation->price_eur_formatted_en));
                }
                ?>
            </td>
        </tr>
    </table>
    <?php echo $this->element('image_notable', ['property' => $property]);?>
    <hr>
    <br><br>
    Note:
<?php
if(count($datas)-1!=$k)echo '<pagebreak />';
endforeach;

endif;
?>


