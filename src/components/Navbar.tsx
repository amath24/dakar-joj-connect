import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActiveTab, Language } from '../types';
import { Globe, CalendarCheck, Database, Menu, X, Ticket } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  myScheduleCount: number;
  onOpenMySchedule: () => void;
  onOpenTicketing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  myScheduleCount,
  onOpenMySchedule,
  onOpenTicketing
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    fr: {
      home: 'Accueil',
      schedule: 'Programme',
      venues: 'Sites & Stades',
      gastronomy: 'Gastronomie',
      accommodations: 'Hébergements',
      cms: 'CMS & Données',
      mySchedule: 'Mon Programme',
      tickets: 'Billetterie',
      langName: 'Français'
    },
    en: {
      home: 'Home',
      schedule: 'Schedule',
      venues: 'Venues',
      gastronomy: 'Gastronomy',
      accommodations: 'Accommodations',
      cms: 'CMS & Database',
      mySchedule: 'My Schedule',
      tickets: 'Tickets',
      langName: 'English'
    }
  }[language];

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'schedule', label: t.schedule },
    { id: 'venues', label: t.venues },
    { id: 'gastronomy', label: t.gastronomy },
    { id: 'accommodations', label: t.accommodations }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors shadow-xs" id="app-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand / Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none transition-transform active:scale-98"
            id="nav-logo-btn"
            title="Dakar JOJ Connect Accueil"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3" id="desktop-nav-menu">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                    isActive
                      ? 'text-emerald-800 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.75 bg-emerald-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="hidden md:flex items-center space-x-3" id="nav-actions-right">
            
            {/* Quick Tickets Button */}
            <button
              onClick={onOpenTicketing}
              id="nav-tickets-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-200 transition-colors cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>{t.tickets}</span>
            </button>

            {/* My Schedule Modal Button */}
            <button
              onClick={onOpenMySchedule}
              id="nav-my-schedule-btn"
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-full transition-colors cursor-pointer"
              title="Consulter mon programme personnalisé"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.mySchedule}</span>
              {myScheduleCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-emerald-700 rounded-full min-w-4 h-4">
                  {myScheduleCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              id="nav-language-toggle"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-md cursor-pointer hover:bg-neutral-50"
              title="Changer de langue / Switch language"
            >
              <Globe className="w-4 h-4 text-neutral-500" />
              <span>{t.langName}</span>
            </button>

            {/* CMS / Admin Panel Access */}
            <button
              onClick={() => setActiveTab('cms')}
              id="nav-cms-btn"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'cms'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-800 text-neutral-100 hover:bg-neutral-900'
              }`}
              title="Gestion de contenu & Synchronisation Firebase"
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.cms}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenMySchedule}
              className="relative p-2 text-neutral-600 hover:text-neutral-900"
              title="Mon programme"
            >
              <CalendarCheck className="w-5 h-5 text-emerald-700" />
              {myScheduleCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold text-white bg-emerald-700 rounded-full flex items-center justify-center">
                  {myScheduleCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
              id="mobile-hamburger-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2" id="mobile-menu-drawer">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenTicketing();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold bg-emerald-700 text-white rounded-lg"
            >
              <Ticket className="w-4 h-4" />
              <span>{t.tickets}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('cms');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold bg-neutral-900 text-white rounded-lg"
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>{t.cms}</span>
            </button>

            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-neutral-600 bg-neutral-100 rounded-lg"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'fr' ? 'Switch to English' : 'Passer en Français'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
