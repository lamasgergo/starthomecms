Ext.define('Tscrm.view.sent_properties_contacts.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sentPropertiesContactsController',

    onSearch: function(view, rowIdx, colIdx, item, e, record, row){
        //w=Ext.widget('requestsList');
        //w.show();
        //w.down('#panelwest').expand();
    }, 
    savedContact:function(e){
        vcontroller = this;
        
        var formPanel = vcontroller.lookupReference('sentPropertiesContactsForm');
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
                        }                         
                    });
                    formPanel.unmask();  
                }
            }
        });         
        //select user datas 
    },   
/*
    Contact Send property  form save
*/    
    onFormSave: function() {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('sentPropertiesContactsForm');
        var formWindow = this.getView();
        
        form = formPanel.getForm();
        ids=form.findField('properties_variation_ids').getValue();
        email=form.findField('contact[email1]').getValue();
        if (form.isValid()) {
            formPanel.mask("Adatok ellenőrzése és mentése..."); 

            form.submit({
                    submitEmptyText:false,
                    success: function(form, action) {
                        vcontroller.fireEvent('toast', 'Sikeres mentés', action.result.message );
                        form.reset();
                        formWindow.close(); 
                        vcontroller.copyToClipboard('/admin/properties/index?print=1&alldata=1&todo=10&ids='+ids+'&sendemail='+email);
                    },
                    failure: function(form, action){
                        vcontroller.setFailureFields(form, action, formPanel);
                    }
                });
        }
    }, 
/*  
Copy to clipboard
*/   
    copyToClipboard: function(url){
        if(clipboardWindow)clipboardWindow.close();
        clipboardWindow = window.open(url, "Copy", "width=800, height=600"); 
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
    
    deleteRow: function(view, rowIdx, colIdx, item, e, record, row){
        this.getViewModel().getStore('propertiesList').removeAt(rowIdx);  
        records=this.getViewModel().getStore('propertiesList').getRange();
        ids='';
        variations = new Array();
        records.forEach(function(element, index, array){
            variations.push(element.data.variation_id);  
        });
        ids = variations.join();
        var contactForm = this.lookupReference('sentPropertiesContactsForm');
        contactForm.getForm().findField('properties_variation_ids').setValue(ids)            
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