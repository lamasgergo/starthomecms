<?php
$baseDir = dirname(dirname(__FILE__));
return [
    'plugins' => [
        'Acl' => $baseDir . '/vendor/cakephp/acl/',
        'Bake' => $baseDir . '/vendor/cakephp/bake/',
        'Burzum/Imagine' => $baseDir . '/vendor/burzum/cakephp-imagine-plugin/',
        'CakePdf' => $baseDir . '/vendor/friendsofcake/cakepdf/',
        'DebugKit' => $baseDir . '/vendor/cakephp/debug_kit/',
        'Migrations' => $baseDir . '/vendor/cakephp/migrations/',
        'Search' => $baseDir . '/vendor/friendsofcake/search/',
        'Shim' => $baseDir . '/vendor/dereuromark/cakephp-shim/',
        'SoftDelete' => $baseDir . '/vendor/pgbi/cakephp3-soft-delete/',
        'StudioTheme' => $baseDir . '/plugins/StudioTheme/',
        'Tools' => $baseDir . '/plugins/Tools/',
        'Utils' => $baseDir . '/vendor/cakemanager/cakephp-utils/'
    ]
];
