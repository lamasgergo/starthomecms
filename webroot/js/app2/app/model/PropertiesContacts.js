Ext.define('Tscrm.model.PropertiesContacts', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: ['id', 'main', 'created',
        { name: 'firstname', type: 'string' , mapping: 'contact.firstname'},
        { name: 'lastname', type: 'string' , mapping: 'contact.lastname'},
        { name: 'phone1', type: 'string' , mapping: 'contact.phone1'},
        { name: 'email1', type: 'string' , mapping: 'contact.email1'},
    ]
});