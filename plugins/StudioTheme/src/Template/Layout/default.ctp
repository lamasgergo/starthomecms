<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Shamcey - Metro Style Admin Template</title>
<?php
    echo $this->Html->css('style.default.css');
?>

<?php
    echo $this->Html->script([
        'jquery-1.10.2.min.js',
        'jquery-migrate-1.2.1.min.js',
        'jquery-ui-1.10.3.min.js',
        'bootstrap.min.js',
        'modernizr.min.js',
        'jquery.cookies.js',
        'jquery.slimscroll.js',
        'custom.js'
    
    ]);
?>

</head>

<body>
    <?= $this->fetch('content') ?>
</body>
</html>
