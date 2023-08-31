/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.streets.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Streets',
        'Tscrm.store.Cityparts',
        'Tscrm.store.Cities',
        'Tscrm.store.Districts'        
    ],
    alias: 'viewmodel.streetsModel',
    data : {
        rec : null
    },
    stores: { 
        streetsList: {
            type: 'Streets'
        },
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