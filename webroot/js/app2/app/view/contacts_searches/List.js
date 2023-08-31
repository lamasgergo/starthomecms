Ext.define('Tscrm.view.contacts_searches.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactsSearchesList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.contacts_searches.Model',
        'Tscrm.view.contacts_searches.Controller'
    ],    
    
    controller: 'contactsSearchesController',
    
    viewModel: {
        type: 'contactsSearchesModel'
    }, 
    title: 'Igények',
    width: (Global.maxWidth <1400?Global.maxWidth:1400),
    originalWidth:1000,
    height: (Global.maxHeight <700?Global.maxHeight:700),
    closable: true,
    closeAction: 'destroy',
    maximizable: true,
    minimizable: true,    
    layout: {
         type: 'border'
    },
    
    listeners:{
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
    items:[
        {
            region: 'west',
            collapsible: true,
            //collapsed:true,
            minWidth:200,  
            maxWidth:200,
            width:200,        
            split:true,
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
                        labelAlign: 'top',
                    },
                    defaults: {
                        anchor: '100%'
                    },                    
                    items: [{
                            fieldLabel: 'Azonosító',
                            name: 'contact_id',
                            listeners: {
                                specialkey: 'onSearchSubmit'
                            },
                            xtype: 'textfield'
                        },{
                            fieldLabel: 'Kereső neve',
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
                        },{
                            fieldLabel: 'Telefonszám',
                            name: 'phone',
                            listeners: {
                                specialkey: 'onSearchSubmit'
                            },
                            xtype: 'textfield'
                        },{
                            fieldLabel: 'Email cím',
                            name: 'email',
                            listeners: {
                                specialkey: 'onSearchSubmit'
                            },
                            xtype: 'textfield'
                        },{
                            fieldLabel: 'Relokációs cég',
                            name: 'internal_company',
                            listeners: {
                                specialkey: 'onSearchSubmit'
                            },
                            xtype: 'textfield'
                        },{
                            fieldLabel: 'Ügynök',
                            name: 'internal_agent',
                            listeners: {
                                specialkey: 'onSearchSubmit'
                            },
                            xtype: 'textfield'
                        },{
                            fieldLabel: 'Megjegyzés',
                            name: 'note',
                            listeners: {
                                specialkey: 'onSearchSubmit'
                            },
                            xtype: 'textfield'
                        },{
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
                            maxWidth:200,
                            listeners: {
                                collapse: 'onSearchSubmit',
                                render: function() {
                                    this.labelEl.dom.removeAttribute('for');
                                }
                            }
                        },{
                            name: 'disablesubmit',
                            xtype: 'hidden'
                        }]
            }],
            bbar:[{
                xtype: 'button',
                text: 'Új keresés',
                handler: 'onSearchReset'
            },{
                xtype: 'button',
                text: 'Keresés',
                itemId: 'search',
                handler: 'onSearchSubmit'
            }]

        },{
            region: 'east',
            collapsible: false,
            minWidth:200,
            floatable: false,
            split:true,
            layout:'fit',
            items:[{
                xtype : 'contactsEventsFastView'
            }]

        },{
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },            
            items:[
                {
                    xtype: 'gridpanel',
                    bind: {
                        store: '{requestsList}'
                    },                    
                    reference: 'requestsGrid',
                    autoScroll:true,
                    loadMask: true,
                    scroll:true,
                    flex:1,
                    columns: [
                        {
                            text: '#',
                            dataIndex: 'contact_id'
                        },
                        {
                            text: 'Név',
                            dataIndex: 'contact_fullname',
                            flex: 1,
                            renderer: function(value,row,data) {
                                if(data.data.note){row.tdAttr = 'data-qtip="' + data.data.note + '"';}
                                return value;
                            }
                        },{
                            text: 'Telefonszám',
                            dataIndex: 'contact_phone1',
                            hidden: true
                        }, {
                            text: 'Email',
                            dataIndex: 'contact_email1',
                            flex: 1
                            
                        }, {
                            text: 'Relokációs cég',
                            dataIndex: 'itnternalcompany',
                            flex: 1

                        },{
                            text: 'Típus',
                            dataIndex: 'type_list',
                            flex: 1
                        },{
                            text: 'Település',
                            dataIndex: 'city',
                            flex: 1,
                            hidden: true
                        },{
                            text: 'Kerület',
                            dataIndex: 'district',
                            flex: 1,
                            renderer: function(value,row,data) {
                                if(data.data.note){row.tdAttr = 'data-qtip="' + data.data.note + '"';}
                                return value;
                            }
                        }, {
                            text: 'Ár',
                            dataIndex: 'price_from',
                            flex: 1 ,
                            renderer: function(value,row,data){
                                f='';
                                if(data.get('price_from')>0){
                                    f=f+data.get('price_from');
                                }else{
                                    if(data.get('price_to')>0)
                                    {
                                        f='-';
                                    }
                                }
                                if(data.get('price_to')>0){
                                    f=f+'-'+data.get('price_to');
                                }else{
                                    if(data.get('price_from')>0)
                                    {
                                        f=f+'+';
                                    }
                                }

                                return f;
                            }
                        },{
                            text: 'Hálók száma',
                            dataIndex: 'bedroom_from',
                            flex: 1 ,
                            renderer: function(value,row,data){
                                f='';
                                if(data.get('bedroom_from')>0){
                                    f=f+data.get('bedroom_from');
                                }else{
                                    if(data.get('bedroom_to')>0)
                                    {
                                        f='-';
                                    }
                                }
                                if(data.get('bedroom_to')>0){
                                    f=f+'-'+data.get('bedroom_to');
                                }else{
                                    if(data.get('bedroom_from')>0)
                                    {
                                        f=f+'+';
                                    }
                                }

                                return f;
                            }
                        },{
                            text: 'Rögzítette',
                            dataIndex: 'Users.fullname',
                            flex: 1
                        },{
                            text: 'Létrehozva',
                            dataIndex: 'created',
                            flex: 1 ,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                        },{
                            xtype:'actioncolumn',
                            width:90,
                            items: [{
                                iconCls: 'action view',
                                tooltip: 'Igénynek megfelelő lakások',
                                handler: 'onSearchByRequest'
                            },{
                                iconCls: 'action edit',
                                tooltip: 'Igény módosítása',
                                handler: 'onEdit'
                            },{
                                iconCls: 'action delete',
                                tooltip: 'Igénynek törlése',
                                handler: 'onDeleteSearch'
                            }]
                        }
                    ],
                    listeners: {
                        rowclick: 'onRowClick',
                        rowdblclick: 'onRowDblClick'
                    }
                                                             
                }
            ],
            bbar: [{
                            xtype: 'pagingtoolbar',
                            bind: '{requestsList}',
                            displayInfo: true
            }]
        }
    ]
});
