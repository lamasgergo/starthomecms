Ext.define('Tscrm.view.events.FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventsFormController',
    onFormCancel: function() {
        this.lookupReference('eventsForm').getForm().reset();
        this.lookupReference('eventsForm').up('window').hide();
    },
    
    onFormSave: function() {
        var formPanel = this.lookupReference('eventsForm');
        var formWindow = this.lookupReference('eventsFormWindow');
      
        form = formPanel.getForm();
        
        if (form.isValid()) {
            // In a real application, this would submit the form to the configured url
            form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        formWindow.hide();
                    
                    },
                    failure: function(form, action) {

                        for(var index in action.result.errors) {
                            for(var subindex in action.result.errors[index]) { 
                                form.findField(index).markInvalid(action.result.errors[index][subindex]);
                            }
                        }
                    }
                });
        }
    }    
});        