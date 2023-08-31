Ext.define('Tscrm.view.properties.ListFastView', {
    extend: 'Ext.panel.Panel',
    xtype: 'propertiesFastView',
    controller: 'propertiesController',
    itemId:'propertiesFastView',
    viewModel: {
        type: 'propertiesModel'
    }, 
    bind:{
        data:{
            bindTo:'{rec}',
            deep:true
        }    
    },
    bodyPadding:10,
    cls:'fastview',
    autoScroll: true,
    tpl : [
        '<dl><dt>Cim:</dt> <dd>{address}</dd></dl>',
        '<dl><dt>Cim megjegyzés:</dt> <dd>{address_note}</dd></dl>',
        '<tpl for="contact"><dl><dt>Tulajdonos:</dt> <dd>{fullname} <tpl if="phone1 != \'\'"><br>{phone1}</tpl> <tpl if="phone1note != \'\'"><br>{phone1note}{phone1note}</tpl>  <tpl if="email1 != \'\'"><br><a href="mailto:{email1}">{email1}</tpl></a></dd></dl></tpl>',
        '<dl><dt>Leírás:</dt> <dd>{description}</dd></dl>',
        '<dl><dt>Leírás (EN):</dt> <dd>{description_en}</dd></dl>',
        '<dl><dt>Megjegyzés:</dt> <dd>{note}</dd></dl>',
        '<dl><dt>Létrehozva:</dt> <dd>{created:date("Y-m-d H:i")}</dd></dl>',
       // ' <tpl if="!Ext.isEmpty(mainimagetn)"><img src="{mainimagetn}" width=100%></tpl>'
    ]   
   
});
