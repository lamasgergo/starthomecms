Ext.define('Tscrm.store.ShowedPropertiesContacts', {
    extend  : 'Ext.data.Store',
    alias: 'store.ShowedPropertiesContacts',
    requires : [
        'Tscrm.model.ShowedPropertiesContacts'
    ],
    autoLoad: false,
    storeId : 'ShowedPropertiesContacts',
    model   : 'Tscrm.model.ShowedPropertiesContacts',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/showed_properties_contacts/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});




