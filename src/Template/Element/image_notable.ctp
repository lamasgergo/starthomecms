
    <?php
    if(!empty($property->properties_images))
    {

        foreach($property->properties_images as $i=>$oneimage){
            if($i<9) {
                echo $this->Html->tag(
                    'div',
                    $this->Html->link($this->Html->image(
                        'http://lakasfoto.hu/kep/' . base64_encode(str_replace('\\', '/', $oneimage->image_tn)),
                        ['width' => '100%', 'style'=> 'margin:2px;']
                    ),
                        'http://lakasfoto.hu/kepek/' . $property->id,
                        [  'escape' => false]

                    ),
                    ['class' => 'imgholder']
                );
            }
        }
    }
    ?>

