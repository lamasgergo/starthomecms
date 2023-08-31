Ext.define('Tscrm.view.interest_properties_contacts.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interestPropertiesContactsController',

    onSearch: function(view, rowIdx, colIdx, item, e, record, row){
        //w=Ext.widget('requestsList');
        //w.show();
        //w.down('#panelwest').expand();
    }, 
    savedContact:function(e){
        vcontroller = this;
        
        var formPanel = vcontroller.lookupReference('interestPropertiesContactsForm');
        var form = formPanel.getForm()
        
        selected=e.getValue();
        formPanel.mask("Kérem várjon..."); 
        this.getViewModel().getStore('contactData').load({
            params: {'id':selected},
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    if(operation.error.status==403)    
                    {
                        vcontroller.fireEvent('unauthorized', vcontroller);        
                    }
                }else{
                    Ext.Object.each(records[0].data, function(i, val, c) {
                        if(!Ext.isEmpty(i) && !Ext.isEmpty(val) && form.findField('contact['+i+']'))
                        {
                            form.findField('contact['+i+']').setValue(val);
                            if(i=='id'){
                                formPanel.getForm().findField('contact[id]').getStore().load();
                            }

                        }

                    });
                    formPanel.unmask();  
                }
            }
        });         
        //select user datas 
    }, 
    searchProperty:function(e){
        vcontroller = this;
        
        var formPanel = vcontroller.lookupReference('interestPropertiesContactsForm');
        var form = formPanel.getForm()
        
        id=vcontroller.lookupReference('selected_property').getValue();
        formPanel.mask("Kérem várjon...");

        var datapanel=formPanel.down('#maindata');
        var imagepanel=formPanel.down('#images');

        selected=propertyField = vcontroller.lookupReference('selected_property').getValue();
        //e.getSelection().getData();
        
        //form.findField('properties_variation_id').setValue(selected['properties_variation']['id']); 
        var store = vcontroller.lookupReference('properties_variation_id').getStore();
        store.removeAll();
        //Load data into the window
        if(id!='')
        {
            var data = Ext.data.StoreManager.lookup('PropertiesView').load({
                params:{
                    'id': id
                },
                callback: function(records, operation, success) {
                    if(success)   
                    {
                        datapanel.update(records[0].data);
                        imagepanel.setData(records[0].data.properties_images);
                        if(!Ext.isEmpty(records[0].data.sellvar) && records[0].data.sellvar.active=='1'){
                            store.insert(0, {
                                id:records[0].data.sellvar.id,
                                value: 'Eladó'
                            });
                            vcontroller.lookupReference('properties_variation_id').select(records[0].data.sellvar.id);
                        }
                        if(!Ext.isEmpty(records[0].data.rentvar) && records[0].data.rentvar.active=='1'){
                            store.insert(1, {
                                id:records[0].data.rentvar.id,
                                value: 'Kiadó'
                            });
                            vcontroller.lookupReference('properties_variation_id').select(records[0].data.rentvar.id);
                        }
                    }else{
                        Ext.Msg.alert('Hiba', 'A hirdetés nem található!');                      
                    }
                    formPanel.unmask(); 
                }             
            });         
        }else{
            Ext.Msg.alert('Hiba', 'A hirdetés nem megtekinthető!');
            formPanel.unmask(); 
        }        
        
        
        //select user datas 
    },  
/*
    Contact Send property  form save
*/    
    onFormSave: function() {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('interestPropertiesContactsForm');
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
                    failure: function(form, action){
                        vcontroller.setFailureFields(form, action, formPanel);
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
                        
    },
    changeTpl: function(e){
        field =e.up().down('ux-phonefield');

        val =  e.getValue();
        if(val==1)
        {
            field.leftValue = '36';
            field.updateTplValue( '(__) __ / ___-____'); 
        }else if(val==2)
        {
            field.leftValue = '361';
            field.updateTplValue( '(__) _ / ___-____');    
        }else if(val==3){
            field.leftValue = '36';
            field.updateTplValue( '(__) __ / ___-____');              
        }else if(val==4){
            field.leftValue = '';
            field.updateTplValue( '(__) __________');              
        }    
        field.setValue('');
        
    }     
    
         
    
});