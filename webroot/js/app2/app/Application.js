var clipboardWindow;

/*
* Load form this paths
*/
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Tscrm':'./js/app2',
        //'Ext.ux': './js/app2/ext-5.1.0/examples/ux',
        'Ext.ux.ts': './js/app2/resources/ux',
        //'Ext.ux.grid': './js/app2/resources/ux/grid'
    }
});

/*
* Load UX stuff
*/
Ext.require([
        'Ext.ux.ts.form.MultiFile',
        'Ext.ux.ts.form.Phone',
        'Ext.ux.ts.grid.TinyPager',
        'Ext.ux.ts.grid.GridMultipageSelection'
]);

 
/*
* ARIA check disable
*/
Ext.enableAriaButtons=false;
Ext.enableAriaPanels=false;
Ext.supports.touchScroll = 1;
var Global = {};
Global.maxWidth = $(window).width();
Global.maxHeight = $(window).height();

/*
* Some overrides until not fixed in new main release
*/
Ext.define('Ext.overrides.layout.container.Container', {
  override: 'Ext.layout.container.Container',

  notifyOwner: function() {
    this.owner.afterLayout(this);
  }
});

Ext.tip.QuickTipManager.init(true,{ dismissDelay: 2000000 });

/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

/*
* Application starts Here!
*/

Ext.application({
    name: 'Tscrm',
    autoCreateViewport: true,
    appFolder:'./js/app2/app',
    splashscreen: {},    
    requires: [

    ],
    views : [

    ],
    
    controllers : [
        'Roles',
        'Users',
        'Cities',
        'Cityparts',
        'Districts',
        'Streets',
        'Events',
        'Contacts',
        'Properties',
        'Viewport',
        //'Template',
        'Images',
        'Documents',
        'Layouts',
        'ContactsSearches',
        'SentPropertiesContacts',
        'InterestPropertiesContacts',
        'ShowedPropertiesContacts',
        'RentedPropertiesContacts',
    ],
    
    stores : [

    ],    
    init: function(){
        splashscreen = Ext.getBody().mask('Hamarosan betölt!', 'splashscreen');
    },
    listen:{
        global:{
            dashboardready: 'onDashboardReady'
        }
    },
    launch: function () {
        //Initialize quick tips
        Ext.tip.QuickTipManager.init();
        
        //Fancybox popup call.
        $(".popup").fancybox({

        afterLoad   : function( e, current ) {
           if($($(e)[0].element[0]).data('status') == 'inaktiv'){
               $(e.skin[0]).css('background-color', 'red') ;
           }else{
               $(e.skin[0]).css('background-color', 'white');   
           }

            
        }
    });
        var task = new Ext.util.DelayedTask(function() {
            Ext.GlobalEvents.fireEvent('apploaded');    
        });
        task.delay(1000);

    },
    onDashboardReady: function(){
        splashscreen.fadeOut({
            duration: 500,
            remove: true
        });
        
    }
});
