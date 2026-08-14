/* ---------- Europe & Méditerranée (lot 4) ---------- */
const D13 = [
{ id:'sauerbraten', c:'eu', lat:50.937, lon:6.960, base:6, prep:30, cook:180, diff:2, tags:['slow','beef','sunday'],
  art:{v:'plate',bg:'#2c2a22',plate:'#f2ece0',style:'stew',food:['#5a3020','#8a5a34','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Sauerbraten',en:'Sauerbraten'},
  p:{fr:'Cologne, Allemagne',en:'Cologne, Germany'},
  d:{fr:"Un rôti mariné jusqu'à cinq jours dans du vinaigre, du vin rouge et des épices, pour attendrir une pièce autrefois trop dure à rôtir telle quelle. La sauce se lie traditionnellement avec des miettes de pain d'épices, qui lui donnent sa couleur presque noire.",
     en:"A roast marinated for up to five days in vinegar, red wine and spices, to tenderise a cut once too tough to roast plain. The sauce is traditionally thickened with crumbled gingerbread, giving it its near-black colour."
     },
  i:[['beef_chuck',1.5,'kg'],['red_wine_vinegar',300,'ml'],['red_wine',300,'ml'],['water',200,'ml'],['onion',2,'pc'],['carrot',2,'pc'],['celery',1,'pc'],['bay_leaf',3,'pc'],['cloves',4,'pc'],['juniper_berries',6,'pc'],['black_peppercorns',6,'pc'],['butter',40,'g'],['gingerbread',80,'g'],['raisins',40,'g'],['sugar',1,'tbsp'],['salt',null,'']],
  s:{fr:["Faites mariner le rôti 3 à 5 jours au frais dans vinaigre, vin, eau, légumes émincés et épices, en le retournant chaque jour.","Égouttez la viande en réservant la marinade, séchez-la et faites-la dorer sur toutes les faces dans le beurre.","Ajoutez les légumes de la marinade, mouillez avec le liquide filtré et braisez 2h30 à couvert à feu doux.","Retirez la viande, mixez la sauce avec les miettes de pain d'épices jusqu'à ce qu'elle épaississe.","Ajoutez les raisins, rectifiez l'aigre-doux avec le sucre, tranchez le rôti et nappez de sauce chaude."],
     en:["Marinate the roast 3 to 5 days in the fridge in vinegar, wine, water, sliced vegetables and spices, turning it daily.","Drain the meat, keeping the marinade, pat dry and brown it all over in butter.","Add the marinade vegetables, pour in the strained liquid and braise 2h30 covered over low heat.","Remove the meat, blend the sauce with the gingerbread crumbs until it thickens.","Add the raisins, adjust the sweet-sour balance with sugar, slice the roast and coat with hot sauce."]
     } },

{ id:'currywurst', c:'eu', lat:52.520, lon:13.405, base:4, prep:10, cook:15, diff:1, tags:['street','spicy','fry'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'grill',food:['#8a3a24','#e0a83a','#c2452c'],garnish:'#7fae6a'},
  n:{fr:'Currywurst',en:'Currywurst'},
  p:{fr:'Berlin, Allemagne',en:'Berlin, Germany'},
  d:{fr:"Née en 1949 d'un troc entre une Berlinoise et des soldats britanniques contre du curry en poudre et du ketchup, cette saucisse grillée tranchée en rondelles et noyée de sauce tomate épicée est devenue l'emblème du snack berlinois, mangée debout, sans couverts.",
     en:"Born in 1949 from a Berlin woman bartering with British soldiers for curry powder and ketchup, this grilled sausage sliced into rounds and drenched in spiced tomato sauce became the emblem of Berlin street food, eaten standing, no cutlery."
     },
  i:[['bratwurst',4,'pc'],['tomato_puree',300,'g'],['ketchup',100,'g'],['curry_powder',2,'tbsp'],['onion',1,'pc'],['sugar',1,'tbsp'],['white_wine_vinegar',1,'tbsp'],['paprika',1,'tsp'],['frying_oil',1,'tbsp']],
  s:{fr:["Faites suer l'oignon émincé dans l'huile jusqu'à ce qu'il soit translucide.","Ajoutez tomate, ketchup, sucre, vinaigre et paprika, laissez mijoter 15 minutes en une sauce épaisse.","Grillez les saucisses à la poêle ou au barbecue jusqu'à ce que la peau craque et dore.","Tranchez-les en rondelles épaisses sur une assiette ou une barquette en carton.","Nappez généreusement de sauce chaude et saupoudrez de curry en poudre supplémentaire avant de servir avec des frites."],
     en:["Sweat the sliced onion in the oil until translucent.","Add tomato, ketchup, sugar, vinegar and paprika, simmer 15 minutes into a thick sauce.","Grill the sausages in a pan or on a barbecue until the skin cracks and browns.","Slice them into thick rounds on a plate or cardboard tray.","Ladle generously with hot sauce and dust with extra curry powder before serving with fries."]
     } },

{ id:'stamppot', c:'eu', lat:52.377, lon:4.895, base:4, prep:20, cook:30, diff:1, tags:['comfort','veg','sunday'],
  art:{v:'bowl',bg:'#2a3324',plate:'#e9dcc0',style:'rice',food:['#4f8f4a','#e0dcc0','#8a3a24'],garnish:'#7fae6a'},
  n:{fr:'Stamppot',en:'Stamppot'},
  p:{fr:'Amsterdam, Pays-Bas',en:'Amsterdam, Netherlands'},
  d:{fr:"« Purée tassée » : pommes de terre écrasées avec du chou frisé ou de l'endive, servies avec une saucisse fumée et un puits de jus de cuisson brun au centre. Un plat d'hiver simple, né pour réchauffer sans jamais lasser.",
     en:"\"Mashed pot\": potatoes crushed with kale or endive, served with a smoked sausage and a well of brown pan juices at the centre. A simple winter dish, made to warm without ever tiring the palate."
     },
  i:[['potato',1,'kg'],['curly_kale',400,'g'],['smoked_sausage',400,'g'],['butter',60,'g'],['whole_milk',100,'ml'],['nutmeg',1,'pinch'],['mustard',2,'tbsp'],['salt',null,'']],
  s:{fr:["Épluchez et coupez les pommes de terre en morceaux, cuisez-les à l'eau salée 20 minutes.","Ajoutez le chou frisé ciselé dans l'eau de cuisson des pommes de terre 5 minutes avant la fin.","Pochez la saucisse fumée à part dans une eau frémissante 15 minutes.","Égouttez pommes de terre et chou, écrasez-les au presse-purée avec beurre, lait et muscade.","Servez la purée en creusant un puits, garni de moutarde et de tranches de saucisse fumée chaude."],
     en:["Peel and chunk the potatoes, boil in salted water for 20 minutes.","Add the shredded kale to the potato water 5 minutes before it finishes.","Poach the smoked sausage separately in barely simmering water for 15 minutes.","Drain potatoes and kale, mash them with butter, milk and nutmeg.","Serve the mash with a well pressed in the centre, topped with mustard and slices of hot smoked sausage."]
     } },

{ id:'moules-frites', c:'eu', lat:50.850, lon:4.352, base:4, prep:15, cook:12, diff:1, tags:['sea','street','fry'],
  art:{v:'bowl',bg:'#26333c',plate:'#f2ece0',style:'stew',food:['#26332a','#4f8f4a','#e8dcc0'],garnish:'#6fbf8f'},
  n:{fr:'Moules-frites',en:'Moules-frites'},
  p:{fr:'Bruxelles, Belgique',en:'Brussels, Belgium'},
  d:{fr:"Des moules ouvertes en quelques minutes à la vapeur de vin blanc, céleri et échalote, servies dans leur propre marmite avec des frites cuites deux fois — la vraie friture belge, jamais l'inverse.",
     en:"Mussels opened in minutes over a steam of white wine, celery and shallot, served in their own pot with twice-fried chips — true Belgian frying, never the other way round."
     },
  i:[['mussels',2,'kg'],['white_wine',250,'ml'],['shallot',3,'pc'],['celery',2,'pc'],['butter',40,'g'],['parsley',1,'bunch'],['potato',1,'kg'],['frying_oil',1,'l'],['salt',null,'']],
  s:{fr:["Grattez et ébarbez les moules, jetez celles qui restent ouvertes.","Faites suer échalote et céleri émincés dans le beurre, mouillez au vin blanc.","Jetez les moules dans le liquide bouillant, couvrez et secouez la marmite 5 minutes jusqu'à ce qu'elles s'ouvrent toutes.","Taillez les pommes de terre en bâtonnets, faites-les frire une première fois à 150 °C puis égouttez.","Refaites frire les frites à 190 °C jusqu'à ce qu'elles soient dorées et croustillantes, servez avec les moules et le persil ciselé."],
     en:["Scrub and debeard the mussels, discard any that stay open.","Sweat the sliced shallot and celery in butter, moisten with white wine.","Tip the mussels into the boiling liquid, cover and shake the pot for 5 minutes until they all open.","Cut the potatoes into batons, fry once at 150°C then drain.","Fry the chips again at 190°C until golden and crisp, serve with the mussels and chopped parsley."]
     } },

{ id:'farikal', c:'eu', lat:59.913, lon:10.752, base:6, prep:20, cook:150, diff:1, tags:['slow','lamb','sunday'],
  art:{v:'bowl',bg:'#2a3324',plate:'#e9dcc0',style:'stew',food:['#4f8f4a','#c9924a','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Fårikål',en:'Fårikål'},
  p:{fr:'Oslo, Norvège',en:'Oslo, Norway'},
  d:{fr:"Le plat national norvégien, élu par référendum populaire en 1972 : mouton et chou blanc empilés en couches dans une seule marmite avec des grains de poivre entiers, sans autre assaisonnement, mijotés jusqu'à ce que la viande se détache de l'os.",
     en:"Norway's national dish, chosen by popular vote in 1972: mutton and cabbage layered in a single pot with whole peppercorns and nothing else, simmered until the meat falls from the bone."
     },
  i:[['mutton_shoulder',1.5,'kg'],['cabbage',1.5,'kg'],['black_peppercorns',2,'tbsp'],['flour',2,'tbsp'],['water',400,'ml'],['salt',null,'']],
  s:{fr:["Coupez le mouton en gros morceaux avec l'os et le chou en larges quartiers.","Alternez en couches viande et chou dans une grande marmite, en salant et poivrant abondamment chaque couche.","Saupoudrez un peu de farine entre les couches pour épaissir légèrement la sauce.","Versez l'eau, couvrez et laissez frémir à très feu doux 2h30 sans remuer.","Vérifiez que la viande se détache à la fourchette, servez avec des pommes de terre vapeur."],
     en:["Cut the mutton into large bone-in pieces and the cabbage into wide wedges.","Layer meat and cabbage in a large pot, salting and peppering each layer generously.","Dust a little flour between the layers to thicken the sauce slightly.","Pour in the water, cover and let it barely simmer for 2h30 without stirring.","Check the meat falls off with a fork, serve with boiled potatoes."]
     } },

{ id:'smorrebrod', c:'eu', lat:55.676, lon:12.568, base:4, prep:25, cook:0, diff:1, tags:['fresh','sea','veg'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9dcc0',style:'flat',food:['#8a5a34','#e0dcc0','#c2452c'],garnish:'#7fae6a'},
  n:{fr:'Smørrebrød',en:'Smørrebrød'},
  p:{fr:'Copenhague, Danemark',en:'Copenhagen, Denmark'},
  d:{fr:"Une tranche unique de pain de seigle noir, beurrée jusqu'aux bords puis couverte d'une garniture unique — hareng mariné, œuf et crevettes, ou rosbif — jamais empilée, toujours mangée au couteau et à la fourchette.",
     en:"A single slice of dark rye bread, buttered to the edges then topped with one single garnish — pickled herring, egg and shrimp, or roast beef — never stacked, always eaten with knife and fork."
     },
  i:[['rye_bread',4,'slice'],['butter',60,'g'],['pickled_herring',150,'g'],['egg',3,'pc'],['shrimp',150,'g'],['mayonnaise',3,'tbsp'],['red_onion',1,'pc'],['dill',1,'bunch'],['radish',4,'pc']],
  s:{fr:["Beurrez chaque tranche de pain de seigle jusqu'aux bords, sans laisser de zone sèche.","Faites cuire les œufs durs 9 minutes, refroidissez-les et coupez-les en rondelles.","Pour la version au hareng, disposez les filets marinés sur le beurre, parsemez d'oignon rouge et d'aneth.","Pour la version aux crevettes, liez-les à la mayonnaise et déposez-les en dôme sur les rondelles d'œuf.","Décorez chaque tartine de radis émincés et d'un brin d'aneth frais, servez aussitôt à température fraîche."],
     en:["Butter each slice of rye bread right to the edges, leaving no dry patch.","Hard-boil the eggs for 9 minutes, cool and slice into rounds.","For the herring version, arrange the pickled fillets on the butter, scatter with red onion and dill.","For the shrimp version, bind them with mayonnaise and mound on top of the egg slices.","Garnish each open sandwich with sliced radish and a sprig of fresh dill, serve at once, chilled."]
     } },

{ id:'karjalanpiirakka', c:'eu', lat:62.601, lon:29.764, base:12, prep:60, cook:20, diff:2, tags:['breakfast','bake','veg'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'flat',food:['#e0dcc0','#f0e2b0','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Karjalanpiirakka',en:'Karjalanpiirakka'},
  p:{fr:'Carélie, Finlande',en:'Karelia, Finland'},
  d:{fr:"De fines croûtes de seigle façonnées en barquettes, garnies d'une bouillie de riz au lait puis cuites au four très chaud jusqu'à ce que les bords se boursouflent. Servies avec le munavoi, un beurre à l'œuf dur écrasé, incontournable au petit-déjeuner.",
     en:"Thin rye crusts shaped into little boats, filled with a milk-and-rice porridge and baked in a very hot oven until the edges blister. Served with munavoi, a butter mashed with hard-boiled egg, a breakfast staple."
     },
  i:[['rye_flour',250,'g'],['flour',80,'g'],['water',200,'ml'],['rice',150,'g'],['whole_milk',500,'ml'],['butter',100,'g'],['egg',3,'pc'],['salt',null,'']],
  s:{fr:["Cuisez le riz dans le lait à feu très doux 40 minutes, en remuant souvent, jusqu'à une bouillie épaisse.","Pétrissez farine de seigle, farine, eau et sel en une pâte ferme, laissez reposer 20 minutes.","Étalez la pâte très fine, découpez des ovales et amincissez encore les bords.","Garnissez le centre de bouillie de riz, repliez les bords en pinçant pour former une barquette ouverte.","Enfournez 15 minutes à 250 °C, badigeonnez de beurre fondu à la sortie et servez tièdes avec le munavoi."],
     en:["Cook the rice in the milk over very low heat for 40 minutes, stirring often, into a thick porridge.","Knead rye flour, flour, water and salt into a firm dough, rest 20 minutes.","Roll the dough paper-thin, cut ovals and thin the edges further.","Fill the centre with rice porridge, fold the edges in, pinching to form an open little boat.","Bake 15 minutes at 250°C, brush with melted butter on coming out and serve warm with munavoi."]
     } },

{ id:'plokkfiskur', c:'eu', lat:64.146, lon:-21.943, base:4, prep:20, cook:20, diff:1, tags:['sea','comfort'],
  art:{v:'bowl',bg:'#26333c',plate:'#f2ece0',style:'rice',food:['#e0dcc0','#9fb0bc','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Plokkfiskur',en:'Plokkfiskur'},
  p:{fr:'Reykjavik, Islande',en:'Reykjavik, Iceland'},
  d:{fr:"Un plat né pour ne rien gaspiller : restes de morue ou d'églefin pochés, écrasés grossièrement dans une béchamel légère avec des pommes de terre, servi avec du pain de seigle noir cuit à la vapeur du sol volcanique.",
     en:"A dish born to waste nothing: leftover poached cod or haddock, roughly flaked into a light béchamel with potatoes, served with dark rye bread traditionally steamed by volcanic ground heat."
     },
  i:[['cod',500,'g'],['potato',500,'g'],['onion',1,'pc'],['butter',40,'g'],['flour',2,'tbsp'],['whole_milk',400,'ml'],['curry_powder',1,'tsp'],['rye_bread',4,'slice'],['salt',null,'']],
  s:{fr:["Pochez le cabillaud 8 minutes dans une eau frémissante légèrement salée, égouttez et effeuillez grossièrement.","Cuisez les pommes de terre à l'eau, égouttez et coupez en dés.","Faites suer l'oignon émincé dans le beurre, saupoudrez de farine et mouillez au lait en fouettant pour une béchamel légère.","Ajoutez le curry, le poisson effeuillé et les pommes de terre, mélangez délicatement sans écraser.","Réchauffez doucement 5 minutes sans bouillir, servez avec du pain de seigle noir et un peu de beurre."],
     en:["Poach the cod for 8 minutes in barely simmering, lightly salted water, drain and roughly flake.","Boil the potatoes, drain and dice.","Sweat the sliced onion in butter, dust with flour and whisk in the milk for a light béchamel.","Add the curry powder, flaked fish and potatoes, fold gently without crushing.","Warm through gently for 5 minutes without boiling, serve with dark rye bread and a little butter."]
     } },

{ id:'irish-stew', c:'eu', lat:53.349, lon:-6.260, base:6, prep:20, cook:120, diff:1, tags:['slow','lamb','comfort'],
  art:{v:'bowl',bg:'#2a3324',plate:'#e9dcc0',style:'stew',food:['#4f8f4a','#c9924a','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Irish stew',en:'Irish stew'},
  p:{fr:'Dublin, Irlande',en:'Dublin, Ireland'},
  d:{fr:"Un ragoût de mouton ou d'agneau si simple qu'il ne contient traditionnellement que de la viande, des pommes de terre, des oignons et de l'eau — pas même de carotte à l'origine, l'épaisseur venant seule de l'amidon des pommes de terre qui se défont en cuisant.",
     en:"A mutton or lamb stew so simple it traditionally holds only meat, potatoes, onions and water — not even a carrot originally, its thickness coming purely from the potatoes breaking down as they cook."
     },
  i:[['lamb_shoulder',1,'kg'],['potato',1,'kg'],['onion',3,'pc'],['carrot',2,'pc'],['water',600,'ml'],['bay_leaf',2,'pc'],['parsley',1,'bunch'],['salt',null,'']],
  s:{fr:["Coupez l'agneau en gros morceaux, épluchez pommes de terre, oignons et carottes.","Alternez en couches viande, oignons, carottes et la moitié des pommes de terre dans une cocotte.","Mouillez à hauteur avec l'eau, ajoutez le laurier, couvrez et laissez frémir 1h30 à feu très doux.","Ajoutez le reste des pommes de terre coupées en gros morceaux et poursuivez la cuisson 30 minutes, jusqu'à ce qu'elles se défassent légèrement et épaississent le bouillon.","Rectifiez l'assaisonnement, parsemez de persil ciselé et servez très chaud dans de grandes assiettes creuses."],
     en:["Cut the lamb into large chunks, peel the potatoes, onions and carrots.","Layer meat, onions, carrots and half the potatoes in a pot.","Cover with the water, add the bay leaves, cover and let it barely simmer for 1h30 over very low heat.","Add the remaining potatoes cut into large chunks and cook a further 30 minutes, until they break down slightly and thicken the broth.","Adjust the seasoning, scatter with chopped parsley and serve piping hot in deep bowls."]
     } },

{ id:'svickova', c:'eu', lat:50.075, lon:14.437, base:6, prep:30, cook:120, diff:2, tags:['slow','beef','sunday'],
  art:{v:'plate',bg:'#2c2a22',plate:'#f2ece0',style:'stew',food:['#c9924a','#e8dcc0','#8a3a24'],garnish:'#7fae6a'},
  n:{fr:'Svíčková na smetaně',en:'Svíčková na smetaně'},
  p:{fr:'Prague, Tchéquie',en:'Prague, Czechia'},
  d:{fr:"Un aloyau de bœuf mariné puis braisé sur un lit de racines — carotte, céleri, panais — mixées en une sauce crémeuse acidulée, servi avec des knedlíky, ces quenelles de pain, et une cuillère de confiture d'airelles.",
     en:"A beef sirloin marinated then braised on a bed of root vegetables — carrot, celery, parsnip — blended into a creamy, tangy sauce, served with knedlíky bread dumplings and a spoonful of cranberry preserve."
     },
  i:[['beef_sirloin',1.2,'kg'],['carrot',4,'pc'],['celery_root',1,'pc'],['parsnip',2,'pc'],['onion',2,'pc'],['smoked_bacon',80,'g'],['white_wine_vinegar',100,'ml'],['heavy_cream',200,'ml'],['bay_leaf',2,'pc'],['allspice',4,'pc'],['flour',300,'g'],['dry_yeast',5,'g'],['egg',1,'pc'],['whole_milk',150,'ml'],['cranberry_jam',4,'tbsp'],['salt',null,'']],
  s:{fr:["Faites mariner le bœuf une nuit avec les racines émincées, le vinaigre, le laurier et les épices.","Faites dorer la viande piquée de lardons de bacon, puis ajoutez les légumes de la marinade et braisez 2 heures à couvert.","Retirez la viande, mixez la sauce aux légumes avec la crème jusqu'à ce qu'elle soit lisse et onctueuse.","Préparez la pâte à knedlíky avec farine, levure, œuf et lait, façonnez en boudins et pochez 20 minutes à l'eau bouillante.","Tranchez le bœuf, nappez de sauce, servez avec des rondelles de knedlíky et une cuillère de confiture d'airelles."],
     en:["Marinate the beef overnight with the sliced roots, vinegar, bay and spices.","Brown the meat larded with bacon, then add the marinade vegetables and braise 2 hours covered.","Remove the meat, blend the vegetable sauce with the cream until smooth and velvety.","Make the knedlíky dough with flour, yeast, egg and milk, shape into logs and poach 20 minutes in boiling water.","Slice the beef, coat with sauce, serve with sliced knedlíky and a spoonful of cranberry preserve."]
     } },

{ id:'sarmale', c:'eu', lat:44.426, lon:26.106, base:8, prep:60, cook:120, diff:2, tags:['slow','pork','festive'],
  art:{v:'plate',bg:'#2a3324',plate:'#e9dcc0',style:'roll',food:['#4f8f4a','#8a3a24','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Sarmale',en:'Sarmale'},
  p:{fr:'Bucarest, Roumanie',en:'Bucharest, Romania'},
  d:{fr:"Des feuilles de chou fermenté entier, roulées autour de porc haché, riz et aneth, mijotées des heures dans une marmite en terre jusqu'à ce que le chou devienne fondant. Plat incontournable de Noël, meilleur encore réchauffé le lendemain.",
     en:"Whole fermented cabbage leaves, rolled around minced pork, rice and dill, simmered for hours in an earthenware pot until the cabbage turns meltingly soft. A Christmas staple, even better reheated the next day."
     },
  i:[['fermented_cabbage',1,'pc'],['ground_pork',600,'g'],['rice',150,'g'],['onion',2,'pc'],['dill',1,'bunch'],['tomato_puree',200,'g'],['smoked_bacon',150,'g'],['bay_leaf',2,'pc'],['black_peppercorns',6,'pc'],['salt',null,'']],
  s:{fr:["Détachez délicatement les feuilles du chou fermenté, coupez les côtes trop épaisses.","Mélangez porc haché, riz cru, oignon émincé et aneth ciselé, salez et poivrez.","Déposez une cuillère de farce au bord de chaque feuille et roulez serré en repliant les côtés.","Tapissez le fond d'une marmite de lardons de bacon et de chou émincé, disposez les rouleaux serrés, couvrez de tomate et d'eau à hauteur.","Laissez mijoter à couvert 2 heures à feu très doux, en ajoutant de l'eau si besoin, jusqu'à ce que le chou soit fondant."],
     en:["Gently peel the leaves off the fermented cabbage, trim any overly thick ribs.","Mix minced pork, raw rice, chopped onion and chopped dill, season with salt and pepper.","Place a spoonful of filling at the edge of each leaf and roll tightly, folding in the sides.","Line the bottom of a pot with bacon lardons and shredded cabbage, pack in the rolls tightly, cover with tomato and water to the top.","Simmer covered for 2 hours over very low heat, adding water if needed, until the cabbage is meltingly soft."]
     } },

{ id:'banitsa', c:'eu', lat:42.698, lon:23.319, base:8, prep:30, cook:40, diff:2, tags:['breakfast','bake','cheese'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'pastry',food:['#e0c07a','#f0e2c0','#c9a24a'],garnish:'#7fae6a'},
  n:{fr:'Banitsa',en:'Banitsa'},
  p:{fr:'Sofia, Bulgarie',en:'Sofia, Bulgaria'},
  d:{fr:"Des feuilles de pâte filo froissées à la main, jamais empilées à plat, garnies d'un mélange de fromage blanc sirene et d'œufs battus. La veille du nouvel an, on y cache un petit papier plié annonçant le sort de l'année à venir.",
     en:"Filo sheets crumpled by hand, never stacked flat, layered with a mix of sirene white cheese and beaten eggs. On New Year's Eve, a small folded paper predicting the year's fortune is hidden inside."
     },
  i:[['filo_pastry',400,'g'],['feta',400,'g'],['egg',5,'pc'],['plain_yogurt',200,'g'],['butter',100,'g'],['baking_soda',1,'pinch']],
  s:{fr:["Émiettez le fromage sirene et écrasez-le à la fourchette avec trois œufs battus.","Beurrez généreusement chaque feuille de filo, froissez-la sans soin en un tas lâche.","Disposez les feuilles froissées en cercles dans un moule rond beurré, en garnissant régulièrement de fromage.","Fouettez les deux œufs restants avec le yaourt et le bicarbonate, versez sur le dessus.","Enfournez 35 minutes à 180 °C jusqu'à ce que le dessus soit gonflé et bien doré, laissez tiédir avant de découper."],
     en:["Crumble the sirene cheese and mash it with a fork with three beaten eggs.","Butter each filo sheet generously, crumple it carelessly into a loose heap.","Arrange the crumpled sheets in circles in a buttered round tin, filling in with cheese as you go.","Whisk the remaining two eggs with the yoghurt and baking soda, pour over the top.","Bake 35 minutes at 180°C until puffed and well browned on top, let cool slightly before cutting."]
     } },

{ id:'pasticada', c:'eu', lat:43.508, lon:16.440, base:6, prep:40, cook:180, diff:2, tags:['slow','beef','festive'],
  art:{v:'plate',bg:'#2a2028',plate:'#f2ece0',style:'stew',food:['#4a2028','#7a3a2a','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Pašticada',en:'Pašticada'},
  p:{fr:'Split, Croatie',en:'Split, Croatia'},
  d:{fr:"Un rôti de bœuf lardé de lard et de carotte, mariné deux jours dans le vinaigre et le vin avant d'être braisé avec pruneaux et clous de girofle jusqu'à une sauce presque sucrée. Plat de mariage dalmate, jamais préparé pour un jour ordinaire.",
     en:"A beef roast larded with bacon and carrot, marinated two days in vinegar and wine before braising with prunes and cloves into an almost sweet sauce. A Dalmatian wedding dish, never cooked for an ordinary day."
     },
  i:[['beef_round',1.5,'kg'],['smoked_bacon',100,'g'],['carrot',3,'pc'],['red_wine_vinegar',200,'ml'],['red_wine',300,'ml'],['prunes',150,'g'],['cloves',6,'pc'],['onion',2,'pc'],['tomato_puree',150,'g'],['nutmeg',1,'pinch'],['salt',null,'']],
  s:{fr:["Lardez le rôti de bâtonnets de bacon et de carotte à l'aide d'un couteau pointu.","Faites-le mariner 2 jours au frais dans le vin, le vinaigre, l'oignon et les clous de girofle.","Égouttez et faites dorer la viande sur toutes les faces, puis mouillez avec la marinade filtrée et la tomate.","Braisez à couvert 3 heures à feu très doux, en ajoutant les pruneaux à mi-cuisson.","Retirez la viande, réduisez la sauce et mixez-la avec les pruneaux, tranchez le rôti et nappez généreusement."],
     en:["Lard the roast with sticks of bacon and carrot using a sharp knife.","Marinate it 2 days in the fridge in the wine, vinegar, onion and cloves.","Drain and brown the meat all over, then moisten with the strained marinade and tomato.","Braise covered for 3 hours over very low heat, adding the prunes halfway through.","Remove the meat, reduce the sauce and blend it with the prunes, slice the roast and coat generously."]
     } },

{ id:'karadjordjeva-snicla', c:'eu', lat:44.787, lon:20.457, base:4, prep:30, cook:15, diff:2, tags:['fry','cheese','pork'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'roll',food:['#e0b45c','#f0e2c0','#7fae5a'],garnish:'#7fae6a'},
  n:{fr:'Karađorđeva šnicla',en:'Karađorđeva šnicla'},
  p:{fr:'Belgrade, Serbie',en:'Belgrade, Serbia'},
  d:{fr:"Une escalope de porc déroulée puis enroulée autour de kajmak, une crème de lait fermentée, avant d'être panée et frite. Créée dans les années 1950 pour honorer un héros national, servie en forme de rouleau pour évoquer la légion d'honneur qu'il portait.",
     en:"A pork escalope pounded flat then rolled around kajmak, a fermented cream cheese, before being breaded and fried. Created in the 1950s to honour a national hero, shaped like a roll to echo the medal he wore."
     },
  i:[['pork_loin',600,'g'],['kajmak',150,'g'],['flour',100,'g'],['egg',3,'pc'],['breadcrumbs',200,'g'],['frying_oil',500,'ml'],['salt',null,'']],
  s:{fr:["Aplatissez de fines escalopes de porc au maillet jusqu'à 3 mm d'épaisseur.","Déposez une cuillère de kajmak au centre de chaque escalope et roulez serré en fermant les extrémités avec un cure-dent.","Passez chaque rouleau dans la farine, l'œuf battu puis la chapelure, en pressant bien pour faire adhérer.","Répétez une seconde fois la panure pour une croûte plus épaisse et croustillante.","Faites frire à 170 °C jusqu'à ce que le rouleau soit doré, laissez reposer une minute avant de trancher."],
     en:["Pound thin pork escalopes with a mallet to 3 mm thickness.","Place a spoonful of kajmak at the centre of each escalope and roll tightly, closing the ends with a toothpick.","Coat each roll in flour, beaten egg then breadcrumbs, pressing well to adhere.","Repeat the breading a second time for a thicker, crunchier crust.","Fry at 170°C until the roll is golden, let it rest a minute before slicing."]
     } },

{ id:'fenkata', c:'eu', lat:35.899, lon:14.514, base:4, prep:30, cook:90, diff:2, tags:['slow','festive'],
  art:{v:'plate',bg:'#2a2028',plate:'#f2ece0',style:'stew',food:['#7a3a2a','#4f8f4a','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Fenkata (lapin à la maltaise)',en:'Fenkata (Maltese rabbit)'},
  p:{fr:'La Valette, Malte',en:'Valletta, Malta'},
  d:{fr:"Le lapin, animal roi de la table maltaise, d'abord frit à l'ail puis mijoté dans le vin rouge jusqu'à ce que la chair tombe de l'os. Traditionnellement servi en deux services : la sauce sur des pâtes d'abord, la viande ensuite.",
     en:"Rabbit, the king of Maltese tables, first fried with garlic then simmered in red wine until the meat falls off the bone. Traditionally served in two courses: the sauce over pasta first, the meat afterwards."
     },
  i:[['rabbit',1.5,'kg'],['garlic',6,'clove'],['red_wine',500,'ml'],['bay_leaf',3,'pc'],['tomato_puree',150,'g'],['onion',2,'pc'],['olive_oil',60,'ml'],['spaghetti',300,'g'],['parsley',1,'bunch'],['salt',null,'']],
  s:{fr:["Découpez le lapin en morceaux, faites-le mariner 1 heure dans le vin avec l'ail écrasé et le laurier.","Égouttez la viande et faites-la dorer à l'huile d'olive dans une grande cocotte.","Ajoutez l'oignon émincé, faites suer, puis remouillez avec la marinade et la tomate.","Couvrez et laissez mijoter 1h30 à feu doux jusqu'à ce que la viande se détache de l'os.","Cuisez les spaghettis, servez-les d'abord nappés de la sauce, puis le lapin en second service, parsemé de persil."],
     en:["Cut the rabbit into pieces, marinate it 1 hour in the wine with crushed garlic and bay.","Drain the meat and brown it in olive oil in a large pot.","Add the sliced onion, sweat, then moisten with the marinade and tomato.","Cover and simmer 1h30 over low heat until the meat falls off the bone.","Cook the spaghetti, serve it first coated with the sauce, then the rabbit as a second course, scattered with parsley."]
     } },

{ id:'judd-mat-gaardebounen', c:'eu', lat:49.611, lon:6.132, base:6, prep:20, cook:150, diff:1, tags:['slow','pork','sunday'],
  art:{v:'plate',bg:'#2c2a22',plate:'#f2ece0',style:'stew',food:['#8a5a34','#4f8f4a','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Judd mat Gaardebounen',en:'Judd mat Gaardebounen'},
  p:{fr:'Luxembourg',en:'Luxembourg City, Luxembourg'},
  d:{fr:"Le plat national luxembourgeois : une échine de porc fumée, dessalée puis mijotée jusqu'à tendreté, servie en tranches épaisses avec des fèves des Ardennes et une sauce roux liée au bouillon de cuisson.",
     en:"Luxembourg's national dish: smoked pork collar, desalted then simmered until tender, served in thick slices with broad beans and a roux sauce bound with the cooking broth."
     },
  i:[['smoked_pork_collar',1.2,'kg'],['broad_beans',500,'g'],['onion',2,'pc'],['carrot',2,'pc'],['bay_leaf',2,'pc'],['butter',40,'g'],['flour',3,'tbsp'],['savory',1,'sprig'],['salt',null,'']],
  s:{fr:["Faites dessaler l'échine fumée 12 heures dans l'eau froide en changeant l'eau une fois.","Pochez-la 2 heures dans une eau fraîche avec oignon, carotte et laurier, à frémissement doux.","Écossez les fèves et cuisez-les à part avec un brin de sarriette jusqu'à tendreté.","Préparez un roux avec beurre et farine, mouillez avec un peu de bouillon de cuisson en fouettant jusqu'à consistance nappante.","Tranchez la viande, servez avec les fèves et nappez de la sauce chaude."],
     en:["Desalt the smoked collar for 12 hours in cold water, changing the water once.","Poach it 2 hours in fresh water with onion, carrot and bay, at a gentle simmer.","Shell the broad beans and cook them separately with a sprig of savory until tender.","Make a roux with butter and flour, moisten with a little of the cooking broth, whisking to a coating consistency.","Slice the meat, serve with the beans and coat with the hot sauce."]
     } },

{ id:'souvla', c:'eu', lat:35.185, lon:33.382, base:6, prep:20, cook:240, diff:1, tags:['grill','festive','sunday'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'skewer',food:['#8a3a24','#c9924a','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Souvla',en:'Souvla'},
  p:{fr:'Nicosie, Chypre',en:'Nicosia, Cyprus'},
  d:{fr:"De gros morceaux de porc ou d'agneau enfilés sur une longue broche et tournés à la main au-dessus des braises pendant des heures, dans un rituel dominical qui rassemble toute la famille autour du charbon de bois.",
     en:"Large chunks of pork or lamb threaded onto a long spit and hand-turned over the coals for hours, in a Sunday ritual that gathers the whole family around the charcoal."
     },
  i:[['pork_shoulder',1.5,'kg'],['lemon',3,'pc'],['olive_oil',100,'ml'],['oregano',3,'tbsp'],['bay_leaf',4,'pc'],['halloumi',300,'g'],['pita_bread',6,'pc'],['salt',null,'']],
  s:{fr:["Coupez le porc en gros cubes de 5 cm, marinez-les 2 heures avec huile, jus de citron, origan et laurier.","Enfilez les cubes sur une longue broche en intercalant des feuilles de laurier.","Faites tourner la broche au-dessus de braises modérées pendant 3 à 4 heures, en arrosant régulièrement de marinade.","Vingt minutes avant la fin, ajoutez des tranches de halloumi sur une grille à côté pour les griller.","Servez la viande retirée de la broche avec le halloumi grillé, du citron frais et du pain pita chaud."],
     en:["Cut the pork into large 5 cm cubes, marinate 2 hours with oil, lemon juice, oregano and bay.","Thread the cubes onto a long spit, interspersing bay leaves.","Turn the spit over moderate coals for 3 to 4 hours, basting regularly with marinade.","Twenty minutes before the end, add slices of halloumi on a grill alongside to char.","Serve the meat pulled from the spit with the grilled halloumi, fresh lemon and warm pita bread."]
     } },

{ id:'potica', c:'eu', lat:46.056, lon:14.505, base:12, prep:120, cook:50, diff:2, tags:['sweet','bake','festive'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'cake',food:['#8a5a34','#c9924a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Potica',en:'Potica'},
  p:{fr:'Ljubljana, Slovénie',en:'Ljubljana, Slovenia'},
  d:{fr:"Une pâte levée très fine, étalée sur un drap propre puis roulée autour d'une farce de noix moulues, miel et cannelle, en spirale serrée. Il en existe des dizaines de variantes régionales, chaque famille slovène gardant la sienne.",
     en:"A very thin risen dough, stretched on a clean cloth then rolled tightly around a filling of ground walnuts, honey and cinnamon. Dozens of regional variants exist, each Slovenian family keeping its own."
     },
  i:[['flour',500,'g'],['dry_yeast',10,'g'],['egg',3,'pc'],['whole_milk',200,'ml'],['butter',100,'g'],['walnuts',400,'g'],['honey',150,'g'],['sugar',100,'g'],['cinnamon',2,'tsp'],['raisins',60,'g']],
  s:{fr:["Pétrissez farine, levure, œufs, lait et beurre fondu en une pâte souple, laissez lever 1h30.","Étalez la pâte le plus finement possible sur un grand drap fariné, presque transparente.","Mixez les noix avec le miel, le sucre, la cannelle et les raisins pour la farce.","Étalez la farce sur toute la pâte, roulez serré à l'aide du drap en un long boudin.","Placez en couronne dans un moule, laissez lever 30 minutes puis enfournez 45 minutes à 170 °C."],
     en:["Knead flour, yeast, eggs, milk and melted butter into a supple dough, let rise 1h30.","Stretch the dough as thin as possible on a large floured cloth, almost transparent.","Blend the walnuts with honey, sugar, cinnamon and raisins for the filling.","Spread the filling over the whole dough, roll tightly using the cloth into a long log.","Place in a ring in a tin, let rise 30 minutes then bake 45 minutes at 170°C."]
     } },

{ id:'bryndzove-halusky', c:'eu', lat:48.148, lon:17.107, base:4, prep:25, cook:15, diff:1, tags:['cheese','comfort','veg'],
  art:{v:'bowl',bg:'#2f2a20',plate:'#e9dcc0',style:'rice',food:['#e0dcc0','#f0e2b0','#8a3a24'],garnish:'#7fae6a'},
  n:{fr:'Bryndzové halušky',en:'Bryndzové halušky'},
  p:{fr:'Bratislava, Slovaquie',en:'Bratislava, Slovakia'},
  d:{fr:"Le plat national slovaque : de petites quenelles de pomme de terre crue râpée, pochées puis noyées sous le bryndza, un fromage de brebis fermenté et crémeux, couronnées de lardons de bacon grillés bien croustillants.",
     en:"Slovakia's national dish: small dumplings of raw grated potato, poached then smothered in bryndza, a creamy fermented sheep cheese, crowned with crisp fried bacon bits."
     },
  i:[['potato',800,'g'],['flour',250,'g'],['egg',1,'pc'],['bryndza_cheese',300,'g'],['smoked_bacon',150,'g'],['whole_milk',3,'tbsp'],['salt',null,'']],
  s:{fr:["Râpez finement les pommes de terre crues, égouttez-les légèrement sans trop presser.","Mélangez-les à la farine, l'œuf et le sel en une pâte épaisse et collante.","Faites tomber de petites quenelles à la cuillère ou à la passoire à trous directement dans l'eau bouillante salée.","Égouttez les quenelles dès qu'elles remontent à la surface, environ 3 minutes.","Écrasez le bryndza avec un peu de lait, mélangez-le chaud aux quenelles, couronnez de lardons de bacon croustillants."],
     en:["Finely grate the raw potatoes, drain lightly without pressing too hard.","Mix with the flour, egg and salt into a thick, sticky dough.","Drop small dumplings from a spoon or a holed strainer straight into salted boiling water.","Drain the dumplings as soon as they float to the surface, about 3 minutes.","Mash the bryndza with a little milk, mix it hot with the dumplings, crown with crisp bacon bits."]
     } }
];
