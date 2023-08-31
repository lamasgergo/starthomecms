Ext.define('Tscrm.view.districts.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.districtsForm',
    xtype: 'districtsForm',
    controller: 'districtsController' ,    
    title: 'Kerület létrehozása/módosítása',
    width: 300,
    height: 200,
    closable: true,
    closeAction: 'hide',
    constrain: true,
    maximizable: true,
    resizable:true,   
    layout: 'fit', 
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },    
    viewModel: {
        type: 'districtsModel'
    },    
    items:[ 
        {
            xtype: 'form',
            url: '/admin/districts/add.json',
            reference: 'districtsForm',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },            
            items: [
                
                {
                    xtype:'hidden',
                    name: 'id'
                },
           
                {
                    name: 'city_id',
                    xtype: 'combobox',
                    fieldLabel: 'Település',
                    allowBlank: false,
                    queryMode: 'remote',
                    bind: {
                        store: '{cityList}'
                    }, 
                    typeAhead: false,
                    displayField: 'city',
                    minChars:2,
                    valueField: 'id', 
                    allowBlank: false
                },
                {
                    name: 'district',
                    xtype:'textfield',
                    fieldLabel: 'Kerület', 
                    allowBlank: false
                },
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
        