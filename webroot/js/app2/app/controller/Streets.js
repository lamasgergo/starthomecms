Ext.define('Tscrm.controller.Streets', {
    extend: 'Ext.app.Controller',  
    views: [
        'streets.List',    
        'streets.Form',
        'streets.View'
    ],
    stores: [
        'Streets',
        'StreetsView'
    ],    
    init: function() {
        console.log('Streets modul initialized...');
    }   
});    