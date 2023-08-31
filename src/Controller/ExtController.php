<?php
namespace App\Controller;

use Cake\Core\Configure;
use Cake\Event\Event;

class ExtController extends AppController
{

    public function beforeFilter(Event $event)
    {
        $this->Auth->allow(['index']);
    }
    /**
     * Displays Extjs layout
     */
    public function index()
    {
        $this->layout="extjs";
        //user can change themes
        //triton
        //neptune
        $this->set('theme','neptune') ;
    }
}
