Ext.define('Tscrm.store.ContactsSearchesView', {
    extend  : 'Ext.data.Store',
    alias: 'store.ContactsSearchesView',
    requires : [
        'Tscrm.model.Contacts'
    ],
    autoLoad: false,
    storeId : 'ContactsSearchesView',
    model   : 'Tscrm.model.Contacts',
    proxy: {
        type: 'ajax',
        url: '/admin/contacts_searches/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});