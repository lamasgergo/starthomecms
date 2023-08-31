Ext.define('Tscrm.view.properties.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertiesView',
    controller: 'propertiesController',
  
    viewModel: {
        type: 'propertiesModel'
    },     
    title: 'Ingatlan',
    width: (Global.maxWidth <1000?Global.maxWidth:1000),
    height: (Global.maxHeight <600?Global.maxHeight:600),
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: true,  
    minimizable: true, 
    layout: {
         type: 'border'
    },
    listeners:{
        refreshViewData: 'loadViewData',
        close: 'closeWin'          
    },
    tools: [{
        type: 'restore',
        handler: function (evt, toolEl, owner, tool) {
            var window = owner.up('window');
            window.setWidth(window.width);
            window.expand('', false);
            window.center();
        }
    }],            
    items:[     
        {
            region: 'center',
            itemId: 'panelcenter',
            xtype: 'panel',
            layout: 'fit',
            items:[{
                
            
                xtype: 'tabpanel',
                reference: 'inside',
                defaults: {
                    bodyPadding: 10,
                    autoScroll: true
                },
                items:[
                    {
                        title: 'Adatlap',
                        xtype:'panel',
                        layout: 'column',         
                        bodyPadding:10,
                        items:[
                            {
                                columnWidth:.7,
                                margin: '0 10 0 0',
                                xtype: 'panel',
                                reference: 'maindata',
                                itemId: 'maindata',
                                html:'Data loading',
                                tpl : [
                                    '<div class="propertyview"><h2>(<tpl if="rentvar.id != null">{rentvar.id}</tpl> <tpl if="sellvar.id != null">{sellvar.id}</tpl>) {city.city} <tpl if="!Ext.isEmpty(citypart) && citypart.citypart != \'\'">{citypart.citypart}</tpl> <tpl if="district.district != \'\'">{district.district} kerület,</tpl> {street.street}</h2>',
                                    '<div class="col-6 addressdata"><h4>Cím adatok</h4>',
                                        '<dl><dt>Utca házszám:</dt><dd> {street.street} {streetnum}</dd></dl>',
                                        '<dl><dt>Épület, Emelet ajtó:</dt><dd>{building} {floor} {door}&nbsp;</dd></dl>',
                                        '<dl><dt>Cím rejtett:</dt><dd><tpl if="street_hidden != \'0\'">Nem<tpl else>Igen</tpl></dd></dl>',
                                        '<tpl if="building_park != null"><dl><dt>Lakópark:</dt><dd>{building_park}</dd></dl></tpl>',
                                        '<tpl if="localident != null"><dl><dt>Helyrajzi szám:</dt><dd>{localident}</dd></dl></tpl>',
                                        '<tpl if="address_note != null"><dl><dt>Cím megjegyzés:</dt><dd>{address_note}</dd></dl></tpl>',
                                    '</div>',
                                    '<div class="col-6 importantdata"><h4>Fontosabb adatok</h4>',
                                        '<dl><dt>Típus</dt><dd>{building_type_name}</dd></dl>',
                                        '<dl><dt>Alapterület</dt><dd>{size_net} <tpl if="size_gross != null">({size_gross})</tpl> m<sup>2</sup></dd></dl>',
                                        '<dl><dt>Fűtés</dt><dd>{heat_type_name}</dd></dl>',
                                        '<tpl if="!Ext.isEmpty(sellvar.furniture_type_name)"><dl><dt>Butorozás (eladó):</dt><dd>{sellvar.furniture_type_name}</dd></dl></tpl>',
                                        '<tpl if="!Ext.isEmpty(rentvar.furniture_type_name)"><dl><dt>Butorozás (kiadó):</dt><dd>{rentvar.furniture_type_name}</dd></dl></tpl>',
                                    '</div><div class="clearfix"></div>',
                                    '<div class="contacts"><h4>Kapcsolattartók</h4>',
                                        '<table><tpl for="contacts"> ',
                                        '<tr data-qtip="{note}">',
                                            '<td>{fullname}<br><a href="mailto:{email1}">{email1}</a>',
                                            '<tpl if="email2 != \'\'"><br><a href="mailto:{email2}">{email2}</a></tpl></td>',
                                            '<td>{_joinData.type_name}</td>',
                                            '<td>',
                                                '<b>{phone1_formatted}</b> {phone1note}',
                                                '<tpl if="phone2 != \'\'"><br><b>{phone2_formatted}</b> {phone2note}</tpl>',
                                                '<tpl if="phone3 != \'\'"><br><b>{phone3_formatted}</b> {phone3note}</tpl>',
                                                '<tpl if="phone4 != \'\'"><br><b>{phone4_formatted}</b> {phone4note}</tpl>',
                                            '</td>',
                                        '</tr>',
                                    '</tpl></table></div>',                                     
                                    '<tpl if="!Ext.isEmpty(sellvar.id) && sell == 1"><div><h4>Eladó ({sellvar.id}) - <tpl if="sellvar.price != \'\'">{sellvar.price_formatted}</tpl></h4>{sellvar.description} <br><br>{sellvar.description_en}</div></tpl>',
                                    '<tpl if="!Ext.isEmpty(rentvar.id) && rent == 1"><div><h4>Kiadó ({rentvar.id}) - <tpl if="rentvar.price != \'\'">{rentvar.price_formatted}</tpl></h4>{rentvar.description} <br><br>{rentvar.description_en}</div></tpl>',
                                                                       
                                    '<div class="addressdata col-4"><h4>Elrendezés</h4>',
                                    '<tpl if="properties_layout.livingroom &gt; 0 "><dl><dt>Nappali:</dt><dd>{properties_layout.livingroom}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.room &gt; 0 || properties_layout.halfroom &gt; 0"><dl><dt>Hálószoba:</dt><dd>{properties_layout.room} <tpl if="properties_layout.halfroom &gt; 0"> + {properties_layout.halfroom}</tpl></dd></dl></tpl>',
                                    '<tpl if="properties_layout.kitchen &gt; 0 "><dl><dt>Szeparált konyha:</dt><dd>{properties_layout.kitchen}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.american_kitchen &gt; 0 "><dl><dt>Amerikai konyha:</dt><dd>{properties_layout.american_kitchen}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.eating_kitchen &gt; 0 "><dl><dt>Étkezős konyha:</dt><dd>{properties_layout.eating_kitchen}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.diningroom &gt; 0 "><dl><dt>Étkező:</dt><dd>{properties_layout.diningroom}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.bathroom &gt; 0"><dl><dt>Fürdő:</dt><dd>{properties_layout.bathroom}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.bathroom_toilett &gt; 0"><dl><dt>Fürdő WC vel:</dt><dd>{properties_layout.bathroom_toilett}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.toilett &gt; 0"><dl><dt>WC:</dt><dd>{properties_layout.toilett}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.storage &gt; 0"><dl><dt>Tároló kamra:</dt><dd>{properties_layout.storage}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.hall &gt; 0"><dl><dt>Hall:</dt><dd>{properties_layout.hall}</dd></dl></tpl>',
                                    '<tpl if="properties_layout.note != \'\'"><dl><dt>Megjegyzés:</dt><dd>{properties_layout.note}</dd></dl></tpl>',
                                    '</div>',
                                   
                                    '<div class="col-4 datas1"><h4>Tulajdonságok</h4>',
                                        '<dl><dt>Felső szint:</dt><dd><tpl if="upperlevel != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<dl><dt>Földszintszint:</dt><dd><tpl if="lowerlevel != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<dl><dt>Tetőtéri:</dt><dd><tpl if="atticlevel != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<dl><dt>Újépítésű:</dt><dd><tpl if="newlybuilt != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<dl><dt>Lift:</dt><dd><tpl if="elevator != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<dl><dt>Kertkapcsolat:</dt><dd><tpl if="gardencontact != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<dl><dt>Háziállat hozható:</dt><dd><tpl if="petallowed != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<dl><dt>Terasz, erkély:</dt><dd><tpl if="terrace != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                        '<tpl if="panorama_type_name != \'\'"><dl><dt>Panoráma:</dt><dd>{panorama_type_name}</dd></dl></tpl>',
                                        '<tpl if="energy_rating_type_name != \'\'"><dl><dt>Energetikai besor.:</dt><dd>{energy_rating_type_name}</dd></dl></tpl>',
                                        '<tpl if="aircondition == \'1\'"><dl><dt>Légkondi:</dt><dd>Van</dd></dl></tpl>',
                                    '</div>',
                                    '<div class="col-4 datas2"><h4>Adatok</h4>',
                                    '<tpl if="lotsize != \'\'"><dl><dt>Telekméret:</dt><dd>{lotsize}</dd></dl></tpl>',
                                    '<tpl if="builddate != \'\'"><dl><dt>Építési idő:</dt><dd>{builddate}</dd></dl></tpl>',
                                    '<tpl if="building_levels != \'\'"><dl><dt>Ingatlan szintjei:</dt><dd>{building_levels}</dd></dl></tpl>',
                                    '<tpl if="rating_type_name != \'\'"><dl><dt>Ingatlan minősítése:</dt><dd>{rating_type_name}</dd></dl></tpl>',
                                    '<tpl if="pool_type_name != \'\'"><dl><dt>Medence:</dt><dd>{pool_type_name}</dd></dl></tpl>',
                                    '<tpl if="conveniences_type_name != \'\'"><dl><dt>Komfort:</dt><dd>{conveniences_type_name}</dd></dl></tpl>',
                                    '<tpl if="building_condition_type_name != \'\'"><dl><dt>Állapot:</dt><dd>{building_condition_type_name}</dd></dl></tpl>',
                                    '<tpl if="parking_type_name != \'\'"><dl><dt>Parkolás:</dt><dd>{parking_type_name}</dd></dl></tpl>',
                                    '<tpl if="panorama_type_name != \'\'"><dl><dt>Kilátás:</dt><dd>{panorama_type_name}</dd></dl></tpl>',

                                    '</div><div class="clearfix"></div>',
                                    '<div class="users"><h4>Ki látta?</h4><tpl for="users">',
                                    '{lastname} {firstname}, ',
                                    '</tpl></div>',
                                    '<div class="note"><h4>Megjegyzés</h4>',
                                    '{note}',
                                    '</div>',                                
                                    '<br><br>ID: {id} <br>Létrehozva: {created:date("Y-m-d H:i")}',
                                    '</div>'
                                    ]
                            },{
                                columnWidth:.3,
                                layout: 'fit',
                                xtype: 'panel',
                                tbar:[
                                    {
                                        xtype: 'button',
                                        text: 'Képek letöltése',
                                        handler: 'onDownloadImages',
                                        style: 'width:100%;'
                                    }
                                ],
                                items: [

                                    {
                                        reference: 'images',
                                        itemId: 'images',
                                         layout: 'fit',
                                        tpl:  new Ext.XTemplate(
                                            '<tpl for=".">',
                                            '<div style="width:50%; padding:5px; float:left; position:relative; border:1px solid #ffffff; <tpl if="active == \'0\'">  border:1px solid red;</tpl>" class="thumb-wrap">',
                                                  '<a href="{image_original}" target="_blank" class="popup" rel="gallery{property_id}" data-status="<tpl if="active == \'0\'">inaktiv</tpl>"  title="<tpl if="active == \'0\'">inaktiv</tpl> <a href=\'/admin/propertiesImages/downloadImage/{id}\' target=\'new\' style=\'color:white!important\'>Letöltés</a>"><img  src="{image_tn}" style="width:100%; min-height:95px;" /></a>',
                                            '</div>',
                                            '</tpl><div class="clearfix"></div>'
                                        ),
                                        itemSelector: 'div.thumb-wrap',
                                        emptyText: 'No images available', 
                                        xtype: 'dataview'                          
                                    }
                                ]

                            }
                        ],
                                                            
                        bbar:[
                        '->',
                        {
                                xtype: 'button',
                                text: 'Módosítás',
                                handler: 'onEdit'
                        },
                        {
                                xtype: 'button',
                                text: 'Új esemény',
                                handler: 'onAddEvent',
                                cls:'addbtn'
                        }]
                    },{
                        title: 'Eladó',
                        xtype:'panel',
                        layout: 'column',         
                        bodyPadding:10,
                        reference: 'selltab',
                        itemId: 'selltab', 
                        items:[
                            {
                                columnWidth:.5,
                                margin: '0 10 0 0',
                                xtype: 'panel',
                                reference: 'selldataleft',
                                itemId: 'selldataleft',                             
                                tpl : [
                                    '<div class="propertyview"><h4>Tulajdonságok</h4>',
                                    '<tpl if="nocontract == \'1\'"><span class="red">HIÁNYZÓ SZERZŐDÉS</span></tpl>',
                                    '<tpl if="price != \'\'"><dl><dt>Eladási ár:</dt><dd>{price_formatted}</dd></dl></tpl>',
                                    '<tpl if="common_cost != \'\'"><dl><dt>Közös költség:</dt><dd>{common_cost} {common_cost_dev}</dd></dl></tpl>',
                                    '<tpl if="furniture_type_name != \'\'"><dl><dt>Butorozás:</dt><dd>{furniture_type_name}</dd></dl></tpl>',
                                    '<tpl if="comission != \'\'"><dl><dt>Jutalék:</dt><dd>{comission} %</dd></dl></tpl><div class="clearfix"></div>',
                                    '<h4>Áttöltés paraméterek</h4>',
                                    '<dl><dt>Aktív:</dt><dd><tpl if="active != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '<dl><dt>Ajánlat:</dt><dd><tpl if="offer != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '<dl><dt>Ingatlan.com:</dt><dd><tpl if="ing_com != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '<dl><dt>GDN:</dt><dd><tpl if="gdn != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '</div>',
                                ]    
                            },
                            {
                                columnWidth:.5,
                                margin: '0 10 0 0',
                                xtype: 'panel',
                                reference: 'selldataright',
                                itemId: 'selldataright',                              
                                tpl : [
                                    '<h4>Leírás</h4>',
                                    '{description}',
                                    '<h4>Leírás (EN)</h4>',
                                    '{description_en}'
                                ]                                  
                            }
                        ]
                    },{
                        title: 'Kiadó',
                        xtype:'panel',
                        layout: 'column',         
                        bodyPadding:10,
                        reference: 'renttab',
                        itemId: 'renttab', 
                        items:[
                            {
                                columnWidth:.5,
                                margin: '0 10 0 0',
                                xtype: 'panel',
                                reference: 'rentdataleft',
                                itemId: 'rentdataleft',                             
                                tpl : [
                                    '<div class="propertyview"><h4>Tulajdonságok</h4>',
                                    '<tpl if="nocontract == \'1\'"><span class="red">HIÁNYZÓ SZERZŐDÉS</span></tpl>',
                                    '<tpl if="price != \'\'"><dl><dt>Bérleti díj:</dt><dd>{price_formatted}</dd></dl></tpl>',
                                    '<tpl if="caution_type_name != \'\'"><dl><dt>Kaució:</dt><dd>{caution_type_name}</dd></dl></tpl>',
                                    '<tpl if="common_cost != \'\'"><dl><dt>Közös költség:</dt><dd>{common_cost} {common_cost_dev}</dd></dl></tpl>',
                                    '<tpl if="furniture_type_name != \'\'"><dl><dt>Butorozás:</dt><dd>{furniture_type_name}</dd></dl></tpl>',
                                    '<tpl if="comission != \'\'"><dl><dt>Jutalék:</dt><dd>{comission} %</dd></dl></tpl><div class="clearfix"></div>',
                                    '<h4>Áttöltés paraméterek</h4>',
                                    '<dl><dt>Aktív:</dt><dd><tpl if="active != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '<dl><dt>Ajánlat:</dt><dd><tpl if="offer != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '<dl><dt>Ingatlan.com:</dt><dd><tpl if="ing_com != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '<dl><dt>GDN:</dt><dd><tpl if="gdn != \'0\'">Igen<tpl else>Nem</tpl></dd></dl>',
                                    '</div>',
                                ]    
                            },
                            {
                                columnWidth:.5,
                                margin: '0 10 0 0',
                                xtype: 'panel',
                                reference: 'rentdataright',
                                itemId: 'rentdataright',                              
                                tpl : [
                                    '<h4>Leírás</h4>',
                                    '{description}',
                                    '<h4>Leírás (EN)</h4>',
                                    '{description_en}'
                                ]                                  
                            }
                        ]    
                    },{
                        title: 'Fájlok',
                        xtype:'panel',
                        bodyPadding:10,                  
                        items: [{
                            height:600, 
                            reference: 'files',
                            itemId: 'files',
                            tpl:  new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div style="width:20%; padding:5px; float:left; position:relative;" class="file"><div>',
                                      '<a href="/admin/properties_documents/download/{hash}"  target="_blank" class="file_download"/><span></span>{title}<br>{document_type_name}<br> {created:date("Y-m-d H:i")}<br><br>',
                                      '</a>',
                                '</div></div>',
                                '<tpl if="xindex  % 5 ===0"><div class="clearfix"></div></tpl>',
                                '</tpl>'
                            ),
                            itemSelector: 'div.thumb-wrap',
                            emptyText: 'No images available', 
                            xtype: 'dataview'                          
                        }]                        
                    },{
                        title: 'Kiajánlások',
                        bodyPadding: 0,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },                    
                        items: [
                            {
                                xtype: 'gridpanel',
                                bind: {
                                    store: '{sentContactsList}'
                                },                                               
                                reference: 'sentContactsGrid',
                                autoScroll:true,
                                scroll:true,
                                flex:1,
                                columns: [
                                    {
                                        text: 'Név',
                                        dataIndex: 'Contact.fullname',
                                        sortable: false,
                                        flex: 1
                                    },{
                                        text: 'Email',
                                        dataIndex: 'Contact.email1',
                                        flex: 1,
                                        renderer: function(v){
                                            return '<a href="'+v+'">'+v+'</a>';
                                        }
                                    },{
                                        text: 'Telefon',
                                        dataIndex: 'Contact.phone1',
                                        flex: 1
                                    },{
                                        text: 'Típus',
                                        dataIndex: 'PropertiesVariations.type',
                                        flex: 1,
                                        renderer: function(v){
                                            if(v==1){
                                                return "Bérlő";
                                            }
                                            if(v==2){
                                                return "Vevő";                                                    
                                            }
                                        }
                                    },{
                                        text: 'Létrehozó',
                                        dataIndex: 'Users.fullname',
                                        flex: 1
                                    }, {
                                        text: 'Érdeklődés dátuma',
                                        dataIndex: 'created',
                                        flex: 1,
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d')
                                    }
                                     
                                ],
                                listeners: {
                                    rowdblclick: 'showContact',
                                } 
                            }
                    
                        ],
                        listeners: {
                            activate: 'loadSentContact'
                        },
                        bbar:[
                            {
                                xtype: 'pagingtoolbar',
                                bind: '{sentContactsList}',
                                displayInfo: true
                            },
                            '->',
                            {
                                xtype: 'button',
                                text: 'Kiajánlás hozzáadása',
                                handler: 'onNewContactSend',
                                cls:'addbtn'
                            }
                        ]    
                    },{
                        title: 'Érdeklődők',
                        bodyPadding: 0,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },                    
                        items: [
                            {
                                xtype: 'gridpanel',
                                bind: {
                                    store: '{interestContactsList}'
                                },                                               
                                reference: 'interestContactsGrid',
                                autoScroll:true,
                                scroll:true,
                                flex:1,
                                columns: [
                                    {
                                        text: 'Név',
                                        dataIndex: 'contact.fullname',
                                        sortable: false,
                                        flex: 1
                                    },{
                                        text: 'Email',
                                        dataIndex: 'contact.email1',
                                        flex: 1,
                                        renderer: function(v){
                                            return '<a href="'+v+'">'+v+'</a>';
                                        }
                                    },{
                                        text: 'Telefon',
                                        dataIndex: 'contact.phone1',
                                        flex: 1
                                    },{
                                        text: 'Típus',
                                        dataIndex: 'PropertiesVariations.type',
                                        flex: 1,
                                        renderer: function(v){
                                            if(v==1){
                                                return "Bérlő";
                                            }
                                            if(v==2){
                                                return "Vevő";                                                    
                                            }
                                        }
                                    },{
                                        text: 'Létrehozó',
                                        dataIndex: 'Users.fullname',
                                        flex: 1
                                    }, {
                                        text: 'Érdeklődés dátuma',
                                        dataIndex: 'created',
                                        flex: 1,
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d')
                                    }
                                     
                                ],
                                listeners: {
                                    rowdblclick: 'showContact',
                                } 
                            }
                    
                        ],
                        listeners: {
                            activate: 'loadInterestContact'
                        },
                        bbar:[
                            {
                                xtype: 'pagingtoolbar',
                                bind: '{interestContactsList}',
                                displayInfo: true
                            },
                            '->',
                            {
                                xtype: 'button',
                                text: 'Érdeklődő hozzáadása',
                                handler: 'onNewContactInterest',
                                cls:'addbtn'
                            }
                        ]
                    },{
                        title: 'Keresők',
                        bodyPadding: 0,
                        layout: {
                        type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'gridpanel',
                                bind: {
                                    store: '{searchContactsList}'
                                },
                                reference: 'contactsSearchesGrid',
                                autoScroll:true,
                                scroll:true,
                                flex:1,
                                columns: [
                                    {
                                        text: 'Név',
                                        dataIndex: 'Contact.fullname',
                                        sortable: false,
                                        flex: 1
                                    },{
                                        text: 'Email',
                                        dataIndex: 'Contact.email1',
                                        flex: 1,
                                        renderer: function(v){
                                            return '<a href="'+v+'">'+v+'</a>';
                                        }
                                    },{
                                        text: 'Telefon',
                                        dataIndex: 'Contact.phone1',
                                        flex: 1
                                    },{
                                        text: 'Típus',
                                        dataIndex: 'type_list',
                                        flex: 1
                                    },{
                                        text: 'Létrehozó',
                                        dataIndex: 'Users.fullname',
                                        flex: 1
                                    }, {
                                        text: 'Érdeklődés dátuma',
                                        dataIndex: 'created',
                                        flex: 1,
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d')
                                    }

                                ],
                                listeners: {
                                    rowdblclick: 'showContact'
                                }
                            }

                        ],
                            listeners: {
                            activate: 'loadContactsSearches'
                        }
                    }            
                
                ]
            }]
        },{
            region:'east',
            title: 'Események',
            xtype: 'panel',
            split:true,
            minWidth:300,
            bodyPadding:3,
            cls:'fastview',
            collapsible: true,
            collapsed: true,
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
                 displayInfo: true ,
                 displayMsg: '{0} - {1} / {2}',
                 plugins: new Ext.ux.ts.grid.TinyPager()
            }] 
            
        }
               
        
    ]
    
    
});