Ext.define('Tscrm.view.properties.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.propertiesController',
/*
    when closing the window destroy it
*/
    showWin: function(){
        var vcontroller = this;     
        vcontroller.reloadGrid();
      
        price_type = vcontroller.lookupReference('price_type');
        vcontroller.getViewModel().getStore('price_type').load({
            scope: this,
            callback: function (records, operation, success) {
                //price_type.setValue(1);
            }
        });
    },
    closeWin: function(){
     //   this.getView().destroy();
    },
    resetTodo: function(e) {
        var vcontroller = this;
        btn = vcontroller.lookupReference('copyToClipboard');
        select = vcontroller.lookupReference('todo');
        btn.hide();
        select.reset();
    },
    todoChange: function(){
        var vcontroller = this;

        btn = vcontroller.lookupReference('copyToClipboard');
        e =  vcontroller.lookupReference('todo');
        if(e.getValue()=="1" || e.getValue()=="2" || e.getValue()=="3" || e.getValue()=="4" || e.getValue()=="11" || e.getValue()=="12" || e.getValue()=="13"){

            var grid=vcontroller.lookupReference('propertiesGrid');
            var todo = vcontroller.lookupReference('todo').getValue();
            var todoContact = vcontroller.lookupReference('todo_contact');
            var street = vcontroller.lookupReference('withStreet').getValue();
            var streetNum = vcontroller.lookupReference('withStreetNum').getValue();
            var sortBy = grid.getStore().sorters.getAt(0)._id;
            var sorDir = grid.getStore().sorters.getAt(0)._direction;
            var searchIdents = vcontroller.lookupReference('searchIdents');    
            var district_id = vcontroller.lookupReference('searchForm').getForm().findField('district_id[]').getValue();

            var cbData = ''; //clipboard data
            var ids = '';
            var selected = new Array();
            var limit = 0;
            
            Ext.each(grid.getSelection(), function (item) {
                selected.push(item.data.variation_id);
                limit++;
            });
            ids = selected.join();
            $('#'+btn.id+'_cb').remove();
            $('body').append('<div id="'+btn.id+'_cb"></div>');
            $.ajax({
                url: '/admin/properties/index?clipboard=1&alldata=1&todo=' + todo + '&stck='+ street+ '&stnck='+ streetNum + '&ids=' + ids + '&limit=' + limit + '&sort=' + sortBy  + '&direction=' + sorDir + '&sortIdent=' +searchIdents.getValue()+'&district_sort='+district_id+'&lng='+
                ((todo==13 || todo==3) ?'en':'hu')
            }).done(function(data) {
                $('#'+btn.id+'_cb').html(data);
                btn.show();
            });

        }
    },
    initClipboardBtn: function(){
        var vcontroller = this;

        btn = vcontroller.lookupReference('copyToClipboard');
        select = vcontroller.lookupReference('todo');
        /*
        var client = new ZeroClipboard($('#'+btn.id), { forceEnhancedClipboard: true });
        client.on('ready', function(event) {

            client.on('copy', function(event) {
                var clipboard = event.clipboardData;
                clipboard.setData("text/html", $('#'+btn.id+'_cb #copy').html());
            } );

            client.on("aftercopy", function(e) {
                $('#'+btn.id+'_cb').remove();
                btn.hide();
                select.reset();
            });
        } );
        */



               
    },
    copyToClipboardFn: function(){
        copyStringToClipboard (btn.id);
    },
/*
    Grid refresh when grid opens or form saved
*/    
    reloadGrid:function(){
        var vcontroller = this;

        vcontroller.initClipboardBtn();
        
        var selected = new Array();
        var grid = vcontroller.lookupReference('propertiesGrid');
        Ext.each(grid.getSelection(), function (item ,index) {  
            selected.push(item.data.variation_id*1);
        });

        if(vcontroller.lookupReference('searchForm')) {
            form = vcontroller.lookupReference('searchForm').getForm();
            if (form.findField('disablesubmit').getValue() != '1') {
                this.getViewModel().getStore('propertiesList').load({
                    scope: this,
                    callback: function (records, operation, success) {
                        if (!success) {
                            if (operation.error.status == 403) {
                                vcontroller.fireEvent('unauthorized', vcontroller);
                            }
                        } else {
                            var detailView = vcontroller.lookupReference('propertiesFastView');
                            detailView.getViewModel().setData({rec: records[0]});
                            grid.store.data.each(function (element, i) {
                                if (selected.indexOf(element.data.properties_variation.id) >= 0) {
                                    grid.getSelectionModel().select(i, true, true);
                                }
                            }, this);                            
                        }
                    }
                });
            }
        }
    },  
/*
    Grid row click shows quick data
*/        
    onRowClick: function (grid, record, index, eOpts) {
        var detailView = this.lookupReference('propertiesFastView');
        var eastView = this.lookupReference('propertiesEastPanel');
        /*
        if(this.selectedRowId==record.get('id')) {
            if(eastView.hidden){
                eastView.expand();        
            }else{
                eastView.collapse();    
            }
            
        }else{
            eastView.expand(); 
        }
        */
        detailView.getViewModel().setData({ rec: record });
        this.selectedRowId=record.get('id');
        this.loadFastEvents();
    },
/*
    Grid row duble click opens the rows view
*/      
    onRowDblClick: function (grid, record, index, eOpts) {
        
        //Open a new window instance and add loading while data loads in
        win = new Tscrm.view.properties.View();
        win.setTitle(record.data.properties_variation.id +' - ' + record.data.address);
        //this.getView().add(win);   //Ha mozgatni akarom együtt az ablakokat akkor hivommeg így
        
        win.show();
        win.getViewModel().set('currentData',record.data.id); 
        this.loadViewData(this,record.data.id,win);

    },   
    loadViewData: function(controller,id,win){
        vcontroller = this;

        if(win.scope=='self'){win=this.getView();}
        win.lookupReference('inside').mask("Loading...");

        var datapanel=win.down('#maindata');
        var imagepanel=win.down('#images');
        var selldataleft=win.down('#selldataleft');
        var selldataright=win.down('#selldataright');
        var rentdataleft=win.down('#rentdataleft');
        var rentdataright=win.down('#rentdataright');    
        var filespanel=win.down('#files');    
        var selltab=win.down('#selltab');
        var renttab=win.down('#renttab');
        //Load data into the window
        if(id!='')
        {
            var data = vcontroller.getViewModel().getStore('propertiesView').load({
                params:{
                    'id': id,
                    'd':Math.random()
                },
                callback: function(records, operation, success) {
                    if(success)   
                    {
                        datapanel.update(records[0].data);
                        selldataleft.update(records[0].data.sellvar);
                        selldataright.update(records[0].data.sellvar);
                        rentdataleft.update(records[0].data.rentvar);
                        rentdataright.update(records[0].data.rentvar); 
                        if(Ext.isEmpty(records[0].data.sellvar))selltab.disable();
                        if(Ext.isEmpty(records[0].data.rentvar))renttab.disable();
                        if(!Ext.isEmpty(records[0].data.sellvar) && records[0].data.sellvar.nocontract==1)selltab.setIconCls('warning_orange');
                        if(!Ext.isEmpty(records[0].data.rentvar) && records[0].data.rentvar.nocontract==1)renttab.setIconCls('warning_orange');
                        imagepanel.update(records[0].data.properties_images_all);
                        filespanel.update(records[0].data.properties_documents);
                        win.setTitle( (records[0].data.rentvar ? records[0].data.rentvar.id + ' - ':'') + (records[0].data.sellvar ? records[0].data.sellvar.id +' ':'') +records[0].data.address);
                        win.lookupReference('inside').unmask();
                        vcontroller.loadEvents(win);
                    }else{
                        Ext.Msg.alert('Hiba', 'Az ingatlan nem található!');
                        win.close();                        
                    }

                }             
            });         
        }else{
            Ext.Msg.alert('Hiba', 'A ingatlan nem megtekinthető!');
            win.close();
        }
    }, 
/*
    Grid tbar Add button
*/      
    onAdd: function(){
        win = Ext.widget('propertiesForm');
   
        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
        },this,{'single':true});       
                    
   
        var myVar = setInterval(function(){ myTimer() }, 1000);

        function myTimer() {
            win.lookupReference('city_id').getStore().load({
                    params:{
                       
                    },
                    callback: function(records, operation, success) {
                        win.lookupReference('city_id').setValue(2);
                    }
            });
            myStopFunction();
        }

        function myStopFunction() {
            clearInterval(myVar);
        }              
            win.show();
        //win.lookupReference('selltab').disable();
        //win.lookupReference('renttab').disable();
       
        this.fireViewEvent('addrecord', this);   
    },
