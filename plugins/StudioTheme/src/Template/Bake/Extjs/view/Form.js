Ext.define('Tscrm.view.__TABLEIZE__.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.__LCFIRST__Form',
    xtype: '__LCFIRST__Form',
    controller: '__LCFIRST__Controller' ,    
    title: '__CLASSNAME__ form',
    width: 500,
    height: 400,
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
        type: '__LCFIRST__Model'
    },    
    items:[ 
        {
            xtype: 'form',
            url: '/admin/__TABLEIZE__/add.json',
            reference: '__LCFIRST__Form',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },            
            items: [
                __FORMFIELDS__
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
        