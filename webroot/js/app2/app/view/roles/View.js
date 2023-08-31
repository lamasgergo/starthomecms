Ext.define('Tscrm.view.roles.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.rolesView',
    title: 'Csoport megtekintése',  
    width:1000,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.roles.Controller'   
    ],     
    controller: 'rolesController',
    viewModel: {
        type: 'rolesModel'
    },           
    items:[ 

    ]
    
    
});