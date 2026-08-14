/* ---------- Europe (2/2) ---------- */
const D2 = [
{ id:'wiener-schnitzel', c:'eu', lat:48.208, lon:16.373, base:4, prep:20, cook:12, diff:1, tags:['fry','comfort'],
  art:{v:'plate',bg:'#33302a',plate:'#f4efe3',style:'grill',food:['#e0b45c','#e8c979','#d9a03a'],garnish:'#7fae6a'},
  n:{fr:'Wiener Schnitzel',en:'Wiener Schnitzel'},
  p:{fr:'Vienne, Autriche',en:'Vienna, Austria'},
  d:{fr:"Une escalope de veau battue jusqu'à la finesse d'une feuille, panée et frite au beurre clarifié jusqu'à ce que la chapelure se soulève en soufflé. Le citron est obligatoire, la sauce interdite.",
     en:"A veal escalope beaten as thin as a leaf, breaded and fried in clarified butter until the crumb puffs away from the meat. Lemon is compulsory, sauce forbidden."
     },
  i:[['veal_escalope',4,'pc'],['flour',100,'g'],['egg',3,'pc'],['breadcrumbs',200,'g'],['clarified_butter',300,'g'],['lemon',1,'pc'],['parsley',1,'bunch'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Aplatissez les escalopes entre deux films jusqu'à 4 mm d'épaisseur.","Salez, puis passez-les dans la farine, l'œuf battu et la chapelure sans presser.","Chauffez une grande quantité de beurre clarifié à 170 °C.","Faites frire 2 minutes par face en secouant la poêle pour que la panure gonfle.","Égouttez sur papier absorbant et servez immédiatement avec un quartier de citron."],
     en:["Pound the escalopes between two sheets of film to 4 mm thick.","Season, then coat in flour, beaten egg and breadcrumbs without pressing.","Heat a generous amount of clarified butter to 170°C.","Fry 2 minutes per side, swirling the pan so the coating puffs up.","Drain on kitchen paper and serve at once with a lemon wedge."]
     } },

{ id:'pierogi', c:'eu', lat:50.065, lon:19.945, base:4, prep:60, cook:10, diff:2, tags:['comfort','veg','bread'],
  art:{v:'plate',bg:'#2e3542',plate:'#f4efe3',style:'roll',food:['#efe2c4','#f6ecd6','#c9a24a'],garnish:'#6fbf8f'},
  n:{fr:'Pierogi ruskie',en:'Pierogi ruskie'},
  p:{fr:'Cracovie, Pologne',en:'Kraków, Poland'},
  d:{fr:"Des chaussons farcis de pomme de terre, de fromage blanc et d'oignon frit, pochés puis parfois poêlés au beurre. Chaque famille polonaise garde sa méthode pour pincer les bords en épi.",
     en:"Dumplings stuffed with potato, farmer's cheese and fried onion, poached and sometimes finished in butter. Every Polish family guards its own way of crimping the edges."
     },
  i:[['flour',500,'g'],['water',250,'ml'],['egg',1,'pc'],['potato',600,'g'],['farmer_cheese',250,'g'],['onion',3,'pc'],['butter',80,'g'],['sour_cream',200,'g'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Pétrissez farine, eau tiède, œuf et sel en une pâte souple ; laissez reposer 30 minutes.","Écrasez les pommes de terre cuites avec le fromage blanc et un oignon frit ; assaisonnez généreusement.","Étalez la pâte finement, découpez des disques de 8 cm et garnissez-les d'une noix de farce.","Pincez soigneusement les bords et pochez 3 minutes dans l'eau frémissante salée.","Poêlez-les au beurre avec le reste d'oignon et servez avec la crème aigre."],
     en:["Knead flour, warm water, egg and salt into a supple dough; rest 30 minutes.","Mash the cooked potatoes with the cheese and one fried onion; season generously.","Roll the dough thin, cut 8 cm discs and place a walnut of filling on each.","Crimp the edges carefully and poach for 3 minutes in salted simmering water.","Fry in butter with the remaining onion and serve with sour cream."]
     } },

{ id:'moussaka', c:'eu', lat:37.984, lon:23.728, base:6, prep:40, cook:60, diff:2, tags:['bake','lamb','comfort'],
  art:{v:'plate',bg:'#2c3a3a',plate:'#f2ece0',style:'grill',food:['#c9772f','#e8d9a8','#8a4a2a'],garnish:'#6fbf8f'},
  n:{fr:'Moussaka',en:'Moussaka'},
  p:{fr:'Athènes, Grèce',en:'Athens, Greece'},
  d:{fr:"Des couches d'aubergines rôties et de viande d'agneau à la cannelle, coiffées d'une béchamel dorée au four. La version moderne, mise au point par le chef Tselementes dans les années 1920, est devenue le plat national.",
     en:"Layers of roasted aubergine and cinnamon-scented lamb under a béchamel baked to gold. The modern version, devised by chef Tselementes in the 1920s, became the national dish."
     },
  i:[['aubergine',3,'pc'],['ground_lamb',700,'g'],['onion',2,'pc'],['garlic',3,'clove'],['tomato',400,'g'],['red_wine',150,'ml'],['cinnamon',1,'tsp'],['whole_milk',700,'ml'],['butter',70,'g'],['flour',70,'g'],['parmesan',80,'g'],['olive_oil',6,'tbsp'],['salt',null,'']],
  s:{fr:["Salez les tranches d'aubergine, laissez dégorger 30 minutes puis rôtissez-les au four à l'huile d'olive.","Faites revenir l'agneau avec oignon et ail, ajoutez tomate, vin et cannelle, laissez réduire 25 minutes.","Préparez une béchamel épaisse, hors du feu incorporez le fromage et un jaune d'œuf.","Montez le plat : aubergines, viande, aubergines, puis nappez de béchamel.","Enfournez 45 minutes à 180 °C et laissez reposer 20 minutes avant de couper."],
     en:["Salt the aubergine slices, drain 30 minutes, then roast them in the oven with olive oil.","Brown the lamb with onion and garlic, add tomato, wine and cinnamon, reduce for 25 minutes.","Make a thick béchamel and stir in the cheese and an egg yolk off the heat.","Build the dish: aubergine, meat, aubergine, then blanket with béchamel.","Bake 45 minutes at 180°C and rest 20 minutes before cutting."]
     } },

{ id:'fish-and-chips', c:'eu', lat:51.507, lon:-0.128, base:4, prep:25, cook:20, diff:1, tags:['fry','sea','street'],
  art:{v:'board',bg:'#2a3340',plate:'#e9dcc0',style:'grill',food:['#e0b45c','#e8c979','#d9a03a'],garnish:'#7fae6a'},
  n:{fr:'Fish and chips',en:'Fish and chips'},
  p:{fr:'Londres, Royaume-Uni',en:'London, United Kingdom'},
  d:{fr:"Un filet de cabillaud dans une pâte à la bière si légère qu'elle éclate sous la dent, avec des frites épaisses et une purée de petits pois à la menthe. Le vinaigre de malt fait partie du rituel.",
     en:"A cod fillet in a beer batter so light it shatters, with thick-cut chips and minted mushy peas. Malt vinegar is part of the ritual."
     },
  i:[['cod_fillet',4,'pc'],['flour',200,'g'],['cornstarch',50,'g'],['beer',300,'ml'],['baking_powder',1,'tsp'],['potato',1,'kg'],['peas',300,'g'],['mint',1,'sprig'],['malt_vinegar',2,'tbsp'],['frying_oil',1,'l'],['salt',null,'']],
  s:{fr:["Taillez les pommes de terre en gros bâtonnets et faites-les blanchir 8 minutes à 140 °C.","Mélangez farines, levure et bière glacée juste avant de frire : la pâte doit rester grumeleuse.","Séchez les filets, farinez-les, trempez-les dans la pâte et plongez-les à 180 °C 6 à 7 minutes.","Repassez les frites à 190 °C jusqu'à ce qu'elles soient bien dorées.","Écrasez les petits pois avec la menthe et servez le tout avec sel et vinaigre de malt."],
     en:["Cut the potatoes into thick chips and blanch them for 8 minutes at 140°C.","Mix the flours, baking powder and ice-cold beer just before frying: keep the batter lumpy.","Dry the fillets, dust with flour, dip in the batter and fry at 180°C for 6 to 7 minutes.","Return the chips to 190°C oil until deep golden.","Crush the peas with the mint and serve everything with salt and malt vinegar."]
     } },

{ id:'kottbullar', c:'eu', lat:59.329, lon:18.069, base:4, prep:25, cook:20, diff:1, tags:['comfort','beef','sunday'],
  art:{v:'plate',bg:'#2c3a4a',plate:'#f4efe3',style:'roll',food:['#8a5a34','#a06b3f','#e8d9a8'],garnish:'#6fbf8f'},
  n:{fr:'Köttbullar',en:'Köttbullar'},
  p:{fr:'Stockholm, Suède',en:'Stockholm, Sweden'},
  d:{fr:"De petites boulettes de bœuf et de porc liées au lait et au pain, servies avec une sauce crémeuse, une purée et de la confiture d'airelles. L'aigre-doux de la baie équilibre la richesse de la sauce.",
     en:"Small beef and pork meatballs bound with milk-soaked bread, served with a creamy gravy, mash and lingonberry jam. The tart berry cuts straight through the richness."
     },
  i:[['ground_beef',400,'g'],['ground_pork',300,'g'],['onion',1,'pc'],['breadcrumbs',60,'g'],['whole_milk',120,'ml'],['egg',1,'pc'],['allspice',1,'tsp'],['butter',60,'g'],['beef_broth',400,'ml'],['heavy_cream',200,'ml'],['lingonberry_jam',4,'tbsp'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Faites gonfler la chapelure dans le lait et fondre l'oignon haché au beurre.","Mélangez les viandes, l'œuf, l'oignon refroidi et le quatre-épices ; travaillez jusqu'à obtenir une masse lisse.","Roulez des boulettes de la taille d'une noix, les mains humides.","Faites-les dorer au beurre en secouant la poêle pour qu'elles restent rondes, puis réservez.","Déglacez au bouillon, ajoutez la crème, laissez épaissir 5 minutes et remettez les boulettes."],
     en:["Soak the breadcrumbs in the milk and soften the chopped onion in butter.","Mix the meats, egg, cooled onion and allspice until smooth and sticky.","Roll walnut-sized balls with damp hands.","Brown them in butter, shaking the pan so they stay round, then set aside.","Deglaze with broth, add the cream, thicken for 5 minutes and return the meatballs."]
     } },

{ id:'borscht', c:'eu', lat:50.450, lon:30.523, base:6, prep:30, cook:90, diff:1, tags:['soup','slow','veg'],
  art:{v:'bowl',bg:'#3a2436',plate:'#f4efe3',style:'soup',food:['#a8244a','#c0335c','#f2ece0','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Bortsch',en:'Borscht'},
  p:{fr:'Kyiv, Ukraine',en:'Kyiv, Ukraine'},
  d:{fr:"Une soupe pourpre de betterave et de chou, acidulée et profonde, dont chaque village ukrainien défend sa version. La cuillère de smetana qui fond dedans dessine des volutes roses.",
     en:"A crimson soup of beetroot and cabbage, tangy and deep, defended in a different version by every Ukrainian village. The spoonful of smetana melting in draws pink swirls."
     },
  i:[['beetroot',4,'pc'],['beef_short_ribs',600,'g'],['cabbage',300,'g'],['potato',3,'pc'],['carrot',2,'pc'],['onion',1,'pc'],['tomato_paste',2,'tbsp'],['garlic',3,'clove'],['bay_leaf',2,'pc'],['vinegar',2,'tbsp'],['sour_cream',150,'g'],['dill',1,'bunch'],['salt',null,'']],
  s:{fr:["Faites un bouillon avec la viande, le laurier et l'oignon entier pendant 1 h 30, puis effilochez la viande.","Faites revenir carotte, oignon et betterave râpés avec le concentré de tomate et le vinaigre, qui fixe la couleur.","Ajoutez pommes de terre et chou au bouillon et cuisez 12 minutes.","Incorporez le mélange de betterave, laissez frémir 5 minutes seulement pour garder le rouge vif.","Ajoutez l'ail écrasé hors du feu, laissez reposer une nuit et servez avec smetana et aneth."],
     en:["Simmer the meat, bay and whole onion for 1½ hours to make a broth, then shred the meat.","Fry grated carrot, onion and beetroot with tomato paste and vinegar, which locks in the colour.","Add potatoes and cabbage to the broth and cook for 12 minutes.","Stir in the beetroot mixture and simmer only 5 minutes to keep the bright red.","Add crushed garlic off the heat, rest overnight and serve with smetana and dill."]
     } },

{ id:'fondue-moitie', c:'eu', lat:46.806, lon:7.161, base:4, prep:10, cook:20, diff:1, tags:['cheese','comfort','festive'],
  art:{v:'bowl',bg:'#2c3340',plate:'#e8d9bd',style:'soup',food:['#e8cf8a','#f2e2ae','#d9b45c'],garnish:'#7fae6a'},
  n:{fr:'Fondue moitié-moitié',en:'Moitié-moitié fondue'},
  p:{fr:'Fribourg, Suisse',en:'Fribourg, Switzerland'},
  d:{fr:"Moitié gruyère, moitié vacherin fribourgeois, fondus dans du vin blanc avec une pointe d'ail et de kirsch. On tourne en huit, jamais en rond, et celui qui perd son pain paie la tournée.",
     en:"Half gruyère, half vacherin fribourgeois, melted in white wine with a hint of garlic and kirsch. You stir in figures of eight, never circles, and whoever loses their bread buys the next round."
     },
  i:[['gruyere_cheese',400,'g'],['vacherin_cheese',400,'g'],['white_wine',300,'ml'],['garlic',1,'clove'],['cornstarch',2,'tsp'],['kirsch',3,'tbsp'],['nutmeg',1,'pinch'],['rustic_bread',600,'g'],['pepper',null,'']],
  s:{fr:["Frottez le caquelon avec la gousse d'ail coupée puis versez le vin blanc.","Ajoutez les fromages râpés à feu doux, en tournant en huit avec une cuillère en bois.","Délayez la fécule dans le kirsch et incorporez-la dès que le mélange est homogène.","Poivrez, râpez la muscade et laissez frémir 2 minutes sans jamais faire bouillir.","Posez le caquelon sur le réchaud et trempez le pain coupé en gros cubes."],
     en:["Rub the pot with the cut garlic clove, then pour in the white wine.","Add the grated cheeses over low heat, stirring in figures of eight with a wooden spoon.","Slake the cornflour in the kirsch and stir it in as soon as the mixture is smooth.","Season with pepper and nutmeg and let it barely simmer for 2 minutes, never boiling.","Set the pot on the burner and dip large cubes of bread."]
     } },

{ id:'gulyas', c:'eu', lat:47.497, lon:19.040, base:6, prep:20, cook:120, diff:1, tags:['slow','beef','soup'],
  art:{v:'bowl',bg:'#3a2a22',plate:'#f2ece0',style:'stew',food:['#a83a24','#c2542c','#e8b04b','#8a5a34'],garnish:'#7fae6a'},
  n:{fr:'Goulasch',en:'Goulash'},
  p:{fr:'Budapest, Hongrie',en:'Budapest, Hungary'},
  d:{fr:"À l'origine la soupe des bouviers de la puszta, cuite au chaudron sur le feu. Le paprika, ajouté hors du feu pour qu'il ne devienne pas amer, donne sa couleur ardente à ce bouillon de bœuf et de pommes de terre.",
     en:"Originally the soup of the puszta cattle herders, cooked in a cauldron over an open fire. Paprika, always added off the heat so it never turns bitter, gives this beef and potato broth its glow."
     },
  i:[['beef_shank',800,'g'],['onion',4,'pc'],['sweet_paprika',3,'tbsp'],['caraway',1,'tsp'],['green_pepper',2,'pc'],['tomato',2,'pc'],['potato',500,'g'],['garlic',3,'clove'],['lard',3,'tbsp'],['salt',null,'']],
  s:{fr:["Faites fondre les oignons émincés dans le saindoux pendant 15 minutes, jusqu'à ce qu'ils soient dorés.","Retirez du feu, ajoutez le paprika et remuez immédiatement pour qu'il n'attache pas.","Ajoutez le bœuf en cubes, le cumin et l'ail, couvrez d'eau à hauteur et laissez mijoter 1 h 30.","Ajoutez poivrons, tomates et pommes de terre, poursuivez 30 minutes.","Rectifiez le sel et laissez reposer : le goulasch est meilleur le lendemain."],
     en:["Melt the sliced onions in lard for 15 minutes until golden.","Take off the heat, add the paprika and stir at once so it cannot catch.","Add the cubed beef, caraway and garlic, cover with water and simmer for 1½ hours.","Add peppers, tomatoes and potatoes and cook 30 minutes more.","Adjust the salt and let it rest: goulash is better the next day."]
     } }
];
