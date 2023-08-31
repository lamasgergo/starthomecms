Ext.define('Tscrm.store.LayoutsView', {
    extend  : 'Ext.data.Store',
    alias: 'store.LayoutsView',
    requires : [
        'Tscrm.model.Layouts'
    ],
    autoLoad: false,
    storeId : 'LayoutsView',
    model   : 'Tscrm.model.Layouts',
    proxy: {
        type: 'ajax',
        url: '/admin/properties_layouts/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});