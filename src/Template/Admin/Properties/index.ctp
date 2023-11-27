<div class="card">
    <div class="card-header">
        <h2>Ingatlanok
        </h2>
    </div>

    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
            <?php
            /** @var bool $isMobile */
            if($isMobile):
            ?>
            <tr>
                <th>Kép</th>
                <th><?= $this->Paginator->sort('id', 'Sorszám') ?> / Utca</th>
            </tr>
            <?php
            else:
            ?>
                <tr>
                    <th>Kép</th>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th>Utca</th>
                    <th>Ár</th>
                    <th>Méret</th>
                    <th>Szoba</th>
                    <th class="actions"><?= __('Adatlap') ?></th>
                </tr>
            <?php
            endif;
            ?>
            </thead>
            <tbody>
            <?php foreach ($datas as $property): ?>
            <?php
            if($isMobile):
            ?>
                <tr>
                    <td>
                        <?= ($property->has('mainimage')?$this->Html->image(str_replace('\\','/',$property->mainimage->image_mini), ['width' => 90, 'style' => 'margin-bottom:5px;']):null) ?>
                        <span style="font-size: 12px;"><?= $property->properties_variation->price_formatted ?></span>
                    </td>
                    <td>

                        <?= $this->Html->link( $this->Html->tag('b',$this->Number->format($property->properties_variation->id)).' - '. $property->address, ['action' => 'view', 'id' => $property->id], ['escape' => false]) ?><br>
                        Tul: <?= $property->owner_name ?> (<?= $property->owner_phone ?>)
                    </td>
                </tr>
            <?php
            else:
            ?>
                <tr>
                    <td><?= $this->Number->format($property->properties_variation->id) ?></td>
                    <td><?= ($property->has('mainimage')?$this->Html->image(str_replace('\\','/',$property->mainimage->image_mini)):null) ?></td>
                    <td>
                        <?= $this->Html->link($property->address, ['action' => 'view', 'id' => $property->id]) ?><br>
                        Tul: <?= $property->owner_name ?> (<?= $property->owner_phone ?>)

                    </td>
                    <td>
                        <?= $property->properties_variation->price_formatted ?><br>
                        <?php
                        if($property->properties_variation->price_dev =='EUR'){
                            echo $property->properties_variation->price_huf_formatted;
                        }elseif ($property->properties_variation->price_dev =='USD'){
                            echo $property->properties_variation->price_huf_formatted;
                        }else{
                            echo $property->properties_variation->price_eur_formatted;
                        }

                        ?>
                    </td>
                    <td><?= $property->size_net ?></td>
                    <td><?= (!empty($property->properties_layout)?$property->properties_layout->room:null )?></td>
                    <td class="actions">
                        <?= $this->Html->link('<i class="fa fa-eye"></i>', ['action' => 'view', $property->id], ['escape' => false, 'class' => 'btn btn-primary btn-lg waves-effect']) ?>
                    </td>
                </tr>
            <?php
            endif;
                ?>
            <?php endforeach; ?>
            </tbody>
        </table>
        <div class="paginator text-center">
            <ul class="pagination">
                <?= $this->Paginator->prev('< ') ?>
                <?= $this->Paginator->numbers(['modulus ' => 2]) ?>
                <?= $this->Paginator->next(' >') ?>
            </ul>
        </div>
    </div>
</div>
