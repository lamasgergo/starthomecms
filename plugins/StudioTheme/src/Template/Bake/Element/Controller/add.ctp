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
$compact = ["'data'"];
%>

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        if($this->request->is(['patch', 'post', 'put']))
        {
            $ret=$this->_saveData(null,__('<%= $currentModelName %> save success!'),__('<%= $currentModelName %> save failed!'));
            if($ret and $ret['success'])
            {
                //Do something if record saved   
            }            
            $this->set([
                'success'=>$ret['success'],
                'data'=>$ret['data'],
                'errors'=>$ret['errors'],
                'message'=>$ret['message']
                
            ]); 
        }else{
    
<%
            $associations = array_merge(
                $this->Bake->aliasExtractor($modelObj, 'BelongsTo'),
                $this->Bake->aliasExtractor($modelObj, 'BelongsToMany')
            );
            foreach ($associations as $assoc):
                $association = $modelObj->association($assoc);
                $otherName = $association->target()->alias();
                $otherPlural = $this->_variableName($otherName);
%>
            $<%= $otherPlural %> = $this-><%= $currentModelName %>-><%= $otherName %>->find('list', ['limit' => 200]);
<%
                $compact[] = "'$otherPlural'";
            endforeach;
%>
        }
        $this->set(compact(<%= join(', ', $compact) %>));
        $this->set('_serialize', ['data','success','errors', 'message']);
    }
