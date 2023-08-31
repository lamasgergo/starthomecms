<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $propertiesDocument->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $propertiesDocument->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Properties Documents'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="propertiesDocuments form large-10 medium-9 columns">
    <?= $this->Form->create($propertiesDocument); ?>
    <fieldset>
        <legend><?= __('Edit Properties Document') ?></legend>
        <?php
            echo $this->Form->input('property_id', ['options' => $properties]);
            echo $this->Form->input('title');
            echo $this->Form->input('file');
            echo $this->Form->input('originalname');
            echo $this->Form->input('filetype');
            echo $this->Form->input('hash');
            echo $this->Form->input('size');
            echo $this->Form->input('active');
            echo $this->Form->input('deleted');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
