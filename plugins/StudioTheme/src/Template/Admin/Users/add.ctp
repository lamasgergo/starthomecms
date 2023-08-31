<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('List Users'), ['action' => 'index']) ?></li>
    </ul>
</div>
<div class="users form large-10 medium-9 columns">
    <?= $this->Form->create($data); ?>
    <fieldset>
        <legend><?= __('Add User') ?></legend>
        <?php
            
            echo $this->Form->input('username');
            echo $this->Form->input('password'); 
            echo $this->Form->input('active');
            echo $this->Form->input('role_id', ['options' => $roles]);
            
            
            echo $this->Form->input('email');
            echo $this->Form->input('lastname');
            echo $this->Form->input('firstname');
            echo $this->Form->input('picture');
            
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
