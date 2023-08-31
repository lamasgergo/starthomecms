/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.layouts.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Layouts'
    ],
    alias: 'viewmodel.layoutsModel',
    data : {
        rec : null
    },
    stores: { 
      layoutsList: {
            type: 'Layouts'
      }         
    }
});