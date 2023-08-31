/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Tscrm.controller.Viewport', {
    extend: 'Ext.app.Controller',

    requires: [
        'Tscrm.view.Viewport'
    ],

    control: {
        'window': {  // matches the view itself
            focus: 'onFocus',
            minimize: 'onMinimalize',
            restore: 'onRestore'
            
        },
        'combobox#propertySearch': {
            select: 'onPropertySelect'
        },
        'combobox#contactSearch': {
            select: 'onContactSelect'
        },
        'combobox#contactSearchSearch': {
            select: 'onSearchSelect'
        },
        'menuitem': {
            click: 'onMenuClick'
        },
        '#list_contacts': {
            click: 'onMenuClick'
        },
        '#list_searches': {
            click: 'onMenuClick'
        },
        '#list_property': {
            click: 'onMenuClick'
        },
        'grid':{
            afterrender: 'onGridAfterRender',
            reconfigure: 'onGridReconfigure'
        }
    }, 
    listen : {
        controller : {
            '*' : {
                unauthorized : 'onUnauthorized',
                loginNeeded : 'onLoginNeeded',
                toast : 'onSaved',
                toastError : 'onSaveError'
            }
        },
        store : {
            '*' : {
                unauthorized : 'onUnauthorized'
            }
        }
    },

    refs: [{
        ref: 'dockedMenu',
        selector: '#dockedMenu'          
    }],

    
    init : function() { 

    },

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    
    onMenuClick: function (e) {
        switch(e.itemId){
            case 'add_property':
                w=Ext.widget('propertiesForm').show();
            break;
            case 'list_property':
                w=Ext.widget('propertiesList').show();
            break;
            case 'list_contacts':
                w=Ext.widget('contactsList').show();
            break; 
            case 'add_contacts':
                w=Ext.widget('contactsForm').show();
            break;               
            case 'list_roles':
                w=Ext.widget('rolesList').show();
            break;              
            case 'list_users':
                w=Ext.widget('usersList').show();
            break; 
            case 'list_cities':
                w=Ext.widget('citiesList').show();
            break;                                                                       
            case 'list_cityparts':
                w=Ext.widget('citypartsList').show();
            break; 
            case 'list_districts':
                w=Ext.widget('districtsList').show();
            break; 
            case 'list_streets':
                w=Ext.widget('streetsList').show();
            break;
            case 'list_searches':
                w=Ext.widget('contactsSearchesList').show();
            break;
            default:
                //Ha ide beírok bármit akkor a táblázatok column rendezője is lefuttaja.
            break;
        }
       
        //console.log(w.id);
        //var grid = Ext.ComponentQuery.query('gridpanel', w); 
        //console.log(grid[0]);
       // grid[0].setTitle('a');
        /*
        console.log(grid[0].getDockedItems('toolbar[dock="bottom"]')).addDocked(
            new Ext.create('Ext.PagingToolbar', {
                        //store:  Ext.create('Tscrm.store.Template'),
                        displayInfo: true,
                        displayMsg: 'Displaying topics {0} - {1} of {2}',
                        emptyMsg: "No topics to display"
                        
                    })
        );  */
       // grid[0].doLayout();
      //  Ext.widget('templateList').lookupViewModel().setData({name:'1'});
    },    

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    onMinimalize: function(window){
      window.hide();
      /*
                window.collapse();
                window.setWidth(150);
                window.alignTo(Ext.getBody(), 'bl-bl');
                */
                
     var btn = Ext.create('Ext.Button', {
        text: window.getTitle(),
        listeners:{
            click: function(){
                window.show(); 
                this.destroy();  
            }
        }
     });               
      menu = this.getDockedMenu();
      menu.add(btn);              
                
    },
    onRestore: function(window){
                
    },
    onFocus: function(window){
           //alert('fo');
    },
    onUnauthorized: function(controller){    
        w=Ext.widget('usersLogin').show();
         
        Ext.Msg.show({
            title: 'Hiba!',
            message: 'Nincs jogosultsága a művelethez!',
            buttons: Ext.Msg.OK,
            modal: true,
            fn: this.checkAuth
        });     
    },
    onLoginNeeded: function(controller){ 
        w=Ext.widget('usersLogin').show();

    },    
    checkAuth: function(){
        //alert('Ellenőrizzük be van e jelentkezve%')
        //w=Ext.widget('usersLogin').show();    
    }, 
    onPropertySelect: function(e){
            win = new Tscrm.view.properties.View();
            win.showAt(e.getXY());
            if(e.getValue()!='') {
                win.getViewModel().set('currentData', e.getValue());
                win.getController().loadViewData(win.getController(), e.getValue(), win);
            }
            e.setValue('');
    },  
    onContactSelect: function(e){
            win = new Tscrm.view.contacts.View();
            win.showAt(e.getXY());
            if(e.getValue()!='') {
                win.getViewModel().set('currentData', e.getValue());
                win.getController().loadViewData(win.getController(), e.getValue(), win);
            }
            e.setValue('');
    },
    onSearchSelect: function(e){
        win = new Tscrm.view.contacts.View();
        win.showAt(e.getXY());
        if(e.getValue()!='') {
            win.getViewModel().set('currentData', e.getValue());
            win.getController().loadViewData(win.getController(), e.getValue(), win);
        }
        e.setValue('');
    },
    onGridAfterRender: function (e) {
         view = e.getView();
         view.setLoading(true);
    } ,
    onGridReconfigure: function(e){
         view = e.getView();
         view.setLoading(false);
         
    }, 
    onSaved: function(title,text){   
       Ext.toast({
            html: text,
            title: title,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });  
    },
    onSaveError: function(title,text){   
       Ext.toast({
            html: text,
            title: title,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400,
            cls: 'error-window',
            bodyStyle: {
                background: 'red',
                color: '#ffffff',
                padding: '10px'
            }            
        });  
    }

});
