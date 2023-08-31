Ext.define('Tscrm.model.Streets', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        'id','city_id','district_id','street','active','deleted','created','modified',
        { name: 'City.city', type: 'string' , mapping: 'city.city'},
        { name: 'District.district', type: 'string' , mapping: 'district.district'}
    ]
});