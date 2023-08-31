Ext.define('Tscrm.store.PropertiesView', {
    extend  : 'Ext.data.Store',
    alias: 'store.PropertiesView',
    requires : [
        'Tscrm.model.Properties'
    ],
    autoLoad: false,
    storeId : 'PropertiesView',
    model   : 'Tscrm.model.Properties',
    proxy: {
        type: 'ajax',
        url: '/admin/properties/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});