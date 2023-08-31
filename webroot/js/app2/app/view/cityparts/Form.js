Ext.define('Tscrm.view.cityparts.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.citypartsForm',
    xtype: 'citypartsForm',
    controller: 'citypartsController' ,    
    title: 'Városrész módosítása',
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
        type: 'citypartsModel'
    },    
    items:[ 
        {
            xtype: 'form',
            url: '/admin/cityparts/add.json',
            reference: 'citypartsForm',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },            
            items: [
                
                {
                    xtype:'hidden',
                    name: 'id'
                },{
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
                    listeners: {
                        select: 'onChangeCity'
                    }, 
                    allowBlank: false
                },{
                    name: 'district_id',
                    xtype: 'combobox',
                    fieldLabel: 'Kerület',
                    allowBlank: false,
                    queryMode: 'remote',
                    bind: {
                        store: '{districtList}'
                    }, 
                    typeAhead: false,
                    displayField: 'district',
                    minChars:2,
                    valueField: 'id', 
                    allowBlank: false
                },{
                    name: 'citypart',
                    xtype:'textfield',
                    fieldLabel: 'Városrész', 
                    allowBlank: true
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
        