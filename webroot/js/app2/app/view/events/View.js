Ext.define('Tscrm.view.events.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.eventsView',
    title: 'Esemény',  
    width:1000,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.events.Controller'   
    ],     
    controller: 'eventsController',
    viewModel: {
        type: 'eventsListModel'
    },           
    items:[ 

    ]
    
    
});