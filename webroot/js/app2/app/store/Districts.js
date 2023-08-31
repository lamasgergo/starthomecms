Ext.define('Tscrm.store.Districts', {
    extend  : 'Ext.data.Store',
    alias: 'store.Districts',
    requires : [
        'Tscrm.model.Districts'
    ],
    autoLoad: false,
    storeId : 'Districts',
    model   : 'Tscrm.model.Districts',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/districts/index.json',         
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
