/* ---------- France ---------- */
const D8 = [
{ id:'choucroute-garnie', c:'eu', lat:48.573, lon:7.752, base:6, prep:30, cook:180, diff:1, tags:['slow','pork','comfort'],
  art:{v:'plate',bg:'#2f3340',plate:'#f2ece0',style:'grill',food:['#e8dcc0','#c9927a','#a85f34'],garnish:'#7fae6a'},
  n:{fr:'Choucroute garnie',en:'Choucroute garnie'},
  p:{fr:'Strasbourg, France',en:'Strasbourg, France'},
  d:{fr:"Le chou fermenté au sel, technique venue de Chine par l'Europe centrale, mijoté au riesling avec cinq à six charcuteries différentes. Un plat de brasserie qui se partage à table, jamais en portion individuelle.",
     en:"Cabbage fermented in salt — a technique that reached Alsace from China via central Europe — simmered in riesling with five or six different cured meats. A brasserie dish meant to be shared, never plated alone."
     },
  i:[['sauerkraut',1.5,'kg'],['smoked_pork_loin',600,'g'],['pork_knuckle',1,'pc'],['strasbourg_sausage',6,'pc'],['montbeliard_sausage',3,'pc'],['smoked_bacon',200,'g'],['onion',2,'pc'],['riesling',400,'ml'],['juniper_berries',1,'tbsp'],['bay_leaf',2,'pc'],['potato',8,'pc'],['lard',3,'tbsp'],['pepper',null,'']],
  s:{fr:["Rincez la choucroute à l'eau froide et pressez-la fortement pour ôter l'excès d'acidité.","Faites fondre les oignons dans le saindoux, ajoutez la choucroute, le genièvre et le laurier.","Mouillez au riesling, enfouissez lard et palette, couvrez et laissez mijoter 2 heures à feu très doux.","Ajoutez les pommes de terre pelées 40 minutes avant la fin.","Pochez les saucisses à part dans l'eau frémissante 10 minutes : elles ne doivent jamais bouillir."],
     en:["Rinse the sauerkraut in cold water and squeeze it hard to remove excess acidity.","Soften the onions in lard, then add the sauerkraut, juniper and bay.","Pour in the riesling, bury the bacon and smoked loin, cover and simmer 2 hours very gently.","Add the peeled potatoes 40 minutes before the end.","Poach the sausages separately in barely simmering water for 10 minutes — never let them boil."]
     } },

{ id:'boeuf-bourguignon', c:'eu', lat:47.322, lon:5.041, base:6, prep:40, cook:210, diff:2, tags:['slow','beef','sunday'],
  art:{v:'bowl',bg:'#2a2028',plate:'#f2ece0',style:'stew',food:['#5a2a24','#7a3a2a','#c9924a','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Bœuf bourguignon',en:'Beef bourguignon'},
  p:{fr:'Dijon, France',en:'Dijon, France'},
  d:{fr:"Un ragoût paysan que le vin rouge de Bourgogne a rendu illustre : la viande y macère une nuit avant de fondre pendant trois heures. La garniture — lardons, oignons grelots, champignons — se prépare toujours à part.",
     en:"A peasant stew made famous by Burgundy's red wine: the beef marinates overnight, then melts over three hours. The garnish of bacon, baby onions and mushrooms is always cooked separately."
     },
  i:[['beef_chuck',1.2,'kg'],['red_wine',750,'ml'],['smoked_bacon',200,'g'],['pearl_onions',300,'g'],['button_mushrooms',300,'g'],['carrot',3,'pc'],['onion',1,'pc'],['garlic',3,'clove'],['tomato_paste',1,'tbsp'],['flour',2,'tbsp'],['beef_broth',400,'ml'],['thyme',3,'sprig'],['bay_leaf',2,'pc'],['butter',40,'g'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Faites mariner la viande une nuit au vin rouge avec carotte, oignon, thym et laurier.","Égouttez et séchez soigneusement les morceaux, puis saisissez-les par petites quantités.","Singez à la farine, ajoutez le concentré de tomate, la marinade filtrée et le bouillon.","Couvrez et laissez mijoter 3 heures à 150 °C, jusqu'à ce que la viande cède sous la fourchette.","Poêlez séparément lardons, oignons grelots et champignons, ajoutez-les en fin de cuisson."],
     en:["Marinate the beef overnight in red wine with carrot, onion, thyme and bay.","Drain and dry the pieces thoroughly, then sear them in small batches.","Dust with flour, add tomato paste, the strained marinade and the broth.","Cover and cook 3 hours at 150°C, until the meat yields to a fork.","Separately fry the bacon, baby onions and mushrooms, and fold them in at the end."]
     } },

{ id:'galette-sarrasin', c:'eu', lat:48.117, lon:-1.677, base:4, prep:90, cook:15, diff:1, tags:['bread','street','cheese'],
  art:{v:'plate',bg:'#2c3330',plate:'#f2ece0',style:'flat',food:['#6b5236','#8a6a44','#e8c96a','#f2ece0'],garnish:'#7fae6a'},
  n:{fr:'Galette de sarrasin complète',en:'Buckwheat galette'},
  p:{fr:'Rennes, France',en:'Rennes, France'},
  d:{fr:"Le blé noir, cultivé sur les terres pauvres de Bretagne depuis le XVᵉ siècle, donne une pâte sans gluten qu'on étale au rozell sur une bilig brûlante. La « complète » se garnit d'œuf, de jambon et d'emmental.",
     en:"Buckwheat, grown on Brittany's poor soils since the 15th century, gives a gluten-free batter spread with a rozell across a scorching bilig. The complète is filled with egg, ham and emmental."
     },
  i:[['buckwheat_flour',330,'g'],['water',750,'ml'],['egg',5,'pc'],['coarse_salt',1,'tsp'],['ham',4,'slice'],['emmental',200,'g'],['butter',60,'g'],['pepper',null,'']],
  s:{fr:["Mélangez farine de sarrasin, sel et un œuf, puis versez l'eau petit à petit en fouettant.","Laissez reposer la pâte au moins 2 heures : elle doit rester fluide et lisse.","Chauffez fortement une crêpière beurrée et étalez une louche de pâte en un disque très fin.","Après 1 minute, retournez la galette, cassez un œuf au centre et répartissez jambon et fromage.","Rabattez les quatre bords en carré et servez brûlant, avec du cidre brut."],
     en:["Mix buckwheat flour, salt and one egg, then whisk in the water little by little.","Rest the batter at least 2 hours: it must stay fluid and smooth.","Heat a buttered crêpe pan hard and spread a ladle of batter into a very thin disc.","After 1 minute flip the galette, crack an egg in the centre and scatter ham and cheese.","Fold the four edges into a square and serve piping hot, with dry cider."]
     } },

{ id:'quiche-lorraine', c:'eu', lat:48.692, lon:6.184, base:6, prep:30, cook:40, diff:1, tags:['bake','pork','comfort'],
  art:{v:'plate',bg:'#33302a',plate:'#f2ece0',style:'pastry',food:['#e8c96a','#f0dc9a','#c9927a'],garnish:'#7fae6a'},
  n:{fr:'Quiche lorraine',en:'Quiche lorraine'},
  p:{fr:'Nancy, France',en:'Nancy, France'},
  d:{fr:"La vraie quiche lorraine ne contient ni fromage ni oignon : de la pâte, des lardons et une migaine — crème, œufs, muscade. Le mot vient de l'alsacien Küchen, et la recette est attestée dès le XVIᵉ siècle.",
     en:"A true quiche lorraine holds neither cheese nor onion: pastry, bacon and a migaine of cream, eggs and nutmeg. The word comes from the Alsatian Küchen, and the recipe is recorded from the 16th century."
     },
  i:[['shortcrust_pastry',300,'g'],['smoked_bacon',250,'g'],['egg',4,'pc'],['heavy_cream',300,'ml'],['whole_milk',100,'ml'],['nutmeg',1,'pinch'],['butter',20,'g'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Foncez un moule de pâte brisée, piquez le fond et réservez 30 minutes au frais.","Faites rissoler les lardons sans matière grasse, égouttez-les sur du papier absorbant.","Battez œufs, crème et lait, assaisonnez de sel, poivre et muscade râpée.","Répartissez les lardons sur la pâte et versez la migaine par-dessus.","Enfournez 35 à 40 minutes à 180 °C : le centre doit encore trembler légèrement à la sortie."],
     en:["Line a tin with the pastry, prick the base and chill for 30 minutes.","Fry the bacon dry until browned and drain it on kitchen paper.","Beat eggs, cream and milk, and season with salt, pepper and grated nutmeg.","Spread the bacon over the pastry and pour the custard on top.","Bake 35 to 40 minutes at 180°C: the centre should still wobble slightly when it comes out."]
     } },

{ id:'ratatouille', c:'eu', lat:43.700, lon:7.265, base:6, prep:30, cook:60, diff:1, tags:['veg','slow','comfort'],
  art:{v:'bowl',bg:'#2c3a2a',plate:'#f2ece0',style:'stew',food:['#8a3f7a','#c2452c','#7fae5a','#e0a83a'],garnish:'#6fbf8f'},
  n:{fr:'Ratatouille niçoise',en:'Ratatouille niçoise'},
  p:{fr:'Nice, France',en:'Nice, France'},
  d:{fr:"Le secret de la ratatouille tient dans une règle simple : chaque légume est cuit séparément, à son rythme, avant d'être réuni aux autres. Rien ne doit se transformer en bouillie ; on doit reconnaître chaque bouchée.",
     en:"The secret of ratatouille is one simple rule: every vegetable is cooked separately, at its own pace, before being brought together. Nothing should collapse into mush — each mouthful must stay identifiable."
     },
  i:[['aubergine',2,'pc'],['zucchini',3,'pc'],['red_pepper',2,'pc'],['ripe_tomato',6,'pc'],['onion',2,'pc'],['garlic',4,'clove'],['thyme',3,'sprig'],['bay_leaf',1,'pc'],['basil',1,'bunch'],['olive_oil',10,'tbsp'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Taillez tous les légumes en cubes réguliers de 2 cm, séparément.","Faites revenir les aubergines seules dans l'huile d'olive jusqu'à ce qu'elles dorent, réservez.","Répétez l'opération avec les courgettes, puis les poivrons, puis les oignons.","Faites compoter les tomates avec l'ail, le thym et le laurier pendant 20 minutes.","Réunissez tous les légumes, laissez mijoter 15 minutes à découvert et ajoutez le basilic hors du feu."],
     en:["Cut every vegetable into even 2 cm cubes, keeping them apart.","Fry the aubergine alone in olive oil until golden, then set aside.","Repeat with the courgettes, then the peppers, then the onions.","Cook the tomatoes down with garlic, thyme and bay for 20 minutes.","Bring everything together, simmer uncovered for 15 minutes and add basil off the heat."]
     } },

{ id:'tartiflette', c:'eu', lat:45.899, lon:6.129, base:4, prep:20, cook:45, diff:1, tags:['cheese','comfort','bake'],
  art:{v:'plate',bg:'#2f3340',plate:'#f2ece0',style:'grill',food:['#f0e2c0','#e8c96a','#c9927a'],garnish:'#7fae6a'},
  n:{fr:'Tartiflette',en:'Tartiflette'},
  p:{fr:'Annecy, France',en:'Annecy, France'},
  d:{fr:"Inventée dans les années 1980 par le syndicat du reblochon pour écouler le fromage, sur la base d'un vieux gratin savoyard, la péla. L'histoire est récente, le réconfort est intact.",
     en:"Invented in the 1980s by the reblochon producers' union to sell more cheese, on the model of an old Savoyard gratin, the péla. The history is recent; the comfort is not diminished."
     },
  i:[['potato',1.2,'kg'],['reblochon',1,'pc'],['smoked_bacon',250,'g'],['onion',2,'pc'],['white_wine',100,'ml'],['heavy_cream',100,'ml'],['garlic',1,'clove'],['pepper',null,'']],
  s:{fr:["Cuisez les pommes de terre en robe des champs 20 minutes, laissez tiédir et coupez-les en rondelles épaisses.","Faites rissoler lardons et oignons, déglacez au vin blanc et laissez évaporer.","Frottez un plat à l'ail, alternez pommes de terre et mélange lardons-oignons.","Ajoutez la crème, puis posez le reblochon coupé en deux, croûte vers le haut.","Enfournez 25 minutes à 200 °C jusqu'à ce que le fromage bouillonne et dore."],
     en:["Boil the potatoes in their skins for 20 minutes, cool slightly and cut into thick slices.","Fry the bacon and onions, deglaze with white wine and let it evaporate.","Rub a dish with garlic and layer potatoes with the bacon and onion mixture.","Add the cream, then lay the reblochon halved, rind facing up.","Bake 25 minutes at 200°C until the cheese bubbles and browns."]
     } },

{ id:'carbonade-flamande', c:'eu', lat:50.629, lon:3.057, base:6, prep:25, cook:180, diff:1, tags:['slow','beef','comfort'],
  art:{v:'bowl',bg:'#2a2620',plate:'#f2ece0',style:'stew',food:['#5a3520','#7a4a2a','#c9924a','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Carbonade flamande',en:'Flemish carbonade'},
  p:{fr:'Lille, France',en:'Lille, France'},
  d:{fr:"Le ragoût du Nord, où la bière brune remplace le vin et où une tranche de pain d'épices tartinée de moutarde, fondue dans la sauce, apporte l'aigre-doux. Elle est meilleure réchauffée le lendemain.",
     en:"The stew of the north, where brown beer replaces wine and a slice of gingerbread spread with mustard, melted into the sauce, brings the sweet-and-sour edge. It is better reheated the next day."
     },
  i:[['beef_chuck',1.2,'kg'],['brown_ale',750,'ml'],['onion',4,'pc'],['gingerbread',3,'slice'],['dijon_mustard',2,'tbsp'],['brown_sugar',1,'tbsp'],['red_wine_vinegar',2,'tbsp'],['thyme',3,'sprig'],['bay_leaf',2,'pc'],['butter',40,'g'],['flour',1,'tbsp'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Saisissez la viande en gros cubes dans le beurre, par petites quantités, puis réservez.","Faites blondir longuement les oignons émincés dans la même cocotte.","Remettez la viande, singez à la farine, versez la bière et le vinaigre.","Tartinez le pain d'épices de moutarde et posez-le à la surface, face moutarde vers le bas.","Couvrez et laissez mijoter 3 heures à feu très doux ; la sauce s'épaissit toute seule."],
     en:["Sear the large cubes of beef in butter, in small batches, then set aside.","Slowly brown the sliced onions in the same pot.","Return the meat, dust with flour, pour in the beer and the vinegar.","Spread the gingerbread with mustard and float it on top, mustard side down.","Cover and simmer 3 hours over very low heat; the sauce thickens by itself."]
     } },

{ id:'piperade', c:'eu', lat:43.492, lon:-1.475, base:4, prep:20, cook:40, diff:1, tags:['veg','comfort','fry'],
  art:{v:'plate',bg:'#33302a',plate:'#f2ece0',style:'stew',food:['#c2452c','#e0a83a','#7fae5a','#e8dcc0'],garnish:'#6fbf8f'},
  n:{fr:'Piperade',en:'Piperade'},
  p:{fr:'Bayonne, France',en:'Bayonne, France'},
  d:{fr:"Poivrons doux, tomates et piment d'Espelette longuement fondus, liés à l'œuf au dernier moment. Aux couleurs du drapeau basque, elle accompagne traditionnellement une tranche de jambon de Bayonne poêlée.",
     en:"Sweet peppers, tomatoes and Espelette chilli slowly melted, then bound with egg at the last moment. In the colours of the Basque flag, it traditionally comes with a pan-fried slice of Bayonne ham."
     },
  i:[['green_pepper',4,'pc'],['red_pepper',2,'pc'],['ripe_tomato',6,'pc'],['onion',2,'pc'],['garlic',3,'clove'],['espelette_pepper',1,'tsp'],['bayonne_ham',4,'slice'],['egg',6,'pc'],['olive_oil',4,'tbsp'],['sugar',1,'tsp'],['salt',null,'']],
  s:{fr:["Émincez les poivrons et faites-les fondre 20 minutes avec les oignons dans l'huile d'olive.","Ajoutez les tomates pelées et concassées, l'ail, le sucre et le piment d'Espelette.","Laissez compoter 20 minutes à découvert : la piperade doit être fondante, jamais liquide.","Poêlez les tranches de jambon de Bayonne 30 secondes par face et réservez-les.","Versez les œufs battus dans la piperade chaude et remuez hors du feu jusqu'à liaison crémeuse."],
     en:["Slice the peppers and melt them for 20 minutes with the onions in olive oil.","Add the peeled, chopped tomatoes, garlic, sugar and Espelette chilli.","Cook down uncovered for 20 minutes: the piperade must be unctuous, never watery.","Sear the slices of Bayonne ham for 30 seconds a side and set them aside.","Pour the beaten eggs into the hot piperade and stir off the heat until creamy."]
     } },

{ id:'aligot', c:'eu', lat:44.681, lon:2.847, base:6, prep:20, cook:40, diff:2, tags:['cheese','comfort','veg'],
  art:{v:'bowl',bg:'#2f3340',plate:'#f2ece0',style:'rice',food:['#f2ece0','#f8f4ea','#e8c96a'],garnish:'#7fae6a'},
  n:{fr:'Aligot',en:'Aligot'},
  p:{fr:'Laguiole, France',en:'Laguiole, France'},
  d:{fr:"Une purée de pommes de terre travaillée avec de la tomme fraîche de l'Aubrac jusqu'à ce qu'elle file en longs rubans. Les moines la servaient aux pèlerins de Saint-Jacques ; le geste du bras n'a pas changé depuis.",
     en:"Mashed potato beaten with fresh Aubrac tomme until it stretches into long ribbons. Monks served it to pilgrims on the way to Santiago; the arm movement has not changed since."
     },
  i:[['potato',1,'kg'],['tomme_fraiche',400,'g'],['heavy_cream',200,'ml'],['butter',80,'g'],['garlic',2,'clove'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Cuisez les pommes de terre à l'eau salée, puis passez-les au presse-purée, jamais au mixeur.","Remettez la purée sur feu doux avec le beurre, la crème et l'ail écrasé.","Ajoutez la tomme fraîche coupée en fines lamelles, en trois fois.","Travaillez à la spatule en larges mouvements de huit, en soulevant la masse, 8 à 10 minutes.","Arrêtez dès que l'aligot file en ruban continu et servez immédiatement."],
     en:["Boil the potatoes in salted water, then push them through a ricer — never a blender.","Return the mash to low heat with butter, cream and crushed garlic.","Add the fresh tomme, thinly sliced, in three additions.","Work with a spatula in wide figures of eight, lifting the mass, for 8 to 10 minutes.","Stop the moment the aligot pulls into a continuous ribbon and serve immediately."]
     } },

{ id:'cannele', c:'eu', lat:44.838, lon:-0.579, base:12, prep:30, cook:60, diff:3, tags:['sweet','bake'],
  art:{v:'board',bg:'#2a2620',plate:'#e9dcc0',style:'roll',food:['#4a2a18','#6b3b20','#e8c96a'],garnish:'#7fae6a'},
  n:{fr:'Cannelés bordelais',en:'Bordeaux cannelés'},
  p:{fr:'Bordeaux, France',en:'Bordeaux, France'},
  d:{fr:"Une croûte presque brûlée, un cœur de flan tendre au rhum et à la vanille : tout le paradoxe du cannelé tient dans ce contraste. La pâte doit reposer 24 à 48 heures avant d'être coulée dans les moules de cuivre.",
     en:"An almost burnt crust around a tender rum-and-vanilla custard heart: the whole paradox of the cannelé lies in that contrast. The batter must rest 24 to 48 hours before being poured into copper moulds."
     },
  i:[['whole_milk',500,'ml'],['sugar',250,'g'],['flour',100,'g'],['egg',2,'pc'],['egg_yolk',2,'pc'],['butter',50,'g'],['vanilla',1,'pc'],['dark_rum',50,'ml'],['beeswax',20,'g'],['salt',1,'pinch']],
  s:{fr:["Portez le lait à frémissement avec le beurre et la gousse de vanille fendue, laissez infuser.","Mélangez farine et sucre, incorporez œufs et jaunes sans fouetter pour ne pas incorporer d'air.","Versez le lait tiède en filet, ajoutez le rhum, filtrez et réservez 24 heures au réfrigérateur.","Chemisez les moules de cuivre au mélange beurre-cire d'abeille, chauffés puis retournés.","Remplissez aux trois quarts et cuisez 15 minutes à 240 °C puis 50 minutes à 180 °C ; démoulez chaud."],
     en:["Bring the milk to a bare simmer with the butter and split vanilla pod, then infuse.","Mix flour and sugar, fold in eggs and yolks without whisking, to avoid incorporating air.","Pour in the warm milk in a thin stream, add the rum, strain and rest 24 hours in the fridge.","Coat the copper moulds with the butter-and-beeswax mix, warmed then turned upside down.","Fill three-quarters full and bake 15 minutes at 240°C, then 50 minutes at 180°C; unmould hot."]
     } },

{ id:'blanquette-veau', c:'eu', lat:48.857, lon:2.352, base:6, prep:30, cook:120, diff:2, tags:['slow','comfort','sunday'],
  art:{v:'bowl',bg:'#2c3340',plate:'#f2ece0',style:'stew',food:['#f0e8d8','#f8f4ea','#e0b45c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Blanquette de veau',en:'Blanquette de veau'},
  p:{fr:'Paris, France',en:'Paris, France'},
  d:{fr:"Un ragoût « blanc » : la viande n'est jamais colorée, elle pochée dans un bouillon aromatique dont on tire ensuite une sauce montée au jaune d'œuf et à la crème. La discipline du geste fait toute la finesse.",
     en:"A \"white\" stew: the meat is never browned but poached in an aromatic broth, which then becomes a sauce enriched with egg yolk and cream. All its finesse comes from that discipline."
     },
  i:[['veal_shoulder',1.2,'kg'],['carrot',3,'pc'],['leek',2,'pc'],['onion',1,'pc'],['cloves',3,'pc'],['button_mushrooms',250,'g'],['pearl_onions',200,'g'],['butter',60,'g'],['flour',50,'g'],['heavy_cream',200,'ml'],['egg_yolk',2,'pc'],['lemon',1,'pc'],['bay_leaf',1,'pc'],['thyme',2,'sprig'],['salt',null,'']],
  s:{fr:["Couvrez la viande d'eau froide, portez à frémissement et écumez soigneusement pendant 10 minutes.","Ajoutez carottes, poireaux, oignon clouté et bouquet garni ; pochez 1 h 30 sans jamais bouillir.","Faites cuire à part les champignons et les oignons grelots dans un peu de beurre et de citron.","Préparez un roux blanc, mouillez avec le bouillon filtré et laissez cuire 15 minutes.","Hors du feu, liez avec crème et jaunes d'œufs, ajoutez un trait de citron et réunissez le tout."],
     en:["Cover the meat with cold water, bring to a bare simmer and skim carefully for 10 minutes.","Add carrots, leeks, clove-studded onion and herbs; poach 1½ hours without ever boiling.","Separately cook the mushrooms and baby onions in a little butter and lemon.","Make a white roux, whisk in the strained broth and cook for 15 minutes.","Off the heat, bind with cream and yolks, add a dash of lemon and bring everything together."]
     } },

{ id:'kouign-amann', c:'eu', lat:48.093, lon:-4.329, base:8, prep:150, cook:40, diff:3, tags:['sweet','bake','bread'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9dcc0',style:'pastry',food:['#d9a03a','#e8c96a','#8a5a2a'],garnish:'#7fae6a'},
  n:{fr:'Kouign-amann',en:'Kouign-amann'},
  p:{fr:'Douarnenez, France',en:'Douarnenez, France'},
  d:{fr:"« Gâteau au beurre » en breton : une pâte à pain feuilletée avec des proportions déraisonnables de beurre demi-sel et de sucre, qui caramélise au four. Créé vers 1860 par un boulanger de Douarnenez à court de farine.",
     en:"\"Butter cake\" in Breton: a bread dough laminated with unreasonable amounts of salted butter and sugar, caramelising in the oven. Created around 1860 by a Douarnenez baker who had run short of flour."
     },
  i:[['flour',400,'g'],['water',250,'ml'],['dry_yeast',7,'g'],['salted_butter',300,'g'],['sugar',300,'g'],['salt',1,'tsp']],
  s:{fr:["Pétrissez farine, eau, levure et sel en une pâte souple, laissez pousser 1 heure.","Étalez la pâte en rectangle, déposez le beurre en plaque au centre et refermez comme une enveloppe.","Donnez un tour simple, saupoudrez généreusement de sucre, et répétez trois fois en reposant 30 minutes entre chaque.","Découpez et disposez dans des moules beurrés et sucrés, laissez pousser 30 minutes.","Enfournez 40 minutes à 200 °C et démoulez immédiatement, avant que le caramel ne fige."],
     en:["Knead flour, water, yeast and salt into a supple dough and let it rise for 1 hour.","Roll out into a rectangle, lay the slab of butter in the centre and fold like an envelope.","Give a single turn, dust generously with sugar, and repeat three times, resting 30 minutes between turns.","Cut and place in buttered, sugared moulds and prove for 30 minutes.","Bake 40 minutes at 200°C and unmould at once, before the caramel sets."]
     } }
];
