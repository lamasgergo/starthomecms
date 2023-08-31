Ext.define('Tscrm.controller.ShowedPropertiesContacts', {
    extend: 'Ext.app.Controller',  
    views: [
        //'contacts_searches.List',   
        'showed_properties_contacts.Form'
    ],
    stores: [
        'ShowedPropertiesContacts'
    ],    
    init: function() {
        console.log('ShowedPropertiesContacts modul initialized...');
    }   
});    