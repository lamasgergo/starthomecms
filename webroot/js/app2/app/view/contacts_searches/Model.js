/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.contacts_searches.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.ContactsSearches'
    ],
    alias: 'viewmodel.contactsSearchesModel',
    data : {
        rec : null
    },
    stores: {
        contacts: {
            type: 'Contacts'
        },
        requestsList: {
            type: 'ContactsSearches'
        },
        contactsSearchesView:{
            type: 'ContactsSearchesView'
        },
        contactData:{
            type: 'ContactsView'
        },
        citiesList: {
            type: 'Cities'
        },
        districtsList: {
            type: 'Districts'
        },
        staticsBuildingType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'building_type'
                }
            }
        },
        staticsPoolType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'pool_type'
                }
            }
        },
        staticsFurnitureType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'furniture_type'
                }
            }
        },
        staticsParkingType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'parking_type_search'
                }
            }
        },
        internalCompaniesList: {
            type: 'Companies',
            proxy:{
                extraParams: {
                    type: '2'
                }
            }
        },
        internalContactsList: {
                type: 'Contacts',
                proxy:{
                    extraParams: {
                        company_type: '2'
                    }
                }
        },
        contactsList: {
                type: 'Contacts'
        },
        usersList: {
            type: 'Users'
        },
    } 
    //TODO - add data, formulas and/or methods to support your view
});