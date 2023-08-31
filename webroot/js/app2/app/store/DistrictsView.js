Ext.define('Tscrm.store.DistrictsView', {
    extend  : 'Ext.data.Store',
    alias: 'store.DistrictsView',
    requires : [
        'Tscrm.model.Districts'
    ],
    autoLoad: false,
    storeId : 'DistrictsView',
    model   : 'Tscrm.model.Districts',
    proxy: {
        type: 'ajax',
        url: '/admin/districts/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});