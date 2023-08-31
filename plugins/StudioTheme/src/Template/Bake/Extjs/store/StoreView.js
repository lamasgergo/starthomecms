Ext.define('Tscrm.store.__CLASSNAME__View', {
    extend  : 'Ext.data.Store',
    alias: 'store.__CLASSNAME__View',
    requires : [
        'Tscrm.model.__CLASSNAME__'
    ],
    autoLoad: false,
    storeId : '__CLASSNAME__View',
    model   : 'Tscrm.model.__CLASSNAME__',
    proxy: {
        type: 'ajax',
        url: '/admin/__TABLEIZE__/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
     }
});