Ext.define('Tscrm.view.roles.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.rolesList',
    xtype: 'rolesList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.roles.Model',
        'Tscrm.view.roles.Controller'   
    ],    
    controller: 'rolesController',
    viewModel: {
        type: 'rolesModel'
    }, 
    title: 'Felhasználói csoportok',
    width: 600,
    originalWidth:600,
    height: 400,
    closable: true,
    closeAction: 'hide',
    maximizable: true,
    minimizable: true,    
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
                bind: {
                    store: '{rolesList}'
                },                    
                reference: 'rolesGrid',
                autoScroll:true,
                loadMask: true,
                scroll:true,
                flex:1,                
                columns: [
                   {
                        text: 'Megnevezés',
                        dataIndex: 'name',
                        flex: 1
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
                    text: 'Új csoport',
                    handler: 'onAdd',
                    cls:'addbtn'
                }]                                       
            }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        bind: '{rolesList}',
        displayInfo: true
    }]

});
