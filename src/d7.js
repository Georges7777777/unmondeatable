/* ---------- Amérique du Sud & Océanie ---------- */
const D7 = [
{ id:'feijoada', c:'sa', lat:-22.907, lon:-43.173, base:8, prep:60, cook:180, diff:2, tags:['slow','pork','sunday'],
  art:{v:'bowl',bg:'#2a2620',plate:'#f2ece0',style:'stew',food:['#3a2a24','#5a4034','#e8dcc0','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Feijoada',en:'Feijoada'},
  p:{fr:'Rio de Janeiro, Brésil',en:'Rio de Janeiro, Brazil'},
  d:{fr:"Le ragoût de haricots noirs et de porc que le Brésil mange le mercredi et le samedi, jamais seul et jamais vite. Il s'accompagne obligatoirement de farofa, de riz, de chou sauté et d'oranges pour alléger.",
     en:"The black bean and pork stew Brazil eats on Wednesdays and Saturdays, never alone and never quickly. Farofa, rice, sautéed greens and orange slices to lighten it are compulsory."
     },
  i:[['black_beans',700,'g'],['smoked_pork_ribs',500,'g'],['pork_belly',400,'g'],['chorizo',300,'g'],['dried_beef',300,'g'],['onion',2,'pc'],['garlic',8,'clove'],['bay_leaf',3,'pc'],['orange',2,'pc'],['collard_greens',400,'g'],['cassava_flour',200,'g'],['rice',500,'g'],['salt',null,'']],
  s:{fr:["Dessalez la viande séchée 12 heures en changeant l'eau plusieurs fois.","Faites cuire les haricots noirs trempés avec le laurier pendant 1 heure.","Ajoutez les viandes de la plus longue à la plus courte cuisson, et laissez mijoter 2 heures.","Prélevez une louche de haricots, écrasez-la avec de l'ail revenu et remettez-la pour épaissir.","Servez avec riz, chou émincé sauté, farofa dorée au beurre et quartiers d'orange."],
     en:["Desalt the dried beef for 12 hours, changing the water several times.","Cook the soaked black beans with the bay leaves for 1 hour.","Add the meats from longest to shortest cooking time and simmer for 2 hours.","Take out a ladle of beans, mash it with fried garlic and stir it back in to thicken.","Serve with rice, shredded sautéed greens, buttery farofa and orange wedges."]
     } },

{ id:'moqueca-baiana', c:'sa', lat:-12.971, lon:-38.501, base:4, prep:30, cook:30, diff:1, tags:['sea','spicy','stew'],
  art:{v:'bowl',bg:'#2a3a34',plate:'#d9a04a',style:'stew',food:['#d9722f','#e8a04a','#f2e2c0','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Moqueca baiana',en:'Moqueca baiana'},
  p:{fr:'Salvador, Brésil',en:'Salvador, Brazil'},
  d:{fr:"Un ragoût de poisson au lait de coco et à l'huile de palme rouge, cuit dans un plat en terre noire de Bahia. L'huile de dendê, héritage ouest-africain, lui donne sa couleur orange profonde et son parfum unique.",
     en:"A fish stew with coconut milk and red palm oil, cooked in a black Bahian clay pot. Dendê oil, a West African legacy, gives it its deep orange colour and unmistakable perfume."
     },
  i:[['white_fish',800,'g'],['shrimp',300,'g'],['coconut_milk',400,'ml'],['palm_oil',3,'tbsp'],['red_pepper',1,'pc'],['yellow_pepper',1,'pc'],['tomato',3,'pc'],['onion',2,'pc'],['garlic',4,'clove'],['cilantro',1,'bunch'],['lime',2,'pc'],['salt',null,'']],
  s:{fr:["Marinez le poisson 20 minutes dans le jus de citron vert, l'ail et le sel.","Disposez en couches dans la cocotte : oignon, tomate, poivrons, puis le poisson.","Versez le lait de coco et l'huile de dendê, sans jamais remuer.","Couvrez et laissez cuire 20 minutes à feu moyen, en secouant simplement la cocotte.","Ajoutez les crevettes et la coriandre 5 minutes avant la fin ; servez avec du riz et du pirão."],
     en:["Marinate the fish 20 minutes in lime juice, garlic and salt.","Layer in the pot: onion, tomato, peppers, then the fish.","Pour over the coconut milk and dendê oil, never stirring.","Cover and cook 20 minutes over medium heat, simply shaking the pot.","Add the prawns and coriander 5 minutes before the end; serve with rice and pirão."]
     } },

{ id:'asado-argentino', c:'sa', lat:-34.604, lon:-58.382, base:8, prep:30, cook:180, diff:2, tags:['grill','beef','festive'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9dcc0',style:'grill',food:['#8a3a24','#a85f34','#6b3520'],garnish:'#6fbf8f'},
  n:{fr:'Asado argentin',en:'Argentine asado'},
  p:{fr:'Buenos Aires, Argentine',en:'Buenos Aires, Argentina'},
  d:{fr:"Bien plus qu'un barbecue : un rituel dominical où l'asador règne seul sur les braises pendant trois heures. La viande cuit lentement, loin du feu, salée au gros sel et servie avec un chimichurri vif.",
     en:"Far more than a barbecue: a Sunday ritual where the asador alone rules the embers for three hours. The meat cooks slowly, far from the flame, salted with coarse salt and served with sharp chimichurri."
     },
  i:[['beef_short_ribs',2,'kg'],['flank_steak',800,'g'],['chorizo',6,'pc'],['blood_sausage',4,'pc'],['coarse_salt',3,'tbsp'],['parsley',1,'bunch'],['oregano',2,'tbsp'],['garlic',6,'clove'],['red_wine_vinegar',80,'ml'],['olive_oil',150,'ml'],['chili_flakes',1,'tsp']],
  s:{fr:["Allumez le feu 1 heure avant : on cuit sur les braises, jamais sur la flamme.","Salez les côtes au gros sel et posez-les côté os vers le bas, à 20 cm des braises.","Laissez cuire 2 heures sans y toucher, en ajoutant régulièrement des braises fraîches.","Préparez le chimichurri : persil, ail, origan, vinaigre, huile et piment, laissé reposer 1 heure.","Retournez la viande une seule fois pour 30 minutes, puis découpez et servez avec le chimichurri."],
     en:["Light the fire an hour ahead: you cook over embers, never over flame.","Salt the ribs with coarse salt and lay them bone side down, 20 cm above the coals.","Cook 2 hours without touching them, feeding in fresh embers regularly.","Make the chimichurri: parsley, garlic, oregano, vinegar, oil and chilli, rested for 1 hour.","Turn the meat only once, for 30 minutes, then carve and serve with the chimichurri."]
     } },

{ id:'ceviche', c:'sa', lat:-12.046, lon:-77.043, base:4, prep:25, cook:0, diff:1, tags:['sea','fresh','spicy'],
  art:{v:'plate',bg:'#2a3a44',plate:'#f4efe3',style:'fish',food:['#f2c4a6','#e8b04b','#d9722f','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Ceviche',en:'Ceviche'},
  p:{fr:'Lima, Pérou',en:'Lima, Peru'},
  d:{fr:"Du poisson cru « cuit » par l'acidité du citron vert en quelques minutes seulement — les cuisiniers de Lima disent aujourd'hui qu'il ne faut pas dépasser cinq. Le jus qui reste, la leche de tigre, se boit ensuite d'un trait.",
     en:"Raw fish \"cooked\" by lime acidity in a matter of minutes — Lima's cooks now say never more than five. The juice left behind, the leche de tigre, is drunk down in one go."
     },
  i:[['sea_bass',600,'g'],['lime',10,'pc'],['red_onion',1,'pc'],['aji_limo',2,'pc'],['cilantro',1,'bunch'],['sweet_potato',2,'pc'],['corn_kernels',150,'g'],['celery',1,'pc'],['garlic',1,'clove'],['salt',null,'']],
  s:{fr:["Taillez le poisson très frais en cubes réguliers de 2 cm et gardez-les au froid.","Pressez les citrons verts sans écraser l'écorce, qui rendrait le jus amer.","Mixez une partie du jus avec un peu de poisson, du céleri, de l'ail et du piment : c'est la leche de tigre.","Mélangez le poisson, le sel, la leche de tigre et l'oignon rouge finement émincé ; attendez 3 minutes.","Servez immédiatement avec patate douce cuite, maïs et coriandre ciselée."],
     en:["Cut very fresh fish into even 2 cm cubes and keep them cold.","Squeeze the limes without crushing the peel, which would turn the juice bitter.","Blend some juice with a little fish, celery, garlic and chilli: that is the leche de tigre.","Mix fish, salt, leche de tigre and finely sliced red onion; wait 3 minutes.","Serve immediately with cooked sweet potato, corn and chopped coriander."]
     } },

{ id:'arepas', c:'sa', lat:10.481, lon:-66.904, base:4, prep:20, cook:20, diff:1, tags:['bread','street','breakfast'],
  art:{v:'board',bg:'#2f3626',plate:'#e9dcc0',style:'roll',food:['#f0e2c0','#e8dcc0','#c2762c'],garnish:'#6fbf8f'},
  n:{fr:'Arepas reina pepiada',en:'Arepas reina pepiada'},
  p:{fr:'Caracas, Venezuela',en:'Caracas, Venezuela'},
  d:{fr:"Une galette de maïs précuit, dorée puis fendue et garnie comme une poche. La reina pepiada, créée en 1955 en l'honneur d'une miss Venezuela, mêle poulet effiloché et avocat écrasé.",
     en:"A griddled cake of precooked maize, split open and stuffed like a pocket. The reina pepiada, created in 1955 in honour of a Miss Venezuela, combines shredded chicken and crushed avocado."
     },
  i:[['precooked_corn_flour',300,'g'],['warm_water',400,'ml'],['chicken_breast',400,'g'],['avocado',2,'pc'],['mayonnaise',3,'tbsp'],['onion',1,'pc'],['cilantro',1,'bunch'],['lime',1,'pc'],['frying_oil',2,'tbsp'],['salt',null,'']],
  s:{fr:["Mélangez farine de maïs, eau tiède et sel, puis laissez reposer 5 minutes pour que la pâte s'hydrate.","Formez des galettes de 1,5 cm d'épaisseur en lissant les bords entre les paumes.","Saisissez-les 4 minutes par face à la poêle, puis terminez 10 minutes au four : elles doivent sonner creux.","Effilochez le poulet poché et mélangez-le à l'avocat écrasé, la mayonnaise, l'oignon et le citron vert.","Fendez les arepas encore chaudes et garnissez-les généreusement."],
     en:["Mix maize flour, warm water and salt, then rest 5 minutes so the dough hydrates.","Shape 1.5 cm thick cakes, smoothing the edges between your palms.","Sear 4 minutes per side in a pan, then finish 10 minutes in the oven: they should sound hollow.","Shred the poached chicken and mix with crushed avocado, mayonnaise, onion and lime.","Split the arepas while hot and stuff them generously."]
     } },

{ id:'pastel-de-choclo', c:'sa', lat:-33.449, lon:-70.669, base:6, prep:40, cook:50, diff:2, tags:['bake','beef','sweet'],
  art:{v:'plate',bg:'#33301f',plate:'#e0d4b8',style:'pastry',food:['#e8c96a','#f0dc9a','#c2762c'],garnish:'#7fae6a'},
  n:{fr:'Pastel de choclo',en:'Pastel de choclo'},
  p:{fr:'Santiago, Chili',en:'Santiago, Chile'},
  d:{fr:"Un hachis de bœuf, d'oignon, d'olives et d'œuf dur, recouvert d'une purée de maïs frais parfumée au basilic. Saupoudré de sucre, il caramélise au four et sort du plat encore bouillonnant.",
     en:"A hash of beef, onion, olives and hard-boiled egg under a purée of fresh corn scented with basil. Dusted with sugar, it caramelises in the oven and arrives still bubbling."
     },
  i:[['ground_beef',700,'g'],['corn_kernels',1,'kg'],['onion',3,'pc'],['whole_milk',200,'ml'],['basil',1,'bunch'],['black_olives',12,'pc'],['egg',3,'pc'],['raisins',60,'g'],['chicken_breast',300,'g'],['cumin',1,'tsp'],['sweet_paprika',1,'tsp'],['sugar',3,'tbsp'],['salt',null,'']],
  s:{fr:["Faites revenir longuement les oignons hachés, ajoutez la viande, le cumin et le paprika : c'est le pino.","Mixez le maïs frais avec le lait et le basilic, puis faites épaissir cette pâte à feu doux 15 minutes.","Répartissez le pino dans des plats individuels, ajoutez poulet, olives, raisins et œuf dur.","Recouvrez de pâte de maïs et lissez la surface.","Saupoudrez de sucre et enfournez 30 minutes à 200 °C, jusqu'à ce que le dessus caramélise."],
     en:["Cook the chopped onions slowly, add the beef, cumin and paprika: this is the pino.","Blend fresh corn with milk and basil, then thicken the purée over low heat for 15 minutes.","Divide the pino between individual dishes and add chicken, olives, raisins and hard-boiled egg.","Cover with the corn purée and smooth the surface.","Dust with sugar and bake 30 minutes at 200°C, until the top caramelises."]
     } },

{ id:'bandeja-paisa', c:'sa', lat:6.244, lon:-75.581, base:4, prep:40, cook:120, diff:2, tags:['legume','pork','comfort'],
  art:{v:'plate',bg:'#2e3326',plate:'#f2ece0',style:'grill',food:['#8a4a2a','#e0b45c','#6b4a34'],garnish:'#7fae6a'},
  n:{fr:'Bandeja paisa',en:'Bandeja paisa'},
  p:{fr:'Medellín, Colombie',en:'Medellín, Colombia'},
  d:{fr:"Un plateau démesuré né de la nourriture des muletiers d'Antioquia, qui marchaient toute la journée en montagne. Haricots, riz, viande hachée, chicharrón, œuf, plantain, avocat et arepa : tout arrive en même temps.",
     en:"An outsized platter descended from the food of Antioquia's muleteers, who walked mountain trails all day. Beans, rice, minced beef, chicharrón, egg, plantain, avocado and arepa all arrive at once."
     },
  i:[['red_kidney_beans',400,'g'],['pork_belly',400,'g'],['ground_beef',400,'g'],['chorizo',4,'pc'],['rice',400,'g'],['plantain',2,'pc'],['egg',4,'pc'],['avocado',2,'pc'],['arepa',4,'pc'],['tomato',3,'pc'],['onion',2,'pc'],['cumin',1,'tsp'],['salt',null,'']],
  s:{fr:["Cuisez les haricots rouges trempés 2 heures avec un morceau de plantain vert, qui les épaissit.","Préparez un hogao : tomates et oignons fondus longuement, à ajouter aux haricots.","Entaillez la poitrine de porc et faites-la cuire à couvert puis à découvert jusqu'à ce que la couenne éclate.","Faites revenir la viande hachée avec le cumin, grillez les chorizos, frottez les plantains mûrs et faites-les frire.","Dressez tous les éléments côte à côte sur un grand plateau, avec l'œuf au plat, l'avocat et l'arepa."],
     en:["Cook the soaked red beans for 2 hours with a piece of green plantain, which thickens them.","Make a hogao: tomatoes and onions slowly melted, to be stirred into the beans.","Score the pork belly and cook it covered, then uncovered, until the rind blisters.","Fry the minced beef with cumin, grill the chorizos and fry the ripe plantains.","Arrange everything side by side on a big platter with the fried egg, avocado and arepa."]
     } },

{ id:'pavlova', c:'oc', lat:-36.848, lon:174.763, base:8, prep:25, cook:90, diff:2, tags:['sweet','festive','bake'],
  art:{v:'plate',bg:'#2c3340',plate:'#f4efe3',style:'cake',food:['#f8f4ea','#f2ece0','#c93b52'],garnish:'#6fbf8f'},
  n:{fr:'Pavlova',en:'Pavlova'},
  p:{fr:'Auckland, Nouvelle-Zélande',en:'Auckland, New Zealand'},
  d:{fr:"Un disque de meringue croustillant à l'extérieur, guimauve à l'intérieur, créé en l'honneur de la ballerine Anna Pavlova lors de sa tournée de 1926. La Nouvelle-Zélande et l'Australie s'en disputent encore la paternité.",
     en:"A meringue disc, crisp outside and marshmallow within, created for the ballerina Anna Pavlova during her 1926 tour. New Zealand and Australia still argue over who invented it."
     },
  i:[['egg_white',6,'pc'],['sugar',300,'g'],['cornstarch',2,'tsp'],['white_vinegar',1,'tsp'],['vanilla',1,'tsp'],['heavy_cream',400,'ml'],['strawberries',300,'g'],['kiwi',3,'pc'],['passion_fruit',3,'pc']],
  s:{fr:["Montez les blancs à température ambiante en ajoutant le sucre en pluie, très progressivement.","Fouettez 10 minutes : la meringue doit être si ferme qu'elle ne bouge pas si l'on retourne le bol.","Incorporez délicatement fécule, vinaigre et vanille à la spatule.","Formez un disque de 22 cm en creusant légèrement le centre et enfournez 90 minutes à 120 °C.","Laissez refroidir dans le four éteint, porte entrouverte, puis garnissez de crème fouettée et de fruits."],
     en:["Whip room-temperature whites, adding the sugar in a very slow stream.","Beat for 10 minutes: the meringue must be stiff enough to stay put in an upturned bowl.","Fold in the cornflour, vinegar and vanilla with a spatula.","Shape a 22 cm disc with a slight hollow in the centre and bake 90 minutes at 120°C.","Cool in the switched-off oven with the door ajar, then top with whipped cream and fruit."]
     } },

{ id:'meat-pie', c:'oc', lat:-37.814, lon:144.963, base:6, prep:45, cook:45, diff:2, tags:['bake','beef','street'],
  art:{v:'board',bg:'#2f2f2a',plate:'#e9dcc0',style:'pastry',food:['#d9a83a','#e8c96a','#8a4a2a'],garnish:'#7fae6a'},
  n:{fr:'Tourte australienne',en:'Aussie meat pie'},
  p:{fr:'Melbourne, Australie',en:'Melbourne, Australia'},
  d:{fr:"La tourte que l'on mange debout dans les stades australiens, d'une main, avec un trait de sauce tomate. Une pâte brisée en dessous, une pâte feuilletée au-dessus, et un ragoût de bœuf assez épais pour ne pas couler.",
     en:"The pie eaten standing up at Australian stadiums, in one hand, with a squirt of tomato sauce. Shortcrust below, puff pastry above, and a beef filling thick enough never to run."
     },
  i:[['beef_chuck',700,'g'],['onion',1,'pc'],['beef_broth',400,'ml'],['tomato_paste',2,'tbsp'],['worcestershire',2,'tbsp'],['flour',3,'tbsp'],['shortcrust_pastry',400,'g'],['puff_pastry',400,'g'],['egg',1,'pc'],['frying_oil',2,'tbsp'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Coupez le bœuf en petits dés et saisissez-le par petites quantités pour bien le colorer.","Ajoutez l'oignon, singez à la farine, puis mouillez au bouillon avec tomate et Worcestershire.","Laissez mijoter 1 heure jusqu'à obtenir une sauce très épaisse, et refroidissez complètement.","Foncez les moules de pâte brisée, garnissez de viande froide et couvrez de pâte feuilletée.","Soudez les bords, dorez à l'œuf et enfournez 25 minutes à 200 °C."],
     en:["Cut the beef into small dice and sear it in batches for a proper crust.","Add the onion, dust with flour, then add broth, tomato paste and Worcestershire.","Simmer for 1 hour to a very thick gravy, then cool completely.","Line the tins with shortcrust, fill with the cold meat and cover with puff pastry.","Seal the edges, brush with egg and bake 25 minutes at 200°C."]
     } },

{ id:'kokoda', c:'oc', lat:-18.141, lon:178.442, base:4, prep:30, cook:0, diff:1, tags:['sea','fresh','veg'],
  art:{v:'bowl',bg:'#20404a',plate:'#f4efe3',style:'soup',food:['#f4f0e6','#e8dcc0','#c2542c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Kokoda',en:'Kokoda'},
  p:{fr:'Suva, Fidji',en:'Suva, Fiji'},
  d:{fr:"Le ceviche du Pacifique : le poisson marine au citron vert puis se repose dans du lait de coco frais, qui adoucit l'acidité. On le sert traditionnellement dans une demi-noix de coco, très frais.",
     en:"The Pacific's ceviche: fish marinated in lime then rested in fresh coconut milk, which rounds off the acidity. It is traditionally served ice cold in half a coconut shell."
     },
  i:[['white_fish',600,'g'],['lime',8,'pc'],['coconut_milk',400,'ml'],['tomato',2,'pc'],['red_onion',1,'pc'],['cucumber',1,'pc'],['red_chili',1,'pc'],['spring_onion',2,'pc'],['salt',null,'']],
  s:{fr:["Taillez le poisson blanc très frais en cubes de 1,5 cm.","Couvrez-le de jus de citron vert et laissez mariner 20 minutes au frais, jusqu'à ce qu'il blanchisse.","Égouttez le poisson en jetant la moitié du jus, trop acide.","Mélangez au lait de coco, aux tomates concassées, au concombre, à l'oignon et au piment.","Réservez 15 minutes au réfrigérateur et servez très frais, parsemé de ciboule."],
     en:["Cut very fresh white fish into 1.5 cm cubes.","Cover with lime juice and marinate 20 minutes in the fridge, until it turns opaque.","Drain the fish, discarding half the juice, which is too sharp.","Mix with coconut milk, chopped tomato, cucumber, onion and chilli.","Chill 15 minutes and serve very cold, scattered with spring onion."]
     } },

{ id:'poke', c:'oc', lat:21.307, lon:-157.858, base:4, prep:20, cook:0, diff:1, tags:['sea','fresh','rice'],
  art:{v:'bowl',bg:'#243a44',plate:'#f2ece0',style:'salad',food:['#c94f3a','#e0603f','#f0e8d8','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Poke ahi',en:'Ahi poke'},
  p:{fr:'Honolulu, Hawaï',en:'Honolulu, Hawaii'},
  d:{fr:"Avant d'être une mode mondiale, le poke était la collation des pêcheurs hawaïens : du thon coupé en morceaux, du sel de mer, des algues et des noix de kukui. Le mot signifie simplement « couper en tranches ».",
     en:"Long before it became a global trend, poke was Hawaiian fishermen's snack: chunks of tuna, sea salt, seaweed and kukui nuts. The word simply means \"to slice\"."
     },
  i:[['tuna',600,'g'],['soy_sauce',60,'ml'],['sesame_oil',2,'tbsp'],['spring_onion',4,'pc'],['sweet_onion',1,'pc'],['wakame',20,'g'],['sesame_seeds',2,'tbsp'],['chili_flakes',1,'tsp'],['sushi_rice',400,'g'],['avocado',1,'pc'],['sea_salt',1,'tsp']],
  s:{fr:["Choisissez un thon de qualité sashimi et taillez-le en cubes de 2 cm.","Réhydratez les algues wakame 10 minutes puis hachez-les grossièrement.","Mélangez sauce soja, huile de sésame, piment et sel de mer.","Assaisonnez délicatement le thon avec les oignons émincés et les algues ; laissez reposer 15 minutes au frais.","Servez sur du riz tiède vinaigré, avec avocat et graines de sésame torréfiées."],
     en:["Choose sashimi-grade tuna and cut it into 2 cm cubes.","Rehydrate the wakame for 10 minutes and chop it roughly.","Mix soy sauce, sesame oil, chilli and sea salt.","Dress the tuna gently with the sliced onions and seaweed; rest 15 minutes in the fridge.","Serve over warm vinegared rice with avocado and toasted sesame seeds."]
     } }
];

