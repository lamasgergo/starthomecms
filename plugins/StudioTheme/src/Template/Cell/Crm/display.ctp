<?php
echo $view->Form->create(null,['url' => ['controller' => 'Properties', 'action' => 'index']]);
echo $view->Form->input('ident', ['label' => false, 'placeholder' => 'Sorszámok']);

?>

    <div class="col-xs-6">
        <?= $view->Form->input('type[1]', ['value' => 1, 'hiddenField' => false, 'label' => 'Kiadó', 'type' => 'checkbox' , 'checked' => (!empty($this->request->data['type'][1]))]);?>
    </div>
    <div class="col-xs-6">
        <?=$view->Form->input('type[2]', ['value' => 2, 'hiddenField' => false,'label' => 'Eladó', 'type' => 'checkbox', 'checked' => (!empty($this->request->data['type'][2]))]);?>
    </div>
    <div class="col-xs-12">
        <?=$view->Form->input('district_id', [ 'class'=> 'selectpicker', 'label' => false, 'options' => $districts, 'title' => 'Válasszon kerületet', 'multiple' => true]);?>
    </div>
    <div class="col-xs-12">
        <?=$view->Form->input('street', ['label' => false, 'placeholder' => 'Utca']);?>
    </div>
    <div class="col-xs-6">
        <?=$view->Form->input('streetnum_from', ['label' => false, 'placeholder' => 'Hsz-tól']);?>
    </div>
    <div class="col-xs-6">
        <?=$view->Form->input('streetnum_to', ['label' => false, 'placeholder' => 'Hsz-ig']);?>
    </div>
    <div class="col-xs-12">
        <?=$view->Form->input('contact_name', ['label' => false, 'placeholder' => 'Tulajdonos neve']);?>
    </div>
    <div class="col-xs-12">
        <?=$view->Form->input('contact_phone', ['label' => false, 'placeholder' => 'Tulajdonos telefonszáma']);?>
    </div>
    <div class="col-xs-4">
        <?=$view->Form->input('price_from', ['label' => false, 'placeholder' => 'Ár-tól']);?>
    </div>
    <div class="col-xs-4">
        <?=$view->Form->input('price_to', ['label' => false, 'placeholder' => 'ig']);?>
    </div>
    <div class="col-xs-4">
        <?=$view->Form->input('price_type', ['label' => false, 'options' => \Cake\Core\Configure::read('Static.price_type'), 'default' => '2']);?>
    </div>
    <div class="col-xs-12">
        <?=$view->Form->input('building_type', ['class'=> 'selectpicker',  'label' => false, 'options' => \Cake\Core\Configure::read('Static.building_type'), 'title' => 'Válasszon típust', 'multiple' => true]);?>
    </div>
    <div class="col-xs-6">
        <?=$view->Form->input('size_net_from', ['label' => false, 'placeholder' => 'm2-tól']);?>
    </div>
    <div class="col-xs-6">
        <?=$view->Form->input('size_net_to', ['label' => false, 'placeholder' => 'm2-ig']);?>
    </div>
    <div class="col-xs-6">
        <?=$view->Form->input('bedroom_from', ['label' => false, 'placeholder' => 'Hálók-tól']);?>
    </div>
    <div class="col-xs-6">
        <?=$view->Form->input('bedroom_to', ['label' => false, 'placeholder' => '-ig']);?>
    </div>
    <div class="col-xs-12 text-center">
        <?php
        echo $view->Form->button('Keres', ['class' => 'btn btn-success']);
        ?>
    </div>
<?php
echo $view->Form->end();