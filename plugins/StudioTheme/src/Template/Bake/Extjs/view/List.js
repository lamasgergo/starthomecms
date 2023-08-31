Ext.define('Tscrm.view.__TABLEIZE__.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.__LCFIRST__List',
    xtype: '__LCFIRST__List', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.__TABLEIZE__.Model',
        'Tscrm.view.__TABLEIZE__.Controller'   
    ],    
    controller: '__LCFIRST__Controller',
    viewModel: {
        type: '__LCFIRST__Model'
    }, 
    title: '__CLASSNAME__ csoportok',
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
                    store: '{__LCFIRST__List}'
                },                    
                reference: '__LCFIRST__Grid',
                autoScroll:true,
                loadMask: true,
                scroll:true,
                flex:1,                
                columns: [
                   __GRIDCOLUMNS__
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
        bind: '{__LCFIRST__List}',
        displayInfo: true
    }]

});
