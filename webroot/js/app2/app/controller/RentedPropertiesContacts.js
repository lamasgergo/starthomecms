Ext.define('Tscrm.controller.RentedPropertiesContacts', {
    extend: 'Ext.app.Controller',  
    views: [
        'rented_properties_contacts.Form'
    ],
    stores: [
        'RentedPropertiesContacts'
    ],    
    init: function() {
        console.log('RentedPropertiesContacts modul initialized...');
    }   
});    