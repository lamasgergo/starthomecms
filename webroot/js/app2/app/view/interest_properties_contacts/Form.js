Ext.define('Tscrm.view.interest_properties_contacts.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.interestPropertiesContactsFormWindow',
    requires : [
        'Tscrm.view.interest_properties_contacts.Controller',
        'Tscrm.view.interest_properties_contacts.Model'
    ],  
    viewModel: {
        type: 'interestPropertiesContactsModel'
    },          
    controller: 'interestPropertiesContactsController' ,    
    title: 'Érdeklődés rögzítése',
    width: 1000,
    height: 600,
    closable: true,
    closeAction: 'destroy',
    constrain: true,
    maximizable: false,
    resizable:false,   
    layout: 'fit',   
    items:[ 
        {
            xtype: 'form',
            url: '/admin/interest_properties_contacts/add.json',
            reference: 'interestPropertiesContactsForm',
            border: false,  
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    flex: 2,            
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Kapcsolattartó adatai',
                            margin: '10 10 10 10',
                            defaults: {
                                anchor: '100%'
                            },
                            defaultType: 'textfield',
                            items:[                    
                                {      
                                    xtype:'combobox',
                                    fieldLabel: 'Ügyfél',
                                    name: 'contact[id]',
                                    listeners: {
                                        select: 'savedContact'
                                    },
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{contactsSelect}'
                                    }, 
                                    typeAhead: true,
                                    displayField: 'fullname',
                                    valueField: 'id',
                                    tpl:'<tpl for="."><div class="x-boundlist-item x-combo-list-item fast-search-property" ><b>{fullname}</b><br>{phone1}<div class="clearfix"></div></div></tpl>'  
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Név',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    items: [{
                                        name: 'contact[prename]',
                                        xtype: 'combobox',
                                        flex: 1,
                                        queryMode: 'remote',
                                        store:prenames,
                                        typeAhead: true,
                                        displayField: 'name',
                                        valueField: 'val'

                                    }, {
                                        emptyText: 'Vezetéknév',
                                        name: 'contact[lastname]',
                                        flex: 2,
                                        margin: '0 0 0 6'
                                    }, {
                                        emptyText: 'Keresztnév',
                                        name: 'contact[firstname]',
                                        flex: 2,
                                        margin: '0 0 0 6'
                                    }]
                                
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 1',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },                                        
                                    items: [{

                                        allowBlank: false,
                                        fieldLabel: 'Típus',
                                        name: 'contact[phone1type]',
                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,                                            
                                        xtype: 'combobox',
                                        listeners:{
                                            select: 'changeTpl',
                                            change: 'changeTpl'
                                        }
                                    }, {
                                        name: 'contact[phone1]',
                                        fieldLabel: 'Telefonszám',
                                        allowBlank: true, 
                                        xtype  : 'ux-phonefield',  
                                        tplValue     : '(__) __ / ___-____',  
                                        leftValue    : '36',
                                        leftReadOnly : true,  
                                        flex: 2,
                                        margin: '0 0 0 6',
                                    }
                                    ]
                                },{
                                    fieldLabel: 'Telszám megjegyz.',
                                    name: 'contact[phone1note]' 
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Telefonszám 2',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        hideLabel: 'true'
                                    },                                        
                                    items: [{

                                        allowBlank: false,
                                        fieldLabel: 'Típus',
                                        name: 'contact[phone2type]',
                                        queryMode: 'local',
                                        store: phonetypes,
                                        editable: false,
                                        displayField: 'name',
                                        valueField: 'val',
                                        value: 1,
                                        flex: 1,                                            
                                        xtype: 'combobox',
                                        listeners:{
                                            select: 'changeTpl',
                                            change: 'changeTpl'
                                        }
                                    }, {
                                        name: 'contact[phone2]',
                                        fieldLabel: 'Telefonszám',
                                        allowBlank: true,  
                                        xtype  : 'ux-phonefield',  
                                        tplValue     : '(__) __ / ___-____',  
                                        leftValue    : '36',
                                        leftReadOnly : true,                                                                                    
                                        flex: 2,
                                        margin: '0 0 0 6'
                                    }
                                    ]
                                },{
                                    fieldLabel: 'Telszám megjegyz.',
                                    name: 'contact[phone1note]' 
                                },{
                                    fieldLabel: 'Email',
                                    name: 'contact[email1]',
                                    inputType: 'email'    
                                },{
                                    fieldLabel: 'Foglalkozás',
                                    name: 'contact[job]'    
                                },{
                                    fieldLabel: 'Gyerekek száma',
                                    name: 'contact[kids]',
                                    xtype: 'numberfield'    
                                }, {
                                    fieldLabel: 'Belső megjegyz.',
                                    name: 'contact[note]',
                                    xtype: 'textarea'
                                }
                            ]
                        }
                    ]
                },{
                    flex: 3, 
                    autoScroll:true,
                    items:[
                    {
                            xtype: 'fieldset',
                            title: 'Ingatlan kereső',
                            margin: '10 10 10 10',
                            defaults: {
                                anchor: '100%'
                            },
                            defaultType: 'textfield',
                            items:[                    
                                {      
                                    xtype:'combobox',
                                    fieldLabel: 'Ingatlan',
                                    name: 'selected_property',
                                    reference: 'selected_property',
                                    listeners: {
                                        select: 'searchProperty'
                                    },
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{propertiesSelect}'
                                    },
                                    typeAhead: true,
                                    displayField: 'address',
                                    valueField: 'id',
                                    tpl:'<tpl for="."><div class="x-boundlist-item x-combo-list-item fast-search-property" ><tpl if="mainimage !=\'\'"><img src="{mainimage}"></tpl><b>{address}</b><br>{Owner.lastname} {Owner.firstname} ({Owner.phone1})<div class="clearfix"></div></div></tpl>' 
                                },{
                                    xtype:'combobox',
                                    fieldLabel: 'Eladó/Kiadó',
                                    name: 'properties_variation_id',
                                    reference: 'properties_variation_id',
                                    queryMode: 'local',
                                    displayField: 'value',
                                    valueField: 'id',                                    
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['id','value']
                                    })
                                }  
                          ] 
                    },{
                        xtype: 'panel',
                        margin: '10 10 10 10',
                        reference: 'maindata',
                        itemId: 'maindata',
                        title: 'Ingatlan adatai',
                        html:'Válasszon ingatlant!',
                        tpl : [
                            '<div class="propertyview"><h2>{city.city} <tpl if="!Ext.isEmpty(citypart) && citypart.citypart != \'\'">{citypart.citypart}</tpl> <tpl if="district.district != \'\'">{district.district} kerület,</tpl> {street.street}</h2>',
                            '<div class="col-6 addressdata"><h4>Cím adatok</h4>',
                                '<dl><dt>Utca házszám:</dt><dd> {street.street} {streetnum}</dd></dl>',
                                '<dl><dt>Épület, Emelet ajtó:</dt><dd>{building} {floor} {door}&nbsp;</dd></dl>',
                                '<dl><dt>Cím rejtett:</dt><dd><tpl if="street_hidden != \'0\'">Nem<tpl else>Igen</tpl></dd></dl>',
                                '<tpl if="building_park != \'\'"><dl><dt>Lakópark:</dt><dd>{building_park}</dd></dl></tpl>',
                                '<tpl if="localident != \'\'"><dl><dt>Helyrajzi szám:</dt><dd>{localident}</dd></dl></tpl>',
                                '<tpl if="address_note != \'\'"><dl><dt>Cím megjegyzés:</dt><dd>{address_note}</dd></dl></tpl>',                                    
                            '</div>',
                            '<div class="col-6 importantdata"><h4>Fontosabb adatok</h4>',
                                '<dl><dt>Típus</dt><dd>{building_type_name}</dd></dl>',
                                '<dl><dt>Alapterület</dt><dd>{size_net} ({size_gross}) m<sup>2</sup></dd></dl>',
                                '<dl><dt>Fűtés</dt><dd>{heat_type_name}</dd></dl>',
                            '</div><div class="clearfix"></div>',                                
                            '<div class="contacts"><h4>Kapcsolattartók</h4>',
                                '<table><tpl for="contacts"> ',
                                '<tr data-qtip="{note}">',
                                    '<td>{fullname}</td>',
                                    '<td>{_joinData.type_name}</td>',
                                    '<td>',
                                        '<b>{phone1}</b> {phone1note}',
                                        '<tpl if="phone2 != \'\'"><br><b>{phone2}</b> {phone2note}</tpl>',
                                        '<tpl if="phone3 != \'\'"><br><b>{phone3}</b> {phone3note}</tpl>',
                                        '<tpl if="phone4 != \'\'"><br><b>{phone4}</b> {phone4note}</tpl>',
                                    '</td>',
                                    '<td>',
                                        '<a href="mailto:{email1}">{email1}</a>',
                                        '<tpl if="email2 != \'\'"><br><a href="mailto:{email2}">{email2}</a></tpl>',
                                    '</td>',
                                '</tr>',
                            '</tpl></table></div>',
                            '<div class="col-6 datas1"><h4>Tulajdonságok</h4>',
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
                            '</div>',
                            '<div class="col-6 datas2"><h4>Adatok</h4>',
                            '<tpl if="lotsize != \'\'"><dl><dt>Telekméret:</dt><dd>{lotsize}</dd></dl></tpl>',
                            '<tpl if="builddate != \'\'"><dl><dt>Építési idő:</dt><dd>{builddate}</dd></dl></tpl>',
                            '<tpl if="building_levels != \'\'"><dl><dt>Ingatlan szintjei:</dt><dd>{building_levels}</dd></dl></tpl>',
                            '<tpl if="rating_type_name != \'\'"><dl><dt>Ingatlan minősítése:</dt><dd>{rating_type_name}</dd></dl></tpl>',
                            '<tpl if="pool_type_name != \'\'"><dl><dt>Medence:</dt><dd>{pool_type_name}</dd></dl></tpl>',
                            '<tpl if="conveniences_type_name != \'\'"><dl><dt>Komfort:</dt><dd>{conveniences_type_name}</dd></dl></tpl>',
                            '<tpl if="building_condition_type_name != \'\'"><dl><dt>Állapot:</dt><dd>{building_condition_type_name}</dd></dl></tpl>',
                            '<tpl if="parking_type_name != \'\'"><dl><dt>Parkolás:</dt><dd>{parking_type_name}</dd></dl></tpl>',

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
                        layout: 'fit',
                        title: 'Képek',
                        margin: '10 10 10 10', 
                        xtype: 'panel', 
                        items: [{
                            height:600, 
                            reference: 'images',
                            itemId: 'images',
                            tpl:  new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div style="width:50%; padding:5px; float:left; position:relative;" class="thumb-wrap">',
                                      '<a href="{image_original}" target="_blank" class="popup"><img  src="{image_tn}" style="width:100%;"/></a>',
                                '</div>',
                                '<tpl if="xindex  % 2 ===0"><div class="clearfix"></div></tpl>',
                                '</tpl>'
                            ),
                            itemSelector: 'div.thumb-wrap',
                            emptyText: 'No images available', 
                            xtype: 'dataview'                          
                        }]

                    }              
                    ]    
                }
            ],
            bbar:[
                '->',
                {
                    xtype: 'button',
                    text: 'Érdeklődés elmentése',   
                    handler: 'onFormSave'
                }
            ]
        } 
    ]
});