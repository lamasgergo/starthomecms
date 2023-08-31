Ext.define('Tscrm.controller.Roles', {
    extend: 'Ext.app.Controller',  
    views: [
        'roles.List',    
        'roles.Form',
        'roles.View'
    ],
    stores: [
        'Roles',
        'RolesView'
    ],    
    init: function() {
        console.log('Roles modul initialized...');
    }   
});    