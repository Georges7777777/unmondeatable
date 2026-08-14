/* ---------- Espagne régionale ---------- */
const D11 = [
{ id:'tortilla-espanola', c:'eu', lat:40.417, lon:-3.703, base:6, prep:20, cook:25, diff:1, tags:['veg','comfort','street'],
  art:{v:'plate',bg:'#2f2a20',plate:'#f2ece0',style:'cake',food:['#e8c96a','#f0dc9a'],garnish:'#7fae6a'},
  n:{fr:'Tortilla espagnole',en:'Spanish tortilla'},
  p:{fr:'Madrid, Espagne',en:'Madrid, Spain'},
  d:{fr:"Rien que des pommes de terre confites dans l'huile d'olive, de l'oignon et des œufs — et pourtant deux camps irréconciliables : avec ou sans oignon. Le vrai débat, lui, porte sur le cœur, qui doit rester baveux.",
     en:"Nothing but potatoes confited in olive oil, onion and eggs — and yet two irreconcilable camps: with or without onion. The real argument is over the centre, which must stay runny."
     },
  i:[['potato',1,'kg'],['onion',2,'pc'],['egg',8,'pc'],['olive_oil',400,'ml'],['salt',null,'']],
  s:{fr:["Coupez les pommes de terre en tranches fines et confisez-les 20 minutes dans l'huile à feu doux avec l'oignon.","Égouttez en réservant l'huile, écrasez légèrement quelques tranches.","Battez les œufs, salez, et mélangez-y les pommes de terre encore tièdes ; laissez reposer 10 minutes.","Versez dans une poêle avec un peu d'huile réservée, cuisez 3 minutes à feu vif puis à couvert 2 minutes à feu doux.","Retournez la tortilla à l'aide d'une assiette et cuisez encore 2 minutes : le cœur doit rester crémeux."],
     en:["Slice the potatoes thinly and confit them 20 minutes in oil over low heat with the onion.","Drain, keeping the oil, and lightly crush a few slices.","Beat the eggs, season, and fold in the still-warm potatoes; rest 10 minutes.","Pour into a pan with a little reserved oil, cook 3 minutes on high heat then covered 2 minutes on low.","Flip the tortilla using a plate and cook 2 more minutes: the centre should stay creamy."]
     } },

{ id:'fabada-asturiana', c:'eu', lat:43.361, lon:-5.849, base:6, prep:20, cook:150, diff:1, tags:['slow','pork','legume'],
  art:{v:'bowl',bg:'#2a2620',plate:'#f2ece0',style:'stew',food:['#e8dcc0','#8a5a34','#c2452c'],garnish:'#7fae6a'},
  n:{fr:'Fabada asturienne',en:'Asturian fabada'},
  p:{fr:'Oviedo, Espagne',en:'Oviedo, Spain'},
  d:{fr:"Un ragoût de fabes — de grosses fèves blanches des Asturies — cuit avec chorizo, boudin et lard fumé, dont le bouillon safrané doit napper la cuillère. On ne remue jamais : on secoue seulement la marmite.",
     en:"A stew of fabes — large white Asturian beans — cooked with chorizo, morcilla and smoked bacon, its saffron broth thick enough to coat a spoon. It is never stirred, only shaken in the pot."
     },
  i:[['fabes_beans',500,'g'],['chorizo',4,'pc'],['blood_sausage',4,'pc'],['smoked_bacon',200,'g'],['pork_belly',200,'g'],['saffron',1,'pinch'],['onion',1,'pc'],['garlic',2,'clove'],['bay_leaf',1,'pc'],['olive_oil',3,'tbsp'],['salt',null,'']],
  s:{fr:["Trempez les fabes une nuit, puis démarrez leur cuisson à l'eau froide sans les saler.","Ajoutez oignon, ail et laurier, portez à peine à frémissement et écumez souvent.","Ajoutez les viandes entières et cuisez 2 heures à tout petit feu, en secouant la marmite de temps en temps.","Prélevez un peu de bouillon chaud pour y infuser le safran, puis reversez-le dans la marmite.","Laissez reposer 20 minutes hors du feu avant de servir, viandes tranchées à part sur le ragoût."],
     en:["Soak the fabes overnight, then start them in cold water without salt.","Add onion, garlic and bay, bring to the barest simmer and skim often.","Add the whole cuts of meat and cook 2 hours over the lowest heat, shaking the pot from time to time.","Take a little hot broth to steep the saffron, then return it to the pot.","Rest 20 minutes off the heat before serving, the sliced meats laid over the stew."]
     } },

{ id:'pulpo-a-la-gallega', c:'eu', lat:42.881, lon:-8.545, base:4, prep:20, cook:50, diff:1, tags:['sea','festive','street'],
  art:{v:'board',bg:'#26333c',plate:'#e9dcc0',style:'flat',food:['#c9927a','#e0b45c','#c2452c'],garnish:'#7fae6a'},
  n:{fr:'Poulpe à la galicienne',en:'Galician-style octopus'},
  p:{fr:'Saint-Jacques-de-Compostelle, Espagne',en:'Santiago de Compostela, Spain'},
  d:{fr:"Servi sur une planche de bois, tranché aux ciseaux et parsemé de paprika fumé et de gros sel. Le secret des pulpeiras : plonger le poulpe trois fois dans l'eau bouillante avant de le laisser cuire, pour qu'il ne durcisse jamais.",
     en:"Served on a wooden board, snipped with scissors and dusted with smoked paprika and coarse salt. The pulpeiras' secret: dip the octopus three times into boiling water before letting it cook, so it never toughens."
     },
  i:[['octopus',1.5,'kg'],['potato',4,'pc'],['sweet_paprika',2,'tsp'],['smoked_paprika',1,'tsp'],['coarse_salt',1,'tbsp'],['olive_oil',6,'tbsp']],
  s:{fr:["Portez une grande quantité d'eau à ébullition, sans sel.","Tenez le poulpe par la tête et plongez-le trois fois quelques secondes dans l'eau bouillante avant de l'y laisser entièrement.","Cuisez 40 à 50 minutes selon la taille, jusqu'à ce qu'une fourchette s'enfonce sans résistance.","Cuisez les pommes de terre dans la même eau, puis tranchez-les épaisses sur la planche.","Coupez le poulpe aux ciseaux en rondelles, disposez sur les pommes de terre, arrosez d'huile d'olive et saupoudrez des deux paprikas et de gros sel."],
     en:["Bring a large pot of unsalted water to the boil.","Hold the octopus by the head and dip it three times for a few seconds into the boiling water before submerging it fully.","Cook 40 to 50 minutes depending on size, until a fork sinks in without resistance.","Cook the potatoes in the same water, then slice them thickly on the board.","Snip the octopus into rounds with scissors, arrange over the potatoes, drizzle with olive oil and dust with both paprikas and coarse salt."]
     } },

{ id:'cochinillo-segoviano', c:'eu', lat:40.947, lon:-4.118, base:6, prep:30, cook:120, diff:2, tags:['festive','pork','bake'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9dcc0',style:'grill',food:['#c9784a','#a85f34','#6b3520'],garnish:'#7fae6a'},
  n:{fr:'Cochinillo de Ségovie',en:'Segovia-style suckling pig'},
  p:{fr:'Ségovie, Espagne',en:'Segovia, Spain'},
  d:{fr:"Un cochon de lait de trois semaines, rôti au four à bois jusqu'à ce que la peau craque comme du verre. Selon la tradition des mesones ségoviens, on le découpe symboliquement au bord d'une assiette, jamais au couteau.",
     en:"A three-week-old suckling pig, roasted in a wood oven until the skin cracks like glass. In the tradition of Segovia's mesones, it is symbolically carved with the edge of a plate, never a knife."
     },
  i:[['suckling_pig',1,'pc'],['lard',60,'g'],['coarse_salt',3,'tbsp'],['bay_leaf',4,'pc'],['white_wine',150,'ml'],['garlic',4,'clove'],['water',200,'ml']],
  s:{fr:["Frottez le cochon de lait entier de saindoux et de sel, à l'intérieur comme à l'extérieur.","Disposez-le sur un lit de laurier et d'ail dans un plat en terre, ajoutez eau et vin.","Enfournez 1 h 30 à 160 °C, peau vers le bas, en arrosant régulièrement du jus.","Retournez délicatement peau vers le haut et poursuivez 30 minutes à 220 °C jusqu'à ce qu'elle craque.","Laissez reposer 10 minutes et découpez à l'assiette, en pressant sur le dos pour entendre la peau craquer."],
     en:["Rub the whole suckling pig with lard and salt, inside and out.","Lay it on a bed of bay and garlic in an earthenware dish, add water and wine.","Roast 1½ hours at 160°C, skin down, basting regularly with the juices.","Carefully turn skin up and continue 30 minutes at 220°C until it cracks.","Rest 10 minutes and carve with a plate, pressing the back so the skin audibly cracks."]
     } },

{ id:'cocido-madrileno', c:'eu', lat:40.417, lon:-3.703, base:8, prep:30, cook:180, diff:2, tags:['slow','sunday','legume'],
  art:{v:'bowl',bg:'#2a2620',plate:'#f2ece0',style:'stew',food:['#e8dcc0','#8a5a34','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Cocido madrilène',en:'Madrid-style cocido'},
  p:{fr:'Madrid, Espagne',en:'Madrid, Spain'},
  d:{fr:"Un pot-au-feu de pois chiches servi en trois « vuelcos » successifs : d'abord la soupe aux vermicelles, puis les légumes, enfin les viandes. Un déjeuner d'hiver qui occupe toute une après-midi de dimanche.",
     en:"A chickpea stew served in three successive vuelcos — courses: first the noodle soup, then the vegetables, finally the meats. A winter lunch that occupies an entire Sunday afternoon."
     },
  i:[['dried_chickpeas',400,'g'],['beef_shank',400,'g'],['chicken',400,'g'],['pork_belly',200,'g'],['chorizo',2,'pc'],['blood_sausage',2,'pc'],['bone_marrow',200,'g'],['cabbage',1,'pc'],['carrot',3,'pc'],['potato',4,'pc'],['vermicelli',150,'g'],['garlic',2,'clove'],['salt',null,'']],
  s:{fr:["Trempez les pois chiches une nuit dans l'eau salée, enfermés dans une gaze pour les garder entiers.","Démarrez bœuf, poulet, os à moelle et lard à l'eau froide, écumez, puis ajoutez les pois chiches.","Laissez mijoter 2 heures, ajoutez chorizo, carotte et pomme de terre 40 minutes avant la fin.","Faites cuire le chou séparément et sautez-le à l'ail.","Servez d'abord le bouillon avec les vermicelles, puis légumes et pois chiches, enfin les viandes tranchées."],
     en:["Soak the chickpeas overnight in salted water, tied in gauze to keep them whole.","Start beef, chicken, marrow bone and bacon in cold water, skim, then add the chickpeas.","Simmer 2 hours, adding chorizo, carrot and potato 40 minutes before the end.","Cook the cabbage separately and sauté it with garlic.","Serve first the broth with vermicelli, then the vegetables and chickpeas, finally the sliced meats."]
     } },

{ id:'pisto-manchego', c:'eu', lat:39.862, lon:-4.028, base:4, prep:20, cook:45, diff:1, tags:['veg','comfort','slow'],
  art:{v:'bowl',bg:'#2a3324',plate:'#f2ece0',style:'stew',food:['#c2452c','#e0a83a','#4f8f4a'],garnish:'#6fbf8f'},
  n:{fr:'Pisto manchego',en:'Pisto manchego'},
  p:{fr:'Tolède, Espagne',en:'Toledo, Spain'},
  d:{fr:"La ratatouille de la Manche, mijotée lentement en une texture presque confite plutôt que croquante. On la sert traditionnellement couronnée d'un œuf frit, pour que le jaune se mêle aux légumes fondants.",
     en:"La Mancha's ratatouille, simmered slowly to an almost jammy texture rather than crisp. Traditionally crowned with a fried egg, so the yolk mingles into the melting vegetables."
     },
  i:[['zucchini',3,'pc'],['green_pepper',2,'pc'],['red_pepper',1,'pc'],['ripe_tomato',6,'pc'],['onion',2,'pc'],['garlic',3,'clove'],['egg',4,'pc'],['olive_oil',6,'tbsp'],['sugar',1,'tsp'],['salt',null,'']],
  s:{fr:["Faites fondre oignon, poivrons et ail dans l'huile d'olive 15 minutes à feu doux.","Ajoutez les courgettes en dés et poursuivez 10 minutes.","Incorporez les tomates pelées et concassées, le sucre et le sel.","Laissez mijoter à découvert 25 minutes, en remuant peu, jusqu'à ce que le mélange soit confit.","Servez chaud, chaque assiette couronnée d'un œuf frit au jaune coulant."],
     en:["Melt onion, peppers and garlic in olive oil for 15 minutes over low heat.","Add the diced courgettes and continue for 10 minutes.","Stir in the peeled, chopped tomatoes, sugar and salt.","Simmer uncovered for 25 minutes, stirring little, until jammy.","Serve hot, each plate crowned with a fried egg, yolk still runny."]
     } },

{ id:'migas-extremenas', c:'eu', lat:39.476, lon:-6.372, base:4, prep:720, cook:25, diff:1, tags:['pork','comfort','breakfast'],
  art:{v:'plate',bg:'#2f2a20',plate:'#f2ece0',style:'rice',food:['#e8dcc0','#c9927a','#8a5a34'],garnish:'#7fae6a'},
  n:{fr:'Migas extremeñas',en:'Migas extremeñas'},
  p:{fr:'Cáceres, Espagne',en:'Cáceres, Spain'},
  d:{fr:"Le pain rassis des bergers d'Estrémadure, émietté, humidifié une nuit puis sauté dans la graisse de porc jusqu'à devenir de petites perles dorées et sèches. Accompagné de raisins ou de chorizo, selon l'humeur du jour.",
     en:"The stale bread of Extremadura's shepherds, crumbled, dampened overnight then fried in pork fat until it turns into small dry golden pearls. Served with grapes or chorizo, depending on the day's mood."
     },
  i:[['stale_bread',600,'g'],['water',300,'ml'],['pork_belly',200,'g'],['chorizo',2,'pc'],['garlic',6,'clove'],['sweet_paprika',1,'tsp'],['lard',3,'tbsp'],['grapes',200,'g'],['coarse_salt',1,'tsp']],
  s:{fr:["Émiettez le pain rassis très fin, humidifiez-le d'eau salée et couvrez-le d'un linge humide une nuit entière.","Faites rissoler la poitrine en dés et le chorizo dans le saindoux, réservez.","Faites dorer l'ail entier en chemise dans la même graisse, ajoutez le paprika hors du feu.","Ajoutez le pain émietté et sautez à feu vif 15 minutes en remuant sans cesse à la spatule pour bien le sécher.","Remettez viandes et ail, servez brûlant avec une grappe de raisins frais."],
     en:["Crumble the stale bread very finely, dampen it with salted water and cover with a damp cloth overnight.","Fry the diced pork belly and chorizo in lard, set aside.","Brown the whole unpeeled garlic cloves in the same fat, add the paprika off the heat.","Add the crumbled bread and fry over high heat for 15 minutes, stirring constantly with a spatula to dry it out.","Return the meats and garlic, serve piping hot with a bunch of fresh grapes."]
     } },

{ id:'calcots-romesco', c:'eu', lat:41.286, lon:1.249, base:6, prep:15, cook:20, diff:1, tags:['veg','grill','festive'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9dcc0',style:'grill',food:['#4f8f4a','#c2452c'],garnish:'#7fae6a'},
  n:{fr:'Calçots à la romesco',en:'Calçots with romesco'},
  p:{fr:'Valls, Espagne',en:'Valls, Spain'},
  d:{fr:"De grands oignons doux catalans, grillés au sarment jusqu'à noircir entièrement, qu'on épluche avec les doigts et trempe dans la romesco. La calçotada se mange en plein air, bavette nouée autour du cou.",
     en:"Large sweet Catalan onions, grilled over vine cuttings until fully blackened, peeled with the fingers and dipped in romesco. The calçotada is eaten outdoors, a bib tied round the neck."
     },
  i:[['calcots',36,'pc'],['roasted_red_pepper',3,'pc'],['tomato',2,'pc'],['almonds',60,'g'],['hazelnuts',40,'g'],['garlic',3,'clove'],['dried_nyora_pepper',2,'pc'],['bread',1,'slice'],['olive_oil',150,'ml'],['red_wine_vinegar',2,'tbsp'],['salt',null,'']],
  s:{fr:["Grillez les calçots entiers sur des braises vives jusqu'à ce que la peau noircisse complètement.","Enveloppez-les dans du papier journal 10 minutes pour qu'ils finissent de cuire à l'étouffée.","Mixez poivrons rôtis, tomate, amandes, noisettes, ail, ñoras réhydratées et pain frit en une pâte.","Montez à l'huile d'olive comme une mayonnaise, assaisonnez de vinaigre et de sel.","Épluchez les calçots avec les doigts en tirant la peau noircie et trempez-les dans la romesco."],
     en:["Grill the whole calçots over hot embers until the skin is fully blackened.","Wrap them in newspaper for 10 minutes to finish steaming in their own heat.","Blend roasted peppers, tomato, almonds, hazelnuts, garlic, soaked ñora peppers and fried bread into a paste.","Whip in the olive oil like a mayonnaise, season with vinegar and salt.","Peel the calçots with your fingers, pulling off the blackened skin, and dip them into the romesco."]
     } },

{ id:'marmitako', c:'eu', lat:43.318, lon:-1.981, base:4, prep:20, cook:30, diff:1, tags:['sea','soup','comfort'],
  art:{v:'bowl',bg:'#26333c',plate:'#f2ece0',style:'soup',food:['#c2452c','#8a5a34','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Marmitako',en:'Marmitako'},
  p:{fr:'Saint-Sébastien, Espagne',en:'San Sebastián, Spain'},
  d:{fr:"Le ragoût que préparaient les marins basques à bord, avec le thon fraîchement pêché et les provisions du bord : pommes de terre cassées à la main pour libérer leur fécule et épaissir le bouillon sans farine.",
     en:"The stew Basque sailors made on board with freshly caught tuna and the ship's stores: potatoes broken by hand to release their starch and thicken the broth without flour."
     },
  i:[['tuna',600,'g'],['potato',700,'g'],['green_pepper',1,'pc'],['red_pepper',1,'pc'],['onion',2,'pc'],['garlic',3,'clove'],['ripe_tomato',3,'pc'],['sweet_paprika',1,'tsp'],['white_wine',100,'ml'],['fish_broth',500,'ml'],['olive_oil',4,'tbsp'],['salt',null,'']],
  s:{fr:["Faites fondre oignon, poivrons et ail dans l'huile d'olive 15 minutes.","Ajoutez la tomate concassée et le paprika hors du feu, laissez compoter 10 minutes.","Cassez les pommes de terre à la pointe du couteau plutôt que de les couper, pour qu'elles libèrent leur fécule.","Ajoutez-les avec le vin et le bouillon, cuisez 20 minutes à couvert jusqu'à ce que le bouillon épaississe.","Ajoutez le thon coupé en gros cubes, coupez le feu et laissez-le pocher 5 minutes dans la chaleur résiduelle."],
     en:["Melt onion, peppers and garlic in olive oil for 15 minutes.","Add the chopped tomato and paprika off the heat, let it cook down for 10 minutes.","Break the potatoes with a knife tip rather than cutting them, so they release their starch.","Add them with the wine and broth, cook 20 minutes covered until the broth thickens.","Add the tuna in large cubes, turn off the heat and let it poach 5 minutes in the residual warmth."]
     } },

{ id:'salmorejo-cordobes', c:'eu', lat:37.889, lon:-4.780, base:4, prep:20, cook:0, diff:1, tags:['veg','fresh','soup'],
  art:{v:'bowl',bg:'#2c3a2c',plate:'#f2ece0',style:'soup',food:['#c2402c','#e8dcc0','#e8b04b'],garnish:'#6fbf8f'},
  n:{fr:'Salmorejo cordouan',en:'Salmorejo cordobés'},
  p:{fr:'Cordoue, Espagne',en:'Córdoba, Spain'},
  d:{fr:"Plus épais et plus riche que le gazpacho dont il est cousin : beaucoup plus de pain, beaucoup plus d'huile d'olive, mixés jusqu'à devenir aussi lisses qu'une crème. On le sert froid, couronné d'œuf dur et de jambon serrano.",
     en:"Thicker and richer than its cousin gazpacho: far more bread, far more olive oil, blended until as smooth as cream. Served cold, crowned with hard-boiled egg and serrano ham."
     },
  i:[['ripe_tomato',1,'kg'],['stale_bread',200,'g'],['garlic',2,'clove'],['olive_oil',150,'ml'],['sherry_vinegar',1,'tbsp'],['egg',2,'pc'],['serrano_ham',80,'g'],['salt',null,'']],
  s:{fr:["Mixez les tomates crues avec l'ail jusqu'à obtenir un jus homogène.","Ajoutez le pain rassis émietté et laissez-le se gorger de jus 10 minutes.","Mixez longuement, au moins 5 minutes, en versant l'huile d'olive en filet.","Ajoutez le vinaigre de Xérès et le sel, mixez encore jusqu'à une texture parfaitement lisse.","Réfrigérez 2 heures et servez très froid, couronné d'œuf dur émietté et de jambon serrano en dés."],
     en:["Blend the raw tomatoes with the garlic until juiced smooth.","Add the crumbled stale bread and let it soak up the juice for 10 minutes.","Blend at length, at least 5 minutes, pouring in the olive oil in a thin stream.","Add the sherry vinegar and salt, blend again to a perfectly smooth texture.","Chill 2 hours and serve very cold, crowned with crumbled hard-boiled egg and diced serrano ham."]
     } },

{ id:'empanada-gallega', c:'eu', lat:42.235, lon:-8.720, base:8, prep:60, cook:40, diff:2, tags:['sea','bake','festive'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9dcc0',style:'pastry',food:['#e0b45c','#c2452c','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Empanada galicienne',en:'Galician empanada'},
  p:{fr:'Vigo, Espagne',en:'Vigo, Spain'},
  d:{fr:"Une grande tourte de pâte au levain, garnie d'une confiture de thon ou de morue et de poivrons longuement mijotés jusqu'à devenir presque sucrés. Elle se mange froide, tranchée en carrés, dans un panier de pique-nique.",
     en:"A large yeasted pie filled with a slow-cooked jam of tuna or cod and peppers, cooked until almost sweet. It is eaten cold, cut into squares, straight from a picnic basket."
     },
  i:[['flour',500,'g'],['dry_yeast',7,'g'],['olive_oil',100,'ml'],['water',200,'ml'],['tuna',400,'g'],['onion',4,'pc'],['red_pepper',2,'pc'],['ripe_tomato',3,'pc'],['sweet_paprika',1,'tsp'],['egg',1,'pc'],['salt',null,'']],
  s:{fr:["Pétrissez farine, levure, huile, eau et sel en une pâte souple, laissez lever 1 h 30.","Faites fondre oignons et poivrons très longuement dans l'huile, au moins 45 minutes, jusqu'à ce qu'ils caramélisent.","Ajoutez tomate et paprika, laissez compoter encore 15 minutes, puis incorporez le thon égoutté.","Étalez la moitié de la pâte, garnissez, couvrez du reste de pâte et scellez les bords en les roulant.","Dorez à l'œuf battu et enfournez 30 à 35 minutes à 200 °C jusqu'à ce que le dessus soit bien doré."],
     en:["Knead flour, yeast, oil, water and salt into a supple dough, let it rise 1½ hours.","Melt the onions and peppers very slowly in oil, at least 45 minutes, until caramelised.","Add tomato and paprika, cook down 15 more minutes, then fold in the drained tuna.","Roll out half the dough, fill, cover with the rest and seal the edges by rolling them.","Brush with beaten egg and bake 30 to 35 minutes at 200°C until deep golden on top."]
     } },

{ id:'churros-con-chocolate', c:'eu', lat:40.417, lon:-3.703, base:6, prep:15, cook:20, diff:2, tags:['sweet','street','breakfast'],
  art:{v:'board',bg:'#2c2620',plate:'#e9dcc0',style:'roll',food:['#e0b45c','#6b3b20'],garnish:'#7fae6a'},
  n:{fr:'Churros con chocolate',en:'Churros con chocolate'},
  p:{fr:'Madrid, Espagne',en:'Madrid, Spain'},
  d:{fr:"Une pâte à choux frite en longs bâtonnets cannelés, croustillants dehors, tendres dedans, trempés dans un chocolat épais comme une crème anglaise ratée avec bonheur. Le petit-déjeuner des lendemains de fête.",
     en:"Choux pastry piped into long ridged sticks, fried crisp outside and tender inside, dunked in a chocolate as thick as a happily failed custard. The breakfast of the morning after a party."
     },
  i:[['flour',250,'g'],['water',300,'ml'],['salt',1,'pinch'],['frying_oil',1,'l'],['sugar',3,'tbsp'],['dark_chocolate',250,'g'],['whole_milk',500,'ml'],['cornstarch',1,'tbsp']],
  s:{fr:["Portez l'eau salée à ébullition, versez la farine d'un coup et travaillez énergiquement hors du feu jusqu'à ce que la pâte se détache des parois.","Laissez tiédir 5 minutes, puis remplissez une poche à douille cannelée.","Faites frire de longs bâtonnets à 180 °C, en les coupant aux ciseaux au-dessus de l'huile, jusqu'à dorure.","Égouttez, roulez dans le sucre encore chaud.","Faites fondre le chocolat dans le lait avec la fécule, en remuant jusqu'à épaississement, et servez brûlant pour tremper les churros."],
     en:["Bring salted water to the boil, tip in the flour all at once and beat vigorously off the heat until the dough pulls from the sides.","Cool 5 minutes, then fill a piping bag fitted with a ridged nozzle.","Fry long sticks at 180°C, snipping them with scissors over the oil, until golden.","Drain and roll while still hot in sugar.","Melt the chocolate in the milk with the cornflour, stirring until thick, and serve piping hot for dunking."]
     } }
];
