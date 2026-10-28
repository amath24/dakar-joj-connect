import React, { useState, useMemo } from 'react';
import { Venue, Language } from '../types';
import { LeafletStadiumMap } from './LeafletStadiumMap';
import { TransitGuidanceCard } from './TransitGuidanceCard';
import {
  MapPin,
  Train,
  Bus,
  Compass,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
  Radio,
  Layers,
  Sparkles,
  Users,
  CheckCircle,
  X,
  ExternalLink,
  Map as MapIcon
} from 'lucide-react';

interface VenuesMapViewProps {
  venues: Venue[];
  onSelectVenueForEvents?: (venueId: string) => void;
  language: Language;
}

export const VenuesMapView: React.FC<VenuesMapViewProps> = ({
  venues,
  onSelectVenueForEvents,
  language
}) => {
  const [activeMapMode, setActiveMapMode] = useState<'osm' | 'vector'>('osm');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous les sites');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(venues[0] || null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeVenueModal, setActiveVenueModal] = useState<Venue | null>(null);

  const t = {
    fr: {
      title: 'Sites & Stades',
      subtitle:
        'Explorez les infrastructures de classe mondiale et calculez vos itinéraires vers les stades des JOJ Dakar 2026.',
      catAll: 'Tous les sites',
      catStadiums: 'Stades',
      catArenas: 'Arènes',
      catAquatic: 'Aquatique',
      catHalls: 'Salles',
      viewDetails: 'Voir les détails',
      liveResults: 'Résultats en direct',
      getDirections: 'Itinéraire OSM',
      capacity: 'Capacité',
      transport: 'Accès & Transports',
      live: 'EN DIRECT',
      zoneDakar: 'Presqu’île de Dakar',
      zoneDiamniadio: 'Pôle Urbain de Diamniadio',
      close: 'Fermer',
      transportTER: 'Train Express Régional (TER)',
      transportBRT: 'Bus Rapid Transit (BRT)',
      venuesCount: 'sites olympiques',
      modeOsm: 'OpenStreetMap & Itinéraires',
      modeVector: 'Carte Littorale & TER'
    },
    en: {
      title: 'Venues & Stadiums',
      subtitle:
        'Explore world-class infrastructures and compute routes to stadiums for Dakar 2026 Youth Olympic Games.',
      catAll: 'All Venues',
      catStadiums: 'Stadiums',
      catArenas: 'Arenas',
      catAquatic: 'Aquatic',
      catHalls: 'Halls & Coast',
      viewDetails: 'View details',
      liveResults: 'Live Results',
      getDirections: 'OSM Route',
      capacity: 'Capacity',
      transport: 'Transport & Access',
      live: 'LIVE NOW',
      zoneDakar: 'Dakar Peninsula',
      zoneDiamniadio: 'Diamniadio Hub',
      close: 'Close',
      transportTER: 'Regional Express Train (TER)',
      transportBRT: 'Bus Rapid Transit (BRT)',
      venuesCount: 'Olympic venues',
      modeOsm: 'OpenStreetMap & Routes',
      modeVector: 'Coastal & TER Map'
    }
  }[language];

  const categories = [
    { id: 'Tous les sites', label: t.catAll },
    { id: 'Stades', label: t.catStadiums },
    { id: 'Arènes', label: t.catArenas },
    { id: 'Aquatique', label: t.catAquatic },
    { id: 'Salles', label: t.catHalls }
  ];

  const filteredVenues = useMemo(() => {
    if (selectedCategory === 'Tous les sites') return venues;
    return venues.filter((v) => v.category === selectedCategory);
  }, [venues, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="venues-page">
      
      {/* Map Switcher Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* View Mode Toggle (OpenStreetMap vs Vector Coast Map) */}
        <div className="flex items-center gap-1.5 bg-neutral-100 p-1.5 rounded-xl border border-neutral-200 shadow-2xs">
          <button
            onClick={() => setActiveMapMode('osm')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMapMode === 'osm'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{t.modeOsm}</span>
          </button>
          <button
            onClick={() => setActiveMapMode('vector')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMapMode === 'vector'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>{t.modeVector}</span>
          </button>
        </div>
      </div>

      {/* Grid: Map Section (Span 7) + Right Venues List (Span 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Map View (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {activeMapMode === 'osm' ? (
            <LeafletStadiumMap
              venues={venues}
              selectedVenue={selectedVenue}
              onSelectVenue={(v) => setSelectedVenue(v)}
              language={language}
            />
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-neutral-300/80 bg-slate-900 shadow-md h-[460px] sm:h-[540px] lg:h-[620px] select-none" id="interactive-dakar-map">
              
              {/* SVG Dakar Geographic Map Canvas */}
              <div
                className="w-full h-full relative transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: selectedVenue ? `${selectedVenue.mapCoords.x}% ${selectedVenue.mapCoords.y}%` : '50% 50%'
                }}
              >
                {/* Map Ocean & Senegal Coast SVG Graphic */}
                <svg
                  viewBox="0 0 1000 700"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Ocean Background with Dakar coastline water depth */}
                  <rect width="1000" height="700" fill="#0f172a" />
                  <path
                    d="M0,0 L1000,0 L1000,700 L0,700 Z"
                    fill="url(#oceanGradient)"
                  />

                  <defs>
                    <linearGradient id="oceanGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#082f49" />
                      <stop offset="50%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>

                    {/* Highway Patterns */}
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>

                  <rect width="1000" height="700" fill="url(#grid)" />

                  {/* Senegal Landmass contour (Cape Verde Peninsula to Diamniadio) */}
                  <path
                    d="M 120 280 C 140 240, 200 200, 300 210 C 420 220, 520 180, 680 160 C 850 140, 1000 120, 1000 700 L 400 700 C 350 650, 320 620, 280 620 C 240 620, 220 540, 260 480 C 280 430, 200 370, 140 340 C 110 320, 100 300, 120 280 Z"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="3"
                  />

                  {/* Coastal Highlights */}
                  <path
                    d="M 120 280 C 140 240, 200 200, 300 210 C 420 220, 520 180, 680 160"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />

                  {/* Île de Gorée & Île de Ngor */}
                  <circle cx="340" cy="560" r="10" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="355" y="565" fill="#94a3b8" fontSize="12" fontWeight="600">Île de Gorée</text>

                  <circle cx="110" cy="230" r="8" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="125" y="235" fill="#94a3b8" fontSize="11" fontWeight="600">Île de Ngor</text>

                  {/* Highway 1 / TER Corridor connecting Dakar to Diamniadio */}
                  <path
                    d="M 280 500 C 350 420, 480 380, 820 280"
                    stroke="#eab308"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    opacity="0.8"
                  />
                  <text x="500" y="360" fill="#fef08a" fontSize="12" fontWeight="700" letterSpacing="1">
                    CORRIDOR TER / AUTOROUTE DE L'AVENIR
                  </text>

                  {/* BRT Red Transit Line connecting Dakar Plateau to Guédiawaye */}
                  <path
                    d="M 270 540 C 260 480, 280 400, 380 320"
                    stroke="#ef4444"
                    strokeWidth="3"
                    opacity="0.8"
                  />
                  <text x="230" y="440" fill="#fca5a5" fontSize="10" fontWeight="700" transform="rotate(-60 230 440)">
                    LIGNE BRT 1
                  </text>

                  {/* Geographic Labels */}
                  <text x="210" y="580" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="1.5">
                    DAKAR VILLE
                  </text>
                  <text x="760" y="240" fill="#10b981" fontSize="18" fontWeight="800" letterSpacing="1.5">
                    DIAMNIADIO
                  </text>
                  <text x="120" y="320" fill="#94a3b8" fontSize="13" fontWeight="600">
                    Les Almadies
                  </text>
                  <text x="520" y="480" fill="#64748b" fontSize="14" fontWeight="600">
                    Rufisque
                  </text>
                </svg>

                {/* Interactive Vector Pins placed dynamically based on coords */}
                {venues.map((venue) => {
                  const isSelected = selectedVenue?.id === venue.id;
                  const isLive = venue.isLive;

                  return (
                    <div
                      key={venue.id}
                      onClick={() => setSelectedVenue(venue)}
                      style={{
                        left: `${venue.mapCoords.x}%`,
                        top: `${venue.mapCoords.y}%`
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                      title={venue.name}
                    >
                      {/* Pulsing ring for Live or Selected */}
                      {(isLive || isSelected) && (
                        <span className="absolute -inset-2.5 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
                      )}

                      {/* Marker Pin */}
                      <div
                        className={`relative flex items-center justify-center rounded-full p-2 transition-all transform ${
                          isSelected
                            ? 'bg-emerald-600 text-white scale-125 ring-4 ring-white shadow-xl'
                            : isLive
                            ? 'bg-red-600 text-white ring-2 ring-white scale-110 shadow-lg'
                            : 'bg-neutral-800 text-white hover:bg-emerald-700 hover:scale-110 border border-neutral-600 shadow-md'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />

                        {/* Small Live indicator badge */}
                        {isLive && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-slate-900 animate-pulse" />
                        )}
                      </div>

                      {/* Tooltip Label */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap pointer-events-none shadow-lg transition-opacity ${
                          isSelected
                            ? 'bg-white text-neutral-900 opacity-100 ring-1 ring-black/10'
                            : 'bg-black/80 text-white opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {venue.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Controls (+, -, Reset) */}
              <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-lg">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 2.2))}
                  className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Zoom Avant"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.8))}
                  className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Zoom Arrière"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setSelectedVenue(venues[0]);
                  }}
                  className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Réinitialiser la vue"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Map Bottom Legend */}
              <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-200 flex items-center gap-3 pointer-events-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Dakar 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span>En Direct</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-yellow-400" />
                    <span>Ligne TER</span>
                  </div>
                </div>

                {selectedVenue && (
                  <button
                    onClick={() => setActiveVenueModal(selectedVenue)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-lg pointer-events-auto transition-colors flex items-center gap-1.5"
                  >
                    <span>{selectedVenue.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Venues List matching Image 11 (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-1.5" id="venue-filter-pills">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Venues Cards */}
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1" id="venues-list-sidebar">
            {filteredVenues.map((venue) => {
              const isSelected = selectedVenue?.id === venue.id;
              const isLive = venue.isLive;

              return (
                <div
                  key={venue.id}
                  onClick={() => {
                    setSelectedVenue(venue);
                    setActiveMapMode('osm');
                  }}
                  id={`venue-card-${venue.id}`}
                  className={`bg-white rounded-xl border p-4 sm:p-5 transition-all cursor-pointer shadow-2xs hover:shadow-md ${
                    isSelected
                      ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                      : 'border-neutral-200'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Venue Photo Thumbnail */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                      {isLive && (
                        <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                          <span>LIVE</span>
                        </div>
                      )}
                    </div>

                    {/* Venue Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Discipline Tag */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200/60">
                            {venue.discipline}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                          {venue.name}
                        </h3>

                        {/* Location & Transport */}
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                          <span>{venue.location}</span>
                          <span>•</span>
                          <span className="font-medium text-neutral-700">{venue.transport}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-3 flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVenue(venue);
                            setActiveMapMode('osm');
                            setTimeout(() => {
                              document.getElementById('leaflet-stadium-itinerary-module')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 50);
                          }}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>{t.getDirections}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVenueModal(venue);
                          }}
                          className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
                        >
                          {isLive ? t.liveResults : t.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Venue Full Details Modal */}
      {activeVenueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            <div className="relative h-56 w-full bg-neutral-900">
              <img
                src={activeVenueModal.image}
                alt={activeVenueModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button
                onClick={() => setActiveVenueModal(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-600 text-white rounded-md uppercase">
                  {activeVenueModal.discipline}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {activeVenueModal.name}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl">
                {activeVenueModal.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-100 rounded-lg">
                  <strong className="block text-neutral-900 mb-0.5">{t.capacity}</strong>
                  <span className="text-emerald-800 font-bold text-sm">
                    {activeVenueModal.capacity.toLocaleString()} spectateurs
                  </span>
                </div>

                <div className="p-3 bg-neutral-100 rounded-lg">
                  <strong className="block text-neutral-900 mb-0.5">{t.transport}</strong>
                  <span className="text-neutral-700 font-medium">{activeVenueModal.transport}</span>
                </div>
              </div>

              {/* Transit & Itinerary Guidance */}
              {activeVenueModal.transitGuidance && (
                <TransitGuidanceCard
                  transit={activeVenueModal.transitGuidance}
                  coordinates={activeVenueModal.coordinates}
                  title={activeVenueModal.name}
                  locationName={activeVenueModal.location}
                  language={language}
                  defaultExpanded={true}
                />
              )}

              {/* Direct Maps Route Action */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-3">
                <a
                  href={`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=14.6715%2C-17.4326%3B${activeVenueModal.coordinates?.lat || 14.7303}%2C${activeVenueModal.coordinates?.lng || -17.1895}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Itinéraire OpenStreetMap</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>

                <button
                  onClick={() => setActiveVenueModal(null)}
                  className="px-5 py-2 bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg hover:bg-neutral-300 cursor-pointer"
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

