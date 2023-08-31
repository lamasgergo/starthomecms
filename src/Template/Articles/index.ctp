<!-- File: /App/Template/Articles/index.ctp -->

<h1>Blog articles</h1>
<table>
    <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Created</th>
    </tr>

    <!-- Here is where we iterate through our $articles query object, printing out article info -->

    <?php foreach ($datas as $data): ?>
    <tr>
        <td><?= $data->id ?></td>
        <td>
            <?= $this->Html->link($data->address,
            ['controller' => 'articles', 'action' => 'view', $data->id]) ?>
        </td>
        <td><?= $data->created->format(DATE_RFC850) ?></td>
    </tr>
    <?php endforeach; ?>
</table>
<?php
    echo $this->Paginator->numbers();   
echo $this->Paginator->counter(
    'Page {{page}} of {{pages}}, showing {{current}} records out of
     {{count}} total, starting on record {{start}}, ending on {{end}}'
);    
?>
