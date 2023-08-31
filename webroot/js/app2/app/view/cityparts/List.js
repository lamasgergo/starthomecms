Ext.define('Tscrm.view.cityparts.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.citypartsList',
    xtype: 'citypartsList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.cityparts.Model',
        'Tscrm.view.cityparts.Controller'   
    ],    
    controller: 'citypartsController',
    viewModel: {
        type: 'citypartsModel'
    }, 
    title: 'Városrészek listázása',
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
                    store: '{citypartsList}'
                },                    
                reference: 'citypartsGrid',
                autoScroll:true,
                loadMask: true,
                scroll:true,
                flex:1,                
                columns: [
                   
                    {
                        xtype:'hidden',
                        name: 'id',
                        hidden: true
                    },{
                        text: 'Település',
                        dataIndex: 'City.city',
                        flex: 1,
                        filter: {
                            type: 'string'
                        }
                    },{
                        text: 'Kerület',
                        dataIndex: 'District.district',
                        flex: 1,
                        filter: {
                            type: 'string'
                        }
                    },{
                        text: 'Városrész',
                        dataIndex: 'citypart',
                        flex: 1,
                        filter: {
                            type: 'string'
                        }
                    },{
                        xtype:'actioncolumn',
                        width:70,
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
                    text: 'Új',
                    handler: 'onAdd',
                    cls:'addbtn'
                }]                                       
            }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        bind: '{citypartsList}',
        displayInfo: true
    }]

});
