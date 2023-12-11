/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.contacts.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Contacts'
    ],
    alias: 'viewmodel.contactsModel',
    data: {
        rec: null
    },
    stores: {
        contactsList: {
            type: 'Contacts'
        },
        contactsView: {
            type: 'ContactsView'
        },
        searchView: {
            type: 'ContactsSearchesView'
        },

        companiesList: {
            type: 'Companies'
        },
        internalCompaniesList: {
            type: 'Companies',
            proxy: {
                extraParams: {
                    type: '2'
                }
            }
        },
        internalContactsList: {
            type: 'Contacts',
            proxy: {
                extraParams: {
                    company_type: '2'
                }
            }
        },
        usersList: {
            type: 'Users'
        },
        sentPropertiesList: {
            type: 'SentPropertiesContacts'
        },
        interestPropertiesList: {
            type: 'InterestPropertiesContacts'
        },
        showedPropertiesList: {
            type: 'ShowedPropertiesContacts'
        },
        ownPropertiesList: {
            type: 'Properties'
        },
        searchesList: {
            type: 'ContactsSearches'
        },
        staticsContactPropertyType: {
            type: 'Statics',
            proxy: {
                extraParams: {
                    type: 'contact_property_type'
                }
            }
        },
        staticsMarialStatusType: {
            type: 'Statics',
            proxy: {
                extraParams: {
                    type: 'marial_status_type'
                }
            }
        },
        staticsNationalityType: {
            type: 'Statics',
            proxy: {
                extraParams: {
                    type: 'nationality_type'
                }
            }
        },
        staticsPrenameType: {
            type: 'Statics',
            proxy: {
                extraParams: {
                    type: 'prename_type'
                }
            }
        },
        staticsContactStatus: {
            type: 'Statics',
            proxy: {
                extraParams: {
                    type: 'contact_status'
                }
            }
        },
        selectPropertiesList: {
            type: 'Properties',
            proxy: {
                extraParams: {
                    selector: true
                }
            }
        },
        events: {
            type: 'Events'
        },
        eventsView: {
            type: 'Events'
        }

    }
    //TODO - add data, formulas and/or methods to support your view
});