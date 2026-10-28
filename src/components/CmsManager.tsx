import React, { useState } from 'react';
import { OlympicEvent, Accommodation, Restaurant, Venue, Language } from '../types';
import { dataService } from '../services/dataService';
import {
  Database,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  Radio,
  CheckCircle,
  ExternalLink,
  Code2,
  Copy,
  Image as ImageIcon,
  Check
} from 'lucide-react';

interface CmsManagerProps {
  events: OlympicEvent[];
  accommodations: Accommodation[];
  restaurants: Restaurant[];
  venues: Venue[];
  language: Language;
}

export const CmsManager: React.FC<CmsManagerProps> = ({
  events,
  accommodations,
  restaurants,
  venues,
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    'events' | 'accommodations' | 'restaurants' | 'venues' | 'json' | 'generator'
  >('events');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Editing state for Events
  const [editingEvent, setEditingEvent] = useState<Partial<OlympicEvent> | null>(null);
  
  // Editing state for Accommodations
  const [editingHotel, setEditingHotel] = useState<Partial<Accommodation> | null>(null);

  // Editing state for Restaurants
  const [editingResto, setEditingResto] = useState<Partial<Restaurant> | null>(null);

  // JSON Import/Export state
  const [jsonText, setJsonText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Event handlers
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.eventName || !editingEvent?.discipline) return;

    const eventToSave: OlympicEvent = {
      id: editingEvent.id || 'evt-' + Date.now(),
      time: editingEvent.time || '10:00',
      endTime: editingEvent.endTime || '12:00',
      discipline: editingEvent.discipline || 'Athlétisme',
      disciplineCategory: (editingEvent.disciplineCategory as any) || 'Athlétisme',
      eventName: editingEvent.eventName,
      venueName: editingEvent.venueName || 'Stade Olympique de Diamniadio',
      venueId: editingEvent.venueId || 'venue-wade',
      status: editingEvent.status || 'À venir',
      date: editingEvent.date || '22 Oct',
      isLive: editingEvent.status === 'EN DIRECT',
      ticketPrice: Number(editingEvent.ticketPrice) || 15,
      description: editingEvent.description || '',
      coordinates: editingEvent.coordinates,
      transitGuidance: editingEvent.transitGuidance
    };

    await dataService.saveItem('events', eventToSave);
    setEditingEvent(null);
    showStatus('Événement enregistré avec succès dans Firebase Firestore !');
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Supprimer cet événement ?')) {
      await dataService.deleteItem('events', id);
      showStatus('Événement supprimé.');
    }
  };

  // Accommodation handlers
  const handleSaveHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotel?.name) return;

    const hotelToSave: Accommodation = {
      id: editingHotel.id || 'hotel-' + Date.now(),
      name: editingHotel.name,
      rating: Number(editingHotel.rating) || 4.5,
      isFeatured: !!editingHotel.isFeatured,
      location: editingHotel.location || 'Dakar',
      distanceVenue: editingHotel.distanceVenue || 'à 2 km',
      distanceKm: Number(editingHotel.distanceKm) || 2,
      neighborhood: editingHotel.neighborhood || 'Dakar',
      tags: editingHotel.tags || ['WiFi gratuit', 'Piscine'],
      pricePerNight: Number(editingHotel.pricePerNight) || 150,
      image: editingHotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      description: editingHotel.description || '',
      amenities: editingHotel.amenities || ['WiFi', 'Piscine', 'Climatisation'],
      coordinates: editingHotel.coordinates,
      transitGuidance: editingHotel.transitGuidance,
      contactPhone: editingHotel.contactPhone
    };

    await dataService.saveItem('accommodations', hotelToSave);
    setEditingHotel(null);
    showStatus('Hôtel enregistré avec succès dans Firebase Firestore !');
  };

  const handleDeleteHotel = async (id: string) => {
    if (window.confirm('Supprimer cet hébergement ?')) {
      await dataService.deleteItem('accommodations', id);
      showStatus('Hébergement supprimé.');
    }
  };

  // Restaurant handlers
  const handleSaveResto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResto?.name) return;

    const restoToSave: Restaurant = {
      id: editingResto.id || 'resto-' + Date.now(),
      name: editingResto.name,
      category: (editingResto.category as any) || 'Locale',
      rating: Number(editingResto.rating) || 4.5,
      priceRange: (editingResto.priceRange as any) || '$$$',
      description: editingResto.description || '',
      image: editingResto.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      specialties: editingResto.specialties || ['Thiéboudienne', 'Yassa'],
      address: editingResto.address || 'Dakar',
      neighborhood: editingResto.neighborhood || 'Dakar',
      coordinates: editingResto.coordinates,
      transitGuidance: editingResto.transitGuidance,
      openingHours: editingResto.openingHours,
      phone: editingResto.phone
    };

    await dataService.saveItem('restaurants', restoToSave);
    setEditingResto(null);
    showStatus('Restaurant enregistré avec succès dans Firebase Firestore !');
  };

  const handleDeleteResto = async (id: string) => {
    if (window.confirm('Supprimer ce restaurant ?')) {
      await dataService.deleteItem('restaurants', id);
      showStatus('Restaurant supprimé.');
    }
  };

  // Export JSON
  const handleExportJson = async () => {
    const json = await dataService.exportFullDatabase();
    setJsonText(json);
    showStatus('Base de données exportée en JSON ci-dessous !');
  };

  // Import JSON
  const handleImportJson = async () => {
    if (!jsonText.trim()) return;
    const success = await dataService.importFullDatabase(jsonText);
    if (success) {
      showStatus('Base de données JSON importée et synchronisée avec Firebase !');
    } else {
      alert('Format JSON invalide.');
    }
  };

  // Reset defaults
  const handleResetDefaults = async () => {
    if (window.confirm('Voulez-vous restaurer les données officielles des JOJ Dakar 2026 ?')) {
      await dataService.resetToDefaults();
      showStatus('Données réinitialisées avec succès.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="cms-admin-dashboard">
      
      {/* Top Banner with Firebase Sync Indicator */}
      <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Firebase Firestore Connecté en Temps Réel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Système de Gestion de Contenu (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Gérez et mettez à jour instantanément les compétitions, hébergements, restaurants, et la base JSON.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg border border-neutral-700 transition-colors cursor-pointer"
            title="Restaurer le jeu de données par défaut"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser Données</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3 mb-6" id="cms-tabs-nav">
        {[
          { id: 'events', label: `Événements (${events.length})` },
          { id: 'accommodations', label: `Hébergements (${accommodations.length})` },
          { id: 'restaurants', label: `Gastronomie (${restaurants.length})` },
          { id: 'venues', label: `Sites & Stades (${venues.length})` },
          { id: 'json', label: 'Base de données JSON' },
          { id: 'generator', label: 'Générateur Liens Dynamiques & HTML' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">Programme & Compétitions JOJ</h2>
            <button
              onClick={() =>
                setEditingEvent({
                  discipline: 'Athlétisme',
                  eventName: '',
                  time: '10:00',
                  endTime: '12:00',
                  venueName: 'Stade Olympique de Diamniadio',
                  status: 'À venir',
                  date: '22 Oct',
                  ticketPrice: 15
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un événement</span>
            </button>
          </div>

          {/* Edit Event Form */}
          {editingEvent && (
            <form
              onSubmit={handleSaveEvent}
              className="bg-white p-6 rounded-xl border border-neutral-300 shadow-md space-y-4"
            >
              <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                {editingEvent.id ? "Modifier l'événement" : 'Créer un nouvel événement'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Nom de l'épreuve</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.eventName || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, eventName: e.target.value })}
                    placeholder="Ex: 100m Hommes - Finale"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Discipline</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.discipline || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, discipline: e.target.value })}
                    placeholder="Ex: Athlétisme"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Date</label>
                  <select
                    value={editingEvent.date || '22 Oct'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="22 Oct">22 Oct</option>
                    <option value="23 Oct">23 Oct</option>
                    <option value="24 Oct">24 Oct</option>
                    <option value="25 Oct">25 Oct</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Heure de début</label>
                  <input
                    type="text"
                    value={editingEvent.time || '09:00'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Heure de fin</label>
                  <input
                    type="text"
                    value={editingEvent.endTime || '12:00'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, endTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Statut de diffusion</label>
                  <select
                    value={editingEvent.status || 'À venir'}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        status: e.target.value as any,
                        isLive: e.target.value === 'EN DIRECT'
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="À venir">À venir</option>
                    <option value="EN DIRECT">🔴 EN DIRECT</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Lieu / Stade</label>
                  <input
                    type="text"
                    value={editingEvent.venueName || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venueName: e.target.value })}
                    placeholder="Ex: Stade Olympique Me Abdoulaye Wade"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Prix du Billet ($ USD)</label>
                  <input
                    type="number"
                    value={editingEvent.ticketPrice || 0}
                    onChange={(e) => setEditingEvent({ ...editingEvent, ticketPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  placeholder="Informations sur l'épreuve..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer dans Firestore</span>
                </button>
              </div>
            </form>
          )}

          {/* Events Table */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
            <div className="divide-y divide-neutral-200">
              {events.map((evt) => (
                <div key={evt.id} className="p-4 flex items-center justify-between gap-4 hover:bg-neutral-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {evt.discipline}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">{evt.date} • {evt.time} - {evt.endTime}</span>
                      {evt.status === 'EN DIRECT' && (
                        <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
                          EN DIRECT
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900">{evt.eventName}</h4>
                    <p className="text-xs text-neutral-500">{evt.venueName}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingEvent(evt)}
                      className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-xs"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ACCOMMODATIONS */}
      {activeTab === 'accommodations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">Hébergements & Résidences</h2>
            <button
              onClick={() =>
                setEditingHotel({
                  name: '',
                  rating: 4.6,
                  pricePerNight: 160,
                  location: 'Dakar',
                  distanceVenue: 'à 1,5 km du site',
                  distanceKm: 1.5,
                  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
                  tags: ['WiFi gratuit', 'Piscine']
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un hébergement</span>
            </button>
          </div>

          {editingHotel && (
            <form
              onSubmit={handleSaveHotel}
              className="bg-white p-6 rounded-xl border border-neutral-300 shadow-md space-y-4"
            >
              <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                {editingHotel.id ? "Modifier l'hébergement" : 'Ajouter un hébergement'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Nom de l'hôtel</label>
                  <input
                    type="text"
                    required
                    value={editingHotel.name || ''}
                    onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Prix par nuit ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={editingHotel.pricePerNight || 150}
                    onChange={(e) => setEditingHotel({ ...editingHotel, pricePerNight: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Note (1 à 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingHotel.rating || 4.5}
                    onChange={(e) => setEditingHotel({ ...editingHotel, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-neutral-700 block mb-1">URL de l'image</label>
                  <input
                    type="url"
                    value={editingHotel.image || ''}
                    onChange={(e) => setEditingHotel({ ...editingHotel, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingHotel.isFeatured}
                      onChange={(e) => setEditingHotel({ ...editingHotel, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-700"
                    />
                    <span>Mettre "À la une"</span>
                  </label>
                </div>
              </div>

              {/* Dynamic Image Preview */}
              {editingHotel.image && (
                <div className="p-3 bg-neutral-50 rounded-lg flex items-center gap-3">
                  <img
                    src={editingHotel.image}
                    alt="Aperçu"
                    className="w-16 h-12 object-cover rounded-md border border-neutral-300"
                  />
                  <span className="text-xs text-neutral-500">Aperçu direct de l'image</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingHotel(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer dans Firestore</span>
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accommodations.map((hotel) => (
              <div key={hotel.id} className="bg-white p-4 rounded-xl border border-neutral-200 flex gap-4 items-center">
                <img src={hotel.image} alt={hotel.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-neutral-900 truncate">{hotel.name}</h4>
                  <p className="text-xs text-neutral-500">${hotel.pricePerNight}/nuit • ⭐ {hotel.rating}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingHotel(hotel)}
                    className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-lg text-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteHotel(hotel.id)}
                    className="p-2 text-red-600 hover:text-red-700 bg-red-50 rounded-lg text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: RESTAURANTS */}
      {activeTab === 'restaurants' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">Gastronomie & Restaurants</h2>
            <button
              onClick={() =>
                setEditingResto({
                  name: '',
                  category: 'Locale',
                  rating: 4.8,
                  priceRange: '$$$',
                  description: 'Spécialités sénégalaises et fruits de mer.',
                  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
                  specialties: ['Thiéboudienne', 'Yassa', 'Bissap']
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un restaurant</span>
            </button>
          </div>

          {editingResto && (
            <form
              onSubmit={handleSaveResto}
              className="bg-white p-6 rounded-xl border border-neutral-300 shadow-md space-y-4"
            >
              <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                {editingResto.id ? 'Modifier le restaurant' : 'Ajouter un restaurant'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    value={editingResto.name || ''}
                    onChange={(e) => setEditingResto({ ...editingResto, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Catégorie</label>
                  <select
                    value={editingResto.category || 'Locale'}
                    onChange={(e) => setEditingResto({ ...editingResto, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Locale">Locale</option>
                    <option value="Internationale">Internationale</option>
                    <option value="Fast-Food">Fast-Food</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Gamme de Prix</label>
                  <select
                    value={editingResto.priceRange || '$$$'}
                    onChange={(e) => setEditingResto({ ...editingResto, priceRange: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="$">$ (Économique)</option>
                    <option value="$$">$$ (Moyen)</option>
                    <option value="$$$">$$$ (Raffiné)</option>
                    <option value="$$$$">$$$$ (Luxe)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-neutral-700 block mb-1">URL de l'image</label>
                  <input
                    type="url"
                    value={editingResto.image || ''}
                    onChange={(e) => setEditingResto({ ...editingResto, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Note (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingResto.rating || 4.5}
                    onChange={(e) => setEditingResto({ ...editingResto, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingResto.description || ''}
                  onChange={(e) => setEditingResto({ ...editingResto, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingResto(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer dans Firestore</span>
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.map((resto) => (
              <div key={resto.id} className="bg-white p-4 rounded-xl border border-neutral-200 flex gap-4 items-center">
                <img src={resto.image} alt={resto.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {resto.category}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 truncate mt-1">{resto.name}</h4>
                  <p className="text-xs text-neutral-500">{resto.priceRange} • ⭐ {resto.rating}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingResto(resto)}
                    className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-lg text-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteResto(resto.id)}
                    className="p-2 text-red-600 hover:text-red-700 bg-red-50 rounded-lg text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: VENUES */}
      {activeTab === 'venues' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">Sites & Infrastructures Sportives</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venues.map((venue) => (
              <div key={venue.id} className="bg-white p-4 rounded-xl border border-neutral-200 flex gap-4 items-center">
                <img src={venue.image} alt={venue.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {venue.discipline}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 truncate mt-1">{venue.name}</h4>
                  <p className="text-xs text-neutral-500">{venue.location} • {venue.capacity.toLocaleString()} places</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: JSON DATABASE */}
      {activeTab === 'json' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Base de Données JSON & Synchronisation</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Exportez ou injectez directement des structures JSON pour mettre à jour instantanément la plateforme.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJson}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Exporter JSON</span>
              </button>

              <button
                onClick={handleImportJson}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Importer & Synchroniser</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={16}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Cliquez sur 'Exporter JSON' pour afficher les données actuelles ou collez votre JSON ici..."
              className="w-full p-4 text-xs font-mono bg-neutral-900 text-emerald-300 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
            {jsonText && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-4 right-4 bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* SECTION 6: DYNAMIC IMAGE & HTML BOOTSTRAP GENERATOR */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Générateur de Liens Dynamiques & Snippets HTML / Bootstrap
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Générez instantanément des balises HTML avec liens dynamiques vers des images et classes Bootstrap / Tailwind prêtes à l'emploi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-emerald-700" />
                <span>Exemple Carte Bootstrap HTML Dynamique</span>
              </h3>
              <pre className="p-3 bg-neutral-900 text-neutral-200 text-xs font-mono rounded-lg overflow-x-auto">
{`<div class="card shadow-sm border-0 rounded-4 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" 
       class="card-img-top object-fit-cover" 
       style="height: 200px;" 
       alt="Radisson Dakar" />
  <div class="card-body">
    <span class="badge bg-success">JOJ 2026</span>
    <h5 class="card-title mt-2">Radisson Blu Dakar</h5>
    <p class="card-text text-muted">À 1,2 km du Stade Olympique.</p>
    <a href="#" class="btn btn-primary w-100">Réserver</a>
  </div>
</div>`}
              </pre>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>Banque d'Images Officielles Dakar 2026</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-center justify-between">
                  <div>
                    <strong className="text-neutral-900 block">Stade Abdoulaye Wade (Diamniadio)</strong>
                    <span className="text-neutral-500">https://images.unsplash.com/photo-1508098682722...</span>
                  </div>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-center justify-between">
                  <div>
                    <strong className="text-neutral-900 block">Thiéboudienne Sénégalais</strong>
                    <span className="text-neutral-500">https://images.unsplash.com/photo-1546069901...</span>
                  </div>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-center justify-between">
                  <div>
                    <strong className="text-neutral-900 block">Athlètes Sprint</strong>
                    <span className="text-neutral-500">https://images.unsplash.com/photo-1461896836...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
