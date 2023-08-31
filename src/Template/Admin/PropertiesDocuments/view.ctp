<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Properties Document'), ['action' => 'edit', $propertiesDocument->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Properties Document'), ['action' => 'delete', $propertiesDocument->id], ['confirm' => __('Are you sure you want to delete # {0}?', $propertiesDocument->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Properties Documents'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Properties Document'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="propertiesDocuments view large-10 medium-9 columns">
    <h2><?= h($propertiesDocument->originalname) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Property') ?></h6>
            <p><?= $propertiesDocument->has('property') ? $this->Html->link($propertiesDocument->property->id, ['controller' => 'Properties', 'action' => 'view', $propertiesDocument->property->id]) : '' ?></p>
            <h6 class="subheader"><?= __('Title') ?></h6>
            <p><?= h($propertiesDocument->title) ?></p>
            <h6 class="subheader"><?= __('File') ?></h6>
            <p><?= h($propertiesDocument->file) ?></p>
            <h6 class="subheader"><?= __('Originalname') ?></h6>
            <p><?= h($propertiesDocument->originalname) ?></p>
            <h6 class="subheader"><?= __('Filetype') ?></h6>
            <p><?= h($propertiesDocument->filetype) ?></p>
            <h6 class="subheader"><?= __('Hash') ?></h6>
            <p><?= h($propertiesDocument->hash) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($propertiesDocument->id) ?></p>
            <h6 class="subheader"><?= __('Size') ?></h6>
            <p><?= $this->Number->format($propertiesDocument->size) ?></p>
            <h6 class="subheader"><?= __('Active') ?></h6>
            <p><?= $this->Number->format($propertiesDocument->active) ?></p>
        </div>
        <div class="large-2 columns dates end">
            <h6 class="subheader"><?= __('Deleted') ?></h6>
            <p><?= h($propertiesDocument->deleted) ?></p>
            <h6 class="subheader"><?= __('Created') ?></h6>
            <p><?= h($propertiesDocument->created) ?></p>
            <h6 class="subheader"><?= __('Modified') ?></h6>
            <p><?= h($propertiesDocument->modified) ?></p>
        </div>
    </div>
</div>
