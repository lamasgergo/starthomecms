Ext.define('Tscrm.view.properties.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertiesList',
    requires: [
        'Ext.grid.column.Action',
        'Tscrm.view.properties.Model',
        'Tscrm.view.properties.Controller'
    ],

    controller: 'propertiesController',

    viewModel: {
        type: 'propertiesModel'
    },
    title: 'Ingatlanok',
    width: (Global.maxWidth < 1400 ? Global.maxWidth : 1400),
    originalWidth: 1000,
    height: (Global.maxHeight < 700 ? Global.maxHeight : 700),
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: true,
    minimizable: true,
    layout: {
        type: 'border'
    },

    listeners: {
        show: 'showWin',
        close: 'closeWin'
        /*
        minimize: function (window, opts) {
                window.collapse();
                window.setWidth(150);
                window.alignTo(Ext.getBody(), 'bl-bl')
            } 
        minimize: 'onMinimalize'*/
    },
    tools: [{
        type: 'restore',
        handler: function (evt, toolEl, owner, tool) {
            var window = owner.up('window');
            window.setWidth(window.originalWidth);
            window.expand('', false);
            window.center();
        }
    }],
    items: [
        {
            region: 'west',
            itemId: 'panelwest',
            collapsible: true,
            //collapsed:true,
            minWidth: 350,
            maxWidth: 500,
            width: 350,
            split: true,
            title: 'Kereső',
            xtype: 'panel',
            layout: 'fit',
            defaults: {
                bodyPadding: 10,
                autoScroll: true
            },
            items: [{
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
                    layout: 'column',
                    fieldDefaults: {
                        labelAlign: 'left',
                    },
                    bodyPadding: 10,
                    defaultType: 'checkbox',
                    items: [{
                        columnWidth: .5,
                        name: 'type[2]',
                        fieldLabel: 'Eladó',
                        inputValue: 2,
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        name: 'type[1]',
                        fieldLabel: 'Kiadó',
                        inputValue: 1,
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }]

                }, {
                    fieldLabel: 'Archiváltak is',
                    name: 'archived',
                    inputValue: 1,
                    xtype: 'checkbox',
                    listeners: {
                        change: 'onSearchSubmit'
                    }

                }, {
                    fieldLabel: 'Sorszámok',
                    name: 'ident',
                    reference: 'searchIdents',
                    xtype: 'textfield',
                    listeners: {
                        specialkey: 'onSearchSubmit'
                    }

                }, {
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
                    valueParam: 'ids',
                    maxWidth: 300,
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }

                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Utca, Házszám (tól - ig)',
                    layout: 'column',
                    defaultType: 'textfield',
                    items: [{
                        columnWidth: .5,
                        name: 'street',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }

                    }, {
                        columnWidth: .25,
                        name: 'streetnum_from',
                        margin: '0 0 0 6',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .25,
                        name: 'streetnum_to',
                        margin: '0 0 0 6',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }]
                }, {
                    fieldLabel: 'Tulajdonos neve',
                    name: 'contact_name',
                    xtype: 'combobox',
                    displayField: 'fullname',
                    valueField: 'fullname',
                    queryParam: 'list',
                    typeAhead: false,
                    minChars: 2,
                    listeners: {
                        specialkey: 'onSearchSubmit'
                    },
                    queryMode: 'remote',
                    bind: {
                        store: '{contactsSelect}'
                    }
                }, {
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
                    minChars: 1,
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Ár',
                    combineErrors: true,
                    layout: 'column',
                    defaultType: 'textfield',
                    items: [{
                        columnWidth: .25,
                        name: 'price_from',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }

                    }, {
                        columnWidth: .25,
                        name: 'price_to',
                        margin: '0 0 0 6',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        margin: '0 0 0 6',
                        fieldLabel: false,
                        name: 'price_type',
                        xtype: 'combobox',
                        editable: false,
                        queryMode: 'remote',
                        bind: {
                            store: '{price_type}'
                        },
                        displayField: 'name',
                        valueField: 'val',
                        value: 2
                    }]
                }, {
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
                    valueParam: 'vals',
                    maxWidth: 300,
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Alapterület',
                    layout: 'column',
                    defaultType: 'textfield',
                    items: [{
                        columnWidth: .5,
                        name: 'size_net_from',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        name: 'size_net_to',
                        margin: '0 0 0 6',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Hálók száma',
                    combineErrors: true,
                    layout: 'column',
                    defaultType: 'textfield',
                    items: [{
                        columnWidth: .5,
                        name: 'bedroom_from',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }

                    }, {
                        columnWidth: .5,
                        name: 'bedroom_to',
                        margin: '0 0 0 6',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Fürdők száma',
                    combineErrors: true,
                    layout: 'column',
                    defaultType: 'textfield',
                    items: [{
                        columnWidth: .5,
                        name: 'bathroom_from',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }

                    }, {
                        columnWidth: .5,
                        name: 'bathroom_to',
                        margin: '0 0 0 6',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }]
                }, {
                    fieldLabel: 'Bútorozás',
                    name: 'furniture_type[]',
                    xtype: 'tagfield',
                    queryMode: 'remote',
                    bind: {
                        store: '{staticsFurnitureType}'
                    },
                    displayField: 'name',
                    valueField: 'val',
                    publishes: 'val',
                    valueParam: 'vals',
                    maxWidth: 300,
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                }, {
                    fieldLabel: 'Parkolás, Garázs',
                    name: 'parking',
                    xtype: 'combobox',
                    queryMode: 'remote',
                    bind: {
                        store: '{staticsParkingTypeSearch}'
                    },
                    displayField: 'name',
                    valueField: 'val',
                    publishes: 'val',
                    valueParam: 'vals',
                    maxWidth: 300,
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                }, {
                    xtype: 'fieldset',
                    layout: 'column',
                    fieldDefaults: {
                        labelAlign: 'left',
                    },
                    defaultType: 'checkbox',
                    border: false,
                    items: [{
                        columnWidth: .5,
                        fieldLabel: 'Háziállat',
                        name: 'petallowed',
                        xtype: 'checkbox',
                        labelAlign: 'left',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        fieldLabel: 'Kertkapcsolatos',
                        name: 'gardencontact',
                        xtype: 'checkbox',
                        labelAlign: 'left',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        fieldLabel: 'Földszinti',
                        name: 'lowerlevel',
                        xtype: 'checkbox',
                        labelAlign: 'left',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        fieldLabel: 'Felső emelet',
                        name: 'upperlevel',
                        xtype: 'checkbox',
                        labelAlign: 'left',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        fieldLabel: 'Rövidtávra is',
                        name: 'shortterm',
                        xtype: 'checkbox',
                        labelAlign: 'left',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        fieldLabel: 'Terasz,erkély',
                        name: 'terrace',
                        xtype: 'checkbox',
                        labelAlign: 'left',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }]

                }, {
                    fieldLabel: 'Panoráma',
                    name: 'panorama_type[]',
                    xtype: 'tagfield',
                    queryMode: 'remote',
                    bind: {
                        store: '{staticsPanoramaType}'
                    },
                    displayField: 'name',
                    valueField: 'val',
                    publishes: 'val',
                    valueParam: 'vals',
                    maxWidth: 300,
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                }, {
                    xtype: 'fieldset',
                    layout: 'column',
                    fieldDefaults: {
                        labelAlign: 'left',
                    },
                    defaultType: 'checkbox',
                    border: false,
                    items: [
                        {
                            fieldLabel: 'Új építésű',
                            name: 'newlybuilt',
                            xtype: 'checkbox',
                            labelAlign: 'left',
                            columnWidth: .5,
                            listeners: {
                                change: 'onSearchSubmit'
                            }
                        },
                        {
                            fieldLabel: 'Légkondi',
                            name: 'aircondition',
                            xtype: 'checkbox',
                            labelAlign: 'left',
                            columnWidth: .5,
                            inputValue: '1',
                            uncheckedValue: '0',
                            listeners: {
                                change: 'onSearchSubmit'
                            }
                        }
                    ]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Építési idő',
                    layout: 'column',
                    defaultType: 'textfield',
                    items: [{
                        columnWidth: .5,
                        name: 'builddate_from',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }

                    }, {
                        columnWidth: .5,
                        name: 'builddate_to',
                        margin: '0 0 0 6',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    }]
                }, {
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
                    valueParam: 'vals',
                    maxWidth: 200,
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                }, {
                    fieldLabel: 'Minősítés',
                    name: 'rate',
                    xtype: 'combobox',
                    queryMode: 'remote',
                    bind: {
                        store: '{staticsRatingType}'
                    },
                    displayField: 'name',
                    valueField: 'val',
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Utolsó esemény',
                    layout: 'column',
                    defaultType: 'datefield',
                    items: [{
                        columnWidth: .5,
                        name: 'lastdate_from',

                    }, {
                        columnWidth: .5,
                        name: 'lastdate_to',

                        margin: '0 0 0 6'
                    }]
                }, {
                    xtype: 'fieldset',
                    layout: 'column',
                    fieldDefaults: {
                        labelAlign: 'left',
                    },
                    defaultType: 'checkbox',
                    border: false,
                    items: [{
                        columnWidth: .5,
                        fieldLabel: 'Bérbead határidős',
                        name: 'close_enddate',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        fieldLabel: 'Lejárt határidő',
                        name: 'last_enddate',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }
                    ]
                }, {
                    fieldLabel: 'Tulajdonos telefonszáma',
                    name: 'contact_phone',
                    xtype: 'textfield',
                    listeners: {
                        specialkey: 'onSearchSubmit'
                    }
                }, {
                    fieldLabel: 'Tulajdonos email címe',
                    name: 'contact_email',
                    xtype: 'textfield',
                    listeners: {
                        specialkey: 'onSearchSubmit'
                    }
                }, {
                    fieldLabel: 'Aktív',
                    name: 'active[]',
                    xtype: 'tagfield',
                    queryMode: 'remote',
                    bind: {
                        store: '{active}'
                    },
                    displayField: 'name',
                    valueField: 'val',
                    publishes: 'val',
                    valueParam: 'vals',
                    maxWidth: 200
                }, {
                    xtype: 'fieldset',
                    layout: 'column',
                    fieldDefaults: {
                        labelAlign: 'left',
                    },
                    defaultType: 'checkbox',
                    border: false,
                    items: [{
                        columnWidth: .5,
                        fieldLabel: 'GDN',
                        name: 'gdn',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }, {
                        columnWidth: .5,
                        fieldLabel: 'Ingatlan.com',
                        name: 'ing_com',
                        listeners: {
                            change: 'onSearchSubmit'
                        }
                    }
                    ]
                }, {
                    fieldLabel: 'Felvette',
                    name: 'user_id[]',
                    xtype: 'tagfield',
                    queryMode: 'remote',
                    bind: {
                        store: '{usersList}'
                    },
                    displayField: 'username',
                    valueField: 'id',
                    publishes: 'id',
                    valueParam: 'ids',
                    listeners: {
                        collapse: 'onSearchSubmit',
                        render: function () {
                            this.labelEl.dom.removeAttribute('for')
                        }
                    }
                },{
                    fieldLabel: 'Kiemelt',
                    name: 'offer',
                    xtype: 'checkbox',
                    listeners: {
                        change: 'onSearchSubmit'
                    }
                }, {
                    name: 'disablesubmit',
                    xtype: 'hidden'
                }]
            }],
            bbar: [{
                xtype: 'button',
                text: 'Új keresés',
                handler: 'onSearchReset'
            }, {
                xtype: 'button',
                text: 'Keresés',
                itemId: 'search',
                handler: 'onSearchSubmit'
            }]

        }, {
            region: 'east',
            collapsible: true,
            minWidth: 300,
            maxWidth: 600,
            title: 'Gyorsadatok',
            floatable: false,
            collapsed: true,
            split: true,
            xtype: 'tabpanel',
            reference: 'propertiesEastPanel',
            items: [
                {
                    title: 'Adatok',
                    reference: 'propertiesFastView',
                    xtype: 'propertiesFastView'
                }, {
                    title: 'Megjegyzések',
                    xtype: 'listEventsFastView',
                    listeners: {
                        activate: 'loadFastEvents'
                    }
                }
            ]

        }, {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'gridpanel',
                    bind: {
                        store: '{propertiesList}'
                    },
                    reference: 'propertiesGrid',
                    autoScroll: true,
                    scroll: true,
                    selType: 'checkboxmodel',
                    selModel: {
                        mode: 'SIMPLE',
                        checkOnly: true
                    },
                    flex: 1,
                    plugins: new Ext.ux.ts.grid.GridMultipageSelection(),
                    /*
                    plugins: [
                        {ptype: "gridMultipageSelection"}
                    ],*/
                    columns: [
                        {
                            text: '#',
                            dataIndex: 'PropertiesVariations.id',
                            width: 80,
                            renderer: function (value, row, data) {
                                return value + (data.get('nocontract') == 1 ? '<br><span class="rowWarningIcon" data-qtip="Nincs szerződés!"></span>' : '')
                                    + (data.get('archived') == 1 ? '<br>Archivált' : '')
                                    ;
                            }
                        }, {
                            text: 'Kép',
                            dataIndex: 'mainimage',
                            sortable: false,
                            width: 110,
                            renderer: function (value, row, data) {
                                op = '';
                                if (data.get('active') == '0') {
                                    op = 'style="opacity:0.5"';
                                }
                                if (data.get('archived') == '1') {
                                    op = 'style="opacity:0.5"';
                                }
                                if (Ext.isEmpty(value)) {
                                    value = '/img/nolistimg.png';
                                }
                                return '<img src="' + value + '" ' + op + '/>';
                            }
                        }, {
                            text: 'Utca',
                            dataIndex: 'Streets.street',
                            flex: 5,
                            renderer: function (value, row, data) {
                                addr = '';
                                if (data.get('properties_variation')) {
                                    row.tdAttr = 'data-qtip="' + data.get('properties_variation').description + '"';
                                }
                                retval = '' + value + '<br>Tul.: ' + data.get('owner_name') + ' (' + data.get('owner_phone') + ')';
                                if (data.get('Contact').phone1) {
                                    retval += '<br>Kapcs.: ' + data.get('Contact').lastname + ' ' + data.get('Contact').firstname + ' (' + data.get('contact_phone') + ')';
                                }

                                retval += '<br><br>';
                                if (data.get('has_key') == 1) {
                                    retval += '<span class="list-tag list-tag-key">KULCSOS</span> ';
                                }
                                if (data.get('properties_variation') && data.get('properties_variation').ing_com == 1) {
                                    retval += '<span class="list-tag list-tag-com">ingatlan.com</span> ';
                                }
                                if (data.get('properties_variation') && data.get('properties_variation').gdn == 1) {
                                    retval += '<span class="list-tag list-tag-gdn">GDN</span> ';
                                }

                                if (data.get('properties_variation') && data.get('properties_variation').enddate) {
                                    retval += '<span class="list-tag">' + data.get('properties_variation').enddate + '</span>';
                                }
                                return retval;
                            }
                        }, {
                            text: 'Típus',
                            dataIndex: 'building_type_name',
                            hidden: true,
                            sortable: false
                        }, {
                            text: 'Ár',
                            dataIndex: 'PropertiesVariations.price_formatted',
                            flex: 2,
                            align: 'right',
                            renderer: function (value, row, data) {
                                ret = '';
                                if (data.get('properties_variation') && data.get('properties_variation').price_dev == 'EUR') {
                                    ret = data.get('properties_variation').price_eur_formatted;
                                    ret += '<br><small>' + data.get('properties_variation').price_huf_formatted + '</small>';
                                } else if (data.get('properties_variation') && data.get('properties_variation').price_dev == 'USD') {
                                    ret = data.get('properties_variation').price_usd_formatted;
                                    ret += '<br><small>' + data.get('properties_variation').price_huf_formatted + '</small>';
                                } else if (data.get('properties_variation') && data.get('properties_variation').price_huf_formatted) {
                                    ret = data.get('properties_variation').price_huf_formatted;
                                    ret += '<br><small>' + data.get('properties_variation').price_eur_formatted + '</small>';
                                } else {
                                    ret = 'Nincs hirdetve';
                                }
                                return ret;

                            }

                        }, {
                            text: 'Méret',
                            dataIndex: 'size_net',
                            flex: 1,
                            align: 'right',
                            renderer: function (value, row, data) {
                                return (data.get('size_net') > 0 ? data.get('size_net') + 'm<sup>2</sup>' : '') + '<br>' + (data.get('size_gross') > 0 ? data.get('size_gross') + 'm<sup>2</sup>' : '');
                            }

                        }, {
                            text: 'Szoba',
                            flex: .5,
                            dataIndex: 'PropertiesLayouts.room'
                        }, {
                            text: 'Bútorozás',
                            dataIndex: 'furniture_type_name',
                            flex: 1,
                            hidden: true,
                            sortable: false
                        }, {
                            text: 'Garázs',
                            dataIndex: 'parking_type_name',
                            flex: 1,
                            hidden: true,
                            sortable: false
                        }, {
                            text: 'Utolsó esemény',
                            dataIndex: 'lastevent',
                            flex: 1,
                            sortable: false,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')

                        }, {
                            text: 'Bérbead határidő',
                            dataIndex: 'PropertiesVariations.enddate',
                            flex: 1,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                            hidden: true

                        }, {
                            text: 'Létrehozva',
                            dataIndex: 'created',
                            flex: 1,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                            hidden: true
                        }, {
                            text: 'Módosítva',
                            dataIndex: 'modified',
                            flex: 1,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                            hidden: true
                        }, {
                            xtype: 'actioncolumn',
                            width: 70,
                            items: [{
                                iconCls: 'action event',
                                tooltip: 'Új esemény',
                                handler: 'onRowAddEvent'
                            }, {
                                iconCls: 'action edit',
                                tooltip: 'Módosítás',
                                handler: 'onEdit'
                            }, {
                                iconCls: 'action delete',
                                tooltip: 'Törlés',
                                handler: 'onDelete'
                            }]
                        }
                    ],
                    listeners: {
                        rowclick: 'onRowClick',
                        rowdblclick: 'onRowDblClick',
                        selectionchange: 'resetTodo'

                    },
                    viewConfig: {
                        loadMask: true,
                        loadingHeight: 500
                    },
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Új ingatlan',
                            handler: 'onAdd',
                            cls: 'addbtn'
                        }, {

                            reference: 'counter',
                            xtype: 'tbtext',
                            text: 'Kijelölve: 0'
                        }, {
                            allowBlank: true,
                            fieldLabel: false,
                            reference: 'todo',
                            listeners: {
                                change: 'todoChange'
                            },
                            editable: false,
                            name: 'todo',
                            queryMode: 'local',
                            emptyText: 'Műveletek',
                            store: gridactions, //static store from resources/config/config.js
                            displayField: 'name',
                            valueField: 'val',
                            xtype: 'combobox',
                            width: 230
                        }, {
                            fieldLabel: 'Városrésszel!',
                            labelWidth: 80,
                            xtype: 'checkbox',
                            reference: 'withStreet',
                            listeners: {
                                change: 'todoChange'
                            }
                        }, '  ', {
                            fieldLabel: 'Házszámmal',
                            labelWidth: 80,
                            xtype: 'checkbox',
                            reference: 'withStreetNum',
                            listeners: {
                                change: 'todoChange'
                            }
                        }, ' ', {
                            xtype: 'button',
                            text: 'Mehet',
                            handler: 'onDoIt'
                        }, {
                            xtype: 'button',
                            text: 'Másol',
                            hidden: true,
                            reference: 'copyToClipboard',
                            listeners: {
                                click: 'copyToClipboardFn'
                            }
                        }],
                    bbar: [{
                        xtype: 'pagingtoolbar',
                        bind: '{propertiesList}',
                        displayInfo: true
                    }]

                }
            ]
        }
    ]
});
