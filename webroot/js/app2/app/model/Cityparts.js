Ext.define('Tscrm.model.Cityparts', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        'id','city_id','district_id','citypart','active','deleted','created','modified',
        { name: 'City.city', type: 'string' , mapping: 'city.city'},
        { name: 'District.district', type: 'string' , mapping: 'district.district'},
    ]
});