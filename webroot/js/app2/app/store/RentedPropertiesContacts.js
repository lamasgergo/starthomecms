Ext.define('Tscrm.store.RentedPropertiesContacts', {
    extend  : 'Ext.data.Store',
    alias: 'store.RentedPropertiesContacts',
    requires : [
        'Tscrm.model.RentedPropertiesContacts'
    ],
    autoLoad: false,
    storeId : 'RentedPropertiesContacts',
    model   : 'Tscrm.model.RentedPropertiesContacts',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/rented_properties_contacts/index.json',
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});




