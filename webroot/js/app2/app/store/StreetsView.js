Ext.define('Tscrm.store.StreetsView', {
    extend  : 'Ext.data.Store',
    alias: 'store.StreetsView',
    requires : [
        'Tscrm.model.Streets'
    ],
    autoLoad: false,
    storeId : 'StreetsView',
    model   : 'Tscrm.model.Streets',
    proxy: {
        type: 'ajax',
        url: '/admin/streets/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});