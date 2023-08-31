<!DOCTYPE html>
    <!--[if IE 9 ]><html class="ie9"><![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Total Studio Crm Login</title>
        
        <!-- Vendor CSS -->
        <?php
            echo $this->Html->css([
                '../vendors/animate-css/animate.min.css',
                '../vendors/sweet-alert/sweet-alert.min.css',
                '../vendors/material-icons/material-design-iconic-font.min.css',
                '../vendors/socicon/socicon.min.css',
                'app.min.1.css',
                'app.min.2.css',
                'studio.css'
            ]);
        ?>
    </head>
    
    <body class="login-content">
        <?php 
            echo $this->fetch('content');
            echo $this->element('iealert');
        ?>

        <!-- Javascript Libraries -->
        <?php
            echo $this->Html->script([
                'jquery-2.1.1.min.js',
                'bootstrap.min.js',
                '../vendors/waves/waves.min.js',
                'lib/fancybox/2.1.5/jquery.fancybox.pack.js',
                'functions.js'
            ]);
        ?>         
        
    </body>
</html>