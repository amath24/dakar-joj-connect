import React from 'react';
import { ArrowRight, Ticket } from 'lucide-react';
import { Language } from '../types';
import dakarWelcomeHeroImage from '../assets/images/dakar_welcome_hero_1786831234129.jpg';

interface HeroSectionProps {
  onExploreSchedule: () => void;
  onBuyTickets: () => void;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSchedule,
  onBuyTickets,
  language
}) => {
  const content = {
    fr: {
      title1: 'Bienvenue aux JOJ',
      title2: 'Dakar 2026',
      subtitle:
        "Célébrons la jeunesse, le sport et la culture au cœur du Sénégal. Découvrez l'énergie vibrante des premiers Jeux Olympiques de la Jeunesse en Afrique.",
      ctaProgram: 'Explorer le Programme',
      ctaTickets: 'Acheter des Billets'
    },
    en: {
      title1: 'Welcome to YOG',
      title2: 'Dakar 2026',
      subtitle:
        'Celebrating youth, sport, and culture in the heart of Senegal. Experience the vibrant energy of the first Youth Olympic Games in Africa.',
      ctaProgram: 'Explore Schedule',
      ctaTickets: 'Buy Tickets'
    }
  }[language];

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white min-h-[460px] lg:min-h-[520px] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8" id="hero-section">
      {/* Background Image with warm Dakar celebration and athletes */}
      <div className="absolute inset-0 z-0">
        <img
          src={dakarWelcomeHeroImage}
          alt="Bienvenue aux JOJ Dakar 2026"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-50 transform scale-105 filter saturate-110"
        />
        {/* Warm Golden/Dakar Sunset Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-amber-950/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto py-16 sm:py-20 flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          <span className="block drop-shadow-sm">{content.title1}</span>
          <span className="block text-emerald-400 font-black mt-1 drop-shadow-md">
            {content.title2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-neutral-200 font-normal leading-relaxed mb-10 text-balance drop-shadow-xs">
          {content.subtitle}
        </p>

        {/* Call to Actions matching Image 2 */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto" id="hero-cta-buttons">
          <button
            onClick={onExploreSchedule}
            id="hero-explore-btn"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-lg shadow-emerald-950/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{content.ctaProgram}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onBuyTickets}
            id="hero-tickets-btn"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#5c6813] hover:bg-[#4d5710] rounded-lg shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-amber-300" />
            <span>{content.ctaTickets}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
