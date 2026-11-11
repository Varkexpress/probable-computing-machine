// Content pack A: 28 general-knowledge prompts.
// Format: see shared/pack.js. Bands run from reflexive answers (1) to deep cuts (5).

export default [
  { id: 'africa-country', text: 'Name a country in Africa', cat: 'Geography', emoji: '🌍',
    a: `Egypt; Nigeria; South Africa; Kenya
      | Ethiopia; Morocco; Ghana; Algeria; Libya; Somalia; Sudan; Madagascar; Zimbabwe; Tanzania; Uganda; Rwanda
      | Tunisia; Senegal; Angola; Mozambique; Namibia; Botswana; Zambia; Cameroon; Mali; Ivory Coast=Côte d'Ivoire=Cote dIvoire;
        Democratic Republic of the Congo=DRC=DR Congo=Congo Kinshasa=Congo-Kinshasa=Democratic Republic of Congo;
        Republic of the Congo=Congo=Congo Brazzaville=Congo-Brazzaville=Republic of Congo;
        South Sudan; Niger; Liberia; Sierra Leone; Malawi; Chad
      | Eritrea; Djibouti; Gabon; Burkina Faso; Benin; Togo; Guinea; Gambia=The Gambia; Mauritania; Lesotho; Eswatini=Swaziland;
        Mauritius; Seychelles; Cape Verde=Cabo Verde; Central African Republic=CAR; Burundi; Equatorial Guinea
      | Guinea-Bissau; Comoros; São Tomé and Príncipe=Sao Tome=Sao Tome and Principe=São Tomé` },

  { id: 'us-state', text: 'Name a US state', cat: 'Geography', emoji: '🇺🇸',
    a: `California; Texas; New York; Florida
      | Washington=Washington State; Ohio; Alaska; Hawaii; Georgia; Illinois; Michigan; Arizona; Colorado; Nevada; Oregon;
        Pennsylvania; Massachusetts; New Jersey
      | Virginia; North Carolina; South Carolina; Tennessee; Kentucky; Louisiana; Alabama; Mississippi; Missouri; Minnesota;
        Wisconsin; Indiana; Iowa; Kansas; Oklahoma; Utah; Maine; Vermont; Connecticut; Maryland; Montana; New Mexico; Idaho; Arkansas
      | Nebraska; South Dakota; West Virginia; New Hampshire
      | Delaware; Rhode Island; North Dakota; Wyoming` },

  { id: 'element', text: 'Name a chemical element', cat: 'Science', emoji: '⚗️',
    a: `Hydrogen; Oxygen; Carbon; Gold; Iron; Helium
      | Nitrogen; Silver; Copper; Sodium; Calcium; Lead; Uranium; Neon; Aluminium=Aluminum; Zinc; Mercury; Chlorine; Potassium;
        Platinum; Lithium; Magnesium; Sulfur=Sulphur; Tin; Silicon; Plutonium
      | Phosphorus; Argon; Fluorine; Iodine; Nickel; Cobalt; Titanium; Tungsten=Wolfram; Chromium; Radium; Radon; Krypton; Xenon;
        Boron; Beryllium; Manganese; Arsenic; Bromine; Caesium=Cesium; Barium; Strontium; Palladium; Polonium; Cadmium; Bismuth
      | Germanium; Gallium; Antimony; Selenium; Rubidium; Francium; Vanadium; Scandium; Osmium; Iridium; Rhodium; Ruthenium;
        Tellurium; Indium; Thallium; Molybdenum; Zirconium; Niobium; Tantalum; Hafnium; Rhenium; Thorium; Actinium; Americium;
        Curium; Einsteinium; Fermium; Nobelium; Mendelevium; Californium; Berkelium; Neptunium; Promethium; Lanthanum; Cerium;
        Neodymium; Europium; Gadolinium; Yttrium; Astatine; Lawrencium; Rutherfordium; Seaborgium; Bohrium
      | Praseodymium; Samarium; Terbium; Dysprosium; Holmium; Erbium; Thulium; Ytterbium; Lutetium; Protactinium; Dubnium;
        Hassium; Meitnerium; Darmstadtium; Roentgenium; Copernicium; Nihonium; Flerovium; Moscovium; Livermorium; Tennessine;
        Oganesson; Technetium` },

  { id: 'bone', text: 'Name a bone in the human body', cat: 'Body', emoji: '🦴',
    a: `Femur=Thigh Bone=Thighbone; Skull=Cranium; Rib; Tibia=Shin Bone=Shinbone; Humerus
      | Fibula; Radius; Ulna; Patella=Kneecap=Knee Cap; Clavicle=Collarbone=Collar Bone; Scapula=Shoulder Blade;
        Sternum=Breastbone=Breast Bone; Mandible=Jawbone=Jaw Bone=Jaw; Vertebra=Vertebrae; Coccyx=Tailbone=Tail Bone;
        Hip Bone=Pelvis=Pelvic Bone=Coxal Bone=Innominate Bone=Os Coxae; Stapes=Stirrup
      | Incus=Anvil; Malleus=Hammer; Sacrum; Phalanx=Phalanges; Metacarpal; Metatarsal; Carpal=Carpal Bone; Tarsal=Tarsal Bone;
        Calcaneus=Heel Bone=Heelbone; Talus=Ankle Bone=Astragalus; Hyoid=Hyoid Bone; Maxilla; Atlas; Axis; Ilium; Ischium;
        Pubis=Pubic Bone; Zygomatic Bone=Zygomatic=Cheekbone=Cheek Bone=Malar Bone; Nasal Bone; Frontal Bone; Parietal Bone;
        Occipital Bone; Temporal Bone
      | Sphenoid=Sphenoid Bone; Ethmoid=Ethmoid Bone; Lacrimal Bone=Lacrimal; Palatine Bone=Palatine; Vomer;
        Inferior Nasal Concha=Inferior Turbinate; Scaphoid; Lunate; Triquetrum; Pisiform; Trapezium; Trapezoid; Capitate; Hamate;
        Navicular; Cuboid; Cuneiform=Medial Cuneiform; Cervical Vertebra=Cervical Vertebrae; Thoracic Vertebra=Thoracic Vertebrae;
        Lumbar Vertebra=Lumbar Vertebrae; Floating Rib
      | Fabella; Manubrium; Sesamoid=Sesamoid Bone; Wormian Bone=Sutural Bone; Intermediate Cuneiform; Lateral Cuneiform;
        Distal Phalanx; Proximal Phalanx; Middle Phalanx; Ossicle=Auditory Ossicle; False Rib; True Rib` },

  { id: 'dog-breed', text: 'Name a dog breed', cat: 'Animals', emoji: '🐕',
    a: `Labrador Retriever=Labrador=Lab; Golden Retriever; German Shepherd=Alsatian; Poodle; Bulldog=English Bulldog=British Bulldog; Chihuahua
      | Beagle; Pug; Dachshund=Sausage Dog=Wiener Dog; Rottweiler; Siberian Husky=Husky; Boxer; Dalmatian; Great Dane;
        Pit Bull=American Pit Bull Terrier=Pitbull; Shih Tzu; Yorkshire Terrier=Yorkie; Border Collie; Corgi=Pembroke Welsh Corgi;
        Doberman=Dobermann=Doberman Pinscher; French Bulldog=Frenchie; Collie=Rough Collie; Cocker Spaniel; Saint Bernard=St Bernard;
        Greyhound; Pomeranian
      | Jack Russell Terrier=Jack Russell; Bichon Frise; Maltese; Shiba Inu=Shiba; Akita; Samoyed; Alaskan Malamute=Malamute;
        Bernese Mountain Dog=Bernese; Newfoundland; Mastiff=English Mastiff; Bloodhound; Basset Hound; Cavalier King Charles Spaniel=Cavalier;
        Whippet; Schnauzer=Standard Schnauzer; Miniature Schnauzer; Australian Shepherd=Aussie; Weimaraner; Vizsla; Chow Chow;
        Shar Pei; Bull Terrier; Staffordshire Bull Terrier=Staffy=Staffie; Irish Setter; English Springer Spaniel=Springer Spaniel;
        Pointer=English Pointer; Labradoodle; Cockapoo; Goldendoodle; Afghan Hound; West Highland White Terrier=Westie;
        Scottish Terrier=Scottie; Boston Terrier; Lhasa Apso; Papillon; Miniature Pinscher=Min Pin; Shetland Sheepdog=Sheltie;
        Old English Sheepdog; Great Pyrenees=Pyrenean Mountain Dog; Rhodesian Ridgeback; Cane Corso; Bullmastiff; Irish Wolfhound;
        Basenji; Pekingese; Airedale Terrier=Airedale; Belgian Malinois=Malinois; Australian Cattle Dog=Blue Heeler=Heeler;
        German Shorthaired Pointer; Cardigan Welsh Corgi; Italian Greyhound
      | Saluki; Borzoi; Keeshond; Dandie Dinmont Terrier; Bedlington Terrier; Norfolk Terrier; Norwich Terrier; Cairn Terrier;
        Border Terrier; Kerry Blue Terrier; Soft-coated Wheaten Terrier=Wheaten Terrier; Fox Terrier=Wire Fox Terrier;
        Brittany=Brittany Spaniel; Chesapeake Bay Retriever; Flat-coated Retriever; Nova Scotia Duck Tolling Retriever=Toller;
        Gordon Setter; English Setter; Clumber Spaniel; Welsh Springer Spaniel; Chinese Crested; Havanese; Japanese Chin;
        Affenpinscher; Brussels Griffon; Coton de Tulear; Leonberger; Tibetan Mastiff; Neapolitan Mastiff;
        Dogue de Bordeaux=French Mastiff; Anatolian Shepherd; Kangal; Komondor; Puli; Kuvasz; Briard; Bouvier des Flandres;
        Australian Kelpie=Kelpie; Pharaoh Hound; Ibizan Hound; Xoloitzcuintli=Xolo=Mexican Hairless Dog; Black and Tan Coonhound;
        Bluetick Coonhound; Redbone Coonhound; Catahoula Leopard Dog=Catahoula; American Eskimo Dog; Alaskan Klee Kai;
        Norwegian Elkhound; Schipperke; Manchester Terrier; Rat Terrier; Parson Russell Terrier; Skye Terrier; Silky Terrier;
        Irish Terrier; Welsh Terrier; Giant Schnauzer; Portuguese Water Dog; Lagotto Romagnolo; Irish Water Spaniel;
        Bracco Italiano; Spinone Italiano; Foxhound=English Foxhound; Greater Swiss Mountain Dog; Tosa=Tosa Inu;
        Jindo=Korean Jindo; Czechoslovakian Wolfdog; Petit Basset Griffon Vendeen=PBGV; Tibetan Terrier; Tibetan Spaniel;
        American Staffordshire Terrier=AmStaff; Boykin Spaniel; Field Spaniel; Bolognese; Belgian Tervuren
      | Finnish Spitz; Lakeland Terrier; Sealyham Terrier; Australian Terrier; Glen of Imaal Terrier; Cesky Terrier;
        Curly-coated Retriever; Wirehaired Pointing Griffon; Otterhound; Harrier; American Foxhound; Beauceron; Bergamasco;
        Entlebucher Mountain Dog; Appenzeller Sennenhund; Shikoku; Kai Ken; Kishu Ken=Kishu; Thai Ridgeback; Azawakh; Sloughi;
        Chinook; Lowchen=Löwchen; Norwegian Lundehund=Lundehund; Peruvian Inca Orchid; Stabyhoun; Drentsche Patrijshond;
        Kooikerhondje=Nederlandse Kooikerhondje; Schapendoes; Saarloos Wolfdog; Basset Fauve de Bretagne;
        Grand Basset Griffon Vendeen; Mudi; Pumi; Hovawart; Eurasier; Pyrenean Shepherd; Polish Lowland Sheepdog;
        Spanish Water Dog; Sussex Spaniel; Plott Hound=Plott; Treeing Walker Coonhound; Mountain Cur; Rajapalayam; Kombai;
        Chippiparai; Bully Kutta; Estrela Mountain Dog; Cimarrón Uruguayo; Dogo Argentino; Fila Brasileiro;
        Presa Canario=Perro de Presa Canario; Caucasian Shepherd Dog=Caucasian Ovcharka; Central Asian Shepherd Dog=Alabai;
        Karelian Bear Dog; Swedish Vallhund; Icelandic Sheepdog; Norwegian Buhund; Finnish Lapphund; Russian Toy;
        Bavarian Mountain Hound; Sarplaninac; Karst Shepherd; Tornjak; Cirneco dell'Etna; Volpino Italiano;
        Maremma Sheepdog=Maremmano; Pyrenean Mastiff; Spanish Mastiff; Galgo Español=Spanish Greyhound; Portuguese Podengo;
        Barbet; Berger Picard=Picardy Sheepdog; Dutch Shepherd; Wetterhoun; Kromfohrländer; German Spitz; Japanese Spitz;
        Hokkaido=Ainu Dog; Yakutian Laika; West Siberian Laika; Canaan Dog; Boerboel; Aidi; Jagdterrier=German Hunting Terrier;
        Patterdale Terrier; Biewer Terrier; Russell Terrier; Danish-Swedish Farmdog; Small Munsterlander; Large Munsterlander;
        Pudelpointer; Cesky Fousek; Armenian Gampr=Gampr; Akbash` },

  { id: 'prog-lang', text: 'Name a programming language', cat: 'Tech', emoji: '💻',
    a: `Python; Java; JavaScript=JS; C; C Plus Plus=CPP=Cplusplus
      | C Sharp=CSharp; Ruby; PHP; Swift; Go=Golang; Rust; Kotlin; TypeScript; R; Perl; SQL; BASIC; Assembly=Assembly Language=ASM;
        MATLAB; Scratch
      | Fortran; COBOL; Pascal; Lisp=Common Lisp; Haskell; Scala; Lua; Dart; Objective-C=ObjC; Bash=Bourne Again Shell; Delphi;
        Ada; Prolog; Erlang; Elixir; Clojure; F Sharp=FSharp; Julia; Groovy; PowerShell; Smalltalk; Scheme; OCaml; Logo;
        Visual Basic=VB.NET=Visual Basic .NET; Racket; Solidity; Zig; ALGOL=Algol 60=Algol 68; Simula; APL; Forth; Elm; Nim;
        Crystal; D; Visual Basic for Applications=VBA; QBasic; Processing
      | Eiffel; Tcl; AWK; PL/I=PL1=PL One; Modula-2; Oberon; Rexx; ABAP; RPG; Apex; ActionScript; CoffeeScript; Hack;
        Idris; Agda; Coq=Rocq; Standard ML=SML; ML; Mercury; Io; Rebol; Red; Factor; J; K; Chapel; Vala; Haxe; Gleam; Mojo;
        Carbon; V=Vlang; Odin; Ballerina; Pony; Raku=Perl 6; LabVIEW; Wolfram Language=Mathematica; SAS; Lean; Clean; Miranda;
        PureScript; ReasonML=Reason; ReScript; Nix; Starlark; GDScript; AppleScript; HyperTalk; PostScript; Brainfuck;
        LOLCODE; Whitespace; INTERCAL; Befunge; Malbolge; Piet; Verilog; VHDL; Ladder Logic; AssemblyScript; Batch=Batch File;
        AutoHotkey; Self; Lingo; Pure Data; SuperCollider; ChucK; Csound; Sonic Pi; Turbo Pascal; Bourne Shell; Zsh
      | SNOBOL; Icon; Turing; BCPL; B; Plankalkül=Plankalkul; FLOW-MATIC=Flowmatic; Autocode; JOVIAL; MUMPS; CLU; Hope; Joy;
        Unlambda; Shakespeare Programming Language; Chef; Ook; Brain-Flak; GolfScript; CJam; Pyth; Jelly; Q Sharp=QSharp;
        Dylan; NewtonScript; Oz; Euphoria; Wren; Janet; Fennel; Hy; Koka; Hare; Jai; Beef; Vale; Roc; Unison; Grain; Futhark;
        Halide; GLSL; HLSL; ATS; Ceylon; Fantom; Gosu; Xtend; Nemerle; Boo; Genie; Seed7; Modula-3; Component Pascal; Mesa;
        SIMSCRIPT; GPSS; Sather; Occam; Limbo; Alef; Pike; LPC; Inform; TADS; COMAL; FOCAL; JOSS; Quorum; Hedy; Bosque;
        Datalog; Curry; Lambda Prolog; Twelf; Maude; Esterel; Lustre; SPARK; ALGOL W; Euler; PL/M; PL/SQL;
        Transact-SQL=T-SQL; Clipper; dBase; FoxPro=Visual FoxPro; PowerBuilder; Magik; Snap; Lobster; Carp; Inko; C3; Newspeak;
        Cobra; Fortress; Korn Shell; Tcsh` },

  { id: 'greek-god', text: 'Name a Greek god or goddess', cat: 'Myth', emoji: '⚡',
    a: `Zeus; Poseidon; Hades; Athena=Athene=Pallas Athena; Aphrodite; Apollo
      | Ares; Hera; Hermes; Artemis; Dionysus=Dionysos; Hephaestus=Hephaistos; Demeter; Hestia; Persephone=Kore; Eros; Nike;
        Kronos=Cronus=Cronos; Gaia=Gaea; Pan; Atlas; Prometheus; Helios; Uranus=Ouranos; Heracles=Herakles=Hercules
      | Hypnos; Thanatos; Nemesis; Tyche; Selene; Eos; Iris; Hebe; Rhea; Themis; Mnemosyne; Oceanus=Okeanos; Tethys; Hyperion;
        Theia; Iapetus; Phoebe; Nyx; Chaos; Erebus=Erebos; Tartarus; Eris; Asclepius=Asklepios; Morpheus; Triton;
        Hecate=Hekate; Nereus; Amphitrite; Epimetheus; Metis; Leto; Calliope; Clio=Kleio; Proteus; Boreas; Zephyrus=Zephyr;
        Aeolus; Harmonia; Chronos; Aether; Hemera; Pontus=Pontos
      | Coeus=Koios; Crius=Krios; Dione; Pallas; Perses; Astraeus; Menoetius; Clymene; Asteria; Euterpe; Erato; Melpomene;
        Polyhymnia; Terpsichore; Thalia; Urania; Clotho; Lachesis; Atropos; Aglaea=Aglaia; Euphrosyne; Eunomia; Dike;
        Eirene=Irene; Enyo; Deimos; Phobos; Ananke; Phanes; Notus; Eurus; Glaucus; Thetis; Styx; Eileithyia; Ganymede;
        Priapus; Hymenaeus=Hymen; Peitho; Plutus=Ploutos; Kratos=Cratos; Bia; Zelos; Pheme; Momus=Momos; Charon; Thaumas;
        Phorcys; Ceto; Doris; Galatea; Achelous; Aristaeus; Hesperus; Eosphorus=Phosphorus; Cybele; Leucothea; Palaemon;
        Iacchus; Zagreus; Despoina; Hygieia=Hygeia; Panacea; Anteros; Himeros; Pothos; Hermaphroditus
      | Eurynome; Ophion; Oizys; Moros; Apate; Philotes; Geras; Elpis; Kairos; Aion; Sophrosyne; Alastor; Ourea; Thalassa;
        Nesoi; Hydros; Phantasos; Phobetor=Icelus; Lyssa; Hybris; Eupheme; Soteria; Homonoia; Eucleia; Eusebeia; Hedone;
        Euthenia; Pandia; Ersa; Astraea; Aura; Nephele; Paean; Enyalius; Eurybia; Lelantos; Dysnomia; Ate; Horkos; Penia;
        Porus=Poros; Epione; Iaso; Aceso; Telesphorus; Comus=Komos; Benthesikyme; Rhode; Kymopoleia; Hedylogos; Palioxis;
        Eupraxia; Adikia; Algea; Amechania` },

  { id: 'fruit', text: 'Name a fruit', cat: 'Food', emoji: '🍓',
    a: `Apple; Banana; Orange; Strawberry; Grape
      | Pineapple; Watermelon; Mango; Pear; Peach; Cherry; Blueberry; Lemon; Kiwi=Kiwifruit=Kiwi Fruit; Raspberry; Lime; Plum;
        Coconut; Cantaloupe=Rockmelon; Grapefruit; Apricot; Pomegranate; Papaya; Avocado; Blackberry; Fig; Nectarine;
        Tangerine; Clementine; Honeydew=Honeydew Melon; Cranberry; Date; Melon
      | Passion Fruit=Passionfruit; Lychee=Litchi=Lichee; Dragon Fruit=Pitaya=Pitahaya; Guava; Kumquat; Persimmon; Gooseberry;
        Blackcurrant=Black Currant; Redcurrant=Red Currant; Elderberry; Mandarin; Satsuma; Quince; Starfruit=Carambola=Star Fruit;
        Jackfruit; Durian; Tomato; Mulberry; Boysenberry; Plantain; Asian Pear=Nashi=Nashi Pear; Blood Orange; Tangelo;
        Pomelo=Pummelo; Yuzu; Rambutan; Mangosteen; Longan; Loquat; Tamarind; Olive; Huckleberry; Cherimoya; Ackee=Akee;
        Breadfruit; Feijoa=Pineapple Guava; Goji Berry=Goji=Wolfberry; Acai=Açaí Berry; Sloe; Damson;
        Physalis=Cape Gooseberry=Golden Berry=Ground Cherry; Lingonberry; Cloudberry; Bilberry; Prickly Pear=Cactus Pear;
        Ugli Fruit=Ugli; Custard Apple; Soursop=Guanabana; Kiwano=Horned Melon
      | Loganberry; Medlar; Greengage; Sapodilla=Chikoo=Chiku; Sugar Apple=Sweetsop; Pawpaw; Salak=Snake Fruit; Jabuticaba;
        Marula; Miracle Fruit=Miracle Berry; Finger Lime; Buddha's Hand; Bergamot; Citron; Calamansi=Calamondin; Jujube;
        Pepino; Tamarillo=Tree Tomato; Naranjilla=Lulo; Cupuaçu; Langsat; Santol; Bael; Wood Apple; Lucuma; Mamey Sapote=Mamey;
        Black Sapote; White Sapote; Canistel=Egg Fruit=Eggfruit; Sea Buckthorn; Serviceberry=Juneberry=Saskatoon Berry;
        Aronia=Chokeberry; Chokecherry; Acerola=Barbados Cherry; Pitanga=Surinam Cherry; Lilly Pilly; Davidson's Plum;
        Quandong; Kakadu Plum; Muscadine; Haskap=Honeyberry; Wineberry; Dewberry; Marionberry; Tayberry; Jostaberry;
        White Currant; Atemoya; Cempedak; Rose Hip=Rosehip; Salmonberry; Thimbleberry; Date Plum
      | Abiu; Ilama; Rollinia=Biriba; Mammee Apple; Monstera Deliciosa; Grumichama; Jambolan=Java Plum; Rose Apple;
        Wax Apple=Wax Jambu; Gac; Mabolo=Velvet Apple; Duku; Marang; Kepel; Pulasan; Matoa; Ice Cream Bean; Jatoba; Bacuri;
        Buriti; Camu Camu; Pequi; Pitomba; Araza; Kei Apple; Monkey Orange; Baobab; Cornelian Cherry=Cornel; Hawthorn=Haw;
        Azarole; Strawberry Tree=Arbutus; Bignay; Ugni=Chilean Guava; Maqui Berry=Maqui; Calafate; Akebia;
        Hardy Kiwi=Kiwiberry; Yangmei=Chinese Bayberry; Wampee; Service Tree=Sorb; Safou; Cherry of the Rio Grande;
        Mangaba; Jenipapo; Murici; Elephant Apple; Indian Gooseberry=Amla; Phalsa; Karonda; Chironji` },

  { id: 'vegetable', text: 'Name a vegetable', cat: 'Food', emoji: '🥕',
    a: `Carrot; Broccoli; Potato; Lettuce; Pea; Spinach
      | Onion; Cabbage; Cauliflower; Cucumber; Celery; Corn=Sweetcorn=Sweet Corn=Maize; Green Bean=String Bean=French Bean;
        Tomato; Bell Pepper=Pepper=Capsicum=Sweet Pepper; Sweet Potato; Kale; Asparagus; Zucchini=Courgette;
        Eggplant=Aubergine=Brinjal; Brussels Sprout=Brussel Sprout; Mushroom; Garlic; Beet=Beetroot; Pumpkin; Radish; Squash;
        Leek; Turnip
      | Artichoke=Globe Artichoke; Parsnip; Okra=Lady's Finger=Ladies Finger; Bok Choy=Pak Choi=Pak Choy=Bok Choi;
        Swiss Chard=Chard=Silverbeet; Arugula=Rocket=Roquette; Watercress; Fennel; Kohlrabi; Rutabaga=Swede;
        Butternut Squash; Collard Greens=Collards; Endive; Radicchio; Shallot; Scallion=Spring Onion=Green Onion; Yam;
        Cassava=Yuca=Manioc; Taro; Jicama; Edamame; Snow Pea=Mangetout; Sugar Snap Pea=Snap Pea; Chickpea=Garbanzo Bean=Garbanzo;
        Lentil; Broad Bean=Fava Bean; Kidney Bean; Black Bean; Lima Bean=Butter Bean; Runner Bean; Celeriac=Celery Root;
        Horseradish; Bean Sprout; Chili Pepper=Chilli=Chili=Chile Pepper; Jalapeño; Romaine=Cos Lettuce=Romaine Lettuce;
        Iceberg Lettuce=Iceberg; Gherkin; Acorn Squash; Spaghetti Squash; Marrow; Cress; Mustard Greens; Turnip Greens;
        Dandelion Greens; Red Cabbage; Savoy Cabbage; Napa Cabbage=Chinese Cabbage; Daikon; Water Chestnut; Bamboo Shoot;
        Jerusalem Artichoke=Sunchoke
      | Salsify; Scorzonera=Black Salsify; Lotus Root; Burdock=Gobo; Romanesco; Broccolini=Tenderstem Broccoli;
        Broccoli Rabe=Rapini; Gai Lan=Chinese Broccoli=Kai Lan; Tatsoi; Mizuna; Komatsuna; Choy Sum; Celtuce; Samphire;
        Sea Kale; Fiddlehead=Fiddlehead Fern; Ramp=Wild Leek; Nettle; Purslane; Sorrel; Chicory; Frisée; Mâche=Lamb's Lettuce=Corn Salad;
        Bitter Melon=Bitter Gourd=Karela; Chayote=Choko=Mirliton; Bottle Gourd=Calabash=Lauki; Snake Gourd; Luffa=Ridge Gourd;
        Drumstick=Moringa; Tomatillo; Cardoon; Hearts of Palm=Palm Heart; Malanga; Oca; Yacon; Arrowroot;
        Parsley Root=Hamburg Parsley; Pea Shoot; Alfalfa Sprout; Cavolo Nero=Lacinato Kale=Tuscan Kale; Spring Greens;
        Amaranth Greens=Callaloo; Winged Bean; Yardlong Bean=Snake Bean; Pattypan Squash; Delicata Squash; Hubbard Squash;
        Kabocha; Water Spinach=Kangkong; Malabar Spinach
      | Skirret; Ulluco; Mashua; Mangelwurzel=Mangold; Good King Henry; Orache; New Zealand Spinach; Ice Plant; Sea Beet;
        Chinese Artichoke=Crosne; Cucamelon; Tiger Nut=Chufa; Rampion; Sea Purslane; Agretti=Saltwort; Puntarelle; Konjac;
        Banana Flower=Banana Blossom; Ash Gourd=Winter Melon; Ivy Gourd=Tindora; Pointed Gourd=Parwal; Tinda;
        Elephant Foot Yam; Water Caltrop; Chinese Yam=Nagaimo; Sweet Potato Leaves; Cassava Leaves;
        Ensete; Jute Mallow=Molokhia; Fat Hen; Hosta Shoots; Japanese Knotweed; Udo; Myoga; Fuki` },

  { id: 'instrument', text: 'Name a musical instrument', cat: 'Music', emoji: '🎺',
    a: `Piano=Grand Piano; Guitar=Acoustic Guitar=Electric Guitar; Drums=Drum=Drum Kit=Drum Set; Violin=Fiddle; Trumpet; Flute
      | Saxophone=Sax; Cello=Violoncello; Clarinet; Bass Guitar=Bass=Electric Bass; Harp; Trombone; Ukulele=Uke; Tuba; Keyboard;
        Harmonica=Mouth Organ; Banjo; Xylophone; Tambourine; Recorder; Oboe; Organ=Pipe Organ; Accordion; French Horn=Horn;
        Viola; Double Bass=Upright Bass=Contrabass; Triangle; Bagpipes=Bagpipe; Cymbal=Cymbals; Synthesizer=Synth; Bongos=Bongo
      | Bassoon; Mandolin; Piccolo; Harpsichord; Glockenspiel; Marimba; Vibraphone=Vibes; Timpani=Kettle Drum=Kettledrum;
        Snare Drum=Snare; Bass Drum; Conga=Congas; Castanets=Castanet; Maracas=Maraca; Cowbell; Sitar; Lute; Kazoo;
        Didgeridoo; Bugle; Cornet; Euphonium; Sousaphone; Steelpan=Steel Drum=Steel Pan; Cajón; Djembe; Tabla; Bodhrán; Lyre;
        Zither; Dulcimer; Pan Flute=Panpipes=Pan Pipes; Ocarina; Tin Whistle=Penny Whistle; Celesta; Theremin; Washboard; Gong;
        Handbell=Hand Bell; Melodica; Cor Anglais=English Horn; Contrabassoon=Double Bassoon; Bass Clarinet; Flugelhorn; Koto;
        Shamisen; Erhu; Balalaika; Bouzouki; Kalimba=Thumb Piano; Mbira; Harmonium; Hurdy-Gurdy; Jaw Harp=Jew's Harp=Mouth Harp;
        Autoharp; Keytar; Tubular Bells=Chimes; Woodblock=Wood Block; Clavichord; Oud; Shakuhachi; Taiko; Spoons; Fife;
        Concertina; Bandoneon; Uilleann Pipes
      | Mellophone; Baritone Horn; Pipa; Guzheng; Kora; Sarod; Santoor=Santur; Veena=Vina; Tanpura=Tambura; Shehnai; Bandura;
        Gusli; Kantele; Nyckelharpa; Hardanger Fiddle; Duduk; Zurna; Ney; Darbuka=Doumbek=Goblet Drum; Riq; Daf; Saz=Baglama;
        Qanun=Kanun; Angklung; Kulintang; Handpan=Hang=Hang Drum; Pedal Steel Guitar=Pedal Steel=Steel Guitar;
        Dobro=Resonator Guitar; Lap Steel Guitar=Lap Steel; Washtub Bass; Spinet; Virginal; Fortepiano;
        Glass Harmonica=Glass Armonica; Ondes Martenot; Mellotron; Hammond Organ; Sackbut; Shawm; Crumhorn; Serpent; Cornett;
        Rebec; Viola da Gamba=Viol; Theorbo; Cittern; Psaltery; Ophicleide; Sheng; Dizi; Suona; Guqin; Yangqin;
        Morin Khuur=Horsehead Fiddle; Dombra; Kamancheh; Tar; Setar; Rubab; Sarangi; Mridangam; Dhol; Dholak; Ghatam; Bansuri;
        Berimbau; Cuíca; Pandeiro; Agogô; Surdo; Güiro; Claves; Timbales; Cabasa; Shekere; Talking Drum; Balafon; Ngoni; Udu;
        Bullroarer; Vuvuzela; Alphorn=Alpenhorn; Stylophone; Otamatone; Musical Saw=Singing Saw; Flexatone; Vibraslap;
        Waterphone; Charango; Cuatro; Hulusi; Biwa; Hichiriki; Sanshin; Gayageum=Kayagum; Haegeum; Janggu; Cimbalom; Gemshorn
      | Aulos; Kithara; Hydraulis; Crwth; Komuz; Dutar; Esraj; Dilruba; Kanjira; Nadaswaram; Thunder Sheet; Ratchet;
        Slapstick=Whip; Lithophone; Tromba Marina; Serinette; Baryton; Arpeggione; Heckelphone; Sarrusophone; Octobass;
        Wagner Tuba; Helicon; Saxhorn; Valiha; Inanga; Adungu; Akonting; Xalam; Gimbri=Sintir=Guembri; Imzad; Krar; Begena;
        Masenqo; Washint; Mvet; Chapman Stick; Laser Harp; Eigenharp; Tabor; Nakers; Rackett; Dulcian; Vielle; Gittern;
        Citole; Orpharion; Bandora; Chitarrone; Archlute; Tingsha; Singing Bowl; Dungchen; Dranyen; Lusheng; Bawu; Xiao;
        Ruan; Sanxian; Gaohu; Banhu; Jinghu; Bianzhong; Muyu; Tsuzumi; Ryuteki; Nohkan; Hyoshigi; Txalaparta; Zampogna;
        Launeddas; Bombarde; Biniou; Fujara; Tárogató; Tilinca; Cobza; Kaval; Gadulka; Lyra; Laouto; Northumbrian Smallpipes; Gaida` },

  { id: 'shakespeare', text: 'Name a Shakespeare play', cat: 'Literature', emoji: '🎭',
    a: `Romeo and Juliet; Hamlet; Macbeth; Othello
      | King Lear=Lear; A Midsummer Night's Dream=Midsummer=Midsummer Nights Dream; Julius Caesar; The Tempest;
        Much Ado About Nothing=Much Ado; Twelfth Night; The Merchant of Venice; The Taming of the Shrew; As You Like It
      | Richard III=Richard the Third; Henry V=Henry the Fifth; Antony and Cleopatra; The Winter's Tale;
        The Comedy of Errors; Measure for Measure; The Merry Wives of Windsor=Merry Wives; Titus Andronicus; Coriolanus;
        Love's Labour's Lost=Love's Labor's Lost; Richard II=Richard the Second; All's Well That Ends Well=All's Well
      | Henry IV Part 1=Henry IV=1 Henry IV=Henry IV Part One=Henry the Fourth Part One; Henry VIII=Henry the Eighth=All Is True;
        King John; Troilus and Cressida; Timon of Athens; Cymbeline; Pericles=Pericles Prince of Tyre;
        The Two Gentlemen of Verona=Two Gentlemen
      | Henry IV Part 2=2 Henry IV=Henry IV Part Two=Henry the Fourth Part Two; Henry VI Part 1=Henry VI=1 Henry VI=Henry VI Part One;
        Henry VI Part 2=2 Henry VI=Henry VI Part Two; Henry VI Part 3=3 Henry VI=Henry VI Part Three; The Two Noble Kinsmen;
        Edward III=Edward the Third` },

  { id: 'euro-capital', text: 'Name a European capital city', cat: 'Geography', emoji: '🏛️',
    a: `London; Paris; Berlin; Rome; Madrid
      | Lisbon; Dublin; Amsterdam; Brussels; Vienna; Athens; Moscow; Stockholm; Oslo; Copenhagen; Prague; Warsaw; Budapest;
        Helsinki; Kyiv=Kiev; Reykjavik; Edinburgh
      | Bern=Berne; Bratislava; Bucharest; Sofia; Belgrade; Zagreb; Ljubljana; Sarajevo; Tallinn; Riga; Vilnius; Minsk;
        Luxembourg=Luxembourg City; Monaco; Vatican City=Vatican; Cardiff; Belfast; Ankara; Nicosia; Tirana; Valletta
      | Andorra la Vella; Vaduz; San Marino=City of San Marino; Skopje; Podgorica; Chisinau=Kishinev; Pristina=Prishtina;
        Tbilisi; Yerevan; Baku
      | Astana=Nur-Sultan; Douglas; Saint Helier=St Helier; Saint Peter Port=St Peter Port; Tórshavn; Mariehamn` },

  { id: 'constellation', text: 'Name a constellation', cat: 'Space', emoji: '✨',
    a: `Orion; Ursa Major=Great Bear=Big Bear; Ursa Minor=Little Bear=Lesser Bear; Cassiopeia
      | Leo=Lion; Scorpius=Scorpio=Scorpion; Gemini=Twins; Taurus=Bull; Aries=Ram; Virgo=Virgin=Maiden; Libra=Scales;
        Sagittarius=Archer; Capricornus=Capricorn=Sea Goat; Aquarius=Water Bearer; Pisces=Fishes=Fish; Cancer=Crab;
        Draco=Dragon; Pegasus; Andromeda; Perseus; Cygnus=Swan=Northern Cross; Hercules
      | Crux=Southern Cross; Lyra=Lyre=Harp; Aquila=Eagle; Canis Major=Great Dog=Greater Dog; Canis Minor=Little Dog=Lesser Dog;
        Centaurus=Centaur; Ophiuchus=Serpent Bearer; Phoenix; Hydra=Water Snake; Cepheus; Boötes=Herdsman;
        Auriga=Charioteer; Lupus=Wolf; Lepus=Hare; Corona Borealis=Northern Crown; Delphinus=Dolphin; Monoceros=Unicorn;
        Serpens=Serpent; Corvus=Crow; Lynx; Cetus=Whale=Sea Monster; Eridanus=River
      | Carina=Keel; Vela=Sails; Puppis=Stern=Poop Deck; Columba=Dove; Lacerta=Lizard; Vulpecula=Fox=Little Fox;
        Sagitta=Arrow; Triangulum=Triangle; Leo Minor=Little Lion=Lesser Lion; Coma Berenices=Berenice's Hair;
        Canes Venatici=Hunting Dogs; Corona Australis=Southern Crown; Piscis Austrinus=Southern Fish; Grus=Crane;
        Pavo=Peacock; Tucana=Toucan; Camelopardalis=Giraffe; Scutum=Shield; Crater=Cup; Equuleus=Little Horse=Foal;
        Sextans=Sextant; Telescopium=Telescope; Microscopium=Microscope; Dorado; Triangulum Australe=Southern Triangle;
        Indus=Indian; Musca=Fly; Volans=Flying Fish; Chamaeleon=Chameleon
      | Antlia=Air Pump; Apus=Bird of Paradise; Ara=Altar; Caelum=Chisel; Circinus=Pair of Compasses; Fornax=Furnace;
        Horologium=Pendulum Clock=Clock; Hydrus=Lesser Water Snake=Male Water Snake; Mensa=Table Mountain;
        Norma=Carpenter's Square; Octans=Octant; Pictor=Painter's Easel=Easel; Pyxis=Mariner's Compass; Reticulum=Reticle=Net;
        Sculptor` },

  { id: 'cheese', text: 'Name a cheese', cat: 'Food', emoji: '🧀',
    a: `Cheddar; Mozzarella; Brie; Parmesan=Parmigiano Reggiano=Parmigiano; Gouda; Feta
      | Camembert; Swiss Cheese=Swiss; Blue Cheese=Blue; Gorgonzola; Stilton; Roquefort; Ricotta; Cream Cheese; Cottage Cheese;
        Provolone; Monterey Jack=Jack; Colby; American Cheese=American; Emmental=Emmentaler=Emmenthal; Gruyère; Halloumi=Hellim;
        Edam; Manchego; Mascarpone; Pecorino=Pecorino Romano=Romano; Goat Cheese=Chèvre=Goat's Cheese; String Cheese; Paneer;
        Havarti; Muenster
      | Wensleydale; Red Leicester=Leicester; Double Gloucester; Lancashire; Cheshire; Caerphilly; Burrata; Fontina; Asiago;
        Taleggio; Grana Padano; Raclette; Comté; Jarlsberg; Boursin; Port Salut; Reblochon; Neufchâtel; Limburger; Danish Blue;
        Cambozola; Colby Jack; Pepper Jack; Queso Fresco; Cotija; Oaxaca=Quesillo; Queso Blanco; Bocconcini; Stracciatella;
        Scamorza; Leerdammer; Maasdam; Munster; Quark; Labneh; Mimolette; Shropshire Blue; Stinking Bishop; Cornish Yarg=Yarg;
        Bleu d'Auvergne; Saint Agur; Tilsit=Tilsiter; Appenzeller; Caciocavallo; Kashkaval
      | Pont-l'Évêque; Fourme d'Ambert; Époisses; Morbier; Beaufort; Saint-Nectaire; Tomme de Savoie; Valençay;
        Crottin de Chavignol; Sainte-Maure de Touraine=Sainte-Maure; Banon; Vacherin Mont d'Or=Mont d'Or; Brillat-Savarin;
        Chaource; Langres; Maroilles; Ossau-Iraty; Cantal; Salers; Laguiole; Abondance; Fiore Sardo; Montasio; Castelmagno;
        Robiola; Stracchino=Crescenza; Casu Marzu; Ragusano; Piave; Brunost=Gjetost=Brown Cheese; Västerbotten; Herrgård;
        Prästost; Esrom; Danbo; Leyden; Cabrales; Idiazabal; Mahón; Tetilla; Torta del Casar; Zamorano; Roncal;
        Serra da Estrela; Kefalotyri; Kasseri; Graviera; Mizithra; Manouri; Sirene; Bryndza; Oscypek; Tulum; Beyaz Peynir;
        Akkawi=Ackawi; Nabulsi; Requeijão; Queso Chihuahua; Queso Panela=Panela; Queso Añejo; Teleme; Dry Jack; Brick Cheese;
        Humboldt Fog; Single Gloucester; Derby; Sage Derby; Dunlop; Lanark Blue; Cashel Blue; Gubbeen; Durrus; Coolea;
        Explorateur; Saint André; Délice de Bourgogne; Livarot; Sbrinz; Tête de Moine
      | Gamalost; Anthotyros; Liptauer; Tvorog; Sulguni=Suluguni; Chhena; Kalari; Chhurpi; Byaslag; Rushan; Rubing;
        Queso de Bola; Kesong Puti; Dangke; Jameed; Caboc; Liederkranz; Pinconning; Vacherin Fribourgeois; Formaggio di Fossa;
        Bitto; Puzzone di Moena; Bettelmatt; Murazzano; Bra; Graukäse; Bergkäse; Handkäse; Harzer; Olomoucké Tvarůžky;
        Korbáčik; Parenica; Trappista; Telemea; Urdă; Anari; Lighvan; Majdouleh; Shanklish; Chechil; Imeruli; Bandel;
        Kalimpong Cheese; Pélardon; Rocamadour; Selles-sur-Cher; Pouligny-Saint-Pierre; Bleu de Gex;
        Mont des Cats; Saint-Marcellin; Cancoillotte; Gaperon; Coulommiers` },

  { id: 'pasta', text: 'Name a pasta shape', cat: 'Food', emoji: '🍝',
    a: `Spaghetti; Penne; Macaroni=Elbow Macaroni=Elbows; Fusilli; Lasagna=Lasagne
      | Linguine=Linguini; Fettuccine=Fettuccini=Fettucine; Rigatoni; Ravioli; Tortellini; Farfalle=Bow Tie=Bowtie;
        Orzo=Risoni; Tagliatelle; Gnocchi; Cannelloni; Conchiglie=Shells=Pasta Shells; Angel Hair=Capellini; Vermicelli;
        Rotini=Spirals
      | Pappardelle; Orecchiette; Ziti; Cavatappi; Bucatini; Ditalini; Tortelloni; Manicotti; Gemelli; Radiatori;
        Campanelle=Gigli; Paccheri; Stelline; Acini di Pepe; Anelli; Cavatelli; Trofie; Mafaldine=Mafalde=Mafalda=Reginette;
        Fideo=Fideos; Tortiglioni; Casarecce; Agnolotti; Cappelletti; Strozzapreti; Pici; Rotelle=Wagon Wheels=Ruote;
        Lumaconi; Mezze Maniche; Spaghettini; Bigoli; Garganelli; Alphabet Pasta=Alfabeto; Conchiglioni=Jumbo Shells; Pastina;
        Ditali; Tubetti; Sedani; Mostaccioli; Fregola=Fregula; Tagliolini=Taglierini
      | Calamarata; Candele; Malloreddus; Corzetti=Croxetti; Sagne; Testaroli; Busiate; Lagane; Maltagliati; Quadrucci;
        Zitoni; Perciatelli; Fedelini; Bavette; Trenette; Tajarin; Spaghetti alla Chitarra=Chitarra; Strangozzi=Stringozzi;
        Umbricelli; Pizzoccheri; Scialatielli; Farfalline; Conchigliette; Lumache; Creste di Gallo; Fusilli Bucati; Gramigna;
        Capunti; Anolini; Tortelli; Mezzelune; Sacchetti=Sacchettini; Fagottini; Caramelle; Culurgiones; Casoncelli;
        Pansotti; Marubini; Stelle; Trottole; Torchio; Riccioli; Mezzi Rigatoni; Cappellacci; Passatelli
      | Lorighittas; Cencioni; Fazzoletti; Lanterne; Fiori; Gnocchetti Sardi; Strascinati; Cecatelli; Ciriole; Lombrichelli;
        Pinci; Pisarei; Tripoline; Cjarsons; Agnolotti del Plin=Plin; Scarpinocc; Balanzoni; Mandilli di Seta; Stracci;
        Sorprese; Cuoretti; Foglie d'Ulivo; Midolline; Tempestine; Grattini; Quadretti; Filini; Corallini; Puntine;
        Ditaloni; Cannolicchi; Tufoli; Rigatoncini; Pennoni; Fusilloni; Elicoidali; Chifferi; Lumachine` },

  { id: 'cat-breed', text: 'Name a cat breed', cat: 'Animals', emoji: '🐈',
    a: `Siamese; Persian; Maine Coon; Sphynx=Sphinx; Bengal
      | Ragdoll; British Shorthair; Scottish Fold; Russian Blue; Abyssinian; Burmese; Himalayan=Colorpoint Persian;
        Norwegian Forest Cat=Norwegian Forest=Wegie; Siberian; Exotic Shorthair; American Shorthair; Savannah; Manx;
        Birman=Sacred Cat of Burma
      | Devon Rex; Cornish Rex; Selkirk Rex; LaPerm; Turkish Angora=Angora; Turkish Van; Egyptian Mau; Ocicat; Tonkinese;
        Balinese; Oriental Shorthair=Oriental; Bombay; Chartreux; Korat; Somali; Japanese Bobtail; American Curl; Munchkin;
        Singapura; Snowshoe; Havana Brown=Havana; Ragamuffin; Toyger; Pixie-bob; Burmilla; Nebelung; Peterbald;
        Lykoi=Werewolf Cat; Bambino; Chausie; Khao Manee
      | Donskoy=Don Sphynx; Kurilian Bobtail; American Bobtail; Highlander; Minskin; Sokoke=Sokoke Forest Cat; Serengeti; Cymric=Longhaired Manx;
        Colorpoint Shorthair; Javanese; Oriental Longhair; British Longhair; Scottish Straight; Australian Mist; Tiffanie;
        Thai; Ukrainian Levkoy; Cheetoh; European Shorthair=Celtic Shorthair; German Rex; Mekong Bobtail; Napoleon=Minuet;
        Neva Masquerade; Dragon Li=Chinese Li Hua=Li Hua; Exotic Longhair; Asian Semi-longhair; American Wirehair;
        European Burmese; Chantilly-Tiffany=Chantilly; York Chocolate; Ojos Azules; Asian; Seychellois; Arabian Mau; Aegean;
        Brazilian Shorthair; California Spangled; Cyprus Cat=Cyprus; Aphrodite Giant=Aphrodite; Highland Fold
      | Kinkalow; Toybob; Suphalak; Kanaani; Thai Lilac; Skookum; Lambkin; Genetta; Dwelf; Foldex; Ural Rex; Tennessee Rex;
        Oregon Rex; Mandalay; Bohemian Rex; Safari; Elf Cat=Elf; Russian White` },

  { id: 'olympic-sport', text: 'Name an Olympic sport', cat: 'Sport', emoji: '🏅',
    a: `Swimming; Athletics=Track and Field; Gymnastics; Basketball; Football=Soccer
      | Tennis; Volleyball; Boxing; Diving; Ice Hockey; Figure Skating; Alpine Skiing=Skiing=Downhill Skiing; Wrestling; Fencing;
        Cycling; Rowing; Weightlifting; Archery; Snowboarding=Snowboard; Curling; Bobsleigh=Bobsled; Speed Skating; Golf;
        Rugby Sevens=Rugby=Rugby 7s; Baseball; Softball; Judo; Taekwondo=Tae Kwon Do; Water Polo; Handball=Team Handball;
        Table Tennis=Ping Pong; Badminton; Equestrian=Horse Riding=Equestrianism; Sailing=Yachting; Triathlon;
        Beach Volleyball; Field Hockey=Hockey; Karate; Skateboarding; Surfing; Sport Climbing=Climbing=Rock Climbing;
        Breaking=Breakdancing=Breakdance
      | Luge; Skeleton; Biathlon; Ski Jumping; Cross-Country Skiing=Nordic Skiing; Nordic Combined; Freestyle Skiing;
        Short Track Speed Skating=Short Track; Canoeing=Canoe=Kayaking=Kayak; Artistic Swimming=Synchronized Swimming=Synchronised Swimming;
        Trampoline; Rhythmic Gymnastics; Artistic Gymnastics; Modern Pentathlon=Pentathlon; Shooting; Decathlon; Heptathlon;
        Marathon; Pole Vault; High Jump; Long Jump; Triple Jump; Javelin=Javelin Throw; Discus=Discus Throw; Shot Put;
        Hammer Throw; Hurdles; Steeplechase; Race Walking=Racewalking; Relay=Relay Race; Mountain Biking; BMX; Track Cycling;
        Road Cycling; Dressage; Show Jumping; Eventing; Moguls; Slalom; Giant Slalom; Super-G=Super G; Downhill; Halfpipe;
        Slopestyle; Big Air; Aerials; Ski Cross; Snowboard Cross; Ice Dance=Ice Dancing; Pairs Skating; Lacrosse; Cricket;
        Squash; Flag Football; 3x3 Basketball; Open Water Swimming=Marathon Swimming; Kitesurfing=Kiteboarding; Windsurfing;
        Canoe Slalom; Ski Mountaineering=Skimo; Polo; Tug of War
      | Croquet; Jeu de Paume=Real Tennis; Rackets=Racquets; Basque Pelota=Pelota; Rugby Union; Skeet; Trap Shooting=Trap;
        Keirin; Madison; Omnium; Team Pursuit; Sabre=Saber; Épée; Foil; Greco-Roman Wrestling=Greco-Roman; Freestyle Wrestling;
        Pommel Horse; Rings=Still Rings; Vault; Parallel Bars; Uneven Bars; Balance Beam=Beam; Floor Exercise=Floor;
        Horizontal Bar=High Bar; Sculling; Monobob; Mass Start; Skiathlon; Parallel Giant Slalom; Speed Climbing; Bouldering;
        Lead Climbing; Sprint Canoe=Canoe Sprint; Kayak Cross; BMX Freestyle; Air Pistol; Rapid Fire Pistol; Rifle Shooting;
        Synchronized Diving; Platform Diving; Springboard Diving; Medley; Butterfly; Backstroke; Breaststroke;
        Team Sprint
      | Motorboating=Powerboating; Military Patrol; Roque; Live Pigeon Shooting; Standing High Jump; Standing Long Jump;
        Standing Triple Jump; Rope Climbing; Club Swinging=Indian Clubs; Equestrian Vaulting; Singlestick; Weight Throw;
        Cross Country Running; Plunge for Distance; Underwater Swimming; Obstacle Swimming; Tandem Cycling;
        Dueling Pistol=Duelling Pistol; Running Deer Shooting; Tumbling; Two-handed Javelin; Two-handed Shot Put; Folding Kayak` },

  { id: 'sea-creature', text: 'Name a sea creature', cat: 'Animals', emoji: '🐙',
    a: `Shark; Whale; Dolphin; Octopus; Jellyfish; Crab
      | Squid; Starfish=Sea Star; Seahorse=Sea Horse; Lobster; Shrimp; Prawn; Seal; Sea Turtle=Turtle; Stingray=Sting Ray;
        Clownfish=Clown Fish; Eel; Orca=Killer Whale; Sea Lion; Walrus; Coral; Sea Urchin=Urchin; Clam; Oyster; Manatee;
        Blue Whale; Great White Shark=Great White; Tuna; Swordfish; Manta Ray=Manta; Pufferfish=Blowfish=Puffer Fish;
        Sea Anemone=Anemone; Narwhal; Hammerhead Shark=Hammerhead; Humpback Whale=Humpback; Barracuda; Mussel; Krill;
        Sea Otter; Cod; Salmon; Sardine; Anchovy; Mackerel; Herring; Penguin
      | Sea Cucumber; Nudibranch=Sea Slug; Sea Sponge=Sponge; Cuttlefish; Nautilus; Barnacle; Hermit Crab; Moray Eel=Moray;
        Lionfish; Angelfish; Parrotfish; Ocean Sunfish=Sunfish=Mola Mola=Mola; Whale Shark; Tiger Shark; Bull Shark;
        Mako Shark=Mako; Beluga=Beluga Whale; Sperm Whale; Grey Whale=Gray Whale; Minke Whale; Dugong; Elephant Seal;
        Leopard Seal; Plaice; Halibut; Flounder; Sole; Marlin; Sailfish; Flying Fish; Anglerfish; Viperfish; Gulper Eel;
        Lanternfish; Blobfish; Giant Squid; Colossal Squid; Vampire Squid; Box Jellyfish;
        Portuguese Man o' War=Man o War=Portuguese Man of War; Comb Jelly=Ctenophore; Scallop; Cockle; Whelk; Limpet;
        Periwinkle; Abalone; Conch; Cowrie; Sea Snail; Sea Snake; Mantis Shrimp; Japanese Spider Crab=Spider Crab;
        King Crab; Horseshoe Crab; Langoustine=Scampi; Sand Dollar; Brittle Star; Coelacanth; Grouper; Snapper; Blue Tang=Tang;
        Butterflyfish; Triggerfish; Mahi-mahi=Dolphinfish=Dorado; Haddock; Monkfish; Skate; Sawfish; Electric Ray=Torpedo Ray;
        Goblin Shark; Basking Shark; Greenland Shark; Nurse Shark; Porpoise; Pilot Whale; Fin Whale; Bowhead Whale;
        Right Whale; Fur Seal; Harbor Seal=Harbour Seal=Common Seal; Monk Seal; Leatherback Turtle=Leatherback;
        Loggerhead Turtle=Loggerhead; Hawksbill Turtle=Hawksbill; Green Sea Turtle; Blue-ringed Octopus; Dumbo Octopus;
        Giant Pacific Octopus; Stonefish; Pollock; Hake; Turbot; John Dory
      | Sea Pen; Sea Fan; Sea Lily=Crinoid; Feather Star; Sea Squirt=Tunicate; Lamprey; Hagfish; Oarfish; Wrasse;
        Damselfish; Boxfish; Cowfish; Leafy Seadragon; Weedy Seadragon; Pipefish; Goby; Blenny; Remora; Pilot Fish; Wahoo;
        Bonito; Whiting; Guitarfish; Eagle Ray; Chimaera=Ratfish; Frilled Shark; Megamouth Shark; Wobbegong; Lemon Shark;
        Thresher Shark; Blue Shark; Cookiecutter Shark; Angel Shark; Dogfish; Vaquita; Sei Whale; Bryde's Whale;
        Beaked Whale; Moon Jellyfish; Lion's Mane Jellyfish; Siphonophore; Salp; Pyrosome; Bristle Worm=Polychaete;
        Christmas Tree Worm; Bobbit Worm; Giant Tube Worm=Tube Worm; Feather Duster Worm; Sea Spider; Sea Butterfly=Pteropod;
        Sea Angel; Blue Dragon=Glaucus Atlanticus; Sea Hare; Chiton; Mimic Octopus; Argonaut=Paper Nautilus; Marine Iguana;
        Barreleye; Fangtooth; Hatchetfish; Scorpionfish; Toadfish; Frogfish; Batfish; Garden Eel; Conger Eel=Conger;
        Ribbon Eel; Wolf Eel; Lumpsucker=Lumpfish; Sea Robin; Gurnard; Mullet; Tarpon; Bonefish; Sprat; Pilchard; Capelin;
        Opah=Moonfish; Isopod=Giant Isopod; Copepod; Amphipod; Sea Krait; Steller's Sea Cow; Dungeness Crab; Blue Crab;
        Coconut Octopus; Flatfish; Wolffish=Atlantic Wolffish; Oyster Toadfish
      | Black Swallower; Stoplight Loosejaw; Tripod Fish; Snailfish; Dragonfish; Bristlemouth; Cusk Eel; Grenadier=Rattail;
        Sea Pig; Yeti Crab; Pompeii Worm; Zombie Worm=Osedax; Sarcastic Fringehead; Pacific Blackdragon;
        Telescope Octopus; Glass Squid; Firefly Squid; Bobtail Squid; Bigfin Squid; Flamingo Tongue Snail; Cone Snail;
        Sea Gooseberry; Venus's Flower Basket; Glass Sponge; Sea Walnut; Larvacean; Doliolid;
        Sea Mouse; Fireworm; Peanut Worm; Ribbon Worm; Acorn Worm; Lancelet=Amphioxus; Horseshoe Worm; Sea Tomato;
        Sea Apple; Crown-of-thorns Starfish; Sunflower Sea Star; Basket Star; Slate Pencil Urchin; Fire Urchin; Mola Tecta=Hoodwinker Sunfish;
        Ocean Quahog; Geoduck; Giant Clam; Shipworm; Pen Shell; Tun Shell; Murex; Olive Shell; Wentletrap; Sea Lemon;
        Spanish Dancer; Sea Bunny; Lettuce Sea Slug; Pistol Shrimp=Snapping Shrimp; Cleaner Shrimp; Harlequin Shrimp;
        Squat Lobster; Slipper Lobster; Spiny Lobster=Rock Lobster; Decorator Crab; Pea Crab; Boxer Crab; Sponge Crab;
        Fiddler Crab; Ghost Crab; Tanner Crab; Snow Crab; Velvet Crab; Sea Louse; Tongue-eating Louse; Gooseneck Barnacle;
        Megalodon` },

  { id: 'moon', text: 'Name a moon in our solar system', cat: 'Space', emoji: '🌙',
    a: `Moon=Luna; Titan; Europa
      | Io; Ganymede; Callisto; Phobos; Deimos; Triton; Enceladus; Charon
      | Mimas; Tethys; Dione; Rhea; Iapetus; Hyperion; Miranda; Ariel; Umbriel; Titania; Oberon; Nereid; Phoebe; Amalthea;
        Proteus; Janus; Epimetheus
      | Puck; Pandora; Prometheus; Atlas; Pan; Thebe; Metis; Adrastea; Himalia; Elara; Pasiphae; Sinope; Carme; Ananke;
        Lysithea; Leda; Nix; Hydra; Kerberos; Styx; Dysnomia; Hiiaka=Hi'iaka; Namaka; Larissa; Galatea; Despina; Thalassa;
        Naiad; Caliban; Sycorax; Cordelia; Ophelia; Juliet; Portia; Desdemona; Rosalind; Belinda; Bianca; Cressida; Perdita;
        Mab; Cupid; Helene; Telesto; Calypso; Daphnis; Dactyl; Dimorphos; Themisto
      | Halimede; Sao; Psamathe; Laomedeia; Neso; Hippocamp; Prospero; Setebos; Stephano; Trinculo; Francisco; Margaret;
        Ferdinand; Polydeuces; Methone; Pallene; Anthe; Aegaeon; Ymir; Paaliaq; Siarnaq; Tarvos; Kiviuq; Ijiraq; Mundilfari;
        Skathi; Albiorix; Erriapus; Suttungr; Thrymr; Narvi; Bebhionn; Bergelmir; Fornjot; Hati; Fenrir; Loge; Surtur; Kari;
        Greip; Jarnsaxa; Tarqeq; Aegir; Bestla; Hyrrokkin; Skoll; Gridr; Angrboda; Skrymir; Gerd; Eggther; Beli; Gunnlod;
        Thiazzi; Alvaldi; Geirrod; Callirrhoe; Kalyke; Megaclite; Taygete; Chaldene; Harpalyke; Iocaste; Praxidike; Isonoe;
        Autonoe; Thyone; Hermippe; Aitne; Eurydome; Euanthe; Euporie; Orthosie; Sponde; Kale; Pasithee; Hegemone; Mneme;
        Aoede; Thelxinoe; Arche; Kallichore; Helike; Carpo; Eukelade; Cyllene; Kore; Herse; Dia; Valetudo; Ersa; Pandia;
        Philophrosyne; Eupheme; Erinome; Weywot; Vanth; Actaea; Xiangliu; Ilmarë=Ilmare; Linus; Menoetius; Petit-Prince;
        Romulus; Remus; Squannit; Selam` },

  { id: 'currency', text: 'Name a currency', cat: 'Money', emoji: '💰',
    a: `US Dollar=Dollar=USD=American Dollar; Euro; British Pound=Pound=Pound Sterling=Sterling=GBP; Japanese Yen=Yen
      | Mexican Peso=Peso; Indian Rupee=Rupee; Chinese Yuan=Yuan=Renminbi=RMB; Swiss Franc=Franc; Russian Ruble=Ruble=Rouble;
        Canadian Dollar; Australian Dollar; South Korean Won=Won=Korean Won; Bitcoin; Brazilian Real=Real;
        South African Rand=Rand; Swedish Krona=Krona; Turkish Lira=Lira; Drachma; Deutsche Mark=Mark=Deutschmark=German Mark;
        French Franc; Italian Lira; Shilling; Israeli Shekel=Shekel=New Shekel
      | Dirham=UAE Dirham=Emirati Dirham; Saudi Riyal=Riyal; Thai Baht=Baht; Indonesian Rupiah=Rupiah;
        Malaysian Ringgit=Ringgit; Vietnamese Dong=Dong; Danish Krone=Krone; Norwegian Krone; Polish Zloty=Zloty;
        Hungarian Forint=Forint; Czech Koruna=Koruna; New Zealand Dollar; Hong Kong Dollar; Singapore Dollar;
        New Taiwan Dollar=Taiwan Dollar; Jamaican Dollar; Zimbabwean Dollar; Argentine Peso; Philippine Peso; Chilean Peso;
        Colombian Peso; Cuban Peso; Egyptian Pound; Kuwaiti Dinar; Iraqi Dinar; Iranian Rial=Rial; Pakistani Rupee;
        Nigerian Naira=Naira; Ghanaian Cedi=Cedi; Kenyan Shilling; Ukrainian Hryvnia=Hryvnia; Romanian Leu=Leu;
        Bulgarian Lev=Lev; Icelandic Krona; Peseta=Spanish Peseta; Dutch Guilder=Guilder=Gulden; Escudo=Portuguese Escudo;
        Irish Pound=Punt; Austrian Schilling=Schilling; Belgian Franc; Finnish Markka=Markka; Ethereum=Ether; Denarius; Ducat;
        Guinea; Florin; Sestertius; Peruvian Sol=Sol=Nuevo Sol; Venezuelan Bolivar=Bolivar=Bolívar
      | Afghani; Bangladeshi Taka=Taka; Sri Lankan Rupee; Nepalese Rupee; Mauritian Rupee; Myanmar Kyat=Kyat; Lao Kip=Kip;
        Cambodian Riel=Riel; Mongolian Tugrik=Tugrik=Tögrög; Kazakhstani Tenge=Tenge; Kyrgyz Som=Som; Uzbek Som;
        Tajikistani Somoni=Somoni; Azerbaijani Manat=Manat; Turkmen Manat; Georgian Lari=Lari; Armenian Dram=Dram;
        Moldovan Leu; Macedonian Denar=Denar; Croatian Kuna=Kuna; Bosnian Convertible Mark=Convertible Mark;
        Albanian Lek=Lek; Serbian Dinar; Bahraini Dinar; Jordanian Dinar; Libyan Dinar; Tunisian Dinar; Algerian Dinar;
        Moroccan Dirham; Omani Rial; Qatari Riyal; Yemeni Rial; Lebanese Pound; Syrian Pound; Sudanese Pound;
        Ethiopian Birr=Birr; Eritrean Nakfa=Nakfa; Ugandan Shilling; Tanzanian Shilling; Somali Shilling;
        Zambian Kwacha=Kwacha; Malawian Kwacha; Angolan Kwanza=Kwanza; Botswana Pula=Pula; Lesotho Loti=Loti;
        Swazi Lilangeni=Lilangeni; Mozambican Metical=Metical; Malagasy Ariary=Ariary; Gambian Dalasi=Dalasi;
        Sierra Leonean Leone=Leone; Mauritanian Ouguiya=Ouguiya; CFA Franc; Congolese Franc; Rwandan Franc; Burundian Franc;
        Guinean Franc; Djiboutian Franc; Comorian Franc; São Tomé Dobra=Dobra; Cape Verdean Escudo; Boliviano;
        Paraguayan Guaraní=Guarani; Costa Rican Colón=Colon=Colón; Nicaraguan Córdoba=Cordoba; Honduran Lempira=Lempira;
        Guatemalan Quetzal=Quetzal; Panamanian Balboa=Balboa; Haitian Gourde=Gourde; Uruguayan Peso; Dominican Peso;
        Fijian Dollar; Papua New Guinean Kina=Kina; Vanuatu Vatu=Vatu; Samoan Tala=Tala; Tongan Paʻanga=Paanga;
        Maldivian Rufiyaa=Rufiyaa; Bhutanese Ngultrum=Ngultrum; Macanese Pataca=Pataca; North Korean Won; Brunei Dollar;
        Trinidad and Tobago Dollar; East Caribbean Dollar; Bahamian Dollar; Barbadian Dollar; Belize Dollar; Bermudian Dollar;
        Guyanese Dollar; Liberian Dollar; Namibian Dollar; Solomon Islands Dollar; Surinamese Dollar; Seychellois Rupee;
        Aruban Florin; Reichsmark; Livre; Thaler; Lats=Latvian Lats; Litas=Lithuanian Litas; Kroon=Estonian Kroon;
        Tolar=Slovenian Tolar; Slovak Koruna; Spanish Dollar=Piece of Eight=Pieces of Eight; Aureus; Solidus; Obol; Talent;
        Dogecoin; Sou; Tether; Litecoin
      | Rentenmark; Papiermark; East German Mark=Ostmark=Mark der DDR; European Currency Unit; Sucre; Austral; Cruzeiro;
        Cruzado; Inti; Zaire; Rhodesian Dollar; Biafran Pound; Confederate Dollar; Continental Currency=Continental;
        Assignat; Riksdaler=Rigsdaler; Kreuzer; Heller; Ryo; Mon; Tael; Liang; Cowrie Shell=Cowrie; Wampum; Rai Stones=Rai;
        Manilla; Katanga Franc` },

  { id: 'cloud', text: 'Name a type of cloud', cat: 'Weather', emoji: '☁️',
    a: `Cumulus; Cirrus; Stratus; Nimbus
      | Cumulonimbus=Thundercloud=Thunderhead; Nimbostratus; Stratocumulus; Altocumulus; Altostratus; Cirrostratus;
        Cirrocumulus; Lenticular=Lenticularis=Lenticular Cloud
      | Mammatus=Mamma=Mammatocumulus; Noctilucent=Noctilucent Cloud=Polar Mesospheric Cloud; Contrail=Homogenitus; Shelf Cloud=Arcus; Wall Cloud=Murus;
        Funnel Cloud=Tuba; Anvil=Incus=Anvil Cloud; Roll Cloud=Volutus; Pyrocumulus=Flammagenitus=Fire Cloud;
        Pyrocumulonimbus; Nacreous=Polar Stratospheric Cloud=Mother of Pearl Cloud; Virga; Pileus=Cap Cloud; Castellanus;
        Congestus; Fractus; Kelvin-Helmholtz=Fluctus=Kelvin Helmholtz Cloud; Fallstreak Hole=Cavum=Hole Punch Cloud;
        Asperitas=Undulatus Asperatus; Fog; Banner Cloud; Morning Glory Cloud=Morning Glory
      | Fibratus; Uncinus; Spissatus; Floccus; Stratiformis; Nebulosus; Humilis; Mediocris; Calvus; Capillatus; Intortus;
        Vertebratus; Undulatus; Radiatus; Lacunosus; Duplicatus; Translucidus; Perlucidus; Opacus; Praecipitatio; Velum;
        Pannus=Scud; Flumen=Beaver Tail; Cauda=Tail Cloud
      | Cataractagenitus; Silvagenitus; Homomutatus; Flanking Line; Orographic Cloud; Ship Track; Actinoform Cloud=Actinoform` },

  { id: 'gemstone', text: 'Name a gemstone', cat: 'Science', emoji: '💎',
    a: `Diamond; Ruby; Emerald; Sapphire; Amethyst
      | Pearl; Opal; Topaz; Jade; Garnet; Aquamarine; Turquoise; Onyx; Quartz; Peridot=Olivine=Chrysolite; Amber; Tanzanite;
        Citrine; Moonstone; Lapis Lazuli=Lapis; Tourmaline; Jasper; Agate; Obsidian
      | Zircon; Alexandrite; Spinel; Morganite; Beryl; Malachite; Tiger's Eye=Tiger Eye=Tigereye; Bloodstone=Heliotrope;
        Carnelian=Cornelian; Coral; Jet; Rose Quartz; Smoky Quartz; Chalcedony; Labradorite; Sunstone; Iolite=Cordierite;
        Kunzite; Tsavorite; Rhodolite; Moissanite; Ammolite; Chrysoprase; Aventurine; Sodalite; Rhodochrosite; Fluorite;
        Hematite; Amazonite; Larimar; Charoite; Sugilite; Jadeite; Nephrite; Mother of Pearl=Nacre; Fire Opal; Black Opal;
        Moldavite; Pyrite; Marcasite; Howlite
      | Diopside; Chrysoberyl; Cat's Eye; Andalusite; Kyanite; Benitoite; Taaffeite; Painite; Grandidierite; Musgravite;
        Red Beryl=Bixbite; Paraíba Tourmaline=Paraiba; Rubellite; Indicolite; Demantoid; Spessartine; Almandine; Pyrope;
        Grossular; Hessonite; Uvarovite; Andradite; Heliodor; Goshenite; Ametrine; Prasiolite=Green Amethyst; Padparadscha;
        Chrysocolla; Variscite; Prehnite; Sphene=Titanite; Danburite; Euclase; Phenakite; Hiddenite; Spodumene; Scapolite;
        Zoisite; Thulite; Apatite; Enstatite; Hemimorphite; Smithsonite; Azurite; Dioptase; Rhodonite; Unakite; Seraphinite;
        Spectrolite; Lepidolite; Sardonyx; Sard; Star Sapphire; Star Ruby; Watermelon Tourmaline; Verdelite; Cymophane;
        Hyalite; Hackmanite; Tektite; Libyan Desert Glass; Vesuvianite=Idocrase; Sinhalite; Kornerupine; Axinite
      | Jeremejevite; Poudretteite; Serendibite; Pezzottaite; Ekanite; Clinohumite; Sapphirine; Kyawthuite; Johachidolite;
        Hibonite; Brazilianite; Amblygonite; Petalite; Pollucite; Beryllonite; Cassiterite; Sphalerite; Cuprite; Rhodizite;
        Stichtite; Maw Sit Sit; Chiastolite; Staurolite; Dravite; Schorl; Elbaite; Liddicoatite; Achroite; Morion;
        Rutilated Quartz; Herkimer Diamond; Blue John; Gaspeite` },

  { id: 'herb-spice', text: 'Name a herb or spice', cat: 'Food', emoji: '🌿',
    a: `Basil; Cinnamon; Oregano; Black Pepper=Pepper=Peppercorn; Rosemary; Thyme
      | Parsley; Mint; Cumin; Paprika; Nutmeg; Ginger; Garlic; Turmeric; Coriander=Cilantro; Dill; Sage; Chives;
        Bay Leaf=Bay=Bay Laurel; Clove; Saffron; Chili=Chilli=Chili Powder=Chile; Cayenne=Cayenne Pepper; Vanilla;
        Cardamom=Cardamon; Tarragon; Mustard Seed=Mustard; Allspice=Pimento; Lemongrass
      | Fennel=Fennel Seed; Star Anise; Anise=Aniseed=Anise Seed; Caraway; Marjoram; Fenugreek=Methi; Sumac; Curry Leaf;
        Chervil; Lovage; Sorrel; Savory=Summer Savory; Lemon Balm; Lavender; Juniper Berry=Juniper; Mace; White Pepper;
        Pink Peppercorn; Sichuan Pepper=Szechuan Pepper; Horseradish; Wasabi; Sesame Seed=Sesame; Poppy Seed;
        Nigella Seed=Nigella=Kalonji=Black Seed; Asafoetida=Hing; Galangal; Kaffir Lime Leaf=Makrut Lime Leaf=Lime Leaf;
        Celery Seed; Ajwain=Carom; Annatto=Achiote; Spearmint; Peppermint; Chamomile=Camomile; Licorice=Liquorice;
        Cassia; Shiso=Perilla; Holy Basil=Tulsi; Thai Basil; Borage; Hyssop; Lemon Verbena; Garlic Chives
      | Epazote; Rue; Angelica; Mugwort; Wormwood; Amchur=Mango Powder; Vietnamese Coriander=Rau Ram; Culantro=Sawtooth Coriander;
        Grains of Paradise; Long Pepper; Cubeb; Mahleb=Mahlab; Mastic; Barberry; Black Lime=Loomi=Dried Lime; Pandan;
        Fingerroot=Krachai; Catnip; Lemon Thyme; Winter Savory; Tansy; Sweet Woodruff=Woodruff; Sassafras=Filé;
        Wild Garlic=Ramsons; Yarrow; Sweet Cicely; Lemon Myrtle; Fennel Pollen; Black Cardamom; Sansho; Kokum; Zedoary
      | Kencur=Aromatic Ginger; Wattleseed; Anardana; Kala Jeera=Black Cumin; Grains of Selim; Calabash Nutmeg;
        Korarima=Ethiopian Cardamom; Timut Pepper; Voatsiperifery; Tasmanian Pepperberry=Mountain Pepper; Akudjura=Bush Tomato;
        Anise Myrtle; Mitsuba; Hoja Santa; Papalo; Pipicha; Chepil; Pericón=Mexican Tarragon; Boldo; Huacatay=Black Mint;
        Costmary; Bee Balm; Melilot; Orris Root; Spikenard; Saltbush; Ashanti Pepper` },

  { id: 'bird', text: 'Name a bird', cat: 'Animals', emoji: '🐦',
    a: `Eagle; Robin; Pigeon; Owl; Penguin; Sparrow
      | Crow; Parrot; Flamingo; Hawk; Seagull=Gull; Duck; Swan; Goose; Peacock=Peafowl=Peahen; Hummingbird; Blue Jay;
        Cardinal; Ostrich; Chicken; Turkey; Dove; Falcon; Woodpecker; Toucan; Pelican; Vulture; Raven; Bluebird; Finch;
        Canary; Stork; Heron; Kingfisher; Emu; Kiwi; Magpie; Starling; Blackbird; Swallow; Budgerigar=Budgie; Cockatoo
      | Albatross; Puffin; Condor; Crane; Ibis; Egret; Pheasant; Quail; Partridge; Grouse; Wren; Thrush; Nightingale;
        Skylark=Lark; Mockingbird; Oriole; Tanager; Warbler; Chickadee; Blue Tit; Great Tit; Nuthatch; Cuckoo; Roadrunner;
        Kookaburra; Cassowary; Rhea; Dodo; Osprey; Kestrel; Buzzard; Red Kite=Kite; Harrier; Merlin;
        Peregrine Falcon=Peregrine; Bald Eagle; Golden Eagle; Macaw; Cockatiel; Lovebird; Lorikeet; Mallard;
        Loon=Common Loon=Great Northern Diver; Grebe; Cormorant; Gannet; Blue-footed Booby=Booby; Frigatebird; Tern;
        Sandpiper; Plover; Curlew; Snipe; Woodcock; Lapwing=Peewit; Oystercatcher; Avocet; Spoonbill; Bittern; Coot; Moorhen;
        Corncrake; Bustard; Jay; Jackdaw; Rook; Bullfinch; Goldfinch; Chaffinch; Greenfinch; Grosbeak; Bunting; Wagtail;
        Swift; House Martin=Martin; Nightjar; Hoopoe; Bee-eater; Hornbill; Quetzal; Lyrebird; Bird of Paradise; Bowerbird;
        Myna=Mynah; Shrike; Waxwing; Grackle; Meadowlark; Junco; Barn Owl; Snowy Owl; Canada Goose; Mandarin Duck;
        Wood Duck; Kakapo; Kea; Harpy Eagle; Secretary Bird; Shoebill; Passenger Pigeon; Great Auk; Moa; Guineafowl;
        Ptarmigan; Capercaillie; Sparrowhawk; Goshawk; Weaver=Weaverbird; Sunbird; Mourning Dove; Turkey Vulture; Whooping Crane
      | Linnet; Siskin; Crossbill; Yellowhammer; Dunnock; Pipit; Trogon; Cowbird; Bobolink; Towhee; Vireo; Kinglet;
        Gnatcatcher; Phoebe; Flycatcher; Kingbird; Whip-poor-will; Nighthawk; Killdeer; Turnstone; Dunlin; Knot; Sanderling;
        Godwit; Phalarope; Skua; Jaeger; Auk; Guillemot; Razorbill; Murre; Petrel; Shearwater; Fulmar; Storm Petrel; Kaka;
        Tui; Takahe; Huia; Hamerkop; Hoatzin; Potoo; Oilbird; Frogmouth; Kiskadee; Bellbird; Cock-of-the-rock; Manakin;
        Cotinga; Antbird; Ovenbird; Tinamou; Seriema; Sunbittern; Kagu; Jacana; Sheathbill; Pratincole; Stilt; Thick-knee;
        Sandgrouse; Turaco; Mousebird; Ani; Jacamar; Puffbird; Barbet; Honeyguide; Wryneck; Pitta; Broadbill; Fairywren;
        Honeyeater; Drongo; Fantail; Paradise Flycatcher; White-eye; Babbler; Bulbul; Dipper; Wallcreeper; Treecreeper;
        Goldcrest; Firecrest; Redstart; Wheatear; Stonechat; Whinchat; Bluethroat; Chiffchaff; Blackcap; Whitethroat;
        Black Grouse; Prairie Chicken; Sage Grouse; Junglefowl; Malleefowl; Curassow; Chachalaca; Screamer; Shelduck; Eider;
        Merganser; Goldeneye; Bufflehead; Scoter; Teal; Wigeon; Pintail; Shoveler; Gadwall; Canvasback; Pochard; Smew;
        Muscovy Duck; Brent Goose=Brant; Snow Goose; Nene=Hawaiian Goose; Anhinga=Darter; Tropicbird; Limpkin; Trumpeter;
        Umbrellabird; Quelea; Whydah; Widowbird; Oxpecker; Lammergeier=Bearded Vulture; Caracara; Cedar Waxwing; Purple Martin;
        Scarlet Macaw; Steller's Jay; Scrub Jay; Gila Woodpecker; Flicker=Northern Flicker; Sapsucker; Pileated Woodpecker;
        Kittiwake; Little Auk=Dovekie; Spoon-billed Sandpiper; Kakariki; Galah; Rosella
      | Asity; Scrubbird; Pardalote; Spiderhunter; Flowerpecker; Leafbird; Accentor; Penduline Tit; Bearded Reedling; Courser;
        Finfoot; Mesite; Coua; Tapaculo; Gnateater; Antpitta; Woodcreeper; Plantcutter; Sharpbill; Palmchat; Hypocolius;
        Rockfowl=Picathartes; Rockjumper; Sugarbird; Bristlehead; Ifrit; Berrypecker; Satinbird; Wattlebird; Kokako;
        Saddleback=Tieke; Stitchbird=Hihi; Rifleman; Greater Adjutant=Adjutant; Marabou Stork=Marabou; Jabiru; Openbill;
        Ibisbill; Crab-plover; Plains-wanderer; Buttonquail; Magpie Goose; Steamer Duck; Torrent Duck; Freckled Duck;
        Hawaiian Crow=Alala; Akiapolaau; Iiwi; Apapane; Elepaio; Ivory-billed Woodpecker; Carolina Parakeet; Labrador Duck;
        Heath Hen; Elephant Bird; Rodrigues Solitaire=Solitaire; Spix's Macaw; Hyacinth Macaw; Kereru; Weka; Pukeko; Fernbird` },

  { id: 'dinosaur', text: 'Name a dinosaur', cat: 'Science', emoji: '🦖',
    a: `Tyrannosaurus=Tyrannosaurus Rex=T Rex; Triceratops; Velociraptor=Raptor; Stegosaurus; Brachiosaurus
      | Diplodocus; Brontosaurus; Spinosaurus; Ankylosaurus; Allosaurus; Iguanodon; Parasaurolophus; Pachycephalosaurus;
        Apatosaurus; Dilophosaurus; Gallimimus; Compsognathus; Carnotaurus; Giganotosaurus; Argentinosaurus
      | Oviraptor; Deinonychus; Utahraptor; Baryonyx; Megalosaurus; Ceratosaurus; Edmontosaurus; Maiasaura; Hadrosaurus;
        Corythosaurus; Lambeosaurus; Protoceratops; Styracosaurus; Centrosaurus; Chasmosaurus; Pentaceratops; Torosaurus;
        Kentrosaurus; Therizinosaurus; Troodon; Microraptor; Coelophysis; Plateosaurus; Herrerasaurus; Eoraptor; Suchomimus;
        Albertosaurus; Gorgosaurus; Daspletosaurus; Tarbosaurus; Carcharodontosaurus; Acrocanthosaurus; Majungasaurus;
        Cryolophosaurus; Camarasaurus; Mamenchisaurus; Supersaurus; Sauroposeidon; Dreadnoughtus; Patagotitan; Titanosaurus;
        Saltasaurus; Amargasaurus; Nigersaurus; Psittacosaurus; Euoplocephalus; Nodosaurus; Minmi; Leaellynasaura;
        Muttaburrasaurus; Ouranosaurus; Hypsilophodon; Stygimoloch; Dracorex; Archaeopteryx; Struthiomimus; Ornithomimus;
        Deinocheirus; Mapusaurus; Yutyrannus; Sinosauropteryx; Mononykus; Dromaeosaurus; Citipati; Torvosaurus; Barosaurus;
        Giraffatitan; Dacentrurus; Pachyrhinosaurus; Kosmoceratops; Borealopelta; Zuul; Irritator; Concavenator;
        Massospondylus; Heterodontosaurus; Scelidosaurus; Tenontosaurus; Shantungosaurus; Saurolophus; Alamosaurus
      | Sauropelta; Tsintaosaurus; Dryosaurus; Camptosaurus; Lesothosaurus; Scutellosaurus; Homalocephale; Prenocephale;
        Dilong; Guanlong; Sinornithosaurus; Caudipteryx; Saurornitholestes; Austroraptor; Buitreraptor; Rahonavis;
        Unenlagia; Pyroraptor; Achillobator; Balaur; Halszkaraptor; Shuvuuia; Alvarezsaurus; Avimimus; Dromiceiomimus;
        Pelecanimimus; Nothronychus; Segnosaurus; Alxasaurus; Beipiaosaurus; Falcarius; Ornitholestes; Coelurus;
        Eustreptospondylus; Afrovenator; Ichthyovenator; Oxalaia; Neovenator; Tyrannotitan; Aucasaurus; Abelisaurus; Rugops;
        Skorpiovenator; Masiakasaurus; Elaphrosaurus; Limusaurus; Noasaurus; Rajasaurus; Staurikosaurus; Pisanosaurus;
        Riojasaurus; Lufengosaurus; Anchisaurus; Melanorosaurus; Thecodontosaurus; Vulcanodon; Shunosaurus; Omeisaurus;
        Cetiosaurus; Dicraeosaurus; Brachytrachelopan; Europasaurus; Paralititan; Rapetosaurus; Ampelosaurus; Isisaurus;
        Futalognkosaurus; Puertasaurus; Nemegtosaurus; Opisthocoelicaudia; Bajadasaurus; Diamantinasaurus; Wintonotitan;
        Australovenator; Atlascopcosaurus; Qantassaurus; Kunbarrasaurus; Gastonia; Polacanthus; Hylaeosaurus; Edmontonia;
        Pinacosaurus; Talarurus; Tarchia; Scolosaurus; Anodontosaurus; Huayangosaurus; Tuojiangosaurus; Chungkingosaurus;
        Miragaia; Gigantspinosaurus; Lexovisaurus; Wuerhosaurus; Hesperosaurus; Zuniceratops; Einiosaurus; Achelousaurus;
        Utahceratops; Nasutoceratops; Diabloceratops; Regaliceratops; Sinoceratops; Leptoceratops; Bagaceratops; Yinlong;
        Liaoceratops; Archaeoceratops; Eotriceratops; Titanoceratops; Anchiceratops; Arrhinoceratops; Agujaceratops;
        Coahuilaceratops; Medusaceratops; Spiclypeus; Wendiceratops; Xenoceratops; Albertaceratops; Avaceratops;
        Charonosaurus; Olorotitan; Hypacrosaurus; Brachylophosaurus; Gryposaurus; Kritosaurus; Prosaurolophus; Bactrosaurus;
        Telmatosaurus; Tethyshadros; Amurosaurus; Velafrons; Magnapaulia; Kamuysaurus; Mantellisaurus; Altirhinus;
        Probactrosaurus; Rhabdodon; Zalmoxes; Thescelosaurus; Orodromeus; Oryctodromeus; Gasparinisaura; Talenkauen
      | Fruitadens; Tianyulong; Kulindadromeus; Yi=Yi Qi; Epidexipteryx; Anchiornis; Xiaotingia; Aurornis; Jeholornis;
        Mei=Mei Long; Jinfengopteryx; Sinovenator; Zanabazar; Saurornithoides; Byronosaurus; Latenivenatrix; Stenonychosaurus;
        Gigantoraptor; Anzu; Chirostenotes; Caenagnathus; Khaan; Conchoraptor; Nomingia; Lythronax; Teratophoneus;
        Bistahieversor; Nanuqsaurus; Qianzhousaurus; Alioramus; Raptorex; Eotyrannus; Proceratosaurus; Appalachiosaurus;
        Dryptosaurus; Zhuchengtyrannus; Thanatotheristes; Megaraptor; Fukuiraptor; Aerosteon; Orkoraptor; Meraxes;
        Sauroniops; Shaochilong; Sinraptor; Yangchuanosaurus; Monolophosaurus; Saturnalia; Buriolestes; Panphagia;
        Chromogisaurus; Eodromaeus; Tawa; Chindesaurus; Daemonosaurus; Liliensternus; Zupaysaurus; Sinosaurus; Dracovenator;
        Segisaurus; Procompsognathus; Mussaurus; Efraasia; Unaysaurus; Leonerasaurus; Ledumahadi;
        Antetonitrus; Isanosaurus; Tazoudasaurus; Spinophorosaurus; Bellusaurus; Klamelisaurus; Turiasaurus; Losillasaurus;
        Atlasaurus; Jobaria; Lourinhasaurus; Haplocanthosaurus; Amphicoelias; Maraapunisaurus; Suuwassea; Kaatedocus;
        Galeamopus; Tornieria; Australodocus; Abrosaurus; Bonitasaura; Mendozasaurus; Malawisaurus; Karongasaurus;
        Andesaurus; Epachthosaurus; Gondwanatitan; Maxakalisaurus; Uberabatitan; Trigonosaurus; Overosaurus; Rinconsaurus;
        Neuquensaurus; Pellegrinisaurus; Antarctosaurus; Notocolossus; Argyrosaurus; Elaltitan; Quaesitosaurus;
        Euhelopus; Chuanjiesaurus; Xinjiangtitan; Ruyangosaurus; Huanghetitan; Daxiatitan; Yunmenglong; Qiaowanlong;
        Jiangshanosaurus; Atsinganosaurus; Lirainosaurus; Magyarosaurus; Paludititan; Struthiosaurus; Hungarosaurus;
        Europelta; Liaoningosaurus; Gargoyleosaurus; Mymoorapelta; Cedarpelta; Peloroplites; Animantarx;
        Silvisaurus; Texasetes; Pawpawsaurus; Glyptodontopelta; Ahshislepelta; Nodocephalosaurus; Ziapelta; Akainacephalus;
        Platypelta; Dyoplosaurus; Zaraapelta; Saichania; Crichtonpelta; Jinyunpelta; Dongyangopelta;
        Yuxisaurus; Emausaurus` },

  { id: 'asia-country', text: 'Name a country in Asia', cat: 'Geography', emoji: '🌏',
    a: `China; Japan; India; South Korea; Vietnam=Viet Nam
      | Thailand; North Korea; Russia; Pakistan; Indonesia; Philippines; Singapore; Malaysia; Iran; Iraq; Afghanistan;
        Saudi Arabia; Israel; Turkey=Türkiye; Nepal; Mongolia; Taiwan; Cambodia; Bangladesh; Sri Lanka
      | Laos; Myanmar=Burma; Syria; Jordan; Lebanon; Kuwait; Qatar; United Arab Emirates=UAE; Yemen; Oman; Kazakhstan;
        Uzbekistan; Bhutan; Maldives; Brunei; Georgia
      | Bahrain; Armenia; Azerbaijan; Tajikistan; Kyrgyzstan; Turkmenistan; Timor-Leste=East Timor; Palestine; Cyprus
      | Egypt` },

  { id: 'language', text: 'Name a language', cat: 'Language', emoji: '🗣️',
    a: `English; Spanish; French; German; Mandarin=Chinese=Mandarin Chinese=Standard Chinese; Italian
      | Japanese; Russian; Portuguese; Arabic; Hindi; Korean; Latin; Greek; Dutch; Swedish; Cantonese; Hebrew; Polish;
        Turkish; Irish=Irish Gaelic; Welsh; Norwegian; Danish; Finnish; Swahili=Kiswahili; Vietnamese; Thai; Bengali=Bangla;
        Urdu; Punjabi
      | Persian=Farsi; Tagalog=Filipino; Indonesian; Malay; Hungarian; Czech; Romanian; Ukrainian; Icelandic;
        Scottish Gaelic=Scots Gaelic; Scots; Basque; Catalan; Yiddish; Sanskrit; Ancient Greek; Old English=Anglo-Saxon;
        American Sign Language=ASL; Tamil; Telugu; Marathi; Gujarati; Kannada; Malayalam; Nepali; Sinhala=Sinhalese; Burmese;
        Khmer=Cambodian; Lao; Mongolian; Tibetan; Zulu; Xhosa; Afrikaans; Amharic; Yoruba; Igbo; Hausa; Somali; Navajo;
        Cherokee; Quechua; Maori; Hawaiian; Serbian; Croatian; Bulgarian; Slovak; Slovenian=Slovene; Lithuanian; Latvian;
        Estonian; Albanian; Armenian; Georgian; Kurdish; Pashto; Aramaic; Ancient Egyptian=Egyptian; Old Norse; Cornish;
        Breton; Maltese; Galician; Haitian Creole
      | Coptic; Sumerian; Akkadian; Hittite; Etruscan; Gothic; Manx; Frisian; Luxembourgish; Faroese; Occitan=Provençal;
        Romansh; Sardinian; Corsican; Sicilian; Neapolitan; Venetian; Ladino; Kazakh; Uzbek; Turkmen; Kyrgyz; Tajik;
        Azerbaijani=Azeri; Tatar; Bashkir; Chuvash; Uyghur; Yakut=Sakha; Chechen; Avar; Ossetian; Abkhaz; Inuktitut;
        Greenlandic=Kalaallisut; Sami; Cree; Ojibwe=Ojibwa; Lakota; Dakota; Cheyenne; Hopi; Nahuatl; Yucatec Maya; Kiche=K'iche';
        Guarani; Aymara; Mapudungun; Tupi; Papiamento; Tok Pisin; Samoan; Tongan; Fijian; Tahitian; Malagasy; Shona;
        Sesotho=Sotho; Setswana=Tswana; Kinyarwanda; Kirundi; Luganda; Wolof; Fula=Fulani; Twi=Akan; Ewe; Lingala; Kikongo;
        Oromo; Tigrinya; Berber=Tamazight; Javanese; Sundanese; Balinese; Cebuano; Ilocano; Hmong; Karen; Dzongkha; Dhivehi;
        Assamese; Odia=Oriya; Konkani; Sindhi; Kashmiri; Balochi; Pali; British Sign Language=BSL; Old French; Middle English;
        Old High German; Phoenician; Syriac; Ge'ez; Old Church Slavonic; Ainu; Okinawan
      | Tocharian; Avestan; Ugaritic; Elamite; Hurrian; Urartian; Luwian; Lycian; Lydian; Phrygian; Oscan; Umbrian; Faliscan;
        Gaulish; Pictish; Cumbric; Norn; Dalmatian; Old Prussian; Polabian; Livonian; Votic; Ingrian; Veps; Karelian; Mari;
        Udmurt; Komi; Mordvin=Erzya; Khanty; Mansi; Nenets; Selkup; Ket; Yukaghir; Chukchi; Itelmen; Nivkh; Evenki; Even;
        Manchu; Jurchen; Tangut; Khitan; Sogdian; Bactrian; Khotanese; Mandaic; Ubykh; Kabardian;
        Adyghe; Lezgian; Ingush; Svan; Mingrelian; Laz; Burushaski; Kusunda; Nihali; Hadza; Sandawe; Ju'hoansi; Taa=Xoo;
        Nama=Khoekhoe; Zuni; Haida; Tlingit; Kutenai; Yuchi; Natchez; Timucua; Chitimacha; Karuk; Yurok; Washo; Seri;
        Purepecha; Mixtec; Zapotec; Otomi; Totonac; Huastec; Kaqchikel; Mam; Tzeltal; Tzotzil; Miskito; Garifuna; Kuna;
        Embera; Wayuu; Shuar; Kichwa; Asháninka; Shipibo; Yanomami; Kayapó; Pirahã; Tikuna; Wichí; Toba` },

  { id: 'dance', text: 'Name a dance style', cat: 'Culture', emoji: '💃',
    a: `Ballet; Salsa; Tango; Waltz; Hip Hop=Hip-hop Dance; Tap=Tap Dance=Tap Dancing
      | Jazz=Jazz Dance; Breakdancing=Breaking=Breakdance=B-boying; Ballroom; Swing; Foxtrot; Cha-cha=Cha-cha-cha; Samba;
        Rumba; Flamenco; Contemporary; Line Dancing=Line Dance; Square Dance=Square Dancing; Disco; Belly Dance=Belly Dancing;
        Irish Dance=Irish Dancing=Irish Step Dance; Polka; Twist; Modern Dance=Modern; Jive; Lindy Hop; Charleston; Bachata;
        Merengue; Paso Doble=Pasodoble; Quickstep; Mambo; Pole Dance=Pole Dancing; Twerking=Twerk; Hula; Macarena
      | Viennese Waltz; Argentine Tango; Can-can=Cancan; Conga; Limbo; Electric Slide; Krump=Krumping; Popping; Locking;
        Vogue=Voguing; Shuffle; Clogging=Clog Dance; Stepping=Step Dancing; Bollywood; Bharatanatyam; Kathak; Bhangra; Garba; Haka;
        Morris Dance=Morris Dancing; Maypole Dance=Maypole; Highland Dance=Highland Dancing; Highland Fling; Sword Dance;
        Hornpipe; Jig; Reel; Minuet; Mazurka; Polonaise; Czardas=Csárdás; Hora; Sirtaki=Zorba; Tarantella; Fandango;
        Bolero; Cumbia; Lambada; Capoeira; Kizomba; Zouk; Dancehall; Reggaeton; Lyrical; Burlesque; Go-go Dance=Go-go;
        Lion Dance; Dragon Dance; Hustle; Jitterbug; West Coast Swing; East Coast Swing; Boogie-woogie; Rock and Roll;
        Two-step=Texas Two-step; Contra Dance; Barn Dance; Hand Jive; Hokey Pokey=Hokey Cokey; Chicken Dance; Bunny Hop;
        Sufi Whirling=Whirling Dervish; Dabke; Kathakali; Odissi; Kuchipudi; Butoh; Ceilidh Dancing; Scottish Country Dance;
        Folk Dance; Acro Dance=Acrobatic Dance; Aerial Dance; Jazz Funk; Waacking=Whacking; House Dance; Tutting;
        Shim Sham; Floss; Dougie
      | Manipuri; Mohiniyattam; Sattriya; Dandiya Raas=Dandiya; Ghoomar; Lavani; Kalbelia; Chhau; Bihu; Yakshagana;
        Quadrille; Gavotte; Allemande; Courante; Sarabande; Gigue; Bourrée; Pavane; Galliard; Volta=La Volta; Krakowiak;
        Oberek; Kujawiak; Kolo; Syrtos; Zeibekiko; Hasapiko; Saltarello; Sevillanas; Jota; Sardana; Milonga; Cueca; Joropo;
        Forró; Frevo; Semba; Kuduro; Soukous; Azonto; Gwara Gwara; Pantsula; Gumboot Dance; Ndombolo; Coupé-décalé;
        Mapouka; Kecak; Legong; Saman; Tinikling; Cariñosa; Buchaechum=Korean Fan Dance; Yangge; Apsara Dance; Khon;
        Lezginka; Hopak=Gopak; Trepak; Schuhplattler; Ländler; Branle; Farandole; Balboa; Carolina Shag=Shag; Big Apple;
        Black Bottom; Cakewalk; Turkey Trot; Bunny Hug; Mashed Potato; Madison; Stroll; Watusi; Lambeth Walk
      | Rueda de Casino=Rueda; Danzón; Bomba; Plena; Punta; Flexing; Jookin; Turfing; Litefeet; Crip Walk=C-Walk;
        Melbourne Shuffle; Jumpstyle; Tecktonik; Hakken; Contact Improvisation; Sean-nós Dance=Sean-nos; English Country Dance;
        Fancy Dance; Hoop Dance; Jingle Dress Dance; Stomp Dance; Siva Samoa; Ote'a=Otea; Tamure; Bon Odori; Para Para;
        Nihon Buyo; Kabuki Dance; Rumba Flamenca; Bulerías; Alegrías; Soleá; Seguiriya; Malambo; Chacarera; Zamba;
        Marinera; Huayno; Saya; Tinku; Diablada; Morenada; Caporales` },
];
