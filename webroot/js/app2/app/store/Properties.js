Ext.define('Tscrm.store.Properties', {
    extend  : 'Ext.data.Store',
    alias: 'store.Properties',
    requires : [
        'Tscrm.model.Properties'
    ],
    autoLoad: false,
    storeId : 'Properties',
    model   : 'Tscrm.model.Properties',
    remoteSort : true,
    remoteFilter : true,
    pageSize:80,
    sorters: [{
        property: 'PropertiesVariations.id',
        direction: 'DESC'
    }],
    proxy: {
        type: 'ajax',
        url: '/admin/properties/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


