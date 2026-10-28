import React from 'react';
import { Logo } from './Logo';
import { ActiveTab, Language } from '../types';
import { Heart, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const t = {
    fr: {
      copyright: '© 2026 Dakar Youth Olympic Games. Tous droits réservés.',
      privacy: 'Politique de confidentialité',
      terms: "Conditions d'utilisation",
      support: "Contacter l'assistance",
      press: 'Kit de presse',
      tagline: 'Premiers Jeux Olympiques de la Jeunesse en Afrique • Teranga & Excellence Sportive'
    },
    en: {
      copyright: '© 2026 Dakar Youth Olympic Games. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      support: 'Contact Support',
      press: 'Press Kit',
      tagline: 'First Youth Olympic Games in Africa • Teranga & Athletic Excellence'
    }
  }[language];

  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Logo size="sm" />
            <span className="text-xs text-neutral-500 max-w-sm">
              {t.tagline}
            </span>
          </div>

          {/* Legal Links matching Image 2 */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-600">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-emerald-800 transition-colors">
              {t.privacy}
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-emerald-800 transition-colors">
              {t.terms}
            </a>
            <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-emerald-800 transition-colors">
              {t.support}
            </a>
            <a href="#press" onClick={(e) => e.preventDefault()} className="hover:text-emerald-800 transition-colors">
              {t.press}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4 text-center">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-1">
            <span>Dakar JOJ Connect</span>
            <span className="text-emerald-600 font-semibold">• Sénégal 🇸🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
