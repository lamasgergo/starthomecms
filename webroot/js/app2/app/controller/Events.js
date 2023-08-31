Ext.define('Tscrm.controller.Events', {
    extend: 'Ext.app.Controller',  
    views: [
        'events.List',    
        'events.Form',
        'events.View'
    ],
    stores: [
        'Events'
    ],    
    init: function() {
        console.log('Events modul initialized...');
    }   
});    