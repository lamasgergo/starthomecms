
var active = Ext.create('Ext.data.Store', {
   
    fields: ['val', 'name'],
    data: [{
        "val": "1",
        "name": "Aktív"
    }, {
        "val": "0",
        "name": "Inaktív"
    }]
});

var phonetypes = Ext.create('Ext.data.Store', {

    fields: ['val', 'name'],
    data: [{
        "val": "1",
        "name": "Mobil"
    }, {
        "val": "2",
        "name": "Budapesti"
    }, {
        "val": "3",
        "name": "Vidéki"
    }, {
        "val": "4",
        "name": "Külföldi"
    }]
});
 
var gridactions = Ext.create('Ext.data.Store', {

    fields: ['val', 'name'],
    data: [{
        "val": "1",
        "name": "Vágólapra képnélkül"
    },{
        "val": "2",
        "name": "Vágólapra képpel"
    },{
        "val": "3",
        "name": "Vágólapra angolul"
    },{
        "val": "11",
        "name": "Vágólapra képnélkül (Relokációs)"
    },{
        "val": "12",
        "name": "Vágólapra képpel (Relokációs)"
    },{
        "val": "13",
        "name": "Vágólapra angolul (Relokációs)"
    }, {
        "val": "4",
        "name": "Hivatkozások vágólapra"
    }/*, {
        "val": "4",
        "name": "Ingatlan adatok wordbe"
    }*/, {
        "val": "5",
        "name": "Cím kiadás"
    }, {
        "val": "6",
        "name": "Cím kiadás és Megtekintési"
    }/*, {
        "val": "7",
        "name": "Ingatlan com hozzáadva"
    }, {
        "val": "8",
        "name": "Ingatlan com levéve"
    }*/, {
        "val": "9",
        "name": "Kereső igény rögzítése"
    }, {
        "val": "10",
        "name": "Kiajánlás küldése"
    },
    {
        "val": "14",
        "name": "Adatlap nyomtatás"
    },
    {
        "val": "15",
        "name": "Adatlap nyomtatás angolul"
    },
    {
        "val": "16",
        "name": "Relok. adatlap nyomtatás"
    },
    {
        "val": "17",
        "name": "Relok. adatlap nyomtatás angolul"
    },
    {
        "val": "25",
        "name": "Címlista"
    },
    {
        "val": "26",
        "name": "Kiajánlás linkkel"
    },
    ]
});

var prenames = Ext.create('Ext.data.Store', {
     
    fields: ['val', 'name'],
    data: [{
        "val": "1",
        "name": "ifj"
    }, {
        "val": "2",
        "name": "dr"
    }, {
        "val": "3",
        "name": "Mr"
    }, {
        "val": "4",
        "name": "Mrs"
    }]
});
 

var eventypes = Ext.create('Ext.data.Store', {
 
    fields: ['val', 'name'],
    data: [
    {
        "val": "0",
        "name": "Egyéb esemény"
    },{
        "val": "1",
        "name": "Megbízási szerződés küldése"
    }, {
        "val": "2",
        "name": "Fotó, alaprajz, adatok kérése"
    }, {
        "val": "3",
        "name": "Lejárati dátumú ingatlanra rákérdezés"
    }, {
        "val": "4",
        "name": "Értesítés kiadásról/eladásról"
    }, {
        "val": "5",
        "name": "Időpont egyeztetve"
    }, {
        "val": "6",
        "name": "Emailt küldés"
    }, {
        "val": "7",
        "name": "Nem aktuális keresés"
    }]
});
