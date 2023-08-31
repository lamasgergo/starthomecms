Ext.define('Tscrm.view.sent_properties_contacts.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.sentPropertiesContactsForm',
    requires : [
        'Tscrm.view.sent_properties_contacts.Controller',
        'Tscrm.view.sent_properties_contacts.Model'
    ],  
    viewModel: {
        type: 'sentPropertiesContactsModel'
    },          
    controller: 'sentPropertiesContactsController' ,    
    title: 'Kiajánlás küldése',
    width: 1000,
    height: 600,
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: false,
    resizable:false,   
    layout: 'fit',   
    items:[ 
        {
            xtype: 'form',
            url: '/admin/sent_properties_contacts/add.json',
            reference: 'sentPropertiesContactsForm',
            border: false,  
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    flex: 2,            
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Kapcsolattartó adatai',
                            margin: '10 10 10 10',
                            defaults: {
                                anchor: '100%'
                            },
                            defaultType: 'textfield',
                                items:[                    
                                {      
                                    xtype:'combobox',
                                    fieldLabel: 'Ügyfél',
                                    name: 'contact[id]',
                                    listeners: {
                                        select: 'savedContact'
                                    },
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{contactsSelect}'
                                    }, 
                                    typeAhead: true,
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
                                        flex: 1,                                            
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
                                        flex: 2,
                                        margin: '0 0 0 6',
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
                                        flex: 1,                                            
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
                                        flex: 2,
                                        margin: '0 0 0 6'
                                    }
                                    ]
                                },{
                                    fieldLabel: 'Telszám megjegyz.',
                                    name: 'contact[phone1note]' 
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
                                }
                            ]
                        }
                    ]
                },{
                    flex: 3, 
                    items:[ 
                    {
                            xtype:'hidden',
                            name: 'properties_variation_ids'
                    },
                    {
                        xtype: 'gridpanel',
                        bind: {
                            store: '{propertiesList}'
                        },                    
                        reference: 'propertiesToContactGrid',
                        autoScroll:true,
                        loadMask: true,
                        scroll:true,
                        flex:1,
                        viewConfig: {
                            loadMask: true,
                            loadingHeight: 500 ,
                            height:500
                        },
                        columns: [
                            {
                                text: 'Kép',
                                dataIndex: 'mainimage',
                                width: 80 ,
                                sortable: false,
                                renderer: function(value,row,data){
                                    op='';
                                    if(data.get('active')=='0'){
                                        op='style="opacity:0.5"';
                                    }
                                    return '<img src="'+value+'" '+op+'/>';
                                }
                            }, {
                                text: 'Utca',
                                dataIndex: 'address',
                                flex: 1,
                                sortable: false,
                                renderer: function(value,row,data){
                                    addr='';
                                    return ''+value+'<br>'+data.get('fullname')+'<br>'+data.get('phone1');
                                }
                            },{
                                text: 'Típus',
                                dataIndex: 'building_type_name',
                                hidden: true,
                                sortable: false
                            }, {
                                text: 'Ár',
                                dataIndex: 'price_formatted',
                                width: 125,
                                align :'right',
                                sortable: false
                                
                            }, {
                                xtype:'actioncolumn',
                                width:50,
                                items: [{
                                    iconCls: 'action delete',
                                    tooltip: 'Törlés',
                                    handler: 'deleteRow'
                                }]
                            }
                        ]
                    }                    
                    ]    
                }
            ],
            bbar:[{
                xtype: 'button',
                text: 'Kiajánlás küldése',   
                handler: 'onFormSave'
            }]
        } 
    ]
});
