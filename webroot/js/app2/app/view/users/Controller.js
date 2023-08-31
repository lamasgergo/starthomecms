Ext.define('Tscrm.view.users.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersController',
/*
    Grid refresh when grid opens or form saved
*/
    reloadGrid:function(){
        var vcontroller = this;
        
        this.getViewModel().getStore('usersList').load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    if(operation.error.status==403)    
                    {
                        vcontroller.fireEvent('unauthorized', vcontroller);        
                    }
                }
            }
        });        
    },
/*
    Grid row duble click opens the rows view
*/      
    onRowDblClick: function (grid, record, index, eOpts) {
        var vcontroller = this;

        //Open a new window instance and add loading while data loads in
        win = new Tscrm.view.users.View();
        win.setTitle(record.data.lastname+' '+record.data.firstname+' | '+record.data.role.name+' | '+ record.data.email);
        //this.getView().add(win);   //Ha mozgatni akarom együtt az ablakokat akkor hivommeg így
        
        win.show();
        
        //Datapanel inside the window
        var datapanel=win.down('#maindata');
        var inside=win.lookupReference('inside');
        
        inside.mask("Adatok betöltése...");

        //Load data into the window
        var data = vcontroller.getViewModel().getStore('usersView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                datapanel.update(records[0].data);
                win.getViewModel().set('currentData',
                    records[0].data
                );
                inside.unmask();
            }             
        });
    },    
/*
    Grid tbar Add button
*/     
    onAdd: function(){
        win = Ext.widget('usersForm').show();
   
        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
        },this,{'single':true});       
                    
        win.show();  
        this.fireViewEvent('addrecord', this);   
    },
/*
    Grid row action Edit
*/       
    onEdit: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        
        win = Ext.widget('usersForm').show();
             
        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
        },this,{'single':true});
        
        win.show();
         
        var formPanel = win.lookupReference('usersForm');
        formPanel.mask("Adatok betöltése..."); 
        var form = formPanel.getForm();

        form.url='/admin/users/edit.json';

        var data = this.getViewModel().getStore('usersView').load({
            params:{
                'id': (!Ext.isEmpty(record)?record.data.id:vcontroller.getViewModel().get('currentData').id)
            },
            callback: function(records, operation, success) {
                if(success)
                {
                    records[0].data.password='';
                    form.loadRecord(records[0]);
                    vcontroller.loadComboboxes(records[0].data);
                    
                }else{
                    vcontroller.fireEvent('unauthorized', vcontroller); 
                    win.close();  
                }
                formPanel.unmask();
            }             
        });
        
    },
/*
    load combo boxes
*/
    loadComboboxes: function(data){
        var formPanel = win.lookupReference('usersForm');
        formPanel.getForm().findField('role_id').getStore().load({
               params:{id: data.role_id}
            },function(){
            formPanel.getForm().findField('role_id').setValue(data.role_id);    
        });         
    },
/*
    Grid row action Delete
*/    
    onDelete: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        Ext.Msg.show({
            title:'Megerősítés',
            message: 'Valóban törölni akarja a kiválasztott felhasználót?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/admin/users/delete.json',
                        params:{
                            id:record.data.id
                        },
                        methid: 'POST',
                        success: function(response, opts) {
                            vcontroller.reloadGrid();
                        },
                        failure: function(response, opts) {
                            vcontroller.fireEvent('unauthorized', vcontroller); 
                        }
                    });
                }
            }
        }); 
    },  
/*
    Form canceled function
*/        
    onFormCancel: function() {
        this.lookupReference('usersForm').getForm().reset();
        this.getView().close();
    },
/*
    Form save function
*/      
    onFormSave: function() {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('usersForm');
        var formWindow = this.getView();
        
        form = formPanel.getForm();
        
        if (form.isValid()) {
            formPanel.mask("Adatok ellenőrzése és mentése..."); 

            form.submit({
                    submitEmptyText:false,
                    success: function(form, action) {
                        Ext.Msg.alert('Mentés sikeres', action.result.message);
                        form.reset();
                        formWindow.close(); 
                    },
                    failure: function(form, action) {
                        if(!Ext.isEmpty(action.result))
                        {
                            for(var index in action.result.errors) {
                                for(var subindex in action.result.errors[index]) { 
                                    form.findField(index).markInvalid(action.result.errors[index][subindex]);
                                }
                            }
                            formPanel.unmask();
                            return false;                            
                        }else{
                            vcontroller.fireEvent('unauthorized', vcontroller);    
                        }
                        
                    }
                });
        }
    },
/*
    Login user function
*/      
    onLogin: function() {    
        var vcontroller = this;
        var formPanel = this.lookupReference('usersLogin');
        var formWindow = this.getView();
        
        form = formPanel.getForm();
        
        if (form.isValid()) {
            formPanel.mask("Bejelentkezés hitelesítése..."); 
            
            form.submit({
                    submitEmptyText:false,
                    success: function(form, action) {
                        vcontroller.fireEvent('toast', 'Sikeres bejelentkezés!', action.result.message );
                        formWindow.close();
                        Ext.GlobalEvents.fireEvent('dashboardReload');
                    },
                    failure: function(form, action){
                        vcontroller.setFailureFields(form, action, formPanel);
                        vcontroller.fireEvent('toast', 'Hibás bejelentkezés', 'A megadott felhasználónév és jelszó nem megfelelő!');
                    }
                });
        }
    }    
});