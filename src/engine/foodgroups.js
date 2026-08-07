/* ============================================================
   foodgroups.js — à quelle famille appartient chaque ingrédient.

   Sert aux filtres : « sans viande », « sans porc », « plats de
   gibier »… Les bouillons et sauces d'origine animale figurent à
   part : ils ne font pas d'un plat un plat de poisson, mais ils
   empêchent de le dire végétarien.

   Fichier engendré par scripts/make-foodgroups.mjs — ne pas
   modifier à la main : corrigez plutôt les listes du script.
   ============================================================ */
const FOOD_GROUPS = {
  pork: ['alheira_sausage', 'andouille', 'andouille_sausage', 'andouillette', 'bacon', 'bayonne_ham', 'beef_trotters', 'chorizo', 'cooked_ham', 'farinheira', 'ground_pork', 'guanciale', 'ham', 'lard', 'lardons', 'marinated_pork', 'montbeliard_sausage', 'mortadella', 'nduja', 'pancetta', 'pig_caul', 'pinkel_sausage', 'pork_belly', 'pork_blood', 'pork_bones', 'pork_broth', 'pork_chitterlings', 'pork_chops', 'pork_crackling', 'pork_cracklings', 'pork_ear', 'pork_fat', 'pork_head', 'pork_kidney', 'pork_knuckle', 'pork_liver', 'pork_loin', 'pork_lung', 'pork_ribs', 'pork_rind', 'pork_rinds', 'pork_sausage', 'pork_shank', 'pork_shoulder', 'pork_skin', 'pork_snout', 'pork_stomach', 'pork_tail', 'pork_tongue', 'pork_trotters', 'prosciutto', 'salami', 'salt_pork', 'salted_pork', 'sausage_casings', 'serrano_ham', 'smoked_bacon', 'smoked_ham', 'smoked_pork_collar', 'smoked_pork_loin', 'smoked_pork_ribs', 'strasbourg_sausage', 'toulouse_sausage'],
  beef: ['beef_bones', 'beef_brisket', 'beef_chuck', 'beef_dripping', 'beef_heart', 'beef_kidney', 'beef_marrow', 'beef_ribeye', 'beef_ribs', 'beef_round', 'beef_rump', 'beef_shank', 'beef_shin', 'beef_short_ribs', 'beef_shoulder', 'beef_sirloin', 'beef_skirt', 'beef_slices', 'beef_steak', 'beef_suet', 'beef_tallow', 'beef_tbone', 'beef_tenderloin', 'beef_tendon', 'beef_tripe', 'bone_marrow', 'carne_seca', 'cecina', 'charque', 'corned_beef', 'dried_beef', 'ground_beef', 'ground_veal', 'marrow_bone', 'oxtail', 'salted_beef', 'sirloin_steak', 'tripe', 'veal', 'veal_chop', 'veal_escalope', 'veal_foot', 'veal_shank', 'veal_shoulder'],
  poultry: ['chicken', 'chicken_breast', 'chicken_gizzards', 'chicken_liver', 'chicken_thighs', 'chicken_wings', 'duck', 'duck_breast', 'duck_confit', 'duck_fat', 'duck_legs', 'foie_gras', 'ground_chicken', 'hen', 'smoked_chicken', 'turkey', 'turkey_breast', 'whole_duck'],
  lamb: ['goat_meat', 'goat_pepper', 'goat_stomach', 'ground_lamb', 'kazy_sausage', 'lamb', 'lamb_bones', 'lamb_fat', 'lamb_kidney', 'lamb_leg', 'lamb_liver', 'lamb_sausage', 'lamb_shoulder', 'mutton_shoulder', 'mutton_tallow', 'ram_testicles', 'sheep_blood', 'sheep_head', 'sheep_pluck', 'sheep_suet', 'wind_dried_mutton'],
  game: ['horse_meat', 'partridge', 'reindeer', 'reindeer_tongue', 'venison', 'whelks', 'wild_boar'],
  rabbit: ['rabbit'],
  fish: ['anchovies', 'anchovy_fillets', 'bonito_flakes', 'canned_salmon', 'canned_tuna', 'carp', 'catfish', 'cod', 'cod_fillet', 'dogfish', 'dried_fish', 'eel', 'fish_cake', 'flying_fish', 'greenland_shark', 'grouper', 'haddock_fillets', 'hilsa_fish', 'kingfish', 'lamprey', 'mackerel', 'monkfish', 'pickled_herring', 'pike', 'red_snapper', 'rockfish', 'salmon', 'salmon_roe', 'salt_cod', 'salted_anchovies', 'salted_herring', 'sardines', 'scabbard_fish', 'sea_bass', 'sea_bream', 'smoked_dried_tuna', 'smoked_fish', 'smoked_haddock', 'stockfish', 'tilapia', 'trout', 'tuna', 'white_fish', 'whitefish', 'whiting', 'whole_fish'],
  seafood: ['baby_squid', 'barnacles', 'clams', 'cockles', 'coconut_crab', 'conch', 'crab', 'crab_meat', 'crayfish', 'crayfish_powder', 'cuttlefish', 'dried_shrimp', 'king_crab_legs', 'langoustines', 'limpets', 'lobster', 'mussels', 'octopus', 'oysters', 'razor_clams', 'river_prawns', 'scallops', 'shrimp', 'small_shrimp', 'smoked_shrimp', 'snails', 'spot_prawns', 'squid', 'squid_ink', 'wedge_clams'],
  fish_trace: ['anchovy_broth', 'dashi_stock', 'fish_broth', 'fish_sauce', 'oyster_sauce', 'shrimp_paste', 'worcestershire'],
  meat_trace: ['beef_bones', 'beef_broth', 'beef_stock', 'chicken_broth', 'chicken_stock', 'gelatin', 'lamb_bones', 'lard', 'marshmallows', 'pig_caul', 'pork_bones'],
  alcohol: ['akvavit', 'armagnac', 'barolo_wine', 'beer', 'brandy', 'cachaca', 'calvados', 'dark_rum', 'dry_cider', 'dry_white_wine', 'irish_whiskey', 'kirsch', 'madeira_wine', 'marsala', 'mirin', 'ouzo', 'pastis', 'port_wine', 'prosecco', 'red_wine', 'rice_wine', 'rum', 'sherry', 'sparkling_wine', 'stout', 'stout_beer', 'vodka', 'whisky', 'white_rum', 'white_wine']
};
