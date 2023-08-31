Ext.define('Tscrm.view.documents.FormEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.documentsFormEdit',
    reference: 'documentsFormWindow',
    requires : [
        'Tscrm.view.documents.Controller',
        'Tscrm.view.documents.Model'
    ],    
    controller: 'documentsController' ,    
    title: 'Dokumentum módosítás',
    width: 500,
    height: 200,
    closable: true,
    closeAction: 'hide',
    constrain: true,
    maximizable: false,
    resizable:false,   
    layout: 'fit',
    viewModel: {
       type: 'documentsModel'
    },    
    items:[ 
        {
            xtype: 'form',
            reference: 'documentsFormEdit',
            url: '/admin/properties_documents/edit.json',
            border: false,  
            bodyPadding: 10,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype:'hidden',
                    name: 'id'
                },{
                    xtype:'hidden',
                    name: 'property_id'
                },{   
                    fieldLabel: 'Megnevezés',
                    xtype: 'textfield', 
                    name: 'title',
                    allowBlank: true
                    
                },{
                    fieldLabel: 'Típus',
                    name: 'document_type',
                    xtype: 'combobox',
                    editable: false,
                    queryMode: 'remote',
                    bind: {
                        store: '{staticsDocumentType}'
                    },
                    displayField: 'name',
                    valueField: 'val',
                    value:1,
                    width: 200,
                    margin: '0 0 30 0'
                },{
                    text: 'Módosítás',
                    handler: 'onEditFormSave',
                    xtype: 'button',
                    scale :'large'
                }
            ]
        }       
    ]
});