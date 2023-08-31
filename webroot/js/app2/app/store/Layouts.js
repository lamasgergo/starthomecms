Ext.define('Tscrm.store.Layouts', {
    extend  : 'Ext.data.Store',
    alias: 'store.Layouts',
    requires : [
        'Tscrm.model.Layouts'
    ],
    storeId : 'Layouts',
    model   : 'Tscrm.model.Layouts',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/properties_layouts/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


