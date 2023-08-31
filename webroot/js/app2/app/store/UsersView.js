Ext.define('Tscrm.store.UsersView', {
    extend  : 'Ext.data.Store',
    alias: 'store.UsersView',
    requires : [
        'Tscrm.model.Users'
    ],
    autoLoad: false,
    storeId : 'usersView',
    model   : 'Tscrm.model.Users',
    proxy: {
        type: 'ajax',
        url: '/admin/users/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});