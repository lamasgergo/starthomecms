Ext.define('Tscrm.model.Properties', {
    extend: 'Ext.data.Model',
    idProperty: 'properties_variation.id',
    fields: [
        'id', 'title', 'created'
        /*,
        { name: 'mainimagetn', type: 'string' , mapping: 'mainimage.image_tn'},
        { name: 'mainimage', type: 'string' , mapping: 'mainimage.image_mini'},
        { name: 'city_name', type: 'string' , mapping: 'city.city'},
        { name: 'district_name', type: 'string' , mapping: 'district.district'},
        { name: 'street_name', type: 'string' , mapping: 'street.street'}, 
        { name: 'fullname', type: 'string' , mapping: 'contact[0].fullname'},
        { name: 'phone1', type: 'string' , mapping: 'contact[0].phone1'},
        { name: 'variation_id', type: 'string' , mapping: 'properties_variation.id'} ,
        { name: 'furniture_type_name', type: 'string' , mapping: 'properties_variation.furniture_type_name'} ,
        { name: 'description', type: 'string' , mapping: 'properties_variation.description'} ,
        { name: 'price', type: 'number' , mapping: 'properties_variation.price'},
        { name: 'active', type: 'string' , mapping: 'properties_variation.active'} , 
        { name: 'room', type: 'string' , mapping: 'properties_layout.room'} ,
        { name: 'livingroom', type: 'string' , mapping: 'properties_layout.livingroom'} ,
        { name: 'halfroom', type: 'string' , mapping: 'properties_layout.halfroom'} ,
        */
    ]
});