Ext.define('Tscrm.store.CitiesView', {
    extend  : 'Ext.data.Store',
    alias: 'store.CitiesView',
    requires : [
        'Tscrm.model.Cities'
    ],
    autoLoad: false,
    storeId : 'CitiesView',
    model   : 'Tscrm.model.Cities',
    proxy: {
        type: 'ajax',
        url: '/admin/cities/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});