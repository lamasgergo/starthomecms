Ext.define('Tscrm.view.cities.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.citiesList',
    xtype: 'citiesList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.cities.Model',
        'Tscrm.view.cities.Controller'   
    ],    
    controller: 'citiesController',
    viewModel: {
        type: 'citiesModel'
    }, 
    title: 'Települések',
    width: 400,
    originalWidth:400,
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
                    store: '{citiesList}'
                },                    
                reference: 'citiesGrid',
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
                        text: 'city',
                        dataIndex: 'city',
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
        bind: '{citiesList}',
        displayInfo: true
    }]

});
