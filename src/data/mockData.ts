import { Destination, LocalContributor, LocalContribution, LocalStory } from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'mysuru',
    name: 'Mysuru',
    region: 'Karnataka',
    country: 'India',
    tagLine: 'City of Palaces, Sandalwood & Royal Heritage',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    description: 'A city where royal Wodeyar heritage breathes through fragrant Devaraja flower alleys, century-old sweet marts, handwoven silk looms, and the misty dawn steps of Chamundi Hill.',
    coords: { lat: 12.2958, lng: 76.6394, address: 'Mysuru, Karnataka, India' },
    currency: 'INR',
    currencySymbol: '₹',
    verifiedLocalsCount: 18,
    contributionsCount: 34,
    popularHighlights: ['Devaraja Market Flower Stalls', 'Original Mylari Dosa', 'Chamundi Hill 1008 Steps Dawn Ritual', 'Guru Sweet Mart Royal Mysore Pak']
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    region: 'Kansai',
    country: 'Japan',
    tagLine: 'Millennium Capital of Zen, Tea & Shokunin Masters',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'Ancient alleys of preserved Machiya townhouses, centuries-old moss temple pathways, quiet early-morning tea ceremonies, and strict culinary customs preserved by resident craftsmen.',
    coords: { lat: 35.0116, lng: 135.7681, address: 'Kyoto, Kansai, Japan' },
    currency: 'JPY',
    currencySymbol: '¥',
    verifiedLocalsCount: 22,
    contributionsCount: 42,
    popularHighlights: ['Otagi Nenbutsu-ji 1200 Arhats', 'Kamogawa River Delta Twilight', 'Nishiki Shokunin Dashi Egg', 'Uji Morning Matcha Etiquette']
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca de Juárez',
    region: 'Oaxaca',
    country: 'Mexico',
    tagLine: 'Cradle of Indigenous Moles, Mezcal & Zapotec Artisans',
    heroImage: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80',
    description: 'A vibrant highland valley anchored in pre-Hispanic Zapotec traditions, ancestral clay ovens, seven distinct handmade moles, and generational cochineal weavers.',
    coords: { lat: 17.0732, lng: -96.7266, address: 'Oaxaca de Juárez, Mexico' },
    currency: 'MXN',
    currencySymbol: '$',
    verifiedLocalsCount: 16,
    contributionsCount: 29,
    popularHighlights: ['Abastos Smoked Pasilla Alleys', 'Teotitlán Cochineal Weaving', 'Dawn at Hierve el Agua Cliffs', 'Family Palenque Mezcal Tasting']
  },
  {
    id: 'florence',
    name: 'Florence',
    region: 'Tuscany',
    country: 'Italy',
    tagLine: 'Cradle of the Renaissance & Oltrarno Craft Bottegas',
    heroImage: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80',
    description: 'Beyond the crowded Uffizi lines lies the real Oltrarno: hand-marbled paper makers, wood restorers, quiet neighborhood trippai, and cloistered Renaissance frescoes.',
    coords: { lat: 43.7696, lng: 11.2558, address: 'Firenze, Tuscany, Italy' },
    currency: 'EUR',
    currencySymbol: '€',
    verifiedLocalsCount: 19,
    contributionsCount: 31,
    popularHighlights: ['San Frediano Marbled Paper Atelier', 'Sant’Ambrogio Morning Produce Run', 'San Miniato al Monte Sunset Chants', 'Trattoria Mario Historic Ribollita']
  }
];

