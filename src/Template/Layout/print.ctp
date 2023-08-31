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
if($this->request->query['todo']=='25'):
   echo $this->element('print_25');
   die();
endif;         

?>
<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        StartHomeBudapest nyomtatás
    </title>
    <?= $this->Html->meta('icon') ?>

    <?= $this->Html->css('print.css') ?>
    <?= $this->Html->script(array(/*'lib/zeroclipboard-2.2.0/dist/ZeroClipboard',*/'initclipboard'), ['block' => 'scriptBottom']) ?>

    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <?= $this->fetch('script') ?>
</head>
<body>
   
    <div id="container">

        <div id="content">
            <?= $this->Flash->render() ?>

            <div class="row">
                <?= $this->fetch('content') ?>
            </div>
        </div>
        <footer>
        </footer>
    </div>
    <?= $this->fetch('scriptBottom') ?>
    <script type="text/javascript">$('#print').click(function(){$('#clip_button').hide(); $('#print').hide()})/*window.print();*/</script>    
</body>
</html>

