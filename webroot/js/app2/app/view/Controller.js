Ext.define('Tscrm.view.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewportController',
    listen : {
        global : {
            apploaded : 'onAppLoaded',
            dashboardReload : 'onAppLoaded'
        }
    },
    itemShow: function(item, e){

        if(!Ext.isEmpty(e.data.Properties.id)) {

            win = new Tscrm.view.properties.View();
            win.show();
            win.getViewModel().set('currentData', e.data.Properties.id);
            win.getController().selectedRowId = e.data.Properties.id;
            win.getController().loadViewData(this, e.data.Properties.id, win);
        }
        if(!Ext.isEmpty(e.data.Contacts.id)) {

            win = new Tscrm.view.contacts.View();
            win.show();
            win.getViewModel().set('currentData', e.data.Contacts.id);
            win.getController().selectedRowId = e.data.Contacts.id;
            win.getController().loadViewData(this, e.data.Contacts.id, win);
        }
    },
    endDateList: function(item, e){

        win=Ext.widget('propertiesList').show();
        data = new Object;
        data.last_enddate =true;
        data.active = '0,1';
        data.cooffice_all =true;
        win.down('#panelwest').expand();
        win.getController().searchFill(data,win);
    },    
    onAppLoaded: function(){
        calendarPanel = this.lookupReference('calendarEvents'); 
        calendarPanel.getStore().load(); 
        vcontroller = this;
        vm = this.getViewModel();
        vm.getStore('dashboard').load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    if(operation.error.status==403)    
                    {
                        vcontroller.fireEvent('loginNeeded', vcontroller);        
                    }
                }else{
                    Ext.GlobalEvents.fireEvent('dashboardready');
                    vm.setData(records[0].data);
                }
            }
        }); 
        var runner = new Ext.util.TaskRunner(),
        task;  

        task = runner.newTask({
            run: function() {
              vm.getStore('dashboard').load({
                    scope: this,
                    callback: function(records, operation, success) {
                        if(!success){
                            if(operation.error.status==403)    
                            {
                                vcontroller.fireEvent('loginNeeded', vcontroller);        
                            }
                        }else{
                            vm.setData(records[0].data);
                        }
                    }
                });   
            },
            interval: 60000
        });    
        
        task.start();    
        
                
    } 
});