<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('List Properties Documents'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="propertiesDocuments form large-10 medium-9 columns">
    <?= $this->Form->create($data, ['type' => 'file']); ?>
    <fieldset>
        <legend><?= __('Add Properties Document') ?></legend>
        <?php
            echo $this->Form->input('property_id', ['options' => $properties]);
            echo $this->Form->input('title');
            echo $this->Form->input('documents[]', array('type'=>'file'));

        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
