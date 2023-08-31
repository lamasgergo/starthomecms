/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.users.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.Users'
    ],
    alias: 'viewmodel.usersModel',
    data : {
        rec : null
    },
    stores: { 
      usersList: {
            type: 'Users'
      }, 
      usersView: {
            type: 'UsersView'
      },
      rolesList: {
            type: 'Roles'
      } 
    } 
    //TODO - add data, formulas and/or methods to support your view
});