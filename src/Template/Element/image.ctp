<table width="100%">
    <?php
    if(!empty($property->properties_images))
    {

        foreach($property->properties_images as $i=>$oneimage){
            if($i<9) {
                if($i%3 == 0){
                    echo '<tr>';
                }
                echo '<td padding=5>';
                echo $this->Html->image(
                    'https://photo.starthomebudapest.hu/kep/' . base64_encode(str_replace('\\', '/', $oneimage->image_tn)),
                    array('width' => '230', 'style' => 'width:100%!important', 'target' => '_blank',
                        'url' => 'https://photo.starthomebudapest.hu/kepek/' . $property->properties_variation->id));
                echo '</td>';
                if($i+1%3 == 0){
                    echo '</tr>';
                }
            }
        }
    }
    ?>
</table>

