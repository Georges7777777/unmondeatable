/* ---------- Desserts & boissons du monde ---------- */
const D12 = [
{ id:'baklava', c:'as', lat:37.066, lon:37.383, base:16, prep:60, cook:40, diff:2, tags:['sweet','bake','festive'],
  art:{v:'plate',bg:'#2f2a1a',plate:'#e9dcc0',style:'pastry',food:['#d9a03a','#e8c96a','#8a5a2a'],garnish:'#7fae6a'},
  n:{fr:'Baklava',en:'Baklava'},
  p:{fr:'Gaziantep, Turquie',en:'Gaziantep, Türkiye'},
  d:{fr:"Quarante feuilles de pâte filo, chacune badigeonnée de beurre fondu, empilées sur une farce de pistaches concassées puis noyées d'un sirop encore chaud versé sur la pâtisserie froide, pour qu'elle reste croustillante.",
     en:"Forty sheets of filo, each brushed with melted butter, layered over crushed pistachios, then drenched in a hot syrup poured over the cold pastry, so it stays crisp."
     },
  i:[['filo_pastry',500,'g'],['pistachios',300,'g'],['butter',250,'g'],['sugar',350,'g'],['water',250,'ml'],['lemon',1,'pc'],['honey',2,'tbsp']],
  s:{fr:["Concassez grossièrement les pistaches au couteau, pas au mixeur, pour garder du croquant.","Beurrez un plat, empilez huit feuilles de filo en beurrant chacune, puis étalez la moitié des pistaches.","Répétez avec huit autres feuilles, le reste des pistaches, puis terminez par huit dernières feuilles beurrées.","Découpez en losanges avant cuisson et enfournez 35 minutes à 180 °C jusqu'à ce que le dessus soit doré.","Préparez un sirop de sucre, eau, citron et miel, et versez-le chaud sur le baklava froid ; laissez reposer 4 heures."],
     en:["Roughly chop the pistachios with a knife, not a blender, to keep some crunch.","Butter a dish, layer eight sheets of filo, buttering each, then spread half the pistachios.","Repeat with eight more sheets, the rest of the pistachios, then finish with eight last buttered sheets.","Cut into diamonds before baking and bake 35 minutes at 180°C until golden on top.","Make a syrup of sugar, water, lemon and honey, and pour it hot over the cold baklava; rest 4 hours."]
     } },

{ id:'mochi-daifuku', c:'as', lat:35.011, lon:135.768, base:12, prep:45, cook:10, diff:2, tags:['sweet','fresh'],
  art:{v:'plate',bg:'#2c2a34',plate:'#f2ece0',style:'cake',food:['#f2ece0','#e0a8c0','#c93b52'],garnish:'#6fbf8f'},
  n:{fr:'Mochi daifuku',en:'Daifuku mochi'},
  p:{fr:'Kyoto, Japon',en:'Kyoto, Japan'},
  d:{fr:"Une pâte de riz gluant, cuite à la vapeur puis pilée jusqu'à devenir élastique, enveloppant une boule de pâte de haricots rouges sucrée. Le geste se fait les mains humides de fécule, sans quoi tout colle.",
     en:"A glutinous rice dough, steamed then pounded until elastic, wrapped around a ball of sweetened red bean paste. The work is done with starch-dusted, damp hands, or everything sticks."
     },
  i:[['glutinous_rice_flour',250,'g'],['sugar',80,'g'],['water',300,'ml'],['red_bean_paste',300,'g'],['potato_starch',80,'g']],
  s:{fr:["Roulez la pâte de haricots rouges en douze petites boules et réservez-les au frais.","Mélangez farine de riz gluant, sucre et eau, cuisez 8 minutes à la vapeur en remuant à mi-cuisson.","Renversez la pâte cuite sur un plan fortement fariné de fécule, encore brûlante.","Divisez-la en douze parts avec des mains humides et fariné de fécule, sans jamais la laisser refroidir.","Aplatissez chaque part, enfermez une boule de pâte de haricots et refermez en pinçant pour souder."],
     en:["Roll the red bean paste into twelve small balls and chill.","Mix glutinous rice flour, sugar and water, steam 8 minutes, stirring halfway through.","Turn the cooked dough onto a surface heavily dusted with starch, while still scalding hot.","Divide into twelve pieces with damp, starch-dusted hands, never letting it cool.","Flatten each piece, enclose a ball of bean paste and pinch closed to seal."]
     } },

{ id:'schwarzwaelder-kirschtorte', c:'eu', lat:48.128, lon:8.234, base:10, prep:60, cook:30, diff:3, tags:['sweet','bake','festive'],
  art:{v:'plate',bg:'#2a2028',plate:'#f2ece0',style:'cake',food:['#4a2028','#f8f4ea','#c93b52'],garnish:'#6fbf8f'},
  n:{fr:'Forêt-Noire',en:'Black Forest cake'},
  p:{fr:'Triberg, Allemagne',en:'Triberg, Germany'},
  d:{fr:"Des disques de biscuit au chocolat imbibés de kirsch, montés avec une crème fouettée et des griottes, le tout recouvert de copeaux de chocolat noir. Le nom viendrait du costume traditionnel noir, blanc et rouge de la région.",
     en:"Layers of chocolate sponge soaked in kirsch, built up with whipped cream and morello cherries, all covered in dark chocolate shavings. The name is said to come from the region's black, white and red traditional dress."
     },
  i:[['flour',200,'g'],['dark_chocolate',150,'g'],['egg',6,'pc'],['sugar',200,'g'],['butter',100,'g'],['baking_powder',1,'tsp'],['morello_cherries',500,'g'],['kirsch',100,'ml'],['heavy_cream',600,'ml'],['powdered_sugar',3,'tbsp']],
  s:{fr:["Préparez une génoise au chocolat, cuisez-la puis laissez-la refroidir avant de la trancher en trois disques.","Faites compoter les griottes avec un peu de sucre, égouttez-les en réservant le jus.","Imbibez chaque disque du jus de cerise mélangé au kirsch.","Montez la crème avec le sucre glace, superposez disques, crème et griottes en couches.","Recouvrez entièrement de crème, décorez de copeaux de chocolat noir et de griottes entières."],
     en:["Bake a chocolate sponge, let it cool, then slice it into three discs.","Stew the morello cherries with a little sugar, drain them, keeping the juice.","Soak each disc with the cherry juice mixed with kirsch.","Whip the cream with icing sugar, layering discs, cream and cherries.","Cover entirely with cream, decorate with dark chocolate shavings and whole cherries."]
     } },

{ id:'sachertorte', c:'eu', lat:48.208, lon:16.373, base:10, prep:45, cook:50, diff:2, tags:['sweet','bake','festive'],
  art:{v:'plate',bg:'#2a2020',plate:'#f2ece0',style:'cake',food:['#3a2018','#6b3b20','#e8c96a'],garnish:'#6fbf8f'},
  n:{fr:'Sachertorte',en:'Sachertorte'},
  p:{fr:'Vienne, Autriche',en:'Vienna, Austria'},
  d:{fr:"Inventée en 1832 par un apprenti de seize ans pour un prince déçu de son dessert, cette génoise au chocolat, fendue et garnie de confiture d'abricot, se recouvre d'un glaçage si lisse qu'il doit refléter la lumière.",
     en:"Invented in 1832 by a sixteen-year-old apprentice for a prince disappointed with his dessert, this chocolate sponge is split, filled with apricot jam and coated in a glaze so smooth it must catch the light."
     },
  i:[['dark_chocolate',200,'g'],['butter',150,'g'],['sugar',150,'g'],['egg',6,'pc'],['flour',150,'g'],['apricot_jam',200,'g'],['powdered_sugar',200,'g'],['water',80,'ml']],
  s:{fr:["Faites fondre le chocolat, mélangez-le au beurre pommade et à la moitié du sucre.","Incorporez les jaunes un à un, puis la farine tamisée.","Montez les blancs avec le reste du sucre en neige ferme et incorporez-les délicatement.","Enfournez 45 minutes à 170 °C, laissez refroidir puis fendez le gâteau et garnissez de confiture d'abricot chaude, y compris sur le dessus.","Préparez un glaçage de sucre glace et d'eau chauffé avec du chocolat, versez-le d'un coup et lissez sans repasser dessus."],
     en:["Melt the chocolate, mix it with softened butter and half the sugar.","Add the yolks one by one, then the sifted flour.","Whip the whites with the rest of the sugar to stiff peaks and fold in gently.","Bake 45 minutes at 170°C, cool, then split the cake and coat with warm apricot jam, including the top.","Make a glaze of icing sugar and water heated with chocolate, pour it on in one go and smooth without going over it twice."]
     } },

{ id:'tres-leches', c:'na', lat:12.436, lon:-86.878, base:12, prep:30, cook:35, diff:1, tags:['sweet','bake','festive'],
  art:{v:'plate',bg:'#2c2820',plate:'#f2ece0',style:'cake',food:['#f8f4ea','#f0e8d8','#c93b52'],garnish:'#6fbf8f'},
  n:{fr:'Gâteau trois laits',en:'Tres leches cake'},
  p:{fr:'León, Nicaragua',en:'León, Nicaragua'},
  d:{fr:"Un biscuit volontairement sec et poreux, criblé de petits trous, pour absorber sans se déliter un mélange de lait entier, lait concentré et lait évaporé. Servi glacé, avec une meringue légère ou de la crème fouettée.",
     en:"A sponge deliberately dry and porous, pricked all over, so it soaks up a mix of whole milk, condensed milk and evaporated milk without falling apart. Served chilled, with a light meringue or whipped cream."
     },
  i:[['flour',200,'g'],['egg',5,'pc'],['sugar',150,'g'],['baking_powder',1,'tsp'],['whole_milk',250,'ml'],['condensed_milk',400,'g'],['evaporated_milk',350,'ml'],['heavy_cream',300,'ml'],['cinnamon',1,'tsp']],
  s:{fr:["Séparez blancs et jaunes, montez les blancs en neige ferme avec la moitié du sucre.","Incorporez les jaunes et le reste du sucre, puis la farine et la levure tamisées, en soulevant délicatement.","Enfournez 25 minutes à 180 °C dans un moule rectangulaire, laissez refroidir puis piquez toute la surface à la fourchette.","Mélangez les trois laits et versez-les lentement sur le gâteau froid, en plusieurs fois, jusqu'à absorption complète.","Réfrigérez 3 heures, couvrez de crème fouettée et saupoudrez de cannelle avant de servir."],
     en:["Separate the eggs, whip the whites to stiff peaks with half the sugar.","Fold in the yolks and remaining sugar, then the sifted flour and baking powder, lifting gently.","Bake 25 minutes at 180°C in a rectangular tin, cool, then prick the whole surface with a fork.","Mix the three milks and pour them slowly over the cold cake, in stages, until fully absorbed.","Chill 3 hours, cover with whipped cream and dust with cinnamon before serving."]
     } },

{ id:'gulab-jamun', c:'as', lat:27.176, lon:78.008, base:10, prep:30, cook:25, diff:2, tags:['sweet','fry','festive'],
  art:{v:'bowl',bg:'#2c2620',plate:'#f2ece0',style:'roll',food:['#8a5a2a','#a8703a','#e0a83a'],garnish:'#6fbf8f'},
  n:{fr:'Gulab jamun',en:'Gulab jamun'},
  p:{fr:'Agra, Inde',en:'Agra, India'},
  d:{fr:"De petites boules de lait en poudre frites lentement à feu doux jusqu'à un brun profond, puis noyées dans un sirop à la cardamome et à l'eau de rose. Elles doublent de volume en s'imbibant, sans jamais se déliter.",
     en:"Small balls of milk powder fried slowly over low heat to a deep brown, then submerged in a cardamom and rose water syrup. They double in size as they soak, without ever falling apart."
     },
  i:[['milk_powder',200,'g'],['flour',30,'g'],['baking_powder',1,'pinch'],['ghee',30,'g'],['whole_milk',60,'ml'],['sugar',400,'g'],['water',400,'ml'],['cardamom',6,'pc'],['rose_water',1,'tbsp'],['frying_oil',500,'ml']],
  s:{fr:["Mélangez lait en poudre, farine et levure, incorporez le ghee puis assez de lait pour former une pâte souple sans pétrir.","Roulez des boules bien lisses, sans aucune fissure, de la taille d'une noix.","Faites-les frire à feu doux et constant, en remuant l'huile, jusqu'à un brun uniforme et profond, 10 minutes.","Préparez un sirop de sucre, eau et cardamome, porté à peine à ébullition, parfumé d'eau de rose.","Plongez les boules chaudes dans le sirop tiède et laissez-les gonfler au moins 2 heures avant de servir."],
     en:["Mix milk powder, flour and baking powder, work in the ghee then enough milk to form a soft dough without kneading.","Roll perfectly smooth balls, with no cracks, about the size of a walnut.","Fry over steady low heat, swirling the oil, until an even deep brown, 10 minutes.","Make a syrup of sugar, water and cardamom, barely brought to the boil, scented with rose water.","Drop the hot balls into the warm syrup and let them swell for at least 2 hours before serving."]
     } },

{ id:'basbousa', c:'af', lat:31.200, lon:29.918, base:10, prep:20, cook:35, diff:1, tags:['sweet','bake'],
  art:{v:'plate',bg:'#2f2a1a',plate:'#e9dcc0',style:'cake',food:['#e0c07a','#f0dca8','#c9a24a'],garnish:'#7fae6a'},
  n:{fr:'Basboussa',en:'Basbousa'},
  p:{fr:'Alexandrie, Égypte',en:'Alexandria, Egypt'},
  d:{fr:"Un gâteau de semoule au yaourt, découpé en losanges avant même d'entrer au four, chaque pièce couronnée d'une amande. Le sirop froid versé sur le gâteau brûlant crée ce contraste humide et parfumé à la fleur d'oranger.",
     en:"A semolina and yoghurt cake, cut into diamonds before it even goes in the oven, each piece crowned with an almond. Cold syrup poured over the scalding cake creates its moist, orange-blossom-scented contrast."
     },
  i:[['semolina',300,'g'],['plain_yogurt',200,'g'],['sugar',150,'g'],['butter',100,'g'],['baking_powder',1,'tsp'],['almonds',30,'pc'],['water',300,'ml'],['orange_blossom_water',1,'tbsp'],['lemon',1,'pc']],
  s:{fr:["Mélangez semoule, yaourt, sucre, beurre fondu et levure en une pâte homogène.","Étalez dans un plat beurré, découpez immédiatement en losanges et posez une amande sur chacun.","Enfournez 30 minutes à 180 °C jusqu'à ce que le dessus soit doré.","Préparez un sirop de sucre, eau, citron et eau de fleur d'oranger, laissez-le refroidir complètement.","Versez le sirop froid sur le gâteau brûlant à la sortie du four, laissez-le absorber avant de servir."],
     en:["Mix semolina, yoghurt, sugar, melted butter and baking powder into a smooth batter.","Spread in a buttered dish, cut into diamonds immediately and place an almond on each.","Bake 30 minutes at 180°C until golden on top.","Make a syrup of sugar, water, lemon and orange blossom water, let it cool completely.","Pour the cold syrup over the cake straight from the oven, let it soak in before serving."]
     } },

{ id:'stroopwafel', c:'eu', lat:52.017, lon:4.708, base:14, prep:40, cook:20, diff:2, tags:['sweet','street','breakfast'],
  art:{v:'plate',bg:'#2f2a20',plate:'#e9dcc0',style:'flat',food:['#8a5a2a','#c9924a'],garnish:'#7fae6a'},
  n:{fr:'Stroopwafel',en:'Stroopwafel'},
  p:{fr:'Gouda, Pays-Bas',en:'Gouda, Netherlands'},
  d:{fr:"Deux fines gaufres cuites au fer, fendues encore chaudes et garnies d'un sirop de cassonade épais. On la pose sur une tasse de café bouillant pour que la vapeur ramollisse tout juste le sirop.",
     en:"Two thin waffles cooked in an iron, split while still hot and filled with a thick brown-sugar syrup. It is placed atop a cup of hot coffee so the steam just softens the syrup."
     },
  i:[['flour',300,'g'],['dry_yeast',7,'g'],['butter',200,'g'],['brown_sugar',250,'g'],['egg',1,'pc'],['whole_milk',60,'ml'],['cinnamon',1,'tsp'],['golden_syrup',150,'g']],
  s:{fr:["Pétrissez farine, levure, beurre fondu, œuf et lait en une pâte souple, laissez lever 1 heure.","Formez des boules et cuisez-les 2 minutes dans un gaufrier rond très chaud, sans motif profond.","Pendant qu'elles sont encore chaudes, fendez chaque gaufre en deux disques fins à l'aide d'un couteau.","Mélangez cassonade, beurre, sirop et cannelle chauffés jusqu'à une texture sirupeuse.","Tartinez un disque de sirop chaud et refermez aussitôt avec l'autre, en pressant les bords."],
     en:["Knead flour, yeast, melted butter, egg and milk into a supple dough, let rise 1 hour.","Shape balls and cook 2 minutes in a very hot round waffle iron with a shallow pattern.","While still hot, split each waffle into two thin discs with a knife.","Mix brown sugar, butter, syrup and cinnamon heated to a syrupy texture.","Spread one disc with hot syrup and close at once with the other, pressing the edges."]
     } },

{ id:'gaufres-liege', c:'eu', lat:50.633, lon:5.567, base:10, prep:90, cook:6, diff:2, tags:['sweet','street','breakfast'],
  art:{v:'board',bg:'#2f2a20',plate:'#e9dcc0',style:'flat',food:['#e0b45c','#f0dca8'],garnish:'#7fae6a'},
  n:{fr:'Gaufre de Liège',en:'Liège waffle'},
  p:{fr:'Liège, Belgique',en:'Liège, Belgium'},
  d:{fr:"Une pâte briochée, levée deux fois, dans laquelle on enfouit du sucre perlé qui ne fond pas mais caramélise en petites poches croustillantes au contact du fer brûlant. Elle se mange nature, à la main, dans la rue.",
     en:"A brioche-like dough, risen twice, into which pearl sugar is folded — it does not melt but caramelises into small crunchy pockets against the hot iron. Eaten plain, by hand, in the street."
     },
  i:[['flour',500,'g'],['dry_yeast',10,'g'],['egg',2,'pc'],['whole_milk',100,'ml'],['butter',250,'g'],['pearl_sugar',200,'g'],['vanilla',1,'pc'],['salt',1,'pinch']],
  s:{fr:["Pétrissez farine, levure, œufs, lait et sel en une pâte souple, laissez lever 1 heure.","Incorporez le beurre pommade petit à petit en pétrissant, jusqu'à ce qu'il soit absorbé.","Laissez lever une seconde fois 30 minutes, puis enfouissez le sucre perlé sans le faire fondre.","Formez des pâtons ovales et laissez-les reposer 15 minutes.","Cuisez 3 minutes par gaufre dans un fer bien chaud, jusqu'à ce que le sucre caramélise en surface."],
     en:["Knead flour, yeast, eggs, milk and salt into a supple dough, let rise 1 hour.","Work in the softened butter little by little while kneading, until absorbed.","Let it rise a second time for 30 minutes, then fold in the pearl sugar without melting it.","Shape oval portions and rest them for 15 minutes.","Cook 3 minutes per waffle in a very hot iron, until the sugar caramelises on the surface."]
     } },

{ id:'pastel-de-nata-macaense', c:'as', lat:22.187, lon:113.552, base:12, prep:50, cook:15, diff:3, tags:['sweet','bake','street'],
  art:{v:'board',bg:'#2c3340',plate:'#e9dcc0',style:'roll',food:['#e8c96a','#f2dc9a','#5a3520'],garnish:'#7fae6a'},
  n:{fr:'Tarte à l\'œuf macanaise',en:'Macanese egg tart'},
  p:{fr:'Macao, Chine',en:'Macau, China'},
  d:{fr:"Descendante directe du pastel de nata portugais, adaptée par un pâtissier britannique dans les années 1990 : le dessus n'est pas taché de noir mais brûlé par larges plaques au caramel, à la manière d'une crème brûlée.",
     en:"A direct descendant of the Portuguese pastel de nata, adapted by a British confectioner in the 1990s: the top is not spotted black but scorched in wide caramel patches, in the style of a crème brûlée."
     },
  i:[['puff_pastry',400,'g'],['heavy_cream',300,'ml'],['whole_milk',150,'ml'],['sugar',150,'g'],['egg_yolk',6,'pc'],['vanilla',1,'pc'],['condensed_milk',2,'tbsp']],
  s:{fr:["Roulez la pâte feuilletée en boudin serré, coupez des rondelles et étalez-les au pouce dans des moules.","Chauffez crème, lait et sucre sans bouillir, laissez tiédir.","Fouettez les jaunes avec le lait concentré, versez le mélange tiède dessus en filet et filtrez.","Remplissez les fonds de tarte aux trois quarts.","Enfournez 15 minutes à 250 °C jusqu'à ce que de larges plaques caramélisées apparaissent, presque brûlées."],
     en:["Roll the puff pastry into a tight log, cut discs and press them into moulds with your thumb.","Warm cream, milk and sugar without boiling, let cool slightly.","Whisk the yolks with the condensed milk, pour the warm mixture in a thin stream over it and strain.","Fill the pastry cases three-quarters full.","Bake 15 minutes at 250°C until wide caramelised patches appear, almost scorched."]
     } },

{ id:'sangria', c:'eu', lat:41.385, lon:2.174, base:8, prep:15, cook:0, diff:1, tags:['drink','fresh','festive'],
  art:{v:'glass',bg:'#2a2028',plate:'#3a2028',style:'drink',food:['#7a1f30','#e0a83a','#4f8f4a'],garnish:'#7fae6a'},
  n:{fr:'Sangria',en:'Sangria'},
  p:{fr:'Barcelone, Espagne',en:'Barcelona, Spain'},
  d:{fr:"Un vin rouge jeune où macèrent des fruits d'été depuis des heures, allongé au dernier moment d'un trait de soda pour lui garder ses bulles. La règle d'or : jamais de vin qu'on ne boirait pas seul.",
     en:"A young red wine in which summer fruit has macerated for hours, topped at the last moment with a splash of soda to keep its fizz. The golden rule: never use a wine you would not drink on its own."
     },
  i:[['red_wine',750,'ml'],['orange',2,'pc'],['lemon',1,'pc'],['apple',1,'pc'],['brandy',60,'ml'],['sugar',3,'tbsp'],['cinnamon',1,'stick'],['sparkling_water',200,'ml']],
  s:{fr:["Coupez oranges, citron et pomme en quartiers fins, sans les peler.","Mélangez-les au vin, au sucre, à la cannelle et au brandy dans un grand pichet.","Couvrez et laissez macérer au réfrigérateur au moins 4 heures, idéalement une nuit.","Retirez le bâton de cannelle et goûtez pour ajuster le sucre.","Ajoutez le soda et des glaçons juste avant de servir, pour préserver les bulles."],
     en:["Cut the oranges, lemon and apple into thin wedges, unpeeled.","Mix them with the wine, sugar, cinnamon and brandy in a large pitcher.","Cover and let macerate in the fridge at least 4 hours, ideally overnight.","Remove the cinnamon stick and taste to adjust the sugar.","Add the soda and ice just before serving, to keep the fizz."]
     } },

{ id:'caipirinha', c:'sa', lat:-23.222, lon:-44.713, base:1, prep:5, cook:0, diff:1, tags:['drink','fresh'],
  art:{v:'glass',bg:'#26332a',plate:'#26332a',style:'drink',food:['#f2ece0','#4f8f4a','#e8dcc0'],garnish:'#6fbf8f'},
  n:{fr:'Caipirinha',en:'Caipirinha'},
  p:{fr:'Paraty, Brésil',en:'Paraty, Brazil'},
  d:{fr:"Le citron vert entier, coupé en quartiers et pilé avec le sucre pour libérer les huiles amères de son écorce, seule vraie signature de cette eau-de-vie de canne. On la sert toujours pilée dans son propre verre, jamais filtrée.",
     en:"The whole lime, cut into wedges and muddled with sugar to release the bitter oils from its peel, is the one true signature of this sugarcane spirit. It is always served muddled in its own glass, never strained."
     },
  i:[['lime',1,'pc'],['sugar',2,'tbsp'],['cachaca',60,'ml'],['ice',null,'']],
  s:{fr:["Lavez le citron vert et coupez-le en huit quartiers, en ôtant les pointes blanches amères.","Déposez les quartiers et le sucre au fond du verre.","Pilez énergiquement au pilon pendant 30 secondes, jusqu'à ce que le sucre s'imprègne de jus et d'huiles essentielles.","Remplissez le verre de glace pilée.","Versez la cachaça et remuez longuement à la cuillère pour bien répartir le sucre."],
     en:["Wash the lime and cut it into eight wedges, removing the bitter white tips.","Put the wedges and sugar in the bottom of the glass.","Muddle vigorously for 30 seconds, until the sugar soaks up the juice and essential oils.","Fill the glass with crushed ice.","Pour in the cachaça and stir well with a spoon to distribute the sugar."]
     } },

{ id:'mojito', c:'na', lat:23.113, lon:-82.366, base:1, prep:8, cook:0, diff:1, tags:['drink','fresh'],
  art:{v:'glass',bg:'#26332a',plate:'#26332a',style:'drink',food:['#f2ece0','#4f8f4a','#e8dcc0'],garnish:'#6fbf8f'},
  n:{fr:'Mojito',en:'Mojito'},
  p:{fr:'La Havane, Cuba',en:'Havana, Cuba'},
  d:{fr:"La menthe se tape doucement entre les paumes plutôt qu'elle ne se pile, pour libérer son parfum sans en faire ressortir l'amertume verte. C'est la boisson que l'on prête, un peu vite, à un certain écrivain du Vieux-Havane.",
     en:"The mint is gently clapped between the palms rather than crushed, to release its scent without bringing out its green bitterness. It is the drink a little too readily attributed to a certain writer of Old Havana."
     },
  i:[['mint',12,'pc'],['lime',1,'pc'],['sugar',2,'tbsp'],['white_rum',60,'ml'],['sparkling_water',100,'ml'],['ice',null,'']],
  s:{fr:["Tapez les feuilles de menthe entre vos paumes pour les réveiller, sans les broyer.","Coupez le citron vert en quartiers, pilez-le légèrement avec le sucre au fond du verre.","Ajoutez la menthe et pilez à peine, juste pour l'écraser un peu.","Remplissez de glace pilée, versez le rhum blanc et remuez.","Complétez d'eau gazeuse, remuez une dernière fois et décorez d'un brin de menthe."],
     en:["Clap the mint leaves between your palms to wake them, without crushing them.","Cut the lime into wedges, muddle lightly with the sugar in the bottom of the glass.","Add the mint and muddle just a little, only enough to bruise it.","Fill with crushed ice, pour in the white rum and stir.","Top up with sparkling water, stir once more and garnish with a mint sprig."]
     } },

{ id:'horchata-mexicana', c:'na', lat:19.041, lon:-98.206, base:8, prep:600, cook:0, diff:1, tags:['drink','fresh','veg'],
  art:{v:'glass',bg:'#2c2820',plate:'#2c2820',style:'drink',food:['#f0e8d8','#e8dcc0','#c9a24a'],garnish:'#7fae6a'},
  n:{fr:'Horchata mexicaine',en:'Mexican horchata'},
  p:{fr:'Puebla, Mexique',en:'Puebla, Mexico'},
  d:{fr:"Du riz trempé toute une nuit puis mixé avec cannelle et vanille, filtré finement pour ne garder que le lait blanc et parfumé. Une boisson sans lactose ni alcool, vendue glacée dans de grandes jarres en verre.",
     en:"Rice soaked overnight then blended with cinnamon and vanilla, finely strained to keep only the white, fragrant milk. A dairy-free, alcohol-free drink, sold ice-cold from large glass jars."
     },
  i:[['rice',200,'g'],['water',1.2,'l'],['cinnamon',1,'stick'],['vanilla',1,'pc'],['sugar',100,'g'],['whole_milk',200,'ml']],
  s:{fr:["Faites tremper le riz avec le bâton de cannelle dans l'eau toute une nuit à température ambiante.","Mixez longuement riz, eau de trempage et vanille jusqu'à obtenir un liquide bien blanc.","Filtrez à travers une étamine fine, en pressant bien pour extraire tout le lait de riz.","Sucrez et allongez avec le lait, goûtez et ajustez la texture avec un peu d'eau.","Réfrigérez au moins 2 heures et servez très glacé, saupoudré de cannelle."],
     en:["Soak the rice with the cinnamon stick in the water overnight at room temperature.","Blend at length the rice, soaking water and vanilla until milky white.","Strain through a fine cloth, pressing well to extract all the rice milk.","Sweeten and lengthen with the milk, taste and adjust texture with a little water.","Chill at least 2 hours and serve ice-cold, dusted with cinnamon."]
     } },

{ id:'gluehwein', c:'eu', lat:49.453, lon:11.077, base:8, prep:10, cook:20, diff:1, tags:['drink','festive'],
  art:{v:'glass',bg:'#2a2028',plate:'#2a2028',style:'drink',food:['#5a1a24','#e0a83a','#8a3a20'],garnish:'#7fae6a'},
  n:{fr:'Vin chaud',en:'Glühwein'},
  p:{fr:'Nuremberg, Allemagne',en:'Nuremberg, Germany'},
  d:{fr:"Le vin rouge des marchés de Noël allemands, chauffé sans jamais bouillir avec cannelle, clous de girofle et zeste d'orange. Bouillir le vin en chasserait l'alcool, certes, mais aussi tout son parfum.",
     en:"The red wine of German Christmas markets, warmed but never boiled with cinnamon, cloves and orange zest. Boiling it would drive off the alcohol, true, but also every last bit of its aroma."
     },
  i:[['red_wine',750,'ml'],['orange',1,'pc'],['cinnamon',2,'stick'],['cloves',6,'pc'],['star_anise',2,'pc'],['sugar',80,'g']],
  s:{fr:["Prélevez le zeste de l'orange en larges rubans, sans le pith blanc amer.","Versez le vin dans une casserole avec zeste, cannelle, clous de girofle, badiane et sucre.","Chauffez très doucement 15 minutes, sans jamais laisser frémir ni bouillir.","Goûtez et ajustez le sucre selon le vin utilisé.","Filtrez les épices et servez brûlant dans des verres résistants à la chaleur, avec un bâton de cannelle."],
     en:["Peel the orange zest in wide ribbons, avoiding the bitter white pith.","Pour the wine into a pan with the zest, cinnamon, cloves, star anise and sugar.","Heat very gently for 15 minutes, never letting it simmer or boil.","Taste and adjust the sugar depending on the wine used.","Strain out the spices and serve piping hot in heatproof glasses, with a cinnamon stick."]
     } },

{ id:'chai-masala', c:'as', lat:19.076, lon:72.878, base:4, prep:10, cook:15, diff:1, tags:['drink','breakfast','spicy'],
  art:{v:'glass',bg:'#2c2620',plate:'#2c2620',style:'drink',food:['#8a5a34','#c9924a','#e8dcc0'],garnish:'#7fae6a'},
  n:{fr:'Chai masala',en:'Chai masala'},
  p:{fr:'Bombay, Inde',en:'Mumbai, India'},
  d:{fr:"Un thé noir bouilli avec gingembre, cardamome, cannelle et clou de girofle, puis fouetté avec le lait pour lui donner une mousse légère. Chaque famille indienne garde son propre équilibre d'épices, jalousement gardé.",
     en:"Black tea boiled with ginger, cardamom, cinnamon and clove, then whisked with milk to raise a light froth. Every Indian family keeps its own balance of spices, jealously guarded."
     },
  i:[['black_tea',2,'tbsp'],['water',400,'ml'],['whole_milk',400,'ml'],['ginger',20,'g'],['cardamom',6,'pc'],['cinnamon',1,'stick'],['cloves',4,'pc'],['black_peppercorns',4,'pc'],['sugar',3,'tbsp']],
  s:{fr:["Écrasez grossièrement gingembre, cardamome, cannelle, clous et poivre au pilon.","Portez l'eau à ébullition avec ces épices, laissez infuser fort 5 minutes à couvert.","Ajoutez le thé noir, laissez bouillir 2 minutes.","Versez le lait et le sucre, portez à nouveau à ébullition en surveillant qu'il ne déborde pas, trois fois de suite.","Filtrez en fouettant vivement pour faire mousser, et servez très chaud."],
     en:["Roughly crush ginger, cardamom, cinnamon, cloves and pepper in a mortar.","Bring the water to the boil with these spices, let it steep hard for 5 minutes, covered.","Add the black tea, boil for 2 minutes.","Pour in the milk and sugar, bring back to the boil three times, watching that it does not overflow.","Strain while whisking vigorously to raise a froth, and serve very hot."]
     } }
];
