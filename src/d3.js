/* ---------- Asie (1/2) ---------- */
const D3 = [
{ id:'sushi-edomae', c:'as', lat:35.682, lon:139.650, base:4, prep:60, cook:15, diff:3, tags:['sea','fresh','rice'],
  art:{v:'board',bg:'#22303c',plate:'#e9dcc0',style:'roll',food:['#f4f0e6','#e0603f','#2c2c2c'],garnish:'#6fbf8f'},
  n:{fr:'Sushi edomae',en:'Edomae sushi'},
  p:{fr:'Tokyo, Japon',en:'Tokyo, Japan'},
  d:{fr:"Au XIXᵉ siècle, le sushi était une nourriture de rue vendue en bouchées dans la baie d'Edo. Tout repose sur le shari : un riz tiède, vinaigré, dont chaque grain doit rester distinct sous les doigts.",
     en:"In the 19th century sushi was street food, sold by the piece around Edo bay. Everything rests on the shari: warm vinegared rice whose grains must stay distinct under the fingers."
     },
  i:[['sushi_rice',400,'g'],['rice_vinegar',60,'ml'],['sugar',2,'tbsp'],['salt',1,'tsp'],['tuna',200,'g'],['salmon',200,'g'],['nori',4,'sheet'],['wasabi',1,'tsp'],['soy_sauce',60,'ml'],['pickled_ginger',50,'g']],
  s:{fr:["Rincez le riz jusqu'à ce que l'eau soit claire, puis cuisez-le et laissez-le reposer 10 minutes à couvert.","Chauffez vinaigre, sucre et sel, versez sur le riz chaud et séparez les grains à la spatule en éventant.","Parez les poissons et taillez des tranches régulières de 8 g, dans le sens contraire des fibres.","Formez des boulettes de riz d'environ 15 g dans la paume humide, sans jamais écraser.","Déposez une pointe de wasabi puis la tranche de poisson, pressez délicatement et servez sans attendre."],
     en:["Rinse the rice until the water runs clear, cook it and let it stand covered for 10 minutes.","Warm vinegar, sugar and salt, pour over the hot rice and cut the grains apart while fanning.","Trim the fish and slice even 8 g pieces against the grain.","Shape 15 g rice pillows in a damp palm, never compressing them.","Add a dab of wasabi, lay on the fish, press gently and serve immediately."]
     } },

{ id:'ramen-tonkotsu', c:'as', lat:33.590, lon:130.402, base:4, prep:40, cook:480, diff:3, tags:['noodles','soup','pork'],
  art:{v:'bowl',bg:'#2a2f3c',plate:'#e8ddd0',style:'noodle',food:['#e6d3a3','#f0e4c0','#c4653a','#2c2c2c'],garnish:'#6fbf8f'},
  n:{fr:'Ramen tonkotsu',en:'Tonkotsu ramen'},
  p:{fr:'Fukuoka, Japon',en:'Fukuoka, Japan'},
  d:{fr:"Le bouillon d'os de porc du Kyushu bout à gros bouillons pendant douze heures jusqu'à devenir blanc et crémeux. Servi sur des nouilles fines et droites, il se couronne de chashu et d'un œuf mariné au jaune coulant.",
     en:"Kyushu's pork bone broth boils hard for twelve hours until it turns white and creamy. Poured over thin straight noodles, it is crowned with chashu and a marinated egg with a molten yolk."
     },
  i:[['pork_bones',2,'kg'],['pork_belly',600,'g'],['ramen_noodles',400,'g'],['egg',4,'pc'],['soy_sauce',100,'ml'],['mirin',50,'ml'],['garlic',6,'clove'],['ginger',30,'g'],['spring_onion',4,'pc'],['nori',4,'sheet'],['sesame_oil',1,'tbsp'],['salt',null,'']],
  s:{fr:["Blanchissez les os 10 minutes, rincez-les puis faites-les bouillir à gros bouillons 8 heures en complétant l'eau.","Roulez et ficelez la poitrine, faites-la braiser 2 heures dans sauce soja, mirin, ail et gingembre.","Faites cuire les œufs 6 min 30, écalez-les et laissez-les mariner une nuit dans la sauce de braisage.","Cuisez les nouilles à peine 90 secondes et égouttez-les vigoureusement.","Versez le bouillon brûlant sur les nouilles, ajoutez chashu, demi-œuf, ciboule et nori."],
     en:["Blanch the bones for 10 minutes, rinse, then boil hard for 8 hours, topping up the water.","Roll and tie the pork belly and braise it 2 hours in soy, mirin, garlic and ginger.","Boil the eggs for 6½ minutes, peel and marinate overnight in the braising liquid.","Cook the noodles for barely 90 seconds and shake them dry.","Pour the scalding broth over the noodles, add chashu, half an egg, spring onion and nori."]
     } },

{ id:'peking-duck', c:'as', lat:39.904, lon:116.407, base:6, prep:1440, cook:90, diff:3, tags:['poultry','festive','bake'],
  art:{v:'board',bg:'#3a2622',plate:'#e9dcc0',style:'grill',food:['#a8492a','#c2632f','#8a3a20'],garnish:'#7fae6a'},
  n:{fr:'Canard laqué de Pékin',en:'Peking duck'},
  p:{fr:'Pékin, Chine',en:'Beijing, China'},
  d:{fr:"Servi à la cour des Ming dès le XVᵉ siècle, ce canard est ébouillanté, laqué au malt puis séché à l'air avant de rôtir. On ne mange d'abord que la peau, croquante comme du verre, roulée dans une crêpe.",
     en:"Served at the Ming court from the 15th century, the duck is scalded, glazed with malt and air-dried before roasting. The skin, crisp as glass, is eaten first, rolled in a thin pancake."
     },
  i:[['whole_duck',1,'pc'],['maltose',3,'tbsp'],['rice_vinegar',3,'tbsp'],['five_spice',1,'tsp'],['mandarin_pancakes',24,'pc'],['hoisin_sauce',100,'g'],['cucumber',1,'pc'],['spring_onion',6,'pc'],['salt',null,'']],
  s:{fr:["Décollez la peau du canard à l'air comprimé ou au manche de cuillère, sans la percer.","Ébouillantez-le, badigeonnez-le du mélange maltose-vinaigre et séchez-le 24 heures au réfrigérateur.","Rôtissez 30 minutes à 200 °C puis 50 minutes à 160 °C, poitrine vers le haut.","Découpez la peau en losanges, puis la chair en fines lamelles.","Servez avec les crêpes tièdes, la sauce hoisin, le concombre et la ciboule en bâtonnets."],
     en:["Separate the skin from the flesh with air or a spoon handle, without piercing it.","Scald the duck, brush with the maltose-vinegar glaze and dry 24 hours in the fridge.","Roast 30 minutes at 200°C, then 50 minutes at 160°C, breast up.","Cut the skin into diamonds, then slice the meat thinly.","Serve with warm pancakes, hoisin sauce, cucumber and spring onion batons."]
     } },

{ id:'mapo-tofu', c:'as', lat:30.659, lon:104.066, base:4, prep:15, cook:15, diff:1, tags:['spicy','comfort','pork'],
  art:{v:'bowl',bg:'#3a2222',plate:'#f2ece0',style:'stew',food:['#c23a26','#e05a2c','#f4f0e6','#8a3a20'],garnish:'#6fbf8f'},
  n:{fr:'Mapo tofu',en:'Mapo tofu'},
  p:{fr:'Chengdu, Chine',en:'Chengdu, China'},
  d:{fr:"Le plat emblématique du Sichuan, attribué à la femme grêlée d'un aubergiste du XIXᵉ siècle. Le poivre de Sichuan y provoque le fameux málà : une brûlure douce doublée d'un engourdissement électrique.",
     en:"Sichuan's emblematic dish, credited to the pockmarked wife of a 19th-century innkeeper. Sichuan pepper delivers the famous málà: a gentle burn doubled with an electric numbness."
     },
  i:[['silken_tofu',600,'g'],['ground_pork',200,'g'],['doubanjiang',2,'tbsp'],['fermented_black_beans',1,'tbsp'],['sichuan_pepper',1,'tsp'],['chili_oil',2,'tbsp'],['garlic',3,'clove'],['ginger',20,'g'],['spring_onion',3,'pc'],['chicken_broth',250,'ml'],['cornstarch',1,'tbsp'],['soy_sauce',1,'tbsp']],
  s:{fr:["Coupez le tofu en cubes de 2 cm et laissez-les tremper 5 minutes dans de l'eau chaude salée.","Faites revenir le porc jusqu'à ce qu'il croustille, ajoutez doubanjiang et haricots noirs fermentés.","Ajoutez ail, gingembre et bouillon, puis glissez délicatement les cubes de tofu.","Laissez frémir 5 minutes sans remuer, en secouant simplement le wok.","Liez avec la fécule en trois fois, arrosez d'huile pimentée et poudrez de poivre de Sichuan moulu."],
     en:["Cut the tofu into 2 cm cubes and soak them 5 minutes in hot salted water.","Fry the pork until crisp, then add doubanjiang and fermented black beans.","Add garlic, ginger and broth, then slide the tofu cubes in gently.","Simmer 5 minutes without stirring, just shaking the wok.","Thicken with the cornflour slurry in three additions, drizzle chilli oil and dust with ground Sichuan pepper."]
     } },

{ id:'har-gow', c:'as', lat:23.129, lon:113.264, base:4, prep:60, cook:8, diff:3, tags:['sea','street','breakfast'],
  art:{v:'plate',bg:'#2a3540',plate:'#efe9dc',style:'roll',food:['#f2ece0','#e88a6a','#f8f4ea'],garnish:'#6fbf8f'},
  n:{fr:'Har gow et dim sum',en:'Har gow & dim sum'},
  p:{fr:'Canton, Chine',en:'Guangzhou, China'},
  d:{fr:"La reine des maisons de thé cantonaises : une crevette entière dans une pâte translucide qui doit compter treize plis exactement. Le yum cha se pratique le matin, entre paniers de bambou et théières remplies sans cesse.",
     en:"The queen of Cantonese tea houses: a whole prawn in a translucent wrapper that must have exactly thirteen pleats. Yum cha is a morning affair of bamboo baskets and endlessly refilled teapots."
     },
  i:[['wheat_starch',150,'g'],['tapioca_starch',50,'g'],['boiling_water',180,'ml'],['shrimp',400,'g'],['bamboo_shoots',60,'g'],['pork_fat',30,'g'],['sesame_oil',1,'tbsp'],['white_pepper',1,'pinch'],['sugar',1,'tsp'],['salt',null,'']],
  s:{fr:["Versez l'eau bouillante d'un coup sur les amidons et travaillez immédiatement en boule lisse.","Hachez grossièrement la moitié des crevettes, gardez les autres entières, mélangez au reste de la garniture.","Étalez de petits disques très fins à la lame d'un couperet huilé.","Garnissez et pliez en formant au moins dix plis serrés d'un seul côté.","Faites cuire 6 à 8 minutes à la vapeur vive dans un panier de bambou tapissé de papier."],
     en:["Pour the boiling water onto the starches all at once and work quickly into a smooth ball.","Roughly chop half the prawns, keep the rest whole and mix with the other filling ingredients.","Flatten very thin discs with an oiled cleaver blade.","Fill and fold with at least ten tight pleats along one side.","Steam 6 to 8 minutes over high heat in a lined bamboo basket."]
     } },

{ id:'kimchi-jjigae', c:'as', lat:37.567, lon:126.978, base:4, prep:15, cook:30, diff:1, tags:['spicy','soup','pork'],
  art:{v:'bowl',bg:'#3a2426',plate:'#e0d4c4',style:'soup',food:['#c2332a','#d94f2e','#f4f0e6','#e8b04b'],garnish:'#6fbf8f'},
  n:{fr:'Kimchi jjigae',en:'Kimchi jjigae'},
  p:{fr:'Séoul, Corée du Sud',en:'Seoul, South Korea'},
  d:{fr:"Le ragoût que l'on prépare quand le kimchi est devenu trop acide pour être mangé cru — et c'est précisément là qu'il donne le meilleur. Il arrive à table encore bouillonnant dans son pot de pierre.",
     en:"The stew you make when the kimchi has turned too sour to eat raw — which is exactly when it gives its best. It reaches the table still bubbling in its stone pot."
     },
  i:[['aged_kimchi',400,'g'],['pork_belly',300,'g'],['firm_tofu',300,'g'],['gochujang',1,'tbsp'],['gochugaru',1,'tbsp'],['garlic',3,'clove'],['spring_onion',3,'pc'],['anchovy_broth',700,'ml'],['sesame_oil',1,'tbsp'],['sugar',1,'tsp']],
  s:{fr:["Faites revenir la poitrine de porc en lamelles dans l'huile de sésame jusqu'à ce qu'elle rende sa graisse.","Ajoutez le kimchi coupé et son jus, faites-le sauter 5 minutes pour concentrer l'acidité.","Incorporez gochujang, gochugaru, ail et sucre, puis versez le bouillon.","Laissez bouillonner 20 minutes à découvert.","Ajoutez le tofu en tranches et la ciboule, prolongez 5 minutes et servez avec du riz blanc."],
     en:["Fry the sliced pork belly in sesame oil until the fat renders.","Add the cut kimchi and its juice and stir-fry 5 minutes to concentrate the sourness.","Stir in gochujang, gochugaru, garlic and sugar, then pour in the broth.","Let it boil uncovered for 20 minutes.","Add sliced tofu and spring onion, cook 5 more minutes and serve with white rice."]
     } },

{ id:'pad-thai', c:'as', lat:13.756, lon:100.502, base:4, prep:25, cook:10, diff:1, tags:['noodles','street','fry'],
  art:{v:'plate',bg:'#2f3a2a',plate:'#f2ece0',style:'noodle',food:['#e0a44a','#efc97a','#e0603f','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Pad thaï',en:'Pad thai'},
  p:{fr:'Bangkok, Thaïlande',en:'Bangkok, Thailand'},
  d:{fr:"Promu plat national dans les années 1930 pour réduire la consommation de riz, le pad thaï joue sur quatre saveurs : tamarin acide, sucre de palme, sauce de poisson salée, piment. Le wok doit être brûlant et le service immédiat.",
     en:"Promoted as a national dish in the 1930s to cut rice consumption, pad thai balances four tastes: sour tamarind, palm sugar, salty fish sauce and chilli. The wok must be scorching and the serving immediate."
     },
  i:[['rice_noodles',300,'g'],['shrimp',300,'g'],['firm_tofu',150,'g'],['egg',3,'pc'],['tamarind_paste',3,'tbsp'],['palm_sugar',3,'tbsp'],['fish_sauce',3,'tbsp'],['bean_sprouts',200,'g'],['garlic_chives',1,'bunch'],['peanuts',60,'g'],['dried_shrimp',2,'tbsp'],['lime',1,'pc'],['chili_flakes',1,'tsp']],
  s:{fr:["Trempez les nouilles 30 minutes dans l'eau tiède : elles doivent rester fermes.","Mélangez tamarin, sucre de palme et sauce de poisson jusqu'à dissolution complète.","Saisissez tofu, crevettes séchées et crevettes fraîches dans le wok très chaud.","Ajoutez les nouilles et la sauce, faites sauter 2 minutes, poussez sur le côté et brouillez les œufs.","Terminez avec germes de soja et ciboule chinoise, servez avec cacahuètes, piment et citron vert."],
     en:["Soak the noodles 30 minutes in warm water: they must stay firm.","Stir tamarind, palm sugar and fish sauce together until fully dissolved.","Sear tofu, dried shrimp and fresh prawns in a very hot wok.","Add noodles and sauce, toss 2 minutes, push aside and scramble the eggs.","Finish with bean sprouts and garlic chives; serve with peanuts, chilli and lime."]
     } },

{ id:'pho-bo', c:'as', lat:21.028, lon:105.854, base:4, prep:30, cook:240, diff:2, tags:['soup','noodles','beef'],
  art:{v:'bowl',bg:'#28323a',plate:'#f2ece0',style:'noodle',food:['#c9a978','#e8dcc0','#b8452c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Phở bò',en:'Phở bò'},
  p:{fr:'Hanoï, Viêt Nam',en:'Hanoi, Vietnam'},
  d:{fr:"Un bouillon limpide de queue et d'os de bœuf, parfumé aux épices grillées : badiane, cannelle, cardamome noire. À Hanoï, on le boit dès six heures du matin, accroupi sur un tabouret en plastique.",
     en:"A crystal-clear broth of oxtail and beef bones perfumed with charred spices: star anise, cinnamon, black cardamom. In Hanoi it is drunk from six in the morning, perched on a plastic stool."
     },
  i:[['beef_bones',2,'kg'],['oxtail',500,'g'],['beef_sirloin',300,'g'],['rice_noodles',400,'g'],['onion',2,'pc'],['ginger',80,'g'],['star_anise',5,'pc'],['cinnamon',1,'stick'],['black_cardamom',2,'pc'],['fish_sauce',3,'tbsp'],['cilantro',1,'bunch'],['thai_basil',1,'bunch'],['lime',2,'pc'],['bean_sprouts',150,'g']],
  s:{fr:["Blanchissez les os 10 minutes puis rincez-les soigneusement pour obtenir un bouillon clair.","Brûlez oignon et gingembre entiers à la flamme jusqu'à ce qu'ils noircissent.","Faites frémir os, oignon, gingembre et épices grillées 4 heures sans jamais bouillir, en écumant.","Assaisonnez à la sauce de poisson, filtrez le bouillon deux fois.","Ébouillantez les nouilles, disposez le bœuf cru en fines tranches et versez le bouillon brûlant dessus ; herbes à part."],
     en:["Blanch the bones for 10 minutes and rinse them well for a clear broth.","Char the whole onion and ginger over a flame until blackened.","Simmer bones, onion, ginger and toasted spices for 4 hours, skimming, never boiling.","Season with fish sauce and strain the broth twice.","Blanch the noodles, lay thin slices of raw beef on top and pour over the scalding broth; herbs on the side."]
     } },

{ id:'nasi-goreng', c:'as', lat:-6.208, lon:106.846, base:4, prep:20, cook:10, diff:1, tags:['rice','street','fry'],
  art:{v:'plate',bg:'#33301f',plate:'#f2ece0',style:'rice',food:['#b8792f','#d9a24a','#c2402c','#7fae5a'],garnish:'#6fbf8f'},
  n:{fr:'Nasi goreng',en:'Nasi goreng'},
  p:{fr:'Jakarta, Indonésie',en:'Jakarta, Indonesia'},
  d:{fr:"Né du refus de jeter le riz de la veille, ce riz sauté doit sa couleur ambrée au kecap manis, une sauce soja sirupeuse et sucrée. On le couronne d'un œuf au plat aux bords dentelés et de krupuk.",
     en:"Born from a refusal to waste yesterday's rice, this fried rice owes its amber colour to kecap manis, a thick sweet soy sauce. It is crowned with a lace-edged fried egg and prawn crackers."
     },
  i:[['cooked_rice',600,'g'],['chicken',250,'g'],['shrimp',150,'g'],['shallot',4,'pc'],['garlic',3,'clove'],['red_chili',3,'pc'],['shrimp_paste',1,'tsp'],['kecap_manis',3,'tbsp'],['egg',4,'pc'],['spring_onion',3,'pc'],['cucumber',1,'pc'],['frying_oil',3,'tbsp']],
  s:{fr:["Pilez échalotes, ail, piments et pâte de crevette en une pâte lisse.","Faites-la revenir dans l'huile chaude jusqu'à ce qu'elle embaume, environ 2 minutes.","Ajoutez poulet et crevettes, saisissez-les vivement.","Incorporez le riz froid en l'écrasant du dos de la spatule, puis le kecap manis.","Faites sauter à feu maximal 3 minutes et servez avec un œuf au plat et du concombre."],
     en:["Pound shallots, garlic, chillies and shrimp paste into a smooth paste.","Fry it in hot oil until fragrant, about 2 minutes.","Add the chicken and prawns and sear them quickly.","Fold in the cold rice, breaking it up with the back of the spatula, then the kecap manis.","Stir-fry over maximum heat for 3 minutes and serve with a fried egg and cucumber."]
     } }
];
