import { OlympicEvent, Accommodation, Restaurant, Venue } from '../types';
import dakarOlympicStadiumImage from '../assets/images/dakar_olympic_stadium_1786831222603.jpg';

export const INITIAL_EVENTS: OlympicEvent[] = [
  {
    id: 'evt-1',
    time: '09:00',
    endTime: '12:30',
    discipline: 'Athlétisme',
    disciplineCategory: 'Athlétisme',
    eventName: '100m Hommes - Séries & Quarts',
    venueName: 'Stade Olympique Me Abdoulaye Wade',
    venueId: 'venue-wade',
    status: 'EN DIRECT',
    date: '22 Oct',
    isLive: true,
    phase: 'Séries éliminatoires',
    gender: 'Hommes',
    ticketPrice: 15,
    coordinates: { lat: 14.7303, lng: -17.1895 },
    transitGuidance: {
      busLines: ['Navette Express JOJ L1 (Gare Dakar - Stade Wade)', 'Bus DDD Ligne 218'],
      terStation: 'Gare TER Diamniadio (5 min à pied du stade)',
      carTaxiInfo: 'Autoroute à Péage de l’Avenir (Sortie 11 Diamniadio). Yango / Taxi ~25-35 min (~3 000 FCFA).',
      jojShuttle: 'Navette JOJ N1 gratuite pour les détenteurs de billets depuis la Gare TER Diamniadio.',
      estimatedDurationFromCenter: '25 min via TER'
    },
    description: 'Premier tour du 100m masculin rassemblant les meilleurs espoirs mondiaux du sprint sur la piste ultrarapide de Diamniadio.'
  },
  {
    id: 'evt-2',
    time: '13:00',
    endTime: '15:00',
    discipline: 'Natation',
    disciplineCategory: 'Natation',
    eventName: '200m Nage Libre Femmes - Finale',
    venueName: 'Centre Aquatique National Olympique',
    venueId: 'venue-aquatic',
    status: 'À venir',
    date: '22 Oct',
    isLive: false,
    phase: 'Finale pour Médaille',
    gender: 'Femmes',
    ticketPrice: 20,
    coordinates: { lat: 14.6934, lng: -17.4662 },
    transitGuidance: {
      busLines: ['BRT Ligne 1 (Station Point E - Université)', 'Dakar Dem Dikk Lignes 1, 7 & 10', 'Bus TATA Ligne 29'],
      brtStation: 'Station BRT Point E / Fann (à 200m)',
      carTaxiInfo: 'Corniche Ouest ou Boulevard Dial Diop. Taxi ~10 min depuis le Plateau (~1 500 FCFA).',
      jojShuttle: 'Navette JOJ Circuit Ouest (Plateau - Fann - Point E)',
      estimatedDurationFromCenter: '12 min'
    },
    description: 'La grande finale très disputée du 200m nage libre féminin avec remise des médailles immédiate en bord de bassin.'
  },
  {
    id: 'evt-3',
    time: '16:30',
    endTime: '18:00',
    discipline: 'Cérémonie',
    disciplineCategory: 'Cérémonie',
    eventName: 'Remise des Médailles & Spectacle Culturel',
    venueName: 'Place des Nations, Diamniadio',
    venueId: 'venue-wade',
    status: 'À venir',
    date: '22 Oct',
    isLive: false,
    phase: 'Cérémonie protocolaire',
    gender: 'Mixte',
    ticketPrice: 0,
    coordinates: { lat: 14.7303, lng: -17.1895 },
    transitGuidance: {
      busLines: ['Bus DDD 218', 'Navettes JOJ Spéciales Cérémonie'],
      terStation: 'Gare TER Diamniadio',
      carTaxiInfo: 'Autoroute à péage (Sortie 11). Parking P1 spectateurs gratuit.',
      estimatedDurationFromCenter: '25 min'
    },
    description: 'Célébration festive des vainqueurs de la première journée d’athlétisme avec animations culturelles sénégalaises, percussion Sabar et concert live.'
  },
  {
    id: 'evt-4',
    time: '19:00',
    endTime: '21:30',
    discipline: 'Basketball 3×3',
    disciplineCategory: 'Basketball 3×3',
    eventName: 'Tournoi préliminaire : Sénégal vs France',
    venueName: 'Dakar Arena',
    venueId: 'venue-arena',
    status: 'À venir',
    date: '22 Oct',
    isLive: false,
    phase: 'Phase de groupes',
    gender: 'Hommes',
    ticketPrice: 18,
    coordinates: { lat: 14.7212, lng: -17.2023 },
    transitGuidance: {
      busLines: ['Bus Dakar Dem Dikk Ligne 218 / 221', 'Navette Dakar Arena Direct'],
      terStation: 'Gare TER Diamniadio (Navette Arena en 3 min)',
      carTaxiInfo: 'Autoroute à péage (Sortie 10 Diamniadio Arena). Taxi Yango ~3 500 FCFA.',
      jojShuttle: 'Ligne Express Arena - Gare TER toutes les 5 minutes.',
      estimatedDurationFromCenter: '25 min via TER'
    },
    description: 'Choc très attendu de Basketball 3x3 dans l’ambiance survoltée des 15 000 places de la Dakar Arena.'
  },
  {
    id: 'evt-5',
    time: '09:30',
    endTime: '12:00',
    discipline: 'Skateboarding',
    disciplineCategory: 'Skateboarding',
    eventName: 'Street Hommes - Qualifications',
    venueName: 'Esplanade du Monument de la Renaissance',
    venueId: 'venue-renaissance',
    status: 'À venir',
    date: '23 Oct',
    isLive: false,
    phase: 'Qualifications',
    gender: 'Hommes',
    ticketPrice: 10,
    coordinates: { lat: 14.7222, lng: -17.4947 },
    transitGuidance: {
      busLines: ['Bus DDD Lignes 8, 14, 218', 'Bus AFTU TATA Lignes 44, 42, 67'],
      brtStation: 'Station BRT Ouakam / Mermoz (10 min en bus de liaison)',
      carTaxiInfo: 'Route de Ouakam / Corniche Ouest. Taxi ~15 min depuis le centre (~2 000 FCFA).',
      jojShuttle: 'Navette JOJ Renaissance - Corniche',
      estimatedDurationFromCenter: '15 min'
    },
    description: 'Épreuves acrobatiques de Skate Street au pied du gigantesque monument en bronze surplombant l’océan Atlantique.'
  },
  {
    id: 'evt-6',
    time: '14:00',
    endTime: '17:30',
    discipline: 'Surf',
    disciplineCategory: 'Surf',
    eventName: 'Shortboard Femmes - Séries & Quarts',
    venueName: 'Plage des Almadies & Baie de Ngor',
    venueId: 'venue-surf',
    status: 'À venir',
    date: '23 Oct',
    isLive: false,
    phase: 'Séries éliminatoires',
    gender: 'Femmes',
    ticketPrice: 12,
    coordinates: { lat: 14.7478, lng: -17.5186 },
    transitGuidance: {
      busLines: ['Bus DDD Ligne 8 (Terminus Almadies / King Fahd)', 'Bus TATA Ligne 34, 49', 'Pirogues navettes Ngor'],
      carTaxiInfo: 'Route des Almadies. Taxi ~25 min depuis le Plateau (~2 500 - 3 500 FCFA).',
      jojShuttle: 'Navette JOJ Littoral Nord (Yoff - Ngor - Almadies)',
      estimatedDurationFromCenter: '20 min'
    },
    description: 'Compétition de surf sur la droite mythique de Ngor et le reef des Almadies avec les meilleures surfeuses juniors mondiales.'
  },
  {
    id: 'evt-7',
    time: '18:00',
    endTime: '21:00',
    discipline: 'Athlétisme',
    disciplineCategory: 'Athlétisme',
    eventName: 'Finale 100m Hommes & Relais 4x100m',
    venueName: 'Stade Iba Mar Diop',
    venueId: 'venue-ibamar',
    status: 'À venir',
    date: '24 Oct',
    isLive: false,
    phase: 'Grandes Finales',
    gender: 'Mixte',
    ticketPrice: 25,
    coordinates: { lat: 14.6865, lng: -17.4497 },
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Arrêt Médina - Iba Mar Diop)', 'Bus DDD Lignes 3, 7, 10, 11', 'Bus TATA Ligne 29, 30'],
      brtStation: 'Station BRT Iba Mar Diop (accès direct par passerelle sécurisée)',
      carTaxiInfo: 'Avenue Blaise Diagne / Rue 6 Médina. Taxi ~5-10 min du Plateau (~1 000 FCFA).',
      jojShuttle: 'Navette BRT Dédiée Fans',
      estimatedDurationFromCenter: '8 min'
    },
    description: 'La grande soirée reine du sprint mondial sous les projecteurs du mythique Stade Iba Mar Diop rénové au cœur de la Médina.'
  },
  {
    id: 'evt-8',
    time: '10:00',
    endTime: '13:00',
    discipline: 'Lutte',
    disciplineCategory: 'Lutte',
    eventName: 'Tournoi de Lutte Traditionnelle & Olympique',
    venueName: 'Arène Nationale de Lutte',
    venueId: 'venue-lutte',
    status: 'À venir',
    date: '24 Oct',
    isLive: false,
    phase: 'Phase finale & Drapeaux',
    gender: 'Hommes',
    ticketPrice: 15,
    coordinates: { lat: 14.7612, lng: -17.3821 },
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Pikine)', 'Bus DDD Lignes 15, 16B', 'Bus TATA Ligne 54, 71'],
      brtStation: 'Station BRT Pikine Nord / Arène Nationale',
      terStation: 'Gare TER Pikine (à 800m)',
      carTaxiInfo: 'Route Nationale 1 ou Autoroute à Péage (Sortie Pikine). Taxi ~20 min (~2 500 FCFA).',
      jojShuttle: 'Ligne Express Navette Pikine',
      estimatedDurationFromCenter: '18 min'
    },
    description: 'Spectacle grandiose mêlant chants de bakk traditionnels et combats épiques dans le temple de la lutte sénégalaise de 22 000 places.'
  },
  {
    id: 'evt-9',
    time: '14:30',
    endTime: '18:00',
    discipline: 'Breaking',
    disciplineCategory: 'Breaking',
    eventName: 'Battles 1vs1 B-Boys & B-Girls - Quarts et Finales',
    venueName: 'Esplanade du Monument de la Renaissance',
    venueId: 'venue-renaissance',
    status: 'À venir',
    date: '25 Oct',
    isLive: false,
    phase: 'Finales mondiales',
    gender: 'Mixte',
    ticketPrice: 12,
    coordinates: { lat: 14.7222, lng: -17.4947 },
    transitGuidance: {
      busLines: ['Bus DDD Lignes 8, 14, 218', 'Bus AFTU TATA Lignes 44, 42'],
      carTaxiInfo: 'Taxi Corniche Ouest. Descente monument Renaissance (~2 000 FCFA).',
      estimatedDurationFromCenter: '15 min'
    },
    description: 'Battles de breakdance survolté au rythme des meilleurs DJs sénégalais et internationaux face au soleil couchant de l’Atlantique.'
  },
  {
    id: 'evt-10',
    time: '19:00',
    endTime: '22:00',
    discipline: 'Boxe',
    disciplineCategory: 'Boxe',
    eventName: 'Demi-finales Poids Moyens & Lourds',
    venueName: 'Stadium Marius Ndiaye',
    venueId: 'venue-marius',
    status: 'À venir',
    date: '25 Oct',
    isLive: false,
    phase: 'Demi-finales',
    gender: 'Hommes',
    ticketPrice: 15,
    coordinates: { lat: 14.7082, lng: -17.4611 },
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Bourguiba / Sicap)', 'Bus DDD 9, 10, 23', 'Bus TATA 38, 44'],
      brtStation: 'Station BRT Avenue Bourguiba',
      carTaxiInfo: 'Avenue Bourguiba, Sicap Liberté 2. Taxi ~10 min (~1 500 FCFA).',
      estimatedDurationFromCenter: '12 min'
    },
    description: 'Combats intenses pour une place en finale olympique dans le temple historique de Marius Ndiaye.'
  },
  {
    id: 'evt-11',
    time: '09:00',
    endTime: '13:30',
    discipline: 'Rugby à 7',
    disciplineCategory: 'Rugby à 7',
    eventName: 'Tournoi Masculin : Poules & Matchs de classement',
    venueName: 'Stade Léopold Sédar Senghor',
    venueId: 'venue-senghor',
    status: 'À venir',
    date: '26 Oct',
    isLive: false,
    phase: 'Poules éliminatoires',
    gender: 'Hommes',
    ticketPrice: 10,
    coordinates: { lat: 14.7483, lng: -17.4528 },
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Grand Médine / Stade Senghor)', 'Bus DDD Lignes 218, 121', 'Bus TATA Ligne 67, 34'],
      brtStation: 'Station BRT Stade Senghor',
      carTaxiInfo: 'Voie de dégagement Nord (VDN) ou Autoroute. Taxi ~15 min (~2 000 FCFA).',
      jojShuttle: 'Navette directe Stade Senghor depuis le Plateau',
      estimatedDurationFromCenter: '15 min'
    },
    description: 'Rythme endiablé du rugby à 7 avec les futures stars mondiales de l’ovale sur la grande pelouse hybride du Stade Senghor.'
  },
  {
    id: 'evt-12',
    time: '15:00',
    endTime: '18:30',
    discipline: 'Judo',
    disciplineCategory: 'Judo',
    eventName: 'Finales Individuelles & Par Équipes Mixtes',
    venueName: 'Stadium Marius Ndiaye',
    venueId: 'venue-marius',
    status: 'À venir',
    date: '26 Oct',
    isLive: false,
    phase: 'Finales & Médailles',
    gender: 'Mixte',
    ticketPrice: 15,
    coordinates: { lat: 14.7082, lng: -17.4611 },
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Bourguiba)', 'Bus DDD 9, 10', 'Bus TATA 44'],
      brtStation: 'Station BRT Bourguiba',
      carTaxiInfo: 'Avenue Bourguiba. Taxi ~1 500 FCFA.',
      estimatedDurationFromCenter: '12 min'
    },
    description: 'Ippons spectaculaires et remise des médailles olympiques de judo.'
  },
  {
    id: 'evt-13',
    time: '10:00',
    endTime: '14:00',
    discipline: 'Taekwondo',
    disciplineCategory: 'Taekwondo',
    eventName: 'Tournoi Olympique Junior - Séries & Quarts',
    venueName: 'Parc des Expositions de Diamniadio',
    venueId: 'venue-centre-expositions',
    status: 'À venir',
    date: '27 Oct',
    isLive: false,
    phase: 'Qualifications & Quarts',
    gender: 'Femmes',
    ticketPrice: 12,
    coordinates: { lat: 14.7180, lng: -17.1950 },
    transitGuidance: {
      busLines: ['Bus DDD 218', 'Navette Pôle Urbain Diamniadio'],
      terStation: 'Gare TER Diamniadio (navette 4 min)',
      carTaxiInfo: 'Autoroute de l’Avenir (Sortie 11). Yango ~3 000 FCFA.',
      estimatedDurationFromCenter: '25 min'
    },
    description: 'Technique, vélocité et précision martiale dans le complexe ultra-moderne du Parc des Expositions.'
  },
  {
    id: 'evt-14',
    time: '16:00',
    endTime: '19:30',
    discipline: 'Football',
    disciplineCategory: 'Athlétisme',
    eventName: 'Grande Finale Football Junior : Sénégal vs Brésil',
    venueName: 'Stade Olympique Me Abdoulaye Wade',
    venueId: 'venue-wade',
    status: 'À venir',
    date: '28 Oct',
    isLive: false,
    phase: 'Grande Finale Olympique',
    gender: 'Hommes',
    ticketPrice: 30,
    coordinates: { lat: 14.7303, lng: -17.1895 },
    transitGuidance: {
      busLines: ['Flotte spéciale de 100 bus Dakar Dem Dikk', 'Navettes Express TER'],
      terStation: 'Gare TER Diamniadio (trains toutes les 8 min)',
      carTaxiInfo: 'Autoroute de l’Avenir. Voies réservées JOJ pour les taxis accrédités.',
      jojShuttle: 'Navette Express Stade Wade non-stop.',
      estimatedDurationFromCenter: '25 min'
    },
    description: 'Le sommet du football junior mondial dans l’écrin de 50 000 places plein à craquer.'
  }
];

