Ext.define('Tscrm.model.Districts', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        'id','city_id','district','active','deleted','created','modified',
        { name: 'City.city', type: 'string' , mapping: 'city.city'}, 
    ]
});