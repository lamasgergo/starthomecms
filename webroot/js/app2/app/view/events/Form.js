Ext.define('Tscrm.view.events.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.eventsForm',
    requires : [
        'Tscrm.view.events.Controller'
    ],  
    controller: 'eventsController' ,    
    title: 'Esemény',
    width: 500,
    height: 500,
    closable: true,
    closeAction: 'hide',
    constraint: true,
    maximizable: false,
    resizable:true,   
    layout: 'fit',
    listeners:{
        afterrender: function(){
            
           
        }    
    },
    viewModel: {
        type: 'eventsModel'
    },    
    items:[ 
        {
            xtype: 'form',
            url: '/admin/events/add.json',
            reference: 'eventsForm',
            bodyPadding:10,
            autoScroll: true,
            fieldDefaults: {
                anchor: '100%',
                msgTarget: 'side',
                labelAlign: 'left',
                labelWidth: 200    
            },
            items: [
                {
                    name: 'contact_id',
                    xtype: 'hiddenfield'
                },{
                    name: 'property_id',
                    xtype: 'hiddenfield'
                },{
                    fieldLabel: 'Esemény típusa',
                    xtype: 'combobox',
                    name: 'type',
                    allowBlank: false,
                    queryMode: 'remote',
                    editable:false,
                    bind: {
                        store: '{staticsEventType}'
                    },
                    displayField: 'name',
                    valueField: 'val'
                    
                },{
                    fieldLabel: 'Esemény leírása',
                    name: 'note',
                    height: 100,
                    xtype: 'textarea'
                },{
                    fieldLabel: 'Naptárba',
                    name: 'calendar[date]',
                    format: 'Y-m-d',
                    xtype: 'datefield'
                },{
                    fieldLabel: 'Idő',
                    name: 'calendar[time]',
                    minValue: '6:00 AM',
                    maxValue: '8:00 PM',                    
                    format: 'H:i',
                    increment: 10,
                    xtype: 'timefield'
                },{
                    fieldLabel: 'Naptárba megjegyzés',
                    name: 'calendar[note]',
                    height: 100,
                    xtype: 'textarea'
                },{
                    fieldLabel: 'Felhasználók naptárjába', 
                    name: 'calendar[users][]',                                     
                    xtype: 'tagfield',
                    itemId: 'users',
                    queryMode: 'remote',
                    bind: {
                        store: '{usersList}'
                    },
                    displayField: 'username',
                    valueField: 'id',
                    publishes: 'id',
                    valueParam: 'ids'
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
        