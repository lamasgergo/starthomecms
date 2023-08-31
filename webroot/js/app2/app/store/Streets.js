Ext.define('Tscrm.store.Streets', {
    extend  : 'Ext.data.Store',
    alias: 'store.Streets',
    requires : [
        'Tscrm.model.Streets'
    ],
    autoLoad: false,
    storeId : 'Streets',
    model   : 'Tscrm.model.Streets',
    remoteSort : true,
    remoteFilter : true,
    pageSize:100,
    proxy: {
        type: 'ajax',
        url: '/admin/streets/index.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas',
            totalProperty: 'total'
        }
     },
    listeners:{
        load: function(records, operation, success){
            if(!success) {
                this.fireEvent('unauthorized', vcontroller);
            }
        }
    }
});
