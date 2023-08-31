/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.cities.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Cities'
    ],
    alias: 'viewmodel.citiesModel',
    data : {
        rec : null
    },
    stores: { 
      citiesList: {
            type: 'Cities'
        }
    } 
});