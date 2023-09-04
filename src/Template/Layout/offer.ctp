<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = 'Offer';
?>
<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?= $cakeDescription ?>:
        <?= $this->fetch('title') ?>
    </title>

    <?php
    echo $this->Html->css(['offer.css','../js/lib/fancybox/2.1.5/jquery.fancybox.css']);
    echo $this->Html->script(['https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js', 'lib/fancybox/2.1.5/jquery.fancybox.pack.js']);
    echo $this->Html->scriptBlock("
    $(document).ready(function ()
        {          
                $('.fb').fancybox();
                
        });
    ",['block' => 'script']);
    echo $this->Html->meta(
        '/studio_theme/img/favicon.png',
        '/studio_theme/img/favicon.png',
        ['type' => 'icon'] );


    echo $this->fetch('meta');
    echo $this->fetch('css');
    echo $this->fetch('script') ;
    ?>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body>

<header>
    <div class="header-title">
        <span><?= (!empty($property)?$property->address_short:null) ?></span>
        <div class=clearfix></div>
    </div>
</header>
<div class="container" id="container">

    <div id="content">
        <?= $this->Flash->render() ?>
            <?= $this->fetch('content') ?>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</body>
</html>
