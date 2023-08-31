Ext.define('Tscrm.controller.Layouts', {
    extend: 'Ext.app.Controller',  
    views: [     
        'layouts.Form'
    ],
    stores: [
        'Layouts'
    ],    
    init: function() {
        console.log('Layouts modul initialized...');
    }   
});    