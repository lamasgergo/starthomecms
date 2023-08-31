<?php
    header('Location: /ext');
    $theme='neptune';
?>
<head>
     <title>Hello World</title>
        
        <link rel="stylesheet" type="text/css" href="ext-5.1.0/build/packages/ext-theme-<?=$theme ?>/build/resources/ext-theme-<?=$theme ?>-all.css">
        <link rel="stylesheet" type="text/css" href="./resources/classes/tscrm.css">
        <script type="text/javascript" src="ext-6.0.0/build/ext-all-debug.js"></script>
        <script type="text/javascript" src="ext-6.0.0/build/packages/ext-theme-<?=$theme ?>/build/ext-theme-<?=$theme ?>.js"></script>
        <script type="text/javascript" src="./resources/config/config.js"></script>
        <script type ="text/javascript" src="app/Application.js"></script>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8"> 
</head>