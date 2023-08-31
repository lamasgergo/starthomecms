Ext.define('Tscrm.view.layouts.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.layoutsForm',
    requires : [
        'Tscrm.view.layouts.Controller',
        'Tscrm.view.layouts.Model'
    ],    
    controller: 'layoutsController' ,    
    title: 'Elrendezés felvitele',
    width: 600,
    height: 400,
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: false,
    resizable:false,
    toFrontOnShow:true,
    layout: 'fit',
    viewModel: {
       type: 'layoutsModel'
    },    
    items:[ 
        {
            xtype: 'form',
            reference: 'layoutsForm',
            url: '/admin/properties_layouts/add.json',
            border: false,  
            bodyPadding: 10,
            defaults: {
                labelWidth:'50%'
            },            
            items: [
            {
                layout:'column',  
                defaults: {
                labelWidth:'50%'
                },               
                items:[
                {
                    columnWidth: .5,
                    defaultType: 'numberfield',
                    margin: '0 10 5 0',
                    defaults: {
                        width: '100%' ,
                        labelWidth:'300px'
                    },
                    items:[
                        {
                        xtype:'hidden',
                        name: 'id'
                    },{
                        xtype:'hidden',
                        name: 'property_id'
                    },{

                        fieldLabel: 'Fő elrendezés',
                        name: 'main',
                        xtype: 'checkbox',
                        inputValue: '1'
                    },{
                        fieldLabel: 'Nappali',
                        name: 'livingroom',
                        xtype: 'numberfield',
                        
                    },{
                        fieldLabel: 'Szoba',
                        name: 'room'
                    },{
                        fieldLabel: 'Félszoba',
                        name: 'halfroom'
                    },{
                        fieldLabel: 'WC',
                        name: 'toliett'
                    },{
                        fieldLabel: 'Fürdő',
                        name: 'bathroom'
                    },{
                        fieldLabel: 'Fürdő, WC -vel',
                        name: 'bathroom_toilett'
                    }
                 
                    ]
                },{
                    columnWidth: .5,
                    defaultType: 'numberfield',
                    defaults: {
                        width: '100%',
                        labelWidth:'300px'
                    },                  
                    items:[
                    {
                        fieldLabel: 'Amerikai konyha',
                        name: 'american_kitchen'
                    },{
                        fieldLabel: 'Szeparált konyha',
                        name: 'kitchen'
                    },{
                        fieldLabel: 'Étkezős konyha',
                        name: 'eating_kitchen'
                    },{
                        fieldLabel: 'Étkező',
                        name: 'diningroom'
                    },{
                        fieldLabel: 'Tároló, kamra',
                        name: 'storage'
                    },{
                        fieldLabel: 'Hall',
                        name: 'hall'
                    },{   
                        fieldLabel: 'Megjegyzés',
                        xtype: 'textarea', 
                        name: 'note',
                        allowBlank: true
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