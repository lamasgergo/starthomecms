Ext.define('Tscrm.view.images.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.imagesForm',
    requires : [
        'Tscrm.view.images.Controller'
    ],    
    controller: 'imagesController' ,    
    title: 'Képfeltöltés',
    width: 500,
    height: 200,
    closable: true,
    closeAction: 'hide',
    constrain: true,
    maximizable: false,
    resizable:false,   
    layout: 'fit',
    viewModel: {
     //   type: 'imagesModel'
    },    
    items:[ 
        {
            xtype: 'form',
            reference: 'imagesForm',
            url: '/admin/properties_images/add.json',
            border: false,  
            bodyPadding: 10,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype:'hidden',
                    name: 'property_id'
                },{
                    fieldLabel: 'Publikus',
                    name: 'active',
                    xtype:'checkbox',
                    inputValue: '1'
                },{
                    xtype: 'multifilefield', 
                    name: 'images[]',
                    allowBlank: true,
                    margin: '0 10 30 0',
                },{
                    text: 'Feltöltés',
                    handler: 'onFormSave',
                    xtype: 'button',
                    scale :'large'
                }
            ]
        }       
    ]
});