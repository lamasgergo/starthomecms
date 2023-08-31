Ext.define('Tscrm.view.properties.ListEventsFastView', {
    extend: 'Ext.panel.Panel',
    xtype: 'listEventsFastView',
    reference:'listEventsFastView',
    controller: 'propertiesController',
    viewModel: {
        type: 'propertiesModel'
    },       
    layout: 'fit',
    bodyPadding:3,
    cls:'fastview',
    autoScroll: true,
    items:[
        {
            xtype: 'dataview',
            //loadMask: false,
            autoHeight:true,
            bind: {
                store: '{events}'
            },
            cls:'eventsfastview',
            autoScroll: true,
            tpl :new Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="oneevent">',
                        '{event_action}<br>',
                        '<tpl if="!Ext.isEmpty(event_type)">{event_type}<br></tpl>'+
                        '{note}<br>',
                        '<creator><tpl if="!Ext.isEmpty(user.fullname)">{user.fullname}</tpl></creator><br>',
                        '<date>{created:date("Y-m-d H:i")}</date>',
                        '</div>',
                    '</tpl>'
                ) ,
            listeners: {
                itemmousedown: 'showEvent'
            },                                
            itemSelector: 'div.oneevent',
            emptyText: 'Nincs megjeleníthető esemény',            
        }
    ],
    bbar: [{
         xtype: 'pagingtoolbar',
         bind: '{events}',
         dock: 'bottom',
         beforePageText :'',
         afterPageText :'',
         displayInfo: false ,
         plugins: new Ext.ux.ts.grid.TinyPager()
    }]           
   
 
   
});



