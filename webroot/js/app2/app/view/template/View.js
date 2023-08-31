Ext.define('Tscrm.view.template.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.templateView',
    title: '{title}',  
    width:300,
    height:300,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit',
    tbar:[{
                xtype: 'button',
                text: 'Edit',
                handler: 'onEdit'
        }],     
    items:[        
        {
            xtype:'panel',          
            bodyPadding:10,                                    
            html:'Data loading',
            tpl : ['IDke: {id} <br> Cim: {address}<br>Létrehozva: {created}<br><img src="{image}">']
        }
    ]
    
    
});