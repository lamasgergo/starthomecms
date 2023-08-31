Ext.define('Tscrm.store.Cities', {
    extend  : 'Ext.data.Store',
    alias: 'store.Cities',
    requires : [
        'Tscrm.model.Cities'
    ],
    autoLoad: false,
    storeId : 'Cities',
    model   : 'Tscrm.model.Cities',
    remoteSort : true,
    remoteFilter : true,
    proxy: {
        type: 'ajax',
        url: '/admin/cities/index.json',         
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
