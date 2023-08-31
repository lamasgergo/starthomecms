Ext.define('Tscrm.view.template.List', {
    extend: 'Ext.window.Window',
    alias: 'widget.templateList', 
    requires : [
        'Ext.grid.column.Action',
        'Tscrm.view.template.ListModel',
        'Tscrm.view.template.ListController'   
    ],    
    
    controller: 'list',
    
    viewModel: {
        type: 'list'
    }, 
    title: 'List',
    width: 800,
    height: 400,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: {
         type: 'border'
    },
    items:[
        {
            region: 'east',
            collapsible: true,
            minWidth:200,
            floatable: false,            
            split:true,
            reference: 'templateFastView',          
            xtype:'templateFastView'
        },
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },            
            items:[
                {
                    xtype: 'gridpanel',
                    //store:'Template',
                    bind: {
                        store: '{templateList}'
                    },                    
                    reference: 'templateGrid',
                    autoScroll:true,
                    loadMask: true,
                    scroll:true,
                    flex:1,
                    columns: [{
                            text: 'Kép',
                            dataIndex: 'image',
                            width: 80 ,
                            renderer: function(value){
                                return '<img src="'+value+'" />';
                            }
                        }, {
                            text: 'Utca',
                            dataIndex: 'address',
                            flex: 1,
                        }, {
                            text: 'Ár',
                            dataIndex: 'price',
                            width: 125,
                            renderer: Ext.util.Format.numberRenderer('0,000 Ft')
                            
                        }, {
                            text: 'Méret',
                            dataIndex: 'size',
                            width: 125,
                            renderer: Ext.util.Format.numberRenderer('0 m<sup>2</sup>')
                            
                        }, {
                            xtype:'actioncolumn',
                            width:50,
                            items: [{
                                icon: 'ext/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                                tooltip: 'Edit',
                                handler: 'onEdit'
                            },{
                                icon: 'ext/examples/restful/images/delete.png',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    alert("Terminate " + rec.get('firstname'));
                                }
                            }]
                        }
                    ],
                    listeners: {
                        rowclick: 'onRowClick',
                        rowdblclick: 'onRowDblClick'
                    },
                    tbar: [{
                            xtype: 'button',
                            text: 'Add',
                            handler: 'onAdd'
                    }]
                                                             
                }
            ],
            bbar: [{
                            xtype: 'pagingtoolbar',
                            //store: 'Template',   // same store GridPanel is using
                            bind: '{templateList}',
                            displayInfo: true
            }]
        }
    ]
});
