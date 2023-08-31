Ext.define('Tscrm.controller.Users', {
    extend: 'Ext.app.Controller',  
    views: [
        'users.List',    
        'users.Form',
        'users.View',
        'users.Login'
    ],
    stores: [
        'Users',
        'UsersView',
        'UsersDashboard'
    ],    
    init: function() {
        console.log('Users modul initialized...');
    }   
});    