<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Properties Variation'), ['action' => 'edit', $propertiesVariation->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Properties Variation'), ['action' => 'delete', $propertiesVariation->id], ['confirm' => __('Are you sure you want to delete # {0}?', $propertiesVariation->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Properties Variations'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Properties Variation'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="propertiesVariations view large-10 medium-9 columns">
    <h2><?= h($propertiesVariation->id) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Property') ?></h6>
            <p><?= $propertiesVariation->has('property') ? $this->Html->link($propertiesVariation->property->id, ['controller' => 'Properties', 'action' => 'view', $propertiesVariation->property->id]) : '' ?></p>
            <h6 class="subheader"><?= __('Price Dev') ?></h6>
            <p><?= h($propertiesVariation->price_dev) ?></p>
            <h6 class="subheader"><?= __('Common Cost Dev') ?></h6>
            <p><?= h($propertiesVariation->common_cost_dev) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->id) ?></p>
            <h6 class="subheader"><?= __('Type') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->type) ?></p>
            <h6 class="subheader"><?= __('Price') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->price) ?></p>
            <h6 class="subheader"><?= __('Common Cost') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->common_cost) ?></p>
            <h6 class="subheader"><?= __('Caution Type') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->caution_type) ?></p>
            <h6 class="subheader"><?= __('Furniture Type') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->furniture_type) ?></p>
            <h6 class="subheader"><?= __('Comission') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->comission) ?></p>
            <h6 class="subheader"><?= __('Shortterm') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->shortterm) ?></p>
            <h6 class="subheader"><?= __('Offer') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->offer) ?></p>
            <h6 class="subheader"><?= __('Ing Com') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->ing_com) ?></p>
            <h6 class="subheader"><?= __('Gdn') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->gdn) ?></p>
            <h6 class="subheader"><?= __('Active') ?></h6>
            <p><?= $this->Number->format($propertiesVariation->active) ?></p>
        </div>
        <div class="large-2 columns dates end">
            <h6 class="subheader"><?= __('Enddate') ?></h6>
            <p><?= h($propertiesVariation->enddate) ?></p>
            <h6 class="subheader"><?= __('Deleted') ?></h6>
            <p><?= h($propertiesVariation->deleted) ?></p>
            <h6 class="subheader"><?= __('Created') ?></h6>
            <p><?= h($propertiesVariation->created) ?></p>
            <h6 class="subheader"><?= __('Modified') ?></h6>
            <p><?= h($propertiesVariation->modified) ?></p>
        </div>
    </div>
    <div class="row texts">
        <div class="columns large-9">
            <h6 class="subheader"><?= __('Description') ?></h6>
            <?= $this->Text->autoParagraph(h($propertiesVariation->description)); ?>

        </div>
    </div>
</div>
