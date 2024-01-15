
Ext.define('Tscrm.view.rented_properties_contacts.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.rentedPropertiesContactsForm',
    reference: 'rentedPropertiesContactsForm',
    requires : [
        'Tscrm.view.rented_properties_contacts.Controller',
        'Tscrm.view.rented_properties_contacts.Model'
    ],
    viewModel: {
        type: 'rentedPropertiesContactsModel'
    },
    controller: 'rentedPropertiesContactsController' ,
    title: 'Kiadás/eladás rögzítése',
    width: 300,
    height: 300,
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: false,
    resizable:false,
    layout: 'fit',
    items:[
        {
            xtype: 'form',
            url: '/admin/showed_properties_contacts/rental.json',
            reference: 'rentedPropertiesContactsForm',
            border: false,
            bodyPadding: 10,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    columnWidth:.7,
                    margin: '0 10 0 0',
                    xtype: 'panel',
                    reference: 'maindata',
                    itemId: 'maindata',
                    html:'',
                    tpl : [
                        '<div>Név: <b>{name}</b></div>',
                        '<div>Ingatlan: <b>{property} (#{property_id})</b></div><br>'
                        ]
                },
                {
                    xtype:'hidden',
                    name: 'property_id'
                },
                {
                    xtype:'hidden',
                    name: 'contact_id'
                }, {
                    fieldLabel: 'Státusz',
                    name: 'contact_status',
                    queryMode: 'remote',
                    bind: {
                        store: '{staticsContactStatus}'
                    },
                    typeAhead: true,
                    displayField: 'name',
                    valueField: 'val',
                    xtype: 'combobox'
                },{
                    fieldLabel: 'Bérbeadási határidő',
                    name: 'enddate',
                    format: 'Y-m-d',
                    xtype: 'datefield'
                },
                {
                    xtype:'textarea',
                    name: 'note'
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
