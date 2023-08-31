Ext.define('Tscrm.store.Companies', {
    extend  : 'Ext.data.Store',
    alias: 'store.Companies',
    requires : [
        'Tscrm.model.Companies'
    ],
    autoLoad: false,
    storeId : 'Companies',
    model   : 'Tscrm.model.Companies',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/companies/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


