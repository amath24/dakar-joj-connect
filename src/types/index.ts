export type Language = 'fr' | 'en';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TransitGuidance {
  busLines: string[]; // e.g. ['BRT Ligne 1', 'Dakar Dem Dikk Ligne 8 / 218', 'Bus AFTU TATA Ligne 44']
  terStation?: string; // e.g. 'Gare TER Diamniadio'
  brtStation?: string; // e.g. 'Station BRT Médina'
  carTaxiInfo: string; // e.g. 'Via Autoroute de l’Avenir (Sortie 11). Yango / Taxi ~25 min (~3 000 FCFA)'
  jojShuttle?: string; // e.g. 'Navette JOJ Express Ligne Bleue'
  estimatedDurationFromCenter: string; // e.g. '20 - 30 min'
}

export interface OlympicEvent {
  id: string;
  time: string;
  endTime: string;
  discipline: string;
  disciplineCategory: 'Athlétisme' | 'Natation' | 'Basketball 3×3' | 'Skateboarding' | 'Boxe' | 'Surf' | 'Cérémonie' | 'Lutte' | 'Judo' | 'Breaking' | 'Rugby à 7' | 'Taekwondo' | 'Escrime';
  eventName: string;
  venueName: string;
  venueId: string;
  status: 'EN DIRECT' | 'À venir' | 'Terminé';
  date: string; // e.g. "2026-10-22" or "22 Oct"
  isLive?: boolean;
  score?: string;
  description?: string;
  phase?: string; // "Séries", "Finale", "Demi-finale"
  gender?: 'Hommes' | 'Femmes' | 'Mixte';
  ticketPrice?: number;
  coordinates?: Coordinates;
  transitGuidance?: TransitGuidance;
}

export interface Accommodation {
  id: string;
  name: string;
  rating: number;
  isFeatured?: boolean;
  location: string;
  distanceVenue: string;
  distanceKm: number;
  tags: string[];
  pricePerNight: number;
  image: string;
  gallery?: string[];
  description: string;
  amenities: string[];
  contactPhone?: string;
  neighborhood: string;
  coordinates?: Coordinates;
  transitGuidance?: TransitGuidance;
}

export interface Restaurant {
  id: string;
  name: string;
  category: 'Locale' | 'Internationale' | 'Fast-Food';
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  description: string;
  image: string;
  specialties: string[];
  address: string;
  neighborhood: string;
  openingHours?: string;
  phone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  transitGuidance?: TransitGuidance;
}

export interface Venue {
  id: string;
  name: string;
  category: 'Tous les sites' | 'Stades' | 'Arènes' | 'Aquatique' | 'Salles';
  discipline: string;
  location: string;
  transport: string;
  transportType: 'TER' | 'BRT' | 'Navette' | 'Bus';
  isLive?: boolean;
  image: string;
  mapCoords: {
    x: number; // percentage on map SVG (0-100)
    y: number; // percentage on map SVG (0-100)
    zone: 'Dakar Plateau' | 'Diamniadio' | 'Almadies' | 'Grand Dakar' | 'Yoff';
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  capacity: number;
  description: string;
  eventsCount?: number;
  transitGuidance?: TransitGuidance;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventName: string;
  discipline: string;
  venueName: string;
  date: string;
  time: string;
  buyerName: string;
  buyerEmail: string;
  category: 'Standard' | 'Catégorie A' | 'VIP';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  bookingCode: string;
  purchasedAt: string;
}

export interface HotelBooking {
  id: string;
  hotelId: string;
  hotelName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  roomsCount: number;
  totalPrice: number;
  bookedAt: string;
}

export type ActiveTab = 'home' | 'schedule' | 'venues' | 'gastronomy' | 'accommodations' | 'cms';
