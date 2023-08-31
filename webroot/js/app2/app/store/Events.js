Ext.define('Tscrm.store.Events', {
    extend  : 'Ext.data.Store',
    alias: 'store.Events',
    requires : [
        'Tscrm.model.Events'
    ],
    autoLoad: false,
    storeId : 'Events',
    model   : 'Tscrm.model.Events',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/events/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});
