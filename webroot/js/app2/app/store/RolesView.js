Ext.define('Tscrm.store.RolesView', {
    extend  : 'Ext.data.Store',
    alias: 'store.RolesView',
    requires : [
        'Tscrm.model.Roles'
    ],
    autoLoad: false,
    storeId : 'RolesView',
    model   : 'Tscrm.model.Roles',
    proxy: {
        type: 'ajax',
        url: '/admin/roles/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});