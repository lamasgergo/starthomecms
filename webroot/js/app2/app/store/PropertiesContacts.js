Ext.define('Tscrm.store.PropertiesContacts', {
    extend  : 'Ext.data.Store',
    alias: 'store.PropertiesContacts',
    requires : [
        'Tscrm.model.PropertiesContacts'
    ],
    autoLoad: false,
    storeId : 'PropertiesContacts',
    model   : 'Tscrm.model.PropertiesContacts',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/properties_contacts/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});




