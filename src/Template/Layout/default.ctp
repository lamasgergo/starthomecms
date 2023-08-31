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

$cakeDescription = 'Ingatlan képnéző';
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
    echo $this->Html->css(['base.css','../js/lib/fancybox/2.1.5/jquery.fancybox.css']);
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
</head>
<body>

    <header>
        <div class="header-title">
            <span><?= (!empty($property)?$property->address_short:null) ?></span>
            <div class=clearfix></div>
        </div>
    </header>
    <div id="container">

        <div id="content">
            <?= $this->Flash->render() ?>

            <div class="row">
                <?= $this->fetch('content') ?>
            </div>
        </div>
    </div>
</body>
</html>
