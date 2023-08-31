Ext.define('Tscrm.view.__TABLEIZE__.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.__LCFIRST__View',
    title: '__CLASSNAME__ megtekintése',  
    width:1000,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.__TABLEIZE__.Controller'   
    ],     
    controller: '__LCFIRST__Controller',
    viewModel: {
        type: '__LCFIRST__Model'
    },           
    items:[{
        xtype: 'panel',
        reference: 'maindata',
        tpl : [
            '{id}'
        ]
        
    }
    ]
    
    
});