/*
    Grid row action Edit
*/       
    onEdit: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        win = Ext.widget('propertiesForm');

        win.addListener('close', function(){
            win.down('form').reset();
            //this.reloadGrid();
            this.fireViewEvent('refreshViewData',(!Ext.isEmpty(record)?record.data.id:vcontroller.getViewModel().get('currentData')), vcontroller.getView());

        },this,{'single':true});
        
         win.addListener('resize', function(){
           win.updateLayout();
        });  

        this.loadForEdit(win,(!Ext.isEmpty(record)?record.data.id:vcontroller.getViewModel().get('currentData')));

    },
    loadForEdit: function(win, id){
        var vcontroller = this;
        win.show();
        var formPanel = win.lookupReference('propertiesForm');
        formPanel.mask("Adatok betöltése...");
        var form = formPanel.getForm();

        form.url = '/admin/properties/edit.json';

        var data = this.getViewModel().getStore('propertiesView').load({
            params:{
                'id': id
            },
            callback: function(records, operation, success) {
                if(success)
                {
                    if(records[0].data.islocked==''){
                        win.setTitle('Ingatlan módosítás -'+ (records[0].data.sellvar?' Eladó sorszám: '+records[0].data.sellvar.id:'') + (records[0].data.rentvar?' Kiadó sorszám: '+records[0].data.rentvar.id:''))
                        vcontroller.loadFormData(vcontroller, form, formPanel, records, win);

                    }else{
                        if(records[0].data.editor){
                            Ext.Msg.show({
                                title:'Figyelmeztetés!',
                                message: 'Az ingatlant '+records[0].data.editor.fullname+' felhasználó már módosítja! A módosítást '+records[0].data.islocked+' perce kezdte. Szeretné Ön módosítani módosítani?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                buttonText:{
                                    yes: 'Igen',
                                    no: 'Nem'
                                },
                                fn: function(btn) {
                                    if (btn === 'yes') {
                                        vcontroller.loadFormData(vcontroller, form, formPanel, records, win);


                                    }else{
                                        win.close('a');
                                    }
                                }
                            });
                        }
                    }


                }else{
                    vcontroller.fireEvent('unauthorized', vcontroller);
                    win.close();
                    formPanel.unmask();
                }

            }
        });
    },
    loadFormData: function(vcontroller,form,formPanel,records,win){

        win.addListener('beforeclose', function(){

            Ext.Ajax.request({
                url: '/admin/properties/updateEditor.json',
                params:{
                    id:records[0].data.id,
                    status: 2
                },
                method: 'POST'
            });

        },this,{'single':true});

        Ext.Ajax.request({
            url: '/admin/properties/updateEditor.json',
            params: {
                id: records[0].data.id,
                status: 1
            },
            method: 'POST'
        });

        records[0] = vcontroller.loadRelated(records[0], formPanel, form);
        form.loadRecord(records[0]);
        vcontroller.loadComboboxes(records[0].data, formPanel); //EZT VISSZATENNI!!!!!!!!!!!!!

        tabs = formPanel.down('tabpanel').enable();
        Ext.each(tabs.items.items, function (name, index, countriesItSelf) {
            tabs.items.items[index].enable();
        });

        vcontroller.activateTab();
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
                    if(combo_name=='contacts[0][company_id]')
                    {
                        combo_data_name = 'contacts[0].company_id';
                        pre = 'contacts[0]';
                        combo_group_name = 'contacts';
                    }else if(combo_name=='contacts[1][company_id]')
                    {
                        combo_data_name = 'contacts[1].company_id';
                        pre = 'contacts[1]';
                        combo_group_name = 'contacts';
                    }else {
                        combo_data_name = comboboxes[index].name.replace('[', '.').replace(']', '');
                        combo_group_name = comboboxes[index].name.replace(/\[.*?\]\s?/g, '');
                        pre = combo_data_name.split(".", 1);
                    }


                    if(!Ext.isEmpty(eval('data.'+pre)) && !Ext.isEmpty(eval('data.'+combo_data_name)))
                    {
                        endLimit++;
                        if(combo_name == 'district_id'){
                            formPanel.getForm().findField('citypart_id').getStore().getProxy().setExtraParam('district_id', eval('data.'+combo_data_name))
                            formPanel.getForm().findField('street_id').getStore().getProxy().setExtraParam('district_id', eval('data.'+combo_data_name))

                        }                        
                        formPanel.getForm().findField(combo_name).getStore().load({
                            params:{
                                id: eval('data.'+combo_data_name)
                            },
                            callback: function(records, operation, success) {

                                if(success) {
                                    if (!Ext.isEmpty(eval('data.' + combo_group_name))) {

                                        formPanel.getForm().findField(combo_name).setValue(eval('data.' + combo_data_name));
                                    }
                                }
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
                    if(!formPanel.destroyed){
                        formPanel.unmask(); 
                    }
                }
            },
            interval: 100
        });
        
        endTimer=function(){runner.stop(loadingTimer);}            
                     
    },    
