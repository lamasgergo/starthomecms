<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Role'), ['action' => 'edit', $data->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Role'), ['action' => 'delete', $data->id], ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Roles'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Role'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="roles view large-10 medium-9 columns">
    <h2><?= h($data->name) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Name') ?></h6>
            <p><?= h($data->name) ?></p>
            <h6 class="subheader"><?= __('Login Redirect') ?></h6>
            <p><?= h($data->login_redirect) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($data->id) ?></p>
        </div>
        <div class="large-2 columns dates end">
            <h6 class="subheader"><?= __('Created') ?></h6>
            <p><?= h($data->created) ?></p>
            <h6 class="subheader"><?= __('Modified') ?></h6>
            <p><?= h($data->modified) ?></p>
        </div>
    </div>
</div>
<div class="related row">
    <div class="column large-12">
    <h4 class="subheader"><?= __('Related Users') ?></h4>
    <?php if (!empty($data->users)): ?>
    <table cellpadding="0" cellspacing="0">
        <tr>
            <th><?= __('Id') ?></th>
            <th><?= __('Role Id') ?></th>
            <th><?= __('Email') ?></th>
            <th><?= __('Activation Key') ?></th>
            <th><?= __('Password') ?></th>
            <th><?= __('Lastname') ?></th>
            <th><?= __('Firstname') ?></th>
            <th><?= __('Picture') ?></th>
            <th><?= __('Active') ?></th>
            <th><?= __('Deleted') ?></th>
            <th><?= __('Deleted Date') ?></th>
            <th><?= __('Created') ?></th>
            <th><?= __('Modified') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
        <?php foreach ($data->users as $users): ?>
        <tr>
            <td><?= h($users->id) ?></td>
            <td><?= h($users->role_id) ?></td>
            <td><?= h($users->email) ?></td>
            <td><?= h($users->activation_key) ?></td>
            <td><?= h($users->password) ?></td>
            <td><?= h($users->lastname) ?></td>
            <td><?= h($users->firstname) ?></td>
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
