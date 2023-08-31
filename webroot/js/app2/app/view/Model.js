Ext.define('Tscrm.view.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Properties',
        'Tscrm.store.Contacts',
        'Tscrm.store.Calendars',
        'Tscrm.store.UsersDashboard',
    ],
    alias: 'viewmodel.viewportModel',
    data : {
        rec : null
    },
    
    stores: { 
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
      },
        searchesSelect: {
            type: 'ContactsSearches',
            proxy:{
                extraParams: {
                    selector: true
                }
            }
        },
      calendar: {
           type: 'Calendars',
          proxy:{
              extraParams: {
                  dashboard: true,
                  limit:5,
                  sort: 'date',
                  direction: 'desc'
              }
          }
      },
      dashboard: {
           type: 'UsersDashboard'
      } 
         
    }
});