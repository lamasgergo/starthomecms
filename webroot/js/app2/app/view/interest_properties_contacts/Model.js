/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.interest_properties_contacts.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Contacts'
    ],
    alias: 'viewmodel.interestPropertiesContactsModel',
    data : {
        rec : null
    },
    stores: { 
      contactsList: {
            type: 'Contacts'
      },
      contactData:{
            type: 'ContactsView'    
      },       
      propertiesView: {
            type: 'PropertiesView'
      },
      propertiesSelect: {
            type: 'Properties',
            proxy:{
                extraParams: {
                    selector: true
                }
            }
      },
      contactsSelect: {
           type: 'Contacts',
            proxy:{
                extraParams: {
                    selector: true
                }
            }
      }            
    } 
    //TODO - add data, formulas and/or methods to support your view
});