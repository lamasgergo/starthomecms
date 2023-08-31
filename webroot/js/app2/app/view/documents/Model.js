/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.documents.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Documents'
    ],    
    alias: 'viewmodel.documentsModel',
    data : {
        rec : null
    },
    stores: { 
        
      staticsDocumentType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'document_type'
                }
            }
      }  
    }
});        