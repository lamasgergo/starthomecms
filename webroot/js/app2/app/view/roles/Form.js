Ext.define('Tscrm.view.roles.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.rolesForm',
    xtype: 'rolesForm',
    reference: 'rolesFormWindow', 
    controller: 'rolesController' ,    
    title: 'Felhasználói csoport',
    width: 300,
    height: 200,
    closable: true,
    closeAction: 'hide',
    constraint: true,
    maximizable: true,
    resizable:true,   
    layout: 'fit', 
    items:[ 
        {
            xtype: 'form',
            url: '/admin/roles/add.json',
            reference: 'rolesForm',
            defaults: {
                bodyPadding: 10,
                autoScroll: true
            },
            layout: 'form',
            items: [
                {
                    xtype:'hidden',
                    name: 'id'
                }, {
                    xtype:'textfield',
                    fieldLabel: 'Csoport neve',
                    name: 'name',
                    allowBlank: false
                }, {
                    xtype:'textfield',
                    fieldLabel: 'Átirányítás',
                    name: 'login_redirect',
                    allowBlank: true
                }
            ]
        }
    ],
    buttons: [{
        text: 'Mégse',
        handler: 'onFormCancel'    
    },{
        text: 'Mentés',
        handler: 'onFormSave'
    }]
});
        