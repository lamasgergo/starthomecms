Ext.define('Tscrm.model.Contacts', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: ['id', 'title', 'created',
        { name: 'internal_company', type: 'string' , mapping: 'internal_company.name'}
    ]
});