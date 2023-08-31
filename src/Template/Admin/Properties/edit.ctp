<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $property->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $property->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Properties'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Cities'), ['controller' => 'Cities', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New City'), ['controller' => 'Cities', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Districts'), ['controller' => 'Districts', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New District'), ['controller' => 'Districts', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Streets'), ['controller' => 'Streets', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Street'), ['controller' => 'Streets', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Cityparts'), ['controller' => 'Cityparts', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Citypart'), ['controller' => 'Cityparts', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Contacts'), ['controller' => 'Contacts', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Contact'), ['controller' => 'Contacts', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="properties form large-10 medium-9 columns">
    <?= $this->Form->create($property); ?>
    <fieldset>
        <legend><?= __('Edit Property') ?></legend>
        <?php
            echo $this->Form->input('sell');
            echo $this->Form->input('rent');
            echo $this->Form->input('city_id', ['options' => $cities]);
            echo $this->Form->input('district_id', ['options' => $districts, 'empty' => true]);
            echo $this->Form->input('street_id', ['options' => $streets]);
            echo $this->Form->input('citypart_id', ['options' => $cityparts, 'empty' => true]);
            echo $this->Form->input('user_id');
            echo $this->Form->input('streetnum');
            echo $this->Form->input('street_hidden');
            echo $this->Form->input('building');
            echo $this->Form->input('building_park');
            echo $this->Form->input('floor');
            echo $this->Form->input('door');
            echo $this->Form->input('address_note');
            echo $this->Form->input('zip');
            echo $this->Form->input('localident');
            echo $this->Form->input('building_type');
            echo $this->Form->input('size_net');
            echo $this->Form->input('size_gross');
            echo $this->Form->input('heat_type');
            echo $this->Form->input('note');
            echo $this->Form->input('propertiescol');
            echo $this->Form->input('cooffice');
            echo $this->Form->input('upperlevel');
            echo $this->Form->input('atticlevel');
            echo $this->Form->input('newlybuilt');
            echo $this->Form->input('elevator');
            echo $this->Form->input('gardencontact');
            echo $this->Form->input('petallowed');
            echo $this->Form->input('outlook');
            echo $this->Form->input('terrace');
            echo $this->Form->input('energy_rating');
            echo $this->Form->input('lotsize');
            echo $this->Form->input('builddate', array('empty' => true, 'default' => ''));
            echo $this->Form->input('building_levels');
            echo $this->Form->input('rate');
            echo $this->Form->input('pool');
            echo $this->Form->input('conveniences');
            echo $this->Form->input('condition');
            echo $this->Form->input('parking');
            echo $this->Form->input('active');
            echo $this->Form->input('deleted');
            echo $this->Form->input('users._ids', ['options' => $users]);
            echo $this->Form->input('contacts._ids', ['options' => $contacts]);
            echo $this->Form->input('rent.price');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
