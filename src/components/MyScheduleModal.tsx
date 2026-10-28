import React from 'react';
import { OlympicEvent, Language } from '../types';
import { CalendarCheck, X, Clock, MapPin, Trash2, Ticket, Sparkles } from 'lucide-react';

interface MyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  myScheduleIds: string[];
  events: OlympicEvent[];
  onRemoveFromSchedule: (id: string) => void;
  onBuyTicket: (event: OlympicEvent) => void;
  language: Language;
}

export const MyScheduleModal: React.FC<MyScheduleModalProps> = ({
  isOpen,
  onClose,
  myScheduleIds,
  events,
  onRemoveFromSchedule,
  onBuyTicket,
  language
}) => {
  if (!isOpen) return null;

  const bookmarkedEvents = events.filter((e) => myScheduleIds.includes(e.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in" id="my-schedule-modal">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-neutral-200 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-bold text-white">Mon Programme Personnalisé</h3>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {bookmarkedEvents.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <CalendarCheck className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm font-medium">Votre programme est actuellement vide.</p>
              <p className="text-xs text-neutral-400 mt-1">
                Explorez l'onglet Programme et cliquez sur l'icône marque-page pour composer votre itinéraire.
              </p>
            </div>
          ) : (
            bookmarkedEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {evt.discipline}
                    </span>
                    <span className="text-xs font-bold text-neutral-900">{evt.date}</span>
                    {evt.status === 'EN DIRECT' && (
                      <span className="text-[9px] font-extrabold bg-red-600 text-white px-1.5 py-0.5 rounded-full">
                        LIVE
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-neutral-900 leading-snug">{evt.eventName}</h4>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{evt.time} - {evt.endTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="truncate max-w-[150px]">{evt.venueName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onBuyTicket(evt);
                    }}
                    className="p-2 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs"
                    title="Acheter billet"
                  >
                    <Ticket className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveFromSchedule(evt.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs"
                    title="Retirer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
          <span>{bookmarkedEvents.length} épreuves enregistrées</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white font-semibold rounded-lg text-xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
