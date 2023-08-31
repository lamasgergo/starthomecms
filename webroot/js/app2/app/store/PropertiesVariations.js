Ext.define('Tscrm.store.PropertiesVariations', {
    extend  : 'Ext.data.Store',
    alias: 'store.PropertiesVariations',
    requires : [
        'Tscrm.model.PropertiesVariations'
    ],
    autoLoad: false,
    storeId : 'PropertiesVariations',
    model   : 'Tscrm.model.PropertiesVariations',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/properties_variations/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


