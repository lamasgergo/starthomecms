Ext.define('Tscrm.controller.Template', {
    extend: 'Ext.app.Controller',  
    views: [
        'template.List',
        'template.ListFastView',
        'template.Form',
        'template.View'
    ],
    stores: [
        'TemplateView'
    ],    
    init: function() {

    },
    onAdd: function(){
        alert('22');
    }    
    
});