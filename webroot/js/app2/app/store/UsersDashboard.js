Ext.define('Tscrm.store.UsersDashboard', {
    extend  : 'Ext.data.Store',
    alias: 'store.UsersDashboard',
    requires : [
        'Tscrm.model.Users'
    ],
    autoLoad: false,
    storeId : 'UsersDashboard',
    model   : 'Tscrm.model.Users',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/users/dashboard.json',         
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
     }
});


