<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 */
class UsersController extends AppController
{
    public function beforeFilter(Event $event)
    {
        $this->Auth->allow(['login']);
    }
    /**
     * Login method
     *
     * @return void
     */
    public function login()
    {

    }

}
