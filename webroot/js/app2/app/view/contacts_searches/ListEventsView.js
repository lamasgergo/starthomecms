Ext.define('Tscrm.view.requests.ListEventsView', {
    extend: 'Ext.panel.Panel',
    xtype: 'requestsEventsView',
    controller: 'requestsListController',
    itemId:'requestsEventsView',
    viewModel: {
        type: 'requestsListModel'
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
