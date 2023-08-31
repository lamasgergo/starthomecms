Ext.define('Tscrm.store.Users', {
    extend  : 'Ext.data.Store',
    alias: 'store.Users',
    requires : [
        'Tscrm.model.Users'
    ],
    autoLoad: false,
    storeId : 'Users',
    model   : 'Tscrm.model.Users',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/users/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     }
});


