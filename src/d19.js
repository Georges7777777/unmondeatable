/* ---------- Europe restante & Golfe/Levant (lot 5) ---------- */
const D19 = [
{ id:'mulgipuder', c:'eu', lat:58.380, lon:26.729, base:6, prep:15, cook:45, diff:1, tags:['comfort','pork','sunday'],
  art:{v:'bowl',bg:'#2a3324',plate:'#e9dcc0',style:'rice',food:['#e0dcc0','#c9924a','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Mulgipuder',en:'Mulgipuder'},
  p:{fr:'Tartu, Estonie',en:'Tartu, Estonia'},
  d:{fr:"Une purée paysanne d'orge et de pomme de terre bouillies ensemble jusqu'à se confondre, couronnée de lardons de porc grillés et de leur graisse fondue versée en filet brûlant juste avant de servir.",
     en:"A peasant mash of barley and potato boiled together until they merge, crowned with grilled pork bits and their melted fat drizzled on scalding hot just before serving."
     },
  i:[['barley',200,'g'],['potato',800,'g'],['smoked_bacon',200,'g'],['onion',1,'pc'],['butter',30,'g'],['salt',null,'']],
  s:{fr:["Faites tremper l'orge 2 heures, égouttez.","Cuisez orge et pommes de terre épluchées ensemble dans l'eau salée 35 minutes jusqu'à tendreté complète.","Écrasez le tout au presse-purée sans chercher un résultat lisse, la texture doit rester rustique.","Coupez le lard en petits lardons, faites-les griller à sec avec l'oignon émincé jusqu'à ce qu'ils soient bien croustillants.","Servez la purée nappée des lardons et de leur graisse de cuisson versée brûlante."],
     en:["Soak the barley 2 hours, drain.","Cook barley and peeled potatoes together in salted water 35 minutes until fully tender.","Mash everything with a potato masher without aiming for smoothness, the texture should stay rustic.","Cut the bacon into small lardons, fry them dry with the sliced onion until nicely crisp.","Serve the mash topped with the bacon bits and their cooking fat poured on scalding hot."]
     } },

{ id:'pelekie-zirni', c:'eu', lat:56.949, lon:24.106, base:4, prep:15, cook:60, diff:1, tags:['comfort','veg','legume'],
  art:{v:'bowl',bg:'#2c2a22',plate:'#e9dcc0',style:'stew',food:['#c9924a','#8a3a24','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Pelēkie zirņi (pois gris)',en:'Pelēkie zirņi (grey peas)'},
  p:{fr:'Riga, Lettonie',en:'Riga, Latvia'},
  d:{fr:"Des pois gris, variété ancienne cultivée depuis des siècles dans la Baltique, mijotés jusqu'à tendreté puis mélangés à des lardons de porc fondu et d'oignon caramélisé. Le plat de Noël letton par excellence, servi avec du lait fermenté.",
     en:"Grey peas, an heirloom variety grown for centuries around the Baltic, simmered until tender then mixed with rendered pork lardons and caramelised onion. Latvia's quintessential Christmas dish, served with fermented milk."
     },
  i:[['gray_peas',400,'g'],['smoked_bacon',200,'g'],['onion',3,'pc'],['butter',20,'g'],['salt',null,'']],
  s:{fr:["Faites tremper les pois gris une nuit entière, égouttez.","Cuisez-les à couvert 45 minutes dans l'eau légèrement salée jusqu'à tendreté sans se déliter.","Coupez le lard en petits dés, faites-le fondre à la poêle jusqu'à ce qu'il rende son gras et croustille.","Ajoutez l'oignon émincé et faites-le caraméliser doucement dans la graisse de lard.","Mélangez les pois égouttés aux lardons et à l'oignon caramélisé, servez chaud avec du lait fermenté à part."],
     en:["Soak the grey peas overnight, drain.","Cook covered 45 minutes in lightly salted water until tender but holding their shape.","Dice the bacon small, render it in a pan until it crisps up.","Add the sliced onion and let it caramelise slowly in the bacon fat.","Mix the drained peas with the bacon and caramelised onion, serve hot with fermented milk on the side."]
     } },

{ id:'tave-kosi', c:'eu', lat:41.327, lon:19.818, base:6, prep:25, cook:60, diff:2, tags:['bake','lamb','festive'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'stew',food:['#e0dcc0','#f0e2b0','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Tavë kosi',en:'Tavë kosi'},
  p:{fr:'Tirana, Albanie',en:'Tirana, Albania'},
  d:{fr:"Le plat national albanais : de l'agneau doré puis noyé sous une sauce au yaourt et aux œufs qui gonfle et se boursoufle au four comme un soufflé, avant de retomber en une croûte dorée et légèrement acidulée.",
     en:"Albania's national dish: browned lamb drowned under a yoghurt and egg sauce that puffs up in the oven like a soufflé, then settles into a golden, faintly tangy crust."
     },
  i:[['lamb_shoulder',1,'kg'],['plain_yogurt',800,'g'],['egg',4,'pc'],['flour',3,'tbsp'],['butter',40,'g'],['garlic',2,'clove'],['rice',80,'g'],['salt',null,'']],
  s:{fr:["Faites dorer l'agneau en morceaux dans le beurre avec l'ail écrasé.","Ajoutez le riz et un peu d'eau, laissez mijoter 30 minutes jusqu'à ce que la viande soit tendre.","Répartissez la viande et le riz dans un plat à gratin beurré.","Fouettez le yaourt avec les œufs et la farine jusqu'à obtenir une sauce lisse, versez sur la viande.","Enfournez 30 minutes à 190 °C jusqu'à ce que le dessus soit gonflé et bien doré, laissez tiédir 10 minutes avant de servir."],
     en:["Brown the lamb pieces in butter with crushed garlic.","Add the rice and a little water, simmer 30 minutes until the meat is tender.","Spread the meat and rice in a buttered baking dish.","Whisk the yoghurt with the eggs and flour until smooth, pour over the meat.","Bake 30 minutes at 190°C until puffed and golden on top, let rest 10 minutes before serving."]
     } },

{ id:'tavce-gravce', c:'eu', lat:41.997, lon:21.427, base:6, prep:20, cook:90, diff:1, tags:['bake','legume','veg'],
  art:{v:'bowl',bg:'#2a3324',plate:'#e9dcc0',style:'stew',food:['#e0dcc0','#4f8f4a','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Tavče gravče',en:'Tavče gravče'},
  p:{fr:'Skopje, Macédoine du Nord',en:'Skopje, North Macedonia'},
  d:{fr:"Le plat national macédonien : des haricots blancs mijotés puis finis au four dans un plat en terre cuite avec paprika fumé et menthe séchée, jusqu'à ce qu'une fine peau se forme sur le dessus.",
     en:"North Macedonia's national dish: white beans simmered then finished in the oven in a clay dish with smoked paprika and dried mint, until a thin skin forms on top."
     },
  i:[['white_beans',400,'g'],['onion',2,'pc'],['smoked_paprika',2,'tbsp'],['dried_mint',1,'tbsp'],['tomato_puree',150,'g'],['bell_pepper',1,'pc'],['olive_oil',60,'ml'],['flour',1,'tbsp'],['salt',null,'']],
  s:{fr:["Faites tremper les haricots blancs une nuit entière, égouttez.","Cuisez-les 1 heure dans l'eau fraîche jusqu'à ce qu'ils soient presque tendres.","Faites revenir oignon et poivron dans l'huile, ajoutez farine et paprika fumé, mouillez de tomate.","Mélangez les haricots égouttés à cette sauce, versez dans un plat en terre cuite.","Enfournez à découvert 30 minutes à 200 °C, parsemez de menthe séchée en fin de cuisson jusqu'à formation d'une peau dorée sur le dessus."],
     en:["Soak the white beans overnight, drain.","Cook 1 hour in fresh water until nearly tender.","Fry onion and pepper in oil, add flour and smoked paprika, moisten with tomato.","Mix the drained beans into this sauce, pour into a clay dish.","Bake uncovered 30 minutes at 200°C, scatter with dried mint at the end until a golden skin forms on top."]
     } },

{ id:'kacamak', c:'eu', lat:42.390, lon:18.921, base:4, prep:10, cook:30, diff:1, tags:['comfort','cheese','veg'],
  art:{v:'bowl',bg:'#2f2a20',plate:'#e9dcc0',style:'rice',food:['#e0dcc0','#f0e2b0','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Kačamak',en:'Kačamak'},
  p:{fr:'Cetinje, Monténégro',en:'Cetinje, Montenegro'},
  d:{fr:"Une bouillie de farine de maïs et de pomme de terre battue à la spatule de bois jusqu'à devenir élastique, noyée de fromage frais fondu et de crème caillée, plat de berger des montagnes monténégrines.",
     en:"A cornmeal and potato porridge beaten with a wooden paddle until elastic, drowned in melting fresh cheese and clotted cream, a shepherd's dish from the Montenegrin mountains."
     },
  i:[['cornmeal',250,'g'],['potato',400,'g'],['water',600,'ml'],['queso_fresco',250,'g'],['heavy_cream',100,'ml'],['butter',30,'g'],['salt',null,'']],
  s:{fr:["Cuisez les pommes de terre épluchées et coupées en morceaux dans l'eau salée jusqu'à tendreté, écrasez-les grossièrement dans leur eau.","Versez la farine de maïs en pluie dans les pommes de terre écrasées, en battant sans cesse à la spatule de bois.","Poursuivez la cuisson et le battage 15 minutes à feu doux jusqu'à obtenir une pâte élastique qui se détache des parois.","Incorporez le fromage frais émietté et la moitié de la crème, mélangez jusqu'à ce qu'ils fondent dans la bouillie chaude.","Servez immédiatement, nappé du reste de crème et d'un peu de beurre fondu."],
     en:["Cook the peeled, chunked potatoes in salted water until tender, roughly mash them in their water.","Pour the cornmeal into the mashed potatoes in a stream, beating constantly with a wooden paddle.","Continue cooking and beating for 15 minutes over low heat until an elastic dough forms that pulls from the sides.","Fold in the crumbled fresh cheese and half the cream, mix until they melt into the hot porridge.","Serve immediately, topped with the rest of the cream and a little melted butter."]
     } },

{ id:'draniki', c:'eu', lat:53.902, lon:27.562, base:4, prep:20, cook:20, diff:1, tags:['street','veg','fry'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'flat',food:['#e0c07a','#c9924a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Draniki',en:'Draniki'},
  p:{fr:'Minsk, Biélorussie',en:'Minsk, Belarus'},
  d:{fr:"Des galettes de pomme de terre crue râpée, pressée pour en extraire l'excès d'eau puis frites jusqu'à ce que les bords deviennent dentelés et croustillants, servies avec une crème aigre bien froide.",
     en:"Pancakes of raw grated potato, pressed to remove excess water then fried until the edges turn lacy and crisp, served with well-chilled sour cream."
     },
  i:[['potato',1,'kg'],['onion',1,'pc'],['egg',2,'pc'],['flour',3,'tbsp'],['frying_oil',80,'ml'],['sour_cream',200,'g'],['salt',null,'']],
  s:{fr:["Râpez finement les pommes de terre et l'oignon, pressez fermement pour extraire l'excès de liquide.","Mélangez à l'œuf, la farine et le sel jusqu'à obtenir une pâte épaisse.","Faites chauffer une couche généreuse d'huile dans une poêle large.","Déposez des cuillerées de pâte aplaties, faites frire 3 minutes de chaque côté jusqu'à ce que les bords soient dentelés et dorés.","Égouttez sur papier absorbant, servez brûlant avec de la crème aigre bien froide."],
     en:["Finely grate the potatoes and onion, press firmly to remove excess liquid.","Mix with the egg, flour and salt into a thick batter.","Heat a generous layer of oil in a wide pan.","Drop flattened spoonfuls of batter, fry 3 minutes per side until the edges are lacy and golden.","Drain on paper towel, serve piping hot with well-chilled sour cream."]
     } },

{ id:'placinta', c:'eu', lat:47.011, lon:28.862, base:8, prep:60, cook:30, diff:2, tags:['sweet','bake','breakfast'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'pastry',food:['#e0c07a','#f0e2c0','#c9a24a'],garnish:'#7fae6a'},
  n:{fr:'Plăcintă au fromage',en:'Plăcintă with cheese'},
  p:{fr:'Chișinău, Moldavie',en:'Chișinău, Moldova'},
  d:{fr:"Une pâte étirée à la main en un cercle presque transparent, roulée en spirale autour de fromage frais et d'aneth avant d'être aplatie et cuite à la poêle sèche jusqu'à ce qu'elle boursoufle en poches dorées.",
     en:"A dough stretched by hand into an almost transparent circle, rolled spiral-fashion around fresh cheese and dill before being flattened and pan-fried dry until it blisters into golden pockets."
     },
  i:[['flour',400,'g'],['water',200,'ml'],['egg',1,'pc'],['queso_fresco',400,'g'],['dill',1,'bunch'],['butter',80,'g'],['frying_oil',2,'tbsp'],['salt',null,'']],
  s:{fr:["Pétrissez farine, eau, œuf et sel en une pâte souple, laissez reposer 30 minutes sous un linge.","Divisez en boules et étirez chacune à la main sur un plan huilé jusqu'à devenir presque transparente.","Écrasez le fromage frais avec l'aneth ciselé, étalez sur toute la surface de la pâte étirée.","Roulez en boudin serré puis enroulez le boudin sur lui-même en spirale, aplatissez délicatement au rouleau.","Cuisez à la poêle sèche 4 minutes de chaque côté à feu moyen, badigeonnez de beurre fondu à la sortie."],
     en:["Knead flour, water, egg and salt into a supple dough, rest 30 minutes under a cloth.","Divide into balls and stretch each by hand on an oiled surface until nearly transparent.","Mash the fresh cheese with chopped dill, spread over the whole stretched dough.","Roll into a tight log then coil the log onto itself into a spiral, gently flatten with a rolling pin.","Cook in a dry pan 4 minutes per side over medium heat, brush with melted butter on coming out."]
     } },

{ id:'flija', c:'eu', lat:42.663, lon:21.165, base:10, prep:90, cook:120, diff:3, tags:['festive','bake','sunday'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'cake',food:['#e0c07a','#f0e2b0','#c9a24a'],garnish:'#7fae6a'},
  n:{fr:'Flija',en:'Flija'},
  p:{fr:'Pristina, Kosovo',en:'Pristina, Kosovo'},
  d:{fr:"Jusqu'à vingt couches de pâte fine, chacune badigeonnée de crème puis cuite séparément sous une cloche de métal appelée sač couverte de braises, empilées les unes sur les autres en un gâteau strié comme un tronc d'arbre.",
     en:"Up to twenty thin layers of batter, each brushed with cream and baked separately under a metal dome called a sač covered in embers, stacked one on another into a cake striped like a tree trunk."
     },
  i:[['flour',600,'g'],['water',500,'ml'],['heavy_cream',400,'ml'],['butter',100,'g'],['salt',1,'tsp']],
  s:{fr:["Préparez une pâte liquide avec farine, eau et sel, fine comme une pâte à crêpes.","Versez une fine couche dans un grand plat rond beurré, cuisez au four très chaud 5 minutes jusqu'à légère coloration.","Badigeonnez de crème, versez une nouvelle fine couche de pâte par-dessus sans mélanger les couches.","Répétez l'opération quinze à vingt fois, en alternant cuisson et badigeonnage de crème entre chaque couche.","Terminez par un passage sous le gril pour dorer le dessus, laissez tiédir puis découpez en parts triangulaires striées."],
     en:["Make a liquid batter with flour, water and salt, thin like crêpe batter.","Pour a thin layer into a large buttered round dish, bake in a very hot oven 5 minutes until lightly coloured.","Brush with cream, pour a new thin layer of batter on top without mixing the layers.","Repeat fifteen to twenty times, alternating baking and brushing with cream between each layer.","Finish with a pass under the grill to brown the top, let cool slightly then cut into striped triangular portions."]
     } },

{ id:'machboos', c:'as', lat:25.204, lon:55.271, base:6, prep:30, cook:60, diff:2, tags:['rice','spicy','festive'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'rice',food:['#8a3a24','#c9924a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Machboos',en:'Machboos'},
  p:{fr:'Dubaï, Émirats arabes unis',en:'Dubai, United Arab Emirates'},
  d:{fr:"Un riz basmati parfumé au mélange d'épices bezar propre au Golfe, cuit dans le jus de viande et de citron noir séché, hérité des routes maritimes qui reliaient les ports émiratis à l'Inde et à l'Afrique de l'Est.",
     en:"Basmati rice scented with the Gulf's own bezar spice blend, cooked in meat juices and dried black lime, inherited from the sea routes linking Emirati ports to India and East Africa."
     },
  i:[['chicken',1.5,'kg'],['basmati_rice',500,'g'],['onion',2,'pc'],['tomato',3,'pc'],['dried_black_lime',3,'pc'],['cardamom',5,'pc'],['cinnamon',1,'stick'],['cloves',4,'pc'],['garlic',3,'clove'],['raisins',40,'g'],['frying_oil',60,'ml'],['salt',null,'']],
  s:{fr:["Faites dorer le poulet avec l'oignon émincé et l'ail dans l'huile.","Ajoutez tomate concassée, épices entières et citrons noirs percés, couvrez d'eau et laissez mijoter 40 minutes.","Retirez le poulet, réservez le bouillon parfumé filtré.","Faites revenir le riz rincé 2 minutes, mouillez avec le bouillon chaud et cuisez à couvert 18 minutes sans soulever le couvercle.","Faites griller le poulet quelques minutes pour dorer la peau, servez sur le riz parsemé de raisins dorés."],
     en:["Brown the chicken with sliced onion and garlic in oil.","Add crushed tomato, whole spices and pierced black limes, cover with water and simmer 40 minutes.","Remove the chicken, reserve the strained fragrant broth.","Fry the rinsed rice for 2 minutes, moisten with the hot broth and cook covered 18 minutes without lifting the lid.","Grill the chicken briefly to crisp the skin, serve over the rice scattered with golden raisins."]
     } },

{ id:'harees', c:'as', lat:25.286, lon:51.531, base:8, prep:30, cook:180, diff:2, tags:['slow','comfort','festive'],
  art:{v:'bowl',bg:'#2c2a22',plate:'#e9dcc0',style:'stew',food:['#e0dcc0','#c9924a','#8a3a24'],garnish:'#7fae6a'},
  n:{fr:'Harees',en:'Harees'},
  p:{fr:'Doha, Qatar',en:'Doha, Qatar'},
  d:{fr:"Du blé concassé et de la viande mijotés des heures puis battus longuement jusqu'à devenir une bouillie parfaitement lisse et onctueuse, servie durant le Ramadan et lors des mariages dans tout le Golfe.",
     en:"Cracked wheat and meat simmered for hours then beaten at length into a perfectly smooth, velvety porridge, served during Ramadan and at weddings across the Gulf."
     },
  i:[['cracked_wheat',400,'g'],['chicken',800,'g'],['water',1.5,'l'],['butter',60,'g'],['cinnamon',1,'tsp'],['salt',null,'']],
  s:{fr:["Faites tremper le blé concassé 2 heures dans l'eau, égouttez.","Placez blé et poulet dans une grande marmite, couvrez largement d'eau et portez à ébullition.","Laissez mijoter à couvert 2h30 à feu très doux jusqu'à ce que le poulet se défasse complètement.","Retirez les os, battez vigoureusement au fouet ou au batteur jusqu'à obtenir une bouillie lisse et homogène.","Servez brûlant, nappé de beurre fondu et saupoudré de cannelle."],
     en:["Soak the cracked wheat 2 hours in water, drain.","Place wheat and chicken in a large pot, cover generously with water and bring to the boil.","Simmer covered 2h30 over very low heat until the chicken falls apart completely.","Remove the bones, beat vigorously with a whisk or mixer until a smooth, even porridge forms.","Serve piping hot, topped with melted butter and dusted with cinnamon."]
     } },

{ id:'shuwa', c:'as', lat:23.588, lon:58.408, base:10, prep:60, cook:720, diff:2, tags:['festive','slow','lamb'],
  art:{v:'leaf',bg:'#26332a',plate:'#4f8f4a',style:'stew',food:['#8a3a24','#c9924a','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Shuwa',en:'Shuwa'},
  p:{fr:'Mascate, Oman',en:'Muscat, Oman'},
  d:{fr:"Un agneau entier mariné plusieurs jours dans une pâte d'épices et de vinaigre, enveloppé de feuilles de bananier puis enterré dans une fosse chauffée aux braises pendant vingt-quatre heures, jusqu'à devenir fondant à s'effilocher tout seul.",
     en:"A whole lamb marinated for several days in a spice and vinegar paste, wrapped in banana leaves then buried in an ember-heated pit for twenty-four hours, until meltingly tender enough to shred on its own."
     },
  i:[['lamb_shoulder',2,'kg'],['white_wine_vinegar',150,'ml'],['garlic',8,'clove'],['cardamom',6,'pc'],['cumin',2,'tbsp'],['coriander_seeds',2,'tbsp'],['turmeric',1,'tbsp'],['chili_flakes',1,'tbsp'],['banana_leaf',6,'pc'],['salt',null,'']],
  s:{fr:["Mixez ail, vinaigre et toutes les épices en une pâte épaisse.","Frottez généreusement l'agneau entier de cette pâte, en insistant dans les incisions faites au couteau, laissez mariner 2 jours au frais.","Enveloppez la viande dans plusieurs couches de feuilles de bananier, ficelez solidement.","Faites-la cuire à l'étouffée 8 à 10 heures dans un four très doux ou une fosse de braises, jusqu'à ce qu'elle soit extrêmement tendre.","Déballez et effilochez la viande à la fourchette, servez avec du riz basmati."],
     en:["Blend garlic, vinegar and all the spices into a thick paste.","Rub the whole lamb generously with this paste, working it into knife slits, marinate 2 days in the fridge.","Wrap the meat in several layers of banana leaves, tie securely.","Steam-cook it 8 to 10 hours in a very low oven or an ember pit, until extremely tender.","Unwrap and shred the meat with a fork, serve with basmati rice."]
     } },

{ id:'jireesh', c:'as', lat:29.375, lon:47.978, base:6, prep:30, cook:90, diff:1, tags:['comfort','poultry','slow'],
  art:{v:'bowl',bg:'#2c2a22',plate:'#e9dcc0',style:'stew',food:['#e0dcc0','#c9924a','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Jireesh',en:'Jireesh'},
  p:{fr:'Koweït',en:'Kuwait City, Kuwait'},
  d:{fr:"Du blé concassé grossièrement mijoté avec du poulet et des épices jusqu'à épaissir en une bouillie rustique, plus grossière que le harees voisin, traditionnellement mangée les nuits fraîches d'hiver koweïtiennes.",
     en:"Coarsely cracked wheat simmered with chicken and spices until it thickens into a rustic porridge, coarser than the neighbouring harees, traditionally eaten on cool Kuwaiti winter nights."
     },
  i:[['cracked_wheat',400,'g'],['chicken',700,'g'],['onion',2,'pc'],['cinnamon',1,'stick'],['cardamom',4,'pc'],['dried_lime',2,'pc'],['butter',40,'g'],['water',1.2,'l'],['salt',null,'']],
  s:{fr:["Faites tremper le blé concassé 1 heure, égouttez.","Faites dorer l'oignon émincé et le poulet dans le beurre.","Ajoutez le blé, la cannelle, la cardamome et les citrons secs, couvrez d'eau et portez à ébullition.","Laissez mijoter à couvert 1h30 à feu doux, en remuant régulièrement pour éviter que ça attache.","Écrasez légèrement à la cuillère en fin de cuisson pour épaissir, servez chaud."],
     en:["Soak the cracked wheat 1 hour, drain.","Brown the sliced onion and chicken in butter.","Add the wheat, cinnamon, cardamom and dried limes, cover with water and bring to the boil.","Simmer covered 1h30 over low heat, stirring regularly to prevent sticking.","Lightly mash with a spoon at the end to thicken, serve hot."]
     } },

{ id:'kibbeh', c:'as', lat:33.513, lon:36.276, base:6, prep:60, cook:20, diff:2, tags:['fry','beef','street'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'roll',food:['#8a3a24','#e0dcc0','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Kebbé (kibbeh)',en:'Kibbeh'},
  p:{fr:'Damas, Syrie',en:'Damascus, Syria'},
  d:{fr:"Une coque de boulgour fin et de viande crue pilée jusqu'à devenir une pâte lisse, façonnée en torpille creuse à la main, farcie de viande hachée aux pignons puis frite jusqu'à un brun profond et croustillant.",
     en:"A shell of fine bulgur and raw meat pounded into a smooth paste, hand-shaped into a hollow torpedo, stuffed with spiced minced meat and pine nuts then fried to a deep, crisp brown."
     },
  i:[['bulgur',300,'g'],['ground_beef',500,'g'],['onion',2,'pc'],['pine_nuts',60,'g'],['cinnamon',1,'tsp'],['allspice',1,'tsp'],['frying_oil',500,'ml'],['salt',null,'']],
  s:{fr:["Faites tremper le boulgour fin 20 minutes dans l'eau froide, essorez-le fermement.","Mixez la moitié de la viande hachée avec le boulgour, un oignon et les épices jusqu'à obtenir une pâte lisse et malléable.","Faites revenir l'oignon restant avec le reste de viande et les pignons pour la farce, laissez refroidir.","Façonnez la pâte en petites torpilles creuses avec les doigts humides, garnissez de farce et refermez en pinçant les extrémités.","Faites frire à 170 °C jusqu'à un brun profond et croustillant, égouttez et servez chaud."],
     en:["Soak the fine bulgur 20 minutes in cold water, squeeze out firmly.","Blend half the minced meat with the bulgur, one onion and the spices until a smooth, pliable paste forms.","Fry the remaining onion with the rest of the meat and pine nuts for the filling, let cool.","Shape the paste into small hollow torpedoes with wet fingers, fill with the filling and pinch the ends closed.","Fry at 170°C until deep brown and crisp, drain and serve hot."]
     } },

{ id:'musakhan', c:'as', lat:32.222, lon:35.259, base:6, prep:30, cook:60, diff:1, tags:['poultry','bake','festive'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'flat',food:['#8a3a24','#e0c07a','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Musakhan',en:'Musakhan'},
  p:{fr:'Naplouse, Palestine',en:'Nablus, Palestine'},
  d:{fr:"Un poulet rôti posé sur du pain taboun trempé dans l'huile d'olive et une montagne d'oignons confits au sumac pendant des heures, jusqu'à ce qu'ils deviennent presque une confiture violette et acidulée.",
     en:"Roast chicken set over taboun bread soaked in olive oil and a mountain of onions slow-cooked with sumac for hours, until they turn into an almost jammy, tangy purple mass."
     },
  i:[['chicken',1.5,'kg'],['onion',1.5,'kg'],['sumac',4,'tbsp'],['olive_oil',150,'ml'],['flatbread',4,'pc'],['pine_nuts',50,'g'],['allspice',1,'tsp'],['salt',null,'']],
  s:{fr:["Frottez le poulet d'huile d'olive, de sumac et d'épices, rôtissez-le 45 minutes au four à 200 °C.","Émincez finement une grande quantité d'oignons.","Faites-les confire très longuement dans l'huile d'olive à feu très doux 45 minutes, jusqu'à ce qu'ils soient fondants et légèrement caramélisés.","Ajoutez le sumac aux oignons confits en fin de cuisson, mélangez.","Étalez le pain taboun sur un plateau, couvrez généreusement d'oignons au sumac, déposez le poulet rôti par-dessus et parsemez de pignons dorés au beurre."],
     en:["Rub the chicken with olive oil, sumac and spices, roast 45 minutes in a 200°C oven.","Finely slice a large quantity of onions.","Slow-cook them in olive oil over very low heat for 45 minutes, until soft and lightly caramelised.","Add the sumac to the confited onions at the end, mix.","Spread the taboun bread on a platter, cover generously with sumac onions, top with the roast chicken and scatter with pine nuts toasted in butter."]
     } },

{ id:'muhammar', c:'as', lat:26.229, lon:50.586, base:6, prep:15, cook:35, diff:1, tags:['sweet','rice','sea'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'rice',food:['#c9924a','#e0a83a','#e0dcc0'],garnish:'#7fae6a'},
  n:{fr:'Muhammar',en:'Muhammar'},
  p:{fr:'Manama, Bahreïn',en:'Manama, Bahrain'},
  d:{fr:"Un riz basmati sucré au sirop de dattes et safran, contraste inattendu servi en accompagnement d'un poisson grillé salé, dans une tradition culinaire bahreïnienne où le sucré et le salé se répondent dans la même assiette.",
     en:"Basmati rice sweetened with date syrup and saffron, an unexpected contrast served alongside salty grilled fish, in a Bahraini culinary tradition where sweet and savoury answer each other on the same plate."
     },
  i:[['basmati_rice',400,'g'],['date_syrup',150,'g'],['saffron',1,'pinch'],['butter',40,'g'],['cardamom',3,'pc'],['whole_fish',1,'pc'],['lemon',1,'pc'],['salt',null,'']],
  s:{fr:["Faites cuire le riz basmati rincé dans l'eau salée jusqu'à ce qu'il soit presque tendre, égouttez.","Faites chauffer le sirop de dattes avec le beurre et la cardamome jusqu'à ce qu'il soit fluide.","Versez le sirop sur le riz égoutté, mélangez délicatement pour l'enrober sans l'écraser.","Couvrez et laissez cuire à la vapeur 15 minutes à feu très doux jusqu'à absorption complète.","Salez et grillez le poisson entier au citron, servez-le accompagné du riz sucré."],
     en:["Cook the rinsed basmati rice in salted water until nearly tender, drain.","Heat the date syrup with butter and cardamom until fluid.","Pour the syrup over the drained rice, gently mix to coat without crushing it.","Cover and steam-cook 15 minutes over very low heat until fully absorbed.","Salt and grill the whole fish with lemon, serve alongside the sweetened rice."]
     } }
];
