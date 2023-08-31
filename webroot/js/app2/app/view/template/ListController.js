Ext.define('Tscrm.view.template.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.list',
    onRowClick: function (grid, record, index, eOpts) {
        var detailView = this.lookupReference('templateFastView'); 
        detailView.getViewModel().setData({ rec: record });
    },
    onRowDblClick: function (grid, record, index, eOpts) {
        win = new Tscrm.view.template.View();
        win.setTitle(record.data.address);
        this.getView().add(win); 
        win.show();
        win.mask("Loading...");
        var data = Ext.data.StoreManager.lookup('TemplateView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                win.down('panel').update(records[0].data);
                win.unmask();
            }             
        });
        
    },    
    onAdd: function(){
        var win = this.lookupReference('templateFormWindow');
        
        if (!win) {
            win = new Tscrm.view.template.Form();
            this.getView().add(win);
        }
        
        win.show();  
    },
    onEdit: function(view, rowIdx, colIdx, item, e, record, row){
        var win = this.lookupReference('templateFormWindow');
        
        if (!win) {
            win = new Tscrm.view.template.Form();
            this.getView().add(win);
        }
        //valahogy fókuszálnáma grid adott sorát
        //view.grid.getView().focusRow(context.record);
        
        win.show();
         
        var formPanel = this.lookupReference('templateForm');
        formPanel.mask("Loading..."); 
        var form = formPanel.getForm();
        var data = Ext.data.StoreManager.lookup('TemplateView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                console.log(success);
                console.log(records[0]);
                form.loadRecord(records[0]);
                formPanel.unmask();
            }             
        });

        

    },
    onFormCancel: function() {
        this.lookupReference('templateForm').getForm().reset();
        this.lookupReference('templateFormWindow').hide();
    },
    
    onFormSave: function() {
        var formPanel = this.lookupReference('templateForm');
        var formWindow = this.lookupReference('templateFormWindow');
        var gridPanel = this.lookupReference('templateGrid');        
        form = formPanel.getForm();
        
        if (form.isValid()) {
            // In a real application, this would submit the form to the configured url
            form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        formWindow.hide();
                        gridPanel.getStore().reload();   
                    
                    },
                    failure: function(form, action) {

                        for(var index in action.result.errors) {
                            for(var subindex in action.result.errors[index]) { 
                                form.findField(index).markInvalid(action.result.errors[index][subindex]);
                            }
                        }
                    }
                });
            /*
            form.reset();
            this.lookupReference('templateFormWindow').hide();
            this.lookupReference('templateGrid').getStore().add();
           // this.lookupReference('templateGrid').getStore().reload();
            Ext.MessageBox.alert(
                'Thank you!',
                'Your inquiry has been sent. We will respond as soon as possible.'
            );
            */
        }
    }
});