/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.districts.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Districts',
        'Tscrm.store.Cities'
    ],
    alias: 'viewmodel.districtsModel',
    data : {
        rec : null
    },
    stores: { 
        districtsList: {
            type: 'Districts'
        },
        cityList: {
            type: 'Cities'
        }
    } 
});