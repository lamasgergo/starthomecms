<?php
/** @var \App\Model\Entity\PropertiesVariation $item */
foreach ($data as $k => $item) {

    ?>
    <div class="offer-row mb-5">
        <div class="head mt-3">
            <div class="row">
                <div class="col-3 col-lg-3 col-xl-2">
                    <div class="logo">
                        <?= $this->Html->image('logo.png', ['class' => 'w-100']) ?>
                    </div>
                </div>
                <div class="col-9 col-lg-5 col-xl-3 align-self-end pb-3 company-info">
                    <div class="company mb-3">Start Home Budapest</div>
                    <div>mail: <a href="mailto:info@starthomebudapest.hu">info@starthomebudapest.hu</a></div>
                    <div>web: <a href="https://starthomebudapest.hu" target="_blank">starthomebudapest.hu</a></div>
                </div>
                <div class="col-lg-12 col-xl-7  pb-3 ">
                    <div class="row">
                        <div class="col-12 col-lg-8 text-center text-xl-start pt-4
">
                            <div class="h1-title">Your next home in Budapest</div>
                        </div>
                        <div class="col-12 col-lg-4 text-end">
                            <div class="ident-holder h-100 pe-3 pt-3">
                                <div class="row h-100">
                                    <div class="col-12">
                                        <div class="ident"><?= $k + 1 ?>. <strong>ID:<?= $item->id ?> </strong></div>
                                    </div>
                                    <div class="col-12 align-self-end street">
                                        <b>
                                            <?php
                                            if($this->request->query('lng') == 'en') {
                                                echo $item->property->address_short_en;
                                            }else{
                                                echo $item->property->address_short;
                                            }?>
                                        </b>
                                        <div><?= $item->property->citypart->citypart ?></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="row parameter-holder">
            <div class="col-6 col-lg-4  col-xl-2 mt-3 mt-lg-0">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">villa</span></div>
                        <div class="col align-self-center"><span
                                    class="title"><?=__d('start', 'Méret')?></span><?= $item->property->size_net ?> m2
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-4  col-xl-2 mt-3 mt-lg-0">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">chair</span></div>
                        <div class="col align-self-center"><span
                                    class="title"><?=__d('start', 'Nappali')?></span><?= $item->property->properties_layout->livingroom ?>
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-4  col-xl-2 mt-3 mt-lg-0">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span class="material-symbols-outlined">bed</span>
                        </div>
                        <div class="col align-self-center"><span
                                    class="title"><?=__d('start', 'Szoba')?></span><?= $item->property->properties_layout->room ?> <?= $item->property->properties_layout->half_room ? ' + ' . $item->property->properties_layout->half_room : '' ?>
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-4 col-xl-2 mt-3 mt-xl-0">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">bathtub</span></div>
                        <div class="col align-self-center"><span
                                    class="title"><?=__d('start', 'Fürdő')?></span><?= $item->property->properties_layout->bath_rooms ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-8 col-xl-4 mt-3 mt-xl-0">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">garage</span></div>
                        <div class="col align-self-center"><span
                                    class="title"><?=__d('start', 'Parkolás')?></span><?= $item->property->parking_type_name ?> &nbsp;
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row image-holder">
            <div class="col-12 col-lg-8">

                <?= $this->Html->link(
                    $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->mainimage->image_original)]), ['class' => 'w-100']),
                    $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->mainimage->image_original)]) . '.jpg',
                    ['class' => 'fb mainimage', 'rel' => 'gallery'.$item->id, 'escape' => false]
                ); ?>
            </div>
            <div class="col-12 col-lg-4">
                <div class="row h-100">
                    <div class=" h-lg-50 col-6 col-lg-12  mt-3 mt-lg-0">
                        <?php
                        if (!empty($item->property->properties_images[1])) {
                            echo
                            $this->Html->link(
                                $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[1]->image_original)]), ['class' => 'w-100']),
                                $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[1]->image_original)]) . '.jpg',
                                ['class' => 'fb smallimage', 'rel' => 'gallery'.$item->id, 'escape' => false]
                            );
                        }
                        ?>
                    </div>
                    <div class=" h-lg-50 col-6 col-lg-12 mt-3">
                        <?php
                        if (!empty($item->property->properties_images[2])) {
                            echo
                            $this->Html->link(
                                $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[2]->image_original)]), ['class' => 'w-100']),
                                $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[2]->image_original)]) . '.jpg',
                                ['class' => 'fb smallimage', 'rel' => 'gallery'.$item->id, 'escape' => false]
                            );
                        }
                        ?>

                    </div>
                </div>
            </div>
        </div>
        <div class="row image-ext-holder mt-3">

            <div class=" col-4 ">
                <?php
                if (!empty($item->property->properties_images[3])) {
                    echo
                    $this->Html->link(
                        $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[3]->image_original)]), ['class' => 'w-100']),
                        $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[3]->image_original)]) . '.jpg',
                        ['class' => 'fb smallimage', 'rel' => 'gallery'.$item->id, 'escape' => false]
                    );
                }
                ?>
            </div>
            <div class=" col-4">
                <?php
                if (!empty($item->property->properties_images[4])) {
                    echo
                    $this->Html->link(
                        $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[4]->image_original)]), ['class' => 'w-100']),
                        $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[4]->image_original)]) . '.jpg',
                        ['class' => 'fb smallimage', 'rel' => 'gallery'.$item->id, 'escape' => false]
                    );
                }
                ?>

            </div>
            <div class=" col-4">
                <?php
                if (!empty($item->property->properties_images[5])) {
                    echo
                    $this->Html->link(
                        $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[5]->image_original)]), ['class' => 'w-100']),
                        $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[5]->image_original)]) . '.jpg',
                        ['class' => 'fb smallimage', 'rel' => 'gallery'.$item->id, 'escape' => false]
                    );
                }
                ?>

            </div>

        </div>
        <div class="row description-holder mt-3">
            <div class="col-12 col-lg-8">
                <h4><?=__d('start', 'Leírás')?></h4>
                <?php
                if($this->request->query('lng') == 'en') {
                    echo $item->description_en;
                }else {
                    echo $item->description;
                }
                ?>
                <hr>
                <div class="row">

                    <div class="col-12 col-lg-6">
                        <?php
                        if(!empty($item->property->building_type)):
                            ?>
                            <div class="row detail-param">
                                <div class="col-4 param-title"><?=__d('start', 'Típus')?></div>
                                <div class="col-8"><?= $item->property->building_type_name ?></div>
                            </div>
                        <?php endif;?>
                        <?php

                        if(!empty($item->furniture_type)):
                            ?>
                            <div class="row detail-param">
                                <div class="col-4 param-title"><?=__d('start', 'Bútorozás')?></div>
                                <div class="col-8"><?= $item->furniture_type_name ?></div>
                            </div>
                        <?php endif;?>
                        <?php
                        if(!empty($item->property->outlook)):
                            ?>
                            <div class="row detail-param">
                                <div class="col-4 param-title"><?=__d('start', 'Kilátás')?></div>
                                <div class="col-8"><?= $item->property->panorama_type_name ?></div>
                            </div>
                        <?php endif;?>
                        <?php
                        if(!empty($item->property->pool_type)):
                            ?>
                            <div class="row detail-param">
                                <div class="col-4 param-title"><?=__d('start', 'Medence')?></div>
                                <div class="col-8"><?= $item->property->pool_type_name ?></div>
                            </div>
                        <?php endif;?>
                        <?php
                        if(!empty($item->property->heat_type)):
                            ?>
                            <div class="row detail-param">
                                <div class="col-4 param-title"><?=__d('start', 'Fűtés')?></div>
                                <div class="col-8"><?= $item->property->heat_type_name ?></div>
                            </div>
                        <?php endif;?>
                    </div>
                    <div class="col-12 col-lg-6">
                        <?php
                        $terraceType = (int)$item->property->terrace;
                        $yesNo = function ($value) {
                            return $value ? __d('start', 'Igen') : __d('start', 'Nem');
                        };
                        $hasNot = function ($value) {
                            return $value ? __d('start', 'Van') : __d('start', 'Nincs');
                        };
                        $featureRows = [
                            [__d('start', 'Újépítésű'), $yesNo(!empty($item->property->newlybuilt))],
                            [__d('start', 'Légkondicionáló'), $hasNot(!empty($item->property->aircondition))],
                            [__d('start', 'Kertkapcsolatos'), $yesNo(!empty($item->property->gardencontact))],
                            [__d('start', 'Lift'), $hasNot(!empty($item->property->elevator))],
                            [__d('start', 'Rövidtávra is'), $yesNo(!empty($item->shortterm))],
                            [__d('start', 'Terasz'), $hasNot($terraceType === 3)],
                            [__d('start', 'Erkély'), $hasNot($terraceType === 2)],
                            [__d('start', 'Loggia'), $hasNot($terraceType === 1)],
                            [__d('start', 'Földszinti'), $yesNo(!empty($item->property->lowerlevel))],
                        ];
                        foreach ($featureRows as $featureRow):
                            ?>
                            <div class="row detail-param">
                                <div class="col-8 param-title"><?= $featureRow[0] ?></div>
                                <div class="col-4"><?= $featureRow[1] ?></div>
                            </div>
                        <?php endforeach; ?>
                    </div>


                </div>
            </div>
            <div class="col-12 col-lg-4 mt-4 mt-lg-0">
                <a href="https://starthomebudapest.hu/<?=$this->request->query('lng')??'hu'?>/<?=$this->request->query('lng') == 'en'? 'properties': 'ingatlanok'?>/property/data/<?=$item->id?>?agent=<?=$item->owner->user->id?>" target="<?=$isMobile?'':'_blank'?>" class="show-details">
                    <?php
                    if($this->request->query('lng') == 'en'){
                        echo 'Please  click for more photos!';
                    }else{
                        echo 'Kattintson ide a további képekért!';
                    }
                    ?>
                </a>
                <div class="agent text-center">
                    <div class="avatar">
                        <?= $this->Html->image($item->owner->user->avatar_mini) ?>
                    </div>
                    <div class="name">
                        <?= $item->owner->user->fullname ?>
                    </div>
                    <?=$this->Html->link( $item->owner->user->email, 'mailto:'.$item->owner->user->email) ?>
                    <?= $this->Html->link($item->owner->user->phone, 'tel:'.str_replace([' ', '/', '-'],'', $item->owner->user->phone)) ?>
                </div>
                <div class=" price mt-2 mt-lg-5">
                    <?php

                    if ($item->type == 1) {
                        echo $this->Html->tag('b', __d('start', 'Bérleti díj: {0}', $item->price_formatted));
                    } else {
                        echo $this->Html->tag('b', __d('start', 'Ingatlan ára: {0}', $item->price_formatted));
                    }

                    ?>
                </div>
            </div>
        </div>
    </div>
    <?php

}
?>