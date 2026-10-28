import React, { useState, useMemo } from 'react';
import { Restaurant, Language } from '../types';
import { Search, Star, ArrowRight, MapPin, Phone, Clock, Utensils, X, Sparkles, Navigation, Bus, ExternalLink } from 'lucide-react';
import { TransitGuidanceCard } from './TransitGuidanceCard';

interface GastronomyViewProps {
  restaurants: Restaurant[];
  language: Language;
}

export const GastronomyView: React.FC<GastronomyViewProps> = ({ restaurants, language }) => {
  const [selectedCategory, setSelectedCategory] = useState<'Tous' | 'Locale' | 'Internationale' | 'Fast-Food'>('Locale');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurantModal, setSelectedRestaurantModal] = useState<Restaurant | null>(null);

  const t = {
    fr: {
      title: 'Explorez la Gastronomie',
      subtitle:
        "Découvrez les saveurs riches de Dakar. De la cuisine de rue vibrante à la gastronomie internationale élégante, découvrez l'esprit culinaire de la Teranga.",
      catAll: 'Tous les restaurants',
      catLocal: 'Locale',
      catInt: 'Internationale',
      catFast: 'Fast-Food',
      searchPlaceholder: 'Rechercher des restaurants...',
      specialties: 'Spécialités de la maison',
      address: 'Adresse & Contact',
      hours: "Horaires d'ouverture",
      close: 'Fermer',
      orderOrReserve: 'Découvrir la carte complète'
    },
    en: {
      title: 'Explore Gastronomy',
      subtitle:
        'Discover the rich flavors of Dakar. From vibrant street food to elegant international dining, experience the culinary spirit of Teranga.',
      catAll: 'All Restaurants',
      catLocal: 'Local Cuisine',
      catInt: 'International',
      catFast: 'Fast-Food',
      searchPlaceholder: 'Search restaurants, dishes...',
      specialties: 'House Specialties',
      address: 'Address & Contact',
      hours: 'Opening Hours',
      close: 'Close',
      orderOrReserve: 'Explore Full Menu'
    }
  }[language];

  const categories: { id: 'Tous' | 'Locale' | 'Internationale' | 'Fast-Food'; label: string }[] = [
    { id: 'Locale', label: t.catLocal },
    { id: 'Internationale', label: t.catInt },
    { id: 'Fast-Food', label: t.catFast },
    { id: 'Tous', label: t.catAll }
  ];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((resto) => {
      // Category
      if (selectedCategory !== 'Tous' && resto.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = resto.name.toLowerCase().includes(q);
        const matchDesc = resto.description.toLowerCase().includes(q);
        const matchSpecialty = resto.specialties.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchSpecialty) return false;
      }
      return true;
    });
  }, [restaurants, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="gastronomy-page">
      
      {/* Header matching Image 7 */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Filter Bar + Search Bar matching Image 7 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        
        {/* Category Pills matching Image 7 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0" id="gastronomy-category-pills">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input matching Image 7 */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9.5 pr-4 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
          />
        </div>
      </div>

      {/* Restaurant Cards Grid matching Image 7 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="restaurant-cards-grid">
        {filteredRestaurants.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-neutral-200 p-12 text-center text-neutral-500">
            <p className="text-base font-medium">Aucun restaurant trouvé pour cette sélection.</p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-emerald-700 underline"
            >
              Voir tous les restaurants
            </button>
          </div>
        ) : (
          filteredRestaurants.map((resto) => (
            <div
              key={resto.id}
              onClick={() => setSelectedRestaurantModal(resto)}
              id={`resto-card-${resto.id}`}
              className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              {/* Photo & Top Badges */}
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={resto.image}
                    alt={resto.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Badges: Category Pill & Star Rating */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-700/90 backdrop-blur-md rounded-md tracking-wider uppercase shadow-xs">
                      {resto.category}
                    </span>

                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md text-neutral-950 font-bold px-2 py-0.5 rounded-md text-xs shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{resto.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {resto.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2 mb-3">
                    {resto.description}
                  </p>

                  {/* Transit snippet */}
                  {resto.transitGuidance && (
                    <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 text-xs text-neutral-700 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950">
                        <span className="flex items-center gap-1">
                          <Bus className="w-3.5 h-3.5 text-emerald-700" />
                          {resto.transitGuidance.busLines ? resto.transitGuidance.busLines[0] : 'Bus / Navette'}
                        </span>
                        {resto.transitGuidance.estimatedDurationFromCenter && (
                          <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                            {resto.transitGuidance.estimatedDurationFromCenter}
                          </span>
                        )}
                      </div>
                      {resto.transitGuidance.brtStation && (
                        <div className="text-[11px] text-neutral-600 truncate">
                          🚌 {resto.transitGuidance.brtStation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Price & Arrow Button matching Image 7 */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-neutral-100">
                <span className="text-sm font-extrabold text-neutral-900 tracking-wider">
                  {resto.priceRange}
                </span>

                <div className="flex items-center gap-2">
                  {resto.coordinates && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${resto.coordinates.lat},${resto.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Itinéraire Google Maps"
                      className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                    >
                      <Navigation className="w-4 h-4 text-emerald-700" />
                    </a>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRestaurantModal(resto);
                    }}
                    className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center group-hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Restaurant Menu & Detail Modal */}
      {selectedRestaurantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            {/* Header Image */}
            <div className="relative h-60 w-full bg-neutral-900">
              <img
                src={selectedRestaurantModal.image}
                alt={selectedRestaurantModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedRestaurantModal(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-600 text-white rounded-md uppercase">
                    {selectedRestaurantModal.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    {selectedRestaurantModal.name}
                  </h2>
                </div>
                <div className="text-xl font-bold text-amber-300">
                  {selectedRestaurantModal.priceRange}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <p className="text-sm text-neutral-700 leading-relaxed">
                {selectedRestaurantModal.description}
              </p>

              {/* Specialties */}
              <div>
                <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-emerald-700" />
                  <span>{t.specialties}</span>
                </h3>
                <div className="space-y-2">
                  {selectedRestaurantModal.specialties.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg text-xs sm:text-sm text-neutral-800 border border-neutral-100"
                    >
                      <span className="font-medium">{item}</span>
                      <span className="text-emerald-700 font-bold">Teranga ★</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transit & Itinerary Guidance */}
              {selectedRestaurantModal.transitGuidance && (
                <TransitGuidanceCard
                  transit={selectedRestaurantModal.transitGuidance}
                  coordinates={selectedRestaurantModal.coordinates}
                  title={selectedRestaurantModal.name}
                  locationName={selectedRestaurantModal.address}
                  language={language}
                  defaultExpanded={true}
                />
              )}

              {/* Address & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-200 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Adresse</strong>
                    <span>{selectedRestaurantModal.address}</span>
                  </div>
                </div>

                {selectedRestaurantModal.openingHours && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-neutral-900">Horaires</strong>
                      <span>{selectedRestaurantModal.openingHours}</span>
                    </div>
                  </div>
                )}
              </div>

              {selectedRestaurantModal.phone && (
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Réservation / Commande : <strong>{selectedRestaurantModal.phone}</strong></span>
                </div>
              )}

              <div className="pt-3 border-t border-neutral-200 flex justify-end">
                <button
                  onClick={() => setSelectedRestaurantModal(null)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
