Ext.define('Tscrm.store.Statics', {
    extend  : 'Ext.data.Store',
    alias: 'store.Statics',
    requires : [
        'Tscrm.model.Statics'
    ],
    autoLoad: false,
    storeId : 'Statics',
    model   : 'Tscrm.model.Statics',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/statics/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});
 