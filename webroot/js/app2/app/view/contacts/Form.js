Ext.define('Tscrm.view.contacts.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactsForm',
    requires : [
        'Tscrm.view.contacts.Controller'
    ],  
    controller: 'contactsController' ,    
    title: 'Kapcsolat',
    width: 1000,
    height: 660,
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: true,
    resizable:true,   
    layout: 'fit',
    listeners:{
        close: 'closeWin'     
    },    
    viewModel: {
        type: 'contactsModel'
    }, 
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    items:[ 
        {
            xtype: 'form',
            url: '/admin/contacts/add.json',
            reference: 'contactsForm',
            layout: 'column',
            items: [
                {
                    columnWidth: .5,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Ingatlanhoz rögzítés',
                            reference: 'addContact',
                            hidden:true,
                            margin: '10 10 0 0',
                            defaults: {
                                anchor: '100%'
                            },
                            items:[
                                {
                                    fieldLabel: 'Ingatlan',
                                    name: 'property_id',
                                    xtype: 'combobox',
                                    allowBlank: true,
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{ownPropertiesList}'
                                    }, 
                                    typeAhead: false,
                                    displayField: 'name',
                                    valueField: 'id'    
                                },{
                                    fieldLabel: 'Típus',
                                    name: 'type_id',
                                    xtype: 'combobox',
                                    allowBlank: true,
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsContactPropertyType}'
                                    }, 
                                    typeAhead: false,
                                    displayField: 'name',
                                    valueField: 'val'    
                                }
                                
                            ]
                        },{
                            xtype: 'fieldset',
                            title: 'Személyes adatok',
                            margin: '10 10 0 0',
                            defaults: {
                                anchor: '100%'
                            },
                            defaultType: 'textfield',                                
                            items:[
                                {
                                    xtype:'hidden',
                                    name: 'id'
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Név',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    items: [{
                                        name: 'prename',
                                        xtype: 'combobox',
                                        flex: 1,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsPrenameType}'
                                        },
                                        typeAhead: true,
                                        displayField: 'name',
                                        valueField: 'val'

                                    }, {
                                        emptyText: 'Vezetéknév',
                                        name: 'lastname',
                                        flex: 2,
                                        margin: '0 0 0 6'
                                    }, {
                                        emptyText: 'Keresztnév',
                                        name: 'firstname',
                                        flex: 2,
                                        margin: '0 0 0 6'
                                    }]
                                
                                },
                                {
                                    fieldLabel: 'Cég',
                                    name: 'company_id',
                                    reference: 'company',
                                    xtype: 'combobox',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{companiesList}'
                                    },
                                    typeAhead: false,
                                    displayField: 'name',
                                    valueField: 'id',
                                    minChars: 2
                                },{
                                    fieldLabel: 'Titulus',
                                    name: 'title'    
                                },{
                                    fieldLabel: 'Foglalkozás',
                                    name: 'job'    
                                },{
                                    fieldLabel: 'Gyerekek száma',
                                    name: 'kids',
                                    xtype: 'numberfield'    
                                },{
                                    fieldLabel: 'Családi állapot',
                                    name: 'marial_status',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsMarialStatusType}'
                                    },
                                    typeAhead: false,
                                    displayField: 'name',
                                    valueField: 'val',
                                    xtype: 'combobox'  
                                },{
                                    fieldLabel: 'Nemzetiség',
                                    name: 'nationality',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsNationalityType}'
                                    },
                                    typeAhead: true,
                                    displayField: 'name',
                                    valueField: 'val',
                                    xtype: 'combobox'  
                                },{
                                    fieldLabel: 'Háziállat',
                                    name: 'pet',
                                    xtype: 'checkbox'    
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Belső adatok',
                            defaultType: 'textfield',
                            margin: '10 10 0 0',
                            defaults: {
                                anchor: '100%'
                            },

                            items: [
                                {
                                    fieldLabel: 'Státusz',
                                    name: 'contact_status',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsContactStatus}'
                                    },
                                    typeAhead: true,
                                    displayField: 'name',
                                    valueField: 'val',
                                    xtype: 'combobox'
                                },
                                {
                                fieldLabel: 'Belső kapcsolattartó',   
                                name: 'users[]',                                     
                                xtype: 'tagfield',
                                itemId: 'users',
                                queryMode: 'remote',
                                bind: {
                                    store: '{usersList}'
                                },
                                displayField: 'username',
                                valueField: 'id',
                                publishes: 'id',
                                valueParam: 'ids'
                            }, {
                                fieldLabel: 'Megjegyzés',
                                name: 'note',
                                xtype: 'textarea'
                            },{ 
                                fieldLabel: 'Relokációs kapcsolat',
                                name: 'internal_company_id',
                                reference: 'internal_company',
                                xtype: 'combobox',
                                queryMode: 'remote',
                                bind: {
                                    store: '{internalCompaniesList}'
                                }, 
                                typeAhead: false,
                                displayField: 'name',
                                valueField: 'id',
                                minChars: 2,
                                listeners:{
                                    select: 'onSelectCompany'
                                }  
                            },{
                                fieldLabel: 'Relokációs ügynök',
                                name: 'internal_agent',
                                reference: 'internal_agent',
                                xtype: 'combobox',
                                queryMode: 'remote',
                                minChars: 2,
                                bind: {
                                    store: '{internalContactsList}'
                                }, 
                                typeAhead: false,
                                displayField: 'fullname',
                                valueField: 'id'                                 
                            }]
                        }
                    ]   
                },{
 
                    columnWidth: .5,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Kapcsolat adatok',
                            margin: '10 10 0 0',
                            defaults: {
                                anchor: '100%'
                            },
                            defaultType: 'textfield',
                            items:[
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 1',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },                                        
                                    items: [{

                                        allowBlank: false,
                                        fieldLabel: 'Típus',
                                        name: 'phone1type',
                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,                                            
                                        xtype: 'combobox',
                                        listeners:{
                                            change: 'changeTpl'
                                        }
                                    }, {
                                        name: 'phone1',
                                        fieldLabel: 'Telefonszám',
                                        allowBlank: true,                                            
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        xtype  : 'ux-phonefield',  
                                        tplValue     : '(__) __ / ___-____',  
                                        leftValue    : '36',
                                        leftReadOnly : true,                                            
                                    }]
                                },{
                                    fieldLabel: 'Megjegyzés',
                                    name: 'phone1note' 
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 2',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [{

                                        allowBlank: false,
                                        fieldLabel: 'Típus',
                                        name: 'phone2type',
                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,
                                        xtype: 'combobox',
                                        listeners:{
                                            change: 'changeTpl'
                                        }
                                    }, {
                                        name: 'phone2',
                                        fieldLabel: 'Telefonszám',
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        xtype  : 'ux-phonefield',  
                                        tplValue     : '(__) __ / ___-____',  
                                        leftValue    : '36',
                                        leftReadOnly : true,
                                        allowBlank: true
                                    }]
                                },{
                                    fieldLabel: 'Megjegyzés',
                                    name: 'phone2note'    
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 3',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [{

                                        allowBlank: false,
                                        fieldLabel: 'Típus',
                                        name: 'phone3type',
                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,
                                        xtype: 'combobox',
                                        listeners:{
                                            change: 'changeTpl'
                                        }
                                    }, {
                                        name: 'phone3',
                                        fieldLabel: 'Telefonszám',
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        xtype  : 'ux-phonefield',  
                                        tplValue     : '(__) __ / ___-____',  
                                        leftValue    : '36',
                                        leftReadOnly : true,  
                                        allowBlank: true, 
                                    }]
                                },{
                                    fieldLabel: 'Megjegyzés',
                                    name: 'phone3note'    
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 4',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [{

                                        allowBlank: false,
                                        fieldLabel: 'Típus',
                                        name: 'phone4type',
                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,
                                        xtype: 'combobox',
                                        listeners:{
                                            change: 'changeTpl'
                                        }
                                    }, {
                                        name: 'phone4',
                                        fieldLabel: 'Telefonszám',
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        xtype  : 'ux-phonefield',  
                                        tplValue     : '(__) __ / ___-____',  
                                        leftValue    : '36',
                                        leftReadOnly : true,  
                                        allowBlank: true, 
                                    }]
                                },{
                                    fieldLabel: 'Megjegyzés',
                                    name: 'phone4note'    
                                },{
                                    fieldLabel: 'Email',
                                    name: 'email1',
                                    inputType: 'email'    
                                },{
                                    fieldLabel: 'Email 2',
                                    name: 'email2',
                                    inputType: 'email'    
                                },{
                                    fieldLabel: 'Email 3',
                                    name: 'email3',
                                    inputType: 'email'
                                },{
                                    fieldLabel: 'Email 4',
                                    name: 'email4',
                                    inputType: 'email'
                                }
                            ]
                        },{
                            xtype: 'fieldset',
                            title: 'Számlázási adatok',
                            margin: '10 10 0 0',
                            defaults: {
                                anchor: '100%'
                            },
                            defaultType: 'textfield',
                            items:[
                                {
                                    fieldLabel: 'Cégnév',
                                    name: 'billing_name' 
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Cím',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },                                        
                                    items: [{
                                        name: 'billing_zip',
                                        flex: 1,
                                        emptyText: 'Irsz.'
                                    }, {
                                        name: 'billing_city',
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        emptyText: 'Település'
                                    },{
                                        name: 'billing_street',
                                        flex: 3,
                                        margin: '0 0 0 6',
                                        emptyText: 'Utca, hsz'
                                    }]
                                },{
                                    fieldLabel: 'Adószám',
                                    name: 'billing_taxnumber' 
                                }
                            ]
                        },{
                            xtype: 'fieldset',
                            title: 'Postázási adatok',
                            margin: '10 10 0 0',
                            defaults: {
                                anchor: '100%'
                            },
                            defaultType: 'textfield',
                            items:[
                                {
                                    fieldLabel: 'Címzett',
                                    name: 'postal_name' 
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Cím',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },                                        
                                    items: [{
                                        name: 'postal_zip',
                                        flex: 1,
                                        emptyText: 'Irsz.'
                                    }, {
                                        name: 'postal_city',
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        emptyText: 'Település'
                                    },{
                                        name: 'postal_street',
                                        flex: 3,
                                        margin: '0 0 0 6',
                                        emptyText: 'Utca, hsz'
                                    }]
                                }
                            ]
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
        