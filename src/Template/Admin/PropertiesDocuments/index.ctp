<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New Properties Document'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="propertiesDocuments index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('property_id') ?></th>
            <th><?= $this->Paginator->sort('title') ?></th>
            <th><?= $this->Paginator->sort('file') ?></th>
            <th><?= $this->Paginator->sort('originalname') ?></th>
            <th><?= $this->Paginator->sort('filetype') ?></th>
            <th><?= $this->Paginator->sort('hash') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($propertiesDocuments as $propertiesDocument): ?>
        <tr>
            <td><?= $this->Number->format($propertiesDocument->id) ?></td>
            <td>
                <?= $propertiesDocument->has('property') ? $this->Html->link($propertiesDocument->property->id, ['controller' => 'Properties', 'action' => 'view', $propertiesDocument->property->id]) : '' ?>
            </td>
            <td><?= h($propertiesDocument->title) ?></td>
            <td><?= h($propertiesDocument->file) ?></td>
            <td><?= h($propertiesDocument->originalname) ?></td>
            <td><?= h($propertiesDocument->filetype) ?></td>
            <td><?= h($propertiesDocument->hash) ?></td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $propertiesDocument->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $propertiesDocument->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $propertiesDocument->id], ['confirm' => __('Are you sure you want to delete # {0}?', $propertiesDocument->id)]) ?>
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
