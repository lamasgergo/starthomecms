Ext.define('Tscrm.store.Contacts', {
    extend  : 'Ext.data.Store',
    alias: 'store.Contacts',
    requires : [
        'Tscrm.model.Contacts'
    ],
    autoLoad: false,
    storeId : 'Contacts',
    model   : 'Tscrm.model.Contacts',
    remoteSort : true,
    remoteFilter : true,
    pageSize:80,
    proxy: {
        type: 'ajax',
        url: '/admin/contacts/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


