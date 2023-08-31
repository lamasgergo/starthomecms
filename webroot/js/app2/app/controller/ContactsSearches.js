Ext.define('Tscrm.controller.ContactsSearches', {
    extend: 'Ext.app.Controller',  
    views: [
        'contacts_searches.List',
        'contacts_searches.Form'
    ],
    stores: [
        'ContactsSearches'
    ],    
    init: function() {
        console.log('ContactSearches modul initialized...');
    }   
});    