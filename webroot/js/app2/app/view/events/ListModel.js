/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.events.ListModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Events'
    ],
    alias: 'viewmodel.eventsListModel',
    data : {
        rec : null
    },
    stores: { 
      eventsList: {
            type: 'Events'
        }
    } 
});