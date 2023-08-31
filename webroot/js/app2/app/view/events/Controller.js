Ext.define('Tscrm.view.events.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventsController',
    onFormCancel: function() {
        this.lookupReference('eventsForm').getForm().reset();
        this.lookupReference('eventsForm').up('window').hide();
    },
    
    onFormSave: function() {
        var vcontroller = this;
        
        var formPanel = vcontroller.lookupReference('eventsForm');
        var formWindow = formPanel.up('window');
        

        form = formPanel.getForm();
        
        if (form.isValid()) {
            // In a real application, this would submit the form to the configured url
            form.submit({
                    success: function(form, action) {
                        vcontroller.fireEvent('toast', 'Sikeres mentés', action.result.message );
                        form.reset();
                        formWindow.hide();
                        Ext.GlobalEvents.fireEvent('dashboardReload');
                    
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