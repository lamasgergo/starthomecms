Ext.define('Tscrm.view.contacts_searches.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactsSearchesController',

    /*
     Grid refresh when grid opens or form saved
     */
    showWin: function(){
        var vcontroller = this;
        vcontroller.reloadGrid();
    },
    closeWin: function(){
        //   this.getView().destroy();
    },
    reloadGrid:function(){
        var vcontroller = this;

        this.getViewModel().getStore('requestsList').load({
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
    onRowClick: function (grid, record, index, eOpts) {
        //this.selectedRowId=record.get('id');
        this.getViewModel().set('currentData', record.get('contact_id'));
        this.loadFastEvents();
    },
    /*
        load fast events
    */
    loadFastEvents:function(){
        eventsList = this.lookupReference('contactsEventsFastView');
        store = eventsList.getViewModel().getStore('events');
        store.getProxy().setExtraParams({
            byid:this.getViewModel().get('currentData') ,
            bymodel:'Contacts',
            controller: 'SentPropertiesContacts',
            sort: '[{"property":"created","direction":"DESC"}]'
        });
        store.load();
    },
    /*
        Keresésnekmegfelelő találatok
    */
    onSearchByRequest: function(view, rowIdx, colIdx, item, e, record, row){
        vcontroller=this;
        win = Ext.widget('propertiesList');
        win.down('#panelwest').expand();

        var data = this.getViewModel().getStore('contactsSearchesView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                if(success)
                {
                    win.getController().searchFill(records[0].data,win);
                }else{
                    vcontroller.fireEvent('unauthorized', vcontroller);
                    win.close();
                    formPanel.unmask();
                }

            }
        });


    },
    /*
     Grid row duble click opens the rows view
     */
    onRowDblClick: function (grid, record, index, eOpts) {
        var vcontroller = this;

        //Open a new window instance and add loading while data loads in
        win = new Tscrm.view.contacts.View();
        win.setTitle(record.data.lastname+' '+record.data.firstname+(!Ext.isEmpty(record.data.email)?' | '+record.data.email:'') );
        //this.getView().add(win);   //Ha mozgatni akarom együtt az ablakokat akkor hivommeg így

        win.show();
        win.getViewModel().set('currentData',record.data.contact_id);
        win.getController().loadViewData(this,record.data.contact_id);

    },
    onSelect: function(view, rowIdx, colIdx, item, e, record, row){
        vcontroller = this;
        var field = vcontroller.lookupReference('contact_id');

        field.setValue(record.data.id);
        field.fireEvent('select', field);
    },
    onSearch: function(field, e){
        var vcontroller = this;
        if((typeof e.getKey === 'function' && (!e.getKey() || e.getKey()==0 || e.getKey()==13 || e.getKey()==10)) || !Ext.isEmpty(e.collapse))
        {
            store = vcontroller.getViewModel().getStore('contactsList');

            store.getProxy().setExtraParams(this.lookupReference('searchForm').getForm().getFieldValues(true));
            store.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        if(operation.error.status == 403)
                        {
                            vcontroller.fireEvent('unauthorized', vcontroller);
                        }
                    }
                }
            });
        }

    }, 
    savedContact:function(e){
        vcontroller = this;
        
        var formPanel = vcontroller.lookupReference('contactSearchForm');
        var form = formPanel.getForm();
        
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
    Contact Search  form save
*/
    onContactSearchFormSave: function() {
        var vcontroller = this;
        var formPanel = this.lookupReference('contactSearchForm');
        var formWindow = this.getView();
        
        form = formPanel.getForm();
        if (form.isValid()) {
            formPanel.mask("Adatok ellenőrzése és mentése..."); 

            form.submit({
                    submitEmptyText:false,
                    success: function(form, action) {
                        vcontroller.fireEvent('toast', 'Sikeres mentés', action.result.message );
                        Ext.Msg.show({
                            title: 'Kereső',
                            message: 'A mentett kereső azonosítója: '+action.result.data.contact_id+'',
                            width: 300,
                            buttons: Ext.Msg.YES,
                            buttonText: {
                                yes: 'Betölt'
                            },
                            fn: function(btn){
                                if(btn=='yes'){
                                    win = new Tscrm.view.contacts.View();
                                    win.show();
                                    win.getViewModel().set('currentData',action.result.data.contact_id);
                                    win.getController().loadViewData(win.getController(),action.result.data.contact_id, win);

                                }

                            },
                            icon: Ext.window.MessageBox.QUESTION
                        });
                        form.reset();
                        formWindow.close(); 
                    },
                    failure: function(form, action){
                        vcontroller.setFailureFields(form, action, formPanel);
                    }
                        
                });
        }        
        
    },
    onEdit:function(view, rowIdx, colIdx, item, e, record, row, win){
        var vcontroller = this;
        if(Ext.isEmpty(win))
        {
            win = Ext.widget('propertiesContactSearchForm').show();

            win.addListener('close', function(){
                win.down('form').reset();
                this.reloadGrid();
            },this,{'single':true});
        }
        win.show();

        var formPanel = win.lookupReference('contactSearchForm');
        formPanel.mask("Adatok betöltése...");
        var form = formPanel.getForm();

        form.url='/admin/contacts_searches/edit.json';

        var data = this.getViewModel().getStore('contactsSearchesView').load({
            params:{
                'id': (!Ext.isEmpty(record)?record.data.id:vcontroller.getViewModel().get('currentData'))
            },
            callback: function(records, operation, success) {
                if(success)
                {
                    vcontroller.loadRelated(records[0],formPanel);
                    form.loadRecord(records[0]);
                    //set type
                    if(records[0].get('type')){
                        types=records[0].get('type').split( ',') ;
                        types.forEach(function(element, index, array){
                            if(form.findField('type['+types[index]+']')) {
                                form.findField('type[' + types[index] + ']').setValue(1);
                            }
                        });
                    }

                    form.findField('district_id[]').setValue(records[0].get('district_id'));
                    form.findField('city_id[]').setValue(records[0].get('city_id'));
                    form.findField('building_type[]').setValue(records[0].get('building_type'));
                    form.findField('furniture_type[]').setValue(records[0].get('furniture_type'));
                    form.findField('parking[]').setValue(records[0].get('furniture_type'));
                    form.findField('pool_type[]').setValue(records[0].get('pool_type'));
                    formPanel.unmask();

                }else{
                    vcontroller.fireEvent('unauthorized', vcontroller);
                    win.close();
                    formPanel.unmask();
                }

            }
        });
    },
    /*
        Delete search request
    */
    onDeleteSearch: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        Ext.Msg.show({
            title: 'Megerősítés',
            message: 'Valóban törölni akarja a kiválasztott igényt?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/admin/contacts_searches/delete.json',
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
    load related data
*/
    loadRelated: function(data,formPanel){
        formPanel.getForm().findField('contact[id]').getStore().load();
        for(var i in data.data.contact) {
             data.data['contact['+i+']']=data.data.contact[i];
        } 
        return data; 
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
        
    },
    onSelectCompany: function(){
        vcontroller = this;
        companyField = vcontroller.lookupReference('internal_company');
        agentField = vcontroller.lookupReference('internal_agent');
        agentField.setValue(false);
        
        agentField.getStore().getProxy().setExtraParam('company_id',companyField.getValue());
        agentField.getStore().load({
            scope: vcontroller,
            callback: function (records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });         
    },   /*
    Submit search from list
*/
    onSearchSubmit:function(field, e){
        vcontroller = this;

        form=vcontroller.lookupReference('searchForm').getForm();
        params = form.getFieldValues(true);

        if(form.findField('disablesubmit').getValue()!='1')
        {
            if(!Ext.isNumber(params.city_id) && !Ext.isEmpty(params.city_id)){
                params.city=params.city_id;
                delete params.city_id;
            }


            store=vcontroller.getViewModel().getStore('requestsList');
            store.getProxy().setExtraParams(params);

            store.load({
                params: params,
                scope: vcontroller,
                callback: function(records, operation, success) {
                    if(!success){
                        if(operation.error.status==403)
                        {
                            vcontroller.fireEvent('unauthorized', vcontroller);
                        }
                    }
                }
            });

        }
    },
    /*
        Submit search from list
    */
    doSearch:function(){
        vcontroller = this;

        form=vcontroller.lookupReference('searchForm').getForm();
        params = form.getFieldValues(true);

        store=vcontroller.getViewModel().getStore('propertiesList');
        store.getProxy().setExtraParams(params);
        store.load({
            params: params,
            scope: vcontroller,
            callback: function(records, operation, success) {
                if(!success){
                    if(operation.error.status==403)
                    {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }else{
                    var detailView = vcontroller.lookupReference('propertiesFastView');
                    detailView.getViewModel().setData({ rec: records[0] });
                }
            }
        });

    },
    /*
        Reset search from list
    */
    onSearchReset:function(){

        this.lookupReference('searchForm').getForm().reset();
        this.onSearchSubmit();
    },



});