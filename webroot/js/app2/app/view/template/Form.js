Ext.define('Tscrm.view.template.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.templateForm',
    reference: 'templateFormWindow', 
    title: 'Form',
    width: 400,
    height: 400,
    closable: true,
    closeAction: 'hide',
    maximizable: true,
    resizable:true,   
    layout: 'fit',
    items:[ 
        {
            xtype: 'form',
            url: '/articles/add.json',
            reference: 'templateForm',
            layout: {
                type: 'vbox',
                align: 'stretch'   
            },
            border: false,
            bodyPadding: 10,
            fieldDefaults: {
                msgTarget: 'side',
                labelAlign: 'left',
                labelWidth: 100    
            },
            items:  [
                {
                    xtype:'textfield',
                    fieldLabel: 'Name',
                    name: 'address',
                    allowBlank: false
                }, {
                    xtype:'textarea',
                    fieldLabel: 'Area',
                    name: 'body',
                    allowBlank: true
                }
            ]
        }
    ],
    buttons: [{
        text: 'Cancel',
        handler: 'onFormCancel'    
    },{
        text: 'Save',
        handler: 'onFormSave'
    }]
});
            