export const INITIAL_CONTRIBUTORS: LocalContributor[] = [
  {
    id: 'contr-1',
    name: 'Ananthnarayan Rao',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    destinationId: 'mysuru',
    residentYears: 42,
    role: 'Heritage Architecture Researcher & Mysore Native',
    badge: 'Cultural Historian',
    bio: 'Born in Lakshmipuram. Documenting Mysore Royal Kingdom traditions, architectural secrets of Agrahara neighborhoods, and century-old sweetmakers.',
    joinedDate: '2023-01-15',
    verifiedDate: '2023-01-20',
    confirmationsReceived: 38,
    status: 'verified',
    expertise: ['Royal Architecture', 'Devaraja Market Heritage', 'Agrahara Rituals', 'Dasara Traditions']
  },
  {
    id: 'contr-2',
    name: 'Dr. Padmashree Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    destinationId: 'mysuru',
    residentYears: 34,
    role: 'Culinary Ethnographer & Vegetarian Home Chef',
    badge: 'Culinary Elder',
    bio: 'Preserving authentic Karnataka Sattvic food lore, Mylari butter secrets, jaggery syrup measurements, and temple prasada customs.',
    joinedDate: '2023-03-10',
    verifiedDate: '2023-03-14',
    confirmationsReceived: 45,
    status: 'verified',
    expertise: ['Pure Vegetarian Traditions', 'Traditional Coffee Roasts', 'Festival Recipes', 'Devaraja Produce']
  },
  {
    id: 'contr-3',
    name: 'Someshwara Swamy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    destinationId: 'mysuru',
    residentYears: 28,
    role: 'Third-Generation Mysore Silk Artisan & Weaving Master',
    badge: 'Artisan Specialist',
    bio: 'Working with pure zari gold threads and mulberry silk in Ashok Nagar. Teaching visitors how to distinguish machine knockoffs from authentic handloom GI-tagged Mysore Silk.',
    joinedDate: '2023-05-18',
    verifiedDate: '2023-05-22',
    confirmationsReceived: 29,
    status: 'verified',
    expertise: ['Mysore Silk Authentication', 'Handloom Looms', 'Artisan Guilds', 'Local Cooperatives']
  },
  {
    id: 'contr-4',
    name: 'Keiko Takahashi',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    destinationId: 'kyoto',
    residentYears: 38,
    role: 'Urasenke Tea Ceremony Master & Machiya Resident',
    badge: 'Cultural Historian',
    bio: 'Residing in Kamigyo ward near the Imperial Palace. Educating travelers on tatami etiquette, seasonal wagashi, and quiet temple contemplation.',
    joinedDate: '2023-02-12',
    verifiedDate: '2023-02-16',
    confirmationsReceived: 52,
    status: 'verified',
    expertise: ['Tea Ceremony Etiquette', 'Zen Temple Gardens', 'Traditional Machiya Preservation', 'Shojin Ryori (Vegan)']
  },
  {
    id: 'contr-5',
    name: 'Mateo Vasquez Ruiz',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    destinationId: 'oaxaca',
    residentYears: 29,
    role: 'Zapotec Traditional Cook & Mezcal Palenque Descendant',
    badge: 'Culinary Elder',
    bio: 'Born in Tlacolula valley. Dedicated to authentic wood-fired clay cooking, chilhuacle chili sourcing, and respectful indigenous market protocols.',
    joinedDate: '2023-04-05',
    verifiedDate: '2023-04-10',
    confirmationsReceived: 31,
    status: 'verified',
    expertise: ['Indigenous Moles', 'Ancestral Mezcal', 'Sunday Tianguis Etiquette', 'Organic Cochineal Dyeing']
  },
  {
    id: 'contr-6',
    name: 'Eleonora Donati',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    destinationId: 'florence',
    residentYears: 31,
    role: 'San Frediano Marbled Paper Restorer',
    badge: 'Artisan Specialist',
    bio: 'Running our family bindery on Via dei Serragli. Guiding travelers through the quiet artisan streets of Oltrarno away from overcrowded tour bus routes.',
    joinedDate: '2023-06-01',
    verifiedDate: '2023-06-05',
    confirmationsReceived: 41,
    status: 'verified',
    expertise: ['Oltrarno Artisan Bottegas', 'Traditional Bookbinding', 'Historic Tuscan Ostrich Leather', 'Neighborhood Osterias']
  }
];

