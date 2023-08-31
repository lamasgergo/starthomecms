Ext.define('Tscrm.controller.SentPropertiesContacts', {
    extend: 'Ext.app.Controller',  
    views: [
        //'contacts_searches.List',   
        'sent_properties_contacts.Form'
    ],
    stores: [
        'SentPropertiesContacts'
    ],    
    init: function() {
        console.log('SentPropertiesContacts modul initialized...');
    }   
});    