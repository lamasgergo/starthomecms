Ext.define('Tscrm.controller.Properties', {
    extend: 'Ext.app.Controller',  
    views: [
        'properties.List',
        'properties.ListFastView',
        'properties.ListEventsFastView',
        'properties.Form',
        'properties.View',
        'properties.PrintForm'
    ],
    stores: [
        'Cities',
        'Districts',
        'Streets',
        'Cityparts',
        'Documents',
        'DocumentsView',
        'Layouts',
        'LayoutsView',        
        'Properties',
        'PropertiesView',
        'PropertiesContacts',
        'ContactsSearches',
        'Statics'
    ],    
    init: function() {
        console.log('Properties modul initialized...');
         //w=Ext.widget('propertiesList').show();
         //w.maximize();   
    }   
});    