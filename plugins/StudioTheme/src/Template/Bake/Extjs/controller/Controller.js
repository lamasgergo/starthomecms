Ext.define('Tscrm.controller.__CLASSNAME__', {
    extend: 'Ext.app.Controller',  
    views: [
        '__TABLEIZE__.List',    
        '__TABLEIZE__.Form',
        '__TABLEIZE__.View'
    ],
    stores: [
        '__CLASSNAME__',
        '__CLASSNAME__View'
    ],    
    init: function() {
        console.log('__CLASSNAME__ modul initialized...');
    }   
});    