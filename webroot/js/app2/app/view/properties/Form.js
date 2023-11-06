Ext.define('Tscrm.view.properties.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertiesForm',
    requires: [
        'Tscrm.view.properties.Controller',
        'Tscrm.view.properties.Model'
    ],
    controller: 'propertiesController',
    title: 'Ingatlan',
    width: (Global.maxWidth < 1000 ? Global.maxWidth : 1000),
    height: (Global.maxHeight < 660 ? Global.maxHeight : 660),
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: true,
    resizable: true,
    layout: 'fit',
    viewModel: {
        type: 'propertiesModel'
    },
    listeners: {
        close: 'closeWin',
        resize: 'resizeWin'
    },
    items: [
        {
            xtype: 'form',
            url: '/admin/properties/add.json',
            reference: 'propertiesForm',
            items: {
                xtype: 'tabpanel',
                deferredRender: false,
                defaults: {
                    bodyPadding: 10,
                    autoScroll: true
                },

                maxHeight: 580,
                items: [{
                    title: 'Alap adatok',
                    layout: 'column',
                    scroll: 'vertical',
                    items: [
                        {
                            columnWidth: 0.5,
                            items: [
                                {
                                    xtype: 'hidden',
                                    name: 'id'
                                }, {
                                    xtype: 'hidden',
                                    name: 'user_id'
                                }, {
                                    xtype: 'fieldset',
                                    title: '',
                                    layout: 'column',
                                    defaultType: 'checkbox',
                                    margin: '10 10 0 0',
                                    defaults: {
                                        anchor: '100%'
                                    },

                                    items: [{
                                        name: 'sell',
                                        fieldLabel: 'Eladó',
                                        flex: 1,
                                        margin: '0 20 0 6',
                                        inputValue: '1',
                                        listeners: {
                                            change: 'activateTab'
                                        }
                                    }, {
                                        name: 'rent',
                                        fieldLabel: 'Kiadó',
                                        flex: 1,
                                        margin: '0 20 0 6',
                                        inputValue: '1',
                                        listeners: {
                                            change: 'activateTab'
                                        }
                                    }, {
                                        name: 'archived',
                                        fieldLabel: 'Archívált',
                                        flex: 1,
                                        margin: '0 0 0 60',
                                        inputValue: '1'
                                    }]

                                }, {
                                    xtype: 'fieldset',
                                    title: 'Cim adatok',
                                    defaultType: 'textfield',
                                    margin: '10 10 0 0',
                                    defaults: {
                                        anchor: '100%'
                                    },

                                    items: [{
                                        fieldLabel: 'Település',
                                        reference: 'city_id',
                                        name: 'city_id',
                                        xtype: 'combobox',
                                        minChars: 1,
                                        allowBlank: true,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{citiesList}'
                                        },
                                        typeAhead: true,
                                        displayField: 'city',
                                        valueField: 'id',
                                        listeners: {
                                            select: 'onCitySelect',
                                            change: 'onCityChange'
                                        },
                                        triggers: {
                                            add: {
                                                cls: 'x-form-add-trigger',
                                                weight: 1,
                                                handler: 'addNewCity'
                                            }
                                        }
                                    }, {
                                        fieldLabel: 'Kerület/Terület',
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        combineErrors: true,
                                        defaultType: 'textfield',
                                        defaults: {
                                            hideLabel: 'true'
                                        },
                                        items: [{
                                            fieldLabel: 'Kerület',
                                            emptyText: 'Kerület',
                                            reference: 'district_id',
                                            name: 'district_id',
                                            xtype: 'combobox',
                                            minChars: 1,
                                            allowBlank: true,
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{districtsList}'
                                            },
                                            typeAhead: true,
                                            displayField: 'district',
                                            valueField: 'id',
                                            flex: 3,
                                            listeners: {
                                                select: 'onDistrictSelect'
                                            }
                                        }, {
                                            fieldLabel: 'Városrész',
                                            emptyText: 'Városrész',
                                            reference: 'citypart_id',
                                            name: 'citypart_id',
                                            xtype: 'combobox',
                                            minChars: 1,
                                            allowBlank: true,
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{citypartsList}'
                                            },
                                            typeAhead: true,
                                            displayField: 'citypart',
                                            valueField: 'id',
                                            flex: 3,
                                            margin: '0 0 0 6',
                                            triggers: {
                                                add: {
                                                    cls: 'x-form-add-trigger',
                                                    weight: 1,
                                                    handler: 'addNewCitypart'
                                                }
                                            }
                                        }, {
                                            name: 'zip',
                                            fieldLabel: 'Irsz.',
                                            flex: 2,
                                            margin: '0 0 0 6',
                                            emptyText: 'Irsz.'
                                        }]
                                    }, {
                                        fieldLabel: 'Utca, házszám',
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        combineErrors: true,
                                        defaultType: 'textfield',
                                        defaults: {
                                            hideLabel: 'true'
                                        },
                                        items: [{
                                            fieldLabel: 'Utca',
                                            emptyText: 'Utca',
                                            reference: 'street_id',
                                            name: 'street_id',
                                            xtype: 'combobox',
                                            allowBlank: true,
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{streetsList}'
                                            },
                                            typeAhead: true,
                                            displayField: 'street',
                                            valueField: 'id',
                                            flex: 4,
                                            triggers: {
                                                add: {
                                                    cls: 'x-form-add-trigger',
                                                    weight: 1,
                                                    handler: 'addNewStreet'
                                                }
                                            }
                                        }, {
                                            fieldLabel: 'Házszám',
                                            emptyText: 'hsz.',
                                            name: 'streetnum',
                                            flex: 1,
                                            margin: '0 0 0 6'

                                        }]
                                    }, {
                                        fieldLabel: 'Ép.,Em., ajtó',
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        combineErrors: true,
                                        defaultType: 'textfield',
                                        defaults: {
                                            hideLabel: 'true'
                                        },
                                        items: [{
                                            fieldLabel: 'Épület',
                                            emptyText: 'Épület',
                                            name: 'building',
                                            flex: 1

                                        }, {
                                            fieldLabel: 'Emelet',
                                            emptyText: 'Emelet',
                                            name: 'floor',
                                            flex: 1,
                                            margin: '0 0 0 6'
                                        }, {
                                            fieldLabel: 'Ajtó',
                                            emptyText: 'Ajtó.',
                                            name: 'door',
                                            flex: 1,
                                            margin: '0 0 0 6'
                                        }]
                                    }, {
                                        fieldLabel: 'Cím megjegyzés',
                                        name: 'address_note',
                                        xtype: 'textarea'
                                    }, {
                                        xtype: 'panel',
                                        title: '',
                                        layout: 'hbox',
                                        defaultType: 'checkbox',
                                        defaults: {
                                            anchor: '100%'
                                        },

                                        items: [{
                                            flex: 1,
                                            fieldLabel: 'Cím rejtett',
                                            name: 'street_hidden',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }, {
                                            name: 'has_key',
                                            fieldLabel: 'Kulcsos',
                                            flex: 1,
                                            margin: '0 0 0 6',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }
                                        ]

                                    }, {

                                        fieldLabel: 'Lakópark',
                                        name: 'building_park'
                                    }, {

                                        fieldLabel: 'Helyrajzi sz.',
                                        name: 'localident'
                                    }


                                    ]
                                }, {
                                    title: 'Fontos tulajdonságok',
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    margin: '10 10 0 0',
                                    defaults: {
                                        anchor: '100%'
                                    },

                                    items: [{
                                        fieldLabel: 'Típus',
                                        name: 'building_type',
                                        xtype: 'combobox',
                                        editable: false,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsBuildingType}'
                                        },
                                        displayField: 'name',
                                        valueField: 'val'
                                    }, {
                                        fieldLabel: 'Alapterület m<sup>2</sup> ',
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        combineErrors: true,
                                        defaultType: 'textfield',
                                        defaults: {
                                            hideLabel: 'true'
                                        },
                                        items: [{
                                            fieldLabel: 'Nettó',
                                            emptyText: 'Nettó',
                                            name: 'size_net',
                                            xtype: 'numberfield',
                                            flex: 1
                                        }, {
                                            fieldLabel: 'Bruttó',
                                            emptyText: 'Bruttó',
                                            name: 'size_gross',
                                            xtype: 'numberfield',
                                            flex: 1,
                                            margin: '0 0 0 6'
                                        }]
                                    }, {
                                        fieldLabel: 'Fűtés',
                                        name: 'heat_type',
                                        xtype: 'combobox',
                                        editable: false,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsHeatType}'
                                        },
                                        displayField: 'name',
                                        valueField: 'val'

                                    }

                                    ]
                                }]
                        },
                        {
                            columnWidth: .5,
                            items: [{
                                title: 'Tulajdonos',
                                xtype: 'fieldset',
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },

                                items: [{
                                    xtype: 'hidden',
                                    name: 'contacts[0][id]'
                                }, {
                                    xtype: 'hidden',
                                    name: 'contacts[0][_joinData][main]',
                                    value: '1'
                                }, {
                                    xtype: 'hidden',
                                    name: 'contacts[0][_joinData][type]',
                                    value: '1'
                                }, {
                                    fieldLabel: 'Név',
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [
                                        {
                                            name: 'contacts[0][prename]',
                                            xtype: 'combobox',
                                            flex: 1,
                                            queryMode: 'local',
                                            store: prenames,
                                            typeAhead: true,
                                            displayField: 'name',
                                            valueField: 'val'
                                        },
                                        {
                                            fieldLabel: 'Vezetéknév',
                                            emptyText: 'Vezetéknév',
                                            name: 'contacts[0][lastname]',

                                            flex: 1,
                                            margin: '0 0 0 6',

                                        }, {
                                            fieldLabel: 'Keresztnév',
                                            emptyText: 'Keresztnév',
                                            name: 'contacts[0][firstname]',
                                            flex: 1,
                                            margin: '0 0 0 6'

                                        }]
                                }, {

                                    fieldLabel: 'Cég',
                                    name: 'contacts[0][company_id]',
                                    xtype: 'combobox',
                                    allowBlank: true,
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{companiesList}'
                                    },
                                    typeAhead: false,
                                    displayField: 'name',
                                    valueField: 'id'
                                }, {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 1',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Típus',
                                            name: 'contacts[0][phone1type]',
                                            xtype: 'combobox',
                                            allowBlank: false,
                                            queryMode: 'local',
                                            store: phonetypes,
                                            editable: false,
                                            displayField: 'name',
                                            valueField: 'val',
                                            value: 1,
                                            flex: 1,
                                            listeners: {
                                                select: 'changeTpl',
                                                change: 'changeTpl'
                                            },
                                            reference: 'phone1type',
                                        }, {
                                            fieldLabel: 'Telefonszám',
                                            // emptyText: 'Telefonszám',
                                            name: 'contacts[0][phone1]',
                                            itemId: 'phone',
                                            xtype: 'ux-phonefield',
                                            tplValue: '(__) __ / ___-____',
                                            leftValue: '36',
                                            leftReadOnly: true,
                                            flex: 2,
                                            margin: '0 0 0 6',
                                            listeners: {
                                                blur: 'checkPhone'
                                            }

                                        }
                                    ]
                                }, {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 2',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [{
                                        fieldLabel: 'Típus',
                                        name: 'contacts[0][phone2type]',
                                        xtype: 'combobox',
                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,
                                        listeners: {
                                            select: 'changeTpl',
                                            change: 'changeTpl'
                                        }
                                    }, {
                                        fieldLabel: 'Telefonszám',
                                        // emptyText: 'Telefonszám',
                                        name: 'contacts[0][phone2]',
                                        xtype: 'ux-phonefield',
                                        tplValue: '(__) __ / ___-____',
                                        leftValue: '36',
                                        leftReadOnly: true,
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        listeners: {
                                            blur: 'checkPhone'
                                        }

                                    }]
                                }, {

                                    fieldLabel: 'Email',
                                    name: 'contacts[0][email1]'
                                }, {
                                    fieldLabel: 'Megjegyzés',
                                    name: 'contacts[0][note]',
                                    xtype: 'textarea'
                                }, {
                                    fieldLabel: 'Régi telefon',
                                    name: 'contacts[0][debug_phone]'
                                }]
                            }, {
                                title: 'Kapcsolattartó',
                                xtype: 'fieldset',
                                itemId: 'contact1',
                                defaultType: 'textfield',
                                collapsible: true,
                                collapsed: true,
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [{
                                    xtype: 'hidden',
                                    name: 'contacts[1][dontsave]',
                                    itemId: 'contact1dontsave'
                                }, {
                                    xtype: 'hidden',
                                    name: 'contacts[1][id]'
                                }, {
                                    xtype: 'hidden',
                                    name: 'contacts[1][_joinData][main]',
                                    value: '1'
                                }, {
                                    xtype: 'hidden',
                                    name: 'contacts[1][_joinData][type]',
                                    value: '2'
                                }, {
                                    fieldLabel: 'Név',
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [
                                        {
                                            name: 'contacts[1][prename]',
                                            xtype: 'combobox',
                                            flex: 1,
                                            queryMode: 'local',
                                            store: prenames,
                                            typeAhead: true,
                                            displayField: 'name',
                                            valueField: 'val'
                                        },
                                        {
                                            fieldLabel: 'Vezetéknév',
                                            emptyText: 'Vezetéknév',
                                            name: 'contacts[1][lastname]',

                                            flex: 1,
                                            margin: '0 0 0 6',

                                        }, {
                                            fieldLabel: 'Keresztnév',
                                            emptyText: 'Keresztnév',
                                            name: 'contacts[1][firstname]',
                                            flex: 1,
                                            margin: '0 0 0 6'

                                        }]
                                }, {

                                    fieldLabel: 'Cég',
                                    name: 'contacts[1][company_id]',
                                    xtype: 'combobox',
                                    allowBlank: true,
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{companiesList2}'
                                    },
                                    typeAhead: false,
                                    displayField: 'name',
                                    valueField: 'id'
                                }, {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 1',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [{
                                        fieldLabel: 'Típus',
                                        name: 'contacts[1][phone1type]',
                                        xtype: 'combobox',
                                        editable: false,
                                        allowBlank: false,
                                        queryMode: 'local',
                                        store: phonetypes,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,
                                        listeners: {
                                            select: 'changeTpl'
                                        }
                                    }, {
                                        fieldLabel: 'Telefonszám',
                                        //emptyText: 'Telefonszám',
                                        name: 'contacts[1][phone1]',
                                        xtype: 'ux-phonefield',
                                        tplValue: '(__) __ / ___-____',
                                        leftValue: '36',
                                        leftReadOnly: true,
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        listeners: {
                                            blur: 'checkPhone'
                                        }

                                    }]
                                }, {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 2',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },
                                    items: [{
                                        fieldLabel: 'Típus',
                                        name: 'contacts[1][phone2type]',
                                        xtype: 'combobox',

                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,
                                        listeners: {
                                            select: 'changeTpl'
                                        }
                                    }, {
                                        fieldLabel: 'Telefonszám',
                                        // emptyText: 'Telefonszám',
                                        name: 'contacts[1][phone2]',
                                        xtype: 'ux-phonefield',
                                        tplValue: '(__) __ / ___-____',
                                        leftValue: '36',
                                        leftReadOnly: true,
                                        flex: 2,
                                        margin: '0 0 0 6',
                                        listeners: {
                                            blur: 'checkPhone'
                                        }

                                    }]
                                }, {

                                    fieldLabel: 'Email',
                                    name: 'contacts[1][email1]'
                                }, {
                                    fieldLabel: 'Megjegyzés',
                                    name: 'contacts[1][note]',
                                    xtype: 'textarea'
                                }, {
                                    fieldLabel: 'Régi telefon',
                                    name: 'contacts[1][debug_phone]'
                                }]
                            }, {
                                xtype: 'fieldset',
                                title: 'Belső adatok',
                                defaultType: 'textfield',
                                margin: '10 0 0 0',
                                defaults: {
                                    anchor: '100%'
                                },

                                items: [{
                                    fieldLabel: 'Ki látta',
                                    name: 'users[_ids][]',
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
                                }, {

                                    fieldLabel: 'Társirodás',
                                    name: 'cooffice',
                                    xtype: 'checkbox',
                                    inputValue: '1',
                                    uncheckedValue: '0'
                                }]
                            }

                            ]
                        },
                        {
                            columnWidth: 1,
                            items: [
                                {
                                    title: 'Elrendezés',
                                    xtype: 'fieldset',
                                    margin: '10 0 0 0',
                                    defaults: {
                                        anchor: '100%'
                                    },

                                    items: [
                                        {
                                            layout: 'column',
                                            defaults: {
                                                labelWidth: '50%'
                                            },
                                            items: [
                                                {
                                                    columnWidth: .25,
                                                    defaultType: 'numberfield',
                                                    margin: '0 10 5 0',
                                                    defaults: {
                                                        width: '100%',
                                                        labelWidth: '300px'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'hidden',
                                                            name: 'properties_layout[id]'
                                                        }, {
                                                            name: 'properties_layout[main]',
                                                            xtype: 'hidden',
                                                            value: '1'
                                                        }, {
                                                            fieldLabel: 'Nappali',
                                                            name: 'properties_layout[livingroom]',
                                                            xtype: 'numberfield',

                                                        }, {
                                                            fieldLabel: 'Szoba',
                                                            name: 'properties_layout[room]'
                                                        }, {
                                                            fieldLabel: 'Félszoba',
                                                            name: 'properties_layout[halfroom]'
                                                        }

                                                    ]
                                                }, {
                                                    columnWidth: .25,
                                                    defaultType: 'numberfield',
                                                    margin: '0 10 5 0',
                                                    defaults: {
                                                        width: '100%',
                                                        labelWidth: '300px'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'WC',
                                                            name: 'properties_layout[toliett]'
                                                        }, {
                                                            fieldLabel: 'Fürdő',
                                                            name: 'properties_layout[bathroom]'
                                                        }, {
                                                            fieldLabel: 'Fürdő, WC -vel',
                                                            name: 'properties_layout[bathroom_toilett]'
                                                        }
                                                    ]
                                                }, {
                                                    columnWidth: .25,
                                                    defaultType: 'numberfield',
                                                    margin: '0 10 5 0',
                                                    defaults: {
                                                        width: '100%',
                                                        labelWidth: '300px'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Étkező',
                                                            name: 'properties_layout[diningroom]'
                                                        }, {
                                                            fieldLabel: 'Tároló, kamra',
                                                            name: 'properties_layout[storage]'
                                                        }, {
                                                            fieldLabel: 'Hall',
                                                            name: 'properties_layout[hall]'
                                                        }
                                                    ]
                                                }, {
                                                    columnWidth: .25,
                                                    defaultType: 'numberfield',
                                                    defaults: {
                                                        width: '100%',
                                                        labelWidth: '300px'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Amerikai konyha',
                                                            name: 'properties_layout[american_kitchen]'
                                                        }, {
                                                            fieldLabel: 'Szeparált konyha',
                                                            name: 'properties_layout[kitchen]'
                                                        }, {
                                                            fieldLabel: 'Étkezős konyha',
                                                            name: 'properties_layout[eating_kitchen]'
                                                        }
                                                    ]
                                                }, {
                                                    columnWidth: 1,
                                                    defaultType: 'textarea',
                                                    defaults: {
                                                        width: '100%',
                                                        labelWidth: '300px',
                                                        labelAlign: 'top'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Megjegyzés',
                                                            xtype: 'textarea',
                                                            name: 'properties_layout[note]',
                                                            allowBlank: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            columnWidth: .5,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Tulajdonságok',
                                    defaultType: 'textfield',
                                    margin: '10 10 0 0',
                                    defaults: {
                                        anchor: '100%'
                                    },

                                    items: [
                                        {
                                            layout: 'column',
                                            xtype: 'panel',
                                            items: [
                                                {
                                                    columnWidth: .5,
                                                    items: [
                                                        {
                                                            fieldLabel: 'Felsőszint',
                                                            name: 'upperlevel',
                                                            xtype: 'checkbox',
                                                            inputValue: '1',
                                                            uncheckedValue: '0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    columnWidth: .5,
                                                    items: [
                                                        {
                                                            fieldLabel: 'Légkondi',
                                                            name: 'aircondition',
                                                            xtype: 'checkbox',
                                                            inputValue: '1',
                                                            uncheckedValue: '0'
                                                        }
                                                    ]

                                                }
                                            ]
                                        },
                                        {
                                            fieldLabel: 'Földszint',
                                            name: 'lowerlevel',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }, {
                                            fieldLabel: 'Tetőtéri',
                                            name: 'atticlevel',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }, {
                                            fieldLabel: 'Újépítésű',
                                            name: 'newlybuilt',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }, {
                                            fieldLabel: 'Lift',
                                            name: 'elevator',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }, {
                                            fieldLabel: 'Kertkapcsolat',
                                            name: 'gardencontact',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }, {
                                            fieldLabel: 'Háziállat hozható',
                                            name: 'petallowed',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }, {
                                            fieldLabel: 'Terasz, erkély',
                                            name: 'terrace',
                                            xtype: 'combobox',
                                            editable: false,
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{staticsTerraceType}'
                                            },
                                            displayField: 'name',
                                            valueField: 'val',
                                            allowBlank: true
                                        }, {

                                            fieldLabel: 'Panoráma',
                                            name: 'outlook',
                                            xtype: 'combobox',
                                            editable: false,
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{staticsPanoramaType}'
                                            },
                                            displayField: 'name',
                                            valueField: 'val'

                                        }, {


                                            fieldLabel: 'Energetikai besorolás',
                                            name: 'energy_rating',
                                            xtype: 'combobox',
                                            editable: false,
                                            queryMode: 'remote',
                                            bind: {
                                                store: '{staticsEnergyRatingType}'
                                            },
                                            displayField: 'name',
                                            valueField: 'val'
                                        }]

                                }]
                        },
                        {
                            columnWidth: .5,
                            items: [{
                                xtype: 'fieldset',
                                title: 'Adatok',
                                defaultType: 'textfield',
                                margin: '10 0 0 0',
                                defaults: {
                                    anchor: '100%'
                                },

                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Telekméret',
                                        layout: 'hbox',
                                        combineErrors: true,
                                        defaultType: 'numberfield',
                                        defaults: {
                                            hideLabel: 'true'
                                        },
                                        items: [{
                                            fieldLabel: 'm2',
                                            name: 'lotsize',
                                            emptyText: 'négyzetméter',
                                            reference: 'lotsize_m3',
                                            flex: 1,
                                            listeners: {
                                                blur: 'lotsizeChangem3',
                                                afterrender: 'lotsizeChangem3'
                                            }
                                        }, {
                                            xtype: 'displayfield',
                                            margin: '0 0 0 6',
                                            value: 'm2'
                                        }, {
                                            fieldLabel: 'n4',
                                            emptyText: 'négyszögöl',
                                            name: 'lotsize2',
                                            reference: 'lotsize_n4',
                                            flex: 1,
                                            margin: '0 0 0 6',
                                            listeners: {
                                                blur: 'lotsizeChangen4'
                                            }

                                        }, {
                                            xtype: 'displayfield',
                                            margin: '0 0 0 6',
                                            value: 'négyszögöl'
                                        }]
                                    }, {
                                        fieldLabel: 'Építési idő',
                                        name: 'builddate',
                                        xtype: 'numberfield'
                                    }, {
                                        fieldLabel: 'Ingatlan szintjei',
                                        name: 'building_levels',
                                        xtype: 'numberfield'
                                    }, {
                                        fieldLabel: 'Ingatlan minősítése',
                                        name: 'rate',
                                        xtype: 'combobox',
                                        editable: false,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsRatingType}'
                                        },
                                        displayField: 'name',
                                        valueField: 'val'
                                    }, {
                                        fieldLabel: 'Medence',
                                        name: 'pool_type',
                                        xtype: 'combobox',
                                        editable: false,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsPoolType}'
                                        },
                                        displayField: 'name',
                                        valueField: 'val'

                                    }, {

                                        fieldLabel: 'Komfort',
                                        name: 'conveniences',
                                        xtype: 'combobox',
                                        editable: false,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsConveniencesType}'
                                        },
                                        displayField: 'name',
                                        valueField: 'val'

                                    }, {
                                        fieldLabel: 'Állapot',
                                        name: 'building_condition',
                                        xtype: 'combobox',
                                        editable: false,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsBuildingConditionType}'
                                        },
                                        displayField: 'name',
                                        valueField: 'val',

                                    }, {
                                        fieldLabel: 'Parkolás',
                                        name: 'parking',
                                        xtype: 'combobox',
                                        editable: false,
                                        queryMode: 'remote',
                                        bind: {
                                            store: '{staticsParkingType}'
                                        },
                                        displayField: 'name',
                                        valueField: 'val'

                                    }]

                            }]
                        },
                        {
                            title: 'Eladó',
                            layout: 'column',
                            reference: 'selltab',
                            columnWidth: 1,
                            collapsible: true,
                            collapsed: true,
                            disabled: true,
                            style: {
                                marginTop: '15px'
                            },
                            listeners: {
                                activate: 'setCollectedData'
                            },
                            items: [
                                {
                                    columnWidth: .5,
                                    items: [

                                        {
                                            xtype: 'fieldset',
                                            title: 'Eladó ingatlan adatai',
                                            defaultType: 'textfield',
                                            margin: '10 10 0 0',
                                            defaults: {
                                                anchor: '100%'
                                            },

                                            items: [
                                                {
                                                    fieldLabel: 'Hiányzó szerződés',
                                                    name: 'sellvar[nocontract]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    xtype: 'hidden',
                                                    name: 'sellvar[id]'
                                                }, {
                                                    xtype: 'hidden',
                                                    name: 'sellvar[type]',
                                                    value: 2
                                                }, {
                                                    xtype: 'fieldcontainer',
                                                    fieldLabel: 'Eladási ár',
                                                    layout: 'hbox',
                                                    combineErrors: true,
                                                    defaultType: 'textfield',
                                                    defaults: {
                                                        hideLabel: 'true'
                                                    },
                                                    items: [{
                                                        name: 'sellvar[price]',
                                                        xtype: 'numberfield',
                                                        flex: 1

                                                    }, {
                                                        name: 'sellvar[price_dev]',
                                                        xtype: 'combobox',
                                                        editable: false,
                                                        flex: 1,
                                                        margin: '0 0 0 6',
                                                        queryMode: 'remote',
                                                        bind: {
                                                            store: '{valutaType}'
                                                        },
                                                        displayField: 'name',
                                                        valueField: 'val',
                                                        value: 'HUF'
                                                    }]
                                                }, {
                                                    xtype: 'fieldcontainer',
                                                    fieldLabel: 'Közös költség',
                                                    layout: 'hbox',
                                                    combineErrors: true,
                                                    defaultType: 'textfield',
                                                    defaults: {
                                                        hideLabel: 'true'
                                                    },
                                                    items: [{
                                                        name: 'sellvar[common_cost]',
                                                        xtype: 'numberfield',
                                                        flex: 1
                                                    }, {
                                                        name: 'sellvar[common_cost_dev]',
                                                        xtype: 'combobox',
                                                        editable: false,
                                                        flex: 1,
                                                        margin: '0 0 0 6',
                                                        queryMode: 'remote',
                                                        bind: {
                                                            store: '{valutaType}'
                                                        },
                                                        displayField: 'name',
                                                        valueField: 'val',
                                                        value: 'HUF'
                                                    }, {
                                                        xtype: 'displayfield',
                                                        margin: '0 0 0 6',
                                                        value: '/Hó'
                                                    }]
                                                }, {
                                                    fieldLabel: 'Bútorozás',
                                                    name: 'sellvar[furniture_type]',
                                                    xtype: 'combobox',
                                                    editable: false,
                                                    queryMode: 'remote',
                                                    bind: {
                                                        store: '{staticsFurnitureType}'
                                                    },
                                                    displayField: 'name',
                                                    valueField: 'val'

                                                }, {
                                                    fieldLabel: 'Jutalék',
                                                    name: 'sellvar[comission]'
                                                }, {
                                                    fieldLabel: 'Értesítés',
                                                    name: 'sellvar[enddate]',
                                                    format: 'Y-m-d',
                                                    xtype: 'datefield'
                                                }]
                                        }, {
                                            xtype: 'fieldset',
                                            title: 'Áttöltés paraméterek',
                                            defaultType: 'textfield',
                                            margin: '10 10 0 0',
                                            items: [
                                                {
                                                    fieldLabel: 'Aktív',
                                                    name: 'sellvar[active]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'Webre ne',
                                                    name: 'sellvar[notonweb]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'Ajánlat',
                                                    name: 'sellvar[offer]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'Ingatlan.com',
                                                    name: 'sellvar[ing_com]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'GDN',
                                                    name: 'sellvar[gdn]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }
                                            ]
                                        }, {
                                            xtype: 'panel',
                                            reference: 'sellPretext',
                                            style: {'padding': '20px;'},
                                            html: ''
                                        }

                                    ]

                                },
                                {
                                    columnWidth: .5,
                                    items: [{
                                        xtype: 'fieldset',
                                        title: 'Leírás',
                                        defaultType: 'textfield',
                                        margin: '10 0 0 0',
                                        items: [
                                            {
                                                fieldLabel: 'Leírás (magyar)',
                                                name: 'sellvar[description]',
                                                xtype: 'textarea',
                                                labelAlign: "top",
                                                anchor: '100%',
                                                height: 200

                                            }, {
                                                fieldLabel: 'Leírás (angol)',
                                                name: 'sellvar[description_en]',
                                                xtype: 'textarea',
                                                labelAlign: "top",
                                                anchor: '100%',
                                                height: 200

                                            }
                                        ]
                                    }
                                    ]

                                }
                            ]

                        },
                        {
                            title: 'Kiadó',
                            layout: 'column',
                            reference: 'renttab',
                            columnWidth: 1,
                            collapsible: true,
                            collapsed: true,
                            disabled: true,
                            style: {
                                marginTop: '15px'
                            },
                            listeners: {
                                activate: 'setCollectedData'
                            },
                            items: [
                                {
                                    columnWidth: .5,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Kiadó ingatlan adatai',
                                            defaultType: 'textfield',
                                            margin: '10 10 0 0',
                                            defaults: {
                                                anchor: '100%'
                                            },

                                            items: [
                                                {
                                                    fieldLabel: 'Hiányzó szerződés',
                                                    name: 'rentvar[nocontract]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    xtype: 'hidden',
                                                    name: 'rentvar[id]'
                                                }, {
                                                    xtype: 'hidden',
                                                    name: 'rentvar[type]',
                                                    value: 1
                                                }, {
                                                    fieldLabel: 'Bérbeadási ár',
                                                    xtype: 'fieldcontainer',
                                                    layout: 'hbox',
                                                    combineErrors: true,
                                                    defaultType: 'textfield',
                                                    defaults: {
                                                        hideLabel: 'true'
                                                    },
                                                    items: [{
                                                        name: 'rentvar[price]',
                                                        xtype: 'numberfield',
                                                        flex: 1

                                                    }, {
                                                        name: 'rentvar[price_dev]',
                                                        xtype: 'combobox',
                                                        editable: false,
                                                        flex: 1,
                                                        margin: '0 0 0 6',
                                                        queryMode: 'remote',
                                                        bind: {
                                                            store: '{valutaType}'
                                                        },
                                                        displayField: 'name',
                                                        valueField: 'val',
                                                        value: 'HUF'
                                                    }, {
                                                        xtype: 'displayfield',
                                                        margin: '0 0 0 6',
                                                        value: '/Hó'
                                                    }]
                                                }, {
                                                    fieldLabel: 'Nettó bérbead. ár',
                                                    xtype: 'fieldcontainer',
                                                    layout: 'hbox',
                                                    combineErrors: true,
                                                    defaultType: 'textfield',
                                                    defaults: {
                                                        hideLabel: 'true'
                                                    },
                                                    items: [{
                                                        name: 'rentvar[price_net]',
                                                        xtype: 'numberfield',
                                                        flex: 1

                                                    }, {
                                                        name: 'rentvar[price_net_dev]',
                                                        xtype: 'combobox',
                                                        editable: false,
                                                        flex: 1,
                                                        margin: '0 0 0 6',
                                                        queryMode: 'remote',
                                                        bind: {
                                                            store: '{valutaType}'
                                                        },
                                                        displayField: 'name',
                                                        valueField: 'val',
                                                        value: 'HUF'
                                                    }, {
                                                        xtype: 'displayfield',
                                                        margin: '0 0 0 6',
                                                        value: '/Hó'
                                                    }]
                                                }, {
                                                    fieldLabel: 'Kaució',
                                                    name: 'rentvar[caution_type]',
                                                    xtype: 'combobox',
                                                    queryMode: 'remote',
                                                    editable: false,
                                                    bind: {
                                                        store: '{staticsCautionType}'
                                                    },
                                                    displayField: 'name',
                                                    valueField: 'val'
                                                }, {
                                                    xtype: 'fieldcontainer',
                                                    fieldLabel: 'Közös költség',
                                                    layout: 'hbox',
                                                    combineErrors: true,
                                                    defaultType: 'textfield',
                                                    defaults: {
                                                        hideLabel: 'true'
                                                    },
                                                    items: [{
                                                        name: 'rentvar[common_cost]',
                                                        xtype: 'numberfield',
                                                        flex: 1
                                                    }, {
                                                        name: 'rentvar[common_cost_dev]',
                                                        xtype: 'combobox',
                                                        editable: false,
                                                        flex: 1,
                                                        margin: '0 0 0 6',
                                                        queryMode: 'remote',
                                                        bind: {
                                                            store: '{valutaType}'
                                                        },
                                                        displayField: 'name',
                                                        valueField: 'val',
                                                        value: 'HUF'
                                                    }, {
                                                        xtype: 'displayfield',
                                                        margin: '0 0 0 6',
                                                        value: '/Hó'
                                                    }]
                                                }, {
                                                    fieldLabel: 'Bútorozás',
                                                    name: 'rentvar[furniture_type]',
                                                    xtype: 'combobox',
                                                    editable: false,
                                                    queryMode: 'remote',
                                                    bind: {
                                                        store: '{staticsFurnitureType}'
                                                    },
                                                    displayField: 'name',
                                                    valueField: 'val'
                                                }, {
                                                    fieldLabel: 'Jutalék',
                                                    name: 'rentvar[comission]'
                                                }, {
                                                    fieldLabel: 'Rövidtávra is',
                                                    name: 'rentvar[shortterm]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1'
                                                }, {
                                                    fieldLabel: 'Bérbeadási határidő',
                                                    name: 'rentvar[enddate]',
                                                    format: 'Y-m-d',
                                                    xtype: 'datefield'
                                                }]
                                        }, {
                                            xtype: 'fieldset',
                                            title: 'Áttöltés paraméterek',
                                            defaultType: 'textfield',
                                            margin: '10 10 0 0',
                                            items: [
                                                {
                                                    fieldLabel: 'Aktív',
                                                    name: 'rentvar[active]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'Webre ne',
                                                    name: 'rentvar[notonweb]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'Ajánlat',
                                                    name: 'rentvar[offer]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'Ingatlan.com',
                                                    name: 'rentvar[ing_com]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }, {
                                                    fieldLabel: 'GDN',
                                                    name: 'rentvar[gdn]',
                                                    xtype: 'checkbox',
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }
                                            ]
                                        }, {
                                            xtype: 'panel',
                                            reference: 'rentPretext',
                                            style: {'padding': '20px;'},
                                            html: ''
                                        }
                                    ]

                                }, {
                                    columnWidth: .5,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Leírás',
                                            defaultType: 'textfield',
                                            margin: '10 0 0 0',
                                            items: [{
                                                fieldLabel: 'Leírás (magyar)',
                                                name: 'rentvar[description]',
                                                xtype: 'textarea',
                                                labelAlign: "top",
                                                anchor: '100%',
                                                height: 200

                                            }, {
                                                fieldLabel: 'Leírás (angol)',
                                                name: 'rentvar[description_en]',
                                                xtype: 'textarea',
                                                labelAlign: "top",
                                                anchor: '100%',
                                                height: 200

                                            }]
                                        }
                                    ]

                                }]
                        }
                    ]

                }, {
                    title: 'Képek',
                    bodyPadding: 0,
                    disabled: true,
                    layout: 'hbox',
                    listeners: {
                        activate: 'loadImages'
                    },
                    tbar: [{
                        xtype: 'button',
                        text: 'Képek feltöltése',
                        handler: 'onFormImageupload',
                        cls: 'addbtn'
                    }, '->', {
                        xtype: 'button',
                        text: 'Képek törlése',
                        handler: 'onDeleteImages'
                    }],

                    items: [
                        {
                            flex: 3,
                            title: 'Publikus képek',
                            bodyPadding: 10,
                            autoScroll: true,
                            layout: 'fit',
                            items: [
                                {
                                    reference: 'publicImages',
                                    autoHeight: true,
                                    bind: {
                                        store: '{publicImagesList}'
                                    },
                                    tpl: new Ext.XTemplate(
                                        '<ul class="sortimages"><tpl for=".">',
                                        '<li class="thumb-wrap" data-id="{id}" id = "public-{property_id}-{id}">',
                                        '<img src="\{image_tn}" width=200px; style="min-height:150px;"/>',
                                        '<div class="bottom-tools"><a href="javascript:void(0);" class="unpublic-image"></a> <a href="javascript:void(0);" class="delete-image"></a></div><div class="oname">{original_name}</div><span style="position:absolute; top:15px; right:15px;">{ordered}</span>',
                                        '</li>',
                                        '</tpl></ul><div class="clearfix"></div>'
                                    ),
                                    listeners: {
                                        itemmousedown: 'itemAction',
                                    },
                                    /*
                                    draggable: {
                                    //    delegate: 'li'
                                    },*/
                                    itemSelector: 'li.thumb-wrap',
                                    emptyText: 'No images available',
                                    xtype: 'dataview'
                                }
                            ]

                        }, {
                            flex: 1,
                            title: 'Nem publikus képek',
                            layout: 'fit',
                            autoScroll: true,
                            bodyPadding: 10,
                            items: [
                                {
                                    reference: 'notPublicImages',
                                    autoHeight: true,
                                    bind: {
                                        store: '{privateImagesList}'
                                    },
                                    tpl: new Ext.XTemplate(
                                        '<tpl for=".">',
                                        '<div style="margin-bottom: 10px; margin-right:10px; float:left; position:relative;" class="thumb-wrap" id = "public-{property_id}-{id}">',
                                        '<img src="\{image_tn}" width=200px;/>',
                                        '<div class="bottom-tools"><a href="javascript:void(0);" class="public-image"></a> <a href="javascript:void(0);" class="delete-image"></a></div><div class="oname">{original_name}</div>',
                                        '</div>',
                                        '</tpl>'
                                    ),
                                    listeners: {
                                        itemmousedown: 'itemAction'
                                    },
                                    itemSelector: 'div.thumb-wrap',
                                    emptyText: 'No images available',
                                    xtype: 'dataview'
                                }
                            ]
                        }
                    ]

                }, {
                    title: 'Dokumentumok',
                    bodyPadding: 0,
                    layout: 'fit',
                    disabled: true,
                    listeners: {
                        activate: 'loadDocuments'
                    },
                    tbar: [{
                        xtype: 'button',
                        text: 'Új fájl feltöltése',
                        handler: 'onFormDocumentupload',
                        cls: 'addbtn'
                    }],
                    items: [
                        {
                            xtype: 'gridpanel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bind: {
                                store: '{documentsList}'
                            },
                            reference: 'propertiesDocumentsGrid',
                            autoScroll: true,
                            loadMask: true,
                            scroll: true,
                            flex: 1,
                            columns: [
                                {
                                    text: 'Fájl',
                                    dataIndex: 'hash',
                                    width: 120,
                                    renderer: function (value, row, data) {
                                        if (data.get('filetype') == 'jpg') {
                                            return '<img src="' + value + '" />';
                                        } else {
                                            return '<a href="/admin/properties_documents/download/' + value + '"  target="_blank" class="download"/><span></span>LETÖLT</a>';
                                        }

                                    }
                                }, {
                                    text: 'Megnevezés',
                                    dataIndex: 'title',
                                    flex: 1
                                }, {
                                    text: 'Fájl neve',
                                    dataIndex: 'originalname',
                                    flex: 1
                                }, {
                                    text: 'Típus',
                                    dataIndex: 'document_type_name',
                                    flex: 1
                                }, {
                                    text: 'Létrehozva',
                                    dataIndex: 'created',
                                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                    flex: 1
                                }, {
                                    xtype: 'actioncolumn',
                                    width: 50,
                                    items: [{
                                        iconCls: 'action edit',
                                        tooltip: 'Dokumentum módosítása',
                                        handler: 'onEditDocument'
                                    }, {

                                        iconCls: 'action delete',
                                        tooltip: 'Dokumentum törlése',
                                        handler: 'onDeleteDocument'
                                    }]
                                }
                            ]
                        }]
                }, {
                    title: 'Kapcsolattartók',
                    bodyPadding: 0,
                    layout: 'fit',
                    listeners: {
                        activate: 'loadContacts'
                    },
                    disabled: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bind: {
                                store: '{contactsList}'
                            },
                            reference: 'propertiesContactsGrid',
                            autoScroll: true,
                            loadMask: true,
                            scroll: true,
                            flex: 1,
                            columns: [
                                {
                                    text: 'Vezetéknév',
                                    dataIndex: 'lastname',
                                    flex: 1
                                }, {
                                    text: 'Keresztnév',
                                    dataIndex: 'firstname',
                                    flex: 1
                                }, {
                                    text: 'Telefonszám',
                                    dataIndex: 'phone1'
                                }, {
                                    text: 'Státusz',
                                    dataIndex: 'type_name',
                                    flex: 1
                                }, {
                                    text: 'Email',
                                    dataIndex: 'email1',
                                    flex: 1
                                }, {
                                    text: 'Létrehozva',
                                    dataIndex: 'created',
                                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                    flex: 1
                                }, {
                                    xtype: 'actioncolumn',
                                    width: 50,
                                    items: [{
                                        iconCls: 'action delete',
                                        tooltip: 'Kapcsolat törlése (Ügyfél nem törlődik)',
                                        handler: 'onDeleteContact'
                                    }]
                                }
                            ],
                            tbar: [{
                                xtype: 'button',
                                text: 'Új kapcsolat létrehozása',
                                handler: 'onCreateContact',
                                cls: 'addbtn'
                            }]
                        }]
                }]

            }
        }
    ],
    buttons: [{
        text: 'Mégse',
        handler: 'onFormCancel'
    }, {
        text: 'Mentés és bezár',
        handler: 'onFormSaveClose'
    }, {
        text: 'Mentés',
        handler: 'onFormSave'
    }]
});
