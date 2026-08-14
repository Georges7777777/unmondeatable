/* ---------- Asie (2/2) ---------- */
const D4 = [
{ id:'penang-laksa', c:'as', lat:5.414, lon:100.329, base:4, prep:35, cook:45, diff:2, tags:['noodles','sea','spicy'],
  art:{v:'bowl',bg:'#2c3a2c',plate:'#f2ece0',style:'noodle',food:['#c2542c','#e8dcc0','#d94f2e','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Assam laksa',en:'Assam laksa'},
  p:{fr:'Penang, Malaisie',en:'Penang, Malaysia'},
  d:{fr:"Une soupe de nouilles au maquereau effiloché, acidulée par le tamarin et la fleur de gingembre. Contrairement au laksa au lait de coco, celle de Penang est franche, piquante et rafraîchissante.",
     en:"A noodle soup of flaked mackerel made tart with tamarind and torch ginger flower. Unlike the coconut version, Penang's laksa is sharp, hot and strangely refreshing."
     },
  i:[['mackerel',600,'g'],['thick_rice_noodles',400,'g'],['tamarind_paste',4,'tbsp'],['dried_chili',8,'pc'],['lemongrass',2,'stick'],['galangal',30,'g'],['shrimp_paste',1,'tbsp'],['torch_ginger',1,'pc'],['pineapple',150,'g'],['cucumber',1,'pc'],['mint',1,'bunch'],['red_onion',1,'pc'],['sugar',2,'tbsp']],
  s:{fr:["Pochez le maquereau 10 minutes, réservez l'eau de cuisson et effilochez la chair en retirant toutes les arêtes.","Mixez piments, citronnelle, galanga et pâte de crevette en une pâte de rempah.","Faites-la revenir puis versez l'eau de cuisson, le tamarin et la fleur de gingembre ; laissez frémir 30 minutes.","Remettez le poisson effiloché, sucrez et salez jusqu'à l'équilibre acide-salé.","Servez sur les nouilles épaisses avec ananas, concombre, oignon rouge et menthe."],
     en:["Poach the mackerel 10 minutes, keep the cooking water and flake the flesh, removing every bone.","Blend chillies, lemongrass, galangal and shrimp paste into a rempah paste.","Fry it, then add the fish water, tamarind and torch ginger; simmer 30 minutes.","Return the flaked fish, sweeten and salt until the sour-salty balance sings.","Serve over thick noodles with pineapple, cucumber, red onion and mint."]
     } },

{ id:'butter-chicken', c:'as', lat:28.614, lon:77.209, base:4, prep:30, cook:40, diff:1, tags:['poultry','comfort','spicy'],
  art:{v:'bowl',bg:'#3a2a1e',plate:'#f2ece0',style:'stew',food:['#d9622f','#e8834a','#f0d9a8','#8a4a2a'],garnish:'#6fbf8f'},
  n:{fr:'Murgh makhani',en:'Butter chicken'},
  p:{fr:'Delhi, Inde',en:'Delhi, India'},
  d:{fr:"Inventé à Delhi dans les années 1950 pour récupérer les restes de poulet tandoori, mijotés dans une sauce tomate au beurre. La douceur de la crème n'y est jamais fade : le fenugrec sec la relève à la fin.",
     en:"Invented in Delhi in the 1950s to rescue leftover tandoori chicken by simmering it in a buttery tomato sauce. The cream is never bland: dried fenugreek lifts everything at the end."
     },
  i:[['chicken_thighs',800,'g'],['plain_yogurt',200,'g'],['garam_masala',2,'tsp'],['ginger',30,'g'],['garlic',5,'clove'],['tomato_puree',600,'g'],['butter',80,'g'],['heavy_cream',200,'ml'],['kashmiri_chili',1,'tbsp'],['fenugreek_leaves',1,'tbsp'],['sugar',1,'tsp'],['salt',null,'']],
  s:{fr:["Marinez le poulet 4 heures dans le yaourt, l'ail, le gingembre et les épices.","Faites-le griller au four très chaud jusqu'à ce que les bords noircissent légèrement.","Faites réduire la purée de tomate avec le beurre 20 minutes, jusqu'à ce qu'elle fonce.","Mixez la sauce pour la rendre parfaitement lisse, puis ajoutez la crème et le sucre.","Remettez le poulet, laissez mijoter 10 minutes et froissez le fenugrec sec entre les doigts au moment de servir."],
     en:["Marinate the chicken 4 hours in yoghurt, garlic, ginger and spices.","Grill it in a very hot oven until the edges just char.","Reduce the tomato purée with the butter for 20 minutes, until it darkens.","Blend the sauce perfectly smooth, then add cream and sugar.","Return the chicken, simmer 10 minutes and crush the dried fenugreek between your fingers as you serve."]
     } },

{ id:'masala-dosa', c:'as', lat:12.972, lon:77.594, base:4, prep:720, cook:20, diff:2, tags:['veg','breakfast','street'],
  art:{v:'plate',bg:'#2e3a30',plate:'#f2ece0',style:'flat',food:['#e0b45c','#f0d9a8','#e8b04b','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Masala dosa',en:'Masala dosa'},
  p:{fr:'Bengaluru, Inde',en:'Bengaluru, India'},
  d:{fr:"Une crêpe fermentée de riz et de lentilles, étalée si finement qu'elle devient dentelle croustillante, roulée sur une pomme de terre au curcuma. La fermentation naturelle lui donne son acidité caractéristique.",
     en:"A fermented rice and lentil crêpe, spread so thin it turns to crisp lace, wrapped around turmeric potato. Natural fermentation gives it its characteristic tang."
     },
  i:[['rice',300,'g'],['urad_dal',100,'g'],['fenugreek_seeds',1,'tsp'],['potato',600,'g'],['onion',2,'pc'],['mustard_seeds',1,'tsp'],['curry_leaves',12,'pc'],['turmeric',1,'tsp'],['green_chili',2,'pc'],['ghee',4,'tbsp'],['salt',null,'']],
  s:{fr:["Trempez riz et lentilles séparément 6 heures avec le fenugrec, puis mixez-les en une pâte lisse.","Laissez fermenter 12 heures dans un endroit tiède, jusqu'à ce que la pâte double et sente l'acidulé.","Préparez la garniture : moutarde et feuilles de curry éclatées au ghee, oignon, curcuma et pommes de terre écrasées.","Versez une louche de pâte sur une plaque très chaude et étalez-la en spirale avec le dos de la louche.","Arrosez de ghee, déposez la garniture au centre, pliez et servez avec sambar et chutney de noix de coco."],
     en:["Soak rice and lentils separately for 6 hours with the fenugreek, then grind to a smooth batter.","Ferment 12 hours somewhere warm, until doubled and pleasantly sour.","Make the filling: mustard seeds and curry leaves popped in ghee, onion, turmeric and crushed potato.","Pour a ladle of batter onto a very hot griddle and spread it in a spiral with the ladle's back.","Drizzle with ghee, place the filling in the centre, fold and serve with sambar and coconut chutney."]
     } },

{ id:'hyderabadi-biryani', c:'as', lat:17.385, lon:78.487, base:6, prep:180, cook:60, diff:3, tags:['rice','festive','lamb'],
  art:{v:'bowl',bg:'#3a2a1a',plate:'#efe6d4',style:'rice',food:['#e0a83a','#f0e2b8','#b8452c','#8a5a34'],garnish:'#6fbf8f'},
  n:{fr:'Biryani de Hyderabad',en:'Hyderabadi biryani'},
  p:{fr:'Hyderabad, Inde',en:'Hyderabad, India'},
  d:{fr:"Le kacchi biryani cuit la viande crue marinée et le riz mi-cuit ensemble, scellés sous une pâte à pain. La vapeur emprisonnée, le dum, fait tout le travail : on ne soulève le couvercle qu'à table.",
     en:"Kacchi biryani cooks raw marinated meat and half-boiled rice together, sealed under a lid of dough. The trapped steam — the dum — does everything: the lid is lifted only at the table."
     },
  i:[['lamb_shoulder',1,'kg'],['basmati_rice',600,'g'],['plain_yogurt',400,'g'],['fried_onions',200,'g'],['green_chili',6,'pc'],['mint',1,'bunch'],['cilantro',1,'bunch'],['ghee',100,'g'],['saffron',1,'pinch'],['whole_milk',50,'ml'],['garam_masala',2,'tsp'],['lime',2,'pc'],['salt',null,'']],
  s:{fr:["Marinez l'agneau 3 heures dans le yaourt, les oignons frits, les herbes, les piments et les épices.","Faites bouillir le riz basmati 4 minutes seulement, dans une eau très salée et parfumée.","Déposez la viande crue marinée au fond d'une marmite épaisse, couvrez du riz mi-cuit.","Arrosez de safran infusé dans le lait tiède et de ghee fondu, puis scellez le couvercle avec une pâte.","Cuisez 15 minutes à feu vif puis 40 minutes au plus doux ; mélangez seulement au moment de servir."],
     en:["Marinate the lamb 3 hours in yoghurt, fried onions, herbs, chillies and spices.","Boil the basmati for only 4 minutes in heavily salted, perfumed water.","Lay the raw marinated meat in a heavy pot and cover with the half-cooked rice.","Pour over saffron steeped in warm milk and melted ghee, then seal the lid with dough.","Cook 15 minutes over high heat, then 40 minutes on the lowest; fold together only at the table."]
     } },

{ id:'khachapuri', c:'as', lat:41.716, lon:44.783, base:4, prep:90, cook:20, diff:2, tags:['cheese','bread','comfort'],
  art:{v:'board',bg:'#2f3340',plate:'#e9dcc0',style:'pastry',food:['#e8c96a','#f4e7b8','#e0a83a'],garnish:'#7fae6a'},
  n:{fr:'Khatchapouri adjarien',en:'Adjarian khachapuri'},
  p:{fr:'Tbilissi, Géorgie',en:'Tbilisi, Georgia'},
  d:{fr:"Un pain en forme de barque, rempli de fromage fondu, dans lequel on casse un œuf à la sortie du four. On mélange le jaune et le beurre avec la mie, puis on déchire les bords pour saucer.",
     en:"A boat-shaped bread filled with molten cheese, into which an egg is cracked straight from the oven. You stir the yolk and butter into the cheese, then tear off the edges to scoop."
     },
  i:[['flour',500,'g'],['whole_milk',250,'ml'],['dry_yeast',7,'g'],['sugar',1,'tbsp'],['sulguni_cheese',400,'g'],['feta',200,'g'],['egg',4,'pc'],['butter',60,'g'],['salt',null,'']],
  s:{fr:["Pétrissez farine, lait tiède, levure, sucre et sel ; laissez lever 1 heure.","Mélangez les fromages râpés, en gardant un peu de liquide pour qu'ils restent souples.","Étalez chaque pâton en ovale, garnissez et roulez les bords vers l'intérieur en pinçant les extrémités.","Enfournez 12 minutes à 230 °C, jusqu'à ce que le pain soit doré et le fromage bouillonnant.","Creusez un puits, cassez-y un œuf, ajoutez le beurre et remettez 2 minutes au four."],
     en:["Knead flour, warm milk, yeast, sugar and salt; leave to rise for 1 hour.","Mix the grated cheeses, keeping a little liquid so they stay supple.","Roll each ball into an oval, fill, and roll the edges inward, pinching the ends.","Bake 12 minutes at 230°C, until golden and the cheese bubbles.","Make a well, crack in an egg, add butter and return to the oven for 2 minutes."]
     } },

{ id:'plov', c:'as', lat:39.654, lon:66.960, base:6, prep:30, cook:90, diff:2, tags:['rice','festive','lamb'],
  art:{v:'plate',bg:'#3a3020',plate:'#e9dcc0',style:'rice',food:['#d9a83a','#c2762c','#e8d9a8','#8a5a34'],garnish:'#7fae6a'},
  n:{fr:'Plov de Samarcande',en:'Samarkand plov'},
  p:{fr:'Samarcande, Ouzbékistan',en:'Samarkand, Uzbekistan'},
  d:{fr:"Cuisiné dans un kazan géant par des hommes, pour les mariages comme pour les jours ordinaires. Le riz ne se mélange jamais : il cuit à l'étage, au-dessus des carottes jaunes et de l'agneau, en absorbant le zirvak.",
     en:"Cooked by men in a giant kazan, for weddings and for ordinary days alike. The rice is never stirred in: it cooks above the yellow carrots and lamb, drinking up the zirvak below."
     },
  i:[['lamb_shoulder',800,'g'],['long_grain_rice',600,'g'],['yellow_carrot',700,'g'],['onion',3,'pc'],['cumin',1,'tbsp'],['garlic',2,'pc'],['chickpeas',100,'g'],['raisins',60,'g'],['lamb_fat',100,'g'],['salt',null,'']],
  s:{fr:["Rincez le riz sept fois puis laissez-le tremper dans l'eau tiède salée.","Faites fondre la graisse dans le kazan et dorez la viande en gros morceaux, puis les oignons.","Ajoutez les carottes en bâtonnets épais et le cumin, sans jamais remuer plus que nécessaire.","Couvrez d'eau, ajoutez pois chiches et têtes d'ail entières, laissez mijoter 40 minutes : c'est le zirvak.","Étalez le riz égoutté dessus, complétez l'eau de 2 cm, cuisez à découvert puis 20 minutes à couvert, feu éteint."],
     en:["Rinse the rice seven times, then soak it in warm salted water.","Melt the fat in the kazan, brown the large chunks of meat, then the onions.","Add the thickly cut carrots and the cumin, stirring as little as possible.","Cover with water, add chickpeas and whole garlic heads, simmer 40 minutes: this is the zirvak.","Spread the drained rice on top, add water to 2 cm above, cook uncovered then 20 minutes covered off the heat."]
     } },

{ id:'iskender-kebab', c:'as', lat:40.188, lon:29.061, base:4, prep:30, cook:25, diff:2, tags:['lamb','grill','comfort'],
  art:{v:'plate',bg:'#3a2a24',plate:'#f2ece0',style:'grill',food:['#b8492a','#d9722f','#f2ece0'],garnish:'#7fae6a'},
  n:{fr:'İskender kebab',en:'İskender kebab'},
  p:{fr:'Bursa, Turquie',en:'Bursa, Türkiye'},
  d:{fr:"Inventé à Bursa en 1867 par İskender Efendi, qui eut l'idée de faire tourner la broche à la verticale. Les lamelles d'agneau reposent sur du pain grillé, nappées de tomate et arrosées de beurre noisette brûlant.",
     en:"Invented in Bursa in 1867 by İskender Efendi, who thought of turning the spit upright. Slices of lamb rest on toasted bread under tomato sauce, finished with sizzling browned butter at the table."
     },
  i:[['lamb_leg',700,'g'],['pita_bread',4,'pc'],['tomato_puree',400,'g'],['butter',100,'g'],['plain_yogurt',300,'g'],['oregano',1,'tsp'],['sweet_paprika',1,'tsp'],['onion',1,'pc'],['salt',null,'']],
  s:{fr:["Taillez l'agneau en fines lamelles et marinez-le 2 heures avec oignon râpé, origan et paprika.","Faites-le saisir à la poêle très chaude, par petites quantités, pour qu'il caramélise.","Réduisez la purée de tomate avec un peu de beurre jusqu'à ce qu'elle nappe.","Coupez les pains en losanges et dorez-les à la poêle.","Dressez pain, viande, sauce tomate et yaourt, puis versez le beurre noisette bouillant devant les convives."],
     en:["Slice the lamb thinly and marinate 2 hours with grated onion, oregano and paprika.","Sear it in a very hot pan in small batches so it caramelises.","Reduce the tomato purée with a little butter until it coats a spoon.","Cut the breads into diamonds and toast them in the pan.","Plate bread, meat, tomato sauce and yoghurt, then pour the sizzling browned butter over at the table."]
     } },

{ id:'hummus-beiruti', c:'as', lat:33.888, lon:35.495, base:4, prep:15, cook:60, diff:1, tags:['veg','legume','fresh'],
  art:{v:'plate',bg:'#2e3a34',plate:'#f4efe3',style:'stew',food:['#e8dcb8','#f2e8cc','#c2762c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Houmous beyrouthin',en:'Beiruti hummus'},
  p:{fr:'Beyrouth, Liban',en:'Beirut, Lebanon'},
  d:{fr:"Une purée de pois chiches d'une soie absolue, où le tahini compte autant que le citron. Le secret libanais tient à un peu de bicarbonate dans l'eau de cuisson, qui fait éclater les peaux.",
     en:"A chickpea purée of absolute silkiness, where the tahini matters as much as the lemon. The Lebanese secret is a pinch of bicarbonate in the cooking water, which blows the skins off."
     },
  i:[['dried_chickpeas',300,'g'],['baking_soda',1,'tsp'],['tahini',150,'g'],['lemon',2,'pc'],['garlic',2,'clove'],['olive_oil',60,'ml'],['cumin',1,'tsp'],['ice_water',60,'ml'],['sumac',1,'tsp'],['salt',null,'']],
  s:{fr:["Trempez les pois chiches une nuit avec la moitié du bicarbonate.","Cuisez-les 1 heure avec le reste de bicarbonate, jusqu'à ce qu'ils s'écrasent entre deux doigts.","Mixez l'ail avec le jus de citron et laissez infuser 10 minutes, puis filtrez.","Mixez longuement les pois chiches chauds avec le tahini, le citron et l'eau glacée, au moins 4 minutes.","Étalez en creusant un sillon, arrosez d'huile d'olive et saupoudrez de sumac et de cumin."],
     en:["Soak the chickpeas overnight with half the bicarbonate.","Cook them 1 hour with the rest, until they crush between two fingers.","Blend the garlic with the lemon juice, infuse 10 minutes, then strain.","Blend the hot chickpeas with tahini, lemon and ice water for at least 4 minutes.","Spread with a swirl, pour on olive oil and dust with sumac and cumin."]
     } }
];
