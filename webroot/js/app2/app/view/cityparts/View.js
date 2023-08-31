Ext.define('Tscrm.view.cityparts.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.citypartsView',
    title: 'Cityparts megtekintése',  
    width:1000,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.cityparts.Controller'   
    ],     
    controller: 'citypartsController',
    viewModel: {
        type: 'citypartsModel'
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