export const INITIAL_ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'hotel-radisson',
    name: 'Radisson Blu Hotel, Dakar Sea Plaza',
    rating: 4.8,
    isFeatured: true,
    location: 'Route de la Corniche Ouest, Fann',
    distanceVenue: 'à 1,2 km du Centre Aquatique',
    distanceKm: 1.2,
    neighborhood: 'Fann Résidence',
    tags: ['WiFi gratuit', 'Piscine', 'Spa', "Vue sur l'océan"],
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.6930, lng: -17.4720 },
    transitGuidance: {
      busLines: ['Bus Dakar Dem Dikk Lignes 1, 7, 10 (Arrêt Sea Plaza)', 'Bus TATA Ligne 29', 'Navette VIP JOJ'],
      brtStation: 'Station BRT Université Cheikh Anta Diop (à 600m)',
      carTaxiInfo: 'Corniche Ouest face à la mer. Taxis disponibles 24/7 devant le lobby. VTC Yango/Heetch ~1 500 FCFA vers Plateau.',
      jojShuttle: 'Navette JOJ Circuit Hôtels Ouest passant toutes les 20 min.',
      estimatedDurationFromCenter: '10 min'
    },
    description: 'Hôtel 5 étoiles face à l’Océan Atlantique intégré au complexe Sea Plaza, doté d’une piscine à débordement panoramique, de restaurants gastronomiques et d’un accès direct à la Corniche.',
    amenities: ['WiFi gratuit', 'Piscine à débordement', 'Spa & Balnéothérapie', 'Salle de sport 24/7', 'Petit-déjeuner inclus', 'Navette officielle JOJ'],
    contactPhone: '+221 33 869 33 33'
  },
  {
    id: 'hotel-terroubi',
    name: 'Terrou-Bi Resort & Marina',
    rating: 4.7,
    isFeatured: true,
    location: 'Boulevard Martin Luther King, Corniche Ouest',
    distanceVenue: 'à 2,5 km du Stade Iba Mar Diop',
    distanceKm: 2.5,
    neighborhood: 'Corniche Ouest',
    tags: ['Petit-déjeuner inclus', 'Plage privée', 'Casino', 'Marina'],
    pricePerNight: 210,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.6850, lng: -17.4650 },
    transitGuidance: {
      busLines: ['Bus DDD Ligne 1 & Ligne 3', 'Bus AFTU 29', 'Navette Terrou-Bi privée'],
      brtStation: 'Station BRT Fann Hock / Médina (800m)',
      carTaxiInfo: 'Corniche Ouest. Taxi ~1 500 FCFA pour le centre-ville. Service voiturier sécurisé 24/7.',
      jojShuttle: 'Arrêt de navette accréditée JOJ devant l’entrée principale.',
      estimatedDurationFromCenter: '8 min'
    },
    description: 'Complexe hôtelier de prestige avec plage privée de sable fin, marina privée, plusieurs restaurants gastronomiques réputés et casino.',
    amenities: ['Plage privée aménagée', 'Piscine extérieure chauffée', 'Casino', 'WiFi très haut débit', 'Petit-déjeuner buffet inclus', 'Service de conciergerie'],
    contactPhone: '+221 33 839 90 39'
  },
  {
    id: 'hotel-pullman',
    name: 'Hotel Pullman Dakar Teranga',
    rating: 4.6,
    isFeatured: false,
    location: "Place de l'Indépendance, Plateau",
    distanceVenue: 'à 1,0 km de la Gare TER Dakar',
    distanceKm: 1.0,
    neighborhood: 'Dakar Plateau',
    tags: ['WiFi gratuit', 'Piscine vue mer', 'Restaurant Teranga', 'Proche TER'],
    pricePerNight: 160,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.6680, lng: -17.4330 },
    transitGuidance: {
      busLines: ['Toutes lignes Dakar Dem Dikk Terminus Petersen / Place Indépendance', 'Ligne BRT 1 Station Petersen'],
      terStation: 'Gare TER Dakar Plateau (5 min en voiture / 10 min à pied direct pour aller à Diamniadio)',
      carTaxiInfo: 'Place de l’Indépendance. Station de taxis 24/7 au pied de l’hôtel. Accès direct au Port et à Gorée.',
      jojShuttle: 'Navette Express Gare TER - Pullman toutes les 15 min.',
      estimatedDurationFromCenter: 'Centre-ville direct'
    },
    description: 'Situé en plein cœur du quartier historique du Plateau avec vue plongeante sur l’île de Gorée et la baie de Dakar, idéal pour allier compétitions et visites culturelles.',
    amenities: ['WiFi haut débit gratuit', 'Piscine extérieure', 'Centre de remise en forme', 'Restaurant panoramique Teranga', 'Bar lounge', 'Parking sécurisé'],
    contactPhone: '+221 33 889 22 00'
  },
  {
    id: 'hotel-kingfahd',
    name: 'King Fahd Palace Hotel',
    rating: 4.7,
    isFeatured: true,
    location: 'Pointe des Almadies',
    distanceVenue: 'à 1,5 km du site de Surf des Almadies',
    distanceKm: 1.5,
    neighborhood: 'Les Almadies',
    tags: ['Piscine', 'Golf', "Vue sur l'océan", 'Plage', 'Tennis'],
    pricePerNight: 230,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.7450, lng: -17.5250 },
    transitGuidance: {
      busLines: ['Bus Dakar Dem Dikk Ligne 8 (Terminus King Fahd Palace)', 'Bus AFTU 34, 49'],
      carTaxiInfo: 'Pointe des Almadies. Taxis officiels et applications Yango/Heetch disponibles ~2 500 - 3 500 FCFA pour le Plateau.',
      jojShuttle: 'Navette Spéciale Surf & Voile JOJ 2026',
      estimatedDurationFromCenter: '22 min'
    },
    description: 'Implanté sur 35 hectares de jardins tropicaux à la pointe la plus occidentale du continent africain, avec un parcours de golf 9 trous et un centre de congrès international.',
    amenities: ['Parcours de golf 9 trous', 'Grand complexe de piscines', '4 courts de tennis', 'WiFi gratuit', 'Spa & Massages', 'Transfert aéroport & TER'],
    contactPhone: '+221 33 869 69 69'
  },
  {
    id: 'hotel-diamniadio-sheraton',
    name: 'Sheraton Diamniadio Resort & Spa',
    rating: 4.9,
    isFeatured: true,
    location: 'Pôle Urbain de Diamniadio',
    distanceVenue: 'à 800 m du Stade Abdoulaye Wade',
    distanceKm: 0.8,
    neighborhood: 'Diamniadio Pôle Urbain',
    tags: ['Piscine', 'Proche Stades', 'Navette TER', 'Spa moderne'],
    pricePerNight: 195,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.7260, lng: -17.1910 },
    transitGuidance: {
      busLines: ['Navettes internes Pôle Diamniadio', 'Bus DDD Ligne 218'],
      terStation: 'Gare TER Diamniadio (à 3 min en voiture / navette dédiée hôtel)',
      carTaxiInfo: 'Autoroute de l’Avenir Sortie 11. À 15 min de l’Aéroport International AIBD.',
      jojShuttle: 'Navette continue vers Stade Wade et Dakar Arena',
      estimatedDurationFromCenter: '25 min via TER'
    },
    description: 'Le complexe hôtelier le plus proche des sites majeurs de Diamniadio (Stade Abdoulaye Wade et Dakar Arena), doté d’équipements ultramodernes, d’un spa et de suites luxueuses.',
    amenities: ['Accès direct Stade Wade & Arena', 'Grande piscine lagon', 'Spa & Hammam', 'Restaurant gastronomique Le Baobab', 'Navette Gare TER & AIBD gratuite', 'WiFi fibre 500 Mbps'],
    contactPhone: '+221 33 879 50 00'
  },
  {
    id: 'hotel-novotel',
    name: 'Novotel Dakar Centre',
    rating: 4.5,
    isFeatured: false,
    location: 'Avenue Abdoulaye Fadiga, Plateau',
    distanceVenue: 'à 1,2 km de la Gare TER',
    distanceKm: 1.2,
    neighborhood: 'Dakar Plateau',
    tags: ['WiFi gratuit', 'Piscine vue mer', 'Restaurant', 'Centre des affaires'],
    pricePerNight: 140,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.6650, lng: -17.4310 },
    transitGuidance: {
      busLines: ['Bus DDD 1, 2, 4, 11', 'BRT Station Petersen'],
      terStation: 'Gare TER Dakar (7 min en taxi / 12 min à pied)',
      carTaxiInfo: 'Face au Port Autonome de Dakar. Taxis jaunes à la sortie. VTC ~1 000 FCFA dans le Plateau.',
      jojShuttle: 'Navette JOJ Circuit Plateau',
      estimatedDurationFromCenter: 'Centre-ville'
    },
    description: 'Idéalement placé face à l’île de Gorée dans le centre d’affaires du Plateau, avec piscine extérieure, jardin ombragé et cuisine internationale et locale.',
    amenities: ['Piscine face à la mer', 'Salle de fitness', 'Restaurant La Teranga', 'Bar de plage', 'Salles de réunion', 'WiFi gratuit'],
    contactPhone: '+221 33 849 61 61'
  },
  {
    id: 'hotel-boma',
    name: 'Boma Lifestyle Hotel',
    rating: 4.8,
    isFeatured: true,
    location: 'Route de Ngor, Almadies',
    distanceVenue: 'à 2,0 km de la Plage de Surf',
    distanceKm: 2.0,
    neighborhood: 'Ngor / Almadies',
    tags: ['Piscine tropicale', 'Design éco-chic', 'Gastronomie', 'WiFi gratuit'],
    pricePerNight: 165,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.7510, lng: -17.5140 },
    transitGuidance: {
      busLines: ['Bus DDD Ligne 8', 'Bus TATA Ligne 34, 49'],
      carTaxiInfo: 'Route de Ngor. Yango / Heetch ~2 000 FCFA depuis le Monument de la Renaissance.',
      jojShuttle: 'Navette Surf & Almadies JOJ',
      estimatedDurationFromCenter: '20 min'
    },
    description: 'Hôtel boutique éco-responsable au design africain contemporain, avec un superbe patio arboré, une piscine chauffée et un restaurant bistronomique réputé.',
    amenities: ['Piscine tropicale chauffée', 'Bar à cocktails signatures', 'Restaurant locavore', 'Espaces coworking', 'WiFi gratuit', 'Service conciergerie'],
    contactPhone: '+221 33 820 40 40'
  },
  {
    id: 'hotel-yaas',
    name: 'Yaas Hotel Dakar Almadies',
    rating: 4.4,
    isFeatured: false,
    location: 'Route des Almadies',
    distanceVenue: 'à 2,8 km du Monument de la Renaissance',
    distanceKm: 2.8,
    neighborhood: 'Les Almadies',
    tags: ['Économique chic', 'WiFi ultra-rapide', 'Petit-déjeuner inclus'],
    pricePerNight: 95,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.7420, lng: -17.5190 },
    transitGuidance: {
      busLines: ['Bus DDD Ligne 8', 'Bus AFTU 34'],
      carTaxiInfo: 'Route des Almadies. Taxis devant l’établissement. VTC ~2 000 FCFA vers le centre.',
      jojShuttle: 'Arrêt navette JOJ Almadies à 100m.',
      estimatedDurationFromCenter: '18 min'
    },
    description: 'Concept hôtelier branché et dynamique aux Almadies, idéal pour les jeunes supporters et délégations recherchant confort, connectivité et tarifs avantageux.',
    amenities: ['Smart TV & connectivité', 'Petit-déjeuner buffet inclus', 'Espace lounge convivial', 'WiFi gratuit très haut débit', 'Service bagagerie'],
    contactPhone: '+221 33 859 07 07'
  },
  {
    id: 'hotel-djoloff',
    name: 'Hôtel Djoloff',
    rating: 4.6,
    isFeatured: false,
    location: 'Rue N, Fann Hock',
    distanceVenue: 'à 1,5 km du Stade Iba Mar Diop',
    distanceKm: 1.5,
    neighborhood: 'Fann Hock',
    tags: ['Charme traditionnel', 'Rooftop vue mer', 'Restaurant sénégalais'],
    pricePerNight: 110,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.6880, lng: -17.4610 },
    transitGuidance: {
      busLines: ['Bus DDD 1, 3, 10', 'Bus TATA 29'],
      brtStation: 'Station BRT Fann Hock (300m)',
      carTaxiInfo: 'Fann Hock à deux pas de la Corniche Ouest. Taxi ~1 000 FCFA vers le Plateau.',
      jojShuttle: 'Navette JOJ Circuit Médina - Iba Mar Diop',
      estimatedDurationFromCenter: '8 min'
    },
    description: 'Établissement de charme bâti en briques de terre cuite avec un sublime toit-terrasse surplombant l’océan et une ambiance chaleureuse sénégalaise.',
    amenities: ['Rooftop bar panoramique', 'Cuisine locale raffinée', 'Concerts acoustiques en soirée', 'WiFi gratuit', 'Climatisation'],
    contactPhone: '+221 33 849 40 20'
  },
  {
    id: 'hotel-village-joj',
    name: 'Résidence Village Olympique des Jeunes',
    rating: 4.7,
    isFeatured: true,
    location: 'Campus Universitaire & Cité Olympique, Diamniadio',
    distanceVenue: 'à 500 m du Stade Me Abdoulaye Wade',
    distanceKm: 0.5,
    neighborhood: 'Diamniadio',
    tags: ['Délégations & Supporters', 'Navette TER directe', 'Grand Réfectoire'],
    pricePerNight: 75,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'
    ],
    coordinates: { lat: 14.7280, lng: -17.1850 },
    transitGuidance: {
      busLines: ['Navettes Village Olympique internes', 'Bus DDD 218'],
      terStation: 'Gare TER Diamniadio (accessible à pied ou navette en 2 min)',
      carTaxiInfo: 'Pôle Urbain Diamniadio. Accès direct autoroute Sortie 11.',
      jojShuttle: 'Hub central de toutes les navettes JOJ officielles',
      estimatedDurationFromCenter: '25 min via TER'
    },
    description: 'Hébergement officiel flambant neuf au cœur de l’ambiance des Jeux Olympiques de la Jeunesse, idéal pour vivre les JOJ au plus près des athlètes et des sites de Diamniadio.',
    amenities: ['Chambres modernes climatisées', 'Espaces sportifs et pistes d’entraînement', 'Grand réfectoire international', 'Zone fan club JOJ', 'WiFi sécurisé haut débit'],
    contactPhone: '+221 33 888 20 26'
  }
];

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'resto-loutcha',
    name: 'Chez Loutcha',
    category: 'Locale',
    rating: 4.8,
    priceRange: '$$',
    description: 'Les classiques sénégalais authentiques dans une atmosphère vibrante et accueillante.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Thiéboudienne Penda Mbaye (Riz au poisson rouge)', 'Yassa Poulet fermier mariné au feu de bois', 'Mafé bœuf onctueux à la pâte d’arachide', 'Bissap et Bouye (pain de singe) glacés'],
    address: '101 Rue Raffenel, Dakar Plateau',
    neighborhood: 'Dakar Plateau',
    openingHours: '11:30 - 23:00',
    phone: '+221 33 821 03 02',
    coordinates: { lat: 14.6730, lng: -17.4390 },
    transitGuidance: {
      busLines: ['Bus DDD 1, 2, 4, 11 (Arrêt Rue Sandaga)', 'BRT Station Petersen (à 500m)'],
      terStation: 'Gare TER Dakar Plateau (8 min à pied)',
      carTaxiInfo: 'Rue Raffenel au Plateau. Taxi ~1 000 FCFA depuis n’importe quel point du Plateau.',
      jojShuttle: 'Ligne Navette JOJ Centre-Ville',
      estimatedDurationFromCenter: '5 min'
    }
  },
  {
    id: 'resto-lagon',
    name: 'Le Lagon 1',
    category: 'Internationale',
    rating: 4.7,
    priceRange: '$$$$',
    description: 'Fruits de mer haut de gamme sur pilotis avec une vue panoramique imprenable sur l’océan et l’île de Gorée.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Plateau Royal de Fruits de Mer & Langoustes', 'Lotte rôtie aux épices de Casamance', 'Carpaccio de Saint-Jacques et mérou', 'Soufflé chaud au chocolat grand cru'],
    address: 'Route de la Petite Corniche Est',
    neighborhood: 'Plateau Corniche Est',
    openingHours: '12:00 - 00:00',
    phone: '+221 33 821 53 22',
    coordinates: { lat: 14.6640, lng: -17.4280 },
    transitGuidance: {
      busLines: ['Bus DDD 4, 11 (Arrêt Palais Présidentiel)', 'Navette Port de Dakar'],
      terStation: 'Gare TER Dakar (6 min en taxi)',
      carTaxiInfo: 'Petite Corniche Est en contrebas de l’Hôtel Novotel. Parking privé avec voiturier.',
      estimatedDurationFromCenter: '5 min'
    }
  },
  {
    id: 'resto-dibi',
    name: 'Dibi Express & Grillades',
    category: 'Fast-Food',
    rating: 4.6,
    priceRange: '$$',
    description: 'Les meilleures viandes grillées au feu de bois et repas conviviaux au cœur de la ville universitaire.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Dibi d’agneau braisé façon dibiterie traditionnelle', 'Brochettes de bœuf mariné au piment doux kinkeliba', 'Alloco bananes plantains frites', 'Sauce moutarde aux oignons caramélisés'],
    address: 'Avenue Cheikh Anta Diop, Fann Point E',
    neighborhood: 'Fann Point E',
    openingHours: '12:00 - 02:00',
    phone: '+221 33 825 10 90',
    coordinates: { lat: 14.6940, lng: -17.4640 },
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Point E - UCAD)', 'Bus DDD 1, 7, 10', 'Bus TATA 29'],
      brtStation: 'Station BRT Point E (à 100m)',
      carTaxiInfo: 'Avenue Cheikh Anta Diop. Taxi ~1 500 FCFA depuis le centre.',
      estimatedDurationFromCenter: '10 min'
    }
  },
  {
    id: 'resto-fourchette',
    name: 'La Fourchette',
    category: 'Internationale',
    rating: 4.7,
    priceRange: '$$$',
    description: 'Cuisine fusion raffinée mêlant saveurs africaines, méditerranéennes et asiatiques dans un cadre élégant.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Thon rouge mi-cuit en croûte de sésame', 'Filet de zébu aux morilles et manioc confit', 'Tarte Tatin mangue & glace vanille Bourbon', 'Cocktail signature Bissap Mojito'],
    address: 'Rue Parent, Dakar Plateau',
    neighborhood: 'Dakar Plateau',
    openingHours: '12:00 - 23:30',
    phone: '+221 33 849 52 52',
    coordinates: { lat: 14.6700, lng: -17.4350 },
    transitGuidance: {
      busLines: ['Bus DDD 1, 2, 11', 'Ligne BRT 1 Petersen'],
      terStation: 'Gare TER Dakar Plateau (5 min à pied)',
      carTaxiInfo: 'Rue Parent au Plateau. Taxis permanents à proximité de la Place de l’Indépendance.',
      estimatedDurationFromCenter: 'Centre-ville direct'
    }
  },
  {
    id: 'resto-terangastreet',
    name: 'Teranga Street Bites & Juice Bar',
    category: 'Locale',
    rating: 4.9,
    priceRange: '$',
    description: 'Les délices de la street food dakaroise : pastels dorés, fatayas croustillantes et jus locaux frais pressés.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Pastels dorés au thon frais avec sauce pimentée kaani', 'Fatayas croustillantes à la viande hachée épicée', 'Jus de Ditakh, Gingembre frais et Corossol', 'Beignets dougoub au mil'],
    address: 'Corniche Ouest, Esplanade JOJ Fann',
    neighborhood: 'Corniche Ouest',
    openingHours: '10:00 - 22:00',
    phone: '+221 77 400 12 34',
    coordinates: { lat: 14.6910, lng: -17.4700 },
    transitGuidance: {
      busLines: ['Bus DDD 1, 3, 10 (Arrêt Fann Corniche)', 'Bus TATA 29'],
      brtStation: 'Station BRT Université (400m)',
      carTaxiInfo: 'Corniche Ouest en bord de mer. Stationnement facile sur l’Esplanade.',
      jojShuttle: 'Navette JOJ Fan Zone Corniche',
      estimatedDurationFromCenter: '10 min'
    }
  },
  {
    id: 'resto-cabane-pecheur',
    name: 'La Cabane du Pêcheur',
    category: 'Locale',
    rating: 4.7,
    priceRange: '$$$',
    description: 'Poissons et fruits de mer ultra-frais débarqués directement des pirogues traditionnelles de Ngor.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Thiof braisé au feu de bois (Mérou blanc)', 'Espadon grillé aux herbes de brousse', 'Brochettes de lotte et gambas géantes', 'Attiéké ivoirien et aloko maison'],
    address: 'Plage de Ngor, face à l’Île de Ngor',
    neighborhood: 'Ngor / Almadies',
    openingHours: '12:00 - 23:00',
    phone: '+221 33 820 10 10',
    coordinates: { lat: 14.7530, lng: -17.5160 },
    transitGuidance: {
      busLines: ['Bus DDD Ligne 8 (Terminus Ngor)', 'Bus TATA Ligne 34, 49'],
      carTaxiInfo: 'Route de Ngor Plage. Taxi ~2 500 FCFA depuis le Plateau.',
      jojShuttle: 'Navette JOJ Circuit Surf & Plages',
      estimatedDurationFromCenter: '22 min'
    }
  },
  {
    id: 'resto-alkimia',
    name: 'Alkimia Restaurant & Lounge',
    category: 'Internationale',
    rating: 4.8,
    priceRange: '$$$$',
    description: 'Une expérience culinaire d’exception dans un cadre design aux Almadies, mêlant gastronomie méditerranéenne et touches africaines.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Côte de bœuf maturée aux épices locales', 'Risotto crémeux à la langouste des Almadies', 'Carpaccio de poulpe mariné aux agrumes', 'Moelleux coulant chocolat Guanaja & baobab'],
    address: 'Route des Almadies, Almadies',
    neighborhood: 'Les Almadies',
    openingHours: '12:00 - 01:00',
    phone: '+221 33 820 88 88',
    coordinates: { lat: 14.7440, lng: -17.5210 },
    transitGuidance: {
      busLines: ['Bus DDD Ligne 8 (Arrêt Almadies Centre)', 'Bus TATA 34'],
      carTaxiInfo: 'Route des Almadies. Service voiturier exclusif.',
      jojShuttle: 'Navette JOJ Hôtels Almadies',
      estimatedDurationFromCenter: '20 min'
    }
  },
  {
    id: 'resto-dibiterie-haoussa',
    name: 'Dibiterie Centrale Haoussa',
    category: 'Locale',
    rating: 4.9,
    priceRange: '$',
    description: 'La dibiterie la plus célèbre de Dakar : découpe et grillade de mouton mariné au feu de bois selon la recette ancestrale.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Dibi mouton fumé au bois de manguier dans du papier kraft', 'Oignons marinés au vinaigre et piment fort', 'Pain kinkeliba chaud', 'Thé Attaya traditionnel offert'],
    address: 'Rue 6 × Avenue Blaise Diagne, Médina',
    neighborhood: 'Médina',
    openingHours: '17:00 - 03:00',
    phone: '+221 77 638 90 90',
    coordinates: { lat: 14.6855, lng: -17.4480 },
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Arrêt Médina Rue 6)', 'Bus DDD 3, 7, 10', 'Bus TATA 29, 30'],
      brtStation: 'Station BRT Médina Rue 6 (à 50 mètres)',
      carTaxiInfo: 'Avenue Blaise Diagne angle Rue 6. Taxi ~1 000 FCFA depuis le centre.',
      estimatedDurationFromCenter: '6 min'
    }
  },
  {
    id: 'resto-le-relais',
    name: 'Le Relais Sportif de Diamniadio',
    category: 'Fast-Food',
    rating: 4.5,
    priceRange: '$$',
    description: 'Restauration rapide de qualité, grillades et buffets pour les supporters et athlètes à deux pas des stades de Diamniadio.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Burgers Teranga au bœuf braisé et fromage de chèvre', 'Plats du jour sénégalais express', 'Smoothies mangue-gingembre énergisants', 'Brochettes mixtes et frites de patates douces'],
    address: 'Esplanade du Stade Abdoulaye Wade, Diamniadio',
    neighborhood: 'Diamniadio',
    openingHours: '08:00 - 23:00',
    phone: '+221 33 879 20 26',
    coordinates: { lat: 14.7310, lng: -17.1880 },
    transitGuidance: {
      busLines: ['Navettes Express Dakar Dem Dikk', 'Navettes internes Pôle Diamniadio'],
      terStation: 'Gare TER Diamniadio (accessible à pied en 5 min)',
      carTaxiInfo: 'Autoroute à Péage Sortie 11. Grand parking spectateurs.',
      jojShuttle: 'Navette Gare TER - Relais Sportif non-stop.',
      estimatedDurationFromCenter: '25 min via TER'
    }
  },
  {
    id: 'resto-chez-katia',
    name: 'Chez Katia',
    category: 'Internationale',
    rating: 4.6,
    priceRange: '$$$',
    description: 'Institution dakaroise pour les pizzas au feu de bois croustillantes, pâtes fraîches et glaces artisanales italiennes.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    specialties: ['Pizza Napolitaine cuite au feu de bois', 'Linguine aux fruits de mer frais de Dakar', 'Glaces artisanales mangue, corossol et pistache', 'Tiramisu traditionnel'],
    address: 'Route des Almadies, près du rond-point',
    neighborhood: 'Les Almadies',
    openingHours: '12:00 - 00:00',
    phone: '+221 33 820 02 02',
    coordinates: { lat: 14.7430, lng: -17.5200 },
    transitGuidance: {
      busLines: ['Bus DDD 8', 'Bus TATA 34'],
      carTaxiInfo: 'Route des Almadies. Taxi ~2 000 FCFA depuis le centre.',
      estimatedDurationFromCenter: '18 min'
    }
  }
];

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'venue-wade',
    name: 'Stade Olympique Me Abdoulaye Wade',
    category: 'Stades',
    discipline: 'Football & Cérémonies',
    location: 'Diamniadio',
    transport: 'Train Express Régional (TER - Gare Diamniadio)',
    transportType: 'TER',
    image: dakarOlympicStadiumImage,
    mapCoords: { x: 88, y: 34, zone: 'Diamniadio' },
    coordinates: { lat: 14.7303, lng: -17.1895 },
    capacity: 50000,
    eventsCount: 12,
    transitGuidance: {
      busLines: ['Navette Express Dakar Dem Dikk JOJ L1', 'Bus DDD Ligne 218 / 221', 'Bus AFTU TATA Ligne 75'],
      terStation: 'Gare TER Diamniadio (5 min à pied via passerelle piétonne sécurisée)',
      carTaxiInfo: 'Autoroute à Péage de l’Avenir (Sortie 11 Diamniadio). Yango/Taxi ~25-35 min (~3 000 FCFA). Parking P1/P2 sécurisé de 4 000 places.',
      jojShuttle: 'Navette Express JOJ N1 gratuite pour les détenteurs de billets depuis la Gare TER.',
      estimatedDurationFromCenter: '25 min via TER'
    },
    description: 'Le chef-d’œuvre architectural de Diamniadio d’une capacité de 50 000 spectateurs, hôte de la cérémonie d’ouverture, de clôture et des grandes finales olympiques.'
  },
  {
    id: 'venue-arena',
    name: 'Dakar Arena',
    category: 'Arènes',
    discipline: 'Basketball 3×3 / Handball / Gymnastique',
    location: 'Diamniadio',
    transport: 'Train Express Régional (TER - Gare Diamniadio)',
    transportType: 'TER',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 82, y: 38, zone: 'Diamniadio' },
    coordinates: { lat: 14.7212, lng: -17.2023 },
    capacity: 15000,
    eventsCount: 10,
    transitGuidance: {
      busLines: ['Bus Dakar Dem Dikk Ligne 218', 'Ligne Express JOJ Arena'],
      terStation: 'Gare TER Diamniadio (Navette directe en 3 min)',
      carTaxiInfo: 'Autoroute de l’Avenir (Sortie 10 Arena). Taxi ~3 000 FCFA.',
      jojShuttle: 'Navette continue Gare TER - Dakar Arena toutes les 5 minutes.',
      estimatedDurationFromCenter: '25 min via TER'
    },
    description: 'Arène omnisports ultra-moderne de 15 000 places située à Diamniadio, dotée d’équipements numériques de dernière génération, d’un cube vidéo géant 4K et d’une acoustique internationale.'
  },
  {
    id: 'venue-ibamar',
    name: 'Stade Iba Mar Diop',
    category: 'Stades',
    discipline: 'Athlétisme & Rugby à 7',
    location: 'Dakar Plateau / Médina',
    transport: 'Ligne BRT 1 (Arrêt Médina - Iba Mar Diop)',
    transportType: 'BRT',
    isLive: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 30, y: 68, zone: 'Dakar Plateau' },
    coordinates: { lat: 14.6865, lng: -17.4497 },
    capacity: 20000,
    eventsCount: 16,
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Iba Mar Diop)', 'Bus Dakar Dem Dikk Lignes 3, 7, 10, 11', 'Bus AFTU TATA Lignes 29, 30, 31'],
      brtStation: 'Station BRT Iba Mar Diop (accès immédiat par parvis)',
      carTaxiInfo: 'Avenue Blaise Diagne / Rue 6 Médina. Taxi ~1 000 FCFA depuis le Plateau.',
      jojShuttle: 'Navette Fan Express Médina',
      estimatedDurationFromCenter: '8 min'
    },
    description: 'Stade historique situé au cœur vibrant de la Médina, entièrement rénové pour les JOJ avec une piste d’athlétisme 8 couloirs aux normes olympiques et un centre d’entraînement complet.'
  },
  {
    id: 'venue-aquatic',
    name: 'Centre Aquatique National Olympique',
    category: 'Aquatique',
    discipline: 'Natation, Plongeon & Water-polo',
    location: 'Point E / Fann',
    transport: 'Ligne BRT 1 & Lignes Bus DDD 1, 7, 10',
    transportType: 'BRT',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 26, y: 52, zone: 'Grand Dakar' },
    coordinates: { lat: 14.6934, lng: -17.4662 },
    capacity: 6000,
    eventsCount: 14,
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Université / Point E)', 'Bus Dakar Dem Dikk Lignes 1, 7, 10', 'Bus TATA Ligne 29'],
      brtStation: 'Station BRT Point E (à 250m)',
      carTaxiInfo: 'Boulevard Dial Diop / Corniche Ouest. Taxi ~1 500 FCFA depuis le Plateau.',
      jojShuttle: 'Navette JOJ Circuit Aquatique - Hôtels Corniche',
      estimatedDurationFromCenter: '10 min'
    },
    description: 'Bassin olympique couvert de 50m avec fosse de plongeon de 10m et tribunes de 6 000 places, équipé de systèmes de chronométrage électronique Omega de pointe.'
  },
  {
    id: 'venue-senghor',
    name: 'Stade Léopold Sédar Senghor',
    category: 'Stades',
    discipline: 'Football & Sports Collectifs',
    location: 'Grand Yoff',
    transport: 'Ligne BRT 1 & Ligne Bus DDD 218',
    transportType: 'BRT',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 40, y: 36, zone: 'Grand Dakar' },
    coordinates: { lat: 14.7483, lng: -17.4528 },
    capacity: 60000,
    eventsCount: 8,
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Stade Senghor / Grand Médine)', 'Bus DDD Lignes 218, 121', 'Bus AFTU TATA Lignes 67, 34, 42'],
      brtStation: 'Station BRT Stade Senghor (parvis principal)',
      carTaxiInfo: 'Voie de Dégagement Nord (VDN) ou Autoroute. Taxi ~2 000 FCFA depuis le centre.',
      jojShuttle: 'Navette Express Stade Senghor - Plateau',
      estimatedDurationFromCenter: '15 min'
    },
    description: 'Le plus grand stade historique de la capitale sénégalaise, complètement modernisé avec pelouse hybride, vestiaires olympiques et installations pour athlètes.'
  },
  {
    id: 'venue-surf',
    name: 'Plage des Almadies & Baie de Ngor',
    category: 'Salles',
    discipline: 'Surf, Voile & Stand-up Paddle',
    location: 'Pointe des Almadies / Ngor',
    transport: 'Navette Maritime & Ligne Bus DDD 8',
    transportType: 'Navette',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 12, y: 28, zone: 'Almadies' },
    coordinates: { lat: 14.7478, lng: -17.5186 },
    capacity: 8000,
    eventsCount: 6,
    transitGuidance: {
      busLines: ['Bus Dakar Dem Dikk Ligne 8 (Terminus King Fahd / Almadies)', 'Bus AFTU TATA Lignes 34, 49', 'Pirogues navettes Ngor'],
      carTaxiInfo: 'Route des Almadies. Taxis faciles d’accès. VTC ~2 500 - 3 500 FCFA depuis le Plateau.',
      jojShuttle: 'Navette JOJ Littoral Nord toutes les 15 min.',
      estimatedDurationFromCenter: '20 min'
    },
    description: 'Spot réputé internationalement pour sa droite mythique où s’affronteront les meilleurs surfeurs juniors sous le soleil couchant de la pointe ouest de l’Afrique.'
  },
  {
    id: 'venue-renaissance',
    name: 'Esplanade du Monument de la Renaissance',
    category: 'Salles',
    discipline: 'Skateboarding, Breaking & Escalade',
    location: 'Ouakam',
    transport: 'Bus DDD Lignes 8, 14, 218 & Bus TATA 44',
    transportType: 'Bus',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 18, y: 38, zone: 'Grand Dakar' },
    coordinates: { lat: 14.7222, lng: -17.4947 },
    capacity: 12000,
    eventsCount: 8,
    transitGuidance: {
      busLines: ['Bus Dakar Dem Dikk Lignes 8, 14, 218', 'Bus AFTU TATA Lignes 44, 42, 67'],
      brtStation: 'Station BRT Ouakam / Mermoz',
      carTaxiInfo: 'Route de Ouakam / Deux Mamelles. Taxi ~1 500 - 2 000 FCFA.',
      jojShuttle: 'Navette JOJ Renaissance - Corniche',
      estimatedDurationFromCenter: '14 min'
    },
    description: 'Site spectaculaire aménagé en skatepark et arène de street art au pied de la plus haute statue d’Afrique, avec vue panoramique sur tout Dakar et l’océan.'
  },
  {
    id: 'venue-lutte',
    name: 'Arène Nationale de Lutte',
    category: 'Arènes',
    discipline: 'Lutte Sénégalaise & Lutte Olympique',
    location: 'Pikine Nord',
    transport: 'Ligne BRT 1 & TER (Gare Pikine)',
    transportType: 'BRT',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 55, y: 44, zone: 'Grand Dakar' },
    coordinates: { lat: 14.7612, lng: -17.3821 },
    capacity: 22000,
    eventsCount: 7,
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Pikine Nord / Arène)', 'Bus DDD Lignes 15, 16B', 'Bus TATA Lignes 54, 71'],
      terStation: 'Gare TER Pikine (à 800m avec navette de liaison)',
      brtStation: 'Station BRT Arène Nationale',
      carTaxiInfo: 'Autoroute à Péage de l’Avenir (Sortie Pikine). Taxi ~2 500 FCFA.',
      jojShuttle: 'Navette Express Pikine JOJ',
      estimatedDurationFromCenter: '18 min'
    },
    description: 'Le temple emblématique de la lutte africaine d’une capacité de 22 000 places, équipé pour les compétitions de lutte traditionnelle avec frappe et de lutte gréco-romaine.'
  },
  {
    id: 'venue-marius',
    name: 'Stadium Marius Ndiaye',
    category: 'Salles',
    discipline: 'Boxe, Judo & Taekwondo',
    location: 'Sicap Liberté 2',
    transport: 'Ligne BRT 1 (Station Avenue Bourguiba)',
    transportType: 'BRT',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 32, y: 48, zone: 'Grand Dakar' },
    coordinates: { lat: 14.7082, lng: -17.4611 },
    capacity: 5000,
    eventsCount: 9,
    transitGuidance: {
      busLines: ['Ligne BRT 1 (Station Bourguiba)', 'Bus DDD 9, 10, 23', 'Bus TATA 38, 44'],
      brtStation: 'Station BRT Bourguiba / Sicap',
      carTaxiInfo: 'Avenue Bourguiba. Taxi ~1 500 FCFA depuis le Plateau.',
      jojShuttle: 'Navette JOJ Sicap - Point E',
      estimatedDurationFromCenter: '12 min'
    },
    description: 'Salle couverte historique rénovée au cœur de Dakar, haut lieu des sports de combat et des arts martiaux des Jeux Olympiques de la Jeunesse.'
  },
  {
    id: 'venue-centre-expositions',
    name: 'Parc des Expositions de Diamniadio',
    category: 'Salles',
    discipline: 'Escrime, Tennis de Table & Badminton',
    location: 'Diamniadio Pôle Urbain',
    transport: 'Train Express Régional (TER - Gare Diamniadio)',
    transportType: 'TER',
    image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=1000&q=80',
    mapCoords: { x: 85, y: 42, zone: 'Diamniadio' },
    coordinates: { lat: 14.7180, lng: -17.1950 },
    capacity: 10000,
    eventsCount: 8,
    transitGuidance: {
      busLines: ['Navettes internes Pôle Diamniadio', 'Bus DDD 218'],
      terStation: 'Gare TER Diamniadio (navette dédiée en 4 min)',
      carTaxiInfo: 'Autoroute de l’Avenir (Sortie 11). Yango ~3 000 FCFA.',
      jojShuttle: 'Navette JOJ Diamniadio Pôle Sports',
      estimatedDurationFromCenter: '25 min via TER'
    },
    description: 'Immense complexe modulaire climatisé de 10 000 m² accueillant les tournois d’escrime, de tennis de table et de badminton avec retransmission sur écrans géants.'
  }
];

