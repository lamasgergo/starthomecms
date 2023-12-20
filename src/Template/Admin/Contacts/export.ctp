<table>
    <tr>
        <td><?=mb_convert_encoding('Regszám','utf-16','utf-8')?></td>
        <td><?=mb_convert_encoding('Név','utf-16','utf-8')?></td>
        <td><?=mb_convert_encoding('Cég','utf-16','utf-8')?></td>
        <td>Email</td>
        <td>Telefon</td>
        <td><?=mb_convert_encoding('Státusz','utf-16','utf-8')?></td>
    </tr>
<?php

foreach($datas as $row){
    ?>
    <tr>
        <td><?=$row->id?></td>
        <td><?=mb_convert_encoding($row->fullname,'utf-16','utf-8');?></td>
        <td><?=mb_convert_encoding($row->company->name,'utf-16','utf-8');?></td>
        <td><?=$row->email1?></td>
        <td><?=$row->phone1?></td>
        <td><?=$row->contact_status_name?></td>
    </tr>
    <?php
}
?>
</table>
