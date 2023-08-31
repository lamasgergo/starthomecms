Ext.define('Tscrm.view.cityparts.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.citypartsController', 
/*
    Grid refresh when grid opens or form saved
*/
    reloadGrid:function(){
        var vcontroller = this;

        this.getViewModel().getStore('citypartsList').load({
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
        this.onEdit(grid, null, null, null, eOpts, record);        
 
    },
/*
    Viewing one record in a window
*/
    loadViewData: function(controller,id,win){
        vcontroller = this;
        if(win.scope=='self'){win=this.getView();}
        win.lookupReference('inside').mask("Loading...");
        //Load data into the window
        if(id!='')
        {
            var datapanel=vcontroller.lookupReference('maindata');
            
            var data = Ext.data.StoreManager.lookup('CitypartsView').load({
                params:{
                    'id': id
                },
                callback: function(records, operation, success) {
                    if(success)   
                    {
                        datapanel.update(records[0].data);
                        
                    }else{
                        Ext.Msg.alert('Hiba', 'Az rekord nem található!');
                        win.close();                        
                    }                    
                }
            });
        }        
    },        
/*
    Grid tbar Add button
*/     
    onAdd: function(){
        win = Ext.widget('citypartsForm').show();
        
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
        
        win = Ext.widget('citypartsForm').show();
        
        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
        },this,{'single':true});
        
        win.show();
         
        var formPanel = win.lookupReference('citypartsForm');
        formPanel.mask("Adatok betöltése..."); 
        var form = formPanel.getForm(); 
               
        form.url='/admin/cityparts/edit.json';
        var data = Ext.data.StoreManager.lookup('CitypartsView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                if(success)
                {
                    form.loadRecord(records[0]);
                    vcontroller.loadComboboxes(records[0].data,formPanel);
                    
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
    loadComboboxes: function(data,formPanel){

        var loading=0;
        var endLimit=0;
        
        var comboboxes=formPanel.query('combobox');
        
        if(comboboxes){
            Ext.each(comboboxes, function(name, index, countriesItSelf) {
                if(comboboxes[index].queryMode=='remote' && !comboboxes[index].multiSelect)
                {
                    combo_name=comboboxes[index].name;
                    combo_data_name=comboboxes[index].name.replace('[','.').replace(']','');
                    pre=combo_data_name.split(".",1);

                    if(!Ext.isEmpty(eval('data.'+pre)) && !Ext.isEmpty(eval('data.'+combo_data_name)))
                    {
                        
                        endLimit++;  
                        formPanel.getForm().findField(combo_name).getStore().load({
                            params:{
                                id: eval('data.'+combo_data_name)
                            },
                            callback: function(records, operation, success) {
                                formPanel.getForm().findField(combo_name).setValue(eval('data.'+combo_data_name));  
                                loading=loading+1; 
                            },
                            scope: this   
                        });   
                    }                   
                }
            });            
        }
        
        //Checking the stores are ready and fields filled
        var runner = new Ext.util.TaskRunner();
        var loadingTimer = runner.start({
            run: function() {
                if(loading>=endLimit){
                    endTimer();
                    formPanel.unmask();
                }
            },
            interval: 100
        });
        
        endTimer=function(){runner.stop(loadingTimer);}            
                     
    }, 
/*
    Grid row action Delete
*/    
    onDelete: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        Ext.Msg.show({
            title:'Megerősítés',
            message: 'Valóban törölni akarja a kiválasztott elemet?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {   
                    Ext.Ajax.request({
                        url: '/admin/cityparts/delete.json',
                        params:{
                            id:record.data.id
                        },
                        methid: 'POST',
                        success: function(response, opts) {
                            vcontroller.fireEvent('toast', null, 'A sor sikeresen törölve!' );
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
        this.lookupReference('citypartsForm').getForm().reset();
        this.getView().close();
    },
/*
    Form save function
*/      
    onFormSave: function() {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('citypartsForm');
        var formWindow = this.getView();

        form = formPanel.getForm();
        
        if (form.isValid()) {
            formPanel.mask("Adatok ellenőrzése és mentése..."); 
            
            form.submit({
                    submitEmptyText:false,
                    success: function(form, action) {
                        vcontroller.fireEvent('toast', 'Sikeres mentés', action.result.message );
                        form.reset();
                        formWindow.close(); 
                    },
                    failure: function(form, action) {
                        vcontroller.setFailureFields(form, action, formPanel);
                        vcontroller.fireEvent('toast', 'Sikertelen mentés', 'Hibásan kitöltött mezőket találtunk, kérjük a megjelölt beviteli mezőket javítsa!');                        
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
    Failed fields alerts 
*/    
    setFailureFields: function(form, action, formPanel){
        
        if(!Ext.isEmpty(action.result))
        {  
            var err = new Array(); 
            for(var index in action.result.errors) {
                if(Ext.isArray(action.result.errors[index]))
                {                         
                    for(var subindex in action.result.errors[index]) {
                        err[subindex] = new Array();
                        for(var objectindex in action.result.errors[index][subindex]) {
                            err[subindex][objectindex]='';
                            for(var errorindex in action.result.errors[index][subindex][objectindex]) {
                                err[subindex][objectindex]+=action.result.errors[index][subindex][objectindex][errorindex];
                            }
                            form.findField(index+'['+subindex+']'+'['+objectindex+']').markInvalid(err[subindex][objectindex]); 
                        }

                    }                                  
                }else{
                    for(var subindex in action.result.errors[index]) {
                        
                                                               
                        if(Ext.isObject(action.result.errors[index][subindex])){
                            if(Ext.isNumeric(subindex))
                            {
                                err[subindex] = new Array(); 
                                for(var objectindex in action.result.errors[index][subindex]) {
                                    err[subindex][objectindex]='';
                                    for(var errorindex in action.result.errors[index][subindex][objectindex]) {
                                        err[subindex][objectindex]+=action.result.errors[index][subindex][objectindex][errorindex];
                                    }
                                    form.findField(index+'['+subindex+']'+'['+objectindex+']').markInvalid(err[subindex][objectindex]); 
                                }
                            }else{
                                err[subindex]='';
                                for(var errorindex in action.result.errors[index][subindex]) {
                                            err[subindex]+=action.result.errors[index][subindex][errorindex];
                                }
                                form.findField(index+'['+subindex+']').markInvalid(err[subindex]); 
                            }                                            
                        }else{
                            form.findField(index).markInvalid(action.result.errors[index][subindex]);      
                        }
                        
                    }
                }
            }
            formPanel.unmask();
            return false;                            
        }else{
            vcontroller.fireEvent('unauthorized', vcontroller);    
        }
                        
    }     
    
});