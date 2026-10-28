import React, { useState } from 'react';
import { OlympicEvent, Ticket, Language } from '../types';
import { dataService } from '../services/dataService';
import { Ticket as TicketIcon, X, CheckCircle, Calendar, MapPin, QrCode, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TicketModalProps {
  events: OlympicEvent[];
  preselectedEvent?: OlympicEvent | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  events,
  preselectedEvent,
  isOpen,
  onClose,
  language
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    preselectedEvent?.id || events[0]?.id || ''
  );
  const [ticketCategory, setTicketCategory] = useState<'Standard' | 'Catégorie A' | 'VIP'>('Catégorie A');
  const [quantity, setQuantity] = useState<number>(2);
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [generatedTicket, setGeneratedTicket] = useState<Ticket | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const priceMultiplier = {
    Standard: 1,
    'Catégorie A': 1.6,
    VIP: 3.2
  }[ticketCategory];

  const basePrice = currentEvent?.ticketPrice || 15;
  const unitPrice = Math.round(basePrice * priceMultiplier);
  const totalPrice = unitPrice * quantity;

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !currentEvent) return;

    setIsSubmitting(true);
    try {
      const ticket = await dataService.purchaseTicket({
        eventId: currentEvent.id,
        eventName: currentEvent.eventName,
        discipline: currentEvent.discipline,
        venueName: currentEvent.venueName,
        date: currentEvent.date,
        time: `${currentEvent.time} - ${currentEvent.endTime}`,
        buyerName,
        buyerEmail,
        category: ticketCategory,
        quantity,
        unitPrice,
        totalPrice
      });

      setGeneratedTicket(ticket);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in" id="ticket-purchase-modal">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TicketIcon className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-bold text-white">Billetterie Officielle Dakar 2026</h3>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {generatedTicket ? (
          /* E-Ticket Display */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>

            <h4 className="text-xl font-extrabold text-neutral-900">E-Billet Émis avec Succès !</h4>
            <p className="text-xs text-neutral-600">
              Votre billet officiel a été synchronisé et un reçu a été envoyé à <strong>{buyerEmail}</strong>.
            </p>

            {/* Visual Ticket Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-neutral-950 text-white p-5 rounded-2xl text-left relative overflow-hidden shadow-lg border border-emerald-700/50">
              <div className="flex items-start justify-between gap-2 border-b border-white/15 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                    DAKAR JOJ 2026 • PASS OFFICIEL
                  </span>
                  <h5 className="text-base font-bold text-white mt-0.5">{generatedTicket.eventName}</h5>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-neutral-950 rounded">
                  {generatedTicket.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 mb-3">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Date & Heure</span>
                  <span className="font-semibold text-white">{generatedTicket.date} • {generatedTicket.time}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Titulaire</span>
                  <span className="font-semibold text-white">{generatedTicket.buyerName}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-neutral-400 block">Lieu</span>
                  <span className="font-semibold text-white truncate block">{generatedTicket.venueName}</span>
                </div>
              </div>

              {/* QR Code Simulation */}
              <div className="pt-3 border-t border-dashed border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-neutral-400 block">CODE DE RÉSERVATION</span>
                  <span className="text-sm font-mono font-black text-amber-300 tracking-wider">
                    {generatedTicket.bookingCode}
                  </span>
                </div>
                <div className="w-10 h-10 bg-white p-1 rounded-md flex items-center justify-center">
                  <QrCode className="w-full h-full text-neutral-950" />
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-sm"
            >
              Fermer la fenêtre
            </button>
          </div>
        ) : (
          /* Ticket Purchase Form */
          <form onSubmit={handlePurchase} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Sélectionner l'épreuve sportive
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 font-medium"
              >
                {events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.date} • {evt.discipline} : {evt.eventName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Catégorie</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Standard">Standard (${basePrice})</option>
                  <option value="Catégorie A">Catégorie A (${Math.round(basePrice * 1.6)})</option>
                  <option value="VIP">VIP Privilège (${Math.round(basePrice * 3.2)})</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Nombre de places</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">Nom et Prénom</label>
              <input
                type="text"
                required
                placeholder="Ex: Fatou Ndiaye"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">Adresse E-mail</label>
              <input
                type="email"
                required
                placeholder="Ex: fatou@gmail.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Total Price Calculation */}
            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Total à régler</span>
                <span className="text-2xl font-black text-emerald-800">${totalPrice} USD</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Émission...' : 'Confirmer l’Achat'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
