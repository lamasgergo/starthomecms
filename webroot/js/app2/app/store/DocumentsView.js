Ext.define('Tscrm.store.DocumentsView', {
    extend  : 'Ext.data.Store',
    alias: 'store.DocumentsView',
    requires : [
        'Tscrm.model.Documents'
    ],
    autoLoad: false,
    storeId : 'DocumentsView',
    model   : 'Tscrm.model.Documents',
    proxy: {
        type: 'ajax',
        url: '/admin/properties_documents/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});