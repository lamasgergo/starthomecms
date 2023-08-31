<?php
return [
    'Static' => [
        'building_type' => [
            '1' => __d('start', 'Villa'),
            '2' => __d('start', 'Családi ház'),
            '3' => __d('start', 'Ikerház'),
            '4' => __d('start', 'Sorház'),
            '5' => __d('start', 'Társasházi lakás'),
            '6' => __d('start', 'Iroda'),
            '7' => __d('start', 'Építési telek'),
            '8' => __d('start', 'Telek'),
            '9' => __d('start', 'Egyéb telek'),
            '10' => __d('start', 'Üzlethelyiség'),
            '11' => __d('start', 'Házrész'),
            '12' => __d('start', 'Panel'),
            '13' => __d('start', 'Ipari telep'),
            '14' => __d('start', 'Vendéglő'),
            '15' => __d('start', 'Hotel stb..'),
            '16' => __d('start', 'Ker. obj'),
            '17' => __d('start', 'Kastély kúria'),
            '18' => __d('start', 'Egyéb ingatlan'),
        ],    
        
        'heat_type' => [
            '1' => __d('start', 'Központi fűtés'),
            '2' => __d('start', 'Távfűtés'),
            '3' => __d('start', 'Tömbfűtés'),
            '4' => __d('start', 'Egyedi gáz'),
            '5' => __d('start', 'Cirkó'),
            '6' => __d('start', 'Vegyes'),
            '7' => __d('start', 'Villany'),
            '8' => __d('start', 'Energia takarékos'),
            '9' => __d('start', 'Egyéb'),
            '10' => __d('start', 'Központi egyedi mérő'),
            '11' => __d('start', 'Egyedi kazán'),
            '12' => __d('start', 'Táv. egyedi mérő'),
            '13' => __d('start', 'Fan coil'),
            '14' => __d('start', 'Alternatív'),
            '15' => __d('start', 'Geotermikus'),
            '16' => __d('start', 'Fa'),
            '17' => __d('start', 'Héra'),
        ],

        'panorama_type' => [
            '' => __d('start', 'Nincs'),
            '1' => __d('start', 'Van'),
            '2' => __d('start', 'Dunai'),
            '3' => __d('start', 'Utcai'),
            '4' => __d('start', 'Udvari'),
            '5' => __d('start', 'Kertre néző'),
            '6' => __d('start', 'Panoráma')       
        ],
        'energy_rating_type' => [
            '1' => __d('start', 'AA++'),
            '2' => __d('start', 'AA+'),
            '3' => __d('start', 'AA'),
            '4' => __d('start', 'BB'),
            '5' => __d('start', 'CC'),
            '6' => __d('start', 'DD'),
            '7' => __d('start', 'EE'),
            '8' => __d('start', 'FF'),
            '9' => __d('start', 'GG'),
            '10' => __d('start', 'HH'),
            '11' => __d('start', 'II'),
            '12' => __d('start', 'JJ'),
        ],
        'rating_type' => [
            '1' => __d('start', '*'),
            '2' => __d('start', '**'),
            '3' => __d('start', '***'),
            '4' => __d('start', '****'),
            '5' => __d('start', '*****'),
        ],
        'pool_type' => [
            '' => __d('start', 'Nincs'),
            '1' => __d('start', 'Van'),
            '2' => __d('start', 'Beltéri'),
            '3' => __d('start', 'Kültéri')
        ],
        'conveniences_type' => [
            '1' => __d('start', 'Luxus'),
            '2' => __d('start', 'Dupla komfortos'),
            '3' => __d('start', 'Összkomfortos'),
            '4' => __d('start', 'Komfortos'),
            '5' => __d('start', 'Félkomfortos'),
            '6' => __d('start', 'Komfort nélküli')         
        ],
        'building_condition_type' => [
            '1' => __d('start', 'Újszerű'),
            '2' => __d('start', 'Jó állapotú'),
            '3' => __d('start', 'Felújított'),
            '4' => __d('start', 'Közepes állapotú'),
            '5' => __d('start', 'Felújítandó'),
            '6' => __d('start', 'Építés alatt'),
            '7' => __d('start', 'Új'),
            '8' => __d('start', 'Luxus')       
        ],
        'parking_type' => [
            '1' => __d('start', 'garázs'),
            '2' => __d('start', '2 garázs'),
            '3' => __d('start', 'Garázs/teremgarázs benne van az árban'),
            '4' => __d('start', 'Közelben parkolóház'),
            '5' => __d('start', 'Garázs külön kapható'),
            '6' => __d('start', 'Utcán közterületen (fizetős)'),
            '7' => __d('start', 'Utcán közterületen (ingyenes)'),
            '8' => __d('start', 'Felszíni beálló'),
            '9' => __d('start', 'Telken beálló'),
            '10' => __d('start', 'Telken garázs'),
            '11' => __d('start', 'Teremgarázs beállóhely vásárolható'),
            '12' => __d('start', 'Nincs'),
        ],
        'valuta_type' => [
            'HUF' => __d('start', 'HUF'),
            'EUR' => __d('start', 'EUR'),
            'USD' => __d('start', 'USD'),
        ],
        'furniture_type' => [
            '1' => __d('start', 'Bútorozott'),
            '2' => __d('start', 'Bútorozatlan'),
            '3' => __d('start', 'Üresen/Bútorral'),
            '4' => __d('start', ' Bútorral/ üresen')
        ],   
        'caution_type' => [
            '1' => __d('start', '1 havi'),
            '2' => __d('start', '2 havi')
        ],
        'active' => [
            '0' => __d('start', 'Nem'),
            '1' => __d('start', 'Igen')
        ],
        'document_type' => [
            '1' => __d('start', 'Megbízási szerződés'),
            '2' => __d('start', 'Alaprajz'),
            '3' => __d('start', 'Tulajdoni lap'),
            '4' => __d('start', 'Helyszínrajz'),
            '5' => __d('start', 'Egyéb'),
        ],
        'contact_property_type' => [
            '1' => __d('start', 'Tulajdonos'),
            '2' => __d('start', 'Kapcsolattartó')
        ], 
        'marial_status_type' => [
            '1' => __d('start', 'Egyedülálló'),
            '2' => __d('start', 'Házas'),
            '3' => __d('start', 'Párkapcsolat')
        ], 
        'nationality_type' => [
            '1' => __d('start', 'Magyar'),
            '2' => __d('start', 'Német'),
            '3' => __d('start', 'Arab'),
            '4' => __d('start', 'Afrika'),
            '5' => __d('start', 'Angol'),
        ], 
        'prename_type' => [
            '1' => __d('start', 'ifj.'),
            '2' => __d('start', 'dr.'),
            '3' => __d('start', 'Mr.'),
            '4' => __d('start', 'Ms.'),
            '5' => __d('start', 'Mrs.'),
        ],   
        'terrace_type' => [
            '' => __d('start', 'Nincs'),
            '1' => __d('start', 'Loggia'),
            '2' => __d('start', 'Erkély'),
            '3' => __d('start', 'Terasz'),        
        ],   
        'advert_type' => [
            '2' => __d('start', 'Eladó'),
            '1' => __d('start', 'Kiadó')
        ],
        'price_type' => [
            '1' => __d('start', 'Nettó M.Ft'),
            '2' => __d('start', 'Bruttó M.Ft'),
            '3' => __d('start', 'Nettó Euró'),
            '4' => __d('start', 'Bruttó Euró')
        ],
        'parking_type_search' => [
            '' => __d('start', 'Nincs'),
            '1' => __d('start', 'van'),
            '2' => __d('start', '2 garázs')
        ],
    ],
];