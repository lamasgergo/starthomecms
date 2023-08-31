Ext.define('Tscrm.view.events.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.eventsList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.events.Model',
        'Tscrm.view.events.Controller'   
    ],    
    
    controller: 'eventsController',
    
    viewModel: {
        type: 'eventsModel'
    }, 
    title: 'List',
    width: 1000,
    originalWidth:1000,
    height: 600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,
    minimizable: true,    
    layout: {
         type: 'border'
    },
    
    listeners:{
         
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
            collapsed:true,
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
                    fieldDefaults: {
                        labelAlign: 'top',
                    },
                    defaults: {
                        anchor: '100%'
                    },                    
                    items: [{

                        allowBlank: false,
                        fieldLabel: 'Név',
                        name: 'city_id',
                        triggers: {
                            foo: {
                                cls: 'my-foo-trigger',
                                handler: function() {
                                    alert('foo trigger clicked');
                                }
                            }
                        },
                        xtype: 'textfield'
                    }]
            }],
            bbar:[{
                    xtype: 'button',
                    text: 'Keresés',
                    handler: 'onAdd'
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
                        store: '{eventsList}'
                    },                    
                    reference: 'eventsGrid',
                    autoScroll:true,
                    loadMask: true,
                    scroll:true,
                    selType: 'checkboxmodel',
                    flex:1,
                    columns: [
                       {
                            text: 'Vezetéknév',
                            dataIndex: 'lastname',
                            flex: 1
                        }, {
                            text: 'Keresztnév',
                            dataIndex: 'firstname',
                            flex: 1
                        },{
                            text: 'Telefonszám',
                            dataIndex: 'phone',
                            hidden: true
                        }, {
                            text: 'Email',
                            dataIndex: 'email',
                            flex: 1
                            
                        }, {
                            text: 'Létrehozva',
                            dataIndex: 'created',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                            
                        }
                    ],
                    listeners: {
                        rowdblclick: 'onRowDblClick'
                    }
                                                             
                }
            ],
            bbar: [{
                            xtype: 'pagingtoolbar',
                            bind: '{eventsList}',
                            displayInfo: true
            }]
        }
    ]
});
