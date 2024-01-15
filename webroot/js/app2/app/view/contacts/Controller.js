Ext.define('Tscrm.view.contacts.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactsController',
/*
    when closing the window destroy it
*/    
    closeWin: function(){
      //  this.getView().destroy();
    },    
/*
    Grid refresh when grid opens or form saved
*/
    reloadGrid:function(){
        var vcontroller = this;
        
        this.getViewModel().getStore('contactsList').load({
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
    Grid row click shows events
*/        
    onRowClick: function (grid, record, index, eOpts) {
        //this.selectedRowId=record.get('id');
        this.getViewModel().set('currentData', record.get('id'));
        this.loadFastEvents();
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
        win.getViewModel().set('currentData',record.data.id);
        win.getController().loadViewData(this,record.data.id);
        
    },  
    loadViewData: function(controller,id,win){  
        
        var vcontroller = this;       
        win=this.getView();      
        //if(win.scope=='self'){win=this.getView();}
        win.lookupReference('inside').mask("Loading...");
        
        if(id!='')
        {
            var datapanel=win.down('#maindata');
            var datapanel_right=win.down('#maindata_right');

            var data = vcontroller.getViewModel().getStore('contactsView').load({
                params:{
                    'id': id
                },
                callback: function(records, operation, success) {

                    if(success)   
                    {                    
                        datapanel.update(records[0].data);
                        datapanel_right.update(records[0].data);
                        win.lookupReference('inside').unmask();
                        win.setTitle(records[0].data.fullname+' | '+records[0].data.phone1);
                        win.getController().loadEvents(win);
                    }else{
                        Ext.Msg.alert('Hiba', 'A személy nem található!');
                        win.close();                           
                    }
                    
                }             
            }); 
             
        }else{
            Ext.Msg.alert('Hiba', 'A kapcsolattartó nem megtekinthető!');
            win.close();            
        } 
             
    },  
/*
    Grid tbar Add button
*/     
    onAdd: function(){
        win = Ext.widget('contactsForm').show();
   
        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
        },this,{'single':true});       
                    
        win.show();  
        this.fireViewEvent('addrecord', this);   
    },
/*
    Grid tbar export button
*/
    onExport: function(){
        var vcontroller = this;
        var grid=vcontroller.lookupReference('contactsGrid');
        search = grid.getStore().getProxy().getExtraParams();
        params = '';
        Ext.Object.each(search, function(i, val, c) {
            if(!Ext.isEmpty(i) && !Ext.isEmpty(val))
            {
                params+=i+'='+val;
            }
        });
        window.open('/admin/contacts/export?'+params);
    },
/*
    Grid row action Edit
*/       
    onEdit: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;

        win = Ext.widget('contactsForm').show();
             
        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
            this.fireViewEvent('refreshViewData',(!Ext.isEmpty(record)?record.data.id:vcontroller.getViewModel().get('currentData')), vcontroller.getView());
        },this,{'single':true});
        
        win.show();
         
        var formPanel = win.lookupReference('contactsForm');
        formPanel.mask("Adatok betöltése..."); 
        var form = formPanel.getForm();

        form.url='/admin/contacts/edit.json';

        var data = this.getViewModel().getStore('contactsView').load({
            params:{
                'id': (!Ext.isEmpty(record)?record.data.id:vcontroller.getViewModel().get('currentData'))
            },
            callback: function(records, operation, success) {
                if(success)
                {
  
                    if(Ext.isEmpty(records[0].data.phone1)){
                        delete records[0].data.phone1type;
                        delete records[0].data.phone1;
                    }                 
                    if(Ext.isEmpty(records[0].data.phone2)){
                        delete records[0].data.phone2type;
                        delete records[0].data.phone2;
                    }
                    if(Ext.isEmpty(records[0].data.phone3)){
                        delete records[0].data.phone3type;
                        delete records[0].data.phone3;
                    }
                    if(Ext.isEmpty(records[0].data.phone4)){
                        delete records[0].data.phone4type;
                        delete records[0].data.phone4;
                    }
                    form.loadRecord(records[0]);
                    vcontroller.loadComboboxes(records[0].data,formPanel);
                    
                }else{
                    vcontroller.fireEvent('unauthorized', vcontroller); 
                    win.close();  
                }
            }             
        });
        
    },
