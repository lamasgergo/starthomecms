<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>StartHome CRM</title>
<?php
    echo $this->Html->css([
    '../vendors/fullcalendar/fullcalendar.css',
    '../vendors/animate-css/animate.min.css',
    '../vendors/sweet-alert/sweet-alert.min.css',
    '../vendors/material-icons/material-design-iconic-font.min.css',
    '../vendors/socicon/socicon.min.css',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css',
    '../js/lib/fancybox/2.1.5/jquery.fancybox.css',
        '../vendors/bootstrap-select/bootstrap-select.min',
    'app.min.1.css',
    'app.min.2.css',
        'studio.css'
    ]);
?>



</head>

<body>
        <header id="header" class="bgm-green">
            <ul class="header-inner">
                <li id="menu-trigger" data-trigger="#sidebar">
                    <div class="line-wrap">
                        <div class="line top"></div>
                        <div class="line center"></div>
                        <div class="line bottom"></div>
                    </div>
                </li>
            
                <li class="logo hidden-xs">
                    <a href="/">Start Judit CRM</a>
                </li>
                
                <li class="pull-right">
                <ul class="top-menu">
                    <li id="toggle-width">
                        <div class="toggle-switch">
                            <input id="tw-switch" type="checkbox" hidden="hidden">
                            <label for="tw-switch" class="ts-helper"></label>
                        </div>
                    </li>
                    <li id="top-search">
                        <a class="tm-search" href=""></a>
                    </li>
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="tm-settings" href="" aria-expanded="true"></a>
                        <ul class="dropdown-menu dm-icon pull-right">
                            <li>
                                <a data-action="fullscreen" href=""><i class="md md-fullscreen"></i> Teljes képernyő</a>
                            </li>
                            <li>
                                <a href="/ext"><i class="md md-layers"></i> Ablak mód</a>
                            </li>
                        </ul>
                    </li>
            </ul>
            
            <!-- Top Search Content -->
            <div id="top-search-wrap">
                <?php
                echo $this->cell('Crm', ['view' => $this]);

                ?>
                <i id="top-search-close">&times;</i>
            </div>
        </header>
        
        <section id="main">
            <aside id="sidebar">
                <div class="sidebar-inner">
                    <div class="si-inner">
                        <div class="profile-menu">
                            <a href="">
                                <div class="profile-pic">
                                    <?php

                                    if(empty($user['avatar_mini'])) {
                                        echo $this->Html->image('nousericon.png');
                                    }else {
                                        echo $this->Html->image($user['avatar_mini']);
                                    }
                                    ?>
                                </div>
                                
                                <div class="profile-info">
                                    <?=$user['fullname']?>
                                    
                                    <i class="md md-arrow-drop-down"></i>
                                </div>
                            </a>
                            
                            <ul class="main-menu">
                                <li>
                                    <?php echo $this->Html->link('<i class="md md-history"></i>'.__('Kijelentkezés'), ['controller'=>'users', 'action'=>'logout', 'admin'=>true],['escape'=>false])?>
                                </li>
                            </ul>
                        </div>
                        
                        <ul class="main-menu">
                            <li><a href="<?=$this->Url->build(['controller' => 'Properties', 'action' => 'index'])?>"><i class="md md-home"></i> Ingatlanok</a></li>
                           <!-- <li><a href="<?=$this->Url->build(['controller' => 'Contacts', 'action' => 'index'])?>"><i class="md md-format-underline"></i> Ügyfelek</a></li>-->
                        </ul>
                    </div>
                </div>
            </aside>
            
            <section id="content">
                <div class="container">
                    <?= $this->Flash->render() ?>
                    <?php echo $this->fetch('content');?>
                </div>
            </section>
        </section>
        
        <!-- Older IE warning message -->
        <!--[if lt IE 9]>
            <div class="ie-warning">
                <h1 class="c-white">IE SUCKS!</h1>
                <p>You are using an outdated version of Internet Explorer, upgrade to any of the following web browser <br/>in order to access the maximum functionality of this website. </p>
                <ul class="iew-download">
                    <li>
                        <a href="http://www.google.com/chrome/">
                            <img src="img/browsers/chrome.png" alt="">
                            <div>Chrome</div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.mozilla.org/en-US/firefox/new/">
                            <img src="img/browsers/firefox.png" alt="">
                            <div>Firefox</div>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.opera.com">
                            <img src="img/browsers/opera.png" alt="">
                            <div>Opera</div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.apple.com/safari/">
                            <img src="img/browsers/safari.png" alt="">
                            <div>Safari</div>
                        </a>
                    </li>
                    <li>
                        <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">
                            <img src="img/browsers/ie.png" alt="">
                            <div>IE (New)</div>
                        </a>
                    </li>
                </ul>
                <p>Upgrade your browser for a Safer and Faster web experience. <br/>Thank you for your patience...</p>
            </div>   
        <![endif]-->

        <!-- Javascript Libraries -->

<?php
    echo $this->Html->script([
        'jquery-2.1.1.min.js',
        'bootstrap.min.js',
        '../vendors/nicescroll/jquery.nicescroll.min.js',
        '../vendors/bootgrid/jquery.bootgrid.min.js',
        '../vendors/waves/waves.min.js',
        '../vendors/bootstrap-growl/bootstrap-growl.min.js',
        '../vendors/sweet-alert/sweet-alert.min.js',
        '../vendors/bootstrap-select/bootstrap-select.js',
        'lib/fancybox/2.1.5/jquery.fancybox.pack.js',
        'functions.js'
    
    ]);
?>        

</body>
</html>
