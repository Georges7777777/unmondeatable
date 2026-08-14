/* ---------- Italie régionale ---------- */
const D10 = [
{ id:'carbonara', c:'eu', lat:41.903, lon:12.496, base:4, prep:10, cook:15, diff:1, tags:['noodles','comfort','pork'],
  art:{v:'plate',bg:'#2f2a20',plate:'#f2ece0',style:'noodle',food:['#f0e2b0','#e8c96a','#c9927a'],garnish:'#7fae6a'},
  n:{fr:'Carbonara',en:'Carbonara'},
  p:{fr:'Rome, Italie',en:'Rome, Italy'},
  d:{fr:"Aucune crème n'entre jamais dans une vraie carbonara : seulement guanciale, pecorino, jaunes d'œufs et poivre noir. La sauce prend hors du feu, par la seule chaleur des pâtes, dans un geste qui ne pardonne aucune hésitation.",
     en:"No cream ever goes into a true carbonara: only guanciale, pecorino, egg yolks and black pepper. The sauce sets off the heat, using only the warmth of the pasta, in a motion that forgives no hesitation."
     },
  i:[['spaghetti',400,'g'],['guanciale',200,'g'],['egg_yolk',5,'pc'],['egg',1,'pc'],['pecorino',100,'g'],['black_peppercorns',2,'tsp'],['salt',null,'']],
  s:{fr:["Taillez le guanciale en lardons et faites-le rissoler à sec jusqu'à ce qu'il rende son gras et croustille.","Fouettez jaunes, œuf entier, pecorino râpé et beaucoup de poivre concassé.","Cuisez les spaghettis 1 minute de moins que le temps indiqué, très fermes.","Hors du feu, mélangez pâtes et guanciale avec un peu d'eau de cuisson.","Versez l'appareil aux œufs en remuant vite et sans arrêt, pour qu'il crème sans jamais cuire en grumeaux."],
     en:["Cut the guanciale into strips and render it dry until crisp.","Whisk the yolks, whole egg, grated pecorino and plenty of cracked pepper.","Cook the spaghetti 1 minute short of the package time, very al dente.","Off the heat, toss the pasta with the guanciale and a little pasta water.","Pour in the egg mixture, stirring fast and constantly, so it turns creamy and never scrambles."]
     } },

{ id:'ossobuco-milanese', c:'eu', lat:45.464, lon:9.190, base:4, prep:25, cook:150, diff:2, tags:['slow','beef','comfort'],
  art:{v:'plate',bg:'#2c2a22',plate:'#f2ece0',style:'stew',food:['#8a5a34','#c9924a','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Ossobuco alla milanese',en:'Ossobuco alla milanese'},
  p:{fr:'Milan, Italie',en:'Milan, Italy'},
  d:{fr:"Un jarret de veau mijoté jusqu'à ce que la moelle se détache d'elle-même, servi avec la gremolata — zeste de citron, ail et persil — qui réveille toute la richesse du plat d'un coup de fraîcheur.",
     en:"A veal shank braised until the marrow slips free on its own, served with gremolata — lemon zest, garlic and parsley — that cuts through the richness with one stroke of freshness."
     },
  i:[['veal_shank',4,'pc'],['flour',3,'tbsp'],['onion',1,'pc'],['carrot',1,'pc'],['celery',1,'pc'],['white_wine',200,'ml'],['tomato_puree',200,'g'],['beef_broth',400,'ml'],['butter',40,'g'],['lemon_zest',1,'pc'],['garlic',2,'clove'],['parsley',1,'bunch'],['bay_leaf',1,'pc']],
  s:{fr:["Farinez les jarrets ficelés et faites-les dorer dans le beurre sur toutes les faces.","Réservez, faites fondre oignon, carotte et céleri dans la même cocotte.","Remettez la viande, déglacez au vin blanc, ajoutez tomate, bouillon et laurier.","Couvrez et laissez mijoter 2 heures à feu très doux, en retournant une fois.","Ciselez zeste de citron, ail et persil pour la gremolata et parsemez-en chaque assiette au moment de servir."],
     en:["Dust the tied shanks with flour and brown them all over in butter.","Set aside, then soften onion, carrot and celery in the same pot.","Return the meat, deglaze with white wine, add tomato, broth and bay.","Cover and simmer 2 hours over very low heat, turning once.","Chop lemon zest, garlic and parsley for the gremolata and scatter it over each plate at serving."]
     } },

{ id:'trofie-al-pesto', c:'eu', lat:44.407, lon:8.934, base:4, prep:20, cook:12, diff:1, tags:['noodles','veg','fresh'],
  art:{v:'plate',bg:'#26332a',plate:'#f2ece0',style:'noodle',food:['#4f8f4a','#7fae5a','#e8dcc0'],garnish:'#6fbf8f'},
  n:{fr:'Trofie al pesto genovese',en:'Trofie al pesto genovese'},
  p:{fr:'Gênes, Italie',en:'Genoa, Italy'},
  d:{fr:"Le basilic de Prà, cultivé sur les pentes qui dominent la mer, écrasé au mortier avec pignons et parmesan pour ne jamais chauffer la feuille. On y ajoute toujours haricots verts et pommes de terre, cuits dans l'eau des pâtes.",
     en:"Prà basil, grown on the slopes above the sea, crushed in a mortar with pine nuts and parmesan so the leaf is never warmed. Green beans and potatoes, boiled in the pasta water, are always added."
     },
  i:[['basil',80,'g'],['pine_nuts',30,'g'],['parmesan',60,'g'],['pecorino',30,'g'],['garlic',1,'clove'],['olive_oil',120,'ml'],['flat_green_beans',150,'g'],['potato',2,'pc'],['flour',400,'g'],['water',180,'ml'],['coarse_salt',1,'pinch']],
  s:{fr:["Pilez basilic, ail et une pincée de gros sel au mortier jusqu'à obtenir une pâte fine.","Ajoutez les pignons, puis les fromages râpés, en continuant de piler doucement.","Incorporez l'huile d'olive en filet, sans jamais fouetter, pour garder le vert éclatant.","Roulez les trofie à la main à partir de farine et d'eau, en torsadant chaque petit pâton.","Cuisez pâtes, pommes de terre en dés et haricots ensemble, égouttez et liez au pesto hors du feu."],
     en:["Pound basil, garlic and a pinch of coarse salt in a mortar to a fine paste.","Add the pine nuts, then the grated cheeses, still pounding gently.","Work in the olive oil in a thin stream, never whisking, to keep the vivid green.","Roll the trofie by hand from flour and water, twisting each small piece.","Cook pasta, diced potato and beans together, drain and toss with the pesto off the heat."]
     } },

{ id:'ribollita', c:'eu', lat:43.769, lon:11.256, base:6, prep:25, cook:90, diff:1, tags:['soup','veg','slow'],
  art:{v:'bowl',bg:'#2a3324',plate:'#e9dcc0',style:'soup',food:['#4f8f4a','#7fae5a','#e8dcc0','#c9924a'],garnish:'#6fbf8f'},
  n:{fr:'Ribollita',en:'Ribollita'},
  p:{fr:'Florence, Italie',en:'Florence, Italy'},
  d:{fr:"« Rebouillie » : une soupe paysanne de haricots cannellini, chou noir toscan et pain rassis, meilleure le lendemain quand on la réchauffe à nouveau à la poêle jusqu'à ce qu'une croûte se forme dessous.",
     en:"\"Reboiled\": a peasant soup of cannellini beans, Tuscan black kale and stale bread, better the next day when reheated in a pan until a crust forms on the bottom."
     },
  i:[['cannellini_beans',400,'g'],['tuscan_kale',400,'g'],['cabbage',200,'g'],['carrot',2,'pc'],['celery',2,'pc'],['onion',1,'pc'],['tomato_puree',150,'g'],['stale_bread',300,'g'],['garlic',3,'clove'],['olive_oil',6,'tbsp'],['salt',null,'']],
  s:{fr:["Cuisez les haricots trempés 1 heure, puis mixez-en la moitié pour épaissir le bouillon.","Faites fondre oignon, carotte et céleri dans l'huile d'olive 15 minutes.","Ajoutez chou noir, chou blanc et tomate, mouillez avec le bouillon de haricots et cuisez 30 minutes.","Incorporez les haricots restants et des tranches de pain rassis, laissez gonfler 15 minutes.","Réchauffez le lendemain à la poêle avec un filet d'huile, jusqu'à ce qu'une croûte dorée se forme."],
     en:["Cook the soaked beans for 1 hour, then blend half to thicken the broth.","Soften onion, carrot and celery in olive oil for 15 minutes.","Add black kale, cabbage and tomato, moisten with the bean broth and cook 30 minutes.","Stir in the remaining beans and slices of stale bread, let them swell for 15 minutes.","Reheat the next day in a pan with a drizzle of oil, until a golden crust forms."]
     } },

{ id:'orecchiette-cime-rapa', c:'eu', lat:41.117, lon:16.871, base:4, prep:25, cook:15, diff:1, tags:['noodles','veg','spicy'],
  art:{v:'plate',bg:'#2a3324',plate:'#f2ece0',style:'noodle',food:['#4f8f4a','#e8dcc0','#c2452c'],garnish:'#6fbf8f'},
  n:{fr:'Orecchiette alle cime di rapa',en:'Orecchiette alle cime di rapa'},
  p:{fr:'Bari, Italie',en:'Bari, Italy'},
  d:{fr:"De petites pâtes en forme d'oreille, creusées au pouce, qui retiennent la sauce dans leur cuvette. Les brocoli-rave, légèrement amers, sont fondus à l'anchois et au piment jusqu'à disparaître presque dans la sauce.",
     en:"Small ear-shaped pasta, hollowed with the thumb, that catches the sauce in its little cup. Slightly bitter turnip tops are melted with anchovy and chilli until they almost dissolve into the sauce."
     },
  i:[['flour',400,'g'],['semolina',100,'g'],['water',220,'ml'],['turnip_tops',600,'g'],['anchovy_fillets',6,'pc'],['garlic',4,'clove'],['chili_flakes',1,'tsp'],['olive_oil',80,'ml'],['salt',null,'']],
  s:{fr:["Pétrissez semoule, farine et eau en une pâte ferme, laissez reposer 30 minutes.","Roulez des boudins fins, coupez des petits disques et creusez chacun au pouce sur le plan de travail.","Faites fondre l'ail et les anchois dans l'huile jusqu'à ce qu'ils se délitent, ajoutez le piment.","Cuisez les orecchiette avec les cime di rapa dans la même eau bouillante, 10 minutes.","Égouttez ensemble pâtes et légumes, sautez-les dans la poêle à l'ail et à l'anchois."],
     en:["Knead semolina, flour and water into a firm dough, rest 30 minutes.","Roll thin ropes, cut small discs and hollow each with the thumb on the worktop.","Melt garlic and anchovies in the oil until they dissolve, add the chilli.","Cook the orecchiette with the turnip tops in the same boiling water, 10 minutes.","Drain pasta and greens together and toss them in the pan with the garlic and anchovy."]
     } },

{ id:'arancini', c:'eu', lat:38.116, lon:13.361, base:8, prep:60, cook:20, diff:2, tags:['street','fry','rice'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'roll',food:['#e0b45c','#c2452c','#7fae5a'],garnish:'#7fae6a'},
  n:{fr:'Arancini',en:'Arancini'},
  p:{fr:'Palerme, Italie',en:'Palermo, Italy'},
  d:{fr:"Des boules de riz au safran, panées et frites, dont le nom rappelle la petite orange qu'elles imitent. À l'origine un plat de fête arabo-normand, farci de viande, de petits pois et de mozzarella fondante.",
     en:"Balls of saffron rice, breaded and fried, named for the little orange they resemble. Originally an Arab-Norman festive dish, stuffed with meat, peas and melting mozzarella."
     },
  i:[['carnaroli_rice',400,'g'],['saffron',1,'pinch'],['ground_beef',200,'g'],['tomato_puree',150,'g'],['peas',80,'g'],['mozzarella',150,'g'],['parmesan',60,'g'],['flour',100,'g'],['egg',2,'pc'],['breadcrumbs',200,'g'],['onion',1,'pc'],['frying_oil',1,'l'],['salt',null,'']],
  s:{fr:["Cuisez le riz au safran comme un risotto sans le remuer sans cesse, laissez-le refroidir complètement.","Préparez un petit ragoût de viande hachée, tomate, oignon et petits pois, bien réduit.","Formez une boule de riz creuse dans la paume, garnissez de ragoût et d'un dé de mozzarella, refermez.","Passez chaque boule dans la farine, l'œuf battu puis la chapelure.","Faites frire à 170 °C jusqu'à ce qu'elles soient dorées et croustillantes ; égouttez et servez chaud."],
     en:["Cook the saffron rice like a risotto without constant stirring, then let it cool completely.","Make a small ragù of minced beef, tomato, onion and peas, well reduced.","Shape a hollow ball of rice in your palm, fill with ragù and a cube of mozzarella, then close.","Coat each ball in flour, beaten egg, then breadcrumbs.","Fry at 170°C until golden and crisp; drain and serve hot."]
     } },

{ id:'tortellini-in-brodo', c:'eu', lat:44.494, lon:11.343, base:6, prep:60, cook:90, diff:3, tags:['soup','festive','pork'],
  art:{v:'bowl',bg:'#2c2a22',plate:'#f2ece0',style:'soup',food:['#e8dcc0','#f0e2b0','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Tortellini in brodo',en:'Tortellini in brodo'},
  p:{fr:'Bologne, Italie',en:'Bologna, Italy'},
  d:{fr:"De minuscules pâtes farcies de porc, mortadelle et parmesan, pliées en forme de nombril — la légende locale les fait naître d'un aubergiste qui aurait épié celui d'une déesse par le trou de la serrure.",
     en:"Tiny pasta stuffed with pork, mortadella and parmesan, folded into the shape of a navel — local legend has them invented by an innkeeper who peeked at a goddess's through a keyhole."
     },
  i:[['flour',400,'g'],['egg',4,'pc'],['pork_loin',150,'g'],['bologna',150,'g'],['prosciutto',100,'g'],['parmesan',100,'g'],['nutmeg',1,'pinch'],['beef_shank',600,'g'],['chicken',400,'g'],['carrot',2,'pc'],['celery',2,'pc'],['onion',1,'pc'],['salt',null,'']],
  s:{fr:["Préparez un bouillon avec bœuf, poulet, carotte, céleri et oignon, laissez frémir 3 heures en écumant.","Pétrissez farine et œufs en une pâte lisse, laissez reposer 30 minutes sous un linge.","Hachez très finement porc rôti, mortadelle et jambon, liez au parmesan, à l'œuf et à la muscade.","Étalez la pâte très fine, découpez des carrés de 4 cm, garnissez et pliez en triangle puis en nombril autour du doigt.","Pochez les tortellini 3 minutes directement dans le bouillon filtré et bouillant, servez aussitôt."],
     en:["Make a broth with beef, chicken, carrot, celery and onion, simmer 3 hours, skimming.","Knead flour and eggs into a smooth dough, rest 30 minutes under a cloth.","Finely mince roast pork, mortadella and ham, bind with parmesan, egg and nutmeg.","Roll the dough paper-thin, cut 4 cm squares, fill and fold into a triangle then a navel around your finger.","Poach the tortellini for 3 minutes straight in the strained, boiling broth and serve at once."]
     } },

{ id:'brasato-barolo', c:'eu', lat:44.700, lon:8.030, base:6, prep:30, cook:210, diff:2, tags:['slow','beef','festive'],
  art:{v:'plate',bg:'#2a2028',plate:'#f2ece0',style:'stew',food:['#4a2028','#7a3a2a','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Brasato al Barolo',en:'Brasato al Barolo'},
  p:{fr:'Alba, Italie',en:'Alba, Italy'},
  d:{fr:"Un rôti de bœuf mariné une nuit entière dans une bouteille de Barolo, puis braisé jusqu'à ce que le vin, réduit et mixé, devienne une sauce presque noire. La polenta crémeuse est son unique escorte légitime.",
     en:"A beef roast marinated overnight in a whole bottle of Barolo, then braised until the wine, reduced and blended, becomes an almost black sauce. Creamy polenta is its only legitimate escort."
     },
  i:[['beef_chuck',1.5,'kg'],['barolo_wine',750,'ml'],['carrot',2,'pc'],['celery',2,'pc'],['onion',2,'pc'],['garlic',3,'clove'],['cloves',3,'pc'],['cinnamon',1,'stick'],['bay_leaf',2,'pc'],['butter',40,'g'],['polenta',300,'g'],['beef_broth',600,'ml'],['salt',null,'']],
  s:{fr:["Faites mariner le rôti ficelé une nuit entière dans le vin avec légumes et épices.","Égouttez la viande, séchez-la et faites-la dorer sur toutes les faces dans le beurre.","Ajoutez les légumes de la marinade, puis le vin filtré ; couvrez et braisez 3 heures à feu très doux.","Retirez la viande, mixez la sauce jusqu'à ce qu'elle soit lisse et nappante, rectifiez l'assaisonnement.","Tranchez le rôti, nappez de sauce et servez avec une polenta crémeuse cuite dans le bouillon."],
     en:["Marinate the tied roast overnight in the wine with vegetables and spices.","Drain the meat, pat it dry and brown it all over in butter.","Add the marinade vegetables, then the strained wine; cover and braise 3 hours over very low heat.","Remove the meat, blend the sauce until smooth and coating, adjust the seasoning.","Slice the roast, coat with sauce and serve with a creamy polenta cooked in broth."]
     } },

{ id:'cacio-e-pepe', c:'eu', lat:41.893, lon:12.483, base:4, prep:10, cook:12, diff:2, tags:['noodles','veg','comfort'],
  art:{v:'plate',bg:'#2f2a20',plate:'#f2ece0',style:'noodle',food:['#f0e2b0','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Cacio e pepe',en:'Cacio e pepe'},
  p:{fr:'Rome, Italie',en:'Rome, Italy'},
  d:{fr:"Deux ingrédients, pecorino et poivre noir, et pourtant l'un des plats les plus difficiles de la cuisine italienne : le fromage doit crémer dans l'eau de cuisson sans jamais former de grumeaux filandreux.",
     en:"Two ingredients, pecorino and black pepper, and yet one of the hardest dishes in Italian cooking: the cheese must turn creamy in the pasta water without ever clumping into stringy lumps."
     },
  i:[['tonnarelli_pasta',400,'g'],['pecorino',200,'g'],['black_peppercorns',2,'tbsp'],['salt',null,'']],
  s:{fr:["Torréfiez le poivre concassé à sec 1 minute pour réveiller ses huiles essentielles.","Cuisez les pâtes dans une eau peu salée, en réservant beaucoup d'eau de cuisson.","Râpez le pecorino très finement et délayez-le avec un peu d'eau tiède en une crème lisse.","Égouttez les pâtes très al dente, mélangez-les au poivre hors du feu.","Incorporez la crème de pecorino en remuant énergiquement, en ajustant l'eau jusqu'à la texture soyeuse voulue."],
     en:["Toast the cracked pepper dry for 1 minute to wake its oils.","Cook the pasta in lightly salted water, saving plenty of pasta water.","Grate the pecorino very finely and loosen it with a little warm water into a smooth cream.","Drain the pasta very al dente, toss it with the pepper off the heat.","Fold in the pecorino cream, stirring vigorously, adjusting water to the desired silky texture."]
     } },

{ id:'focaccia-di-recco', c:'eu', lat:44.361, lon:9.152, base:6, prep:40, cook:12, diff:2, tags:['cheese','bread','street'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9dcc0',style:'flat',food:['#f0e2c0','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Focaccia di Recco',en:'Focaccia di Recco'},
  p:{fr:'Recco, Italie',en:'Recco, Italy'},
  d:{fr:"Rien à voir avec la focaccia moelleuse : ici, deux feuilles de pâte étirées presque transparentes enferment le crescenza, un fromage frais qui fond en poche crémeuse au four très chaud.",
     en:"Nothing like the soft, spongy focaccia: here two sheets of dough, stretched almost transparent, enclose crescenza, a fresh cheese that melts into a creamy pocket in a very hot oven."
     },
  i:[['flour',400,'g'],['water',180,'ml'],['olive_oil',60,'ml'],['crescenza_cheese',500,'g'],['salt',null,'']],
  s:{fr:["Pétrissez farine, eau, huile et sel en une pâte souple, laissez reposer 1 heure sous un linge huilé.","Divisez en deux et étirez chaque pâton à la main sur un plan fariné, jusqu'à ce qu'il soit presque transparent.","Déposez des noix de crescenza réparties sur la première abaisse.","Recouvrez de la seconde abaisse, pincez les bords et percez quelques trous pour laisser échapper la vapeur.","Enfournez 10 à 12 minutes à 250 °C jusqu'à ce que de grandes taches dorées apparaissent."],
     en:["Knead flour, water, oil and salt into a supple dough, rest 1 hour under an oiled cloth.","Divide in two and stretch each piece by hand on a floured surface until almost transparent.","Dot the first sheet with knobs of crescenza cheese.","Cover with the second sheet, pinch the edges and pierce a few holes to let steam escape.","Bake 10 to 12 minutes at 250°C until large golden patches appear."]
     } },

{ id:'sarde-in-saor', c:'eu', lat:45.440, lon:12.316, base:4, prep:30, cook:20, diff:1, tags:['sea','fresh','sunday'],
  art:{v:'plate',bg:'#26333c',plate:'#f2ece0',style:'fish',food:['#9fb0bc','#e0b45c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Sarde in saor',en:'Sarde in saor'},
  p:{fr:'Venise, Italie',en:'Venice, Italy'},
  d:{fr:"Inventée pour que les marins vénitiens emportent du poisson qui se conserve en mer : sardines frites puis marinées sous des couches d'oignons doux au vinaigre, avec raisins secs et pignons. Meilleure après deux jours de repos.",
     en:"Invented so Venetian sailors could carry fish that would keep at sea: fried sardines marinated under layers of sweet vinegared onions, with raisins and pine nuts. Best after two days' rest."
     },
  i:[['sardines',800,'g'],['onion',4,'pc'],['white_wine_vinegar',150,'ml'],['raisins',60,'g'],['pine_nuts',40,'g'],['flour',80,'g'],['frying_oil',300,'ml'],['bay_leaf',2,'pc'],['salt',null,'']],
  s:{fr:["Videz et écaillez les sardines, farinez-les et faites-les frire jusqu'à ce qu'elles soient dorées.","Émincez finement les oignons et faites-les fondre longuement dans l'huile jusqu'à ce qu'ils soient translucides.","Déglacez au vinaigre, ajoutez le laurier et laissez réduire légèrement.","Faites tremper les raisins secs dans un peu d'eau tiède, égouttez-les.","Alternez en couches sardines, oignons, raisins et pignons dans un plat ; couvrez et laissez mariner 2 jours au frais avant de servir à température ambiante."],
     en:["Gut and scale the sardines, dust with flour and fry until golden.","Slice the onions finely and melt them slowly in oil until translucent.","Deglaze with vinegar, add the bay and let it reduce slightly.","Soak the raisins in a little warm water and drain.","Layer sardines, onions, raisins and pine nuts in a dish; cover and marinate 2 days in the fridge before serving at room temperature."]
     } },

{ id:'pizza-margherita', c:'eu', lat:40.852, lon:14.268, base:2, prep:120, cook:2, diff:2, tags:['street','bake','cheese'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'flat',food:['#c2452c','#f0e2c0','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Pizza margherita',en:'Pizza margherita'},
  p:{fr:'Naples, Italie',en:'Naples, Italy'},
  d:{fr:"Une pâte levée trois fois, étirée à la main sans jamais toucher de rouleau, cuite quatre-vingt-dix secondes dans un four à bois porté à 450 °C. Tomate, mozzarella et basilic reprennent, dit-on, les couleurs du drapeau italien.",
     en:"A dough risen three times, stretched by hand and never touched by a rolling pin, baked ninety seconds in a wood oven at 450°C. Tomato, mozzarella and basil are said to echo the colours of the Italian flag."
     },
  i:[['flour',500,'g'],['water',320,'ml'],['dry_yeast',3,'g'],['salt',12,'g'],['tomato_puree',200,'g'],['mozzarella',250,'g'],['basil',10,'pc'],['olive_oil',2,'tbsp']],
  s:{fr:["Pétrissez farine, eau, levure et sel 10 minutes en une pâte lisse et élastique.","Laissez lever 2 heures à température ambiante, puis divisez en boules et laissez encore lever 4 heures.","Étirez chaque boule à la main en un disque fin, en gardant un bord épais.","Garnissez de tomate concassée, de mozzarella égouttée en morceaux, d'un filet d'huile et de sel.","Enfournez au four le plus chaud possible jusqu'à ce que les bords soient boursouflés et tachés de noir, ajoutez le basilic frais à la sortie."],
     en:["Knead flour, water, yeast and salt for 10 minutes into a smooth, elastic dough.","Let it rise 2 hours at room temperature, divide into balls and let rise a further 4 hours.","Stretch each ball by hand into a thin disc, keeping a thick rim.","Top with crushed tomato, torn drained mozzarella, a drizzle of oil and salt.","Bake in the hottest oven possible until the rim is puffed and charred in spots, add fresh basil straight after."]
     } }
];
