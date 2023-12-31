<%
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.1.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
%>

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {

        //Sorter part
        if(!empty($this->request->query['sort']) and is_array(json_decode($this->request->query['sort'])))
        {
            $sorter=json_decode($this->request->query['sort']);
            foreach($sorter as $onesort){
                $this->request->query['sort']=$onesort->property;
                $this->request->query['direction']=$onesort->direction;
            }
        }    
        
        //Grid filter part
        if(!empty($this->request->query['filter'])){
             foreach(json_decode($this->request->query['filter']) as $oneFilter){
                $this->request->query[$oneFilter->property]=$oneFilter->value;    
             }
        }           
           
<% $belongsTo = $this->Bake->aliasExtractor($modelObj, 'BelongsTo'); %>

        //Search part
<% if ($belongsTo): %>
        $query = $this-><%= $currentModelName %>
            ->find('search', $this->request->query)
            ->contain([
                <%= $this->Bake->stringifyList($belongsTo, ['indent' => false]) %>
            ]
        );  
<% else: %>  
        $query = $this-><%= $currentModelName %>->find('search', $this->request->query);  
<% endif; %>  

        $this->set('total',$query->count());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas']);
    }
