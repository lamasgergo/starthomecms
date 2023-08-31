Ext.define('Tscrm.view.cities.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.citiesView',
    title: 'Cities megtekintése',  
    width:1000,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.cities.Controller'   
    ],     
    controller: 'citiesController',
    viewModel: {
        type: 'citiesModel'
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