<div class="block-header">
    <h2><?=$data->address?>
        <small><?php
            echo $data->id .' -';
            echo (!empty($data->building_type_name)?$data->building_type_name.' -':null);
            echo (!empty($data->size_net)?$data->size_net.' nm -':null);
            echo (!empty($data->properties_layout->room)?$data->properties_layout->rooms.' szoba':null)
            ?>
        </small>
    </h2>

</div>
<div class="card" id="profile-main">
    <div class="pm-overview c-overflow" >

                <div class="pmo-pic">
                    <div class="p-relative">
                        <?= ($data->has('mainimage')?$this->Html->image(str_replace('\\','/',$data->mainimage->image_tn)):null) ?>

                    </div>


                    <div class="pmo-stat">
                        <?php
                        if(!empty($data->rentvar) && $data->rent == 1):
                        ?>
                        <h2 class="m-0 c-white"><?= $data->rentvar->price_formatted ?></h2>
                        <?php
                        if($data->rentvar->price_dev =='EUR'){
                            echo $data->rentvar->price_huf_formatted;
                        }elseif ($data->rentvar->price_dev =='USD'){
                            echo $data->rentvar->price_huf_formatted;
                        }else{
                            echo $data->rentvar->price_eur_formatted;
                        }
                        endif;
                        if(!empty($data->sellvar)  && $data->sell == 1):
                            ?>
                            <h2 class="m-0 c-white"><?= $data->sellvar->price_formatted ?></h2>
                            <?php
                            if($data->sellvar->price_dev =='EUR'){
                                echo $data->sellvar->price_huf_formatted;
                            }elseif ($data->sellvar->price_dev =='USD'){
                                echo $data->sellvar->price_huf_formatted;
                            }else{
                                echo $data->sellvar->price_eur_formatted;
                            }
                        endif;
                        ?>
                    </div>
                </div>

                <div class="pmo-block pmo-contact hidden-xs" style="">
                    <h2>Kapcsolattartók</h2>
                    <?php
                    foreach($data->contacts as $contact):
                    ?>
                    <ul>
                        <?php if(!empty($contact->phone1)):?><li><i class="zmdi zmdi-phone"></i> <a href="tel:<?=$contact->phone1?>"><?=$contact->phone1?></a></li><?php endif;?>
                        <?php if(!empty($contact->phone2)):?><li><i class="zmdi zmdi-phone"></i> <a href="tel:<?=$contact->phone2?>"><?=$contact->phone2?></a></li><?php endif;?>
                        <?php if(!empty($contact->phone3)):?><li><i class="zmdi zmdi-phone"></i> <a href="tel:<?=$contact->phone3?>"><?=$contact->phone3?></a></li><?php endif;?>
                        <?php if(!empty($contact->phone4)):?><li><i class="zmdi zmdi-phone"></i> <a href="tel:<?=$contact->phone4?>"><?=$contact->phone4?></a></li><?php endif;?>
                        <?php if(!empty($contact->email1)):?><li><i class="zmdi zmdi-email"></i>  <a href="mailto:<?=$contact->email1?>"><?=$contact->email1?></a></li><?php endif;?>
                        <?php if(!empty($contact->email2)):?><li><i class="zmdi zmdi-email"></i>  <a href="mailto:<?=$contact->email2?>"><?=$contact->email2?></a></li><?php endif;?>
                        <?php if(!empty($contact->email3)):?><li><i class="zmdi zmdi-email"></i>  <a href="mailto:<?=$contact->email3?>"><?=$contact->email3?></a></li><?php endif;?>
                        <?php if(!empty($contact->email4)):?><li><i class="zmdi zmdi-email"></i>  <a href="mailto:<?=$contact->email4?>"><?=$contact->email4?></a></li><?php endif;?>
                    </ul>
                    <?php
                    endforeach;
                    ?>
                </div>

    </div>

    <div class="pm-body clearfix">
        <ul class="tab-nav tn-justified nav">
            <li class="active"><a data-toggle="tab" href="#detail">Alapadatok</a></li>
            <li><a data-toggle="tab" href="#descript">Leírás</a></li>
            <li><a data-toggle="tab" href="#images">Képek</a></li>
        </ul>
        <div class="tab-content">
            <div  id="detail" class="tab-pane fade in active">
                <div class="pmb-block">
                    <div class="pmbb-header">
                        <h2>Ingatlan adatai</h2>
                    </div>
                    <div class="pmbb-body">
                        <dl class="dl-horizontal">
                            <dt>Utca házszám</dt>
                            <dd>
                                <?=$data->address?>
                                <?=!empty($data->address_note)?'<br>('.$data->address_note.')':null?>
                            </dd>
                        </dl>
                        <dl class="dl-horizontal">
                            <dt>Típus</dt>
                            <dd><?=$data->building_type_name?></dd>
                        </dl>
                        <dl class="dl-horizontal">
                            <dt>Alapterület</dt>
                            <dd><?=$data->size_net?> m2</dd>
                        </dl>
                        <?php
                        if(!empty($data->properties_layout)):
                        ?>
                        <dl class="dl-horizontal">
                            <dt>Szobák száma</dt>
                            <dd><?=$data->properties_layout->rooms?></dd>
                        </dl>
                        <?php
                        endif;
                        ?>
                        <dl class="dl-horizontal">
                            <dt>Fűtés</dt>
                            <dd><?=$data->heat_type_name?></dd>
                        </dl>
                        <?php
                        if(!empty($data->rentvar->furniture_type)):
                        ?>
                        <dl class="dl-horizontal">
                            <dt>Bútorozás</dt>
                            <dd><?=$data->rentvar->furniture_type_name?></dd>
                        </dl>
                        <?php
                        endif;
                        ?>
                    </div>
                </div>
                <?php
                foreach($data->contacts as $contact):
                ?>
                <div class="pmb-block">
                    <div class="pmbb-header">
                        <h2><?=($contact->_joinData->type == 1?'Tulajdonos':'Kapcsolattartó')?></h2>
                    </div>
                    <div class="pmbb-body">
                        <div class="pmbb-view">
                            <dl class="dl-horizontal">
                                <dt>Név</dt>
                                <dd><?=$contact->fullname?></dd>
                            </dl>
                            <dl class="dl-horizontal">
                                <dt>Telefon</dt>
                                <?php if(!empty($contact->phone1)):?><dd> <a href="tel:<?=$contact->phone1?>"><?=$contact->phone1_formatted?></a></dd><?php endif;?>
                                <?php if(!empty($contact->phone2)):?><dd> <a href="tel:<?=$contact->phone2?>"><?=$contact->phone2_formatted?></a></dd><?php endif;?>
                                <?php if(!empty($contact->phone3)):?><dd> <a href="tel:<?=$contact->phone3?>"><?=$contact->phone3_formatted?></a></dd><?php endif;?>
                                <?php if(!empty($contact->phone4)):?><dd> <a href="tel:<?=$contact->phone4?>"><?=$contact->phone4_formatted?></a></dd><?php endif;?>

                            </dl>
                            <dl class="dl-horizontal">
                                <dt>Email</dt>
                                <?php if(!empty($contact->email1)):?><dd> <a href="tel:<?=$contact->email1?>"><?=$contact->email1?></a></dd><?php endif;?>
                                <?php if(!empty($contact->email2)):?><dd> <a href="tel:<?=$contact->email2?>"><?=$contact->email2?></a></dd><?php endif;?>
                                <?php if(!empty($contact->email3)):?><dd> <a href="tel:<?=$contact->email3?>"><?=$contact->email3?></a></dd><?php endif;?>
                                <?php if(!empty($contact->email4)):?><dd> <a href="tel:<?=$contact->email4?>"><?=$contact->email4?></a></dd><?php endif;?>
                            </dl>
                        </div>
                    </div>
                </div>

                <?php
                endforeach;
                ?>
                <div class="pmb-block">
                    <div class="pmbb-header">
                        <h2>Egyéb adatok</h2>
                    </div>
                    <div class="pmbb-body">
                        <?php
                        if(!empty($data->properties_layout)):
                        $lo = $data->properties_layout;
                        ?>
                        <dl class="dl-horizontal">

                            <dt>Elrendezés</dt>
                            <dd>
                                <?php
                                $layouts = [];
                                    if($lo->livingroom> 0) $layouts[] = $lo->livingroom.' nappali';
                                    if($lo->kitchen> 0) $layouts[] = $lo->kitchen.' konyha';
                                    if($lo->american_kitchen> 0) $layouts[] = $lo->american_kitchen.' amerikai konyha';
                                    if($lo->eating_kitchen> 0) $layouts[] = $lo->eating_kitchen.' étkezős konyha';
                                    if($lo->room> 0) $layouts[] = $lo->room.' háló';
                                    if($lo->toilett> 0) $layouts[] = $lo->toilett.' wc';
                                    if($lo->bathroom> 0) $layouts[] = $lo->bathroom.' fürdő';
                                    if($lo->bathroom_toliett> 0) $layouts[] = $lo->bathroom_toliett.' wc-s fürdő';
                                    if($lo->hall> 0) $layouts[] = $lo->hall.' előszoba';
                                    if($lo->storage> 0) $layouts[] = $lo->storage.' tároló kamra';
                                    echo implode(', ', $layouts);
                                ?>
                            </dd>
                        </dl>
                        <?php
                        endif;
                        ?>
                        <dl class="dl-horizontal">
                            <dt>Tulajdonságok</dt>
                            <dd>
                                <?php
                                $props = [];
                                    if($data->upperlevel ==1) $props[] = 'Felsőszint';
                                    if($data->lowerlevel ==1) $props[] = 'Földszinti';
                                    if($data->atticlevel ==1) $props[] = 'Padlástér';
                                    if($data->newlybuilt ==1) $props[] = 'Újépítésá';
                                    if($data->elevator ==1) $props[] = 'Lift';
                                    if($data->gardencontact ==1) $props[] = 'Kertkapcsolat';
                                    if($data->petallowed ==1) $props[] = 'Állat hozható';
                                    if($data->outlook ==1) $props[] = 'Panoráma';
                                    if($data->terrace ==1) $props[] = 'Erkély/terasz';
                                echo implode(', ', $props);
                                ?>

                            </dd>
                        </dl>
                        <dl class="dl-horizontal">
                            <dt>További adatok</dt>
                            <dd>
                                <?php
                                $props = [];
                                if($data->lotsize >0) $props[] = 'Telekméret: '.$data->lotsize;
                                if(!empty($data->builddate)) $props[] = 'Építési idő:'.$data->builddate;
                                if(!empty($data->building_levels)) $props[] = 'Ingatlan szintjei:'.$data->building_levels;
                                if(!empty($data->building_condition)) $props[] = 'Állapot:'.$data->building_condition_type_name;
                                if(!empty($data->parking)) $props[] = 'Parkolás:'.$data->parking_type_name;

                                echo implode(', ', $props);
                                ?>

                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="pmb-block">
                    <div class="pmbb-header">
                        <h2>Ki látta</h2>
                    </div>
                    <div class="pmbb-body">
                        <?php
                        if(!empty($data->users)){
                            foreach($data->users as $user){
                                echo $user->fullname.', ';
                            }
                        }?>
                    </div>
                </div>
                <div class="pmb-block">
                    <div class="pmbb-header">
                        <h2>Megjegyzés</h2>
                    </div>
                    <div class="pmbb-body">
                        <?=$data->note?>
                    </div>
                </div>
            </div>
            <div id="descript" class="tab-pane fade">
                <?php
                if(!empty($data->sellvar) && $data->sell):
                ?>
                <div class="pmb-block">
                    <div class="pmbb-header">
                        <h2>Eladó hirdetés szöveg</h2>
                    </div>
                    <div class="pmbb-body">
                        <div class="pmbb-view">
                            <?=$data->sellvar->description?>
                        </div>

                    </div>
                </div>
                <?php
                endif;
                if(!empty($data->rentvar) && $data->rent):
                ?>
                <div class="pmb-block">
                    <div class="pmbb-header">
                        <h2>Kiadó hirdetés szöveg</h2>
                    </div>
                    <div class="pmbb-body">
                        <div class="pmbb-view">
                            <?=$data->rentvar->description?>
                        </div>

                    </div>
                </div>
                <?php
                endif;
                ?>
            </div>
            <div id="images" class="tab-pane fade">
                <div class="pmb-block">
                <?php
                    foreach($data->properties_images as $image){
                        echo $this->Html->link(
                                $this->Html->image(str_replace('\\','/',$image->image_mini), ['style' => 'width:48%; margin:1%;']),
                                str_replace('\\','/',$image->image_original),
                                ['escape' => false, 'class' => 'fb', 'rel' => 'gal'] );

                    }
                ?>
                </div>

            </div>
        </div>
    </div>
</div>
