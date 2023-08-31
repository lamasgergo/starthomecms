<div class="block-header">
    <h2><?= __('List Roles') ?></h2>
    
    <ul class="actions">
        <li class="dropdown">
            <a href="" data-toggle="dropdown">
                <i class="md md-more-vert"></i>
            </a>
            
            <ul class="dropdown-menu dropdown-menu-right">
                <li>
                    <a href="">Action1</a>
                </li>
            </ul>
        </li>
    </ul>
</div>
<div class="card">
    <div class="card-header">

    </div>
    
    <div class="card-body table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('name') ?></th>
                    <th><?= $this->Paginator->sort('login_redirect') ?></th>
                    <th><?= $this->Paginator->sort('created') ?></th>
                    <th><?= $this->Paginator->sort('modified') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($datas as $onerow): ?>
                
                <tr>
                    <td><?= $this->Number->format($onerow->id) ?></td>
                    <td><?= $this->Html->link(h($onerow->name),['action' => 'edit', $onerow->id]) ?></td>
                    <td><?= h($onerow->login_redirect) ?></td>
                    <td><?= h($onerow->created) ?></td>
                    <td><?= h($onerow->modified) ?></td>
                    <td class="actions">
                        <?= $this->Html->link('<span class="md md-remove-red-eye"></span>', ['action' => 'view', $onerow->id],['class'=>'btn btn-icon command-edit', 'escape'=>false]) ?>
                        <?= $this->Html->link('<span class="md md-edit"></span>', ['action' => 'edit', $onerow->id],['class'=>'btn btn-icon command-edit', 'escape'=>false]) ?>
                        <?= $this->Form->postLink('<span class="md md-delete"></span>', ['action' => 'delete', $onerow->id], ['confirm' => __('Are you sure you want to delete # {0}?', $onerow->id), 'class'=>'btn btn-icon bgm-cyan command-edit', 'escape'=>false]) ?>
                    </td>
                </tr>

            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <div class="card-body card-padding">
            <ul class="pagination">
                <?= $this->Paginator->prev('<i class="md md-chevron-left"></i>',['escape'=>false]) ?>
                <?= $this->Paginator->numbers() ?>
                <?= $this->Paginator->next('<i class="md md-chevron-right"></i>',['escape'=>false]) ?>
            </ul>
            <p class="pull-right"><?= $this->Paginator->counter() ?></p> 
    </div>
</div>
