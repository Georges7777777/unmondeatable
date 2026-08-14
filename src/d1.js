/* ---------- Europe (1/2) ---------- */
const D1 = [
{ id:'bouillabaisse', c:'eu', lat:43.296, lon:5.370, base:4, prep:40, cook:50, diff:2, tags:['sea','sunday'],
  art:{v:'bowl',bg:'#26485c',plate:'#f4efe3',style:'soup',food:['#d97327','#e8b04b','#c9482c','#efe0bb'],garnish:'#6fbf8f'},
  n:{fr:'Bouillabaisse',en:'Bouillabaisse'},
  p:{fr:'Marseille, France',en:'Marseille, France'},
  d:{fr:"Née du chaudron des pêcheurs marseillais, la bouillabaisse transforme les poissons de roche invendus en un bouillon safrané d'une profondeur rare. On sert d'abord la soupe avec la rouille et les croûtons, puis les poissons en plat.",
     en:"Born in the cauldrons of Marseille fishermen, bouillabaisse turns unsold rockfish into a saffron broth of rare depth. The soup is served first with rouille and croutons, the fish following as a second course."
     },
  i:[['rockfish',1200,'g'],['fennel',1,'pc'],['onion',2,'pc'],['tomato',4,'pc'],['garlic',4,'clove'],['saffron',1,'pinch'],['orange_zest',1,'pc'],['olive_oil',6,'tbsp'],['potato',4,'pc'],['baguette',1,'pc'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Faites revenir oignon et fenouil émincés dans l'huile d'olive sans coloration.","Ajoutez tomates, ail, zeste d'orange et safran, puis couvrez d'eau et laissez frémir 30 minutes.","Passez le bouillon au moulin à légumes pour en extraire toute la saveur, puis rectifiez l'assaisonnement.","Pochez-y les poissons du plus ferme au plus fragile, 8 à 12 minutes en tout.","Servez le bouillon brûlant sur des croûtons frottés à l'ail, les poissons et les pommes de terre à part."],
     en:["Sweat the sliced onion and fennel in olive oil without colouring.","Add tomatoes, garlic, orange zest and saffron, cover with water and simmer for 30 minutes.","Pass the broth through a food mill to extract every bit of flavour, then adjust the seasoning.","Poach the fish in it from firmest to most delicate, 8 to 12 minutes in all.","Serve the broth piping hot over garlic-rubbed croutons, with the fish and potatoes on the side."]
     } },

{ id:'cassoulet', c:'eu', lat:43.317, lon:1.953, base:6, prep:30, cook:180, diff:2, tags:['slow','legume','comfort'],
  art:{v:'bowl',bg:'#3a2f22',plate:'#e8d9bd',style:'stew',food:['#c9a24a','#7a3f22','#e2cf9a','#8f5a2b'],garnish:'#7fae6a'},
  n:{fr:'Cassoulet',en:'Cassoulet'},
  p:{fr:'Castelnaudary, France',en:'Castelnaudary, France'},
  d:{fr:"Ce ragoût de haricots blancs et de viandes confites mijote des heures dans une cassole de terre cuite qui lui a donné son nom. La croûte dorée que l'on brise et replonge sept fois fait toute sa légende.",
     en:"This stew of white beans and confit meats bakes for hours in the earthenware cassole that gave it its name. The golden crust, broken and folded back in seven times, is the heart of its legend."
     },
  i:[['white_beans',600,'g'],['duck_confit',6,'pc'],['toulouse_sausage',6,'pc'],['pork_belly',300,'g'],['onion',2,'pc'],['carrot',2,'pc'],['garlic',6,'clove'],['tomato_paste',2,'tbsp'],['thyme',2,'sprig'],['breadcrumbs',4,'tbsp'],['salt',null,''],['pepper',null,'']],
  s:{fr:["Faites tremper les haricots la veille, puis cuisez-les 1 heure avec carotte, oignon et thym.","Colorez saucisses et poitrine dans la graisse de canard, réservez.","Alternez haricots et viandes dans une cassole, mouillez à hauteur avec le bouillon de cuisson.","Parsemez de chapelure et enfournez 2 heures à 150 °C.","Brisez la croûte à la cuillère plusieurs fois pendant la cuisson, et servez directement dans le plat."],
     en:["Soak the beans overnight, then simmer them for 1 hour with carrot, onion and thyme.","Brown the sausages and pork belly in duck fat, then set aside.","Layer beans and meats in the cassole and pour in the cooking broth to just cover.","Scatter with breadcrumbs and bake for 2 hours at 150°C.","Break the crust with a spoon several times during baking, and serve straight from the dish."]
     } },

{ id:'pizza-napoletana', c:'eu', lat:40.851, lon:14.268, base:4, prep:30, cook:2, diff:2, tags:['bread','street','veg'],
  art:{v:'board',bg:'#2f2a24',plate:'#e9d9b8',style:'flat',food:['#e2c48a','#c9402c','#f3efe4','#4f8f4a'],garnish:'#4f8f4a'},
  n:{fr:'Pizza napolitaine',en:'Neapolitan pizza'},
  p:{fr:'Naples, Italie',en:'Naples, Italy'},
  d:{fr:"Trois ingrédients, aucune tricherie : tomate San Marzano, mozzarella di bufala, basilic. La pâte, longuement fermentée, gonfle en 90 secondes dans un four à bois à 450 °C pour donner ce bord léopardé.",
     en:"Three ingredients and nowhere to hide: San Marzano tomato, buffalo mozzarella, basil. The long-fermented dough puffs in 90 seconds in a 450°C wood oven to give that leopard-spotted rim."
     },
  i:[['flour_00',600,'g'],['water',380,'ml'],['fresh_yeast',2,'g'],['salt',15,'g'],['san_marzano_tomato',400,'g'],['mozzarella',300,'g'],['basil',1,'bunch'],['olive_oil',3,'tbsp']],
  s:{fr:["Mélangez farine, eau, levure et sel, pétrissez 15 minutes jusqu'à obtenir une pâte lisse.","Laissez lever 2 heures à température ambiante puis 24 heures au frais.","Divisez en pâtons de 250 g et laissez détendre 4 heures avant de les étaler à la main.","Écrasez les tomates à la fourchette, salez, étalez-les en spirale sur la pâte.","Ajoutez la mozzarella égouttée, un filet d'huile et enfournez au maximum de votre four ; basilic à la sortie."],
     en:["Mix flour, water, yeast and salt, then knead for 15 minutes until smooth.","Let rise 2 hours at room temperature, then 24 hours in the fridge.","Divide into 250 g balls and rest 4 hours before stretching by hand.","Crush the tomatoes with a fork, season, and spread in a spiral over the base.","Add drained mozzarella and a drizzle of oil, bake as hot as your oven goes; basil on the way out."]
     } },

{ id:'risotto-milanese', c:'eu', lat:45.464, lon:9.190, base:4, prep:10, cook:20, diff:1, tags:['rice','comfort','veg'],
  art:{v:'plate',bg:'#3a3320',plate:'#f2ece0',style:'rice',food:['#e5b93f','#f3d878','#c98f2a'],garnish:'#7fae6a'},
  n:{fr:'Risotto alla milanese',en:'Risotto alla milanese'},
  p:{fr:'Milan, Italie',en:'Milan, Italy'},
  d:{fr:"Un risotto d'un jaune éclatant, teinté au safran, dont la légende attribue la couleur à un vitrier du Duomo. Toute la technique tient dans le geste final : hors du feu, on fouette beurre froid et parmesan pour l'onctuosité.",
     en:"A brilliantly yellow risotto stained with saffron, whose colour legend credits to a glazier at the Duomo. Everything hangs on the final gesture: off the heat, cold butter and parmesan are beaten in for creaminess."
     },
  i:[['carnaroli_rice',320,'g'],['beef_broth',1.2,'l'],['saffron',1,'pinch'],['shallot',1,'pc'],['white_wine',100,'ml'],['butter',80,'g'],['parmesan',80,'g'],['bone_marrow',40,'g'],['salt',null,'']],
  s:{fr:["Faites suer l'échalote ciselée dans un peu de beurre avec la moelle.","Nacrez le riz 2 minutes, déglacez au vin blanc et laissez évaporer.","Ajoutez le bouillon chaud louche par louche en remuant, 16 à 18 minutes.","Incorporez le safran infusé dans un peu de bouillon à mi-cuisson.","Hors du feu, montez au beurre froid et au parmesan, couvrez 1 minute puis servez « all'onda »."],
     en:["Sweat the finely chopped shallot in a little butter with the marrow.","Toast the rice for 2 minutes, deglaze with white wine and let it evaporate.","Add hot broth a ladle at a time, stirring, for 16 to 18 minutes.","Stir in the saffron, steeped in a little broth, halfway through cooking.","Off the heat, beat in cold butter and parmesan, rest 1 minute and serve it wavy."]
     } },

{ id:'paella-valenciana', c:'eu', lat:39.470, lon:-0.377, base:6, prep:25, cook:45, diff:2, tags:['rice','sunday','poultry'],
  art:{v:'plate',bg:'#3d2d1c',plate:'#d9cbb0',style:'rice',food:['#dca63a','#b8452c','#7fae5a','#efd9a0'],garnish:'#7fae6a'},
  n:{fr:'Paella valenciana',en:'Paella valenciana'},
  p:{fr:'Valence, Espagne',en:'Valencia, Spain'},
  d:{fr:"La vraie paella de Valence ignore les fruits de mer : poulet, lapin, haricots plats et garrofó, cuits au feu de sarments. Le trésor est au fond, ce socarrat croustillant que l'on gratte à la cuillère.",
     en:"True Valencian paella contains no seafood: chicken, rabbit, flat beans and garrofó, cooked over vine cuttings. The treasure lies at the bottom — the crisp socarrat you scrape up with a spoon."
     },
  i:[['bomba_rice',480,'g'],['chicken',600,'g'],['rabbit',500,'g'],['flat_green_beans',200,'g'],['lima_beans',150,'g'],['tomato',2,'pc'],['sweet_paprika',1,'tbsp'],['saffron',1,'pinch'],['olive_oil',6,'tbsp'],['rosemary',1,'sprig'],['salt',null,'']],
  s:{fr:["Dorez longuement poulet et lapin dans l'huile, au bord de la paella.","Ajoutez les haricots, puis la tomate râpée et le paprika hors du feu pour ne pas le brûler.","Couvrez d'eau, ajoutez le safran et laissez cuire ce bouillon 20 minutes.","Versez le riz en croix, répartissez-le une seule fois et ne remuez plus jamais.","Cuisez 18 minutes en baissant le feu, poussez la flamme 1 minute pour le socarrat, reposez 5 minutes."],
     en:["Brown the chicken and rabbit slowly in oil around the edge of the pan.","Add the beans, then grated tomato and paprika off the heat so it does not burn.","Cover with water, add the saffron and let this broth cook for 20 minutes.","Pour the rice in a cross, spread it once and never stir again.","Cook 18 minutes, lowering the heat, flash the flame 1 minute for the socarrat, rest 5 minutes."]
     } },

{ id:'gazpacho', c:'eu', lat:37.389, lon:-5.984, base:4, prep:20, cook:0, diff:1, tags:['veg','fresh','soup'],
  art:{v:'bowl',bg:'#2c3b2a',plate:'#f2ece0',style:'soup',food:['#c2402c','#d9573a','#7fae5a','#efe0bb'],garnish:'#6fbf8f'},
  n:{fr:'Gazpacho andalou',en:'Andalusian gazpacho'},
  p:{fr:'Séville, Espagne',en:'Seville, Spain'},
  d:{fr:"Une soupe froide née de la nécessité : du pain rassis, de l'huile d'olive et les légumes du potager, mixés pour affronter les 40 °C de l'été andalou. Bien émulsionné, il prend une texture veloutée presque rose.",
     en:"A cold soup born of necessity: stale bread, olive oil and garden vegetables blended to face 40°C Andalusian summers. Properly emulsified, it turns velvety and almost pink."
     },
  i:[['ripe_tomato',1,'kg'],['cucumber',1,'pc'],['green_pepper',1,'pc'],['garlic',1,'clove'],['stale_bread',80,'g'],['olive_oil',100,'ml'],['sherry_vinegar',3,'tbsp'],['salt',null,'']],
  s:{fr:["Faites tremper le pain 10 minutes dans un peu d'eau.","Mixez tomates, concombre pelé, poivron et ail jusqu'à obtenir un liquide homogène.","Ajoutez le pain essoré et le vinaigre, mixez à nouveau.","Versez l'huile d'olive en filet, moteur en marche, jusqu'à ce que la couleur pâlisse.","Passez au chinois, salez et réfrigérez au moins 3 heures ; servez glacé."],
     en:["Soak the bread in a little water for 10 minutes.","Blend tomatoes, peeled cucumber, pepper and garlic to a smooth liquid.","Add the squeezed bread and the vinegar, then blend again.","Pour in the olive oil in a thin stream with the motor running until the colour pales.","Pass through a fine sieve, season and chill at least 3 hours; serve ice cold."]
     } },

{ id:'bacalhau-a-bras', c:'eu', lat:38.722, lon:-9.139, base:4, prep:20, cook:15, diff:1, tags:['sea','comfort','fry'],
  art:{v:'plate',bg:'#2b3a4a',plate:'#f2ece0',style:'noodle',food:['#e8c96a','#f0dc9a','#2c2c2c','#d9a03a'],garnish:'#5aa06a'},
  n:{fr:'Bacalhau à Brás',en:'Bacalhau à Brás'},
  p:{fr:'Lisbonne, Portugal',en:'Lisbon, Portugal'},
  d:{fr:"Un plat de taverne du Bairro Alto où la morue effilochée rencontre des pommes paille et des œufs à peine pris. Le secret : couper le feu avant que les œufs ne coagulent vraiment, pour garder l'onctuosité.",
     en:"A Bairro Alto tavern dish where shredded salt cod meets matchstick potatoes and barely-set eggs. The secret is to kill the heat before the eggs truly set, keeping everything silky."
     },
  i:[['salt_cod',500,'g'],['potato',600,'g'],['onion',2,'pc'],['garlic',3,'clove'],['egg',6,'pc'],['olive_oil',100,'ml'],['black_olives',60,'g'],['parsley',1,'bunch'],['pepper',null,'']],
  s:{fr:["Dessalez la morue 24 heures en changeant l'eau, puis effilochez-la à la main.","Taillez les pommes de terre en fine paille et faites-les frire jusqu'à ce qu'elles soient dorées.","Faites fondre oignon et ail dans l'huile d'olive, ajoutez la morue et laissez tiédir ensemble 5 minutes.","Mélangez les pommes paille, versez les œufs battus et remuez 30 secondes hors du feu.","Servez aussitôt, parsemé de persil et d'olives noires."],
     en:["Desalt the cod for 24 hours, changing the water, then shred it by hand.","Cut the potatoes into fine matchsticks and fry until golden.","Melt onion and garlic in olive oil, add the cod and let them mingle for 5 minutes.","Fold in the potatoes, pour over the beaten eggs and stir for 30 seconds off the heat.","Serve at once, scattered with parsley and black olives."]
     } },

{ id:'francesinha', c:'eu', lat:41.158, lon:-8.629, base:2, prep:20, cook:25, diff:1, tags:['comfort','pork','cheese'],
  art:{v:'plate',bg:'#3a2622',plate:'#f2ece0',style:'grill',food:['#d9722f','#e8b04b','#b8452c'],garnish:'#7fae6a'},
  n:{fr:'Francesinha',en:'Francesinha'},
  p:{fr:'Porto, Portugal',en:'Porto, Portugal'},
  d:{fr:"Le croque-monsieur portugais poussé à l'excès : jambon, saucisse et steak entre deux tranches de pain, noyés sous le fromage fondu et une sauce à la bière piquante. Un plat né dans les années 1950 pour réchauffer les nuits de Porto.",
     en:"The Portuguese croque-monsieur taken to excess: ham, sausage and steak between two slices of bread, drowned in melted cheese and a spicy beer sauce. Invented in the 1950s to warm up Porto nights."
     },
  i:[['white_bread',4,'slice'],['beef_steak',2,'pc'],['ham',4,'slice'],['fresh_sausage',2,'pc'],['cheese_slices',6,'pc'],['beer',200,'ml'],['tomato_paste',2,'tbsp'],['piri_piri',1,'tsp'],['butter',20,'g'],['flour',1,'tbsp'],['egg',2,'pc']],
  s:{fr:["Préparez la sauce : faites un roux, mouillez à la bière, ajoutez tomate et piri-piri, laissez réduire 15 minutes.","Poêlez steaks et saucisses, faites griller les tranches de pain.","Empilez pain, jambon, saucisse fendue, steak, puis refermez avec le second pain.","Couvrez entièrement de tranches de fromage et passez sous le gril jusqu'à ce qu'il file.","Nappez de sauce brûlante, couronnez d'un œuf au plat et servez avec des frites."],
     en:["Make the sauce: cook a roux, add beer, tomato paste and piri-piri, reduce for 15 minutes.","Pan-fry the steaks and sausages, and toast the bread.","Stack bread, ham, split sausage, steak, then close with the second slice.","Cover completely with cheese slices and grill until molten.","Pour over the hot sauce, crown with a fried egg and serve with chips."]
     } }
];
