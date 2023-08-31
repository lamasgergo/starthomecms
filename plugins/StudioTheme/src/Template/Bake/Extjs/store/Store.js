Ext.define('Tscrm.store.__CLASSNAME__', {
    extend  : 'Ext.data.Store',
    alias: 'store.__CLASSNAME__',
    requires : [
        'Tscrm.model.__CLASSNAME__'
    ],
    autoLoad: false,
    storeId : '__CLASSNAME__',
    model   : 'Tscrm.model.__CLASSNAME__',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/__TABLEIZE__/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     } 
});
