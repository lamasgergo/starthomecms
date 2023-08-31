Ext.define('Tscrm.view.documents.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.documentsController',
    
/*
    Form canceled function
*/            
    onFormCancel: function() {
        this.lookupReference('documentsForm').getForm().reset();
        this.getView().close();
    },
/*
    Form save function
*/      
    onFormSave: function() {
        var vcontroller = this;
        var formPanel = this.lookupReference('documentsForm');

        var formWindow = this.getView();
        
        form = formPanel.getForm();
        
        if (form.isValid()) {
            formPanel.mask("Dokumentumok feltöltése és mentése..."); 

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
    },
 

/*
    Edit Form canceled function
*/            
    onEditFormCancel: function() {
        this.lookupReference('documentsFormEdit').getForm().reset();
        this.getView().close();
    },
/*
    Edit Form save function
*/      
    onEditFormSave: function() {
        var vcontroller = this;
        var formPanel = this.lookupReference('documentsFormEdit');

        var formWindow = this.getView();
        
        form = formPanel.getForm();
        
        if (form.isValid()) {
            formPanel.mask("Dokumentumok feltöltése és mentése..."); 

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