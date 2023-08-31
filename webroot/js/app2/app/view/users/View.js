Ext.define('Tscrm.view.users.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.usersView',
    title: 'Felhasználó megtekintése',  
    width:800,
    height:600,
    closable: true,
    closeAction: 'hide',
    maximizable: true,  
    layout: 'fit', 
    requires : [
        'Tscrm.view.users.Controller'   
    ],     
    controller: 'usersController',
    viewModel: {
        type: 'usersModel'
    },           
    layout: 'fit',     
    items:[ 
        {
            xtype: 'tabpanel',
            reference: 'inside',
            items:[
            {
                    xtype:'panel',
                    layout: 'column',         
                    bodyPadding:10,
                    items:[
                        {
                            columnWidth:.5,
                            margin: '0 10 0 0',
                            xtype: 'panel',
                            reference: 'maindata',
                            itemId: 'maindata',
                            html:'Data loading',
                            tpl : [
                            '<table class="datatable">'+
                            '<tr><td>Név</td><td>{lastname} {firstname}</td></tr>'+
                            '<tr><td>Felhasználónév</td><td>{username}</td></tr>'+
                            '<tr><td>Csoport</td><td>{role.name}</td></tr>'+
                            '<tr><td>Email</td><td><a href="mailto:{email}">{email}</a></td></tr>'+
                            '<tr><td>Telefonszám</td><td>{phone}</td></tr>'+
                            '<tr><td>Létrehozva</td><td>{created}</td></tr>'+
                            '<tr><td>Utoljára módosítva</td><td>{created}</td></tr>'+
                            '</table>'
                            ]
                        },{
                            columnWidth:.5 ,
                            title: 'Események',
                            html:'<b>2015-04-07 17:45</b><hr>Esemény neve, Eseményt örténeés leírva kommentezve<br>Létrehozó: Héjjas Magda<br><br><b>2015-04-07 17:45</b><hr>Esemény neve, Eseményt örténeés leírva kommentezve<br>Létrehozó: Héjjas Magda<br><br><b>2015-04-07 17:45</b><hr>Esemény neve, Eseményt örténeés leírva kommentezve<br>Létrehozó: Héjjas Magda<br><br>',
                        }
                    ],
                    title: 'Adatlap',                                    
                    bbar:[
                    {
                            xtype: 'button',
                            text: 'Módosítás',
                            handler: 'onEdit'
                    }]
                }
            ]
        }
    ]
    
    
});