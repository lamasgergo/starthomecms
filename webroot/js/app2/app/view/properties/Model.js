/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.properties.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Properties'
    ],
    alias: 'viewmodel.propertiesModel',
    data : {
        rec : null
    },
    stores: {
        propertiesList: {
            type: 'Properties'
        },
        propertiesTodoList: {
            type: 'Properties'
        },
        propertiesView: {
            type: 'PropertiesView'
        },
        citiesList: {
            type: 'Cities'
        },
        districtsList: {
            type: 'Districts'
        },
        streetsList: {
            type: 'Streets'
        },
        citypartsList: {
            type: 'Cityparts'
        },
        usersList: {
            type: 'Users'
        },
        staticsBuildingType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'building_type'
                }
            }
        },
        staticsHeatType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'heat_type'
                }
            }
        },
        staticsPanoramaType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'panorama_type'
                }
            }
        },
        staticsEnergyRatingType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'energy_rating_type'
                }
            }
        },
        staticsRatingType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'rating_type'
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
        staticsConveniencesType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'conveniences_type'
                }
            }
        },
        staticsBuildingConditionType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'building_condition_type'
                }
            }
        },
        staticsParkingType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'parking_type'
                }
            }
        },
        staticsParkingTypeSearch: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'parking_type_search'
                }
            }
        },
        staticsCautionType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'caution_type'
                }
            }
        },
        valutaType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'valuta_type'
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
        staticsTerraceType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'terrace_type'
                }
            }
        },
        active: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'active'
                }
            }
        },
        price_type: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'price_type'
                }
            }
        },
        publicImagesList: {
            type: 'Images',
            proxy:{
                extraParams: {
                    active: 1
                }
            }
        },
        privateImagesList: {
            type: 'Images',
            proxy:{
                extraParams: {
                    active: 0
                }
            }
        },
        documentsList: {
            type: 'Documents'
        },

        staticsDocumentType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'document_type'
                }
            }
        },
        documentsView: {
            type: 'DocumentsView'
        },

        layoutsList: {
            type: 'Layouts'
        },
        layoutsView: {
            type: 'LayoutsView'
        },
        contactsList: {
            type: 'PropertiesContacts'
        },
        contacts: {
            type: 'Contacts'
        },
        events: {
            type: 'Events'
        } ,
        eventsView: {
            type: 'Events'
        },
        interestContactsList:{
            type: 'InterestPropertiesContacts'
        },
        sentContactsList: {
            type: 'SentPropertiesContacts'
        },
        searchContactsList: {
            type: 'ContactsSearches'
        },
        companiesList: {
            type: 'Companies',
            proxy:{
                extraParams: {
                    type: '1'
                }
            }
        },
        companiesList2: {
            type: 'Companies',
            proxy:{
                extraParams: {
                    type: '1'
                }
            }
        }
       
       
    } 
    //TODO - add data, formulas and/or methods to support your view
});