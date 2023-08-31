<!DOCTYPE html>
<html>
<head>
     <title>StartHome CRM</title>
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<?php   
echo $this->Html->meta(
    '/studio_theme/img/favicon.png',
    '/studio_theme/img/favicon.png',
    ['type' => 'icon'] );
///studio_theme/img/favicon.png
//echo $this->Html->image('favicon.png');
    echo $this->Html->css([
        '../js/lib/fancybox/2.1.5/jquery.fancybox.css?v=2.1.5',
        '../js/app2/ext-6.0.0/build/classic/theme-'.$theme.'/resources/theme-'.$theme.'-all-debug.css',
        //'../js/app2/ext-6.0.0/packages/charts/classic/'.$theme.'/resources/charts-all.css',
        //'../js/app2/ext-6.0.0/packages/ux/classic/'.$theme.'/resources/ux-all.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css',
        '../js/app2/resources/classes/tscrm.css',
        '../js/app2/resources/classes/tscrm_start.css'
    
    ]);
    if($theme!='triton')
    {
        echo $this->Html->css('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css');
    }
    echo $this->Html->script([
        'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
        '//code.jquery.com/ui/1.11.4/jquery-ui.js',
        'lib/fancybox/2.1.5/jquery.fancybox.pack.js?v=2.1.5',
        'app2/ext-6.0.0/build/ext-all-debug.js',
        'app2/ext-6.0.0/build/classic/theme-'.$theme.'/theme-'.$theme.'.js',
        //'app2/ext-6.0.0/packages/ux/classic/ux.js',
        'app2/resources/config/config.js',
        'app2/app/Application.js',
        //'/js/lib/zeroclipboard-2.2.0/dist/ZeroClipboard.js'
    ]);

/*
    echo $this->Html->css([
    '../js/app2/ext-5.1.0/build/packages/ext-theme-'.$theme.'/build/resources/ext-theme-'.$theme.'-all.css',
    '../js/app2/resources/classes/tscrm.css'
    ]);
    echo $this->Html->script([
        'app2/ext-5.1.0/build/ext-all-debug.js',
        'app2/ext-5.1.0/build/packages/ext-theme-'.$theme.'/build/ext-theme-'.$theme.'.js',
        'app2/resources/config/config.js',
        'app2/app/Application.js'
    ]); 
    */                               ?>      
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8"> 
</head>
<body>
<!--
<link rel="stylesheet" type="text/css" href="http://examples.sencha.com/extjs/6.0.0/classic/theme-triton/resources/theme-triton-all.css">
<link rel="stylesheet" type="text/css" href="http://examples.sencha.com/extjs/6.0.0/packages/charts/classic/triton/resources/charts-all.css">
<link rel="stylesheet" type="text/css" href="http://examples.sencha.com/extjs/6.0.0/packages/ux/classic/triton/resources/ux-all.css">
<script type="text/javascript" src="http://examples.sencha.com/extjs/6.0.0/ext-all.js"></script>
<script type="text/javascript" src="http://examples.sencha.com/extjs/6.0.0/classic/theme-triton/theme-triton.js" defer=""></script>
<script type="text/javascript" src="http://examples.sencha.com/extjs/6.0.0/packages/ux/classic/ux.js"></script>
-->
</body>
</html>
