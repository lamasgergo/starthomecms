Ext.define('Tscrm.view.events.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventsListController',

    onRowDblClick: function (grid, record, index, eOpts) {
        
        //Open a new window instance and add loading while data loads in
        win = new Tscrm.view.contacts.View();
        win.setTitle(record.data.firstname+' '+record.data.firstname+' | '+record.data.phone+' | '+ record.data.email);
        //this.getView().add(win);   //Ha mozgatni akarom együtt az ablakokat akkor hivommeg így
        
        win.show();
        win.mask("Loading...");
        //Datapanel inside the window
        //var datapanel=win.lookupReference('maindata'); //Ha getView al hozom létre akkor tudok hivatkozni referenciával
        
        var datapanel=win.down('#maindata');

        //Load data into the window
        var data = Ext.data.StoreManager.lookup('EventsView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                datapanel.update(records[0].data);
                win.unmask();
            }             
        });
        
    },    
    onAdd: function(){
        var win = this.lookupReference('eventsFormWindow');
        
        if (!win) {
            win = new Tscrm.view.events.Form();
            this.getView().add(win);
        }
        
        win.show();  
    },
    onEdit: function(view, rowIdx, colIdx, item, e, record, row){
        var win = this.lookupReference('eventsFormWindow');
        
        if (!win) {
            win = new Tscrm.view.events.Form();
            this.getView().add(win);
        }   

        win.show();
         
        var formPanel = this.lookupReference('eventsForm');
        formPanel.mask("Loading..."); 
        var form = formPanel.getForm();
        var data = Ext.data.StoreManager.lookup('eventsView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                form.loadRecord(records[0]);
                formPanel.unmask();
            }             
        });

        

    }
});