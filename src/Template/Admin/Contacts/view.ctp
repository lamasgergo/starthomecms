<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Contact'), ['action' => 'edit', $contact->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Contact'), ['action' => 'delete', $contact->id], ['confirm' => __('Are you sure you want to delete # {0}?', $contact->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Contacts'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Contact'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Companies'), ['controller' => 'Companies', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Company'), ['controller' => 'Companies', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Properties'), ['controller' => 'Properties', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Property'), ['controller' => 'Properties', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="contacts view large-10 medium-9 columns">
    <h2><?= h($contact->title) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Company') ?></h6>
            <p><?= $contact->has('company') ? $this->Html->link($contact->company->name, ['controller' => 'Companies', 'action' => 'view', $contact->company->id]) : '' ?></p>
            <h6 class="subheader"><?= __('Prename') ?></h6>
            <p><?= h($contact->prename) ?></p>
            <h6 class="subheader"><?= __('Lastname') ?></h6>
            <p><?= h($contact->lastname) ?></p>
            <h6 class="subheader"><?= __('Firstname') ?></h6>
            <p><?= h($contact->firstname) ?></p>
            <h6 class="subheader"><?= __('Phone1') ?></h6>
            <p><?= h($contact->phone1) ?></p>
            <h6 class="subheader"><?= __('Phone2') ?></h6>
            <p><?= h($contact->phone2) ?></p>
            <h6 class="subheader"><?= __('Phone3') ?></h6>
            <p><?= h($contact->phone3) ?></p>
            <h6 class="subheader"><?= __('Phone4') ?></h6>
            <p><?= h($contact->phone4) ?></p>
            <h6 class="subheader"><?= __('Email1') ?></h6>
            <p><?= h($contact->email1) ?></p>
            <h6 class="subheader"><?= __('Email2') ?></h6>
            <p><?= h($contact->email2) ?></p>
            <h6 class="subheader"><?= __('Title') ?></h6>
            <p><?= h($contact->title) ?></p>
            <h6 class="subheader"><?= __('Job') ?></h6>
            <p><?= h($contact->job) ?></p>
            <h6 class="subheader"><?= __('Marial Status') ?></h6>
            <p><?= h($contact->marial_status) ?></p>
            <h6 class="subheader"><?= __('Billing Name') ?></h6>
            <p><?= h($contact->billing_name) ?></p>
            <h6 class="subheader"><?= __('Billing Zip') ?></h6>
            <p><?= h($contact->billing_zip) ?></p>
            <h6 class="subheader"><?= __('Billing City') ?></h6>
            <p><?= h($contact->billing_city) ?></p>
            <h6 class="subheader"><?= __('Billing Street') ?></h6>
            <p><?= h($contact->billing_street) ?></p>
            <h6 class="subheader"><?= __('Billing Taxnumber') ?></h6>
            <p><?= h($contact->billing_taxnumber) ?></p>
            <h6 class="subheader"><?= __('Postal Name') ?></h6>
            <p><?= h($contact->postal_name) ?></p>
            <h6 class="subheader"><?= __('Postal Zip') ?></h6>
            <p><?= h($contact->postal_zip) ?></p>
            <h6 class="subheader"><?= __('Postal City') ?></h6>
            <p><?= h($contact->postal_city) ?></p>
            <h6 class="subheader"><?= __('Postal Street') ?></h6>
            <p><?= h($contact->postal_street) ?></p>
            <h6 class="subheader"><?= __('Internal Company') ?></h6>
            <p><?= $contact->has('internal_company') ? $this->Html->link($contact->internal_company->name, ['controller' => 'Companies', 'action' => 'view', $contact->internal_company->id]) : '' ?></p>
            <h6 class="subheader"><?= __('Internal Agent') ?></h6>
            <p><?= h($contact->internal_agent) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($contact->id) ?></p>
            <h6 class="subheader"><?= __('Phone1type') ?></h6>
            <p><?= $this->Number->format($contact->phone1type) ?></p>
            <h6 class="subheader"><?= __('Phone2type') ?></h6>
            <p><?= $this->Number->format($contact->phone2type) ?></p>
            <h6 class="subheader"><?= __('Phone3type') ?></h6>
            <p><?= $this->Number->format($contact->phone3type) ?></p>
            <h6 class="subheader"><?= __('Phone4type') ?></h6>
            <p><?= $this->Number->format($contact->phone4type) ?></p>
            <h6 class="subheader"><?= __('Kids') ?></h6>
            <p><?= $this->Number->format($contact->kids) ?></p>
            <h6 class="subheader"><?= __('Nationality') ?></h6>
            <p><?= $this->Number->format($contact->nationality) ?></p>
            <h6 class="subheader"><?= __('Pet') ?></h6>
            <p><?= $this->Number->format($contact->pet) ?></p>
            <h6 class="subheader"><?= __('User Id') ?></h6>
            <p><?= $this->Number->format($contact->user_id) ?></p>
            <h6 class="subheader"><?= __('Active') ?></h6>
            <p><?= $this->Number->format($contact->active) ?></p>
        </div>
        <div class="large-2 columns dates end">
            <h6 class="subheader"><?= __('Deleted') ?></h6>
            <p><?= h($contact->deleted) ?></p>
            <h6 class="subheader"><?= __('Created') ?></h6>
            <p><?= h($contact->created) ?></p>
            <h6 class="subheader"><?= __('Modified') ?></h6>
            <p><?= h($contact->modified) ?></p>
        </div>
    </div>
    <div class="row texts">
        <div class="columns large-9">
            <h6 class="subheader"><?= __('Phone1note') ?></h6>
            <?= $this->Text->autoParagraph(h($contact->phone1note)) ?>
        </div>
    </div>
    <div class="row texts">
        <div class="columns large-9">
            <h6 class="subheader"><?= __('Phone2note') ?></h6>
            <?= $this->Text->autoParagraph(h($contact->phone2note)) ?>
        </div>
    </div>
    <div class="row texts">
        <div class="columns large-9">
            <h6 class="subheader"><?= __('Phone3note') ?></h6>
            <?= $this->Text->autoParagraph(h($contact->phone3note)) ?>
        </div>
    </div>
    <div class="row texts">
        <div class="columns large-9">
            <h6 class="subheader"><?= __('Phone4note') ?></h6>
            <?= $this->Text->autoParagraph(h($contact->phone4note)) ?>
        </div>
    </div>
    <div class="row texts">
        <div class="columns large-9">
            <h6 class="subheader"><?= __('Note') ?></h6>
            <?= $this->Text->autoParagraph(h($contact->note)) ?>
        </div>
    </div>
</div>
<div class="related row">
    <div class="column large-12">
    <h4 class="subheader"><?= __('Related Users') ?></h4>
    <?php if (!empty($contact->users)): ?>
    <table cellpadding="0" cellspacing="0">
        <tr>
            <th><?= __('Id') ?></th>
            <th><?= __('Role Id') ?></th>
            <th><?= __('Username') ?></th>
            <th><?= __('Email') ?></th>
            <th><?= __('Activation Key') ?></th>
            <th><?= __('Password') ?></th>
            <th><?= __('Lastname') ?></th>
            <th><?= __('Firstname') ?></th>
            <th><?= __('Hash') ?></th>
            <th><?= __('Picture') ?></th>
            <th><?= __('Active') ?></th>
            <th><?= __('Deleted') ?></th>
            <th><?= __('Deleted Date') ?></th>
            <th><?= __('Created') ?></th>
            <th><?= __('Modified') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
        <?php foreach ($contact->users as $users): ?>
        <tr>
            <td><?= h($users->id) ?></td>
            <td><?= h($users->role_id) ?></td>
            <td><?= h($users->username) ?></td>
            <td><?= h($users->email) ?></td>
            <td><?= h($users->activation_key) ?></td>
            <td><?= h($users->password) ?></td>
            <td><?= h($users->lastname) ?></td>
            <td><?= h($users->firstname) ?></td>
            <td><?= h($users->hash) ?></td>
            <td><?= h($users->picture) ?></td>
            <td><?= h($users->active) ?></td>
            <td><?= h($users->deleted) ?></td>
            <td><?= h($users->deleted_date) ?></td>
            <td><?= h($users->created) ?></td>
            <td><?= h($users->modified) ?></td>

            <td class="actions">
                <?= $this->Html->link(__('View'), ['controller' => 'Users', 'action' => 'view', $users->id]) ?>

                <?= $this->Html->link(__('Edit'), ['controller' => 'Users', 'action' => 'edit', $users->id]) ?>

                <?= $this->Form->postLink(__('Delete'), ['controller' => 'Users', 'action' => 'delete', $users->id], ['confirm' => __('Are you sure you want to delete # {0}?', $users->id)]) ?>

            </td>
        </tr>

        <?php endforeach; ?>
    </table>
    <?php endif; ?>
    </div>
</div>
<div class="related row">
    <div class="column large-12">
    <h4 class="subheader"><?= __('Related Properties') ?></h4>
    <?php if (!empty($contact->properties)): ?>
    <table cellpadding="0" cellspacing="0">
        <tr>
            <th><?= __('Id') ?></th>
            <th><?= __('Sell') ?></th>
            <th><?= __('Rent') ?></th>
            <th><?= __('City Id') ?></th>
            <th><?= __('District Id') ?></th>
            <th><?= __('Street Id') ?></th>
            <th><?= __('Citypart Id') ?></th>
            <th><?= __('User Id') ?></th>
            <th><?= __('Streetnum') ?></th>
            <th><?= __('Street Hidden') ?></th>
            <th><?= __('Building') ?></th>
            <th><?= __('Building Park') ?></th>
            <th><?= __('Floor') ?></th>
            <th><?= __('Door') ?></th>
            <th><?= __('Address Note') ?></th>
            <th><?= __('Zip') ?></th>
            <th><?= __('Localident') ?></th>
            <th><?= __('Building Type') ?></th>
            <th><?= __('Size Net') ?></th>
            <th><?= __('Size Gross') ?></th>
            <th><?= __('Heat Type') ?></th>
            <th><?= __('Note') ?></th>
            <th><?= __('Propertiescol') ?></th>
            <th><?= __('Cooffice') ?></th>
            <th><?= __('Upperlevel') ?></th>
            <th><?= __('Lowerlevel') ?></th>
            <th><?= __('Atticlevel') ?></th>
            <th><?= __('Newlybuilt') ?></th>
            <th><?= __('Elevator') ?></th>
            <th><?= __('Gardencontact') ?></th>
            <th><?= __('Petallowed') ?></th>
            <th><?= __('Outlook') ?></th>
            <th><?= __('Terrace') ?></th>
            <th><?= __('Energy Rating') ?></th>
            <th><?= __('Lotsize') ?></th>
            <th><?= __('Builddate') ?></th>
            <th><?= __('Building Levels') ?></th>
            <th><?= __('Rate') ?></th>
            <th><?= __('Pool') ?></th>
            <th><?= __('Conveniences') ?></th>
            <th><?= __('Building Condition') ?></th>
            <th><?= __('Parking') ?></th>
            <th><?= __('Active') ?></th>
            <th><?= __('Deleted') ?></th>
            <th><?= __('Created') ?></th>
            <th><?= __('Modified') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
        <?php foreach ($contact->properties as $properties): ?>
        <tr>
            <td><?= h($properties->id) ?></td>
            <td><?= h($properties->sell) ?></td>
            <td><?= h($properties->rent) ?></td>
            <td><?= h($properties->city_id) ?></td>
            <td><?= h($properties->district_id) ?></td>
            <td><?= h($properties->street_id) ?></td>
            <td><?= h($properties->citypart_id) ?></td>
            <td><?= h($properties->user_id) ?></td>
            <td><?= h($properties->streetnum) ?></td>
            <td><?= h($properties->street_hidden) ?></td>
            <td><?= h($properties->building) ?></td>
            <td><?= h($properties->building_park) ?></td>
            <td><?= h($properties->floor) ?></td>
            <td><?= h($properties->door) ?></td>
            <td><?= h($properties->address_note) ?></td>
            <td><?= h($properties->zip) ?></td>
            <td><?= h($properties->localident) ?></td>
            <td><?= h($properties->building_type) ?></td>
            <td><?= h($properties->size_net) ?></td>
            <td><?= h($properties->size_gross) ?></td>
            <td><?= h($properties->heat_type) ?></td>
            <td><?= h($properties->note) ?></td>
            <td><?= h($properties->propertiescol) ?></td>
            <td><?= h($properties->cooffice) ?></td>
            <td><?= h($properties->upperlevel) ?></td>
            <td><?= h($properties->lowerlevel) ?></td>
            <td><?= h($properties->atticlevel) ?></td>
            <td><?= h($properties->newlybuilt) ?></td>
            <td><?= h($properties->elevator) ?></td>
            <td><?= h($properties->gardencontact) ?></td>
            <td><?= h($properties->petallowed) ?></td>
            <td><?= h($properties->outlook) ?></td>
            <td><?= h($properties->terrace) ?></td>
            <td><?= h($properties->energy_rating) ?></td>
            <td><?= h($properties->lotsize) ?></td>
            <td><?= h($properties->builddate) ?></td>
            <td><?= h($properties->building_levels) ?></td>
            <td><?= h($properties->rate) ?></td>
            <td><?= h($properties->pool) ?></td>
            <td><?= h($properties->conveniences) ?></td>
            <td><?= h($properties->building_condition) ?></td>
            <td><?= h($properties->parking) ?></td>
            <td><?= h($properties->active) ?></td>
            <td><?= h($properties->deleted) ?></td>
            <td><?= h($properties->created) ?></td>
            <td><?= h($properties->modified) ?></td>

            <td class="actions">
                <?= $this->Html->link(__('View'), ['controller' => 'Properties', 'action' => 'view', $properties->id]) ?>

                <?= $this->Html->link(__('Edit'), ['controller' => 'Properties', 'action' => 'edit', $properties->id]) ?>

                <?= $this->Form->postLink(__('Delete'), ['controller' => 'Properties', 'action' => 'delete', $properties->id], ['confirm' => __('Are you sure you want to delete # {0}?', $properties->id)]) ?>

            </td>
        </tr>

        <?php endforeach; ?>
    </table>
    <?php endif; ?>
    </div>
</div>
