Ext.define('Tscrm.model.Cities', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        'id','city','active','deleted','created','modified'
    ]
});