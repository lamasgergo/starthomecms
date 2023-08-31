Ext.define('Tscrm.view.users.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.usersLogin',
    xtype: 'usersLogin',
    controller: 'usersController' ,    
    title: 'Bejelentkezés',
    width: 300,
    height: 180,
    closable: false,
    closeAction: 'hide',
    constrain: true,
    maximizable: false,
    resizable:false,
    modal:true,   
    layout: 'fit', 
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },    
    viewModel: {
        type: 'usersModel'
    },    
    items:[ 
        {
            xtype: 'form',
            url: '/admin/users/login.json',
            reference: 'usersLogin',
            defaults: {
                anchor: '100%'
            },
            items: [ 
                {
                    name: 'username',
                    xtype:'textfield',
                    fieldLabel: 'Felhasználónév', 
                    allowBlank: false
                },{
                    name: 'password',
                    xtype:'textfield',
                    fieldLabel: 'Jelszó',
                    inputType: 'password'
                }
            ]
        }
    ],
    buttons: [{
        text: 'Bejelentkezés',
        handler: 'onLogin'
    }]
});
        