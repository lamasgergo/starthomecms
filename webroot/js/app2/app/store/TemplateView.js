Ext.define('Tscrm.store.TemplateView', {
    extend  : 'Ext.data.Store',

    requires : [
        'Tscrm.model.Template'
    ],
    autoLoad: false,
    storeId : 'TemplateView',
    model   : 'Tscrm.model.Template',
    proxy: {
        type: 'ajax',
        url: 'http://tscrm.hu/articles/view.json',         
        reader: {
            type: 'json',
            rootProperty: 'datas'
        }
     }
});