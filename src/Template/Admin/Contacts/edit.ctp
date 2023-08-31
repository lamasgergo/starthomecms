<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $data->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Contacts'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Companies'), ['controller' => 'Companies', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Company'), ['controller' => 'Companies', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="contacts form large-10 medium-9 columns">
    <?= $this->Form->create($data) ?>
    <fieldset>
        <legend><?= __('Edit Contact') ?></legend>
        <?php
            echo $this->Form->input('company_id', ['options' => $companies, 'empty' => true]);
            echo $this->Form->input('property_id',['type'=>'text']);
            echo $this->Form->input('properties_variation_ids',['type'=>'text']);
            echo $this->Form->input('prename');
            echo $this->Form->input('lastname');
            echo $this->Form->input('firstname');
            echo $this->Form->input('phone1type');
            echo $this->Form->input('phone1');
            /*
            echo $this->Form->input('phone1note');
            echo $this->Form->input('phone2type');
            echo $this->Form->input('phone2');
            echo $this->Form->input('phone2note');
            echo $this->Form->input('phone3type');
            echo $this->Form->input('phone3');
            echo $this->Form->input('phone3note');
            echo $this->Form->input('phone4type');
            echo $this->Form->input('phone4');
            echo $this->Form->input('phone4note');
            echo $this->Form->input('email1');
            echo $this->Form->input('email2');
            echo $this->Form->input('title');
            echo $this->Form->input('job');
            echo $this->Form->input('marial_status');
            echo $this->Form->input('kids');
            echo $this->Form->input('nationality');
            echo $this->Form->input('pet');
            echo $this->Form->input('note');
            echo $this->Form->input('billing_name');
            echo $this->Form->input('billing_zip');
            echo $this->Form->input('billing_city');
            echo $this->Form->input('billing_street');
            echo $this->Form->input('billing_taxnumber');
            echo $this->Form->input('postal_name');
            echo $this->Form->input('postal_zip');
            echo $this->Form->input('postal_city');
            echo $this->Form->input('postal_street');
            echo $this->Form->input('internal_company_id', ['options' => $internalCompany, 'empty' => true]);
            echo $this->Form->input('internal_agent');
            echo $this->Form->input('user_id');
            echo $this->Form->input('active');
            echo $this->Form->input('deleted');
            echo $this->Form->input('users._ids', ['options' => $users]);
            echo $this->Form->input('properties._ids', ['options' => $properties]);
            */
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