/*
    load combo boxes
*/
    loadComboboxes: function(data,formPanel){
        
        var loading=0;
        var endLimit=0;
        
        userselect = new Array;
        data.users.forEach(function(element, index, array){
            userselect[index]=element.id;    
        });
        formPanel.down('#users').setValue(userselect);        

        var comboboxes=formPanel.query('combobox');
        if(comboboxes){
            Ext.each(comboboxes, function(name, index, countriesItSelf) {
                if(comboboxes[index].queryMode=='remote' && !comboboxes[index].multiSelect)
                {
                    combo_name=comboboxes[index].name;
                    combo_data_name=comboboxes[index].name.replace('[','.').replace(']','');
                    if(!Ext.isEmpty(eval('data.'+combo_data_name)))
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
            message: 'Valóban törölni akarja a kiválasztott felhasználót?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/admin/contacts/delete.json',
                        params:{
                            id:record.data.id
                        },
                        methid: 'POST',
                        success: function(response, opts) {
                            vcontroller.reloadGrid();
                            vcontroller.fireEvent('toast', null, 'A sor sikeresen törölve!' );
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
        this.getView().close();
    },
/*
    Form save function
*/      
    onFormSave: function() {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('contactsForm');
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
                        vcontroller.fireViewEvent('refreshViewData',action.result.data.id, vcontroller.getView());
                    },
                    failure: function(form, action) {
                        if(!Ext.isEmpty(action.result))
                        {
                            for(var index in action.result.errors) {
                                for(var subindex in action.result.errors[index]) { 
                                    form.findField(index).markInvalid(action.result.errors[index][subindex]);
                                }
                            }
                            vcontroller.fireEvent('toast', 'Sikertelen mentés', 'Hibásan kitöltött mezőket találtunk, kérjük a megjelölt beviteli mezőket javítsa!');
                            formPanel.unmask();
                            return false;                            
                        }else{
                            vcontroller.fireEvent('unauthorized', vcontroller);    
                        }
                        
                    }
                });
        }
    },

    onSearchBySent: function(view, rowIdx, colIdx, item, e, record, row){
        vcontroller = this;
        win = Ext.widget('propertiesList');
        data = new Object;
        grid = vcontroller.lookupReference('contactSentPropertiesGrid');
        data.ident = '';
        Ext.each(grid.getSelection(), function(item) {
            data.ident = data.ident+item.data.properties_variation.id+',';
        });
        win.down('#panelwest').expand();
        win.getController().searchFill(data,win);
    },
/*
    Keresésnekmegfelelő találatok
*/    
    onSearchByRequest: function(view, rowIdx, colIdx, item, e, record, row){
        vcontroller=this;
        win = Ext.widget('propertiesList');
        win.down('#panelwest').expand();    
        
        var data = this.getViewModel().getStore('searchView').load({
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
    Új keresés létrehozása
*/    
    onNewContactSearch: function(){
        win = Ext.widget('propertiesContactSearchForm').show();
        win.show(); 
        win.addListener('close', function(){
            win.down('form').reset();
            this.loadSearches();
        },this,{'single':true}); 
        
        var formPanel = win.lookupReference('contactSearchForm');
        var form = formPanel.getForm()
        selected=this.getViewModel().get('currentData');
        formPanel.mask("Kérem várjon...");       
        
        this.getViewModel().getStore('contactsView').load({
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
                            if(i=='id') {
                                form.findField('contact[id]').getStore().load();
                            }
                        }                         
                    });
                    formPanel.unmask();  
                }
            }
        });             
    },
/*
    Új esemény rögzítése
*/    
    onNewEvent: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        win = Ext.widget('eventsForm').show();
        win.show();
        var eventForm = win.lookupReference('eventsForm');
        eventForm.getForm().findField('contact_id').setValue(vcontroller.getViewModel().get('currentData'));
    },
/*
    Submit search from list
*/    
    onSearchSubmit:function(field, e){  
        var vcontroller = this;
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

    },
