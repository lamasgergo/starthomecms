/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.rented_properties_contacts.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Contacts'
    ],
    alias: 'viewmodel.rentedPropertiesContactsModel',
    data : {
        rec : null
    },
    stores: { 

        staticsContactStatus: {
            type: 'Statics',
            proxy: {
                extraParams: {
                    type: 'contact_status'
                }
            }
        }
    } 
    //TODO - add data, formulas and/or methods to support your view
});
