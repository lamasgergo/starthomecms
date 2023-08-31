Ext.define('Tscrm.store.ContactsView', {
    extend  : 'Ext.data.Store',
    alias: 'store.ContactsView',
    requires : [
        'Tscrm.model.Contacts'
    ],
    autoLoad: false,
    storeId : 'ContactsView',
    model   : 'Tscrm.model.Contacts',
    proxy: {
        type: 'ajax',
        url: '/admin/contacts/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});