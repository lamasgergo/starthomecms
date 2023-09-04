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
                    <div>Tel: +36 1 240 2767</div>
                    <div>Mobile: +36-20/935-0018</div>
                    <div>mail: info@starthomebudapest.hu</div>
                    <div>WEB: starthomebudapest.hu</div>
                </div>
                <div class="col-lg-4 col-xl-7  pb-3 text-end">
                    <div class="ident-holder h-100 pe-3 pt-3">
                        <div class="row h-100">
                            <div class="col-12">
                                <div class="ident"><?= $k + 1 ?>. <strong>ID:<?= $item->id ?> </strong></div>
                            </div>
                            <div class="col-12 align-self-end">
                                <b>
                                    <?= $item->property->address_short_with_streetnum ?>
                                </b>
                                <div><?= $item->property->citypart->citypart ?></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row parameter-holder">
            <div class="col-6 col-lg-2">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">villa</span></div>
                        <div class="col align-self-center"><span
                                    class="title">Size</span><?= $item->property->size_net ?> m2
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">chair</span></div>
                        <div class="col align-self-center"><span
                                    class="title">Livingroom</span><?= $item->property->properties_layout->livingroom ?>
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span class="material-symbols-outlined">bed</span>
                        </div>
                        <div class="col align-self-center"><span
                                    class="title">Room</span><?= $item->property->properties_layout->room ?> <?= $item->property->properties_layout->half_room ? ' + ' . $item->property->properties_layout->half_room : '' ?>
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">bathtub</span></div>
                        <div class="col align-self-center"><span
                                    class="title">Bath</span><?= $item->property->properties_layout->bathroom ?> &nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-4">
                <div class="parameter">
                    <div class="row">
                        <div class="col-auto icon align-self-center"><span
                                    class="material-symbols-outlined">garage</span></div>
                        <div class="col align-self-center"><span
                                    class="title">Parking</span><?= $item->property->parking_type_name ?> &nbsp;
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
                    ['class' => 'fb mainimage', 'rel' => 'gallery', 'escape' => false]
                ); ?>
            </div>
            <div class="col-12 col-lg-4">
                <div class="row">
                    <div class="h-50 col-6 col-lg-12  mt-3 mt-lg-0">
                        <?php
                        if (!empty($item->property->properties_images[1])) {
                            echo
                            $this->Html->link(
                                $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[1]->image_original)]), ['class' => 'w-100']),
                                $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[1]->image_original)]) . '.jpg',
                                ['class' => 'fb smallimage', 'rel' => 'gallery', 'escape' => false]
                            );
                        }
                        ?>
                    </div>
                    <div class="h-50 col-6 col-lg-12 mt-3">
                        <?php
                        if (!empty($item->property->properties_images[2])) {
                            echo
                            $this->Html->link(
                                $this->Html->image($this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[2]->image_original)]), ['class' => 'w-100']),
                                $this->Url->build(['controller' => 'PropertiesImages', 'action' => 'tn', base64_encode($item->property->properties_images[2]->image_original)]) . '.jpg',
                                ['class' => 'fb smallimage', 'rel' => 'gallery', 'escape' => false]
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
                        ['class' => 'fb smallimage', 'rel' => 'gallery', 'escape' => false]
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
                        ['class' => 'fb smallimage', 'rel' => 'gallery', 'escape' => false]
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
                        ['class' => 'fb smallimage', 'rel' => 'gallery', 'escape' => false]
                    );
                }
                ?>

            </div>

        </div>
        <div class="row description-holder mt-3">
            <div class="col-12 col-lg-8">
                <h4>Description</h4>
                <?= $item->description_en ?>
                <hr>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="row detail-param">
                            <div class="col-4 param-title">Type of property</div>
                            <div class="col-8">??</div>
                        </div>
                        <div class="row detail-param">
                            <div class="col-4 param-title">Type of building</div>
                            <div class="col-8"><?= $item->property->building_type_name ?></div>
                        </div>
                        <div class="row detail-param">
                            <div class="col-4 param-title">Kitchen</div>
                            <div class="col-8">??</div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="row detail-param">
                            <div class="col-4 param-title">Furniture</div>
                            <div class="col-8"><?= $item->property->furniture_type_name ?></div>
                        </div>
                        <div class="row detail-param">
                            <div class="col-4 param-title">Panorama</div>
                            <div class="col-8"><?= $item->property->panorama_type_name ?></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4">
                <div class="agent text-center">
                    <div class="name">
                        <?= $item->owner->user->fullname ?>

                    </div>
                    <?= $item->owner->user->email ?>
                </div>
            </div>
        </div>
    </div>
    <?php

}
?>