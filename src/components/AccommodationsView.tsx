import React, { useState, useMemo } from 'react';
import { Accommodation, Language } from '../types';
import {
  Search,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Waves,
  Dumbbell,
  Check,
  Calendar,
  X,
  Phone,
  ShieldCheck,
  Navigation,
  Bus,
  ExternalLink
} from 'lucide-react';
import { TransitGuidanceCard } from './TransitGuidanceCard';
import confetti from 'canvas-confetti';

interface AccommodationsViewProps {
  accommodations: Accommodation[];
  onBookAccommodation: (hotel: Accommodation) => void;
  language: Language;
}

export const AccommodationsView: React.FC<AccommodationsViewProps> = ({
  accommodations,
  onBookAccommodation,
  language
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [maxDistance, setMaxDistance] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedHotelDetails, setSelectedHotelDetails] = useState<Accommodation | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Accommodation | null>(null);

  // Booking Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-10-21');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-26');
  const [guestsCount, setGuestsCount] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const t = {
    fr: {
      filters: 'Filtres',
      searchHotel: 'Rechercher des hôtels',
      searchPlaceholder: "Nom de l'hôtel ou zone...",
      priceRange: 'Gamme de prix (Nuit)',
      min: 'Min',
      max: 'Max',
      distance: 'Distance du site principal',
      allDistance: 'Toute distance',
      amenities: 'Équipements',
      wifi: 'WiFi gratuit',
      breakfast: 'Petit-déjeuner inclus',
      pool: 'Piscine',
      gym: 'Salle de sport',
      title: 'Trouvez votre hébergement',
      subtitle:
        'Découvrez des hébergements de qualité à proximité des sites des JOJ de Dakar. Affichage de',
      results: 'résultats',
      featured: 'À la une',
      from: 'À PARTIR DE',
      night: 'nuit',
      book: 'Réserver',
      viewDetails: 'Voir les détails',
      loadMore: "Charger plus d'hôtels",
      close: 'Fermer',
      bookingTitle: 'Réservation officielle JOJ 2026',
      confirmBooking: 'Confirmer la réservation',
      successTitle: 'Réservation confirmée !',
      successMsg: 'Un e-mail de confirmation et votre bon de séjour ont été générés.'
    },
    en: {
      filters: 'Filters',
      searchHotel: 'Search hotels',
      searchPlaceholder: 'Hotel name or area...',
      priceRange: 'Price range (Night)',
      min: 'Min',
      max: 'Max',
      distance: 'Distance from main venue',
      allDistance: 'Any distance',
      amenities: 'Amenities',
      wifi: 'Free WiFi',
      breakfast: 'Breakfast included',
      pool: 'Swimming pool',
      gym: 'Fitness center',
      title: 'Find your accommodation',
      subtitle:
        'Discover top-tier accommodations close to Dakar YOG 2026 venues. Showing',
      results: 'results',
      featured: 'Featured',
      from: 'STARTING FROM',
      night: 'night',
      book: 'Book Now',
      viewDetails: 'View details',
      loadMore: 'Load more hotels',
      close: 'Close',
      bookingTitle: 'Official YOG 2026 Booking',
      confirmBooking: 'Confirm Reservation',
      successTitle: 'Reservation Confirmed!',
      successMsg: 'A confirmation email and your hotel voucher have been generated.'
    }
  }[language];

  const amenitiesList = [
    'WiFi gratuit',
    'Petit-déjeuner inclus',
    'Piscine',
    'Salle de sport'
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter((hotel) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesLoc = hotel.location.toLowerCase().includes(q);
        const matchesNeighborhood = hotel.neighborhood.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesNeighborhood) return false;
      }
      // Price
      if (minPrice && hotel.pricePerNight < Number(minPrice)) return false;
      if (maxPrice && hotel.pricePerNight > Number(maxPrice)) return false;

      // Distance
      if (maxDistance === '1') {
        if (hotel.distanceKm > 1.5) return false;
      } else if (maxDistance === '3') {
        if (hotel.distanceKm > 3.0) return false;
      } else if (maxDistance === '5') {
        if (hotel.distanceKm > 5.0) return false;
      }

      // Amenities
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(
          (amenity) =>
            hotel.tags.includes(amenity) ||
            hotel.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [accommodations, searchQuery, minPrice, maxPrice, maxDistance, selectedAmenities]);

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !bookingHotel) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setBookingSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="accommodations-page">
      
      {/* Header matching Image 5 */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          {t.subtitle}{' '}
          <span className="font-semibold text-neutral-900">
            {filteredAccommodations.length} {t.results}
          </span>
        </p>
      </div>

      {/* Grid: Sidebar Filters + Hotel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar (Span 3) matching Image 5 */}
        <aside className="lg:col-span-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs space-y-6" id="hotel-filters-sidebar">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            {t.filters}
          </h2>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              {t.searchHotel}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-3 border-t border-neutral-100">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              {t.priceRange}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder={t.min}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-neutral-400 font-semibold">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={t.max}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Distance Filter */}
          <div className="space-y-2 pt-3 border-t border-neutral-100">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              {t.distance}
            </label>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="all">{t.allDistance}</option>
              <option value="1">&lt; 1,5 km</option>
              <option value="3">&lt; 3,0 km</option>
              <option value="5">&lt; 5,0 km</option>
            </select>
          </div>

          {/* Amenities Checkboxes */}
          <div className="space-y-2 pt-3 border-t border-neutral-100">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              {t.amenities}
            </label>
            <div className="space-y-2">
              {amenitiesList.map((amenity) => {
                const isChecked = selectedAmenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 cursor-pointer select-none hover:text-emerald-800 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-neutral-300"
                    />
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {(searchQuery || minPrice || maxPrice || maxDistance !== 'all' || selectedAmenities.length > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setMinPrice('');
                setMaxPrice('');
                setMaxDistance('all');
                setSelectedAmenities([]);
              }}
              className="w-full text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline pt-2 text-center"
            >
              Réinitialiser les filtres
            </button>
          )}
        </aside>

        {/* Main Hotel Cards List (Span 9) matching Image 5 */}
        <main className="lg:col-span-9 space-y-6" id="hotel-cards-list">
          {filteredAccommodations.length === 0 ? (
            <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center text-neutral-500">
              <p className="text-base font-medium">Aucun hébergement trouvé avec ces critères.</p>
            </div>
          ) : (
            filteredAccommodations.map((hotel) => (
              <div
                key={hotel.id}
                id={`hotel-card-${hotel.id}`}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col md:flex-row"
              >
                {/* Left Photo with "À la une" badge */}
                <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-neutral-100">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                  {hotel.isFeatured && (
                    <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
                      {t.featured}
                    </div>
                  )}
                </div>

                {/* Right Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Star Rating matching Image 5 */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                        {hotel.name}
                      </h2>
                      <div className="flex items-center gap-1 bg-amber-300/90 text-neutral-950 font-bold px-2 py-0.5 rounded-md text-xs shrink-0 shadow-2xs">
                        <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
                        <span>{hotel.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Location Pin & Distance */}
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{hotel.distanceVenue}</span>
                    </div>

                    {/* Tags Pills matching Image 5 */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {hotel.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium text-emerald-900 bg-emerald-50 rounded-full border border-emerald-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Transit Snippet: Bus & Transport quick guide */}
                    {hotel.transitGuidance && (
                      <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100/90 text-xs mb-3 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950">
                          <div className="flex items-center gap-1.5">
                            <Bus className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>Accès : {hotel.transitGuidance.busLines ? hotel.transitGuidance.busLines[0] : 'Navette JOJ'}</span>
                          </div>
                          {hotel.transitGuidance.estimatedDurationFromCenter && (
                            <span className="text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                              {hotel.transitGuidance.estimatedDurationFromCenter}
                            </span>
                          )}
                        </div>
                        {hotel.transitGuidance.terStation && (
                          <div className="text-[11px] text-neutral-600 truncate">
                            🚆 {hotel.transitGuidance.terStation}
                          </div>
                        )}
                        {hotel.transitGuidance.brtStation && (
                          <div className="text-[11px] text-neutral-600 truncate">
                            🚌 {hotel.transitGuidance.brtStation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Button matching Image 5 */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-2">
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                        {t.from}
                      </span>
                      <div className="text-xl sm:text-2xl font-extrabold text-emerald-800">
                        ${hotel.pricePerNight}{' '}
                        <span className="text-xs font-medium text-neutral-500">/ {t.night}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {hotel.coordinates && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coordinates.lat},${hotel.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Calculer l'itinéraire Google Maps"
                          className="p-2 text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/80 flex items-center justify-center cursor-pointer"
                        >
                          <Navigation className="w-4 h-4 text-emerald-700" />
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedHotelDetails(hotel)}
                        className="px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.viewDetails}
                      </button>

                      <button
                        onClick={() => {
                          setBookingHotel(hotel);
                          setBookingSuccess(false);
                        }}
                        className={`px-5 py-2 text-xs sm:text-sm font-semibold text-white rounded-lg shadow-xs transition-colors cursor-pointer ${
                          hotel.isFeatured
                            ? 'bg-[#5c6813] hover:bg-[#4d5710]'
                            : 'bg-emerald-700 hover:bg-emerald-800'
                        }`}
                      >
                        {t.book}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Charger plus d'hôtels button matching Image 5 */}
          <div className="text-center pt-4">
            <button
              onClick={() => {
                // Refresh list or reset filters
                setSelectedAmenities([]);
                setMaxDistance('all');
              }}
              id="btn-load-more-hotels"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-emerald-800 border-2 border-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            >
              {t.loadMore}
            </button>
          </div>
        </main>
      </div>

      {/* Hotel Details Modal */}
      {selectedHotelDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            {/* Header Image */}
            <div className="relative h-64 w-full bg-neutral-900">
              <img
                src={selectedHotelDetails.image}
                alt={selectedHotelDetails.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedHotelDetails(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">{selectedHotelDetails.name}</h2>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-1">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>{selectedHotelDetails.location} ({selectedHotelDetails.distanceVenue})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-300 font-bold px-3 py-1 rounded-md text-sm text-neutral-950">
                  <Star className="w-4 h-4 fill-neutral-950 text-neutral-950" />
                  <span>{selectedHotelDetails.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl">
                {selectedHotelDetails.description}
              </p>

              <div>
                <h3 className="text-sm font-bold text-neutral-900 mb-2">Équipements & Services</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedHotelDetails.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-100 p-2 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transit & Itinerary Guidance */}
              {selectedHotelDetails.transitGuidance && (
                <TransitGuidanceCard
                  transit={selectedHotelDetails.transitGuidance}
                  coordinates={selectedHotelDetails.coordinates}
                  title={selectedHotelDetails.name}
                  locationName={selectedHotelDetails.location}
                  language={language}
                  defaultExpanded={true}
                />
              )}

              {selectedHotelDetails.contactPhone && (
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Téléphone réservation : {selectedHotelDetails.contactPhone}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <div className="text-2xl font-extrabold text-emerald-800">
                  ${selectedHotelDetails.pricePerNight}{' '}
                  <span className="text-xs font-normal text-neutral-500">/ nuit</span>
                </div>
                <button
                  onClick={() => {
                    const h = selectedHotelDetails;
                    setSelectedHotelDetails(null);
                    setBookingHotel(h);
                  }}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-md"
                >
                  {t.book}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {bookingHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold block">
                  {t.bookingTitle}
                </span>
                <h3 className="text-lg font-bold text-white">{bookingHotel.name}</h3>
              </div>
              <button
                onClick={() => setBookingHotel(null)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">{t.successTitle}</h3>
                <p className="text-sm text-neutral-600">{t.successMsg}</p>
                <div className="p-4 bg-neutral-50 rounded-xl text-left text-xs space-y-1.5 border border-neutral-200">
                  <p><strong className="text-neutral-900">Hôtel :</strong> {bookingHotel.name}</p>
                  <p><strong className="text-neutral-900">Client :</strong> {guestName} ({guestEmail})</p>
                  <p><strong className="text-neutral-900">Dates :</strong> Du {checkInDate} au {checkOutDate}</p>
                  <p><strong className="text-neutral-900">Personnes :</strong> {guestsCount} Voyageurs</p>
                  <p><strong className="text-neutral-900">Code Bon :</strong> JOJ-HTL-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <button
                  onClick={() => setBookingHotel(null)}
                  className="w-full py-2.5 bg-emerald-700 text-white font-semibold rounded-lg text-sm"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Date d'arrivée</label>
                    <input
                      type="date"
                      required
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Date de départ</label>
                    <input
                      type="date"
                      required
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Nombre d'hôtes</label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Tarif / nuit</label>
                    <div className="px-3 py-2 text-xs bg-neutral-100 rounded-lg font-bold text-emerald-800">
                      ${bookingHotel.pricePerNight} USD
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Nom et Prénom</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Alain Amath"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Adresse E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: amath@dakar2026.sn"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <div className="text-xs text-neutral-500">Paiement sécurisé sur place ou en ligne</div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-sm shadow-xs transition-colors"
                  >
                    {t.confirmBooking}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
