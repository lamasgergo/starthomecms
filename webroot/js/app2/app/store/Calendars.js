Ext.define('Tscrm.store.Calendars', {
    extend  : 'Ext.data.Store',
    alias: 'store.Calendars',
    requires : [
        'Tscrm.model.Calendars'
    ],
    autoLoad: false,
    storeId : 'Calendars',
    model   : 'Tscrm.model.Calendars',
    remoteSort : true,
    remoteFilter : true, 
    proxy: {
        type: 'ajax',
        url: '/admin/calendars/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});
