/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Tscrm.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        bind: {
            title: 'Total Studio Crm Dev'
        },
        region: 'north',
        items: [{
            xtype: 'toolbar',
            items: [
                {
                    iconCls: 'menu_folder' ,
                    icon: null,
                    glyph: 72,
                    text: 'Menu1',
                    scale: 'large',
                    iconAlign: 'top',
                    menu: [{text: 'Menu Item 1'}],
                    handler: 'onMenuClick'             
                },
                {
                    iconCls: 'menu_folder' ,
                    icon: null,
                    glyph: 72,
                    text: 'Menu2',
                    scale: 'large',
                    iconAlign: 'top',
                    menu: [{text: 'Menu Item 1'}]
                }
            ]
            
        }]
    },{
        region: 'center',
        xtype: 'panel',
        html: 'Content'
    }]
});

