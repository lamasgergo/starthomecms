Ext.define('Tscrm.controller.InterestPropertiesContacts', {
    extend: 'Ext.app.Controller',  
    views: [
        'interest_properties_contacts.Form'
    ],
    stores: [
        'InterestPropertiesContacts'
    ],    
    init: function() {
        console.log('InterestPropertiesContacts modul initialized...');
    }   
});    