/*
    Reset search from list
*/   
    onSearchReset:function(){ 
        this.lookupReference('searchForm').getForm().reset();
        this.getViewModel().getStore('contactsList').load({
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
    },  
/*
    load own proeerties grid on tab activate
*/    
    loadOwnProperties: function(e){
        var vcontroller = this;
        var contactOwnPropertiesGrid = this.lookupReference('contactOwnPropertiesGrid');

        vcontroller.getViewModel().getStore('ownPropertiesList').getProxy().extraParams = {
            'active[0]':0,
            'active[1]':1,
            'contact_id':vcontroller.getViewModel().get('currentData')
        };
        this.getViewModel().getStore('ownPropertiesList').load({
            callback: function(records, operation, success) {
                if(!success){
                    if(operation.error.status == 403)
                    {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        }); 
        controller=Tscrm.app.getController('Viewport');
        controller.onGridAfterRender(e.down('grid'));
        //e.down('grid').fireEvent('loading');
    } ,
/*
    load sent properties on tab activate
*/
    loadSentProperties: function(){
        var vcontroller = this;
        var contactOwnPropertiesGrid = this.lookupReference('contactSentPropertiesGrid');  

        this.getViewModel().getStore('sentPropertiesList').getProxy().extraParams = {
             sent_contact_id:vcontroller.getViewModel().get('currentData') 
        }        
        this.getViewModel().getStore('sentPropertiesList').load({
            callback: function(records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });
       
    },
/*
    load searches on tab activate
*/
    loadSearches: function(){
        var vcontroller = this;
        var contactSearchesGrid = this.lookupReference('contactSearchesGrid'); 
         
        this.getViewModel().getStore('searchesList').getProxy().extraParams = {
            contact_id:vcontroller.getViewModel().get('currentData'),
            active:1    
        }
        this.getViewModel().getStore('searchesList').load({
            callback: function(records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
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
                            vcontroller.loadSearches();
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
    Edit search request
*/  
    onEditSearch: function(view, rowIdx, colIdx, item, e, record, row){  
        win = Ext.widget('propertiesContactSearchForm');
        
        win.addListener('close', function(){
            win.down('form').reset();
            this.loadSearches();
        },this,{'single':true});
        
        win.getController().onEdit(view, rowIdx, colIdx, item, e, record, row, win);
        
      
    },
/**
* New property inderest window open, fill out contact informations
*     
*/
    onNewPropertyInterest: function(){
        win = Ext.widget('interestPropertiesContactsForm').show();
        win.show(); 
        win.addListener('close', function(){
            win.down('form').reset();
            this.loadInterestProperties();
        },this,{'single':true}); 
        
        var formPanel = win.lookupReference('interestPropertiesContactsForm');
        var form = formPanel.getForm()
        selected=this.getViewModel().get('currentData');
        formPanel.mask("Kérem várjon...");       
        
        this.getViewModel().getStore('contactsView').load({
            params: {'id':selected},
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    if(operation.error.status == 403)
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
    }, 
/*
    load interests on active tab
*/
    loadInterestProperties: function(){
        var vcontroller = this;
        var contactSearchesGrid = this.lookupReference('contactInterestPropertiesGrid'); 
         
        this.getViewModel().getStore('interestPropertiesList').getProxy().extraParams = {
            contact_id:vcontroller.getViewModel().get('currentData'),
            active:1    
        }
        this.getViewModel().getStore('interestPropertiesList').load({
            callback: function(records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });
       
    },
/*
    load interests on active tab
*/
    loadShowedProperties: function(){
        var vcontroller = this;
        var contactSearchesGrid = this.lookupReference('contactShowedPropertiesGrid'); 
         
        this.getViewModel().getStore('showedPropertiesList').getProxy().extraParams = {
            contact_id:vcontroller.getViewModel().get('currentData'),
            active:1    
        }
        this.getViewModel().getStore('showedPropertiesList').load({
            callback: function(records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });
       
    },    
/*
    Add Showed porerties
*/
    addShowedProperties: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        if(record.data.showed_properties_contact.id)
        {
            //already saved
            return false;
        }else{
            Ext.Ajax.request({
                url: '/admin/showed_properties_contacts/add.json',
                params:{
                    'contact_id':vcontroller.getViewModel().get('currentData'),
                    'properties_variation_id':record.data.properties_variation.id    
                },
                success: function(ret){
                    var json = Ext.util.JSON.decode(ret.responseText);
                    vcontroller.loadSentProperties();
                    vcontroller.loadInterestProperties();
                }
            });        
        }
       
    },
    /*
    Add Interest porerties
*/
    addInterestProperties: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        if(record.data.interest_properties_contact.id)
        {
            //already saved
            return false;
        }else{
            Ext.Ajax.request({
                url: '/admin/interest_properties_contacts/add.json',
                params:{
                    'contact_id':vcontroller.getViewModel().get('currentData'),
                    'properties_variation_id':record.data.properties_variation.id
                },
                success: function(ret){
                    var json = Ext.util.JSON.decode(ret.responseText);
                    vcontroller.loadSentProperties();
                    vcontroller.loadInterestProperties();
                }
            });
        }

    },
    /*
Add closing a rental or seller
*/
    addCloseProperties: function(view, rowIdx, colIdx, item, e, record, row){
        var win = Ext.widget('rentedPropertiesContactsForm').show();
        win.show();
        var datapanel=win.lookupReference('maindata')
        datapanel.update({'name':record.data.contact.fullname, 'property': record.data.properties_variation.property.address, 'property_id': record.data.properties_variation.id});
        win.lookupReference('rentedPropertiesContactsForm').getForm().findField('contact_id').setValue(record.data.contact.id);
        win.lookupReference('rentedPropertiesContactsForm').getForm().findField('property_id').setValue(record.data.properties_variation.id);


    },

    /*
        Grid row duble click opens the rows view
    */
    showProperties: function (grid, record, index, eOpts) {
 
        win = new Tscrm.view.properties.View();
        win.setTitle(record.data.address);
        //this.getView().add(win);   //Ha mozgatni akarom együtt az ablakokat akkor hivommeg így

        win.show();
        win.getViewModel().set('currentData',record.data.properties_variation.property_id);
        win.getController().loadViewData(this,record.data.properties_variation.property_id,win);
    },

    showPropertiesById: function (grid, record, index, eOpts) {

        win = new Tscrm.view.properties.View();
        win.setTitle(record.data.address);
        //this.getView().add(win);   //Ha mozgatni akarom együtt az ablakokat akkor hivommeg így

        win.show();
        win.getViewModel().set('currentData',record.data.id);
        win.getController().loadViewData(this,record.data.id,win);
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
                sort: '[{"property":"created","direction":"DESC"}]'
        });
        store.load();
    },  
    
/*
    load events on property page
*/     
    loadEvents:function(win){
        store=win.getViewModel().getStore('events');
        store.getProxy().setExtraParams({
                byid:this.getViewModel().get('currentData'),
                bymodel:'Contacts',
                sort: '[{"property":"created","direction":"DESC"}]'
        });
        store.load();
    },      
    
/*
    show event action  
*/  
    showEvent:function (me, record, item, index, e) {
        var className = e.target.className;
        var vcontroller = this;

        Ext.create('Ext.tip.Tip', {
          alignTarget: e.target,
          title: 'Esemény adatai',
          closable:true,
          tpl:  '{event_action}<br>'+
                'Azonosító: {id}<br>'+
                'Dátum: {created:date("Y-m-d H:i:s")}<br>'+
                'Létrehozó: {user.fullname}<br>'+
                '<tpl if="!Ext.isEmpty(event_type)">Típus: {event_type}<br></tpl>'+
                '<tpl if="!Ext.isEmpty(note)">Megjegyzés:<br>{note}<br></tpl>'+
                '<tpl if="!Ext.isEmpty(changes)">Változások:<br>{changes_formatted}</tpl><br>'+
                '',
          listeners:{
              deactivate:function(){
                  this.close();
              }
          }
        }).setData(record).show();             

    },

    /*
     Property grid edit action
     */
    onPropertyEdit: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        win = Ext.widget('propertiesForm').show();

        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
            this.fireViewEvent('refreshViewData',this,record.data.id, vcontroller.getView());
        },this,{'single':true});

        win.show();

        win.getController().loadForEdit(win,record.data.id);

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
            field.updateTplValue( '(__) _____________');              
        }    
        field.setValue('');
        
    },
    changeValue: function(e){
        val =  e.getValue();
    //  alert(val);  
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
    }
                         
    
});