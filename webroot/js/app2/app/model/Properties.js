Ext.define('Tscrm.model.Properties', {
    extend: 'Ext.data.Model',
    idProperty: 'properties_variation.id',
    fields: [
        'id', 'title', 'created', 'archived',
        { name: 'mainimagetn', type: 'string' , mapping: 'mainimage.image_tn'},
        { name: 'mainimage', type: 'string' , mapping: 'mainimage.image_mini'},
        { name: 'Cities.city', type: 'string' , mapping: 'city.city'},
        { name: 'District.district', type: 'string' , mapping: 'district.district'},
        { name: 'Streets.street', type: 'string' , mapping: 'address'},
        { name: 'fullname', type: 'string' , mapping: 'contact[0].fullname'},
        { name: 'phone1', type: 'string' , mapping: 'contact[0].phone1'},
        { name: 'PropertiesVariations.id', type: 'string' , mapping: 'properties_variation.id'} ,
        { name: 'variation_id', type: 'string' , mapping: 'properties_variation.id'} ,
        { name: 'furniture_type_name', type: 'string' , mapping: 'properties_variation.furniture_type_name'} ,
        { name: 'description', type: 'string' , mapping: 'properties_variation.description'} ,
        { name: 'description_en', type: 'string' , mapping: 'properties_variation.description_en'} ,
        { name: 'PropertiesVariations.price', type: 'number' , mapping: 'properties_variation.price'}, 
        { name: 'price_formatted', type: 'string' , mapping: 'properties_variation.price_formatted'},      
        { name: 'nocontract', type: 'string' , mapping: 'properties_variation.nocontract'},      
        { name: 'active', type: 'string' , mapping: 'properties_variation.active'} , 
        { name: 'enddate', type: 'string' , mapping: 'properties_variation.enddate'} ,
        { name: 'PropertiesLayouts.room', type: 'string' , mapping: 'properties_layout.room'} ,
        { name: 'livingroom', type: 'string' , mapping: 'properties_layout.livingroom'} ,
        { name: 'halfroom', type: 'string' , mapping: 'properties_layout.halfroom'}
    ]
});