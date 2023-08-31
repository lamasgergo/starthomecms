Ext.define('Tscrm.store.SentPropertiesContacts', {
    extend  : 'Ext.data.Store',
    alias: 'store.SentPropertiesContacts',
    requires : [
        'Tscrm.model.SentPropertiesContacts'
    ],
    autoLoad: false,
    storeId : 'SentPropertiesContacts',
    model   : 'Tscrm.model.SentPropertiesContacts',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/sent_properties_contacts/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});




