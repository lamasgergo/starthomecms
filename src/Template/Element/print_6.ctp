<table>
    <tr><td width="300">Ingatlant bemutató:</td><td><?php echo(!empty($this->request->query['name'])?$this->request->query['name']:'')?></td></tr>
    <tr><td><b>Telefonszám:</b></td><td><b><?php echo(!empty($this->request->query['phone'])?$this->request->query['phone']:'')?></b></td></tr>
    <tr><td><b>Bemutatás időpontja:</b></td><td><b><?php echo(!empty($this->request->query['date'])?$this->request->query['date']:'')?></b></td></tr>
</table>
<br><br>
<table style="width:100%;">
<?php foreach ($datas as $property): ?>
<tr>
<td>
    <table>
        <tr><td width="150">Ingatlan sorszáma:</td><td><?php echo $property->properties_variation->id;?></td></tr>
        <tr><td><b>Címe:</b></td><td><b><?php echo $property->address;?></b></td></tr>
        <tr><td>Cím megjegyzés:</td><td><?php echo $property->address_note;?></td></tr>
        <?php
        foreach($property->contacts as $onecontact)
        {
            if($onecontact->_joinData['main']==1 and $onecontact->_joinData['type']==1)
            {
                ?>
                <tr><td>Tulajdonos neve:</td><td><?php echo $onecontact->fullname?></td></tr>
                <tr><td>Telefon:</td><td>
                        <?php
                        echo $onecontact->phone1_formatted.(!empty($onecontact->phone1note)?' ('.$onecontact->phone1note.')':null);
                        if(!empty($onecontact->phone2_formatted)){
                            echo ' | '.$onecontact->phone2_formatted.(!empty($onecontact->phone2note)?' ('.$onecontact->phone2note.')':null);
                        }
                        if(!empty($onecontact->phone3_formatted)){
                            echo ' | '.$onecontact->phone3_formatted.(!empty($onecontact->phone3note)?' ('.$onecontact->phone3note.')':null);
                        }
                        if(!empty($onecontact->phone4_formatted)){
                            echo ' | '.$onecontact->phone4_formatted.(!empty($onecontact->phone4note)?' ('.$onecontact->phone4note.')':null);
                        }

                        ?>
                    </td></tr>
                <?php
            }
            if($onecontact->_joinData['main']==1 and $onecontact->_joinData['type']==2)
            {
                ?>
                <tr><td>Kapcsolattartó neve:</td><td><?php echo $onecontact->fullname?></td></tr>
                <tr><td>Telefon:</td><td>
                        <?php
                        echo $onecontact->phone1_formatted.(!empty($onecontact->phone1note)?' ('.$onecontact->phone1note.')':null);
                        if(!empty($onecontact->phone2_formatted)){
                            echo ' | '.$onecontact->phone2_formatted.(!empty($onecontact->phone2note)?' ('.$onecontact->phone2note.')':null);
                        }
                        if(!empty($onecontact->phone3_formatted)){
                            echo ' | '.$onecontact->phone3_formatted.(!empty($onecontact->phone3note)?' ('.$onecontact->phone3note.')':null);
                        }
                        if(!empty($onecontact->phone4_formatted)){
                            echo ' | '.$onecontact->phone4_formatted.(!empty($onecontact->phone4note)?' ('.$onecontact->phone4note.')':null);
                        }

                        ?>
                    </td></tr>
                <?php
            }
        }
        ?>

    </table>
<?php
    echo nl2br($property->properties_variation->description);
?> 
<br>   
<b>    
<?php
if($property->properties_variation->type == 1)
{
    echo $this->Html->tag('b',__d('start', 'Bérleti díj: {0}',$property->properties_variation->price_formatted));
}else{
    echo $this->Html->tag('b',__d('start', 'Ingatlan ára: {0}',$property->properties_variation->price_formatted));
}
?>
</b>
<div style="float:right; margin-right:20px;">
<?php
    if($property->properties_variation->nocontract=='1')
    {
        echo "Szerződés nincs!";
    }
?>
</div>
<div style="float:right; margin-right:20px;">
<?php
    if(empty($property->properties_images)){
        echo "Fotó nincs!   ";        
    }
?>
</div>
<div class="clear"></div>
<hr>
</td>
</tr>
<?php
        endforeach;
?>
</table>
 <br><br>
Alulírott...............................................................
lakcím:...................................................tel.sz:....................................................................
ezúton írásban igazolom, hogy az fenti címe/ken található eladó/kiadó ingatlant a mai napon a
Start Home Budapest Kft. 1025 Budapest, Szeréna út 63. (adószám: 27854479-2-41)  közvetítésével ismertem meg.
Az ingatlant ezt megelőzően sem hirdetés, sem más irodán keresztül vagy más forrásból nem
ismertem. Kijelentem, hogy a megkapott ingatlan címe üzleti titkot képez, harmadik személynek
tovább közvetítésre nem adom át. Tudomásul veszem, hogy a fenti ingatlanra vonatkozó
vásárlási vagy bérbevételi szándék bejelentése, adásvételi, foglalói, ill. bárminemű előszerződés
kezdeményezése csak Start Home Budapest Kft. 1025 Budapest, Szeréna út 63. (adószám: 27854479-2-41)  közreműködésével, annak tudtával történhet.
Hozzájárulok, hogy az iroda adataimat megtekintse, azt nyilvántartásba rögzítse. Az adatokat
harmadik fél részére tovább nem adhatja.
Igazolom, hogy a fenti ingatlan/ok Start Home Budapest Kft. 1025 Budapest, Szeréna út 63. (adószám: 27854479-2-41) által kiközvetítettnek minősül nemcsak
részemre, hanem minden olyan jogi és természetes személy részére, aki az ingatlanról általam
szerzett tudomást.     <br><br><br><br>
........................................................<br>
Aláírás <br>
Budapest. <?php echo(!empty($this->request->query['date'])?$this->request->query['date']:'')?>