import React from 'react';
import { Calendar, Utensils, Bed, MapPin, ArrowRight } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import dakarOlympicStadiumImage from '../assets/images/dakar_olympic_stadium_1786831222603.jpg';

interface HomeFeaturedGridProps {
  onNavigate: (tab: ActiveTab) => void;
  language: Language;
}

export const HomeFeaturedGrid: React.FC<HomeFeaturedGridProps> = ({ onNavigate, language }) => {
  const content = {
    fr: {
      programTitle: 'Programme',
      programBadge: 'EN DIRECT',
      programDesc: 'Suivez les compétitions en temps réel, consultez les résultats et ne manquez aucun événement majeur.',
      sitesTitle: 'Sites',
      sitesDesc: 'Découvrez les infrastructures sportives de pointe réparties entre Dakar, Diamniadio et les côtes sénégalaises.',
      sitesLink: 'Explorer la carte',
      gastroTitle: 'Gastronomie',
      gastroDesc: 'Savourez le Thiéboudienne et d’autres délices culinaires locaux. Une expérience gustative inoubliable au cœur du village olympique.',
      gastroTags: ['Traditionnel', 'International'],
      hotelTitle: 'Hébergements',
      hotelDesc: 'Trouvez le logement idéal pour votre séjour. Des hôtels de luxe aux résidences conviviales.',
      hotelLink: 'Réserver maintenant'
    },
    en: {
      programTitle: 'Schedule',
      programBadge: 'LIVE NOW',
      programDesc: 'Follow competitions in real time, check live results, and never miss a key event.',
      sitesTitle: 'Venues',
      sitesDesc: 'Explore world-class sports infrastructures located across Dakar, Diamniadio and the coast.',
      sitesLink: 'Explore the map',
      gastroTitle: 'Gastronomy',
      gastroDesc: 'Taste authentic Thiéboudienne and savor local culinary wonders at the heart of the Olympic village.',
      gastroTags: ['Traditional', 'International'],
      hotelTitle: 'Accommodations',
      hotelDesc: 'Find your ideal stay. From luxury oceanfront resorts to welcoming guesthouses.',
      hotelLink: 'Book now'
    }
  }[language];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" id="featured-grid-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Card 1: Programme (Large card matching Image 2 top left) */}
          <div
            onClick={() => onNavigate('schedule')}
            id="card-featured-program"
            className="group relative overflow-hidden rounded-2xl bg-neutral-900 text-white min-h-[290px] p-6 sm:p-8 flex flex-col justify-end shadow-md hover:shadow-xl transition-all cursor-pointer border border-neutral-800"
          >
            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80"
              alt="Athletics competition Dakar 2026"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            
            {/* Top row: Live badge & Calendar icon */}
            <div className="relative z-10 flex items-center justify-between mb-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 border border-red-500/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] font-bold text-red-300 tracking-wider">
                  {content.programBadge}
                </span>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <Calendar className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom row: Text */}
            <div className="relative z-10 mt-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {content.programTitle}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-normal leading-relaxed">
                {content.programDesc}
              </p>
            </div>
          </div>

          {/* Bottom Row of Left Column: Gastronomie & Hébergements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 2: Gastronomie (matching Image 2 bottom-left) */}
            <div
              onClick={() => onNavigate('gastronomy')}
              id="card-featured-gastronomy"
              className="group bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Yellow Icon Badge */}
                <div className="w-11 h-11 rounded-xl bg-amber-400 text-neutral-900 flex items-center justify-center mb-4 shadow-xs">
                  <Utensils className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {content.gastroTitle}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                  {content.gastroDesc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
                {content.gastroTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[11px] font-medium text-neutral-600 bg-neutral-100 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3: Hébergements (matching Image 2 bottom-middle) */}
            <div
              onClick={() => onNavigate('accommodations')}
              id="card-featured-accommodations"
              className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Subtle background photo */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80"
                  alt="Hotel Dakar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10">
                {/* Green Icon Badge */}
                <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-4 shadow-xs">
                  <Bed className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {content.hotelTitle}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                  {content.hotelDesc}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-900">
                <span>{content.hotelLink}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Sites (Span 5 - matching Image 2 right card) */}
        <div className="lg:col-span-5 flex flex-col">
          <div
            onClick={() => onNavigate('venues')}
            id="card-featured-sites"
            className="group relative overflow-hidden rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
          >
            {/* Top image: Stadium architecture render */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-100">
              <img
                src={dakarOlympicStadiumImage}
                alt="Stade Olympique Dakar 2026"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Dakar & Diamniadio</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {content.sitesTitle}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {content.sitesDesc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 group-hover:text-emerald-950 pt-3 border-t border-neutral-100">
                <span>{content.sitesLink}</span>
                <span className="text-base">🗺️</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
