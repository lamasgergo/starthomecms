/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Tscrm.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: "widget.viewportTs",
    layout: 'border',      
    initComponent: function() {
        this.callParent();
    }, 
    requires: [
        'Tscrm.view.Model',
        'Tscrm.view.Controller'
    ],  
    controller: 'viewportController',  
    viewModel: {
        type: 'viewportModel'
    },       
    items: [{

        region: 'west',
        cls: 'nobg',
        dockedItems: [
        {
            dock: 'left',
            xtype: 'toolbar',
            itemId: 'mainmenu',
            cls: 'mainmenu',
            width:228,
            items: [
                {
                    xtype:'panel',
                    html:'StartHome CRM',
                    height:100,
                    width:228,
                    cls: 'logo'    
                },
                {
                    xtype:'panel',
                    bind: {
                       html: '<img src="{avatar_mini}"><br><span>{fullname}</span>'
                    },                            
                    html: '<img src="/img/nousericon.png"><br><span>Vendég</span>',                    
                    height:100,
                    cls: 'user'    
                },
                {
                    iconCls: 'fa fa-home' ,
                    icon: null,
                    text: 'Ingatlanok',
                    scale: 'large',
                    itemId: 'list_property',
                    cls: 'onemenu',
                    textAlign:'left',
                    iconAlign:'left',
                    xtype:'button'
                   
                },
                {
                    iconCls: 'fa fa-search' ,
                    icon: null,
                    text: 'Keresések',
                    scale: 'large',
                    cls: 'onemenu',
                    itemId: 'list_searches',
                    textAlign:'left',
                    iconAlign:'left'
                },
                {
                    iconCls: 'fa fa-user' ,
                    icon: null,
                    text: 'Ügyfelek',
                    scale: 'large',
                    cls: 'onemenu',
                    itemId: 'list_contacts',
                    textAlign:'left',
                    iconAlign:'left'      
                }/*,
                {
                    iconCls: 'fa fa-bar-chart' ,
                    icon: null,
                    text: 'Riportok',
                    scale: 'large',
                    textAlign:'left',
                    iconAlign:'left',
                    menu: [                 
                        {
                            text: 'Kereső igények',
                            cls: 'menuitem',
                            itemId: 'list_users'
                        },                    
                        {
                            text: 'Mutatott ingatlanok',
                            cls: 'menuitem',
                            itemId: 'list_roles'
                        }
                    ]
                }*/,
                {
                    iconCls: 'fa fa-cog' ,
                    icon: null,
                    text: 'Rendszer',
                    scale: 'large',
                    textAlign:'left',
                    iconAlign:'left',
                    menu: [                 
                        {
                            text: 'Felhasználók',
                            cls: 'menuitem',
                            itemId: 'list_users'
                        },                    
                        {
                            text: 'Felhasználói csoportok',
                            cls: 'menuitem',
                            itemId: 'list_roles'
                        },                    
                        {
                            text: 'Adatbázis',
                            menu:[
                                {
                                    text: 'Települések',
                                    cls: 'menuitem',
                                    itemId: 'list_cities',                                        
                                },{
                                    text: 'Kerületek',
                                    cls: 'menuitem',
                                    itemId: 'list_districts',                                        
                                },{
                                    text: 'Városrészek',
                                    cls: 'menuitem',
                                    itemId: 'list_cityparts',                                        
                                },{
                                    text: 'Utcák',
                                    cls: 'menuitem',
                                    itemId: 'list_streets',                                        
                                }
                            
                            ]
                        }
                    ]
                },
                {
                    iconCls: 'fa fa-lock' ,
                    icon: null,
                    text: 'Kijelentkezés',
                    scale: 'large',
                    cls: 'onemenu',
                    itemId: 'logout',
                    textAlign:'left',
                    iconAlign:'left',
                    handler: function(){
                        window.location = '/admin/users/logout';
                    }      
                }
            ]
            
        }]
    },{
        region: 'center',
        cls: 'right',
        layout: 'absolute',
        items: [
                {
                    xtype: 'panel',
                    x: 20,
                    y: 20,
                    width:300,
                    cls: 'dashboardbox',
                    items:[
                        {
                            xtype: 'panel',
                            cls: 'text',
                            bind: {
                               html: '<h1>Ügyfelek</h1>Ügyfelek száma jelenleg a rendszerben<b>{contact_num}</b>'    
                            },                            
                            html: '<h1>Ügyfelek</h1>Ügyfelek száma jelenleg a rendszerben<b>0</b>'
                        },{
                            xtype:'combobox',
                            itemId: 'contactSearch',
                            cls: 'text',
                            width:'100%',
                            queryMode: 'remote',
                            bind: {
                                store: '{contactsSelect}'
                            },
                            typeAhead: true,
                            displayField: 'fullname',
                            valueField: 'id',
                            tpl:'<tpl for="."><div class="x-boundlist-item x-combo-list-item fast-search-property" ><b>{fullname}</b><br>{phone1}<div class="clearfix"></div></div></tpl>'  
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    x: 350,
                    width:300,
                    y: 20,
                    cls: 'dashboardbox',
                    items:[
                        {
                            xtype: 'panel',
                            cls: 'text',
                            bind: {
                               html: '<h1>Ingatlanok</h1>Jelenleg az ingatlanok száma<b>{property_num}</b>'    
                            },                            
                            html: '<h1>Ingatlanok</h1>Jelenleg az ingatlanok száma<b>0</b>'
                        },{
                            xtype:'combobox',
                            itemId: 'propertySearch',
                            cls: 'text',
                            width:'100%',
                            queryMode: 'remote',
                            bind: {
                                store: '{propertiesSelect}'
                            },    
                            typeAhead: true,
                            displayField: 'address',
                            valueField: 'id',
                            tpl:'<tpl for="."><div class="x-boundlist-item x-combo-list-item fast-search-property" ><tpl if="mainimage !=\'\'"><img src="{mainimage}"></tpl><b>{address}</b><br>{Owner.lastname} {Owner.firstname} ({Owner.phone1})<div class="clearfix"></div></div></tpl>' 

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    x: 680,
                    width:300,
                    y: 20,
                    cls: 'dashboardbox',
                    items:[
                        {
                            xtype: 'panel',
                            cls: 'text',
                            bind: {
                                html: '<h1>Kereső igények</h1> Jelenlegi keresési igények száma <b>{search_num}</b>'
                            },
                            html: '<h1>Kereső igények</h1> Jelenlegi keresési igények száma <b>0</b>'
                        },{
                            xtype:'combobox',
                            itemId: 'contactSearchSearch',
                            cls: 'text',
                            width:'100%',
                            queryMode: 'remote',
                            //store: 'Properties',
                            
                            bind: {
                                store: '{searchesSelect}'
                            },    
                            typeAhead: true,
                            displayField: 'contact_fullname',
                            valueField: 'contact_id',
                            tpl:'<tpl for="."><div class="x-boundlist-item x-combo-list-item fast-search-property" ><b>{fullname}</b><br>{phone1}<div class="clearfix"></div></div></tpl>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    x: 20,
                    y: 290,
                    width:630,
                    cls: 'eventbox',
                    items:[
                        {
                            xtype: 'panel',
                            cls: 'text',
                            html: '<h1>Közeledő események</h1>Egy héten belül esedékes naptár bejegyzések',
                                                         
                        },{
                            /*
                            reference: 'calendarAdverts',
                            autoHeight:true,
                            cls: 'frontCalendar',
                            bind: {
                               html:'<div class="calendarItem thumb-wrap"><div class="date">{closedate_num}</div><div class="text">Közelgő bérleti idővel rendelkező ingatlant talált a rendszer. </div><div class="clearfix"></div></div>'    
                            },                            
                            html: 'Lejáró ingatlanok ellenőrzése',*/
                            bbar:[
                                {
                                    iconCls: 'fa fa-home' ,
                                    icon: null,

                                    bind: {
                                       text:'{closedate_num} lejáró ingatlan megtekintése'    
                                    },
                                    text: 'Lejáró ingatlanok megtekintése',
                                    xtype:'button',
                                    listeners: {
                                        click: 'endDateList', 
                                    }
                                   
                                }  
                            ]
                        },{
                            reference: 'calendarEvents',
                            autoHeight:true,
                            cls: 'frontCalendar',
                            bind: {
                                store: '{calendar}'
                            },
                            tpl: new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div class="calendarItem thumb-wrap">',
                                    '<div class="date">{date:date("d")}<span>{date:date("M")}</span></div>',
                                    '<div class="time">{date:date("H:i")}</div>',
                                    '<div class="text"><tpl if="!Ext.isEmpty(Streets.street)">{Streets.street}</tpl>',
                                    '<tpl if="!Ext.isEmpty(Contacts.id)">{Contacts.lastname} {Contacts.firstname}</tpl>',
                                    '<div class="note">{note}</div></div><div class="clearfix"></div>',
                                '</div>',
                                '</tpl>'
                            ),
                            listeners: {
                                itemdblclick: 'itemShow',
                            },
                            itemSelector: 'div.thumb-wrap',
                            emptyText: 'Nincs esemény',
                            xtype: 'dataview'
                        }
                     
                    ]
                }
                
        ],
         dockedItems: [{
            itemId: 'dockedMenu',
            xtype: 'toolbar',
            dock: 'bottom',
            items: []
        }]

    }] 
});

