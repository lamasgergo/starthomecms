Ext.define('Tscrm.view.streets.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.streetsForm',
    xtype: 'streetsForm',
    controller: 'streetsController' ,    
    title: 'Utca létrehozása/módosítása',
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
        type: 'streetsModel'
    },    
    items:[ 
        {
            xtype: 'form',
            url: '/admin/streets/add.json',
            reference: 'streetsForm',
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
                    reference: 'city_id',
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
                },
                {
                    name: 'district_id', 
                    xtype: 'combobox',
                    reference: 'district_id',
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
                    allowBlank: true
                },
                {
                    name: 'street',
                    xtype:'textfield',
                    reference: 'street',
                    fieldLabel: 'Utca', 
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
        