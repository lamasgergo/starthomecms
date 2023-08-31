Ext.define('Tscrm.controller.Documents', {
    extend: 'Ext.app.Controller',  
    views: [     
        'documents.Form',
        'documents.FormEdit'
    ],
    stores: [
        'Documents'
    ],    
    init: function() {
        console.log('Documents modul initialized...');
    }   
});    