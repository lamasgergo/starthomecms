Ext.define('Tscrm.controller.Contacts', {
    extend: 'Ext.app.Controller',  
    views: [
        'contacts.List',
        'contacts.ListEventsFastView',
        'contacts.Form',
        'contacts.View'
    ],
    stores: [
        'Contacts',
        'Companies',
        'ContactsView',
        'Properties',
        'SentPropertiesContacts',
        'ContactsSearches',
        'ContactsSearchesView',
        'Events'
    ],    
    init: function() {
        console.log('Contacts modul initialized...');
    }   
});    