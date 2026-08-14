/* ---------- Amérique du Nord & Caraïbes ---------- */
const D6 = [
{ id:'tacos-al-pastor', c:'na', lat:19.433, lon:-99.133, base:4, prep:180, cook:20, diff:2, tags:['street','pork','spicy'],
  art:{v:'plate',bg:'#2f3a26',plate:'#f2ece0',style:'roll',food:['#e0b45c','#c2452c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Tacos al pastor',en:'Tacos al pastor'},
  p:{fr:'Mexico, Mexique',en:'Mexico City, Mexico'},
  d:{fr:"Le shawarma libanais transposé au porc et au piment par les migrants arrivés à Puebla dans les années 1920. Le trompo tourne devant la flamme et le taquero tranche la viande d'un geste, en faisant sauter l'ananas dans la tortilla.",
     en:"Lebanese shawarma reinvented with pork and chilli by migrants who reached Puebla in the 1920s. The trompo turns before the flame and the taquero flicks the meat — and a piece of pineapple — into the tortilla."
     },
  i:[['pork_shoulder',1,'kg'],['guajillo_chili',6,'pc'],['achiote_paste',50,'g'],['pineapple',1,'pc'],['white_vinegar',80,'ml'],['garlic',5,'clove'],['cumin',1,'tsp'],['oregano',1,'tsp'],['corn_tortillas',16,'pc'],['white_onion',1,'pc'],['cilantro',1,'bunch'],['lime',3,'pc'],['salt',null,'']],
  s:{fr:["Réhydratez les piments 20 minutes puis mixez-les avec achiote, vinaigre, ail et épices.","Taillez le porc en tranches fines et marinez-les 3 heures au minimum dans cette pâte rouge.","Empilez les tranches en alternant avec des rondelles d'ananas, puis rôtissez 1 heure à 200 °C.","Tranchez finement la viande rôtie et saisissez-la sur une plancha brûlante.","Servez sur des tortillas de maïs chaudes avec oignon, coriandre, ananas grillé et citron vert."],
     en:["Rehydrate the chillies for 20 minutes, then blend with achiote, vinegar, garlic and spices.","Slice the pork thinly and marinate at least 3 hours in this red paste.","Stack the slices alternating with pineapple rings, then roast 1 hour at 200°C.","Shave the roasted meat thinly and sear it on a scorching griddle.","Serve on warm corn tortillas with onion, coriander, grilled pineapple and lime."]
     } },

{ id:'mole-poblano', c:'na', lat:19.041, lon:-98.206, base:8, prep:90, cook:120, diff:3, tags:['slow','festive','poultry'],
  art:{v:'plate',bg:'#2e2622',plate:'#f2ece0',style:'stew',food:['#4a2a20','#6b3b28','#e8dcc0','#8a4a2a'],garnish:'#7fae6a'},
  n:{fr:'Mole poblano',en:'Mole poblano'},
  p:{fr:'Puebla, Mexique',en:'Puebla, Mexico'},
  d:{fr:"Une sauce presque noire qui rassemble plus de vingt ingrédients, dont quatre piments séchés et une pointe de chocolat. La légende veut qu'une religieuse de Puebla l'ait improvisée pour un archevêque de passage.",
     en:"An almost black sauce bringing together more than twenty ingredients, four dried chillies and a whisper of chocolate among them. Legend has a Puebla nun improvising it for a visiting archbishop."
     },
  i:[['chicken',2,'kg'],['ancho_chili',6,'pc'],['pasilla_chili',4,'pc'],['mulato_chili',4,'pc'],['chipotle',2,'pc'],['almonds',80,'g'],['peanuts',60,'g'],['raisins',60,'g'],['sesame_seeds',60,'g'],['dark_chocolate',60,'g'],['corn_tortillas',2,'pc'],['cinnamon',1,'stick'],['cloves',4,'pc'],['tomato',3,'pc'],['lard',80,'g'],['chicken_broth',1.5,'l'],['salt',null,'']],
  s:{fr:["Faites griller les piments à sec sans les brûler, épépinez-les et faites-les tremper 30 minutes.","Faites frire séparément amandes, cacahuètes, raisins, sésame, tortilla et épices dans le saindoux.","Mixez tous les éléments avec les tomates et un peu de bouillon, en plusieurs fois, jusqu'à obtenir une pâte très lisse.","Faites frire cette pâte dans le saindoux 20 minutes en remuant sans cesse, puis détendez au bouillon.","Ajoutez le chocolat, laissez mijoter 1 heure et servez sur le poulet poché, avec du sésame torréfié."],
     en:["Toast the chillies dry without scorching them, seed them and soak 30 minutes.","Separately fry almonds, peanuts, raisins, sesame, tortilla and spices in the lard.","Blend everything with the tomatoes and some broth, in batches, to a very smooth paste.","Fry the paste in lard for 20 minutes, stirring constantly, then loosen with broth.","Add the chocolate, simmer 1 hour and serve over poached chicken with toasted sesame."]
     } },

{ id:'ropa-vieja', c:'na', lat:23.113, lon:-82.366, base:6, prep:25, cook:150, diff:1, tags:['slow','beef','comfort'],
  art:{v:'plate',bg:'#2c3a3a',plate:'#f2ece0',style:'stew',food:['#a85f34','#c2542c','#e8b04b','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Ropa vieja',en:'Ropa vieja'},
  p:{fr:'La Havane, Cuba',en:'Havana, Cuba'},
  d:{fr:"« Vieux vêtements » : la viande, effilochée après des heures de cuisson, ressemble à des tissus déchirés. Le sofrito de poivrons, de cumin et d'olives en fait un plat de dimanche cubain par excellence.",
     en:"\"Old clothes\": the beef, shredded after hours of cooking, looks like torn rags. The sofrito of peppers, cumin and olives makes it the Cuban Sunday dish par excellence."
     },
  i:[['flank_steak',1,'kg'],['onion',2,'pc'],['red_pepper',2,'pc'],['green_pepper',1,'pc'],['garlic',6,'clove'],['tomato_puree',400,'g'],['white_wine',150,'ml'],['cumin',2,'tsp'],['oregano',1,'tsp'],['bay_leaf',2,'pc'],['green_olives',80,'g'],['olive_oil',4,'tbsp'],['rice',400,'g'],['salt',null,'']],
  s:{fr:["Faites cuire la viande 2 heures dans un bouillon aromatisé, jusqu'à ce qu'elle se défasse.","Effilochez-la à la fourchette dans le sens des fibres et réservez le bouillon.","Préparez le sofrito : oignon, poivrons et ail longuement fondus dans l'huile d'olive.","Ajoutez tomate, vin, cumin, origan et laurier, laissez réduire 15 minutes.","Incorporez la viande effilochée et un peu de bouillon, mijotez 30 minutes, ajoutez les olives et servez avec du riz."],
     en:["Simmer the beef 2 hours in an aromatic broth until it falls apart.","Shred it with a fork along the grain and keep the broth.","Make the sofrito: onion, peppers and garlic melted slowly in olive oil.","Add tomato, wine, cumin, oregano and bay and reduce for 15 minutes.","Stir in the shredded beef and a little broth, simmer 30 minutes, add the olives and serve with rice."]
     } },

{ id:'jerk-chicken', c:'na', lat:17.971, lon:-76.793, base:4, prep:720, cook:60, diff:1, tags:['grill','spicy','poultry'],
  art:{v:'board',bg:'#2a3326',plate:'#e9dcc0',style:'grill',food:['#6b3b28','#8a4a2a','#a85f34'],garnish:'#6fbf8f'},
  n:{fr:'Poulet jerk',en:'Jerk chicken'},
  p:{fr:'Kingston, Jamaïque',en:'Kingston, Jamaica'},
  d:{fr:"Une technique héritée des Marrons, qui fumaient la viande sur du bois de piment pour la conserver dans les montagnes. Le piment scotch bonnet et le piment de la Jamaïque forment une marinade brûlante et parfumée.",
     en:"A technique inherited from the Maroons, who smoked meat over pimento wood to preserve it in the mountains. Scotch bonnet and allspice make a marinade that is fiery and deeply aromatic at once."
     },
  i:[['chicken',1.5,'kg'],['scotch_bonnet',3,'pc'],['allspice',2,'tbsp'],['spring_onion',6,'pc'],['thyme',6,'sprig'],['ginger',30,'g'],['garlic',6,'clove'],['soy_sauce',60,'ml'],['brown_sugar',2,'tbsp'],['lime',2,'pc'],['nutmeg',1,'pinch'],['cinnamon',1,'tsp']],
  s:{fr:["Mixez tous les aromates en une marinade épaisse, en dosant le piment selon votre courage.","Entaillez le poulet jusqu'à l'os et massez-le avec la marinade ; laissez reposer 12 heures.","Préparez un feu indirect avec des copeaux de bois humides pour la fumée.","Cuisez le poulet côté peau vers le haut, à couvert, pendant 45 minutes.","Terminez au-dessus des braises 10 minutes pour caraméliser, et servez avec du riz aux haricots rouges."],
     en:["Blend all the aromatics into a thick marinade, dosing the chilli according to your courage.","Score the chicken to the bone and massage the marinade in; rest 12 hours.","Set up an indirect fire with soaked wood chips for smoke.","Cook the chicken skin side up, covered, for 45 minutes.","Finish over the coals for 10 minutes to caramelise and serve with rice and peas."]
     } },

{ id:'gumbo', c:'na', lat:29.951, lon:-90.072, base:6, prep:40, cook:120, diff:2, tags:['slow','sea','soup'],
  art:{v:'bowl',bg:'#2e2a22',plate:'#f2ece0',style:'stew',food:['#6b3b20','#8a4a2a','#e0b45c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Gumbo',en:'Gumbo'},
  p:{fr:'La Nouvelle-Orléans, États-Unis',en:'New Orleans, United States'},
  d:{fr:"Le plat créole où se rencontrent l'Afrique, la France et les Choctaws : un roux brun cuit jusqu'à la couleur du chocolat, du gombo, et la « sainte trinité » d'oignon, céleri et poivron. Il se sert sur un dôme de riz.",
     en:"The creole dish where Africa, France and the Choctaw meet: a roux cooked to the colour of chocolate, okra, and the holy trinity of onion, celery and pepper. It is served over a mound of rice."
     },
  i:[['flour',120,'g'],['frying_oil',120,'ml'],['onion',2,'pc'],['celery',3,'pc'],['green_pepper',1,'pc'],['andouille',300,'g'],['shrimp',500,'g'],['okra',250,'g'],['chicken_broth',1.5,'l'],['garlic',4,'clove'],['cayenne',1,'tsp'],['thyme',1,'tsp'],['bay_leaf',2,'pc'],['rice',400,'g'],['salt',null,'']],
  s:{fr:["Préparez le roux : farine et huile à feu moyen, en remuant sans arrêt 30 à 40 minutes jusqu'à la couleur du chocolat.","Jetez-y la trinité hachée d'un coup : elle stoppe la cuisson du roux.","Ajoutez la saucisse, l'ail et les épices, puis mouillez progressivement avec le bouillon chaud.","Laissez mijoter 1 heure à découvert, ajoutez le gombo et poursuivez 20 minutes.","Ajoutez les crevettes 5 minutes avant la fin et servez sur du riz blanc."],
     en:["Make the roux: flour and oil over medium heat, stirring nonstop for 30 to 40 minutes to a chocolate colour.","Throw in the chopped trinity all at once: it stops the roux cooking.","Add the sausage, garlic and spices, then gradually whisk in the hot broth.","Simmer uncovered for 1 hour, add the okra and cook 20 minutes more.","Add the prawns 5 minutes before the end and serve over white rice."]
     } },

{ id:'clam-chowder', c:'na', lat:42.360, lon:-71.058, base:4, prep:25, cook:35, diff:1, tags:['sea','soup','comfort'],
  art:{v:'bowl',bg:'#2a3440',plate:'#f4efe3',style:'soup',food:['#f0e8d8','#e8dcc0','#c2762c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Clam chowder',en:'New England clam chowder'},
  p:{fr:'Boston, États-Unis',en:'Boston, United States'},
  d:{fr:"Une soupe épaisse de palourdes, de pommes de terre et de lard fumé, réchauffant les ports de Nouvelle-Angleterre depuis le XVIIIᵉ siècle. À Boston, y ajouter de la tomate reste considéré comme une provocation.",
     en:"A thick soup of clams, potatoes and smoked bacon that has warmed New England ports since the 18th century. In Boston, adding tomato is still considered a provocation."
     },
  i:[['clams',1.5,'kg'],['smoked_bacon',150,'g'],['potato',600,'g'],['onion',2,'pc'],['celery',2,'pc'],['butter',40,'g'],['flour',3,'tbsp'],['heavy_cream',300,'ml'],['whole_milk',400,'ml'],['thyme',2,'sprig'],['bay_leaf',1,'pc'],['oyster_crackers',100,'g'],['pepper',null,'']],
  s:{fr:["Ouvrez les palourdes à la vapeur dans un fond d'eau, filtrez soigneusement le jus et hachez la chair.","Faites fondre le lard en dés, puis les oignons et le céleri dans la graisse rendue.","Singez avec la farine, versez le jus des palourdes et laissez épaissir.","Ajoutez les pommes de terre en cubes, le thym et le laurier, cuisez 15 minutes.","Ajoutez lait, crème et palourdes hachées, chauffez sans bouillir et servez avec des crackers."],
     en:["Steam the clams open in a little water, strain the juice carefully and chop the meat.","Render the diced bacon, then soften the onions and celery in the fat.","Dust with the flour, pour in the clam juice and let it thicken.","Add the diced potatoes, thyme and bay and cook for 15 minutes.","Add milk, cream and chopped clams, heat without boiling and serve with crackers."]
     } },

{ id:'poutine', c:'na', lat:45.502, lon:-73.567, base:4, prep:20, cook:20, diff:1, tags:['comfort','cheese','fry'],
  art:{v:'plate',bg:'#2c3340',plate:'#f2ece0',style:'grill',food:['#e0b45c','#f2ece0','#6b3b20'],garnish:'#7fae6a'},
  n:{fr:'Poutine',en:'Poutine'},
  p:{fr:'Montréal, Canada',en:'Montreal, Canada'},
  d:{fr:"Frites, fromage en grains et sauce brune : née dans les casse-croûte du Québec rural à la fin des années 1950, la poutine est devenue un emblème national. Le fromage doit couiner sous la dent, sinon ce n'est pas une poutine.",
     en:"Chips, cheese curds and brown gravy: born in rural Quebec snack bars in the late 1950s, poutine became a national emblem. The curds must squeak against your teeth, or it is not poutine."
     },
  i:[['potato',1,'kg'],['cheese_curds',300,'g'],['beef_broth',500,'ml'],['chicken_broth',250,'ml'],['butter',40,'g'],['flour',40,'g'],['cider_vinegar',1,'tbsp'],['worcestershire',1,'tbsp'],['frying_oil',1,'l'],['pepper',null,'']],
  s:{fr:["Taillez les pommes de terre en bâtonnets épais et rincez-les à l'eau froide.","Faites un roux blond avec le beurre et la farine, versez les bouillons et laissez épaissir 10 minutes.","Relevez la sauce au vinaigre, à la sauce Worcestershire et au poivre.","Frites : une première cuisson à 150 °C, puis une seconde à 190 °C jusqu'à ce qu'elles soient bien dorées.","Dressez les frites brûlantes, parsemez de fromage en grains et nappez de sauce bouillante pour qu'il commence à fondre."],
     en:["Cut the potatoes into thick sticks and rinse them in cold water.","Make a blond roux with butter and flour, pour in the broths and thicken for 10 minutes.","Sharpen the gravy with vinegar, Worcestershire sauce and pepper.","Fry the chips first at 150°C, then again at 190°C until deep golden.","Pile up the hot chips, scatter the curds and pour over the boiling gravy so they just start to melt."]
     } },

{ id:'gallo-pinto', c:'na', lat:9.928, lon:-84.091, base:4, prep:15, cook:20, diff:1, tags:['breakfast','legume','veg'],
  art:{v:'plate',bg:'#2a3628',plate:'#f2ece0',style:'rice',food:['#6b4a34','#8a5a34','#e8dcc0','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Gallo pinto',en:'Gallo pinto'},
  p:{fr:'San José, Costa Rica',en:'San José, Costa Rica'},
  d:{fr:"Le petit-déjeuner costaricien : du riz et des haricots noirs de la veille, sautés ensemble jusqu'à ce que le riz prenne une teinte mouchetée — d'où le nom de « coq tacheté ». La sauce Lizano y est indispensable.",
     en:"The Costa Rican breakfast: yesterday's rice and black beans fried together until the rice turns speckled — hence \"spotted rooster\". Lizano sauce is non-negotiable."
     },
  i:[['cooked_rice',500,'g'],['black_beans',400,'g'],['onion',1,'pc'],['red_pepper',1,'pc'],['garlic',3,'clove'],['cilantro',1,'bunch'],['lizano_sauce',3,'tbsp'],['frying_oil',2,'tbsp'],['egg',4,'pc'],['plantain',2,'pc'],['salt',null,'']],
  s:{fr:["Faites revenir oignon, poivron et ail finement hachés jusqu'à ce qu'ils soient tendres.","Ajoutez les haricots noirs avec un peu de leur jus de cuisson.","Incorporez le riz froid et la sauce Lizano, mélangez sans écraser les grains.","Faites sauter 5 minutes pour que le riz se colore et que le fond attache légèrement.","Servez avec un œuf au plat, des bananes plantain frites et de la coriandre fraîche."],
     en:["Fry finely chopped onion, pepper and garlic until soft.","Add the black beans with a little of their cooking liquid.","Fold in the cold rice and the Lizano sauce, mixing without crushing the grains.","Fry 5 minutes so the rice colours and the base catches slightly.","Serve with a fried egg, fried plantain and fresh coriander."]
     } }
];
