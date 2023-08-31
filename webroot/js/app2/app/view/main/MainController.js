/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Tscrm.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
      //  'Ext.MessageBox'
    ],

    alias: 'controller.main',

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    
    onMenuClick: function () {
        w=Ext.widget('templateList').show();
        console.log(w.id);
        var grid = Ext.ComponentQuery.query('gridpanel', w); 
        console.log(grid[0]);
        grid[0].setTitle('a');  
        console.log(grid[0].getDockedItems('toolbar[dock="bottom"]')).addDocked(
            new Ext.create('Ext.PagingToolbar', {
                        //store:  Ext.create('Tscrm.store.Template'),
                        displayInfo: true,
                        displayMsg: 'Displaying topics {0} - {1} of {2}',
                        emptyMsg: "No topics to display"
                        
                    })
        );    
       // grid[0].doLayout();
      //  Ext.widget('templateList').lookupViewModel().setData({name:'1'});
    },    

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
