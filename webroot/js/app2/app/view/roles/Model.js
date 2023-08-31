/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.roles.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Roles'
    ],
    alias: 'viewmodel.rolesModel',
    data : {
        rec : null
    },
    stores: { 
      rolesList: {
            type: 'Roles'
        }
    } 
    //TODO - add data, formulas and/or methods to support your view
});