/*
    load related data
*/
    loadRelated: function(data,formPanel,form){

        data.data.contacts.forEach(function(element, index, array){
            if(element._joinData.type==1 && element._joinData.main==1){
                for(var i in element) {
                    if(!Ext.isEmpty(element[i])){
                        data.data['contacts[0]['+i+']']=element[i];
                        if(i == 'phone1type'){
                            form.findField('contacts[0][phone1type]').setValue(element[i]);
                            field = form.findField('contacts[0][phone1]');
                            val = element[i];
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
                        }
                        if(i == 'phone2type'){
                            form.findField('contacts[0][phone2type]').setValue(element[i]);
                            field = form.findField('contacts[0][phone2]');
                            val = element[i];
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
                        }                        
                        
                    }
                }  
            }
            if(element._joinData.type==2 && element._joinData.main==1){
                for(var i in element) {
                    if(!Ext.isEmpty(element[i])){
                        data.data['contacts[1]['+i+']']=element[i];
                        if(i == 'phone1type'){
                            form.findField('contacts[1][phone1type]').setValue(element[i]);
                            field = form.findField('contacts[1][phone1]');
                            val = element[i];
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
                        }
                        if(i == 'phone2type'){
                            form.findField('contacts[1][phone2type]').setValue(element[i]);
                            field = form.findField('contacts[1][phone2]');
                            val = element[i];
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
                        }                                    
                    }
                }      
                            
                formPanel.down('#contact1').expand();
            }            
        }); 

        
        for(var i in data.data.rentvar) {
             data.data['rentvar['+i+']']=data.data.rentvar[i];
        } 
        for(var i in data.data.sellvar) {
             data.data['sellvar['+i+']']=data.data.sellvar[i];
        }
        for(var i in data.data.properties_layout) {
            data.data['properties_layout['+i+']']=data.data.properties_layout[i];
        }

        return data; 
    },
