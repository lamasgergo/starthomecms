/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Tscrm.view.__TABLEIZE__.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Tscrm.store.__CLASSNAME__'
    ],
    alias: 'viewmodel.__LCFIRST__Model',
    data : {
        rec : null
    },
    stores: { 
        __LCFIRST__List: {
            type: '__CLASSNAME__'
        }
    } 
});