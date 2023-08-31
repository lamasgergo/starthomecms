Ext.define('Tscrm.store.Documents', {
    extend  : 'Ext.data.Store',
    alias: 'store.Documents',
    requires : [
        'Tscrm.model.Documents'
    ],
    storeId : 'Documents',
    model   : 'Tscrm.model.Documents',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/properties_documents/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


