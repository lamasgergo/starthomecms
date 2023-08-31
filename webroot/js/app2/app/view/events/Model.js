/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.events.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Events'
    ],
    alias: 'viewmodel.eventsModel',
    data : {
        rec : null
    },
    stores: { 
      eventsList: {
            type: 'Events'
        },
      staticsEventType: {
            type: 'Statics',
            proxy:{
                extraParams: {
                    type: 'event_type'
                }
            }
      },
      usersList: {
            type: 'Users'
      }         
    } 
});