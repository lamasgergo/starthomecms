Ext.define('Tscrm.view.users.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.usersForm',
    xtype: 'usersForm',
    controller: 'usersController' ,    
    title: 'Felhasználó',
    width: 500,
    height: 400,
    closable: true,
    closeAction: 'hide',
    constrain: true,
    maximizable: true,
    resizable:true,   
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
            url: '/admin/users/add.json',
            reference: 'usersForm',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Felhasználói adatok',
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },

                    items: [
                        {
                            xtype:'hidden',
                            name: 'id'
                        },{
                            name: 'username',
                            xtype:'textfield',
                            fieldLabel: 'Felhasználónév', 
                            allowBlank: false
                        },{
                            name: 'password',
                            xtype:'textfield',
                            fieldLabel: 'Jelszó',
                           /* inputType: 'password'*/
                        }, {
                            name: 'role_id',
                            xtype: 'combobox',
                            fieldLabel: 'Csoport',
                            allowBlank: false,
                            queryMode: 'remote',
                            bind: {
                                store: '{rolesList}'
                            }, 
                            typeAhead: false,
                            displayField: 'name',
                            valueField: 'id' 
                        }, {
                            name: 'active',
                            xtype: 'combobox',
                            fieldLabel: 'Státusz',
                            allowBlank: false,
                            queryMode: 'local',
                            store: active,
                            typeAhead: false,
                            displayField: 'name',
                            valueField: 'val'
                            
                        }
                    ]
                },{
                    xtype: 'fieldset',
                    title: 'Személyes adatok',
                    defaultType: 'textfield',
                    margin: '10 0',
                    defaults: {
                        anchor: '100%'
                    },

                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Név',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [
                                {
                                    name: 'lastname',
                                    fieldLabel: 'Vezetéknév',
                                    flex: 1,
                                    emptyText: 'Vezetéknév'
                                }, {
                                    name: 'firstname',
                                    fieldLabel: 'Keresztnév',
                                    flex: 1,
                                    margin: '0 0 0 6',
                                    emptyText: 'Keresztnév'
                                }
                            ]
                        },{
                            xtype:'textfield',
                            fieldLabel: 'Email cím',
                            name: 'email',
                            allowBlank: true,
                            inputType: 'email'
                        },{
                            xtype:'textfield',
                            fieldLabel: 'Telefonszám',
                            name: 'phone',
                            allowBlank: true
                        },{
                            xtype:'textfield',
                            fieldLabel: 'kÉP',
                            name: 'picture',
                            allowBlank: true
                        }
                    ]
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
        