/* ---------- Spécialités régionales des Amériques approfondies (lot 5) ---------- */
const D25 = [
{ id:'jambalaya', c:'na', lat:29.951, lon:-90.072, base:8, prep:20, cook:45, diff:1, tags:['rice','sea','spicy'],
  art:{v:'pot',bg:'#2f2a20',plate:'#e9dcc0',style:'stew',food:['#c2452c','#e0a83a','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Jambalaya',en:'Jambalaya'},
  p:{fr:'La Nouvelle-Orléans, Louisiane, États-Unis',en:'New Orleans, Louisiana, USA'},
  d:{fr:"Un riz mijoté dans un bouillon coloré à la sainte trinité créole — oignon, céleri, poivron vert — avec andouille fumée et crevettes, héritier des paellas espagnoles et des pilaf africains apportés par des siècles de brassage louisianais.",
     en:"Rice simmered in a broth coloured by the Creole holy trinity — onion, celery, green pepper — with smoked andouille sausage and shrimp, heir to Spanish paellas and African pilafs brought together by centuries of Louisianan mixing."
     },
  i:[['rice',400,'g'],['smoked_sausage',300,'g'],['shrimp',400,'g'],['onion',1,'pc'],['celery',2,'stalk'],['bell_pepper',1,'pc'],['tomato',3,'pc'],['garlic',3,'clove'],['cayenne_pepper',1,'tsp'],['chicken_broth',600,'ml'],['bay_leaf',2,'pc']],
  s:{fr:["Faites revenir la saucisse fumée en rondelles jusqu'à ce qu'elle libère son gras, réservez.","Dans le même fond, faites suer oignon, céleri et poivron vert hachés jusqu'à tendreté.","Ajoutez ail, tomate, cayenne et laurier, faites revenir 2 minutes, remettez la saucisse.","Ajoutez le riz, mouillez de bouillon de poulet, couvrez et laissez cuire 20 minutes à feu doux sans remuer.","Ajoutez les crevettes pour les 5 dernières minutes, mélangez délicatement et servez bien chaud."],
     en:["Fry the sliced smoked sausage until it releases its fat, set aside.","In the same fat, sweat chopped onion, celery and green pepper until tender.","Add garlic, tomato, cayenne and bay leaf, fry 2 minutes, return the sausage.","Add the rice, moisten with chicken broth, cover and cook 20 minutes over low heat without stirring.","Add the shrimp for the last 5 minutes, mix gently and serve piping hot."]
     } },

{ id:'philly-cheesesteak', c:'na', lat:39.952, lon:-75.165, base:2, prep:15, cook:15, diff:1, tags:['street','beef','fry'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'roll',food:['#8a3a24','#e0dcc0','#e0c07a'],garnish:'#7fae6a'},
  n:{fr:'Cheesesteak de Philadelphie',en:'Philly cheesesteak'},
  p:{fr:'Philadelphie, Pennsylvanie, États-Unis',en:'Philadelphia, Pennsylvania, USA'},
  d:{fr:"Du bœuf tranché finement et grillé à la plancha, mélangé à des oignons fondants et noyé de fromage fondu, entassé dans un petit pain moelleux — un sandwich né dans les années 1930 dont chaque habitant défend la version de son quartier.",
     en:"Thinly sliced beef griddled on a flat-top, mingled with softened onions and drowned in melted cheese, piled into a soft roll — a sandwich born in the 1930s whose version every local defends for their own neighbourhood."
     },
  i:[['beef_sirloin',400,'g'],['onion',2,'pc'],['provolone',150,'g'],['hoagie_roll',2,'pc'],['butter',20,'g'],['salt',null,'']],
  s:{fr:["Congelez légèrement le bœuf pour faciliter la découpe, tranchez-le en lamelles très fines.","Faites fondre l'oignon émincé dans le beurre sur une plaque chaude jusqu'à coloration.","Ajoutez le bœuf, faites-le griller rapidement en le hachant à la spatule pendant la cuisson.","Répartissez le fromage sur la viande chaude, laissez fondre en repliant le tout.","Garnissez le pain hoagie fendu de ce mélange fumant et servez immédiatement."],
     en:["Freeze the beef slightly to ease slicing, cut into very thin strips.","Melt the sliced onion in butter on a hot griddle until browned.","Add the beef, grill it quickly, chopping it with a spatula as it cooks.","Scatter the cheese over the hot meat, let it melt as you fold everything together.","Fill the split hoagie roll with this steaming mixture and serve immediately."]
     } },

{ id:'nashville-hot-chicken', c:'na', lat:36.163, lon:-86.782, base:4, prep:20, cook:20, diff:2, tags:['fry','poultry','spicy'],
  art:{v:'plate',bg:'#2a2028',plate:'#e9dcc0',style:'other',food:['#c2452c','#e0c07a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Poulet frit épicé de Nashville',en:'Nashville hot chicken'},
  p:{fr:'Nashville, Tennessee, États-Unis',en:'Nashville, Tennessee, USA'},
  d:{fr:"Un poulet frit à la panure extra-croustillante, badigeonné dès la sortie de la friture d'une pâte de piment de Cayenne et de graisse brûlante, servi sur une tranche de pain blanc avec des cornichons pour absorber le feu.",
     en:"Fried chicken with an extra-crisp coating, brushed straight from the fryer with a scorching paste of cayenne pepper and hot fat, served on a slice of white bread with pickles to soak up the fire."
     },
  i:[['chicken',1,'kg'],['buttermilk',400,'ml'],['flour',300,'g'],['cayenne_pepper',3,'tbsp'],['brown_sugar',2,'tbsp'],['paprika',1,'tbsp'],['white_bread',4,'slice'],['pickles',80,'g'],['frying_oil',1,'l']],
  s:{fr:["Faites mariner les morceaux de poulet dans le babeurre au moins 4 heures, idéalement toute une nuit.","Égouttez, passez dans la farine assaisonnée de sel et poivre en pressant bien pour faire adhérer.","Faites frire à 175 °C 15 à 18 minutes jusqu'à doré foncé et croustillant, en retournant à mi-cuisson.","Mélangez cayenne, sucre roux, paprika et un peu d'huile de friture brûlante en une pâte épaisse.","Badigeonnez généreusement le poulet encore chaud de cette pâte, servez sur pain blanc avec des cornichons."],
     en:["Marinate the chicken pieces in buttermilk at least 4 hours, ideally overnight.","Drain, dredge in flour seasoned with salt and pepper, pressing well to adhere.","Fry at 175°C for 15 to 18 minutes until deep golden and crisp, turning halfway.","Mix cayenne, brown sugar, paprika and a little scalding frying oil into a thick paste.","Generously brush the still-hot chicken with this paste, serve on white bread with pickles."]
     } },

{ id:'kalua-pig-laulau', c:'na', lat:21.307, lon:-157.858, base:8, prep:60, cook:240, diff:2, tags:['bake','pork','festive'],
  art:{v:'plate',bg:'#26332a',plate:'#e9dcc0',style:'other',food:['#8a3a24','#4f8f4a','#e0c07a'],garnish:'#6fbf8f'},
  n:{fr:'Kalua pig et laulau',en:'Kalua pig and laulau'},
  p:{fr:'Honolulu, Hawaï, États-Unis',en:'Honolulu, Hawaii, USA'},
  d:{fr:"Un porc entier enseveli des heures dans un four souterrain d'imu chauffé aux pierres volcaniques, s'effilochant fumé et salé, servi aux côtés de laulau — porc et poisson enveloppés de feuilles de taro cuites à l'étouffée — pièce maîtresse du festin luau.",
     en:"A whole pig buried for hours in an underground imu oven heated with volcanic stones, emerging smoky, salty and falling apart, served alongside laulau — pork and fish wrapped in steamed taro leaves — the centrepiece of the luau feast."
     },
  i:[['pork_shoulder',2,'kg'],['sea_salt',3,'tbsp'],['taro_leaves',12,'pc'],['white_fish',300,'g'],['banana_leaves',6,'pc'],['liquid_smoke',2,'tbsp']],
  s:{fr:["Frottez généreusement l'épaule de porc de sel marin et de fumée liquide pour imiter la saveur de l'imu.","Enveloppez-la de feuilles de bananier, enfournez à basse température 190 °C pendant 5 heures jusqu'à ce qu'elle s'effiloche.","Pour le laulau, enveloppez des morceaux de porc et de poisson dans plusieurs feuilles de taro, puis dans une feuille de bananier.","Cuisez les paquets de laulau à la vapeur 3 heures jusqu'à ce que les feuilles de taro soient fondantes et non irritantes.","Effilochez le porc à la fourchette, servez avec les paquets de laulau ouverts à table."],
     en:["Rub the pork shoulder generously with sea salt and liquid smoke to mimic the imu flavour.","Wrap in banana leaves, bake at a low 190°C for 5 hours until it falls apart.","For the laulau, wrap pieces of pork and fish in several taro leaves, then in a banana leaf.","Steam the laulau parcels 3 hours until the taro leaves are meltingly soft and no longer irritating.","Shred the pork with a fork, serve with the laulau parcels opened at the table."]
     } },

{ id:'new-mexico-green-chile-stew', c:'na', lat:35.687, lon:-105.938, base:6, prep:20, cook:60, diff:1, tags:['stew','pork','spicy'],
  art:{v:'bowl',bg:'#26332a',plate:'#e9dcc0',style:'stew',food:['#4f8f4a','#e0c07a','#c9924a'],garnish:'#6fbf8f'},
  n:{fr:'Ragoût de piment vert du Nouveau-Mexique',en:'New Mexico green chile stew'},
  p:{fr:'Santa Fe, Nouveau-Mexique, États-Unis',en:'Santa Fe, New Mexico, USA'},
  d:{fr:"Un ragoût de porc et de pomme de terre porté par les piments verts de Hatch, grillés jusqu'à noircir puis pelés à la main, dont le parfum fumé et terreux distingue la cuisine du Nouveau-Mexique de tout le reste du Sud-Ouest américain.",
     en:"A pork and potato stew carried by Hatch green chiles, roasted until blackened then peeled by hand, whose smoky, earthy flavour sets New Mexican cooking apart from the rest of the American Southwest."
     },
  i:[['pork_shoulder',700,'g'],['green_chili',10,'pc'],['potato',4,'pc'],['onion',1,'pc'],['garlic',3,'clove'],['cumin',1,'tsp'],['chicken_broth',800,'ml'],['oregano',1,'tsp']],
  s:{fr:["Grillez les piments verts sur une flamme nue ou au four jusqu'à ce que la peau noircisse entièrement.","Enfermez-les dans un sac plastique 10 minutes puis pelez, épépinez et hachez-les.","Faites dorer le porc coupé en cubes avec oignon, ail et cumin dans une cocotte.","Ajoutez les piments hachés, la pomme de terre en dés et le bouillon, portez à ébullition.","Laissez mijoter 45 minutes à couvert jusqu'à ce que le porc soit fondant, assaisonnez d'origan et servez avec des tortillas."],
     en:["Roast the green chiles over an open flame or in the oven until the skin is fully blackened.","Seal them in a plastic bag 10 minutes then peel, seed and chop.","Brown the cubed pork with onion, garlic and cumin in a pot.","Add the chopped chiles, diced potato and broth, bring to the boil.","Simmer 45 minutes covered until the pork is tender, season with oregano and serve with tortillas."]
     } },

{ id:'cochinita-pibil', c:'na', lat:20.967, lon:-89.624, base:8, prep:40, cook:240, diff:2, tags:['bake','pork','festive'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'other',food:['#c2452c','#e0a83a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Cochinita pibil',en:'Cochinita pibil'},
  p:{fr:'Mérida, Yucatán, Mexique',en:'Mérida, Yucatán, Mexico'},
  d:{fr:"Un porc mariné à l'achiote qui le teinte d'un rouge profond, enveloppé de feuilles de bananier et cuit à l'origine dans un four enterré appelé pib, hérité des Mayas, s'effilochant tendre et parfumé d'agrumes amers.",
     en:"Pork marinated in achiote that dyes it deep red, wrapped in banana leaves and originally cooked in a buried pit oven called a pib, inherited from the Maya, emerging tender and fragrant with bitter citrus."
     },
  i:[['pork_shoulder',1.5,'kg'],['achiote_paste',100,'g'],['sour_orange',200,'ml'],['garlic',4,'clove'],['banana_leaves',6,'pc'],['red_onion',2,'pc'],['habanero',2,'pc']],
  s:{fr:["Diluez la pâte d'achiote dans le jus d'orange amère et l'ail écrasé jusqu'à obtenir une marinade lisse.","Enrobez généreusement le porc de cette marinade, laissez reposer au moins 4 heures ou toute une nuit.","Enveloppez le porc mariné dans des feuilles de bananier passées à la flamme pour les assouplir.","Enfournez le paquet 4 heures à 150 °C jusqu'à ce que la viande s'effiloche facilement.","Effilochez le porc, servez avec de l'oignon rouge mariné au vinaigre et à l'habanero, avec des tortillas."],
     en:["Dilute the achiote paste in sour orange juice and crushed garlic into a smooth marinade.","Coat the pork generously with this marinade, let rest at least 4 hours or overnight.","Wrap the marinated pork in banana leaves passed over a flame to soften them.","Bake the parcel 4 hours at 150°C until the meat shreds easily.","Shred the pork, serve with red onion pickled in vinegar and habanero, with tortillas."]
     } },

{ id:'mole-negro', c:'na', lat:17.073, lon:-96.726, base:8, prep:60, cook:120, diff:3, tags:['poultry','festive','spicy'],
  art:{v:'plate',bg:'#2a2028',plate:'#e9dcc0',style:'stew',food:['#3a2015','#8a3a24','#e0a83a'],garnish:'#c9924a'},
  n:{fr:'Mole negro',en:'Mole negro'},
  p:{fr:'Oaxaca, Mexique',en:'Oaxaca, Mexico'},
  d:{fr:"Une sauce presque noire mêlant des piments chilhuacle grillés jusqu'à l'amertume, du chocolat, des épices et des fruits secs, réduite des heures en une pâte complexe qui nappe le poulet — la plus élaborée des sept moles d'Oaxaca.",
     en:"An almost-black sauce blending chilhuacle chiles roasted to bitterness, chocolate, spices and dried fruit, reduced for hours into a complex paste that coats the chicken — the most elaborate of Oaxaca's seven moles."
     },
  i:[['dried_chili',8,'pc'],['dark_chocolate',60,'g'],['almonds',40,'g'],['raisins',30,'g'],['sesame_seeds',3,'tbsp'],['tomato',2,'pc'],['tortilla',1,'pc'],['cinnamon',1,'stick'],['chicken',1.2,'kg'],['chicken_broth',600,'ml']],
  s:{fr:["Faites griller les piments séchés à sec jusqu'à ce qu'ils soient presque noirs et cassants, faites-les tremper dans l'eau chaude.","Faites griller de même amandes, raisins secs, sésame et une tortilla déchirée jusqu'à coloration.","Mixez piments égouttés, fruits secs grillés, tomate et cannelle avec un peu de bouillon en une pâte lisse.","Faites revenir la pâte dans une cocotte 20 minutes en remuant sans cesse pour éviter qu'elle n'attache, ajoutez le chocolat et le reste du bouillon.","Laissez mijoter le poulet dans cette sauce 40 minutes jusqu'à ce qu'il soit tendre et la sauce épaisse et brillante."],
     en:["Dry-roast the dried chiles until nearly black and brittle, soak in hot water.","Likewise roast almonds, raisins, sesame and a torn tortilla until browned.","Blend the drained chiles, roasted dried fruit, tomato and cinnamon with a little broth into a smooth paste.","Fry the paste in a pot 20 minutes, stirring constantly to prevent sticking, add the chocolate and remaining broth.","Simmer the chicken in this sauce 40 minutes until tender and the sauce is thick and glossy."]
     } },

{ id:'huachinango-veracruzana', c:'na', lat:19.173, lon:-96.134, base:4, prep:20, cook:25, diff:1, tags:['sea','stew','fresh'],
  art:{v:'plate',bg:'#26333c',plate:'#e9dcc0',style:'stew',food:['#c2452c','#4f8f4a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Huachinango a la veracruzana',en:'Huachinango a la veracruzana'},
  p:{fr:'Veracruz, Mexique',en:'Veracruz, Mexico'},
  d:{fr:"Un vivaneau entier braisé dans une sauce tomate parsemée d'olives vertes, câpres et piments jalapeño en tranches, héritage direct des influences espagnole, arabe et caribéenne convergeant dans le premier port colonial du Mexique.",
     en:"A whole red snapper braised in a tomato sauce scattered with green olives, capers and sliced jalapeño peppers, a direct legacy of Spanish, Arab and Caribbean influences converging in Mexico's first colonial port."
     },
  i:[['red_snapper',1.2,'kg'],['tomato',5,'pc'],['green_olives',80,'g'],['capers',30,'g'],['jalapeno',2,'pc'],['onion',1,'pc'],['garlic',3,'clove'],['bay_leaf',2,'pc'],['olive_oil',60,'ml']],
  s:{fr:["Faites suer oignon et ail hachés dans l'huile d'olive jusqu'à translucides.","Ajoutez la tomate concassée et le laurier, laissez mijoter 15 minutes jusqu'à réduction.","Ajoutez olives vertes, câpres et jalapeño en rondelles, laissez mijoter encore 5 minutes.","Déposez le poisson entier dans la sauce, couvrez et laissez cuire 15 minutes en arrosant régulièrement.","Vérifiez que la chair se détache facilement à la fourchette et servez le poisson nappé de sa sauce."],
     en:["Sweat chopped onion and garlic in olive oil until translucent.","Add crushed tomato and bay leaf, simmer 15 minutes until reduced.","Add green olives, capers and sliced jalapeño, simmer another 5 minutes.","Place the whole fish in the sauce, cover and cook 15 minutes, basting regularly.","Check the flesh flakes easily with a fork and serve the fish coated in its sauce."]
     } },

{ id:'feijao-tropeiro', c:'sa', lat:-19.917, lon:-43.935, base:6, prep:20, cook:40, diff:1, tags:['legume','comfort','pork'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'stew',food:['#8a3a24','#e0c07a','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Feijão tropeiro',en:'Feijão tropeiro'},
  p:{fr:'Belo Horizonte, Minas Gerais, Brésil',en:'Belo Horizonte, Minas Gerais, Brazil'},
  d:{fr:"Des haricots noirs égouttés puis sautés avec farine de manioc, lard, saucisse, chou vert et œuf brouillé, plat robuste né des muletiers tropeiros qui traversaient le Minas Gerais avec des provisions se conservant des semaines.",
     en:"Drained black beans then fried with cassava flour, bacon, sausage, collard greens and scrambled egg, a hearty dish born from the tropeiro mule drivers who crossed Minas Gerais with provisions that kept for weeks."
     },
  i:[['black_beans',400,'g'],['cassava_flour',150,'g'],['smoked_bacon',150,'g'],['sausage',200,'g'],['collard_greens',200,'g'],['egg',3,'pc'],['garlic',3,'clove'],['onion',1,'pc']],
  s:{fr:["Faites cuire les haricots noirs à l'eau jusqu'à tendreté, égouttez-les en réservant un peu de leur eau.","Faites revenir lard et saucisse en dés jusqu'à croustillants, ajoutez oignon et ail.","Ajoutez les haricots égouttés, mélangez à feu vif quelques minutes.","Incorporez progressivement la farine de manioc en remuant pour l'enrober sans faire de grumeaux.","Ajoutez le chou vert émincé et l'œuf brouillé à part, mélangez le tout et servez chaud."],
     en:["Boil the black beans until tender, drain reserving a little of their water.","Fry bacon and diced sausage until crisp, add onion and garlic.","Add the drained beans, mix over high heat a few minutes.","Gradually stir in the cassava flour, stirring to coat without lumps.","Add the shredded collard greens and separately scrambled egg, mix everything together and serve hot."]
     } },

{ id:'acaraje', c:'sa', lat:-12.971, lon:-38.511, base:8, prep:60, cook:20, diff:2, tags:['street','fry','legume'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'other',food:['#e0a83a','#c2452c','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Acarajé',en:'Acarajé'},
  p:{fr:'Salvador de Bahia, Brésil',en:'Salvador, Bahia, Brazil'},
  d:{fr:"Des boulettes de haricots à œil noir décortiqués, moulus et frits dans l'huile de palme rouge dendê jusqu'à former une croûte dorée, fendues et garnies de vatapá et de crevettes séchées, vendues par les baianas en robe blanche des rues de Salvador.",
     en:"Fritters of shelled black-eyed peas, ground and fried in red dendê palm oil until forming a golden crust, split open and filled with vatapá and dried shrimp, sold by white-robed baianas on Salvador's streets."
     },
  i:[['black_eyed_peas',400,'g'],['onion',1,'pc'],['palm_oil',500,'ml'],['dried_shrimp',100,'g'],['bell_pepper',1,'pc'],['ginger',10,'g'],['salt',null,'']],
  s:{fr:["Faites tremper les haricots à œil noir toute une nuit, frottez-les entre les mains pour ôter les peaux.","Mixez les haricots décortiqués avec oignon et un peu d'eau jusqu'à obtenir une pâte lisse et aérée.","Battez la pâte vigoureusement à la cuillère plusieurs minutes pour l'incorporer d'air.","Formez des boulettes ovales à la cuillère, faites-les frire dans l'huile de dendê bouillante jusqu'à dorées.","Fendez chaque acarajé chaud, garnissez de vatapá et de crevettes séchées, servez immédiatement."],
     en:["Soak the black-eyed peas overnight, rub between your hands to remove the skins.","Blend the shelled peas with onion and a little water into a smooth, airy paste.","Beat the paste vigorously with a spoon for several minutes to incorporate air.","Shape oval fritters with a spoon, fry in boiling dendê oil until golden.","Split each hot acarajé open, fill with vatapá and dried shrimp, serve immediately."]
     } },

{ id:'tacaca', c:'sa', lat:-3.119, lon:-60.022, base:6, prep:30, cook:30, diff:2, tags:['soup','sea','spicy'],
  art:{v:'bowl',bg:'#26332a',plate:'#e9dcc0',style:'soup',food:['#4f8f4a','#e0a83a','#c2452c'],garnish:'#6fbf8f'},
  n:{fr:'Tacacá',en:'Tacacá'},
  p:{fr:'Manaus, Amazonas, Brésil',en:'Manaus, Amazonas, Brazil'},
  d:{fr:"Un bouillon jaune vif de tucupi, jus de manioc amer fermenté et bouilli pour ôter sa toxicité, épaissi de feuilles de jambu qui engourdissent picotant la langue, garni de crevettes séchées, servi brûlant dans des cuias creusées dans une courge amazonienne.",
     en:"A bright yellow broth of tucupi, bitter cassava juice fermented and boiled to remove its toxicity, thickened with jambu leaves that tingle and numb the tongue, garnished with dried shrimp, served scalding in cuias gourds hollowed from an Amazonian squash."
     },
  i:[['tucupi',1,'l'],['jambu_leaves',80,'g'],['dried_shrimp',150,'g'],['garlic',2,'clove'],['cassava_starch',60,'g'],['salt',null,'']],
  s:{fr:["Faites bouillir le tucupi avec ail écrasé pendant 30 minutes pour bien le purger de sa toxicité résiduelle.","Faites blanchir séparément les feuilles de jambu dans l'eau bouillante 5 minutes.","Délayez un peu de fécule de manioc dans de l'eau froide, incorporez-la au tucupi bouillant pour l'épaissir légèrement.","Réhydratez les crevettes séchées dans un peu d'eau chaude.","Servez le tucupi brûlant dans un bol creux avec feuilles de jambu et crevettes séchées disposées par-dessus."],
     en:["Boil the tucupi with crushed garlic for 30 minutes to fully purge its residual toxicity.","Separately blanch the jambu leaves in boiling water 5 minutes.","Dissolve a little cassava starch in cold water, stir into the boiling tucupi to lightly thicken it.","Rehydrate the dried shrimp in a little hot water.","Serve the scalding tucupi in a deep bowl with jambu leaves and dried shrimp arranged on top."]
     } },

{ id:'lomo-saltado', c:'sa', lat:-12.046, lon:-77.043, base:4, prep:15, cook:15, diff:1, tags:['beef','fry','rice'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'stew',food:['#8a3a24','#c2452c','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Lomo saltado',en:'Lomo saltado'},
  p:{fr:'Lima, Pérou',en:'Lima, Peru'},
  d:{fr:"Du bœuf sauté vivement au wok avec oignon rouge et tomate, arrosé de sauce soja, servi à la fois avec frites et riz sur la même assiette — le plat chifa le plus emblématique né de la rencontre entre immigrants cantonais et cuisine andine.",
     en:"Beef quickly stir-fried in a wok with red onion and tomato, splashed with soy sauce, served with both fries and rice on the same plate — the most emblematic chifa dish born from the meeting of Cantonese immigrants and Andean cooking."
     },
  i:[['beef_sirloin',500,'g'],['red_onion',2,'pc'],['tomato',2,'pc'],['soy_sauce',3,'tbsp'],['red_wine_vinegar',1,'tbsp'],['potato',3,'pc'],['rice',300,'g'],['cilantro',1,'bunch'],['frying_oil',500,'ml']],
  s:{fr:["Coupez les pommes de terre en frites, faites-les frire jusqu'à dorées et croustillantes, réservez.","Coupez le bœuf en lanières épaisses, faites-le saisir très vivement dans un wok brûlant.","Ajoutez oignon rouge en quartiers et tomate en quartiers, sautez encore 2 minutes à feu maximal.","Déglacez de sauce soja et de vinaigre, secouez le wok pour bien enrober sans laisser rendre trop de jus.","Ajoutez les frites en fin de cuisson pour qu'elles restent croustillantes, parsemez de coriandre et servez avec du riz blanc."],
     en:["Cut the potatoes into fries, fry until golden and crisp, set aside.","Cut the beef into thick strips, sear very quickly in a scorching wok.","Add red onion and tomato in wedges, stir-fry another 2 minutes over maximum heat.","Deglaze with soy sauce and vinegar, shake the wok to coat well without releasing too much juice.","Add the fries at the end of cooking so they stay crisp, scatter with coriander and serve with white rice."]
     } },

{ id:'anticuchos', c:'sa', lat:-13.532, lon:-71.967, base:4, prep:60, cook:15, diff:1, tags:['grill','beef','street'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'skewer',food:['#8a3a24','#c2452c','#e0a83a'],garnish:'#7fae6a'},
  n:{fr:'Anticuchos',en:'Anticuchos'},
  p:{fr:'Cusco, Pérou',en:'Cusco, Peru'},
  d:{fr:"Des brochettes de cœur de bœuf mariné à la pâte de piment aji panca, au cumin et au vinaigre, grillées sur des braises jusqu'à peine caramélisées à l'extérieur en restant tendres à l'intérieur, tradition inca perpétuée sur les braseros des rues péruviennes.",
     en:"Skewers of beef heart marinated in aji panca chili paste, cumin and vinegar, grilled over embers until just caramelised outside while staying tender within, an Incan tradition kept alive on Peruvian street braziers."
     },
  i:[['beef_heart',600,'g'],['aji_panca_paste',80,'g'],['red_wine_vinegar',60,'ml'],['cumin',1,'tbsp'],['garlic',4,'clove'],['frying_oil',3,'tbsp'],['salt',null,'']],
  s:{fr:["Parez le cœur de bœuf en ôtant nerfs et membranes, coupez-le en cubes réguliers.","Mélangez pâte d'aji panca, vinaigre, cumin et ail écrasé en une marinade épaisse.","Enrobez les cubes de cœur de cette marinade, laissez reposer au moins 4 heures au frais.","Enfilez les cubes sur des piques de bois, badigeonnez d'un peu d'huile.","Grillez sur des braises vives 3 à 4 minutes de chaque côté en badigeonnant de marinade, servez immédiatement bien chaud."],
     en:["Trim the beef heart, removing sinew and membrane, cut into even cubes.","Mix aji panca paste, vinegar, cumin and crushed garlic into a thick marinade.","Coat the heart cubes with this marinade, let rest at least 4 hours chilled.","Thread the cubes onto wooden skewers, brush with a little oil.","Grill over hot embers 3 to 4 minutes per side, basting with marinade, serve immediately piping hot."]
     } },

{ id:'empanadas-saltenas', c:'sa', lat:-24.789, lon:-65.410, base:12, prep:60, cook:25, diff:2, tags:['bake','beef','street'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'roll',food:['#e0c07a','#8a3a24','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Empanadas salteñas',en:'Empanadas salteñas'},
  p:{fr:'Salta, Argentine',en:'Salta, Argentina'},
  d:{fr:"De petits chaussons de pâte pliés en tresse serrée, farcis de bœuf haché au couteau, œuf dur, olive et cumin, cuits au four à bois, spécialité du nord-ouest argentin où chaque province revendique jalousement sa propre recette.",
     en:"Small pastry turnovers folded into a tight braided edge, stuffed with knife-chopped beef, hard-boiled egg, olive and cumin, baked in a wood oven, a speciality of northwestern Argentina where every province jealously claims its own recipe."
     },
  i:[['flour',500,'g'],['butter',150,'g'],['ground_beef',400,'g'],['onion',2,'pc'],['egg',3,'pc'],['green_olives',60,'g'],['cumin',1,'tsp'],['paprika',1,'tsp'],['beef_broth',150,'ml']],
  s:{fr:["Pétrissez farine, beurre fondu, eau tiède et sel en une pâte souple, laissez reposer 30 minutes.","Faites revenir l'oignon très finement haché avec cumin et paprika jusqu'à fondant, ajoutez le bœuf haché au couteau.","Mouillez d'un peu de bouillon pour garder la farce juteuse, laissez tiédir puis incorporez œuf dur haché et olives.","Étalez la pâte, découpez des cercles, garnissez de farce et refermez en pinçant les bords en tresse serrée.","Enfournez 20 minutes à 200 °C jusqu'à dorées, servez chaudes."],
     en:["Knead flour, melted butter, warm water and salt into a supple dough, rest 30 minutes.","Fry the very finely chopped onion with cumin and paprika until soft, add the knife-chopped beef.","Moisten with a little broth to keep the filling juicy, let cool then stir in chopped hard-boiled egg and olives.","Roll out the dough, cut circles, fill with the mixture and close, pinching the edges into a tight braid.","Bake 20 minutes at 200°C until golden, serve hot."]
     } },

{ id:'ajiaco-bogotano', c:'sa', lat:4.711, lon:-74.072, base:6, prep:30, cook:50, diff:2, tags:['soup','poultry','comfort'],
  art:{v:'bowl',bg:'#26332a',plate:'#e9dcc0',style:'soup',food:['#e0c07a','#4f8f4a','#e0dcc0'],garnish:'#6fbf8f'},
  n:{fr:'Ajiaco bogotano',en:'Ajiaco bogotano'},
  p:{fr:'Bogotá, Colombie',en:'Bogotá, Colombia'},
  d:{fr:"Une soupe de poulet épaissie par trois variétés de pommes de terre andines qui se délitent à différentes vitesses, parfumée à la guasca, herbe locale introuvable ailleurs, servie avec crème fraîche, câpres et un demi-épi de maïs.",
     en:"A chicken soup thickened by three varieties of Andean potato that break down at different speeds, scented with guasca, a local herb found nowhere else, served with sour cream, capers and half a corn cob."
     },
  i:[['chicken',1,'kg'],['potato',6,'pc'],['corn',3,'pc'],['guasca_herb',30,'g'],['sour_cream',150,'ml'],['capers',60,'g'],['onion',1,'pc'],['garlic',2,'clove'],['chicken_broth',1.5,'l']],
  s:{fr:["Faites pocher le poulet entier dans le bouillon avec oignon et ail 40 minutes jusqu'à tendre, effilochez la viande et réservez le bouillon.","Épluchez les trois variétés de pommes de terre, coupez-les en morceaux de tailles différentes selon leur capacité à se déliter.","Faites cuire les pommes de terre dans le bouillon 25 minutes en remuant, certaines se dissolvant pour épaissir la soupe.","Ajoutez le poulet effiloché et les épis de maïs coupés en tronçons, laissez mijoter 10 minutes.","Ajoutez la guasca en fin de cuisson, servez avec crème fraîche, câpres et un morceau de maïs par bol."],
     en:["Poach the whole chicken in the broth with onion and garlic 40 minutes until tender, shred the meat and reserve the broth.","Peel the three potato varieties, cut into pieces of different sizes according to how readily each breaks down.","Cook the potatoes in the broth 25 minutes, stirring, some dissolving to thicken the soup.","Add the shredded chicken and the corn cobs cut into chunks, simmer 10 minutes.","Add the guasca at the end of cooking, serve with sour cream, capers and a piece of corn per bowl."]
     } }
];
