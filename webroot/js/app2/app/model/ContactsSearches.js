Ext.define('Tscrm.model.ContactsSearches', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        'id', 
        'created',
        { name: 'Users.fullname', type: 'string' , mapping: 'user.fullname'},
        { name: 'contact_id', type: 'string' , mapping: 'contact.id'},        
        { name: 'contact_fullname', type: 'string' , mapping: 'contact.fullname'},
        { name: 'contact_email1', type: 'string' , mapping: 'contact.email1'},
        { name: 'contact_phone1', type: 'string' , mapping: 'contact.phone1'},
        { name: 'itnternalcompany', type: 'string' , mapping: 'contact.internal_company.name'},
        { name: 'creator', type: 'string' , mapping: 'user.fullname'},
/*
        { name: 'firstname', type: 'string' , mapping: 'contact.firstname'},
        { name: 'lastname', type: 'string' , mapping: 'contact.lastname'},
        { name: 'phone1', type: 'string' , mapping: 'contact.phone1'},
        { name: 'email1', type: 'string' , mapping: 'contact.email1'},
        { name: 'fullname', type: 'string' , mapping: 'contact.fullname'}
*/
        
    ]
});