/*
    Grid row action Delete
*/    
    onDelete: function(view, rowIdx, colIdx, item, e, record, row){
        var vcontroller = this;
        Ext.Msg.show({
            title:'Megerősítés',
            message: 'Valóban törölni akarja a kiválasztott ingatlant?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/admin/properties/delete.json',
                        params:{
                            id:record.data.id
                        },
                        method: 'POST',
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
    onFormSaveClose: function(){
        this.onFormSave(true); 
       
    },
    onFormSave: function(close) {
        
        var vcontroller = this;
        var formPanel = this.lookupReference('propertiesForm');
        var formWindow = this.getView();
        
        form = formPanel.getForm();
        
        if (form.isValid()) {
            formPanel.mask("Adatok ellenőrzése és mentése..."); 
            
            //nem mentjük a becsokott fieldsetet
            if(formPanel.down('#contact1').collapsed){
                formPanel.down('#contact1dontsave').setValue(1);
            }else{
                formPanel.down('#contact1dontsave').setValue(0);
            }   
            
            form.submit({
                    submitEmptyText:false,
                    success: function(form, action) {
                        
                        vcontroller.fireEvent('toast', 'Sikeres mentés', action.result.message );
                        if(close == true){
                             formWindow.close(); 
                        }else{
                            vcontroller.loadForEdit(formWindow,action.result.data.id);
                        }

                    },
                    failure: function(form, action){
                        vcontroller.setFailureFields(form, action, formPanel);
                        vcontroller.fireEvent('toastError', 'Sikertelen mentés', 'Hibásan kitöltött mezőket találtunk, kérjük a megjelölt beviteli mezőket javítsa!');
                    }
                });
        }
    },
/*
    upload images function  
*/     
    onFormImageupload: function() {
        var vcontroller = this;
        win = Ext.widget('imagesForm');
        if(!win)
        {
            this.getView().add(win);  
        }
        
        var notPublicImagesPanel = this.lookupReference('notPublicImages'); 
        var publicImagesPanel = this.lookupReference('publicImages'); 
        var imageForm = win.lookupReference('imagesForm');
        var propertiesForm = this.lookupReference('propertiesForm');
        imageForm.getForm().findField('property_id').setValue(propertiesForm.getForm().findField('id').getValue());
        win.show();
        win.addListener('close', function(){
            vcontroller.loadImages();
        },this,{'single':true});           
    },
    onDeleteImages: function(){
        var vcontroller = this;
        var propertiesForm = this.lookupReference('propertiesForm')
        Ext.Ajax.request({
            url: '/admin/properties_images/delete_all.json',
            params: {
                property_id:propertiesForm.getForm().findField('id').getValue()
            },
            success: function (response) {
                vcontroller.loadImages();
            }
        });        
    },
/*
    load images into data view  function
*/     
    loadImages:function(){
        var vcontroller = this;
        var propertiesForm = this.lookupReference('propertiesForm');
        h = this.lookupReference('propertiesForm').getHeight()-100;         
        var notPublicImagesPanel = this.lookupReference('notPublicImages');
        pos1 = notPublicImagesPanel.el.parent('.x-panel-body').getScrollTop();
        notPublicImagesPanel.getStore().load({
            params:{
                property_id:propertiesForm.getForm().findField('id').getValue()
            },
            callback: function(data){
                vcontroller.sortImagesInit(propertiesForm);
                notPublicImagesPanel.el.parent('.x-panel-body').setScrollTop(pos1);
                notPublicImagesPanel.setHeight(h);
            }
        });
      
        var publicImagesPanel = this.lookupReference('publicImages');
        pos2 = publicImagesPanel.el.parent('.x-panel-body').getScrollTop();
        publicImagesPanel.getStore().load({
            params:{
                property_id:propertiesForm.getForm().findField('id').getValue(),
                sort: 'ordered',
                dir: 'asc'
            },
            callback: function(data){
                vcontroller.sortImagesInit(propertiesForm);
                publicImagesPanel.el.parent('.x-panel-body').setScrollTop(pos2);
                publicImagesPanel.setHeight(h);
            }
        }); 
         
       // publicImagesPanel.setHeight(1000);
       // notPublicImagesPanel.setHeight(1000);
           
    },
    resizeWin: function(){
        h = this.lookupReference('propertiesForm').getHeight();    
        var notPublicImagesPanel = this.lookupReference('notPublicImages');   
        var publicImagesPanel = this.lookupReference('publicImages'); 
        notPublicImagesPanel.setHeight(h);
        publicImagesPanel.setHeight(h);
    } ,
    sortImagesInit: function (propertiesForm){
        var originalPos;
        $( ".sortimages" ).sortable({
            activate: function( event, ui ) {
                originalPos = ui.item.index();
            },
            update: function( event, ui ) {
                id = ui.item.data('id');
                if(id) {

                    Ext.Ajax.request({
                        url: '/admin/properties_images/edit/'+id+'.json',
                        params: {
                            id: id,
                            ordered :ui.item.index(),
                            originalPos: originalPos,
                            property_id:propertiesForm.getForm().findField('id').getValue()
                        },
                        success: function (response) {

                        }
                    });
                }

            }
        });
    },
/*
    delete image function
*/     
    deleteImages:function(id){
        var vcontroller = this;
        
        Ext.Ajax.request({
            url: '/admin/properties_images/delete.json',
            params: {
                id: id
            },
            success: function(response){
                vcontroller.loadImages();
            }
        });   
    },    
/*
    data view action  
*/  
    itemAction:function (me, record, item, index, e) {
        var className = e.target.className;
        var vcontroller = this;
        id = record.get('id');

        if ("delete-image" == className) {
            vcontroller.deleteImages(id);
        }
        
        if ("delete-layout" == className) {
            vcontroller.onDeleteLayout(id);
        }
        
        if ("edit-layout" == className) {
            vcontroller.onEditLayout(id);
        }

        if ("public-image" == className) {

            Ext.Ajax.request({
                url: '/admin/properties_images/edit/'+id+'.json',
                params: {
                    id: id,
                    ordered :99,
                    active: 1
                },
                callback:function(){
                    vcontroller.loadImages();
                }
            });


        }
        if ("unpublic-image" == className) {

            Ext.Ajax.request({
                url: '/admin/properties_images/edit/'+id+'.json',
                params: {
                    id: id,
                    ordered :99,
                    active: 0
                },
                callback:function(){
                    vcontroller.loadImages();
                }
            });

        }
    },
/*
    activate sell type tab if checkbox checked  
*/     
    activateTab: function () {
        var formPanel = win.lookupReference('propertiesForm');
        var sellTab = win.lookupReference('selltab');
        var rentTab = win.lookupReference('renttab');
        tabs=formPanel.down('tabpanel');
        if(formPanel.getForm().findField('sell').getValue())
        {
            sellTab.expand();
            sellTab.enable();
        }else{
            sellTab.collapse();
            sellTab.disable();
        }
        if(formPanel.getForm().findField('rent').getValue())
        {
            rentTab.expand();
            rentTab.enable();
        }else{
            rentTab.collapse();
            rentTab.disable();
        }

    },  
/*
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

            if(params['type[1]']){
                params['type[1]']=1;
            }
            if(params['type[2]']){
                params['type[2]']=2;
            }
            if(params['petallowed']){
                params['petallowed']=1;
            }
            if(params['gardencontact']){
                params['gardencontact']=1;
            }
            if(params['lowerlevel']){
                params['lowerlevel']=1;
            }
            if(params['upperlevel']){
                params['upperlevel']=1;
            }
            if(params['shortterm']){
                params['shortterm']=1;
            }
            if(params['terrace']){
                params['terrace']=1;
            }
            if(params['newlybuilt']){
                params['newlybuilt']=1;
            }
            if(params['ing_com']){
                params['ing_com']=1;
            }
            if(params['gdn']){
                params['gdn']=1;
            }

            if(params['aircondition']){
                params['aircondition']=1;
            }

            if(params['offer']){
                params['offer']=1;
            }

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
/*
    upload file function  
*/     
    onFormDocumentupload: function() {
        
        win = Ext.widget('documentsForm');
        if(!win)
        {
            this.getView().add(win);  
        }
        
        var documentGridPanel = this.lookupReference('propertiesDocumentsGrid'); 
        var documentsForm = win.lookupReference('documentsForm');
        var propertiesForm = this.lookupReference('propertiesForm');
        documentsForm.getForm().findField('property_id').setValue(propertiesForm.getForm().findField('id').getValue());
        win.show();
        win.addListener('close', function(){
            documentGridPanel.getStore().load({
                params:{
                    property_id:propertiesForm.getForm().findField('id').getValue()
                }
            }); 
        },this,{'single':true});           
    },        
/*
    load documents into grid
*/     
    loadDocuments:function(){
        var propertiesForm = this.lookupReference('propertiesForm');
        
        var propertiesDocumentsGrid = this.lookupReference('propertiesDocumentsGrid');  
        propertiesDocumentsGrid.getStore().load({
            params:{
                property_id:propertiesForm.getForm().findField('id').getValue()
            }
        });
           
    },    
/*
Delete document
*/
    onDeleteDocument:function(view, rowIdx, colIdx, item, e, record, row){ 
        vcontroller=this;
        Ext.Ajax.request({
            url: '/admin/properties_documents/delete.json',
            params: {
                id: record.data.id
            },
            success: function(response){
                vcontroller.loadDocuments();
            }
        });
    },
/*
Edit document
*/
    onEditDocument:function(view, rowIdx, colIdx, item, e, record, row){ 
     var vcontroller = this;
        
        win = Ext.widget('documentsFormEdit');
             
        win.addListener('close', function(){
            win.down('form').reset();
            vcontroller.loadDocuments()
        },this,{'single':true});
        
        win.show();
         
        var formPanel = win.lookupReference('documentsFormEdit');
        formPanel.mask("Adatok betöltése..."); 
        var form = formPanel.getForm();


        var data = this.getViewModel().getStore('documentsView').load({
            params:{
                'id': record.data.id
            },
            callback: function(records, operation, success) {
                if(success)
                {
                    formPanel.getForm().findField('document_type').getStore().load({
                        params:{
                            id: data.document_type_name
                        },
                        callback: function(rec, op, succ) {
                            form.loadRecord(records[0]);  
                        },
                        scope: this   
                    });                    
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
    upload layout function  
*/     
    onFormLayoutsupload: function() {
        
        win = Ext.widget('layoutsForm');
        if(!win)
        {
            this.getView().add(win);  
        }
        
        var layoutsDataview = this.lookupReference('layoutsDataview'); 
        var layoutsForm = win.lookupReference('layoutsForm');
        var propertiesForm = this.lookupReference('propertiesForm');
        layoutsForm.getForm().findField('property_id').setValue(propertiesForm.getForm().findField('id').getValue());
        win.show();
        win.addListener('close', function(){
            layoutsDataview.getStore().load({
                params:{
                    property_id:propertiesForm.getForm().findField('id').getValue()
                }
            }); 
        },this,{'single':true});           
    },        
/*
    load layouts into dataview
*/     
    loadLayouts:function(){
        var propertiesForm = this.lookupReference('propertiesForm');
        
        var layoutsDataview = this.lookupReference('layoutsDataview');  
        layoutsDataview.getStore().load({
            params:{
                property_id:propertiesForm.getForm().findField('id').getValue()
            }
        });
           
    }, 
/*
Delete layout
*/
    onDeleteLayout:function(id){ 
        vcontroller=this;
        Ext.Ajax.request({
            url: '/admin/properties_layouts/delete.json',
            params: {
                id: id
            },
            success: function(response){
                vcontroller.loadLayouts();
            }
        });
    },  
/*
    Edit layout
*/
    onEditLayout:function(id){ 
     var vcontroller = this;
        win = Ext.widget('layoutsForm');
        this.getView().add(win);
        win.addListener('close', function(){
            win.down('form').reset();
            vcontroller.loadLayouts()
        },this,{'single':true});
        
        win.show();

        var formPanel = win.lookupReference('layoutsForm');
        formPanel.mask("Adatok betöltése..."); 
        var form = formPanel.getForm();

        form.url='/admin/properties_layouts/edit.json';
        
        var data = this.getViewModel().getStore('layoutsView').load({
            params:{
                'id': id
            },
            callback: function(records, operation, success) {
                if(success)
                {
                    form.loadRecord(records[0]); 
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
Create contact to the property
*/
    onCreateContact:function(id){ 
        vcontroller=this;  
        win = Ext.widget('contactsForm').show();
   
        win.addListener('close', function(){
            win.down('form').reset();
            this.loadContacts();
        },this,{'single':true});       
                    
        win.show();  
        win.lookupReference('addContact').show();
        
        var propertiesForm = this.lookupReference('propertiesForm');
        win.getViewModel().getStore('ownPropertiesList').load({
            params:{
                id: propertiesForm.getForm().findField('id').getValue()
            },
            callback: function(rec, op, succ) {
                win.down('form').getForm().findField('property_id').setValue( propertiesForm.getForm().findField('id').getValue());  
            },
            scope: this   
        });                    
        this.fireViewEvent('addrecord', this);   
    }, 
/*
Edit contact to the property
*/    
    onEditContact:function(view, rowIdx, colIdx, item, e, record, row){  
        vcontroller=this;
        win = Ext.widget('contactsForm').show();
   
        win.addListener('close', function(){
            win.down('form').reset();
            this.reloadGrid();
        },this,{'single':true});       
                    
        win.show();  
        this.fireViewEvent('addrecord', this);   
                       
    }, 
/*
Delete contact property connection (not the contact!)
*/    
    onDeleteContact:function(view, rowIdx, colIdx, item, e, record, row){  
        var vcontroller = this;
        Ext.Msg.show({
            title:'Megerősítés',
            message: 'Valóban törölni akarja a kiválasztott kapcsolatot?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/admin/properties_contacts/delete.json',
                        params:{
                            contact_id:record.data.contact_id,
                            property_id:record.data.property_id
                        },
                        methid: 'POST',
                        success: function(response, opts) {
                            vcontroller.loadContacts();
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
Load attached contacts to the property
*/    
    loadContacts:function(id){
        var propertiesForm = this.lookupReference('propertiesForm');
        var propertiesContactsGrid = this.lookupReference('propertiesContactsGrid');  
        propertiesContactsGrid.getStore().load({
            params:{
                property_id:propertiesForm.getForm().findField('id').getValue()
            }
        });        
    },
    
/*  
List actions with the selected items
*/   
    onDoIt: function(){
        var vcontroller=this;

        var grid=vcontroller.lookupReference('propertiesGrid');
        var todo = vcontroller.lookupReference('todo').getValue();
        var todoContact = vcontroller.lookupReference('todo_contact');
        var street = vcontroller.lookupReference('withStreet').getValue();
        var streetNum = vcontroller.lookupReference('withStreetNum').getValue();
        var sortBy = grid.getStore().sorters.getAt(0)._id;
        var sorDir = grid.getStore().sorters.getAt(0)._direction;   
        var searchIdents = vcontroller.lookupReference('searchIdents');    
        var district_id = vcontroller.lookupReference('searchForm').getForm().findField('district_id[]').getValue(); 
        
        if(!Ext.isEmpty(todo))
        {
           
            var cbData=''; //clipboard data
            var ids='';
            var selected = new Array();
            var limit=0;
            Ext.each(grid.getAllSelections(), function(item) {
                selected.push(item);
                limit++;
            });
            ids=selected.join();

            if(todo==1 || todo==2 || todo==3 || todo==4 || todo==11 || todo==12 || todo==13 || todo==14 || todo==15 || todo==16 || todo==17 || todo==25 || todo==26)
            {   
                vcontroller.copyToClipboard('/admin/properties/index?print=1&alldata=1&todo='+todo+
                    '&stck='+street+ '&stnck='+ streetNum +'&ids='+ids+'&limit='+limit+ '&sort=' + sortBy  +
                    '&direction=' + sorDir+ '&sortIdent=' +searchIdents.getValue()+'&district_sort='+district_id+'&lng='+
                    ((todo==3 || todo==13 || todo==15 || todo==17 )?'en':'hu'));
               
            }else if(todo==5 || todo==6){
                //Címkiadás, megtekintései
                //Felnyit egy új abalakot
                win = Ext.widget('propertiesPrintForm').show();
                win.show();  
                var printForm = win.lookupReference('printForm');
                printForm.getForm().findField('property_id').setValue(ids);
                printForm.getForm().findField('todo').setValue(todo);
                printForm.getForm().findField('idents').setValue(searchIdents.getValue());
                
            }else if(todo==9){
                //Kereső regisztrációs
                win = Ext.widget('propertiesContactSearchForm').show();
                win.show();   
                
                var contactSearchForm = win.lookupReference('contactSearchForm').getForm();
                
                contactSearchForm.findField('selected_properties').setValue(ids);
                win.lookupReference('selected_properties').setHtml(ids);
                
                searchValues = vcontroller.lookupReference('searchForm').getForm().getFieldValues(true);
                Ext.iterate(searchValues, function(key, value) {

                    if(contactSearchForm.findField(key) && !Ext.isEmpty(key) && key !== 'active[]')
                    {
                        contactSearchForm.findField(key).setValue(value);    //Uncaught TypeError: Cannot read property 'setValue' of null
                    }
                });


            }else if(todo==10){
                //kiajánlás küldése
                win = Ext.widget('sentPropertiesContactsForm').show();
                win.show();   
                win.getViewModel().getStore('propertiesList').load({
                    params:{
                        'ids': ids
                    }
                });  
                var contactForm = win.lookupReference('sentPropertiesContactsForm');
                contactForm.getForm().findField('properties_variation_ids').setValue(ids);             
            }           
        }else{
            Ext.Msg.alert('Figyelmeztetés', 'Válasszon műveletet');    
        }        
       /*
        var client = new ZeroClipboard();
        client.on("ready", function(e) {
          if (e.client === client && client === this) {
              client.setData("text/plain", "Blah");
            console.log("This client instance is ready!");
          }else{
            Ext.Msg.alert('Hiba', 'Nem elérhető a vágólap!');    
          }
        }); */       
    },
/*  
Copy to clipboard
*/   
    copyToClipboard: function(url){
        if(clipboardWindow)clipboardWindow.close();
        clipboardWindow = window.open(url, "Copy", "width=800, height=600"); 
    }, 
/*  
Copy to clipboard from "Címkiadás"
*/   
    copyToClipboardAddressList: function(){
        form=this.lookupReference('printForm');
        vcontroller=this;
        todo=form.getForm().findField('todo').getValue();
        ids=form.getForm().findField('property_id').getValue();
        name=form.getForm().findField('name').getValue();
        phone=form.getForm().findField('phone').getValue();
        dateraw=form.getForm().findField('date').getValue();
        idents=form.getForm().findField('idents').getValue();
        
        var dateformat = new Date(dateraw);
        date=dateformat.getFullYear() + '-' + (dateformat.getMonth() + 1) + '-' + dateformat.getDate() ;
        vcontroller.copyToClipboard('/admin/properties/index?print=1&alldata=1&todo='+todo+'&ids='+ids+'&name='+name+'&phone='+phone+'&date='+date+'&sortIdent='+idents
            +'&lng='+
            ((todo==3 || todo==13 || todo==15 || todo==17 )?'en':'hu'));
       
    },  
    
/*
    Contact has search form fill 
*/      
    searchFill:function(params,win){    
        vcontroller = this;
        endLimit = 0; 
        loading = 0;
        form=this.lookupReference('searchForm').getForm();

        //disable submit on checkbox change
        form.findField('disablesubmit').setValue('1');
        
        //open window
        win.show();
        
        //set type
        if(!Ext.isEmpty(params.type))
        {
            types=params.type.split( ',') ;
            types.forEach(function(element, index, array){
                form.findField('type['+types[index]+']').setValue(1);
                
            });        
        }

        Ext.iterate(params, function(key, value) {
            if(!Ext.isEmpty(key) && !Ext.isEmpty(value) )
            {
                if(form.findField(key))
                {
                    form.findField(key).setValue(value); 
                }else if(key=='active'){
                    endLimit++;
                    form.findField('active[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('active[]').setValue(value);
                    }, 100);
                   
                }else if(key=='building_type'){
                    endLimit++;
                    form.findField('building_type[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('building_type[]').setValue(value);
                    }, 100);
                   
                }else if(key=='parking'){
                    endLimit++;
                    form.findField('parking[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('parking[]').setValue(value);
                    }, 100);
                   
                }else if(key=='furniture_type'){
                    endLimit++;
                    form.findField('furniture_type[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('furniture_type[]').setValue(value);
                    }, 100);
                   
                }else if(key=='pool_type'){
                    endLimit++;
                    form.findField('pool_type[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('pool_type[]').setValue(value);
                    }, 100);
                   
                }/*else if(key=='ident'){
                    endLimit++;
                    form.findField('ident[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('ident[]').setValue(value);
                    }, 100);
                   
                }*/else if(key=='district_id'){
                    endLimit++;
                    form.findField('district_id[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('district_id[]').setValue(value);
                    }, 100);

                }else if(key=='city_id'){
                    endLimit++;
                    form.findField('city_id[]').addListener('change',function(){loading++; });
                    setTimeout(function(){
                        form.findField('city_id[]').setValue(value);
                    }, 100);
                   
                }
            }
        });
        form.findField('disablesubmit').setValue('0');                 
        params = form.getFieldValues(true);  
        
        //Checking the stores are ready and fields filled
        var runner = new Ext.util.TaskRunner();
        var loadingTimer = runner.start({
            run: function() {
                if(loading>=endLimit){
                    endTimer();
                }
            },
            interval: 100
        });
        
        endTimer=function(){runner.stop(loadingTimer); vcontroller.onSearchSubmit();}         
        
    },
/*
    Phone field changes 
*/        
    checkPhone: function(e){
        var vcontroller = this;
        var contact_ident;
        var phone=e.getValue();
        var propertiesForm = vcontroller.lookupReference('propertiesForm');
        
        if(Ext.isEmpty(phone)){
            return false;
        }
        if(e.getName()=='contacts[0][phone1]' || e.getName()=='contacts[0][phone2]')        
        {
            contactid=propertiesForm.getForm().findField('contacts[0][id]').getValue();     
            contact_ident=0;
        }
        
        if(e.getName()=='contacts[1][phone1]' || e.getName()=='contacts[1][phone2]')        
        {
            contactid=propertiesForm.getForm().findField('contacts[1][id]').getValue(); 
            contact_ident=1;    
        }        
               
        
        var data = this.getViewModel().getStore('contacts').load({
            params:{
                'phone': phone
            },
            callback: function(records, operation, success) {
                if(success)
                {   
                    var first_data; 
                    first_data=this.first();
                    if(!Ext.isEmpty(first_data) && first_data.get('id')!=contactid){
                        //alert what do you want with this
                        Ext.Msg.show({
                            title: 'Egyező telefonszám',
                            message: 'A '+phone+' telefonszám már rögzítve van a rendszerben. Mit kíván tenni?',
                            width: 300,
                            buttons: Ext.Msg.YESNO, 
                            buttonText: {     
                                    yes: 'Betölt',
                                    no: 'Felülír'
                            },                            
                            fn: function(btn){
                                if(btn=='yes'){
                                    propertiesForm.getForm().findField('contacts['+contact_ident+'][id]').setValue(first_data.get('id'));     
                                    propertiesForm.getForm().findField('contacts['+contact_ident+'][prename]').setValue(first_data.get('prename'));     
                                    propertiesForm.getForm().findField('contacts['+contact_ident+'][firstname]').setValue(first_data.get('firstname'));     
                                    propertiesForm.getForm().findField('contacts['+contact_ident+'][lastname]').setValue(first_data.get('lastname'));     
                                    propertiesForm.getForm().findField('contacts['+contact_ident+'][email1]').setValue(first_data.get('email1'));
                                    if(first_data.get('phone1')) {
                                        propertiesForm.getForm().findField('contacts[' + contact_ident + '][phone1type]').setValue(first_data.get('phone1type'));
                                        propertiesForm.getForm().findField('contacts[' + contact_ident + '][phone1]').setValue(first_data.get('phone1'));
                                    }
                                    if(first_data.get('phone2')) {
                                        propertiesForm.getForm().findField('contacts[' + contact_ident + '][phone2type]').setValue(first_data.get('phone2type'));
                                        propertiesForm.getForm().findField('contacts[' + contact_ident + '][phone2]').setValue(first_data.get('phone2'));
                                    }
                                    propertiesForm.getForm().findField('contacts['+contact_ident+'][note]').setValue(first_data.get('note'));
                                }  
                                if(btn=='no'){
                                    propertiesForm.getForm().findField('contacts['+contact_ident+'][id]').setValue(first_data.get('id')); 
                                    console.log(first_data.get('id'));   
                                    console.log(propertiesForm.getForm().findField('contacts['+contact_ident+'][id]').getValue());                                                                      
                                }
                                
                            },
                            icon: Ext.window.MessageBox.QUESTION
                        });                        
                        
                    }
                    
                }
            }             
        });        
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
    
/*
    load fast events
*/     
    loadFastEvents:function(){   
        eventsList=this.lookupReference('listEventsFastView');
        if(eventsList.isVisible()){
            store=eventsList.getViewModel().getStore('events');
            store.getProxy().setExtraParams({
                    byid:this.selectedRowId,
                    bymodel:'Properties',
                    sort: '[{"property":"created","direction":"DESC"}]'
            });
            store.load();
        }
    },  
    
/*
    load events on property page
*/     
    loadEvents:function(win){
        store=win.getViewModel().getStore('events');
        store.getProxy().setExtraParams({
                byid:win.getViewModel().get('currentData'),
                bymodel:'Properties',
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
                            if(index=='contacts')field='contacts[0][phone1]';
                            else field = index;
                            form.findField(field).markInvalid(action.result.errors[index][subindex]);
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
/**
* Add event from list
*        
* @param view
* @param rowIdx
* @param colIdx
* @param item
* @param e
* @param record
* @param row
*/
    onRowAddEvent: function(view, rowIdx, colIdx, item, e, record, row){
        win = Ext.widget('eventsForm').show();
        win.show();    
        var eventForm = win.lookupReference('eventsForm');
        eventForm.getForm().findField('property_id').setValue(record.data.id);        
    },
/**
* Add event from property view
* 
*/
    onAddEvent: function(){
        var vcontroller = this;
        win = Ext.widget('eventsForm').show();
        win.show();    
        var eventForm = win.lookupReference('eventsForm');
        eventForm.getForm().findField('property_id').setValue(vcontroller.getViewModel().get('currentData'));        
    }, 
    
/**
* Load Inerest contact to the proerty view
*/
    loadInterestContact: function(){
        var vcontroller = this;

        vcontroller.getViewModel().getStore('interestContactsList').getProxy().extraParams = {
            property_id:vcontroller.getViewModel().get('currentData')
        }
        vcontroller.getViewModel().getStore('interestContactsList').load(); 
 
    },

    /**
     * Load Inerest contact to the proerty view
     */
    loadContactsSearches: function(){
        var vcontroller = this;

        vcontroller.getViewModel().getStore('searchContactsList').getProxy().extraParams = {
            property_id:vcontroller.getViewModel().get('currentData')
        }
        vcontroller.getViewModel().getStore('searchContactsList').load();

    },

/**
* Load contacts who got this property by sending
*/    
    loadSentContact:function(){
        var vcontroller = this;

        vcontroller.getViewModel().getStore('sentContactsList').getProxy().extraParams = {
            property_id:vcontroller.getViewModel().get('currentData')
        }
        vcontroller.getViewModel().getStore('sentContactsList').load(); 
               
    },

 /**
 * New interest contact, prefill property details
 * 
 */
    onNewContactInterest: function(){
        vcontroller = this;
        win = Ext.widget('interestPropertiesContactsFormWindow').show();
        win.show(); 
        win.addListener('close', function(){
            win.down('form').reset();
            this.loadInterestContact();
        },this,{'single':true}); 
        
        var formPanel = win.lookupReference('interestPropertiesContactsForm');
        var form=formPanel.getForm()
        selected=vcontroller.getViewModel().get('currentData');
        formPanel.mask("Kérem várjon...");


        propertyField = win.lookupReference('selected_property');
        propertyField.setValue(selected);
        propertyField.getStore().load();
        propertyField.fireEvent('select');
    },
 /**
 * New property send out to a contact
 * 
 */    
    onNewContactSend: function(){
        vcontroller = this;
        
        win = Ext.widget('sentPropertiesContactsForm').show();
        win.show(); 
        win.addListener('close', function(){
            win.down('form').reset();
            this.loadSentContact();
        },this,{'single':true});  
        
        win.getViewModel().getStore('propertiesList').load({
            params:{
                'id': vcontroller.getViewModel().get('currentData')
            },
            callback: function(records, operation, success) {
                if(success)   
                {  
                    ids='';
                    variations = new Array();
                    records.forEach(function(element, index, array){
                        variations.push(element.data.variation_id);  
                    });
                    ids = variations.join();
                    var contactForm = win.lookupReference('sentPropertiesContactsForm');
                    contactForm.getForm().findField('properties_variation_ids').setValue(ids)                       
                }
            } 
        }); 
 
    },
/**
* City select filter districts    
*/
    onCitySelect: function(){
        vcontroller = this;
        
        cityField = vcontroller.lookupReference('city_id');
        districtField = vcontroller.lookupReference('district_id');
        citypartField = vcontroller.lookupReference('citypart_id');
        streetField = vcontroller.lookupReference('street_id');
        
        districtField.setValue(false);
        citypartField.setValue(false);
        streetField.setValue(false);        
        //if city is Budapest Enable district selector

        if(cityField.getValue()==2)
        {
            districtField.enable(); 
        }else{
            districtField.disable();
            delete streetField.getStore().getProxy().getExtraParams()['district_id'];
        }
        
        streetField.getStore().getProxy().setExtraParam('city_id',cityField.getValue());
        streetField.getStore().load({
            scope: vcontroller,
            callback: function (records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });
        
        citypartField.getStore().getProxy().setExtraParam('city_id',cityField.getValue());
        citypartField.getStore().load({
            scope: vcontroller,
            callback: function (records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });

    },
    onCityChange: function(){
        vcontroller = this;
        
        cityField = vcontroller.lookupReference('city_id');
        districtField = vcontroller.lookupReference('district_id');
        citypartField = vcontroller.lookupReference('citypart_id');
        streetField = vcontroller.lookupReference('street_id');

        if(cityField.getValue()==2)
        {
            districtField.enable(); 
        }else{
            districtField.disable();
            delete streetField.getStore().getProxy().getExtraParams()['district_id'];
        }
        
        streetField.getStore().getProxy().setExtraParam('city_id',cityField.getValue());

        citypartField.getStore().getProxy().setExtraParam('city_id',cityField.getValue());
       
                
    },
/**
* Disdrict select streets
*     
*/
    onDistrictSelect: function(){    
        vcontroller = this;
        
        cityField = vcontroller.lookupReference('city_id');
        districtField = vcontroller.lookupReference('district_id');
        citypartField = vcontroller.lookupReference('citypart_id');
        streetField = vcontroller.lookupReference('street_id');
        
        streetField.setValue(false);
        citypartField.setValue(false)
        
        streetField.getStore().getProxy().setExtraParam('district_id',districtField.getValue());
        streetField.getStore().load({
            scope: vcontroller,
            callback: function (records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });
        
        citypartField.getStore().getProxy().setExtraParam('district_id',districtField.getValue());
        citypartField.getStore().load({
            scope: vcontroller,
            callback: function (records, operation, success) {
                if (!success) {
                    if (operation.error.status == 403) {
                        vcontroller.fireEvent('unauthorized', vcontroller);
                    }
                }
            }
        });
    },

/**
* Add new city to the database
*/
    addNewCity: function(){
        vcontroller = this;
        
        win = Ext.widget('citiesForm').show();
        formPanel = win.lookupReference('citiesForm');
        cityField = vcontroller.lookupReference('city_id');
        cityValue='';
        
        formPanel.addListener('beforeaction', function(){
            cityValue=formPanel.getForm().findField('city').getValue()
            cityField.setValue(cityValue);
        },this,{'single':true});  
              
        win.addListener('close', function(){
            cityField.getStore().load({
                params: {query: cityValue},
                callback: function(records, operation, success) {
                    cityField.setValue(records[0].data.id);
                }
            });            
            win.down('form').reset();
        },this,{'single':true});       
                    
        win.show();  
        this.fireViewEvent('addrecord', this);        
    },
    
/**
* Add new citypart to the database
*/
    addNewCitypart: function(){

        vcontroller = this;
        
        win = Ext.widget('citypartsForm').show();
        formPanel = win.lookupReference('citypartsForm');
        citypartField = vcontroller.lookupReference('citypart_id');
        citypartFieldValue = ''
        formPanel.addListener('beforeaction', function(){     
            citypartFieldValue=formPanel.getForm().findField('citypart').getValue();   
            citypartField.setValue(citypartFieldValue);
        },this,{'single':true});  
                

        win.addListener('close', function(){

            if(citypartFieldValue !=''){
                citypartField.getStore().load({
                    params: {query: citypartFieldValue},
                    callback: function(records, operation, success) {
                        citypartField.setValue(records[0].data.id);
                    }
                });              
            }
            win.down('form').reset();
        },this,{'single':true});       
                    
        win.show();  
        this.fireViewEvent('addrecord', this);   
        
    },  
/**
* Add new street to the database
*/
    addNewStreet: function(){
        
        vcontroller = this;
        
        win = Ext.widget('streetsForm').show();
        formPanel = win.lookupReference('streetsForm');
        streetField = vcontroller.lookupReference('street_id');
        console.log(streetField);
        win.addListener('beforeclose', function(){
            streetFieldValue=formPanel.getForm().findField('street').getValue()
            streetField.setValue(streetFieldValue);
        },this,{'single':true});  
              
        win.addListener('close', function(){
            streetField.getStore().load({
                params: {query: streetFieldValue},
                callback: function(records, operation, success) {
                    streetField.setValue(records[0].data.id);
                }
            });              
            win.down('form').reset();
        },this,{'single':true});       
                    
        win.show();  
        this.fireViewEvent('addrecord', this);           
        
    },
/**
* Shown contact information
*/
    showContact: function(grid, record, index, eOpts){
        
        var vcontroller = this;
        contact = record.get('contact');
        id = contact.id;
        //win = new Tscrm.view.contacts.View();
        win = Ext.widget('contactsView').show();
        win.lookupReference('inside').mask("Loading...");
        //Load data into the window
        if(id!='')
        {
            var datapanel=win.down('#maindata');
            var datapanel_right=win.down('#maindata_right');
            win.getViewModel().set('currentData', id);
            var data = win.getViewModel().getStore('contactsView').load({
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
    setCollectedData: function(e){
        vcontroller = this;
        var formPanel = vcontroller.lookupReference('propertiesForm');
        var sellPretext = vcontroller.lookupReference('sellPretext');
        var rentPretext = vcontroller.lookupReference('rentPretext');
        var form = formPanel.getForm();
        text ='';
        $.each(form.getValues(), function(index, value) {
            if(index=='building_type'){
                if(form.findField(index).getRawValue()!='')text +='Típus:'+form.findField(index).getRawValue()+',';
            }
            if(index=='builddate'){
                if(value!='')text +='Építési idő:'+value+' m2, ';
            }
            if(index=='building_condition'){
                if(form.findField(index).getRawValue()!='')text +='Állapot:'+form.findField(index).getRawValue()+', ';
            }
            if(index=='conveniences'){
                if(form.findField(index).getRawValue()!='')text +='Komfort:'+form.findField(index).getRawValue()+', ';
            }
            if(index=='size_net'){
                if(value!='')text +='Nettó alapterület:'+value+' m2, ';
            }
            if(index=='size_gross'){
                if(value!='')text +='Bruttó alapterület:'+value+' m2, ';
            }
            if(index=='lotsize_m3'){
                if(value!='')text +='Telekméret:'+value+' m3, ';
            }
            if(index=='heat_type'){
                if(form.findField(index).getRawValue()!='')text +='Fűtés:'+form.findField(index).getRawValue()+', ';
            }
            if(index=='building_levels'){
                if(value!='')text +='Épület szintjei:'+value+', ';
            }
            if(index=='floor'){
                if(value!='')text +='Emelet:'+value+' m2, ';
            }
            if(index=='gardencontact'){
                if(value=='1')text +='Kertkapcsolatos, ';
            }
            if(index=='lift'){
                if(value=='1')text +='Lift van, ';
            }
            if(index=='newlybuilt'){
                if(value=='1')text +='Újépítésű, ';
            }
            if(index=='terrace'){
                if(form.findField(index).getRawValue()!='')text +='Terasz, erkély:'+form.findField(index).getRawValue()+', ';
            }
            if(index=='parking'){
                if(form.findField(index).getRawValue()!='')text +='Parkolás:'+form.findField(index).getRawValue()+', ';
            }
            if(index=='pool_type'){
                if(form.findField(index).getRawValue()!='')text +='Medence:'+form.findField(index).getRawValue()+', ';
            }
        });
        sellPretext.setHtml(text);
        rentPretext.setHtml(text);
    },
    onDownloadImages: function(){
        id = win.getViewModel().get('currentData');
        window.open('/admin/properties_images/download/'+id);
    },
    lotsizeChangen4: function(){

        m3field = this.lookupReference('lotsize_m3');
        m4field = this.lookupReference('lotsize_n4');
        m3field.setValue(m4field.getValue()*3.6);

    },
    lotsizeChangem3: function(){

        m3field = this.lookupReference('lotsize_m3');
        m4field = this.lookupReference('lotsize_n4');
        m4field.setValue(m3field.getValue()/3.6);

    }

});


function copyStringToClipboard (id) {
    function handler (event){
        event.clipboardData.setData('text/plain',  $('#'+id+'_cb #copy').html());
        event.clipboardData.setData('text/html', $('#'+id+'_cb #copy').html());    
        event.preventDefault();
        document.removeEventListener('copy', handler, true);
    }

    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
}
