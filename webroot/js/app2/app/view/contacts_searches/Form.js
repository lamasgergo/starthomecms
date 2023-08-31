Ext.define('Tscrm.view.contacts_searches.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertiesContactSearchForm',
    requires : [
        'Tscrm.view.contacts_searches.Controller',
        'Tscrm.view.contacts_searches.Model'
    ],  
    viewModel: {
        type: 'contactsSearchesModel'
    },          
    controller: 'contactsSearchesController' ,    
    title: 'Keresési igény mentése',
    width: 1000,
    height: 600,
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: false,
    resizable:false,
    scrollable: 'vertical',
    containerScroll: true,
    listeners:{
        show: 'reloadGrid'
    },
    items:[
        {
            xtype: 'panel',
            bodyPadding: 0,

            items: [
                {
                    xtype: 'panel',
                    title: 'Ügyfél adatbázis keresés',
                    collapsible: true,
                    height:270,
                    split:false,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    region: 'north',
                    items: [
                        {
                            flex: 1,
                            margin: 0,
                            items:[
                                {
                                    xtype: 'form',
                                    reference: 'searchForm',
                                    fieldDefaults: {
                                        labelAlign: 'left'
                                    },

                                    defaults: {
                                        anchor: '100%'

                                    },
                                    items: [{
                                        xtype: 'fieldset',
                                        border: false,
                                        layout: 'column',
                                        margin: 0,
                                        padding:  '0 5',
                                        fieldDefaults: {
                                            labelAlign: 'top',
                                            margin:'0 5 0 0'
                                        },
                                        items: [{
                                            columnWidth: .1,
                                            name: 'id',
                                            fieldLabel: '#',
                                            xtype: 'textfield',
                                            listeners: {
                                                specialkey: 'onSearch'
                                            }
                                        },{
                                            columnWidth: .20,
                                            name: 'internal_company',
                                            fieldLabel: 'Cég',
                                            xtype: 'textfield',
                                            listeners: {
                                                specialkey: 'onSearch'
                                            }
                                        }, {
                                            columnWidth: .25,
                                            name: 'internal_agent',
                                            fieldLabel: 'Ügynök',
                                            xtype: 'textfield',
                                            listeners: {
                                                specialkey: 'onSearch'
                                            }
                                        }, {
                                            columnWidth: .25,
                                            name: 'name',
                                            fieldLabel: 'Név',
                                            xtype: 'textfield',
                                            listeners: {
                                                specialkey: 'onSearch'
                                            }
                                        },{
                                            columnWidth: .20,
                                            fieldLabel: 'Felvette',
                                            name: 'user_id[]',
                                            xtype: 'combobox',
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{usersList}'
                                            },
                                            displayField: 'username',
                                            valueField: 'id',
                                            publishes: 'id',
                                            valueParam: 'ids',
                                            maxWidth:200,
                                            listeners: {
                                                collapse: 'onSearch',
                                                render: function() {
                                                    this.labelEl.dom.removeAttribute('for');
                                                }
                                            }
                                        }, {
                                            columnWidth: .1,
                                            margin:'25 0 15 0',
                                            text: 'Keres',
                                            xtype: 'button',
                                            listeners: {
                                                click: 'onSearch'
                                            }
                                        }]

                                    }]
                                }
                            ]
                        },
                        {
                            flex: 2,
                            margin: '0 0 10 0',
                            items:[
                                {
                                    xtype: 'gridpanel',
                                    bind: {
                                        store: '{contactsList}'
                                    },
                                    reference: 'contactsGrid',
                                    autoScroll:true,
                                    loadMask: true,
                                    scroll:true,
                                    height: 150,
                                    columns: [
                                        {
                                            text: '#',
                                            dataIndex: 'id',
                                            flex: 1
                                        },
                                        {
                                            text: 'Név',
                                            dataIndex: 'fullname',
                                            flex: 2,
                                            renderer: function(value,row,data){
                                                ret = (value == ' '?'Nincs név':value);
                                                if(data.get('user_list')){
                                                    ret += '<br><small>'+data.get('user_list')+'</small>' ;
                                                }
                                                return ret;

                                            }
                                        },{
                                            text: 'Telefonszám',
                                            dataIndex: 'phone1_formatted',
                                            flex: 2

                                        },{
                                            text: 'Telefonszám2',
                                            dataIndex: 'phone2_formatted',
                                            hidden: true
                                        }, {
                                            text: 'Email',
                                            dataIndex: 'email1',
                                            flex: 1

                                        }, {
                                            text: 'Relokációs cég',
                                            dataIndex: 'internal_company',
                                            flex: 1

                                        }, {
                                            text: 'Utolsó esemény',
                                            dataIndex: 'lastevent',
                                            renderer: Ext.util.Format.dateRenderer('Y-m-d')

                                        }, {
                                            text: 'Létrehozva',
                                            dataIndex: 'created',
                                            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                            hidden:true

                                        }, {
                                            xtype:'actioncolumn',
                                            width:50,
                                            items: [{
                                                iconCls: 'action selectRow',
                                                tooltip: 'Kiválaszt',
                                                handler: 'onSelect'
                                            }]
                                        }
                                    ],
                                    listeners: {
                                        rowdblclick: 'onRowDblClick'
                                    }

                                }
                            ]
                        }
                    ]
                },

                {
                    xtype: 'form',
                    url: '/admin/contacts_searches/add.json',
                    reference: 'contactSearchForm',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    region: 'center',
                    items: [
                        {
                            flex: 1,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Kapcsolattartó adatai',
                                    margin: '10 10 10 10',
                                    defaults: {
                                        labelWidth:150,
                                        anchor: '100%'
                                    },
                                    defaultType: 'textfield',
                                    items:[
                                        {
                                            xtype:'hidden',
                                            name: 'id'
                                        },{
                                            xtype:'combobox',
                                            fieldLabel: 'Ügyfél',
                                            name: 'contact[id]',
                                            reference: 'contact_id',
                                            listeners: {
                                                select: 'savedContact'
                                            },
                                            bind: {
                                                store: '{contacts}'
                                            },
                                            queryMode: 'remote',
                                            //store: 'Contacts',
                                            typeAhead: true,
                                            minChars: 2,
                                            displayField: 'fullname',
                                            valueField: 'id',
                                            tpl:'<tpl for="."><div class="x-boundlist-item x-combo-list-item fast-search-property" ><b>{fullname}</b><br>{phone1}<div class="clearfix"></div></div></tpl>'
                                        },{
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Név',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'textfield',
                                            items: [{
                                                name: 'contact[prename]',
                                                xtype: 'combobox',
                                                flex: 1,
                                                queryMode: 'remote',
                                                store:prenames,
                                                typeAhead: true,
                                                displayField: 'name',
                                                valueField: 'val'

                                            }, {
                                                emptyText: 'Vezetéknév',
                                                name: 'contact[lastname]',
                                                flex: 2,
                                                margin: '0 0 0 6'
                                            }, {
                                                emptyText: 'Keresztnév',
                                                name: 'contact[firstname]',
                                                flex: 2,
                                                margin: '0 0 0 6'
                                            }]

                                        },{
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
                                                name: 'contact[phone1type]',
                                                queryMode: 'local',
                                                store: phonetypes,
                                                editable: false,
                                                displayField: 'name',
                                                valueField: 'val',
                                                value: 1,
                                                flex: 2,
                                                xtype: 'combobox',
                                                listeners:{
                                                    select: 'changeTpl',
                                                    change: 'changeTpl'
                                                }
                                            }, {
                                                name: 'contact[phone1]',
                                                fieldLabel: 'Telefonszám',
                                                allowBlank: true,
                                                xtype  : 'ux-phonefield',
                                                tplValue     : '(__) __ / ___-____',
                                                leftValue    : '36',
                                                leftReadOnly : true,
                                                flex: 3,
                                                margin: '0 0 0 6'
                                            }
                                            ]
                                        },{
                                            fieldLabel: 'Telszám megjegyz.',
                                            name: 'contact[phone1note]'
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
                                                name: 'contact[phone2type]',
                                                queryMode: 'local',
                                                store: phonetypes,
                                                editable: false,
                                                displayField: 'name',
                                                valueField: 'val',
                                                value: 1,
                                                flex: 2,
                                                xtype: 'combobox',
                                                listeners:{
                                                    select: 'changeTpl',
                                                    change: 'changeTpl'
                                                }
                                            }, {
                                                name: 'contact[phone2]',
                                                fieldLabel: 'Telefonszám',
                                                allowBlank: true,
                                                xtype  : 'ux-phonefield',
                                                tplValue     : '(__) __ / ___-____',
                                                leftValue    : '36',
                                                leftReadOnly : true,
                                                flex: 3,
                                                margin: '0 0 0 6'
                                            }
                                            ]
                                        },{
                                            fieldLabel: 'Telszám megjegyz.',
                                            name: 'contact[phone2note]'
                                        },{
                                            fieldLabel: 'Email',
                                            name: 'contact[email1]',
                                            inputType: 'email'
                                        },{
                                            fieldLabel: 'Foglalkozás',
                                            name: 'contact[job]'
                                        },{
                                            fieldLabel: 'Gyerekek száma',
                                            name: 'contact[kids]',
                                            xtype: 'numberfield'
                                        }, {
                                            fieldLabel: 'Belső megjegyz.',
                                            name: 'contact[note]',
                                            xtype: 'textarea'
                                        },{
                                            fieldLabel: 'Relokációs kapcsolat',
                                            name: 'contact[internal_company_id]',
                                            reference: 'internal_company',
                                            xtype: 'combobox',
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{internalCompaniesList}'
                                            },
                                            typeAhead: false,
                                            displayField: 'name',
                                            valueField: 'id',
                                            listeners:{
                                                select: 'onSelectCompany'
                                            }
                                        },{
                                            fieldLabel: 'Relokációs ügynök',
                                            name: 'contact[internal_agent]',
                                            reference: 'internal_agent',
                                            xtype: 'combobox',
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{internalContactsList}'
                                            },
                                            typeAhead: false,
                                            displayField: 'fullname',
                                            valueField: 'id'
                                        }
                                    ]
                                },{
                                    items: [{
                                        xtype: 'fieldset',
                                        title: 'Kiajánlott lakások',
                                        margin: '10 10 10 10',
                                        defaults: {
                                            anchor: '100%'
                                        },
                                        items: [
                                            {
                                                xtype:'hidden',
                                                name: 'selected_properties',
                                                reference: 'selected_properties_id',
                                            },
                                            {
                                                xtype: 'panel',
                                                reference: 'selected_properties',
                                                style: {'padding':'20px;'},
                                                html: ''
                                            }
                                        ]
                                    }]
                                }
                            ]
                        },{

                            flex: 1,
                            items: [{
                                xtype: 'fieldset',
                                title: 'Keresés adatai',
                                margin: '10 10 10 10',
                                defaults: {
                                    anchor: '100%'
                                },
                                fieldDefaults: {
                                    labelAlign: 'left',
                                },
                                bodyPadding:10,
                                defaultType: 'checkbox',
                                items: [{
                                    name: 'type[1]',
                                    fieldLabel: 'Kiadó',
                                    inputValue: '1',
                                    uncheckedValue: ''
                                }, {
                                    name: 'type[2]',
                                    fieldLabel: 'Eladó',
                                    inputValue: '2',
                                    uncheckedValue: ''
                                },{
                                    fieldLabel: 'Település',
                                    name: 'city_id[]',
                                    xtype: 'tagfield',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{citiesList}'
                                    },
                                    typeAhead: true,
                                    displayField: 'city',
                                    valueField: 'id',
                                    minChars:1

                                },{
                                    fieldLabel: 'Kerület',
                                    name: 'district_id[]',
                                    xtype: 'tagfield',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{districtsList}'
                                    },
                                    displayField: 'district',
                                    valueField: 'id',
                                    publishes: 'id',
                                    valueParam: 'ids'
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Ár',
                                    combineErrors: true,
                                    layout: 'column',
                                    defaultType: 'textfield',
                                    items: [{
                                        columnWidth: .5,
                                        name: 'price_from',

                                    }, {
                                        columnWidth: .5,
                                        name: 'price_to',

                                        margin: '0 0 0 6'
                                    }]
                                },{
                                    fieldLabel: 'Típus',
                                    name: 'building_type[]',
                                    xtype: 'tagfield',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsBuildingType}'
                                    },
                                    displayField: 'name',
                                    valueField: 'val',
                                    publishes: 'val',
                                    valueParam: 'vals'
                                },{
                                    fieldLabel: 'Butorozás',
                                    name: 'furniture_type[]',
                                    xtype: 'tagfield',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsFurnitureType}'
                                    },
                                    displayField: 'name',
                                    valueField: 'val',
                                    publishes: 'val',
                                    valueParam: 'vals'
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Hálók száma',
                                    combineErrors: true,
                                    layout: 'column',
                                    defaultType: 'textfield',
                                    items: [{
                                        columnWidth: .5,
                                        name: 'bedroom_from',

                                    }, {
                                        columnWidth: .5,
                                        name: 'bedroom_to',

                                        margin: '0 0 0 6'
                                    }]
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Fürdők száma',
                                    combineErrors: true,
                                    layout: 'column',
                                    defaultType: 'textfield',
                                    items: [{
                                        columnWidth: .5,
                                        name: 'bathroom_from',

                                    }, {
                                        columnWidth: .5,
                                        name: 'bathroom_to',

                                        margin: '0 0 0 6'
                                    }]
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Alapterület',
                                    layout: 'column',
                                    defaultType: 'textfield',
                                    items: [{
                                        columnWidth: .5,
                                        name: 'size_net_from',

                                    }, {
                                        columnWidth: .5,
                                        name: 'size_net_to',

                                        margin: '0 0 0 6'
                                    }]
                                },{
                                    fieldLabel: 'Parkolás, Garázs',
                                    name: 'parking[]',
                                    xtype: 'tagfield',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsParkingType}'
                                    },
                                    displayField: 'name',
                                    valueField: 'val',
                                    publishes: 'val',
                                    valueParam: 'vals'
                                },{
                                    fieldLabel: 'Háziállat',
                                    name: 'petallowed',
                                    xtype: 'checkbox',
                                    labelAlign: 'left',
                                    inputValue: '1',
                                    uncheckedValue: ''
                                },{
                                    fieldLabel: 'Kertkapcsolatos',
                                    name: 'gardencontact',
                                    xtype: 'checkbox',
                                    labelAlign: 'left',
                                    inputValue: '1',
                                    uncheckedValue: ''
                                },{
                                    fieldLabel: 'Földszinti',
                                    name: 'lowerlevel',
                                    xtype: 'checkbox',
                                    labelAlign: 'left',
                                    inputValue: '1',
                                    uncheckedValue: ''
                                },{
                                    fieldLabel: 'Felsőemelet',
                                    name: 'upperlevel',
                                    xtype: 'checkbox',
                                    labelAlign: 'left',
                                    inputValue: '1',
                                    uncheckedValue: ''
                                },{
                                    fieldLabel: 'Rövidtávra is',
                                    name: 'shortterm',
                                    xtype: 'checkbox',
                                    labelAlign: 'left',
                                    inputValue: '1',
                                    uncheckedValue: ''
                                },{
                                    fieldLabel: 'Terasz,erkély',
                                    name: 'terrace',
                                    xtype: 'checkbox',
                                    labelAlign: 'left',
                                    inputValue: '1',
                                    uncheckedValue: ''
                                },{
                                    fieldLabel: 'Medence',
                                    name: 'pool_type[]',
                                    xtype: 'tagfield',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{staticsPoolType}'
                                    },
                                    displayField: 'name',
                                    valueField: 'val',
                                    publishes: 'val',
                                    valueParam: 'vals'
                                }]

                            },{
                                xtype: 'fieldset',
                                title: 'Megjegyzés (Keresési igény levélből)',
                                margin: '10 10 10 10',
                                defaults: {
                                    anchor: '100%'
                                },
                                defaultType: 'textfield',
                                items: [{
                                    fieldLabel: false,
                                    name: 'note',
                                    xtype: 'textarea'
                                }]
                            }]

                        }
                    ]
                }
            ]
            ,
            bbar:[
                '->',
                {
                    xtype: 'button',
                    text: 'Keresés mentése',
                    handler: 'onContactSearchFormSave'
                }]

        }
    ]
});