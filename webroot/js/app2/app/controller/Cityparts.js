Ext.define('Tscrm.controller.Cityparts', {
    extend: 'Ext.app.Controller',  
    views: [
        'cityparts.List',    
        'cityparts.Form',
        'cityparts.View'
    ],
    stores: [
        'Cityparts',
        'CitypartsView'
    ],    
    init: function() {
        console.log('Cityparts modul initialized...');
    }   
});    