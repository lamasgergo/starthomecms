Ext.define('Tscrm.view.streets.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.streetsView',
    title: 'Streets megtekintése',  
    width:1000,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.streets.Controller'   
    ],     
    controller: 'streetsController',
    viewModel: {
        type: 'streetsModel'
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