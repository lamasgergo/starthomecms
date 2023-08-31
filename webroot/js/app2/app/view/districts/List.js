Ext.define('Tscrm.view.districts.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.districtsList',
    xtype: 'districtsList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.districts.Model',
        'Tscrm.view.districts.Controller'   
    ],    
    controller: 'districtsController',
    viewModel: {
        type: 'districtsModel'
    }, 
    title: 'Kerületek',
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
                    store: '{districtsList}'
                },                    
                reference: 'districtsGrid',
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
                        dataIndex: 'district',
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
        bind: '{districtsList}',
        displayInfo: true
    }]

});