export const INITIAL_CONTRIBUTIONS: LocalContribution[] = [
  // MYSURU CONTRIBUTIONS
  {
    id: 'mys-01',
    destinationId: 'mysuru',
    category: 'food',
    title: 'Guru Sweet Mart: The Royal Birthplace of Original Mysore Pak',
    description: 'Located in Sayyaji Rao Road near Devaraja Market. This is run by the direct descendants of Kakasura Madappa, the royal chef of the Wodeyars who invented the royal confection in the Amba Vilas Palace kitchens in 1935. Unlike hard commercial variations, authentic Mysore Pak here melts instantly on the tongue with pure clarified cow ghee, gram flour, and cardamoms.',
    location: {
      name: 'Guru Sweet Mart',
      area: 'Sayyaji Rao Road, Near Devaraja Market',
      lat: 12.3082,
      lng: 76.6521,
      directionsTip: 'Enter from northern gate of Devaraja market; walk 40 meters past the betel leaf stalls.'
    },
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '4:00 PM - 7:00 PM (fresh warm batch comes out of copper vats)',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 180,
      currency: '₹',
      note: '₹180 for a generous 250g box of warm pure-ghee sweet'
    },
    localTip: 'Do not refrigerate authentic Mysore Pak! Eat it within 48 hours while the ghee is fragrant. Ask specifically for the "bisi" (warm) batch straight from the back stove.',
    dietary: ['Vegetarian', 'Jain'],
    timeRequiredHours: 0.5,
    popularity: 'famous',
    contributorId: 'contr-2',
    contributorName: 'Dr. Padmashree Kulkarni',
    contributorRole: 'Culinary Ethnographer & Vegetarian Home Chef',
    verificationStatus: 'verified',
    verificationDate: '2023-03-20',
    confirmationsCount: 19,
    confirmedByLocals: ['Ananthnarayan Rao', 'Someshwara Swamy', 'Mahesh Gowda (Resident 31 yrs)'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-03-18'
  },
  {
    id: 'mys-02',
    destinationId: 'mysuru',
    category: 'food',
    title: 'Hotel Original Mylari (Nazarbad): Authentic Cloud Dosa with White Butter',
    description: 'There are many copycats with similar names across Mysuru, but the authentic shop is the modest single-room corner stall in Nazarbad. They serve only one thing: golden-crisp on the outside, feather-light cloud-soft on the inside dosas topped with a dollop of fresh churned white butter (benne) and their legendary spiced onion-coriander potato filling with fiery mint chutney.',
    location: {
      name: 'Original Mylari Hotel',
      area: 'Shop No. 79, Nazarbad Main Road',
      lat: 12.3061,
      lng: 76.6625,
      directionsTip: 'Look for the green tile wall with blue bench; if you see a fancy seating restaurant with air conditioning, you are in a fake copycat!'
    },
    images: [
      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '7:00 AM - 10:30 AM or 4:00 PM - 7:30 PM',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 90,
      currency: '₹',
      note: '₹60 for dosa, ₹30 for degree filter coffee'
    },
    localTip: 'Order two dosas together right when you sit; the cook makes them on a seasoned cast-iron skillet in batches of 6 and the queue moves fast.',
    dietary: ['Vegetarian'],
    timeRequiredHours: 0.75,
    popularity: 'famous',
    contributorId: 'contr-2',
    contributorName: 'Dr. Padmashree Kulkarni',
    contributorRole: 'Culinary Ethnographer & Vegetarian Home Chef',
    verificationStatus: 'verified',
    verificationDate: '2023-03-22',
    confirmationsCount: 27,
    confirmedByLocals: ['Ananthnarayan Rao', 'Dr. Padmashree Kulkarni', 'Sunil Mysore (Heritage Walker)'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-03-19'
  },
  {
    id: 'mys-03',
    destinationId: 'mysuru',
    category: 'markets',
    title: 'Devaraja Market: Scent of Mysore Jasmine & Betel Leaf Heritage Aisle',
    description: 'Commissioned over 130 years ago by Chamaraja Wodeyar IX. The market has 800+ vendor family stalls organized into strict functional aisles: seasonal flowers (GI-tagged Mysore Mallige jasmine), conical mounds of organic kumkum vermilion pigment, traditional betel leaves, and jaggery blocks. Walking here at 6:30 AM before tourist coaches arrive gives an unmatched window into local domestic life.',
    location: {
      name: 'Devaraja Market',
      area: 'Sayyaji Rao Road, Shivarampet',
      lat: 12.3114,
      lng: 76.6508,
      directionsTip: 'Enter via Dhanvantri Road clock tower entrance for the fragrant flower weaving section.'
    },
    images: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '6:30 AM - 8:30 AM (fresh flower arrivals from surrounding villages)',
    costInfo: {
      level: 'Free',
      estimatedAmount: 0,
      currency: '₹',
      note: 'Free entry; ₹50 for fresh jasmine garland'
    },
    localTip: 'Do not bargain with the elderly flower stringers over ₹10. Buy a string of fresh Mysore Mallige to pin to your shirt or hair—it is natural aromatherapeutic defense against the midday heat.',
    dietary: ['Vegetarian', 'Vegan'],
    timeRequiredHours: 1.5,
    popularity: 'famous',
    contributorId: 'contr-1',
    contributorName: 'Ananthnarayan Rao',
    contributorRole: 'Heritage Architecture Researcher & Mysore Native',
    verificationStatus: 'verified',
    verificationDate: '2023-01-25',
    confirmationsCount: 31,
    confirmedByLocals: ['Padmashree Kulkarni', 'Someshwara Swamy', 'Hemanth Kumar'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-01-22'
  },
  {
    id: 'mys-04',
    destinationId: 'mysuru',
    category: 'traditions',
    title: 'Chamundi Hill 1008 Steps: The Morning Pilgrim Trail & Monolithic Nandi',
    description: 'While tourists take the asphalt motor road in buses, true Mysoreans climb the historic granite 1008 steps laid down in 1659 by Dodda Devaraja Wodeyar. The trail winds through dry scrub forest where peacocks call. At step 700 rests the gigantic 16-foot monolithic Nandi bull carved out of a single black basalt boulder, anointed every morning with turmeric and marigold garlands.',
    location: {
      name: 'Chamundi Hill Footsteps',
      area: 'Foot of Chamundi Hill, Tavarekere',
      lat: 12.2854,
      lng: 76.6712,
      directionsTip: 'Ask auto-driver for "Mettlu Starting Point" (Step base) near Tavarekere lake.'
    },
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '5:45 AM - 7:30 AM (catch mist rising over the Mysore valley)',
    costInfo: {
      level: 'Free',
      estimatedAmount: 0,
      currency: '₹',
      note: 'Step climb is free; ₹30 for coconut water at step 700'
    },
    localTip: 'Start before 6:15 AM so the stone steps do not heat up under the sun. Respect the barefoot tradition from step 700 (Nandi) to the summit temple if you choose.',
    dietary: ['Vegetarian', 'Vegan'],
    timeRequiredHours: 2.5,
    popularity: 'less_known',
    contributorId: 'contr-1',
    contributorName: 'Ananthnarayan Rao',
    contributorRole: 'Heritage Architecture Researcher & Mysore Native',
    verificationStatus: 'verified',
    verificationDate: '2023-01-28',
    confirmationsCount: 22,
    confirmedByLocals: ['Padmashree Kulkarni', 'Rohan Bhat', 'Devraj Shetty'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-01-24'
  },
  {
    id: 'mys-05',
    destinationId: 'mysuru',
    category: 'heritage',
    title: 'Dodda Gadiyara: Silver Jubilee Clock Tower & Agrahara Twilight Walk',
    description: 'Built in 1927 in Indo-Saracenic and English Gothic hybrid style to commemorate 25 years of Nalwadi Krishnaraja Wodeyar’s benign rule. The clock tower stands at the threshold of the heritage Agrahara quarters. Unlike the crowded palace, standing here when the bells chime at 6:00 PM while tongawallahs clip-clop past gives the true historic pulse of Old Mysore.',
    location: {
      name: 'Silver Jubilee Clock Tower',
      area: 'Albert Victor Road, Agrahara',
      lat: 12.3089,
      lng: 76.6548,
      directionsTip: 'Situated right in front of the Town Hall and northern boundary of Chamarajapuram.'
    },
    images: [
      'https://images.unsplash.com/photo-1600100397608-f010f44e31df?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '5:30 PM - 7:00 PM during twilight lamp lighting',
    costInfo: {
      level: 'Free',
      estimatedAmount: 0,
      currency: '₹',
      note: 'Public heritage landmark'
    },
    localTip: 'Cross the street to the century-old Saraswathi Book Depot afterward to find rare Kannada literature and vintage maps of Mysore state.',
    timeRequiredHours: 1.0,
    popularity: 'hidden_gem',
    contributorId: 'contr-1',
    contributorName: 'Ananthnarayan Rao',
    contributorRole: 'Heritage Architecture Researcher & Mysore Native',
    verificationStatus: 'verified',
    verificationDate: '2023-02-02',
    confirmationsCount: 16,
    confirmedByLocals: ['Dr. Padmashree Kulkarni', 'Someshwara Swamy'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-01-30'
  },
  {
    id: 'mys-06',
    destinationId: 'mysuru',
    category: 'guides',
    title: 'Government Silk Weaving Factory: Live Pure Zari Looms Demonstration',
    description: 'Established in 1912 by the Maharaja of Mysore who imported 32 looms from Switzerland. This is the only certified birthplace of 100% pure silk woven with 0.65% real gold and silver zari thread. You can observe the giant jacquard cards clacking rhythmically and see how master weavers inspect every centimeter for royal quality.',
    location: {
      name: 'KSIC Mysore Silk Factory',
      area: 'Mananthavady Road, Ashok Nagar',
      lat: 12.2891,
      lng: 76.6432,
      directionsTip: 'Take auto to Ashok Nagar KSIC gate; entry tickets purchased directly at the heritage reception.'
    },
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '10:30 AM - 1:00 PM (when all active weaving master looms are running)',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 50,
      currency: '₹',
      note: '₹50 entry fee for the guided factory walking floor'
    },
    localTip: 'Look for the embroidered code numbers on genuine sarees at the attached store: every saree carries a unique woven serial number certifying its gold and silver ratio.',
    timeRequiredHours: 1.5,
    popularity: 'less_known',
    contributorId: 'contr-3',
    contributorName: 'Someshwara Swamy',
    contributorRole: 'Third-Generation Mysore Silk Artisan & Weaving Master',
    verificationStatus: 'verified',
    verificationDate: '2023-05-25',
    confirmationsCount: 20,
    confirmedByLocals: ['Ananthnarayan Rao', 'Kavitha Murthy'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-05-23'
  },
  {
    id: 'mys-07',
    destinationId: 'mysuru',
    category: 'hidden_gems',
    title: 'Jayalakshmi Vilas Folklore Museum: Hidden Royal Courtyard & Puppets',
    description: 'Housed inside the restored 1905 royal mansion built for Princess Jayalakshmi Ammani in Manasagangothri campus. It contains one of the finest collections of indigenous Karnataka folklore artifacts: leather shadow puppets (Togalu Gombeyaata), wooden ritual masks, carved bull carts, and ancient temple bronze lamps with zero tourist crowds.',
    location: {
      name: 'Jayalakshmi Vilas Mansion',
      area: 'Manasagangothri University Campus',
      lat: 12.3023,
      lng: 76.6215,
      directionsTip: 'Enter University of Mysore main gate on Bogadi road, bear left along Kukkarahalli lake perimeter.'
    },
    images: [
      'https://images.unsplash.com/photo-1590059390046-52f864cf4514?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '2:00 PM - 4:30 PM (peaceful quiet hours)',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 20,
      currency: '₹',
      note: '₹20 university museum maintenance ticket'
    },
    localTip: 'Combine this with a sunset walk around Kukkarahalli Lake right outside the mansion gates; birdwatchers gather here to see spot-billed pelicans nesting.',
    timeRequiredHours: 2.0,
    popularity: 'hidden_gem',
    contributorId: 'contr-1',
    contributorName: 'Ananthnarayan Rao',
    contributorRole: 'Heritage Architecture Researcher & Mysore Native',
    verificationStatus: 'verified',
    verificationDate: '2023-02-10',
    confirmationsCount: 18,
    confirmedByLocals: ['Padmashree Kulkarni', 'Prof. M. Siddaramaiah'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-02-08'
  },
  {
    id: 'mys-08',
    destinationId: 'mysuru',
    category: 'practical',
    title: 'Mysore Heritage Tonga Ride Protocols & Fair Pricing Guide',
    description: 'Mysuru’s horse-drawn carriages (Tongas) are living relics of the pre-motorized royal era, clustered near Chamaraja Circle and Palace South Gate. To support the traditional horse caretakers ethically and avoid disputes, agree on the route before stepping aboard.',
    location: {
      name: 'Palace South Gate Tonga Stand',
      area: 'Gun House Circle / Palace South Gate',
      lat: 12.3029,
      lng: 76.6554,
      directionsTip: 'Drivers wait in uniform near the palace park entrance.'
    },
    images: [
      'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '6:30 PM - 8:00 PM (when palace exterior illuminations light up the stone perimeter)',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 250,
      currency: '₹',
      note: 'Standard local rate is ₹200-₹300 for a 45-minute loop around the palace perimeter'
    },
    localTip: 'Ask for the driver to take the "Old Town Hall and Lansdowne Building" ring rather than busy main highway; it is much quieter and safer for the horses.',
    timeRequiredHours: 1.0,
    popularity: 'less_known',
    contributorId: 'contr-1',
    contributorName: 'Ananthnarayan Rao',
    contributorRole: 'Heritage Architecture Researcher & Mysore Native',
    verificationStatus: 'verified',
    verificationDate: '2023-02-15',
    confirmationsCount: 25,
    confirmedByLocals: ['Someshwara Swamy', 'Babu Rao (Tonga Guild Head)'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-02-12'
  },

  // KYOTO CONTRIBUTIONS
  {
    id: 'kyo-01',
    destinationId: 'kyoto',
    category: 'hidden_gems',
    title: 'Otagi Nenbutsu-ji: 1,200 Whimsical Stone Arhats in Sagano Hills',
    description: 'Far beyond the overcrowded Arashiyama tourist zone lies this tranquil hillside temple. Each of its 1,200 moss-covered stone statues (Rakan) was hand-carved in the 1980s by citizens under master sculptor Kocho Nishimura. Unlike solemn temple sculptures, these figures smile, drink sake, hold tennis rackets, and share deep human warmth.',
    location: {
      name: 'Otagi Nenbutsu-ji',
      area: 'Sagano, Ukyo Ward',
      lat: 35.0322,
      lng: 135.6588,
      directionsTip: 'Take Kyoto City Bus #72 from Arashiyama station to Otagi-dera-mae stop.'
    },
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '9:00 AM sharp when morning dew glistens on the green moss blankets',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 400,
      currency: '¥',
      note: '¥400 temple preservation fee'
    },
    localTip: 'Walk down the hill through the preserved Saga-Toriimoto thatched cottage street after your visit. Stop at the ancient tea house Tsutaya for fresh roasted mugicha.',
    dietary: ['Vegetarian', 'Vegan'],
    timeRequiredHours: 2.0,
    popularity: 'hidden_gem',
    contributorId: 'contr-4',
    contributorName: 'Keiko Takahashi',
    contributorRole: 'Urasenke Tea Ceremony Master & Machiya Resident',
    verificationStatus: 'verified',
    verificationDate: '2023-02-20',
    confirmationsCount: 34,
    confirmedByLocals: ['Kenji Morita', 'Yuki Sato'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-02-18'
  },
  {
    id: 'kyo-02',
    destinationId: 'kyoto',
    category: 'traditions',
    title: 'Kamogawa River Delta Twilight: The Unwritten "Equal Spacing" Custom',
    description: 'At the confluence of the Kamo and Takano rivers near Demachiyanagi, locals gather at dusk to sit along the grass embankments. By unspoken tradition dating back generations, couples and friends sit at remarkably precise equal distances of 3 to 4 meters from one another, creating an orderly, peaceful river meditation.',
    location: {
      name: 'Kamogawa River Delta',
      area: 'Demachiyanagi, Sakyo Ward',
      lat: 35.0305,
      lng: 135.7725,
      directionsTip: 'Right outside Demachiyanagi Station Exit 4; look for the turtle-shaped stepping stones.'
    },
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '5:30 PM - 7:00 PM as the sun dips behind the western Higashiyama ridges',
    costInfo: {
      level: 'Free',
      estimatedAmount: 0,
      currency: '¥',
      note: 'Free public riverside park'
    },
    localTip: 'Stop at Demachi Futaba bakery across the bridge first for their famous Mamemochi (sweet bean dumpling); eat it on the river stones while watching the herons fish.',
    timeRequiredHours: 1.5,
    popularity: 'less_known',
    contributorId: 'contr-4',
    contributorName: 'Keiko Takahashi',
    contributorRole: 'Urasenke Tea Ceremony Master & Machiya Resident',
    verificationStatus: 'verified',
    verificationDate: '2023-02-28',
    confirmationsCount: 29,
    confirmedByLocals: ['Keiko Takahashi', 'Haruto Inoue'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-02-24'
  },

  // OAXACA CONTRIBUTIONS
  {
    id: 'oax-01',
    destinationId: 'oaxaca',
    category: 'food',
    title: 'Pasillo de Humo (Smoke Hall) at Mercado 20 de Noviembre: Meat & Veg Tlacoyos',
    description: 'A sensory journey through wood smoke and sizzling tasajo, cecina enchilada, and chorizo. You pick your fresh cuts directly from the grill vendors who sear them over mesquite coals on long wire racks. Vegetarians can order fresh tlacoyos and memelas topped with charred nopales (cactus paddles), fresh quesillo cheese, and avocado leaves.',
    location: {
      name: 'Pasillo de Humo',
      area: 'Mercado 20 de Noviembre, Centro',
      lat: 17.0583,
      lng: -96.7262,
      directionsTip: 'Enter through the eastern entrance off Calle de Miguel Cabrera; follow the scent of mesquite smoke.'
    },
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '11:00 AM - 1:30 PM (freshest tortillas and cleanest coal embers)',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 140,
      currency: '$',
      note: '$120 - $180 MXN per person with tortillas, salsa tray, and grilled spring onions'
    },
    localTip: 'Once seated with your grilled meat or veg memela, local women will pass by selling woven baskets of handmade hot tortillas, limes, and radishes—buy from them to complete your meal.',
    dietary: ['Non-Vegetarian', 'Vegetarian'],
    timeRequiredHours: 1.5,
    popularity: 'famous',
    contributorId: 'contr-5',
    contributorName: 'Mateo Vasquez Ruiz',
    contributorRole: 'Zapotec Traditional Cook & Mezcal Palenque Descendant',
    verificationStatus: 'verified',
    verificationDate: '2023-04-15',
    confirmationsCount: 35,
    confirmedByLocals: ['Elena Cruz', 'Ramiro Santiago'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-04-12'
  },

  // FLORENCE CONTRIBUTIONS
  {
    id: 'flo-01',
    destinationId: 'florence',
    category: 'markets',
    title: 'Sant’Ambrogio Market: Where Florentine Nonnas Actually Shop',
    description: 'While San Lorenzo’s Mercato Centrale has turned largely into a tourist food court, Sant’Ambrogio remains the authentic beating heart of Florentine neighborhood life. Local grandmothers argue over Tuscan artichoke stems, pecorino stagionato, and fresh lampredotto cooked in aromatic tomato vegetable broth.',
    location: {
      name: 'Mercato di Sant’Ambrogio',
      area: 'Piazza Lorenzo Ghiberti, Santa Croce',
      lat: 43.7715,
      lng: 11.2682,
      directionsTip: 'East of Santa Croce; 12 minutes walk from Piazza del Duomo.'
    },
    images: [
      'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: '8:00 AM - 11:30 AM (avoid after 1:00 PM when outdoor stalls pack away)',
    costInfo: {
      level: 'Budget',
      estimatedAmount: 8,
      currency: '€',
      note: '€5-€8 for fresh morning pannino or Tuscan vegetable soup'
    },
    localTip: 'Head to the counter of Da Rocco inside the covered hall for a plate of Ribollita (traditional Tuscan bread and black kale stew). If there is a line, stand respectfully by the wooden counter.',
    dietary: ['Vegetarian', 'Non-Vegetarian'],
    timeRequiredHours: 1.5,
    popularity: 'less_known',
    contributorId: 'contr-6',
    contributorName: 'Eleonora Donati',
    contributorRole: 'San Frediano Marbled Paper Restorer',
    verificationStatus: 'verified',
    verificationDate: '2023-06-12',
    confirmationsCount: 28,
    confirmedByLocals: ['Marco Bellini', 'Sofia Conti'],
    sourceLabel: 'VERIFIED LOCAL',
    submittedAt: '2023-06-08'
  }
];

export const INITIAL_STORIES: LocalStory[] = [
  {
    id: 'story-01',
    destinationId: 'mysuru',
    title: 'If You Have Only One Evening in Mysuru: A Native’s Twilight Itinerary',
    subtitle: 'From warm butter dosas in Nazarbad to the amber illumination of the Wodeyar Palace',
    authorId: 'contr-1',
    authorName: 'Ananthnarayan Rao',
    authorRole: 'Heritage Architecture Researcher & Mysore Native',
    authorTenure: '42 years resident',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
    summary: 'Skip the standard bus tours. Follow how three generations of my family celebrate twilight in Old Mysuru on foot.',
    content: [
      'When travelers ask me how to experience Mysuru in just five hours, I always give the same advice: start with your palate at 4:30 PM, watch the artisans before dusk, and walk with the evening breeze.',
      'Begin at Original Mylari in Nazarbad. Sit on the simple wooden bench. Do not rush the cook. When that cloud-like benne dosa arrives glistening with butter churned just that morning, you are tasting the true soul of old Karnataka.',
      'From Nazarbad, walk across Chamarajapuram toward Devaraja Market. By 5:45 PM, the sun starts lowering over Chamundi Hill. The fragrance of fresh jasmine (Mysore Mallige) strings carried by flower weavers hits you long before you reach the archway.',
      'At 6:30 PM, step onto Sayyaji Rao Road and pick up a small box of warm Mysore Pak from Guru Sweet Mart. Walk toward the Silver Jubilee Clock Tower as its bronze bell echoes. By 7:00 PM, reach the northern esplanade of the Amba Vilas Palace. On Sunday evenings or festival weeks when 100,000 golden incandescent bulbs switch on in a single instant, silence falls over the crowd. That is the magic of Mysuru no commercial tour book can capture.'
    ],
    linkedContributionIds: ['mys-02', 'mys-03', 'mys-01', 'mys-05'],
    verificationDate: '2023-04-10',
    confirmationsCount: 42,
    tags: ['Evening Route', 'Vegetarian', 'Palace Lights', 'Heritage Walk']
  },
  {
    id: 'story-02',
    destinationId: 'mysuru',
    title: 'The Secrets of Mysore Pak: Why True Royalty Never Used Sugar Crystals',
    subtitle: 'A conversation with the great-grandsons of Kakasura Madappa in Sayyaji Rao Road',
    authorId: 'contr-2',
    authorName: 'Dr. Padmashree Kulkarni',
    authorRole: 'Culinary Ethnographer & Vegetarian Home Chef',
    authorTenure: '34 years resident',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    readTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
    summary: 'The difference between commercial chalky sweets and the authentic royal recipe that dissolves like silk.',
    content: [
      'In Kannada, the word "Paka" literally means the sugar syrup consistency. In 1935, royal chef Kakasura Madappa was experimenting in the palace royal kitchen with besan (gram flour), pure desi cow ghee, and sugar syrup to present a novel treat to Maharaja Krishnaraja Wodeyar IV.',
      'The Maharaja was so captivated by the honeycombed, porous texture that melted immediately on the palate that he ordered a sweet stall to be established outside the palace so every citizen could taste it.',
      'Today, many commercial brands across India make a dense, crystalline block that is dry and hard. If you visit Guru Sweet Mart on Sayyaji Rao Road, you will see the family still stirring the huge copper kadai. It is soft, porous, fragrant with pure cardamom, and must be enjoyed warm.'
    ],
    linkedContributionIds: ['mys-01'],
    verificationDate: '2023-04-15',
    confirmationsCount: 38,
    tags: ['Culinary History', 'Sweet Lore', 'Wodeyar Heritage']
  },
  {
    id: 'story-03',
    destinationId: 'kyoto',
    title: 'The Morning Silence of Sagano: Finding Serenity Beyond the Crowds',
    subtitle: 'Why walking among 1,200 smiling stone arhats heals the hurried traveler',
    authorId: 'contr-4',
    authorName: 'Keiko Takahashi',
    authorRole: 'Urasenke Tea Ceremony Master & Machiya Resident',
    authorTenure: '38 years resident',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
    summary: 'A contemplative walk through moss gardens and ancient bamboo hills far away from selfie sticks.',
    content: [
      'Kyoto has become famous across the globe, but fame brings noise to places meant for silent contemplation.',
      'When I need to reconnect with the spirit of the old capital, I take the early morning bus toward Sagano, disembarking at Otagi Nenbutsu-ji. Here, sheltered under cedar boughs, sit 1,200 stone statues of Rakan.',
      'No two are alike. One chuckles quietly, another cradles an animal, a third shares a cup with a friend. Sitting on the stone bench listening to the bamboo creak in the wind reminds us that Zen is not stern; it is deeply, warmly human.'
    ],
    linkedContributionIds: ['kyo-01', 'kyo-02'],
    verificationDate: '2023-03-05',
    confirmationsCount: 47,
    tags: ['Zen Contemplation', 'Quiet Temples', 'Sagano Morning']
  }
];

export const destinations = INITIAL_DESTINATIONS;
export const mockContributors = INITIAL_CONTRIBUTORS;
export const mockContributions = INITIAL_CONTRIBUTIONS;
export const mockStories = INITIAL_STORIES;
