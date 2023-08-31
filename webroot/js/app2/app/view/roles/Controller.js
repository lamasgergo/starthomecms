Ext.define('Tscrm.view.roles.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rolesController', 
/*
    Grid refresh when grid opens or form saved
*/
    reloadGrid:function(){
        var vcontroller = this;
                
        this.getViewModel().getStore('rolesList').load({
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
        
        //Open a new window instance and add loading while data loads in
        win = new Tscrm.view.roles.View();
        win.setTitle(record.data.firstname+' '+record.data.firstname+' | '+record.data.phone+' | '+ record.data.email);
        //this.getView().add(win);   //Ha mozgatni akarom együtt az ablakokat akkor hivommeg így
        
        win.show();
        win.mask("Loading...");
        //Datapanel inside the window
        var datapanel=win.down('#maindata');

        //Load data into the window
        var data = Ext.data.StoreManager.lookup('RolesView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                datapanel.update(records[0].data);
                win.unmask();
            }             
        });    
    },    
/*
    Grid tbar Add button
*/     
    onAdd: function(){
        win = Ext.widget('rolesForm').show();
        
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
         
        var formPanel = win.lookupReference('rolesForm');
        formPanel.mask("Adatok betöltése..."); 
        var form = formPanel.getForm(); 
               
        form.url='/admin/roles/edit.json';
        var data = Ext.data.StoreManager.lookup('RolesView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                if(success)
                {
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
    Grid row action Delete
*/    
    onDelete: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        Ext.Msg.show({
            title:'Megerősítés',
            message: 'Valóban törölni akarja a kiválasztott csoportot?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {   
                    Ext.Ajax.request({
                        url: '/admin/roles/delete.json',
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
        this.lookupReference('rolesForm').getForm().reset();
        this.getView().close();
    },
/*
    Form save function
*/      
    onFormSave: function() {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('rolesForm');
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
    }
});