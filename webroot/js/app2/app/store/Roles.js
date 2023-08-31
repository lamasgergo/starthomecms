Ext.define('Tscrm.store.Roles', {
    extend  : 'Ext.data.Store',
    alias: 'store.Roles',
    requires : [
        'Tscrm.model.Roles'
    ],
    autoLoad: false,
    storeId : 'Roles',
    model   : 'Tscrm.model.Roles',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/roles/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});


