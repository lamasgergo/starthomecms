Ext.define('Tscrm.controller.Images', {
    extend: 'Ext.app.Controller',  
    views: [     
        'images.Form'
    ],
    stores: [
        'Images'
    ],    
    init: function() {
        console.log('Images modul initialized...');
    }   
});    