Ext.define('Tscrm.view.contacts.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactsView',
    title: 'Kapcsolat',  
    width:1000,
    height:600,
    constrain: true,
    closable: true,
    closeAction: 'destroy',
    maximizable: true, 
    minimizable: true, 
    layout: 'border', 
    requires : [
        'Tscrm.view.contacts.Controller'   
    ],     
    controller: 'contactsController',
    viewModel: {
        type: 'contactsModel'
    },
    listeners:{
        refreshViewData: 'loadViewData',
        close: 'closeWin'          
    },                
    items:[ 
        {
            region: 'center',
            itemId: 'panelcenter',
            xtype: 'panel',
            layout: 'fit',
            items:[    
                {
                    xtype: 'tabpanel',
                    reference:'inside',
                    defaults: {
                        bodyPadding: 10,
                        autoScroll: true,
                        hideMode: 'offsets'
                    },
                    items:[
                        {
                            xtype:'panel',
                            layout: 'column',         
                            bodyPadding:10,
                            items:[
                                {
                                    columnWidth:0.5,
                                    margin: '0 10 0 0',
                                    xtype: 'panel',
                                    reference: 'maindata',
                                    itemId: 'maindata',
                                    html:'Data loading',
                                    tpl : [
                                        '<div class="contactview"><h2>{fullname}</h2>',
                                        '<div class="clearfix"></div><h4>Kapcsolat adatok</h4> ',
                                        '<dl><dt>Telefonszám:</dt><dd> {phone1_formatted}</dd></dl>',
                                        '<tpl if="!Ext.isEmpty(phone2)"><dl><dt>Telefonszám:</dt><dd> {phone2_formatted}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(phone3)"><dl><dt>Telefonszám:</dt><dd> {phone3_formatted}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(phone4)"><dl><dt>Telefonszám:</dt><dd> {phone4_formatted}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(email1)"><dl><dt>Email:</dt><dd> <a href="mailto:{email1}">{email1}</a></dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(email2)"><dl><dt>Email:</dt><dd> <a href="mailto:{email2}">{email2}</a></dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(email3)"><dl><dt>Email:</dt><dd> <a href="mailto:{email3}">{email3}</a></dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(email4)"><dl><dt>Email:</dt><dd> <a href="mailto:{email4}">{email4}</a></dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(debug_phone)"><dl><dt>Eredeti megjegyzés:</dt><dd> {debug_phone}</dd></dl></tpl>',
                                        '<div class="clearfix"></div><h4>Személyes adatok</h4> ',
                                        '<tpl if="!Ext.isEmpty(title)"><dl><dt>Titulus:</dt><dd> {title}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(job)"><dl><dt>Foglalkozás:</dt><dd> {job}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(kids)"><dl><dt>Gyermekek száma:</dt><dd> {kids}</dd></dl></tpl>',
                                        '<tpl if="marial_status_name != \'\'"><dl><dt>Családi állapot:</dt><dd> {marial_status_name}</dd></dl></tpl>',
                                        '<tpl if="nationality_name != \'\'"><dl><dt>Nemzetiség:</dt><dd> {nationality_name}</dd></dl></tpl>',
                                        '<dl><dt>Háziállat:</dt><dd><tpl if="pet != \'0\'">Van<tpl else>Nincs</tpl></dd></dl>',
                                        '<div class="clearfix"></div><h4>Belső adatok</h4> ',
                                        '<tpl if="note != \'\'"><dl><dt>Megjegyzés:</dt><dd> {note}</dd></dl></tpl>',
                                        '<dl><dt>Belső kapcsolattartó:</dt><dd><tpl for="users">',
                                        '{lastname} {firstname}, ',
                                        '</tpl></dd></dl>', 
                                        '<tpl if="!Ext.isEmpty(internal_company)"><dl><dt>Relokációs cég:</dt><dd> {internal_company}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(internal_company_contact)"><dl><dt>Relokációs ügynök:</dt><dd> {internal_company_contact.fullname}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(variations)">',
                                        '<div class="clearfix"></div><h4>Kapcsolat variációk</h4> ',
                                        '<tpl foreach="variations"><div class="variation">{lastname} {firstname}<br>',
                                        '<tpl if="!Ext.isEmpty(phone1)">{phone1}</tpl>' +
                                        '<tpl if="!Ext.isEmpty(phone2)">, {phone2}</tpl>' +
                                        '<tpl if="!Ext.isEmpty(phone3)">, {phone3}</tpl>' +
                                        '<tpl if="!Ext.isEmpty(phone4)">, {phone4}</tpl>' +
                                        '<br>',
                                        '<tpl if="!Ext.isEmpty(debug_phone)">, {debug_phone}</tpl>' +
                                        '</div>',
                                        '</tpl></tpl>',
                                        '<br><br>ID: {id} <br>Létrehozva: {created:date("Y-m-d H:i")}',
                                        '</div>'
                                    ]
                                },{
                                    columnWidth:0.5 ,
                                    itemId: 'maindata_right',
                                    tpl:[
                                        '<div class="contactview"><h2>&nbsp;</h2>',
                                        '<div class="clearfix"></div><h4>Számlázási adatok</h4> ',
                                        '<tpl if="!Ext.isEmpty(billing_name)"><dl><dt>Cég:</dt><dd> {billing_name}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(billing_taxnumber)"><dl><dt>Adószám:</dt><dd> {billing_taxnumber}</dd></dl></tpl>',
                                        '<dl><dt>Cím:</dt><dd><tpl if="!Ext.isEmpty(billing_zip)"> {billing_zip}</tpl> <tpl if="!Ext.isEmpty(billing_city)">, {billing_city}</tpl> <tpl if="!Ext.isEmpty(billing_street)">, {billing_street}</tpl></dd></dl>',
                                        '<div class="clearfix"></div><h4>Postázási adatok</h4> ',
                                        '<tpl if="!Ext.isEmpty(postal_name)"><dl><dt>Címzett:</dt><dd> {postal_name}</dd></dl></tpl>',
                                        '<dl><dt>Cím:</dt><dd><tpl if="!Ext.isEmpty(postal_zip)"> {postal_zip}</tpl> <tpl if="!Ext.isEmpty(postal_city)">, {postal_city}</tpl> <tpl if="!Ext.isEmpty(postal_street)">, {postal_street}</tpl></dd></dl>',                                    
                                        '<div class="clearfix"></div>' ,
                                        '<tpl if="!Ext.isEmpty(contacts_searches)"><h4>Keresési igények</h4><tpl for="contacts_searches">',
                                        '<div>{note}<div class="clearfix"></div>Létrehozva: {created}<hr></div>',
                                        '</tpl></tpl></div>'
                                    ]
                                }
                            ],
                            title: 'Adatlap',                                    
                            bbar:[
                                '->',
                                {
                                        xtype: 'button',
                                        text: 'Módosítás',
                                        handler: 'onEdit'
                                },
                                {
                                        xtype: 'button',
                                        text: 'Esemény rögzítése',
                                        handler: 'onNewEvent'
                                }
                            ]
                        },{
                            title: 'Kiajánlott lakások',
                            bodyPadding: 0,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },                    
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    bind: {
                                        store: '{sentPropertiesList}'
                                    },                                               
                                    reference: 'contactSentPropertiesGrid',
                                    autoScroll:true,
                                    scroll:true,
                                    selType: 'checkboxmodel',
                                    flex:1,
                                    columns: [
                                       {
                                            text: '#',
                                            dataIndex: 'PropertiesVariations.id',
                                            width: 80 ,
                                            renderer: function(value,row,data){                                              
                                                return value+(data.get('nocontract')==1?'<br><span class="rowWarningIcon" data-qtip="Nincs szerződés!"></span>':'');
                                            }
                                        },{
                                            text: 'Kép',
                                            dataIndex: 'mainimage',
                                            width: 80 ,
                                            renderer: function(value){
                                                return '<img src="'+value+'" />';
                                            }
                                        }, {
                                            text: 'Utca',
                                            dataIndex: 'Streets.street',
                                            flex: 5,
                                            renderer: function(value,row,data){

                                                addr='';
                                                row.tdAttr = 'data-qtip="'+data.get('properties_variation').description+'"';
                                                
                                                retval = ''+value+'<br>Tul.: '+data.get('Owner').lastname+' '+data.get('Owner').firstname+' ('+data.get('owner_phone')+')'; 
                                                if(data.get('Contact').phone1){
                                                    retval += '<br>Kapcs.: '+data.get('Contact').lastname+' '+data.get('Contact').firstname+' ('+data.get('contact_phone')+')' ;
                                                }
                                                  
                                                retval += '<br><br>';

                                                if(data.get('properties_variation').ing_com == 1){
                                                    retval += '<span class="list-tag list-tag-com">ingatlan.com</span> ';
                                                }    
                                                if(data.get('properties_variation').gdn == 1){
                                                    retval += '<span class="list-tag list-tag-gdn">GDN</span> ';
                                                }
                                                
                                                if(data.get('properties_variation').enddate){
                                                    retval += '<span class="list-tag">'+data.get('properties_variation').enddate+'</span>' ;
                                                }
                                                return retval;
                                            }
                                        }, {
                                            text: 'Ár',
                                            dataIndex: 'PropertiesVariations.price_formatted',
                                            flex: 2,
                                            align :'right',
                                            renderer: function(value,row,data){
                                                ret = '';
                                                if(data.get('properties_variation').price_dev=='EUR'){
                                                    ret = data.get('properties_variation').price_eur_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_huf_formatted+'</small>' ;
                                                }else{
                                                    ret = data.get('properties_variation').price_huf_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_eur_formatted+'</small>';
                                                }
                                                return ret;

                                            }

                                        }, {
                                            text: 'Méret',
                                            dataIndex: 'size_net',
                                            flex: 1,
                                            align: 'right',
                                            renderer: function(value,row,data){
                                                return (data.get('size_net')>0?data.get('size_net')+'m<sup>2</sup>':'')+'<br>'+(data.get('size_gross')>0?data.get('size_gross')+'m<sup>2</sup>':'');
                                            } 
                                            
                                        },{
                                            text: 'Szoba',
                                            flex: .5,
                                            dataIndex: 'rooms'
                                        }, {
                                            text: 'Kiajánló',
                                            dataIndex: 'firstname',
                                            flex: 1,
                                            renderer: function(value,row,data){

                                                return data.get('user').lastname+' '+data.get('user').firstname;
                                            } 
                                            
                                        }, {
                                            text: 'Létrehozva',
                                            dataIndex: 'created',
                                            flex: 1,
                                            renderer: Ext.util.Format.dateRenderer('Y-m-d')                                     
                                        },{
                                            xtype:'actioncolumn',
                                            width:65,
                                            items: [
                                                {
                                                    iconCls: 'action showed',
                                                    tooltip: 'Érdeklődik',
                                                    getClass: function(v, metadata, row) {
                                                        if(!Ext.isEmpty(row.data.interest_properties_contact.id)){
                                                            return 'action star disabled';
                                                        }else{
                                                            return 'action star';
                                                        }

                                                    },
                                                    handler: 'addInterestProperties'
                                                },{
                                                iconCls: 'action showed',
                                                tooltip: 'Mutatott lakás',
                                                getClass: function(v, metadata, row) {
                                                    if(!Ext.isEmpty(row.data.showed_properties_contact.id)){
                                                        return 'action showed disabled';
                                                    }else{
                                                        return 'action showed';
                                                    }

                                                },
                                                handler: 'addShowedProperties'
                                            }]
                                        }
                                    ],
                                    viewConfig: {
                                        getRowClass: function(record, rowIndex, rowParams, store){
                                            return record.get('company') ? "orange-row" : "";
                                        },                          
                                        loadMask: true,
                                        loadingHeight: 500
                                    },
                                    listeners: {
                                        rowdblclick: 'showProperties',

                                    } 
                                }
                        
                            ],
                            listeners: {
                                activate: 'loadSentProperties'
                            },
                            bbar:[{
                                    xtype: 'pagingtoolbar',
                                    bind: '{sentPropertiesList}',
                                    displayInfo: true
                                },
                                '->',
                                {
                                        xtype: 'button',
                                        text: 'Keresőbe',
                                        handler: 'onSearchBySent'
                                }
                            ]    
                        },{
                            title: 'Érdeklődések',
                            bodyPadding: 0,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },                    
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    //store: 'Properties',
                                    bind: {
                                        store: '{interestPropertiesList}'
                                    },                                               
                                    reference: 'contactInterestPropertiesGrid',
                                    autoScroll:true,
                                    loadMask: true,
                                    scroll:true,
                                    flex:1,
                                    columns: [
                                        {
                                            text: '#',
                                            dataIndex: 'PropertiesVariations.id',
                                            width: 80 ,
                                            renderer: function(value,row,data){                                              
                                                return value+(data.get('nocontract')==1?'<br><span class="rowWarningIcon" data-qtip="Nincs szerződés!"></span>':'');
                                            }
                                        },{
                                            text: 'Kép',
                                            dataIndex: 'mainimage',
                                            width: 80 ,
                                            renderer: function(value){
                                                return '<img src="'+value+'" />';
                                            }
                                        }, {
                                            text: 'Utca',
                                            dataIndex: 'Streets.street',
                                            flex: 5,
                                            renderer: function(value,row,data){
                                                addr='';
                                                row.tdAttr = 'data-qtip="'+data.get('properties_variation').description+'"';
                                                
                                                retval = ''+value+'<br>Tul.: '+data.get('Owner').lastname+' '+data.get('Owner').firstname+' ('+data.get('owner_phone')+')'; 
                                                if(data.get('Contact').phone1){
                                                    retval += '<br>Kapcs.: '+data.get('Contact').lastname+' '+data.get('Contact').firstname+' ('+data.get('contact_phone')+')' ;
                                                }
                                                  
                                                retval += '<br><br>';

                                                if(data.get('properties_variation').ing_com == 1){
                                                    retval += '<span class="list-tag list-tag-com">ingatlan.com</span> ';
                                                }    
                                                if(data.get('properties_variation').gdn == 1){
                                                    retval += '<span class="list-tag list-tag-gdn">GDN</span> ';
                                                }
                                                
                                                if(data.get('properties_variation').enddate){
                                                    retval += '<span class="list-tag">'+data.get('properties_variation').enddate+'</span>' ;
                                                }                                   
                                                return retval;
                                            }
                                        }, {
                                            text: 'Ár',
                                            dataIndex: 'PropertiesVariations.price_formatted',
                                            flex: 2,
                                            align :'right',
                                            renderer: function(value,row,data){
                                                ret = '';
                                                if(data.get('properties_variation').price_dev=='EUR'){
                                                    ret = data.get('properties_variation').price_eur_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_huf_formatted+'</small>' ;
                                                }else{
                                                    ret = data.get('properties_variation').price_huf_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_eur_formatted+'</small>';
                                                }
                                                return ret;

                                            }

                                        }, {
                                            text: 'Méret',
                                            dataIndex: 'size_net',
                                            flex: 1,
                                            align: 'right',
                                            renderer: function(value,row,data){
                                                return (data.get('size_net')>0?data.get('size_net')+'m<sup>2</sup>':'')+'<br>'+(data.get('size_gross')>0?data.get('size_gross')+'m<sup>2</sup>':'');
                                            } 
                                            
                                        },{
                                            text: 'Szoba',
                                            flex: .5,
                                            dataIndex: 'rooms'
                                        }, {
                                            text: 'Létrehozó',
                                            dataIndex: 'firstname',
                                            flex: 1,
                                            renderer: function(value,row,data){

                                                return data.get('user').lastname+' '+data.get('user').firstname;
                                            } 
                                            
                                        }, {
                                            text: 'Létrehozva',
                                            dataIndex: 'created',
                                            flex: 1,
                                            renderer: Ext.util.Format.dateRenderer('Y-m-d')                                    
                                        },{
                                            xtype:'actioncolumn',
                                            width:30,
                                            items: [{
                                                iconCls: 'action showed',
                                                tooltip: 'Mutatott lakás',
                                                getClass: function(v, metadata, row) {
                                                    if(!Ext.isEmpty(row.data.showed_properties_contact.id)){
                                                        return 'action showed disabled';
                                                    }else{
                                                        return 'action showed';
                                                    }

                                                },
                                                handler: 'addShowedProperties'
                                            }]
                                        }
                                    ],
                                    listeners: {
                                        rowdblclick: 'showProperties',

                                    } 
                                }
                        
                            ],
                            listeners: {
                                activate: 'loadInterestProperties'
                            },                   
                            bbar:[{
                                    xtype: 'pagingtoolbar',
                                    bind: '{interestPropertiesList}',
                                    displayInfo: true
                                },
                                '->',
                                {
                                        xtype: 'button',
                                        text: 'Új érdeklődés',
                                        handler: 'onNewPropertyInterest',
                                        cls:'addbtn'
                                }
                            ]    
                        },{
                            title: 'Mutatott ingatlanok',
                            bodyPadding: 0,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },                    
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    //store: 'Properties',
                                    bind: {
                                        store: '{showedPropertiesList}'
                                    },                                               
                                    reference: 'contactShowedPropertiesGrid',
                                    autoScroll:true,
                                    scroll:true,
                                    selType: 'checkboxmodel',
                                    flex:1,
                                    columns: [
                                        {
                                            text: '#',
                                            dataIndex: 'PropertiesVariations.id',
                                            width: 80 ,
                                            renderer: function(value,row,data){
                                                return value+(data.get('nocontract')==1?'<br><span class="rowWarningIcon" data-qtip="Nincs szerződés!"></span>':'');
                                            }
                                        }, {
                                            text: 'Kép',
                                            dataIndex: 'mainimage',
                                            width: 80 ,
                                            renderer: function(value){
                                                return '<img src="'+value+'" />';
                                            }
                                        }, {
                                            text: 'Utca',
                                            dataIndex: 'Streets.street',
                                            flex: 5,
                                            renderer: function(value,row,data){
                                                addr='';
                                                row.tdAttr = 'data-qtip="'+data.get('properties_variation').description+'"';
                                                retval = ''+value+'<br>Tul.: '+data.get('Owner').lastname+' '+data.get('Owner').firstname+' ('+data.get('owner_phone')+')'; 
                                                if(data.get('Contact').phone1){
                                                    retval += '<br>Kapcs.: '+data.get('Contact').lastname+' '+data.get('Contact').firstname+' ('+data.get('contact_phone')+')' ;
                                                }
                                                  
                                                retval += '<br><br>';

                                                if(data.get('properties_variation').ing_com == 1){
                                                    retval += '<span class="list-tag list-tag-com">ingatlan.com</span> ';
                                                }    
                                                if(data.get('properties_variation').gdn == 1){
                                                    retval += '<span class="list-tag list-tag-gdn">GDN</span> ';
                                                }
                                                
                                                if(data.get('properties_variation').enddate){
                                                    retval += '<span class="list-tag">'+data.get('properties_variation').enddate+'</span>' ;
                                                }                                   
                                                return retval;
                                            }
                                        }, {
                                            text: 'Ár',
                                            dataIndex: 'PropertiesVariations.price_formatted',
                                            flex: 2,
                                            align :'right',
                                            renderer: function(value,row,data){
                                                ret = '';
                                                if(data.get('properties_variation').price_dev=='EUR'){
                                                    ret = data.get('properties_variation').price_eur_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_huf_formatted+'</small>' ;
                                                }else{
                                                    ret = data.get('properties_variation').price_huf_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_eur_formatted+'</small>';
                                                }
                                                return ret;

                                            }

                                        }, {
                                            text: 'Méret',
                                            dataIndex: 'size_net',
                                            flex: 1,
                                            align: 'right',
                                            renderer: function(value,row,data){
                                                return (data.get('size_net')>0?data.get('size_net')+'m<sup>2</sup>':'')+'<br>'+(data.get('size_gross')>0?data.get('size_gross')+'m<sup>2</sup>':'');
                                            } 
                                            
                                        },{
                                            text: 'Szoba',
                                            flex: .5,
                                            dataIndex: 'rooms'
                                        }, {
                                            text: 'Létrehozva',
                                            dataIndex: 'created',
                                            flex: 1,
                                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                                            
                                        }
                                    ],
                                    viewConfig: {
                                        getRowClass: function(record, rowIndex, rowParams, store){
                                            return record.get('company') ? "orange-row" : "";
                                        }
                                    },
                                    listeners: {
                                        rowdblclick: 'showProperties',

                                    } 
                                }
                        
                            ],
                            listeners: {
                                activate: 'loadShowedProperties'
                            },
                            bbar:[
                                {
                                    xtype: 'pagingtoolbar',
                                    bind: '{showedPropertiesList}',
                                    displayInfo: true
                                }
                            ]   
                        },{
                            title: 'Saját ingatlanok',
                            bodyPadding: 0,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },                  
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    bind: {
                                        store: '{ownPropertiesList}'
                                    },                                               
                                    reference: 'contactOwnPropertiesGrid',
                                    autoScroll:true,
                                    scroll:true,
                                    flex:1,
                                    columns: [
                                        {
                                            text: '#',
                                            dataIndex: 'PropertiesVariations.id',
                                            width: 80 ,
                                            renderer: function(value,row,data){
                                                return value+(data.get('nocontract')==1?'<br><span class="rowWarningIcon" data-qtip="Nincs szerződés!"></span>':'');
                                            }
                                        }, {
                                            text: 'Kép',
                                            dataIndex: 'mainimage',
                                            width: 80 ,
                                            renderer: function(value,row,data){
                                                op='';
                                                if(data.get('active')=='0'){
                                                    op='style="opacity:0.5"';
                                                }
                                                return '<img src="'+value+'" '+op+'/>';
                                            }
                                        }, {
                                            text: 'Utca',
                                            dataIndex: 'Streets.street',
                                            flex: 5,
                                            renderer: function(value,row,data){
                                                addr='';
                                                row.tdAttr = 'data-qtip="'+data.get('properties_variation').description+'"';
                                                retval = ''+value+'<br>Tul.: '+data.get('Owner').lastname+' '+data.get('Owner').firstname+' ('+data.get('owner_phone')+')'; 
                                                if(data.get('Contact').phone1){
                                                    retval += '<br>Kapcs.: '+data.get('Contact').lastname+' '+data.get('Contact').firstname+' ('+data.get('contact_phone')+')' ;
                                                }
                                                  
                                                retval += '<br><br>';

                                                if(data.get('properties_variation').ing_com == 1){
                                                    retval += '<span class="list-tag list-tag-com">ingatlan.com</span> ';
                                                }    
                                                if(data.get('properties_variation').gdn == 1){
                                                    retval += '<span class="list-tag list-tag-gdn">GDN</span> ';
                                                }
                                                
                                                if(data.get('properties_variation').enddate){
                                                    retval += '<span class="list-tag">'+data.get('properties_variation').enddate+'</span>' ;
                                                }                                   
                                                return retval;
                                            }
                                        },{
                                            text: 'Típus',
                                            dataIndex: 'building_type_name',
                                            hidden: true
                                        }, {
                                            text: 'Ár',
                                            dataIndex: 'PropertiesVariations.price_formatted',
                                            flex: 2,
                                            align :'right',
                                            renderer: function(value,row,data){
                                                ret = '';
                                                if(data.get('properties_variation').price_dev=='EUR'){
                                                    ret = data.get('properties_variation').price_eur_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_huf_formatted+'</small>' ;
                                                }else{
                                                    ret = data.get('properties_variation').price_huf_formatted;   
                                                    ret += '<br><small>'+data.get('properties_variation').price_eur_formatted+'</small>';
                                                }
                                                return ret;

                                            }

                                        }, {
                                            text: 'Méret',
                                            dataIndex: 'size',
                                            flex: 1,
                                            align: 'right',
                                            renderer: function(value,row,data){
                                                return (data.get('size_net')>0?data.get('size_net')+'m<sup>2</sup>':'')+'<br>'+(data.get('size_gross')>0?data.get('size_gross')+'m<sup>2</sup>':'');
                                            } 
                                            
                                        },{
                                            text: 'Szoba',
                                            flex: 1,
                                            dataIndex: 'PropertiesLayouts.room'
                                        },{
                                            text: 'Bútorozás',
                                            dataIndex: 'furniture_type_name',
                                            flex: 1,
                                            hidden: true
                                        },{
                                            text: 'Garázs',
                                            dataIndex: 'parking_type_name',
                                            flex: 1,
                                            hidden: true
                                        }, {
                                            text: 'Létrehozva',
                                            dataIndex: 'created',
                                            flex: 1,
                                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                                            
                                        }, {
                                            xtype:'actioncolumn',
                                            width:50,
                                            items: [{
                                                iconCls: 'action edit',
                                                tooltip: 'Módosítás',
                                                handler: 'onPropertyEdit'
                                            }]
                                        }
                                    ],
                                    viewConfig: {
                                        getRowClass: function(record, rowIndex, rowParams, store){
                                            return record.get('company') ? "orange-row" : "";
                                        }
                                    },
                                    listeners: {
                                        rowdblclick: 'showPropertiesById',

                                    } 
                                }
                        
                            ],
                            listeners: {
                                activate: 'loadOwnProperties'
                            },                    
                            bbar:[
                                {
                                    xtype: 'pagingtoolbar',
                                    bind: '{ownPropertiesList}',
                                    displayInfo: true
                                }
                            ],    
                        },{
                            title: 'Keresési igények',
                            bodyPadding: 0,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    bind: {
                                        store: '{searchesList}'
                                    },                                               
                                    reference: 'contactSearchesGrid',
                                    autoScroll:true,
                                    loadMask: true,
                                    scroll:true,
                                    flex:1,
                                    columns: [
                                        {
                                            text: 'Típus',
                                            dataIndex: 'type_list',
                                            flex: 1
                                        },{
                                            text: 'Település',
                                            dataIndex: 'city',
                                            flex: 1
                                        },{
                                            text: 'Kerület',
                                            dataIndex: 'district',
                                            flex: 1
                                        }, {
                                            text: 'Ár',
                                            dataIndex: 'price_from',
                                            flex: 1 ,
                                            renderer: function(value,row,data){
                                                f='';
                                                if(data.get('price_from')>0){
                                                    f=f+data.get('price_from');
                                                }else{
                                                    if(data.get('price_to')>0)
                                                    {                                            
                                                        f='-';
                                                    }
                                                }
                                                if(data.get('price_to')>0){
                                                    f=f+'-'+data.get('price_to');
                                                }else{
                                                    if(data.get('price_from')>0)
                                                    {                                              
                                                        f=f+'+';
                                                    }
                                                }
                                                
                                                return f;
                                            } 
                                        },{
                                            text: 'Hálók száma',
                                            dataIndex: 'bedroom_from',
                                            flex: 1 ,
                                            renderer: function(value,row,data){
                                                f='';
                                                if(data.get('bedroom_from')>0){
                                                    f=f+data.get('bedroom_from');
                                                }else{
                                                    if(data.get('bedroom_to')>0)
                                                    {
                                                        f='-';
                                                    }
                                                }
                                                if(data.get('bedroom_to')>0){
                                                    f=f+'-'+data.get('bedroom_to');
                                                }else{
                                                    if(data.get('bedroom_from')>0)
                                                    {                                            
                                                        f=f+'+';
                                                    }
                                                }
                                                
                                                return f;
                                            } 
                                        },{
                                            text: 'Rögzítette',
                                            dataIndex: 'creator',
                                            flex: 1
                                        },{
                                            text: 'Létrehozva',
                                            dataIndex: 'created',
                                            flex: 1 ,
                                            renderer: Ext.util.Format.dateRenderer('Y-m-d') 
                                        },{
                                            xtype:'actioncolumn',
                                            width:90,
                                            items: [{
                                                iconCls: 'action view',
                                                tooltip: 'Igénynek megfelelő lakások',
                                                handler: 'onSearchByRequest'
                                            },{
                                                iconCls: 'action edit',
                                                tooltip: 'Igény módosítása',
                                                handler: 'onEditSearch'
                                            },{
                                                iconCls: 'action delete',
                                                tooltip: 'Igénynek törlése',
                                                handler: 'onDeleteSearch'
                                            }]
                                        }
                                    ] 
                                }
                        
                            ],
                            listeners: {
                                activate: 'loadSearches'
                            },                    
                            bbar:[{
                                    xtype: 'pagingtoolbar',
                                    bind: '{searchesList}',
                                    displayInfo: true
                                },
                                '->',
                                {
                                        xtype: 'button',
                                        text: 'Új igény',
                                        handler: 'onNewContactSearch',
                                        cls:'addbtn'
                                }
                            ]     
                        }
                    ]
                }
            ]
          },{
            region:'east',
            title: 'Események',
            xtype: 'panel',
            split:true,
            minWidth:200,
            bodyPadding:3,
            cls:'fastview',
            autoScroll: true,
            layout:'fit',
            items:[
                {
                    xtype: 'dataview',
                    //loadMask: false,
                    autoHeight:true,
                    bind: {
                        store: '{events}'
                    },
                    cls:'eventsfastview',
                    autoScroll: true,
                    tpl :new Ext.XTemplate(
                            '<tpl for=".">',
                                '<div class="oneevent">',
                                '{event_action}<br>',
                                '<tpl if="!Ext.isEmpty(event_type)">{event_type}<br></tpl>'+
                                '{note}<br>',
                                '<creator><tpl if="!Ext.isEmpty(user.fullname)">{user.fullname}</tpl></creator><br>',
                                '<date>{created:date("Y-m-d H:i")}</date>',
                                '</div>',
                            '</tpl>'
                        ) ,
                    listeners: {
                        itemmousedown: 'showEvent'
                    },                                
                    itemSelector: 'div.oneevent',
                    emptyText: 'Nincs megjeleníthető esemény',            
                }            
            ],
            bbar: [{
                 xtype: 'pagingtoolbar',
                 bind: '{events}',
                 dock: 'bottom',
                 beforePageText :'',
                 afterPageText :'',
                 displayInfo: false ,
                 displayMsg: '{0} - {1} / {2}',
                 plugins: new Ext.ux.ts.grid.TinyPager()
            }] 
            
        }     
        
    ]
    
    
});