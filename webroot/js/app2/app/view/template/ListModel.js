/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.template.ListModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Template'
    ],
    alias: 'viewmodel.list',
    data : {
        rec : null
    },
    stores: { 
      templateList: {
            type: 'Template'
        }/*{
            autoLoad: true,
            storeId : 'Template',
            model   : 'Tscrm.model.Template',
            remoteSort : true,
            remoteFilter : true,
            proxy: {
                type: 'ajax',
                url: 'http://tscrm.hu/articles.json',         
                reader: {
                    type: 'json',
                    rootProperty: 'datas',
                    totalProperty: 'total'
                }
             }
      } */
    } 
    //TODO - add data, formulas and/or methods to support your view
});