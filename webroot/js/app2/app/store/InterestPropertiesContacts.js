Ext.define('Tscrm.store.InterestPropertiesContacts', {
    extend  : 'Ext.data.Store',
    alias: 'store.InterestPropertiesContacts',
    requires : [
        'Tscrm.model.InterestPropertiesContacts'
    ],
    autoLoad: false,
    storeId : 'InterestPropertiesContacts',
    model   : 'Tscrm.model.InterestPropertiesContacts',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/interest_properties_contacts/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});




