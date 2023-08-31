/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.images.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Images'
    ],
    alias: 'viewmodel.imagesModel',
    data : {
        rec : null
    },
    stores: { 
      imagesList: {
            type: 'Images'
      }         
    }
});