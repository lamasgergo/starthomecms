Ext.define('Tscrm.view.contacts.ListEventsView', {
    extend: 'Ext.panel.Panel',
    xtype: 'contactsEventsView',
    controller: 'contactsController',
    itemId:'contactsEventsView',
    viewModel: {
        type: 'contactsModel'
    }, 
    bind:{
        data:{
            bindTo:'{rec}',
            deep:true
        }    
    },
    bodyPadding:10,
    tpl : ['Itt történt valami az biztos mert igen!<br>Létrehozó: Felhasználó1 <br>Létrehozva: {created}<hr>']    
   
});
