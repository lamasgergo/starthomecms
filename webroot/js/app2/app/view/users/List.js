Ext.define('Tscrm.view.users.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.usersList',
    xtype: 'usersList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.users.Model',
        'Tscrm.view.users.Controller'   
    ],    
    controller: 'usersController',
    viewModel: {
        type: 'usersModel'
    }, 
    title: 'Felhasználók',
    width: 800,
    originalWidth:600,
    height: 400,
    closable: true,
    closeAction: 'hide',
    maximizable: true,
    minimizable: true,
    constrain: true,    
    layout: {
         type: 'fit'
    },   
    tools: [{
        type: 'restore',
        handler: function (evt, toolEl, owner, tool) {
            var window = owner.up('window');
            window.setWidth(window.originalWidth);
            window.expand('', false);
            window.center();
        }
    }],      
    items:[
            {
                xtype: 'gridpanel',
                bind:  '{usersList}',                    
                reference: 'usersGrid',
                autoScroll:true,
                loadMask: true,
                scroll:true,
                flex:1,                
                columns: [
                    {
                        text: 'Felhasználónév',
                        dataIndex: 'username',
                        flex: 1
                    },{
                        text: 'Név',
                        dataIndex: 'name',
                        flex: 1, 
                        xtype:'templatecolumn', 
                        tpl:'{lastname} {firstname}'
                    },{
                        text: 'E-mail',
                        dataIndex: 'email',
                        flex: 1
                    },{
                        text: 'Csoport',
                        flex: 1,
                        renderer: function(value,col) {
                            return col.record.data.role.name;
                        }
                    }, {
                        text: 'Létrehozva',
                        dataIndex: 'created',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d')
                        
                    }, {
                        xtype:'actioncolumn',
                        width:50,
                        items: [{
                            iconCls: 'action edit',
                            tooltip: 'Módosítás',
                            handler: 'onEdit'
                        },{
                            iconCls: 'action delete',
                            tooltip: 'Törlés',
                            handler: 'onDelete'
                        }]
                    }
                ],
                listeners: {
                    rowdblclick: 'onRowDblClick',
                    afterRender: 'reloadGrid'
                },            
                tbar: [{
                    xtype: 'button',
                    text: 'Új felhasználó',
                    handler: 'onAdd',
                    cls:'addbtn'
                }]                                       
            }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        bind: '{usersList}',
        displayInfo: true
    }]

});
