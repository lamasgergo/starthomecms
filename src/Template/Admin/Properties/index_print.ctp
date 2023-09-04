<div class="buttons">
    <button id="clip_button">Másolás a vágólapra!</button>
    <button id="print">Nyomtatás</button>
    <?php
    if($this->request->data['todo']==14 || $this->request->data['todo'] == 15 || $this->request->data['todo'] == 16
        || $this->request->data['todo'] == 17) {
        if($this->request->data['todo']==14 )$this->request->data['todo'] = 18;
        if($this->request->data['todo']==15 )$this->request->data['todo'] = 19;
        /** @var \App\View\AppView $this */

        $url = $this->Url->build([
            'controller' => $this->request->controller,
            'action' => $this->request->action,

            '_ext' => 'pdf'
        ]);

        echo '<button id="print" onclick="window.location = \''.$url.'?'.http_build_query($this->request->data).'\'">Letöltés PDF formátumban</button>';
    }
    if($this->request->data['todo']==25) {
        $url = $this->Url->build([
            'controller' => $this->request->controller,
            'action' => $this->request->action,

            '_ext' => 'pdf'
        ]);
        echo '<button id="print" onclick="window.location = \''.$url.'?'.http_build_query($this->request->data).'\'">Letöltés CSV formátumban</button>';
//	print_r($this->request->data);
    }
    ?>

<?php
    if(!empty($this->request->query['sendemail'])){
    ?>
    <a href="mailto:<?php echo $this->request->query['sendemail'];?>?subject=Ajánlat" class="button">Email küldése</a>

    <?php
    }
?>
    <a href="<?php echo $this->request->query['sendemail'];?>?subject=Ajánlat" class="button">Kiajánlás URL</a>
</div>
<?php
if($this->request->query['todo']!='11' && $this->request->query['todo']!='12' && 
$this->request->query['todo']!='13' && $this->request->query['todo']!='14' && $this->request->query['todo']!='15'
 && $this->request->query['todo']!='16' && $this->request->query['todo']!='17'
 
):
?>
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
    endif;
?>

<div id="copy">
<br>
<?php
if(empty($this->request->query['ids'])){
    echo $this->Html->tag('div', 'Nem választott ki egy ingatlant se!', ['style'=> 'padding:20px; text-align:center; background-color: red; color: #ffffff;']);
}
    //Vágólapra vagy nyomtatás kép nélkül
    if($this->request->query['todo']=='1'):
        echo $this->element('print_1');
    endif;
    //Vágólapra másolás vagy nyomtás képpel
    if($this->request->query['todo']=='2'):
        echo $this->element('print_2');
    endif;
    //Vágólapra angolul
    if($this->request->query['todo']=='3'):
        echo $this->element('print_3');
    endif;
    //Hivatkozások másolás a vágólapra
    if($this->request->query['todo']=='4'):
        echo $this->element('print_4');
    endif;
    //Címkiadás
    if($this->request->query['todo']=='5'):
        echo $this->element('print_5');
    endif;
    //Megtekintési
    if($this->request->query['todo']=='6'):
        echo $this->element('print_6');
    endif;
    //Vágólapra másolás vagy nyomtás képpel
    if($this->request->query['todo']=='10'):
        echo $this->element('print_10');
    endif;
    //Vágólapra vagy nyomtatás kép nélkül RELOKÁCIÓS
    if($this->request->query['todo']=='11'):
        echo $this->element('print_11');
    endif;  
    //Vágólapra másolás vagy nyomtás képpel RELOKÁCIÓS
    if($this->request->query['todo']=='12'):
        echo $this->element('print_12');
    endif;
    //Vágólapra angolul  RELOKÁCIÓS
    if($this->request->query['todo']=='13'):
        echo $this->element('print_13');
    endif;    
    //Adatlap
    if($this->request->query['todo']=='14'):
        echo $this->element('print_14');
    endif;  
    //Adatlap  angol
    if($this->request->query['todo']=='15'):
        echo $this->element('print_15');
    endif; 
    //Relok Adatlap 
    if($this->request->query['todo']=='16'):
        echo $this->element('print_16');
    endif; 
    //Relok Adatlap  angoll
    if($this->request->query['todo']=='17'):
        echo $this->element('print_17');
    endif;         
    //Cimlista export
    if($this->request->query['todo']=='25'):
        echo $this->element('print_25');
    endif;         
    //Cimkiadás linkben
    if($this->request->query['todo']=='26'):
        echo $this->element('print_26');
    endif;
?>
</div>
