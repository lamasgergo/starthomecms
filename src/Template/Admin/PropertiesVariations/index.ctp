<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New Properties Variation'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="propertiesVariations index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('property_id') ?></th>
            <th><?= $this->Paginator->sort('type') ?></th>
            <th><?= $this->Paginator->sort('price') ?></th>
            <th><?= $this->Paginator->sort('price_dev') ?></th>
            <th><?= $this->Paginator->sort('common_cost') ?></th>
            <th><?= $this->Paginator->sort('common_cost_dev') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($datas as $propertiesVariation): ?>
        <tr>
            <td><?= $this->Number->format($propertiesVariation->id) ?></td>
            <td>
                <?= $propertiesVariation->has('property') ? $this->Html->link($propertiesVariation->property->id, ['controller' => 'Properties', 'action' => 'view', $propertiesVariation->property->id]) : '' ?>
            </td>
            <td><?= $this->Number->format($propertiesVariation->type) ?></td>
            <td><?= $this->Number->format($propertiesVariation->price) ?></td>
            <td><?= h($propertiesVariation->price_dev) ?></td>
            <td><?= $this->Number->format($propertiesVariation->common_cost) ?></td>
            <td><?= h($propertiesVariation->common_cost_dev) ?></td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $propertiesVariation->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $propertiesVariation->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $propertiesVariation->id], ['confirm' => __('Are you sure you want to delete # {0}?', $propertiesVariation->id)]) ?>
            </td>
        </tr>

    <?php endforeach; ?>
    </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
        </ul>
        <p><?= $this->Paginator->counter() ?></p>
    </div>
</div>
