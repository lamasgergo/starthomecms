Ext.define('Tscrm.store.ContactsSearches', {
    extend  : 'Ext.data.Store',
    alias: 'store.ContactsSearches',
    requires : [
        'Tscrm.model.ContactsSearches'
    ],
    autoLoad: false,
    storeId : 'ContactsSearches',
    model   : 'Tscrm.model.ContactsSearches',
    remoteSort : true,
    remoteFilter : true,
    pageSize:50,
    sorters: [{
        property: 'ContactsSearches.id',
        direction: 'DESC'
    }],
    proxy: {
        type: 'ajax',
        url: '/admin/contacts_searches/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});




