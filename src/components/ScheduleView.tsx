import React, { useState, useMemo } from 'react';
import { OlympicEvent, Language } from '../types';
import {
  CalendarCheck,
  MapPin,
  Clock,
  Search,
  Bookmark,
  BookmarkCheck,
  Ticket,
  ChevronRight,
  Sparkles,
  Radio,
  Navigation,
  Bus,
  ExternalLink
} from 'lucide-react';
import { TransitGuidanceCard } from './TransitGuidanceCard';

interface ScheduleViewProps {
  events: OlympicEvent[];
  mySchedule: string[];
  onToggleSchedule: (id: string) => void;
  onOpenMySchedule: () => void;
  onBuyTicketForEvent: (event: OlympicEvent) => void;
  language: Language;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  events,
  mySchedule,
  onToggleSchedule,
  onOpenMySchedule,
  onBuyTicketForEvent,
  language
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('Tous');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventModal, setSelectedEventModal] = useState<OlympicEvent | null>(null);

  const t = {
    fr: {
      filters: 'Filtres',
      date: 'DATE',
      today: "Aujourd'hui",
      allCalendar: 'Voir le calendrier complet',
      sportDiscipline: 'DISCIPLINE SPORTIVE',
      todayEvents: "Programme & Événements des JOJ Dakar 2026",
      showing: 'Affichage de',
      eventsFor: 'événements pour',
      myProgramBtn: 'Mon Programme',
      colTime: 'HEURE',
      colDiscipline: 'DISCIPLINE / ÉVÉNEMENT',
      colVenue: 'LIEU & TRANSPORTS',
      colStatus: 'STATUT',
      live: 'EN DIRECT',
      upcoming: 'À venir',
      finished: 'Terminé',
      searchPlaceholder: 'Rechercher des épreuves, athlètes, stades...',
      addToProgram: 'Ajouter à mon programme',
      inProgram: 'Dans mon programme',
      buyTicket: 'Billetterie',
      free: 'Gratuit',
      close: 'Fermer',
      details: 'Détails de la compétition'
    },
    en: {
      filters: 'Filters',
      date: 'DATE',
      today: 'Today',
      allCalendar: 'View full calendar',
      sportDiscipline: 'SPORT DISCIPLINE',
      todayEvents: "Dakar 2026 YOG Events & Competitions",
      showing: 'Showing',
      eventsFor: 'events for',
      myProgramBtn: 'My Schedule',
      colTime: 'TIME',
      colDiscipline: 'DISCIPLINE / EVENT',
      colVenue: 'VENUE & TRANSIT',
      colStatus: 'STATUS',
      live: 'LIVE',
      upcoming: 'Upcoming',
      finished: 'Finished',
      searchPlaceholder: 'Search events, athletes, disciplines...',
      addToProgram: 'Add to my schedule',
      inProgram: 'In my schedule',
      buyTicket: 'Get Tickets',
      free: 'Free Access',
      close: 'Close',
      details: 'Competition Details'
    }
  }[language];

  // Dynamic dates list based on events
  const dateOptions = useMemo(() => {
    const dates = Array.from(new Set(events.map((e) => e.date))).filter(Boolean);
    return [...dates, 'Tous'];
  }, [events]);

  // Dynamic disciplines list
  const allDisciplines = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.discipline))).filter(Boolean);
  }, [events]);

  const toggleDiscipline = (disc: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(disc) ? prev.filter((d) => d !== disc) : [...prev, disc]
    );
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Date filter
      if (selectedDate !== 'Tous' && evt.date !== selectedDate) {
        return false;
      }
      // Discipline filter
      if (selectedDisciplines.length > 0 && !selectedDisciplines.includes(evt.discipline)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          evt.eventName.toLowerCase().includes(q) ||
          evt.discipline.toLowerCase().includes(q) ||
          evt.venueName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [events, selectedDate, selectedDisciplines, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="schedule-page">
      
      {/* Top Search Bar & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.todayEvents}
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            {t.showing} <span className="font-semibold text-emerald-800">{filteredEvents.length}</span> {t.eventsFor} {selectedDate === 'Tous' ? 'les JOJ' : selectedDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input matching Image 9 top right */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9.5 pr-4 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-2xs"
            />
          </div>

          {/* Mon Programme Button matching Image 9 */}
          <button
            onClick={onOpenMySchedule}
            id="schedule-my-program-btn"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{t.myProgramBtn}</span>
            {mySchedule.length > 0 && (
              <span className="w-5 h-5 bg-emerald-900 text-[11px] font-bold rounded-full flex items-center justify-center">
                {mySchedule.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Event Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar (Span 3) matching Image 9 */}
        <aside className="lg:col-span-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs space-y-6" id="schedule-filters-sidebar">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            {t.filters}
          </h2>

          {/* Date Filter */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              {t.date}
            </label>
            <div className="space-y-2">
              {dateOptions.map((d) => (
                <label
                  key={d}
                  className="flex items-center gap-2.5 text-sm text-neutral-800 cursor-pointer select-none hover:text-emerald-800 transition-colors"
                >
                  <input
                    type="radio"
                    name="schedule-date"
                    value={d}
                    checked={selectedDate === d}
                    onChange={() => setSelectedDate(d)}
                    className="w-4 h-4 text-emerald-700 focus:ring-emerald-600 border-neutral-300"
                  />
                  <span>
                    {d} {d === '22 Oct' && <span className="text-xs text-neutral-500 font-medium">({t.today})</span>}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setSelectedDate('Tous')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline block pt-1"
            >
              {t.allCalendar}
            </button>
          </div>

          {/* Discipline Sportive Filter */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              {t.sportDiscipline}
            </label>
            <div className="space-y-2">
              {allDisciplines.map((disc) => {
                const isChecked = selectedDisciplines.includes(disc);
                return (
                  <label
                    key={disc}
                    className="flex items-center gap-2.5 text-sm text-neutral-800 cursor-pointer select-none hover:text-emerald-800 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDiscipline(disc)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-neutral-300"
                    />
                    <span>{disc}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Event Table (Span 9) matching Image 9 */}
        <main className="lg:col-span-9 bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden" id="schedule-events-table-wrapper">
          
          {/* Table Header with Dark Bar matching Image 9 */}
          <div className="grid grid-cols-12 bg-neutral-900 text-neutral-300 text-xs font-bold uppercase tracking-wider py-3.5 px-4 sm:px-6">
            <div className="col-span-3 sm:col-span-2">{t.colTime}</div>
            <div className="col-span-5 sm:col-span-5">{t.colDiscipline}</div>
            <div className="hidden sm:block sm:col-span-3">{t.colVenue}</div>
            <div className="col-span-4 sm:col-span-2 text-right">{t.colStatus}</div>
          </div>

          {/* Events List */}
          <div className="divide-y divide-neutral-200">
            {filteredEvents.length === 0 ? (
              <div className="py-16 text-center text-neutral-500">
                <p className="text-base font-medium">Aucun événement ne correspond à vos filtres.</p>
                <button
                  onClick={() => {
                    setSelectedDate('Tous');
                    setSelectedDisciplines(allDisciplines);
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs font-semibold text-emerald-700 underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              filteredEvents.map((evt) => {
                const isBookmarked = mySchedule.includes(evt.id);
                const isLive = evt.status === 'EN DIRECT';

                return (
                  <div
                    key={evt.id}
                    className={`grid grid-cols-12 items-center py-4 px-4 sm:px-6 hover:bg-neutral-50/80 transition-colors group cursor-pointer ${
                      isLive ? 'bg-amber-50/20' : ''
                    }`}
                    onClick={() => setSelectedEventModal(evt)}
                  >
                    {/* Time Column with Red line accent for live */}
                    <div className="col-span-3 sm:col-span-2 flex items-start gap-2">
                      <div className="text-left">
                        <div className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                          {evt.time}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium">
                          - {evt.endTime}
                        </div>
                      </div>
                    </div>

                    {/* Discipline & Event Name */}
                    <div className="col-span-5 sm:col-span-5 pr-2">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2 py-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200/60">
                          {evt.discipline}
                        </span>
                        {evt.phase && (
                          <span className="text-[11px] text-neutral-500 font-medium">
                            • {evt.phase}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                        {evt.eventName}
                      </h3>
                      <div className="sm:hidden text-xs text-neutral-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span className="truncate">{evt.venueName}</span>
                      </div>
                    </div>

                    {/* Venue (Desktop) */}
                    <div className="hidden sm:flex sm:col-span-3 items-center gap-1.5 text-xs text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="line-clamp-2">{evt.venueName}</span>
                    </div>

                    {/* Status & Actions */}
                    <div className="col-span-4 sm:col-span-2 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
                      {isLive ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                          <span className="text-xs font-extrabold text-red-700 tracking-wider">
                            {t.live}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-neutral-500">
                          {t.upcoming}
                        </span>
                      )}

                      {/* Bookmark Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSchedule(evt.id);
                        }}
                        className={`p-1.5 rounded-md transition-colors ${
                          isBookmarked
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                        }`}
                        title={isBookmarked ? t.inProgram : t.addToProgram}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 fill-emerald-700 text-emerald-700" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            
            {/* Header */}
            <div className="bg-neutral-900 text-white p-6 relative">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 text-xs font-bold bg-emerald-700 text-white rounded-full">
                  {selectedEventModal.discipline}
                </span>
                {selectedEventModal.status === 'EN DIRECT' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-extrabold">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                    EN DIRECT
                  </span>
                ) : (
                  <span className="text-xs text-neutral-400">
                    {selectedEventModal.date}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {selectedEventModal.eventName}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-neutral-700">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>
                  {selectedEventModal.time} - {selectedEventModal.endTime} ({selectedEventModal.date})
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-neutral-700">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>{selectedEventModal.venueName}</span>
              </div>

              {selectedEventModal.description && (
                <div className="p-3.5 bg-neutral-50 rounded-xl text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {selectedEventModal.description}
                </div>
              )}

              {/* Transit & Itinerary Guidance to Venue */}
              {selectedEventModal.transitGuidance && (
                <TransitGuidanceCard
                  transit={selectedEventModal.transitGuidance}
                  coordinates={selectedEventModal.coordinates}
                  title={selectedEventModal.venueName}
                  locationName={selectedEventModal.venueName}
                  language={language}
                  defaultExpanded={true}
                />
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => {
                    onToggleSchedule(selectedEventModal.id);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    mySchedule.includes(selectedEventModal.id)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>
                    {mySchedule.includes(selectedEventModal.id) ? t.inProgram : t.addToProgram}
                  </span>
                </button>

                <button
                  onClick={() => {
                    const evt = selectedEventModal;
                    setSelectedEventModal(null);
                    onBuyTicketForEvent(evt);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{t.buyTicket} ({selectedEventModal.ticketPrice ? `$${selectedEventModal.ticketPrice}` : t.free})</span>
                </button>
              </div>

              <div className="text-right pt-2">
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="text-xs text-neutral-500 hover:text-neutral-800 underline"
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
