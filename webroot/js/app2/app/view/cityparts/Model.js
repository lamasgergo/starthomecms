/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.cityparts.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Cityparts',
        'Tscrm.store.Cities',
        'Tscrm.store.Districts'
    ],
    alias: 'viewmodel.citypartsModel',
    data : {
        rec : null
    },
    stores: { 
        citypartsList: {
            type: 'Cityparts'
        },
        cityList: {
            type: 'Cities'
        },
        districtList: {
            type: 'Districts'
        }        
    } 
});