Ext.define('Tscrm.view.cities.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.citiesForm',
    xtype: 'citiesForm',
    controller: 'citiesController' ,    
    title: 'Település létrehozása/módosítása',
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
        type: 'citiesModel'
    },    
    items:[ 
        {
            xtype: 'form',
            url: '/admin/cities/add.json',
            reference: 'citiesForm',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },            
            items: [
                
                {
                    xtype:'hidden',
                    name: 'id'
                },{
                    name: 'city',
                    xtype:'textfield',
                    fieldLabel: 'Település', 
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
        