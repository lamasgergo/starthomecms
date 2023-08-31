Ext.define('Tscrm.view.contacts.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactsList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.contacts.Model',
        'Tscrm.view.contacts.Controller'   
    ],    
    
    controller: 'contactsController',
    
    viewModel: {
        type: 'contactsModel'
    }, 
    title: 'Ügyfelek listázása',
    width: (Global.maxWidth <1400?Global.maxWidth:1400),
    originalWidth:1200,
    height: (Global.maxHeight <700?Global.maxHeight:700),
    closable: true,
    closeAction: 'destroy',
    maximizable: true,
    minimizable: true, 
    constrain: true,   
    layout: {
         type: 'border'
    },
    
    listeners:{
        show: 'reloadGrid',
        close: 'closeWin'                
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
                        anchor: '100%',
                        listeners: {
                            specialkey: 'onSearchSubmit'
                        }
                    },                    
                    items: [{
                        fieldLabel: 'Sorszám',
                        name: 'id',
                        xtype: 'textfield'
                    }, {
                        fieldLabel: 'Név',
                        name: 'name',
                        xtype: 'textfield'
                    },{
                        fieldLabel: 'Telefonszám',
                        name: 'phone',
                        xtype: 'textfield'
                    },{
                        fieldLabel: 'Email cím',
                        name: 'email',
                        xtype: 'textfield'
                    },{
                        fieldLabel: 'Relokációs cég',
                        name: 'internal_company',
                        xtype: 'textfield'
                    },{
                        fieldLabel: 'Megjegyzés',
                        name: 'note',
                        xtype: 'textfield'
                    },{
                        fieldLabel: 'Csak keresők',
                        name: 'onlysearchers',
                        xtype: 'checkbox',
                        labelAlign: 'left'
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
                                this.labelEl.dom.removeAttribute('for')
                            }
                        }
                    },{
                        fieldLabel: 'Belső kapcsolattartók',
                        name: 'seen_user_id[]',
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
                                this.labelEl.dom.removeAttribute('for')
                            }
                        }
                    }]
            }],
            bbar:[{
                    xtype: 'button',
                    text: 'Új keresés',
                    handler: 'onSearchReset'
            },{
                    xtype: 'button',
                    text: 'Keresés',
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
                        store: '{contactsList}'
                    },                    
                    reference: 'contactsGrid',
                    autoScroll:true,
                    loadMask: true,
                    scroll:true,
                    flex:1,
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
                                iconCls: 'action edit',
                                tooltip: 'Módosítás',
                                handler: 'onEdit'
                            },{
                                iconCls: 'action delete',
                                tooltip: 'Törlés',
                                handler: 'onDelete'
                            }]
                        }
                    ],
                    listeners: {
                        rowclick: 'onRowClick',
                        rowdblclick: 'onRowDblClick'
                    },
                    tbar: [
                    {
                            xtype: 'button',
                            text: 'Új kapcsolat',
                            handler: 'onAdd',
                            cls:'addbtn'
                    }]
                                                             
                }
            ],
            bbar: [{
                            xtype: 'pagingtoolbar',
                            bind: '{contactsList}',
                            displayInfo: true
            }]
        }
    ]
});
