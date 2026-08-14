/* ---------- Asie centrale/Sud restante & Pacifique (lot 5) ---------- */
const D20 = [
{ id:'lagman', c:'as', lat:42.874, lon:74.590, base:6, prep:40, cook:40, diff:2, tags:['noodles','beef','soup'],
  art:{v:'bowl',bg:'#2c2a22',plate:'#e9dcc0',style:'noodle',food:['#8a3a24','#4f8f4a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Lagman',en:'Lagman'},
  p:{fr:'Bichkek, Kirghizistan',en:'Bishkek, Kyrgyzstan'},
  d:{fr:"Des nouilles étirées à la main, tendues et claquées sur le plan de travail jusqu'à l'épaisseur voulue, nappées d'un ragoût de bœuf et de légumes épicé au cumin, hérité des routes de la soie qui traversaient l'Asie centrale.",
     en:"Hand-pulled noodles, stretched and slapped on the worktop to the right thickness, topped with a cumin-spiced beef and vegetable stew, inherited from the Silk Road routes that crossed Central Asia."
     },
  i:[['flour',500,'g'],['water',220,'ml'],['beef_chuck',500,'g'],['bell_pepper',2,'pc'],['carrot',2,'pc'],['tomato',3,'pc'],['onion',2,'pc'],['garlic',4,'clove'],['cumin',1,'tbsp'],['soy_sauce',2,'tbsp'],['frying_oil',60,'ml'],['salt',null,'']],
  s:{fr:["Pétrissez farine, eau et sel en une pâte très souple, laissez reposer 1 heure sous huile.","Étirez la pâte en longs boudins, tendez-les et claquez-les contre le plan de travail pour les affiner en nouilles.","Faites dorer le bœuf en lanières avec oignon et ail dans l'huile.","Ajoutez poivron, carotte et tomate en lanières, cumin et soja, mouillez et laissez mijoter 25 minutes.","Cuisez les nouilles à l'eau bouillante 3 minutes, égouttez et nappez du ragoût de bœuf chaud."],
     en:["Knead flour, water and salt into a very supple dough, rest 1 hour under oil.","Stretch the dough into long ropes, pull and slap them against the worktop to thin them into noodles.","Brown the beef strips with onion and garlic in oil.","Add pepper, carrot and tomato in strips, cumin and soy, moisten and simmer 25 minutes.","Cook the noodles in boiling water 3 minutes, drain and top with the hot beef stew."]
     } },

{ id:'qurutob', c:'as', lat:38.559, lon:68.787, base:4, prep:20, cook:0, diff:1, tags:['fresh','veg','breakfast'],
  art:{v:'bowl',bg:'#2f2a20',plate:'#e9dcc0',style:'salad',food:['#e0dcc0','#c2452c','#4f8f4a'],garnish:'#6fbf8f'},
  n:{fr:'Qurutob',en:'Qurutob'},
  p:{fr:'Douchanbé, Tadjikistan',en:'Dushanbe, Tajikistan'},
  d:{fr:"Le plat national tadjik : du pain fatir émietté en morceaux, noyé sous un yaourt séché puis reconstitué en sauce, avec tomate et oignon crus par-dessus. Traditionnellement mangé à la main dans un grand plat commun.",
     en:"Tajikistan's national dish: fatir bread torn into pieces, drowned under a dried yoghurt reconstituted into sauce, with raw tomato and onion on top. Traditionally eaten by hand from one large communal dish."
     },
  i:[['flatbread',3,'pc'],['dried_yogurt_balls',200,'g'],['water',200,'ml'],['tomato',4,'pc'],['onion',2,'pc'],['olive_oil',3,'tbsp'],['cilantro',1,'bunch'],['salt',null,'']],
  s:{fr:["Dissolvez les boules de yaourt séché dans l'eau tiède jusqu'à obtenir une sauce onctueuse et acidulée.","Émiettez le pain fatir en morceaux irréguliers directement dans un grand plat.","Versez la sauce au yaourt sur le pain émietté, mélangez délicatement pour bien l'imbiber.","Émincez finement tomate et oignon, disposez-les sur le dessus.","Arrosez d'huile d'olive, parsemez de coriandre et servez immédiatement à température ambiante."],
     en:["Dissolve the dried yoghurt balls in warm water until a smooth, tangy sauce forms.","Tear the fatir bread into irregular pieces directly into a large dish.","Pour the yoghurt sauce over the torn bread, mix gently to soak it well.","Finely slice tomato and onion, arrange on top.","Drizzle with olive oil, scatter with coriander and serve immediately at room temperature."]
     } },

{ id:'gutap', c:'as', lat:37.960, lon:58.326, base:8, prep:40, cook:15, diff:1, tags:['street','veg','fry'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'flat',food:['#4f8f4a','#e0dcc0','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Gutap',en:'Gutap'},
  p:{fr:'Achgabat, Turkménistan',en:'Ashgabat, Turkmenistan'},
  d:{fr:"Un chausson demi-lune de pâte fine garni de citrouille ou de légumes-feuilles sauvages, cuit à sec dans une poêle en fonte sans une goutte d'huile, jusqu'à ce que la pâte gonfle en petites poches croustillantes.",
     en:"A half-moon pastry filled with pumpkin or wild leafy greens, cooked dry in a cast-iron pan without a drop of oil, until the dough puffs into small crisp pockets."
     },
  i:[['flour',400,'g'],['water',180,'ml'],['pumpkin',500,'g'],['onion',1,'pc'],['cumin',1,'tsp'],['butter',30,'g'],['salt',null,'']],
  s:{fr:["Pétrissez farine, eau et sel en une pâte souple, laissez reposer 30 minutes.","Râpez la citrouille crue, mélangez-la à l'oignon émincé, au cumin et au sel.","Étalez la pâte finement, découpez des disques et garnissez chacun de farce de citrouille.","Repliez en demi-lune et pincez fermement les bords pour bien sceller.","Cuisez à sec dans une poêle chaude 4 minutes de chaque côté à couvert, badigeonnez de beurre fondu à la sortie."],
     en:["Knead flour, water and salt into a supple dough, rest 30 minutes.","Grate the raw pumpkin, mix with sliced onion, cumin and salt.","Roll the dough thin, cut discs and fill each with the pumpkin filling.","Fold into a half-moon and pinch the edges firmly to seal well.","Cook dry in a hot pan 4 minutes per side, covered, brush with melted butter on coming out."]
     } },

{ id:'kabuli-palaw', c:'as', lat:34.555, lon:69.207, base:8, prep:40, cook:90, diff:2, tags:['rice','festive','lamb'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'rice',food:['#c9924a','#e0a83a','#8a3a24'],garnish:'#7fae6a'},
  n:{fr:'Kabuli palaw',en:'Kabuli palaw'},
  p:{fr:'Kaboul, Afghanistan',en:'Kabul, Afghanistan'},
  d:{fr:"Le plat national afghan : un riz basmati cuit dans le bouillon d'agneau, coloré au caramel de sucre et couronné de fines juliennes de carotte et de raisins secs sautés jusqu'à caraméliser légèrement.",
     en:"Afghanistan's national dish: basmati rice cooked in lamb broth, coloured with caramelised sugar and crowned with fine carrot juliennes and raisins sautéed until lightly caramelised."
     },
  i:[['lamb_shoulder',1.2,'kg'],['basmati_rice',500,'g'],['carrot',4,'pc'],['raisins',80,'g'],['onion',2,'pc'],['sugar',3,'tbsp'],['cardamom',5,'pc'],['cumin',1,'tsp'],['frying_oil',80,'ml'],['salt',null,'']],
  s:{fr:["Faites dorer l'agneau avec l'oignon émincé, couvrez d'eau et laissez mijoter 1 heure jusqu'à tendreté, réservez le bouillon.","Taillez les carottes en fine julienne, faites-les sauter avec le sucre jusqu'à ce qu'elles caramélisent légèrement, ajoutez les raisins en fin de cuisson.","Faites revenir le riz rincé dans un peu d'huile, mouillez avec le bouillon d'agneau parfumé à la cardamome et au cumin.","Cuisez à couvert 18 minutes à feu doux sans soulever le couvercle.","Dressez le riz, disposez l'agneau dessus et couronnez de carottes et raisins caramélisés."],
     en:["Brown the lamb with sliced onion, cover with water and simmer 1 hour until tender, reserve the broth.","Cut the carrots into fine julienne, sauté with the sugar until lightly caramelised, add the raisins at the end.","Fry the rinsed rice in a little oil, moisten with the lamb broth scented with cardamom and cumin.","Cook covered 18 minutes over low heat without lifting the lid.","Plate the rice, arrange the lamb on top and crown with the caramelised carrots and raisins."]
     } },

{ id:'mas-huni', c:'as', lat:4.175, lon:73.509, base:4, prep:15, cook:0, diff:1, tags:['breakfast','sea','fresh'],
  art:{v:'plate',bg:'#26333c',plate:'#e9dcc0',style:'salad',food:['#9fb0bc','#4f8f4a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Mas huni',en:'Mas huni'},
  p:{fr:'Malé, Maldives',en:'Malé, Maldives'},
  d:{fr:"Le petit-déjeuner national maldivien : du thon séché et fumé émietté à la main, mélangé cru à de la noix de coco fraîchement râpée, oignon rouge et piment, mangé enroulé dans un roshi, un pain plat fin.",
     en:"The Maldivian national breakfast: hand-flaked smoked dried tuna, mixed raw with freshly grated coconut, red onion and chilli, eaten wrapped in roshi, a thin flatbread."
     },
  i:[['smoked_dried_tuna',200,'g'],['coconut',200,'g'],['red_onion',2,'pc'],['lime',2,'pc'],['chili_pepper',2,'pc'],['flatbread',6,'pc'],['salt',null,'']],
  s:{fr:["Émiettez finement le thon séché et fumé à la main, en retirant les arêtes.","Râpez fraîchement la noix de coco.","Émincez très finement l'oignon rouge et le piment.","Mélangez thon effiloché, coco râpé, oignon et piment, arrosez de jus de citron vert et salez.","Servez à température ambiante avec des roshi chauds pour envelopper chaque bouchée."],
     en:["Finely flake the smoked dried tuna by hand, removing any bones.","Freshly grate the coconut.","Very finely slice the red onion and chilli.","Mix the flaked tuna, grated coconut, onion and chilli, drizzle with lime juice and salt.","Serve at room temperature with warm roshi to wrap each bite."]
     } },

{ id:'ambuyat', c:'as', lat:4.903, lon:114.940, base:4, prep:20, cook:15, diff:1, tags:['comfort','sea','veg'],
  art:{v:'bowl',bg:'#2a3324',plate:'#e9dcc0',style:'stew',food:['#e0dcc0','#c2452c','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Ambuyat',en:'Ambuyat'},
  p:{fr:'Bandar Seri Begawan, Brunei',en:'Bandar Seri Begawan, Brunei'},
  d:{fr:"Le plat national brunéien, une pâte de sagou visqueuse et presque sans goût, enroulée avec des baguettes en bambou fourchues appelées candas et trempée dans une sauce acidulée au tamarin et au piment.",
     en:"Brunei's national dish, a viscous, almost flavourless sago starch paste, wound onto forked bamboo sticks called candas and dipped into a tangy tamarind and chilli sauce."
     },
  i:[['sago_starch',200,'g'],['water',500,'ml'],['tamarind_paste',3,'tbsp'],['chili_pepper',3,'pc'],['sugar',1,'tbsp'],['dried_shrimp',30,'g'],['salt',null,'']],
  s:{fr:["Délayez l'amidon de sagou dans un peu d'eau froide pour former une pâte lisse.","Portez le reste de l'eau à ébullition, versez la pâte de sagou en filet en remuant sans cesse.","Continuez à remuer à feu doux jusqu'à ce que le mélange devienne translucide et visqueux, comme une colle épaisse.","Mixez tamarin, piment, sucre et crevettes séchées avec un peu d'eau pour la sauce d'accompagnement.","Enroulez l'ambuyat autour de baguettes fourchues et trempez chaque bouchée dans la sauce avant de la manger d'un trait, sans mâcher."],
     en:["Loosen the sago starch with a little cold water to form a smooth paste.","Bring the rest of the water to the boil, pour in the sago paste in a stream, stirring constantly.","Keep stirring over low heat until the mixture turns translucent and viscous, like thick glue.","Blend tamarind, chilli, sugar and dried shrimp with a little water for the dipping sauce.","Wind the ambuyat around forked sticks and dip each mouthful into the sauce before swallowing it whole, without chewing."]
     } },

{ id:'ikan-sabuko', c:'as', lat:-8.556, lon:125.560, base:4, prep:20, cook:15, diff:1, tags:['grill','sea','spicy'],
  art:{v:'board',bg:'#26333c',plate:'#e9dcc0',style:'fish',food:['#9fb0bc','#c2452c','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Ikan sabuko grillé',en:'Grilled ikan sabuko'},
  p:{fr:'Dili, Timor oriental',en:'Dili, East Timor'},
  d:{fr:"Un maquereau entier badigeonné d'une pâte de piment, tamarin et citronnelle, grillé sur des braises de bois jusqu'à ce que la peau se craquelle, mangé avec du riz et des feuilles de manioc pilées, plat quotidien des rives de Dili.",
     en:"A whole mackerel brushed with a paste of chilli, tamarind and lemongrass, grilled over wood embers until the skin cracks, eaten with rice and pounded cassava leaves, an everyday dish along the shores of Dili."
     },
  i:[['mackerel',4,'pc'],['chili_pepper',4,'pc'],['tamarind_paste',2,'tbsp'],['lemongrass',2,'stick'],['garlic',3,'clove'],['cassava_leaves',300,'g'],['lime',2,'pc'],['salt',null,'']],
  s:{fr:["Videz et écaillez les maquereaux, incisez la peau de deux ou trois traits sur chaque face.","Mixez piment, tamarin, citronnelle et ail en une pâte épaisse.","Badigeonnez généreusement les poissons de cette pâte, y compris dans les incisions, laissez mariner 30 minutes.","Faites griller sur des braises de bois 5 à 6 minutes de chaque côté jusqu'à ce que la peau craquelle.","Faites bouillir puis piler les feuilles de manioc, servez avec le poisson grillé, du riz et un quartier de citron vert."],
     en:["Gut and scale the mackerel, score the skin two or three times on each side.","Blend chilli, tamarind, lemongrass and garlic into a thick paste.","Brush the fish generously with this paste, including in the cuts, marinate 30 minutes.","Grill over wood embers 5 to 6 minutes per side until the skin cracks.","Boil then pound the cassava leaves, serve with the grilled fish, rice and a lime wedge."]
     } },

{ id:'solomon-cassava-fish', c:'oc', lat:-9.446, lon:159.957, base:6, prep:30, cook:40, diff:1, tags:['sea','comfort','veg'],
  art:{v:'leaf',bg:'#26332a',plate:'#4f8f4a',style:'stew',food:['#e0dcc0','#9fb0bc','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Poisson au lait de coco et manioc',en:'Fish in coconut cream with cassava'},
  p:{fr:'Honiara, Îles Salomon',en:'Honiara, Solomon Islands'},
  d:{fr:"Un poisson blanc mijoté à peine dans un lait de coco frais pressé à la main, accompagné de manioc et de patate douce bouillis, le repas quotidien de la plupart des foyers de l'archipel des Salomon.",
     en:"White fish barely simmered in fresh, hand-pressed coconut cream, served with boiled cassava and sweet potato, the everyday meal of most households across the Solomon Islands."
     },
  i:[['white_fish',600,'g'],['coconut_milk',400,'ml'],['cassava',500,'g'],['sweet_potato',400,'g'],['onion',1,'pc'],['lime',2,'pc'],['spinach',200,'g'],['salt',null,'']],
  s:{fr:["Épluchez et coupez manioc et patate douce en gros morceaux, faites-les bouillir 20 minutes jusqu'à tendreté.","Coupez le poisson en gros morceaux, salez-le légèrement.","Faites chauffer le lait de coco à peine frémissant avec l'oignon émincé.","Ajoutez le poisson et laissez pocher doucement 8 minutes sans jamais bouillir franchement.","Servez le poisson au lait de coco avec le manioc, la patate douce et un filet de citron vert, accompagné de légumes-feuilles bouillis."],
     en:["Peel and chunk the cassava and sweet potato, boil 20 minutes until tender.","Cut the fish into large pieces, salt lightly.","Warm the coconut milk to a bare simmer with the sliced onion.","Add the fish and poach gently for 8 minutes, never letting it boil hard.","Serve the fish in coconut milk with the cassava, sweet potato and a squeeze of lime, alongside boiled leafy greens."]
     } },

{ id:'lu-pulu', c:'oc', lat:-21.139, lon:-175.205, base:8, prep:30, cook:120, diff:1, tags:['festive','slow','veg'],
  art:{v:'leaf',bg:'#26332a',plate:'#4f8f4a',style:'stew',food:['#8a3a24','#4f8f4a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Lu pulu',en:'Lu pulu'},
  p:{fr:'Nuku\'alofa, Tonga',en:"Nuku'alofa, Tonga"},
  d:{fr:"Du corned-beef ou du bœuf mijoté enveloppé dans plusieurs couches de feuilles de taro avec du lait de coco, ficelé et cuit à l'étouffée jusqu'à ce que les feuilles épaisses fondent en une texture proche des épinards fondants.",
     en:"Corned beef or stewed beef wrapped in several layers of taro leaves with coconut milk, tied and steam-cooked until the thick leaves melt into a texture close to wilted spinach."
     },
  i:[['corned_beef',400,'g'],['beef_chuck',400,'g'],['taro_leaves',24,'pc'],['coconut_milk',500,'ml'],['onion',2,'pc'],['salt',null,'']],
  s:{fr:["Coupez le bœuf en morceaux, mélangez-le au corned-beef émietté et à l'oignon émincé.","Empilez quatre à cinq feuilles de taro en étoile pour former une large base.","Déposez la farce de viande au centre, repliez les feuilles en un paquet bien serré, ficelez.","Disposez les paquets dans une marmite, couvrez généreusement de lait de coco.","Cuisez à couvert 1h30 à 2 heures à feu doux jusqu'à ce que les feuilles soient bien fondantes, servez chaud avec du riz ou du taro bouilli."],
     en:["Cut the beef into pieces, mix with the crumbled corned beef and sliced onion.","Stack four to five taro leaves in a star shape to form a wide base.","Place the meat filling in the centre, fold the leaves into a tight parcel, tie.","Arrange the parcels in a pot, cover generously with coconut milk.","Cook covered 1h30 to 2 hours over low heat until the leaves are meltingly soft, serve hot with rice or boiled taro."]
     } },

{ id:'bougna', c:'oc', lat:-22.276, lon:166.458, base:8, prep:40, cook:120, diff:2, tags:['festive','slow','sea'],
  art:{v:'leaf',bg:'#26332a',plate:'#4f8f4a',style:'stew',food:['#e0dcc0','#9fb0bc','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Bougna',en:'Bougna'},
  p:{fr:'Nouméa, Nouvelle-Calédonie',en:'Nouméa, New Caledonia'},
  d:{fr:"Le plat de fête kanak : poisson, poulet ou langouste enveloppés avec igname, patate douce et banane plantain dans des feuilles de bananier, arrosés de lait de coco et cuits des heures dans un four creusé en terre chauffé aux pierres volcaniques.",
     en:"The Kanak festive dish: fish, chicken or lobster wrapped with yam, sweet potato and plantain in banana leaves, drenched in coconut milk and cooked for hours in an earthen pit oven heated with volcanic stones."
     },
  i:[['white_fish',600,'g'],['yam',500,'g'],['sweet_potato',400,'g'],['plantain',3,'pc'],['coconut_milk',500,'ml'],['banana_leaf',10,'pc'],['onion',1,'pc'],['salt',null,'']],
  s:{fr:["Épluchez et coupez igname, patate douce et plantain en gros morceaux.","Superposez plusieurs feuilles de bananier pour former une large base solide.","Disposez le poisson et les légumes au centre, arrosez généreusement de lait de coco, salez.","Repliez les feuilles pour bien envelopper le tout en un gros paquet, ficelez solidement.","Cuisez à l'étouffée 2 heures sur des pierres chaudes ou au four très doux, déballez et servez directement dans les feuilles."],
     en:["Peel and chunk the yam, sweet potato and plantain.","Layer several banana leaves to form a wide, sturdy base.","Arrange the fish and vegetables in the centre, drench generously with coconut milk, salt.","Fold the leaves to wrap everything into one large parcel, tie securely.","Steam-cook 2 hours over hot stones or in a very low oven, unwrap and serve straight from the leaves."]
     } }
];
