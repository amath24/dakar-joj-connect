import React, { useState, useEffect } from 'react';
import { ActiveTab, Language, OlympicEvent, Accommodation, Restaurant, Venue } from './types';
import { dataService } from './services/dataService';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeFeaturedGrid } from './components/HomeFeaturedGrid';
import { ScheduleView } from './components/ScheduleView';
import { AccommodationsView } from './components/AccommodationsView';
import { GastronomyView } from './components/GastronomyView';
import { VenuesMapView } from './components/VenuesMapView';
import { CmsManager } from './components/CmsManager';
import { TicketModal } from './components/TicketModal';
import { MyScheduleModal } from './components/MyScheduleModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('fr');

  // Real-time state synced with Firestore / LocalStorage
  const [events, setEvents] = useState<OlympicEvent[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [mySchedule, setMySchedule] = useState<string[]>([]);

  // Modals state
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<OlympicEvent | null>(null);
  const [isMyScheduleOpen, setIsMyScheduleOpen] = useState(false);

  // Subscribe to real-time collections on mount
  useEffect(() => {
    const unsubEvents = dataService.subscribeEvents(setEvents);
    const unsubAcc = dataService.subscribeAccommodations(setAccommodations);
    const unsubResto = dataService.subscribeRestaurants(setRestaurants);
    const unsubVenues = dataService.subscribeVenues(setVenues);
    setMySchedule(dataService.getMySchedule());

    return () => {
      unsubEvents();
      unsubAcc();
      unsubResto();
      unsubVenues();
    };
  }, []);

  const handleToggleSchedule = (eventId: string) => {
    const updated = dataService.toggleMySchedule(eventId);
    setMySchedule(updated);
  };

  const handleBuyTicketForEvent = (event: OlympicEvent) => {
    setSelectedTicketEvent(event);
    setIsTicketModalOpen(true);
  };

  const handleOpenGeneralTicketing = () => {
    setSelectedTicketEvent(events[0] || null);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-neutral-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900" id="dakar-joj-app-root">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        myScheduleCount={mySchedule.length}
        onOpenMySchedule={() => setIsMyScheduleOpen(true)}
        onOpenTicketing={handleOpenGeneralTicketing}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section matching Image 2 */}
            <HeroSection
              onExploreSchedule={() => setActiveTab('schedule')}
              onBuyTickets={handleOpenGeneralTicketing}
              language={language}
            />

            {/* Featured Grid matching Image 2 */}
            <HomeFeaturedGrid
              onNavigate={(tab) => setActiveTab(tab)}
              language={language}
            />
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="animate-in fade-in duration-300">
            <ScheduleView
              events={events}
              mySchedule={mySchedule}
              onToggleSchedule={handleToggleSchedule}
              onOpenMySchedule={() => setIsMyScheduleOpen(true)}
              onBuyTicketForEvent={handleBuyTicketForEvent}
              language={language}
            />
          </div>
        )}

        {activeTab === 'venues' && (
          <div className="animate-in fade-in duration-300">
            <VenuesMapView
              venues={venues}
              language={language}
            />
          </div>
        )}

        {activeTab === 'gastronomy' && (
          <div className="animate-in fade-in duration-300">
            <GastronomyView
              restaurants={restaurants}
              language={language}
            />
          </div>
        )}

        {activeTab === 'accommodations' && (
          <div className="animate-in fade-in duration-300">
            <AccommodationsView
              accommodations={accommodations}
              onBookAccommodation={() => {}}
              language={language}
            />
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="animate-in fade-in duration-300">
            <CmsManager
              events={events}
              accommodations={accommodations}
              restaurants={restaurants}
              venues={venues}
              language={language}
            />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={setActiveTab} language={language} />

      {/* Ticketing Modal */}
      <TicketModal
        events={events}
        preselectedEvent={selectedTicketEvent}
        isOpen={isTicketModalOpen}
        onClose={() => {
          setIsTicketModalOpen(false);
          setSelectedTicketEvent(null);
        }}
        language={language}
      />

      {/* My Schedule Drawer / Modal */}
      <MyScheduleModal
        isOpen={isMyScheduleOpen}
        onClose={() => setIsMyScheduleOpen(false)}
        myScheduleIds={mySchedule}
        events={events}
        onRemoveFromSchedule={handleToggleSchedule}
        onBuyTicket={handleBuyTicketForEvent}
        language={language}
      />
    </div>
  );
}
