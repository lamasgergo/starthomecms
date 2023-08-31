Ext.define('Tscrm.store.CitypartsView', {
    extend  : 'Ext.data.Store',
    alias: 'store.CitypartsView',
    requires : [
        'Tscrm.model.Cityparts'
    ],
    autoLoad: false,
    storeId : 'CitypartsView',
    model   : 'Tscrm.model.Cityparts',
    proxy: {
        type: 'ajax',
        url: '/admin/cityparts/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});