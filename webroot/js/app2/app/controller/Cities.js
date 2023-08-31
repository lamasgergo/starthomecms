Ext.define('Tscrm.controller.Cities', {
    extend: 'Ext.app.Controller',  
    views: [
        'cities.List',    
        'cities.Form',
        'cities.View'
    ],
    stores: [
        'Cities',
        'CitiesView'
    ],    
    init: function() {
        console.log('Cities modul initialized...');
    }   
});    