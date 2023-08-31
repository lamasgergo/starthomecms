Ext.define('Tscrm.store.Cityparts', {
    extend  : 'Ext.data.Store',
    alias: 'store.Cityparts',
    requires : [
        'Tscrm.model.Cityparts'
    ],
    autoLoad: false,
    storeId : 'Cityparts',
    model   : 'Tscrm.model.Cityparts',
    remoteSort : true,
    remoteFilter : true,
    pageSize:100,
    proxy: {
        type: 'ajax',
        url: '/admin/cityparts/index.json',         
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
