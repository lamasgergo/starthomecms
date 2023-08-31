Ext.define('Tscrm.store.Template', {
    extend  : 'Ext.data.Store',
    alias: 'store.Template',
    requires : [
        'Tscrm.model.Template'
    ],
    autoLoad: true,
    storeId : 'Template',
    model   : 'Tscrm.model.Template',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: 'http://tscrm.hu/admin/users/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     }
});


