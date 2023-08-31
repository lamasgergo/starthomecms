Ext.define('Tscrm.view.layouts.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layoutsController',
    
/*
    Form canceled function
*/            
    onFormCancel: function() {
        this.lookupReference('layoutsForm').getForm().reset();
        this.getView().close();
    },
/*
    Form save function
*/      
    onFormSave: function() {
        var vcontroller = this;
        var formPanel = this.lookupReference('layoutsForm');

        var formWindow = this.getView();
        
        form = formPanel.getForm();
        
        if (form.isValid()) {
            formPanel.mask("Elrendezés mentése..."); 

            form.submit({
                success: function(form, action) {
                    Ext.Msg.alert('Mentés sikeres', action.result.message);
                    form.reset();
                    formWindow.close(); 
                
                },
                failure: function(form, action) {
                    if(!Ext.isEmpty(action.result))
                    {  
                      
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