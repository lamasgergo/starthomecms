Ext.define('Tscrm.model.RentedPropertiesContacts', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: ['id', 'created',

        { name: 'mainimagetn', type: 'string' , mapping: 'properties_variation.property.mainimage.image_tn'},
        { name: 'mainimage', type: 'string' , mapping: 'properties_variation.property.mainimage.image_mini'},
        { name: 'Cities.city', type: 'string' , mapping: 'properties_variation.property.city.city'},
        { name: 'District.district', type: 'string' , mapping: 'properties_variation.property.district.district'},
        { name: 'Streets.street', type: 'string' , mapping: 'properties_variation.property.address'},
        { name: 'fullname', type: 'string' , mapping: 'properties_variation.property.contact[0].fullname'},
        { name: 'phone1', type: 'string' , mapping: 'properties_variation.property.contact[0].phone1'},
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
        { name: 'PropertiesLayouts.room', type: 'string' , mapping: 'properties_variation.property.properties_layout.room'} ,
        { name: 'livingroom', type: 'string' , mapping: 'properties_variation.property.properties_layout.livingroom'} ,
        { name: 'size_net', type: 'string' , mapping: 'properties_variation.property.size_net'} ,
        { name: 'size_gross', type: 'string' , mapping: 'properties_variation.property.size_gross'} ,  
        { name: 'rooms', type: 'string' , mapping: 'properties_variation.property.properties_layout.room'}            
    ]
});