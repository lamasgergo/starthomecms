<?php
namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Validation\Validator;

class ArticlesTable extends Table {
    public function initialize(array $config)
    {
        $this->addBehavior('Timestamp');
    }
    public function validationDefault(Validator $validator) {
        $validator
            ->notEmpty('title','Requested field!')
            ->add('title', 'length', [
                'rule' => ['minLength', 10],
                'message' => 'Too short'
            ])
            ->notEmpty('body','Requested field!')
            ->add('body', 'length', [
                'rule' => ['minLength', 10],
                'message' => 'Too short'
            ]);

        return $validator;
    }
}