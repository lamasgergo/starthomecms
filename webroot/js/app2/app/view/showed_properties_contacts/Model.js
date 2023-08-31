/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.showed_properties_contacts.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Contacts'
    ],
    alias: 'viewmodel.showedPropertiesContactsModel',
    data : {
        rec : null
    },
    stores: { 
      contactsList: {
            type: 'Contacts'
      },
      propertiesList: {
            type: 'Properties'
      },
      contactData:{
            type: 'ContactsView'    
      },      
    } 
    //TODO - add data, formulas and/or methods to support your view
});
