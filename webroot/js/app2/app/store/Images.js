Ext.define('Tscrm.store.Images', {
    extend  : 'Ext.data.Store',
    alias: 'store.Images',
    requires : [
        'Tscrm.model.Images'
    ],
    storeId : 'Images',
    model   : 'Tscrm.model.Images',
    remoteSort : true,
    remoteFilter : true,
    pageSize:200,
    pageSize:100,
    proxy: {
        type: 'ajax',
        url: '/admin/properties_images/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


