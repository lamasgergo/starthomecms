Ext.define('Tscrm.view.properties.PrintForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertiesPrintForm',
    reference: 'propertiesPrintFormWindow',
    requires : [
        'Tscrm.view.properties.Controller',
        'Tscrm.view.properties.Model'
    ],  
    viewModel: {
        type: 'propertiesModel'
    },          
    controller: 'propertiesController' ,    
    title: 'Cím kiadás',
    width: 300,
    height: 180,
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: false,
    resizable:false,   
    layout: 'fit',   
    items:[ 
        {
            xtype: 'form',
            reference: 'printForm',
            border: false,  
            bodyPadding: 10,
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [
                {
                    xtype:'hidden',
                    name: 'property_id'
                },{
                    xtype:'hidden',
                    name: 'todo'
                },{
                    xtype:'hidden',
                    name: 'idents'
                },{
                    fieldLabel: 'Név',
                    name: 'name'
                },{
                    fieldLabel: 'Telefonszám',
                    name: 'phone'
                },{
                    fieldLabel: 'Dátum',
                    name: 'date',
                    xtype: 'datefield',
                    value: new Date(),
                    format:'Y-m-d' 
                }
            ],
            bbar:[{
                xtype: 'button',
                text: 'Nyomtatás és vágólap',   
                handler: 'copyToClipboardAddressList'
            }]
        } 
    ]
});