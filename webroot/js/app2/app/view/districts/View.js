Ext.define('Tscrm.view.districts.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.districtsView',
    title: 'Districts megtekintése',  
    width:1000,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.districts.Controller'   
    ],     
    controller: 'districtsController',
    viewModel: {
        type: 'districtsModel'
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