Ext.define('Tscrm.view.rented_properties_contacts.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rentedPropertiesContactsController',

/*
    Contact Send property  form save
*/    
    onFormSave: function() {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('rentedPropertiesContactsForm');
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
                        
    }
         
    
});