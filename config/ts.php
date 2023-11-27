<?php
return [
    'Vat' => [
        'multiplier' => 1.27
    ],
    'Imagine' => [
        'salt' => 'TSCRM_Image_Salt'
    ],
    'ProperitiesImages' => [
        'dir' => 'properties_images',
        'sizes' => [
            '0' => [
                'process' => 'widenAndHeighten',
                'dir' => 'original',
                'height' => 1068
            ],
            '1' => [
                'process' => 'thumbnail',
                'dir' => 'tn',
                'width' => 200,
                'height' => 150,
                'mode' => 'outbound'
            ],
            '2' => [
                'process' => 'thumbnail',
                'dir' => 'mini',
                'height' => 75,
                'width' => 100,

            ]
        ]
    ],
    'ProperitiesDocuments' => [
        'dir' => 'properties_documents',
        'sizes' => [
            'thumbnail' => [
                'dir' => 'tn',
                'width' => 200,
                'height' => 150,
            ],
            'squareCenterCrop' => [
                'dir' => 'mini',
                'size' => 75
            ]
        ]
    ],
    'EventsDescriptions' => [
        'Events'=>[
            'add'=>'Esemény létrehozva',
            'edit'=>'Esemény módosítva'
        ],    
        'Properties'=>[
            'add'=>'Ingatlan létrehozva',
            'edit'=>'Ingatlan módosítva'
        ],    
        'Contacts'=>[
            'add'=>'Kapcsolattartó létrehozva',
            'edit'=>'Kapcsolattartó módosítva'
        ],
        'InterestPropertiesContact'=>[
            'add'=>'Érdeklődés létrehozva'
        ],

        'ShowedPropertiesContacts'=>[
            'add'=>'Lakás megmutatva'
        ],
        'ContactsSearches'=>[
            'add'=>'Keresési igény rögzítve'
        ],
        'SentPropertiesContacts'=>[
            'add'=>'Kiajánlás rögzítve'
        ],
        'PropertiesImages'=>[
            'add'=>'Képek hozzáadva'
        ]
    ],
    'FieldNames' => [
        'note' => 'Megjegyzés',
        'building' => 'Épület',
        'city_id' => 'Város',
        'district_id' => 'Kerület',
        'street_id' => 'Utca',
        'citypart_id' => 'Városrész',
        'floor' => 'Emelet',
        'door' => 'Ajtó',
        'address_note' => 'Cím megjegyzés',
        'street_hidden' => 'Cím rejtett',
        'building_park' => 'Lakópark',
        'building_type' => 'Típus',
        'size_net' => 'Nettó alapterület',
        'size_gross' => 'Bruttó alapterület',
        'heat_type' => 'Fűtés',
        'upperlevel' => 'Felsőszint',
        'lowerlevel' => 'Földszint',
        'atticlevel' => 'Tetőtéri',
        'newlybuilt' => 'Újépítésű',
        'elevator' => 'Lift',
        'gardencontact' => 'Kertkapcsolat',
        'petallowed' => 'Háziállat hozható',
        'terrace' => 'Terasz, erkély',
        'outlook' => 'Panoráma',
        'energy_rating' => 'Energetikai besorolás',
        'lotsize' => 'Telekméret',
        'lotsize2' => 'Telekméret',
        'builddate' => 'Építési idő',
        'building_levels' => 'Ingatlan szintjei',
        'pool_type' => 'Medence',
        'conveniences' => 'Komfort',
        'building_condition' => 'Állapot',
        'parking' => 'Parkolás',
        'sellvar' => [
            'nocontract' => 'Hiányzó szerződés',
            'price' => 'Eladási ár',
            'price_dev' => 'Eladási ár deviza',
            'common_cost' => 'Közös költség',
            'common_cost_dev' => 'Közös költség deviza',
            'furniture_type' => 'Bútorozás',
            'comission' => 'Jutalék',
            'active' => 'Aktív',
            'notonweb' => 'Webre ne',
            'offer' => 'Ajánlat',
            'ing_com' => 'Ingatlan.com',
            'gdn' => 'GDN',
            'description' => 'Leírás (magyar)',
            'description_eng' => 'Leírás (angol)',           
        ],
        'rentvar' => [
            'enddate' => 'Bérbeadási határidő',
            'nocontract' => 'Hiányzó szerződés',
            'price' => 'Eladási ár',
            'price_dev' => 'Eladási ár deviza',
            'common_cost' => 'Közös költség',
            'common_cost_dev' => 'Közös költség deviza',
            'furniture_type' => 'Bútorozás',
            'comission' => 'Jutalék',
            'caution_type' => 'Kaució',
            'shortterm' => 'Rövidtávra is',

            'active' => 'Aktív',
            'notonweb' => 'Webre ne',
            'offer' => 'Ajánlat',
            'ing_com' => 'Ingatlan.com',
            'gdn' => 'GDN',
            'description' => 'Leírás (magyar)',
            'description_eng' => 'Leírás (angol)',            
        ],
        
        'firstname' => 'Keresztnév',
        'fullname' => 'Teljes név',

    ],
    'CakePdf' => [
        'engine' => 'CakePdf.Mpdf',
        'margin' => [
            'bottom' => 15,
            'left' => 50,
            'right' => 30,
            'top' => 45
        ],
        'download' => false,
        'options' => [
            'print-media-type' => false,
            'outline' => true,
            'dpi' => 300
        ],
    ]
];