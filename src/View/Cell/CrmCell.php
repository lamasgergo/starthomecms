<?php
/**
 *  Copyright (C) 2017  Total Studio Kft.
 *  Author: Tamás Gergely
 *  This file is a part of Studio CMS engine.
 *
 */

namespace App\View\Cell;


use Cake\Core\Configure;
use Cake\I18n\Time;
use Cake\Utility\Text;
use Cake\View\Cell;

/**

 */
class CrmCell extends Cell
{
    function display($view){
        $this->loadModel('Districts');
        //Search part
        $districts = $this->Districts
            ->find('list', $this->request->query);
        $this->set(compact('view', 'districts'));
    }
}