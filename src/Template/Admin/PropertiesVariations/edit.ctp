<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $propertiesVariation->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $propertiesVariation->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Properties Variations'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="propertiesVariations form large-10 medium-9 columns">
    <?= $this->Form->create($propertiesVariation); ?>
    <fieldset>
        <legend><?= __('Edit Properties Variation') ?></legend>
        <?php
            echo $this->Form->input('property_id', ['options' => $properties]);
            echo $this->Form->input('description');
            echo $this->Form->input('type');
            echo $this->Form->input('price');
            echo $this->Form->input('price_dev');
            echo $this->Form->input('common_cost');
            echo $this->Form->input('common_cost_dev');
            echo $this->Form->input('caution_type');
            echo $this->Form->input('furniture_type');
            echo $this->Form->input('comission');
            echo $this->Form->input('shortterm');
            echo $this->Form->input('enddate', array('empty' => true, 'default' => ''));
            echo $this->Form->input('offer');
            echo $this->Form->input('ing_com');
            echo $this->Form->input('gdn');
            echo $this->Form->input('active');
            echo $this->Form->input('deleted');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
