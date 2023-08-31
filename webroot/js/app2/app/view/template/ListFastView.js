Ext.define('Tscrm.view.template.ListFastView', {
    extend: 'Ext.panel.Panel',
    xtype: 'templateFastView',
    controller: 'list',
    itemId:'TemplateFastView',
    viewModel: {
        type: 'list'
    }, 
    bind:{
        data:{
            bindTo:'{rec}',
            deep:true
        }    
    },
    bodyPadding:10,
    tpl : ['ID: {id}<br>Cim: {address}<br>Létrehozva: {created}<br><img src="{image}">']    
   
});
