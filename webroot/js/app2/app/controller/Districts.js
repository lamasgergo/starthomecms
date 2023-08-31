Ext.define('Tscrm.controller.Districts', {
    extend: 'Ext.app.Controller',  
    views: [
        'districts.List',    
        'districts.Form',
        'districts.View'
    ],
    stores: [
        'Districts',
        'DistrictsView'
    ],    
    init: function() {
        console.log('Districts modul initialized...');
    }   
});    