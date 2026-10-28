import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { Venue, Language } from '../types';
import { INITIAL_VENUES } from '../data/initialData';
import {
  MapPin,
  Train,
  Bus,
  Car,
  Footprints,
  Navigation,
  Layers,
  Crosshair,
  ExternalLink,
  Clock,
  Compass,
  AlertCircle,
  Route
} from 'lucide-react';

export interface LeafletStadiumMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  language: Language;
}

// Popular Dakar departure hubs (Airports, Major TER Stations, Hotels)
export const DAKAR_HUBS = [
  { id: 'hub-ter-dakar', name: '🚆 Gare TER Dakar (Centre-Ville)', coords: { lat: 14.6715, lng: -17.4326 }, type: 'transit' },
  { id: 'hub-brt-petersen', name: '🚌 Gare BRT Petersen (Grand Dakar)', coords: { lat: 14.6890, lng: -17.4510 }, type: 'transit' },
  { id: 'hub-ter-colobane', name: '🚆 Gare TER Colobane', coords: { lat: 14.6850, lng: -17.4360 }, type: 'transit' },
  { id: 'hub-ter-pikine', name: '🚆 Gare TER Pikine', coords: { lat: 14.7420, lng: -17.3870 }, type: 'transit' },
  { id: 'hub-ter-rufisque', name: '🚆 Gare TER Rufisque', coords: { lat: 14.7640, lng: -17.2310 }, type: 'transit' },
  { id: 'hub-aibd', name: '✈️ Aéroport Intl Blaise Diagne (AIBD)', coords: { lat: 14.6710, lng: -17.0730 }, type: 'airport' },
  { id: 'hub-hotel-radisson', name: '🏨 Radisson Blu (Corniche Ouest)', coords: { lat: 14.6920, lng: -17.4720 }, type: 'hotel' },
  { id: 'hub-hotel-kingfahd', name: '🏨 King Fahd Palace (Almadies)', coords: { lat: 14.7460, lng: -17.5180 }, type: 'hotel' },
  { id: 'hub-hotel-terroubi', name: '🏨 Terrou-Bi Resort & Marina', coords: { lat: 14.6970, lng: -17.4740 }, type: 'hotel' },
  { id: 'hub-hotel-pullman', name: '🏨 Pullman Dakar Teranga (Plateau)', coords: { lat: 14.6640, lng: -17.4280 }, type: 'hotel' },
  { id: 'hub-resto-lagon', name: '🍽️ Le Lagon 1 (Corniche Est)', coords: { lat: 14.6660, lng: -17.4300 }, type: 'restaurant' }
];

// Custom SVG Pin Icon Generators with exact tip anchoring
const createOriginPinIcon = () => {
  return L.divIcon({
    className: 'custom-origin-marker-a',
    html: `
      <div style="position: relative; width: 34px; height: 44px; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="width: 34px; height: 34px; border-radius: 50%; background: #2563eb; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; box-shadow: 0 4px 10px rgba(37,99,235,0.4); border: 2.5px solid #ffffff; z-index: 2;">
          <span>A</span>
        </div>
        <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #2563eb; margin-top: -2px; z-index: 1;"></div>
        <div style="width: 8px; height: 3px; background: rgba(0,0,0,0.3); border-radius: 50%; margin-top: 1px;"></div>
      </div>
    `,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -44]
  });
};

const createDestinationPinIcon = (isDiamniadio: boolean) => {
  const bg = isDiamniadio ? '#1e40af' : '#047857';
  const shadowColor = isDiamniadio ? 'rgba(30,64,175,0.5)' : 'rgba(4,120,87,0.5)';
  return L.divIcon({
    className: 'custom-destination-marker-b',
    html: `
      <div style="position: relative; width: 38px; height: 48px; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: ${bg}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px; box-shadow: 0 6px 14px ${shadowColor}; border: 3px solid #ffffff; z-index: 2;">
          <span>B</span>
        </div>
        <div style="width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 10px solid ${bg}; margin-top: -2px; z-index: 1;"></div>
        <div style="width: 10px; height: 3px; background: rgba(0,0,0,0.35); border-radius: 50%; margin-top: 1px;"></div>
      </div>
    `,
    iconSize: [38, 48],
    iconAnchor: [19, 48],
    popupAnchor: [0, -48]
  });
};

const createGeneralVenuePinIcon = (isLive: boolean) => {
  return L.divIcon({
    className: 'custom-general-venue-pin',
    html: `
      <div style="position: relative; width: 28px; height: 34px; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="width: 26px; height: 26px; border-radius: 50%; background: ${
          isLive ? '#dc2626' : '#1f2937'
        }; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); border: 2px solid #ffffff;">
          <span>🏟️</span>
        </div>
        <div style="width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 8px solid ${
          isLive ? '#dc2626' : '#1f2937'
        }; margin-top: -2px;"></div>
      </div>
    `,
    iconSize: [28, 34],
    iconAnchor: [14, 34],
    popupAnchor: [0, -34]
  });
};

// Tile layer configurations
const TILE_LAYERS = {
  voyager: {
    name: 'CartoDB Voyager (JOJ Clair)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  osm: {
    name: 'OpenStreetMap Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  },
  hot: {
    name: 'Humanitarian / Transport',
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by HOT'
  }
};

// Helper: Check if venue is located in Diamniadio zone
export const isDiamniadioVenue = (venue?: Venue | null): boolean => {
  if (!venue) return false;
  const loc = (venue.location || '').toLowerCase();
  const name = (venue.name || '').toLowerCase();
  const id = (venue.id || '').toLowerCase();
  return (
    loc.includes('diamniadio') ||
    name.includes('abdoulaye wade') ||
    name.includes('dakar arena') ||
    name.includes('expositions') ||
    id.includes('wade') ||
    id.includes('arena') ||
    id.includes('expositions')
  );
};

// Haversine distance calculator
const calculateHaversineKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
};

// ============================================================================
// MAIN COMPONENT - STABLE LEAFLET MAP WITH DYNAMIC INSTANT RE-DRAW
// ============================================================================
export const LeafletStadiumMap: React.FC<LeafletStadiumMapProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  language
}) => {
  // DOM & Leaflet Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const onSelectVenueRef = useRef(onSelectVenue);

  // Keep callback ref updated without triggering re-renders
  useEffect(() => {
    onSelectVenueRef.current = onSelectVenue;
  }, [onSelectVenue]);

  // States
  const [activeTileKey, setActiveTileKey] = useState<keyof typeof TILE_LAYERS>('voyager');
  const [selectedHubId, setSelectedHubId] = useState<string>('hub-ter-dakar');
  const [customOriginCoords, setCustomOriginCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [travelMode, setTravelMode] = useState<'TRANSIT' | 'DRIVE' | 'WALK'>('TRANSIT');
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isRouteLoading, setIsRouteLoading] = useState<boolean>(false);

  const t = {
    fr: {
      mapTitle: 'Carte OpenStreetMap des Stades & Itinéraires',
      mapSubtitle: 'Cartographie libre OpenStreetMap & Leaflet sans clé requise pour les JOJ Dakar 2026',
      departurePoint: 'Point de départ :',
      destinationPoint: 'Stade de destination :',
      modeTransit: 'TER / BRT',
      modeDrive: 'Voiture / Taxi',
      modeWalk: 'À pied',
      myLocation: '📍 Ma position GPS',
      locateMe: 'Me géolocaliser',
      openOSM: 'Ouvrir sur OpenStreetMap',
      openGoogle: 'Ouvrir Google Maps GPS',
      distance: 'Distance',
      duration: 'Durée estimée',
      transitDetails: 'Accès transports en commun',
      resetView: 'Recadrer tous les stades',
      mapLayer: 'Style de carte',
      calculating: 'Calcul de l’itinéraire en cours...'
    },
    en: {
      mapTitle: 'OpenStreetMap Stadiums & Route Guidance',
      mapSubtitle: 'Open-source OpenStreetMap & Leaflet mapping for Dakar 2026 YOG',
      departurePoint: 'Departure Hub:',
      destinationPoint: 'Target Stadium:',
      modeTransit: 'TER / BRT',
      modeDrive: 'Car / Taxi',
      modeWalk: 'Walking',
      myLocation: '📍 My GPS location',
      locateMe: 'Locate me',
      openOSM: 'Open in OpenStreetMap',
      openGoogle: 'Open in Google Maps GPS',
      distance: 'Distance',
      duration: 'Estimated Duration',
      transitDetails: 'Public Transit Guidance',
      resetView: 'Frame all stadiums',
      mapLayer: 'Map Layer',
      calculating: 'Computing route...'
    }
  }[language];

  // Resolve target venue (stable fallback)
  const targetVenue = useMemo(() => {
    return selectedVenue || venues[0] || null;
  }, [selectedVenue, venues]);

  // Resolve origin coords
  const originLat = customOriginCoords?.lat ?? (DAKAR_HUBS.find((h) => h.id === selectedHubId)?.coords.lat || 14.6715);
  const originLng = customOriginCoords?.lng ?? (DAKAR_HUBS.find((h) => h.id === selectedHubId)?.coords.lng || -17.4326);
  const originLabel = customOriginCoords
    ? '📍 Votre position GPS'
    : (DAKAR_HUBS.find((h) => h.id === selectedHubId)?.name || 'Gare TER Dakar');

  // Safe coordinate resolution (fallback to INITIAL_VENUES if Firestore missed coordinates)
  const safeCoords = useMemo(() => {
    if (targetVenue?.coordinates?.lat && targetVenue?.coordinates?.lng) {
      return targetVenue.coordinates;
    }
    const fallbackVenue = INITIAL_VENUES.find((v) => v.id === targetVenue?.id);
    return fallbackVenue?.coordinates || { lat: 14.7303, lng: -17.1895 };
  }, [targetVenue]);

  const destLat = safeCoords.lat;
  const destLng = safeCoords.lng;
  const isDiamniadio = useMemo(() => isDiamniadioVenue(targetVenue), [targetVenue]);

  // Dynamic route information calculation using realistic road distances
  const routeInfo = useMemo(() => {
    if (!targetVenue) return null;
    const directDist = calculateHaversineKm(originLat, originLng, destLat, destLng);
    const distKm = parseFloat((directDist * 1.35).toFixed(1)); // Approx road distance
    let duration = '';
    let steps: string[] = [];

    if (isDiamniadio) {
      duration = '25 min via TER';
      steps = [
        `Départ (Point A) : ${originLabel}`,
        'Trajet en Train Express Régional : Ligne TER Dakar ➔ Station Diamniadio (20 min)',
        'Dernier kilomètre : Navette Express JOJ / Passerelle directe',
        `Arrivée (Point B) : ${targetVenue.name}`
      ];
    } else {
      if (travelMode === 'TRANSIT') {
        duration = targetVenue.transitGuidance?.estimatedDurationFromCenter || `${Math.max(12, Math.round(distKm * 2.2))} min`;
        steps = [
          `Départ (Point A) : ${originLabel}`,
          `Liaison Urbaine : ${targetVenue.transitGuidance?.brtStation || 'Ligne BRT 1 Petersen - Guédiawaye'} & Bus DDD`,
          `Arrivée (Point B) : ${targetVenue.name}`
        ];
      } else if (travelMode === 'WALK') {
        duration = `${Math.round((distKm / 4.5) * 60)} min`;
        steps = [
          `Départ (Point A) : ${originLabel}`,
          'Itinéraire piétonnier sécurisé',
          `Arrivée (Point B) : ${targetVenue.name}`
        ];
      } else {
        duration = `${Math.max(8, Math.round(distKm * 1.5))} min`;
        steps = [
          `Départ (Point A) : ${originLabel}`,
          'Trajet via Voie de Dégagement Nord (VDN) / Autoroute',
          `Arrivée (Point B) : ${targetVenue.name}`
        ];
      }
    }

    return { distance: `${distKm} km`, duration, steps };
  }, [originLat, originLng, destLat, destLng, travelMode, isDiamniadio, targetVenue, originLabel]);

  // 1. Initialize Map Instance Once on Mount
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Clean any previous leaflet instance id on container to prevent 'Map container is already initialized'
    if ((container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }

    const map = L.map(container, {
      center: [(originLat + destLat) / 2, (originLng + destLng) / 2],
      zoom: 12,
      zoomControl: false,
      attributionControl: true
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    const tileConfig = TILE_LAYERS[activeTileKey];
    const tileLayer = L.tileLayer(tileConfig.url, {
      maxZoom: 19,
      attribution: tileConfig.attribution
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    const routeLayer = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    tileLayerRef.current = tileLayer;
    markersLayerRef.current = markersLayer;
    routeLayerRef.current = routeLayer;

    return () => {
      try {
        map.stop();
        markersLayer.clearLayers();
        routeLayer.clearLayers();
        map.remove();
      } catch (err) {
        // Suppress potential unmount animation teardown warnings
      }
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
      routeLayerRef.current = null;
      tileLayerRef.current = null;
      if (container && (container as any)._leaflet_id) {
        delete (container as any)._leaflet_id;
      }
    };
  }, []);

  // 2. Tile Layer Update
  useEffect(() => {
    if (!tileLayerRef.current) return;
    const tileConfig = TILE_LAYERS[activeTileKey];
    tileLayerRef.current.setUrl(tileConfig.url);
  }, [activeTileKey]);

  // 3. Dynamic Markers & Polyline Update on state change (OSRM Real Route Fetch)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const routeLayer = routeLayerRef.current;

    if (!map || !markersLayer || !routeLayer || !targetVenue) return;

    // Clean existing layers
    markersLayer.clearLayers();
    routeLayer.clearLayers();

    // Marqueur A (Départ)
    const originIcon = createOriginPinIcon();
    const originMarker = L.marker([originLat, originLng], {
      icon: originIcon,
      zIndexOffset: 1000
    });
    originMarker.bindPopup(`
      <div style="font-family: inherit; padding: 4px; max-width: 220px;">
        <div style="font-weight: 800; font-size: 11px; color: #2563eb; text-transform: uppercase; margin-bottom: 2px;">
          📍 Marqueur A (Départ)
        </div>
        <div style="font-size: 12px; font-weight: 700; color: #111827;">
          ${originLabel}
        </div>
        <div style="font-size: 10px; color: #6b7280; margin-top: 2px;">
          Lat: ${originLat.toFixed(4)}, Lng: ${originLng.toFixed(4)}
        </div>
      </div>
    `);
    markersLayer.addLayer(originMarker);

    // Marqueur B (Arrivée) & Autres Stades
    venues.forEach((v) => {
      const isSelected = v.id === targetVenue.id;
      const fallbackV = INITIAL_VENUES.find((iv) => iv.id === v.id);
      const markerLat = isSelected ? destLat : (v.coordinates?.lat ?? fallbackV?.coordinates?.lat ?? 14.7167);
      const markerLng = isSelected ? destLng : (v.coordinates?.lng ?? fallbackV?.coordinates?.lng ?? -17.4677);
      const isDiam = isDiamniadioVenue(v);

      const markerIcon = isSelected
        ? createDestinationPinIcon(isDiam)
        : createGeneralVenuePinIcon(!!v.isLive);

      const marker = L.marker([markerLat, markerLng], {
        icon: markerIcon,
        zIndexOffset: isSelected ? 2000 : 500
      });

      marker.on('click', () => {
        onSelectVenueRef.current?.(v);
      });

      const accessLabel = isDiam
        ? '🚆 TER (Gare Dakar ➔ Diamniadio) + Navette Stade'
        : (v.transitGuidance?.brtStation || v.transitGuidance?.busLines?.[0] || 'Ligne BRT 1 / Bus Dakar Dem Dikk');

      const popupContent = `
        <div style="font-family: inherit; max-width: 250px; padding: 4px;">
          <div style="font-weight: 800; font-size: 10px; color: ${isSelected ? '#047857' : '#6b7280'}; text-transform: uppercase; margin-bottom: 2px;">
            ${isSelected ? '🏁 Marqueur B (Arrivée) • ' : ''}${v.discipline}
          </div>
          <div style="font-weight: 700; font-size: 13px; color: #111827; line-height: 1.3;">
            ${v.name}
          </div>
          <div style="font-size: 11px; color: #6b7280; margin-top: 3px;">
            📍 ${v.location} • 👥 ${v.capacity.toLocaleString()} places
          </div>
          <div style="margin-top: 6px; padding: 4px 6px; background: ${isDiam ? '#eff6ff' : '#ecfdf5'}; border-radius: 6px; font-size: 10px; color: ${isDiam ? '#1e40af' : '#065f46'}; font-weight: 600;">
            ${isDiam ? '🚆 <strong>TER Express :</strong>' : '🚌 <strong>BRT / Bus :</strong>'} ${accessLabel}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersLayer.addLayer(marker);
    });

    // 3. Dynamic route fetch using OSRM API to prevent crossing the sea
    let isCancelled = false;
    setIsRouteLoading(true);

    const fetchAndDrawRoute = async () => {
      try {
        const mode = travelMode === 'WALK' ? 'foot' : 'driving';
        const url = `https://router.project-osrm.org/route/v1/${mode}/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;

        const response = await fetch(url);
        const data = await response.json();

        if (isCancelled) return;

        let latLngs: [number, number][] = [];
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates;
          latLngs = coords.map((c: [number, number]) => [c[1], c[0]]);
        } else {
          // Fallback to direct coords if API fails
          latLngs = [[originLat, originLng], [destLat, destLng]];
        }

        if (isCancelled) return;
        routeLayer.clearLayers();

        const mainLine = L.polyline(latLngs, {
          color: '#2563eb',
          weight: 4,
          dashArray: isDiamniadio ? '10, 10' : undefined,
          opacity: 0.95,
          lineCap: 'round',
          lineJoin: 'round'
        });

        routeLayer.addLayer(mainLine);
        try {
          map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50], maxZoom: 15, animate: false });
        } catch (err) {}
      } catch (err) {
        console.error('OSRM fetch error:', err);
        if (!isCancelled) {
          routeLayer.clearLayers();
          const fallbackLine = L.polyline([[originLat, originLng], [destLat, destLng]], {
            color: '#2563eb',
            weight: 4,
            dashArray: isDiamniadio ? '10, 10' : undefined,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round'
          });
          routeLayer.addLayer(fallbackLine);
          try {
            map.fitBounds(L.latLngBounds([[originLat, originLng], [destLat, destLng]]), { padding: [50, 50], maxZoom: 15, animate: false });
          } catch (e) {}
        }
      } finally {
        if (!isCancelled) {
          setIsRouteLoading(false);
        }
      }
    };

    fetchAndDrawRoute();

    return () => {
      isCancelled = true;
    };
  }, [
    targetVenue?.id,
    originLat,
    originLng,
    destLat,
    destLng,
    travelMode,
    isDiamniadio,
    venues.length,
    originLabel
  ]);

  // Geolocation handler (HTML5)
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCustomOriginCoords(userCoords);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setGeoError('Impossible de récupérer votre position GPS (Autorisation refusée ou indisponible).');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Reset to full view encompassing all stadiums
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (venues.length > 0) {
      const validPoints = venues
        .map((v) => {
          const fallbackV = INITIAL_VENUES.find((iv) => iv.id === v.id);
          return [v.coordinates?.lat ?? fallbackV?.coordinates?.lat, v.coordinates?.lng ?? fallbackV?.coordinates?.lng] as [number, number];
        })
        .filter((pt) => pt[0] && pt[1]);

      if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        bounds.extend([originLat, originLng]);
        map.fitBounds(bounds, { padding: [40, 40], animate: true });
      }
    }
  };

  // External GPS Routing URLs
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=${
    travelMode === 'TRANSIT' ? 'transit' : travelMode === 'WALK' ? 'walking' : 'driving'
  }`;

  const osmDirectionsUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_${
    travelMode === 'WALK' ? 'foot' : 'car'
  }&route=${originLat}%2C${originLng}%3B${destLat}%2C${destLng}`;

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-neutral-200 overflow-hidden">
      {/* Top Header & Itinerary Controls Bar */}
      <div className="p-4 bg-neutral-900 text-white flex flex-col gap-4">
        {/* Title and Layer Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {t.mapTitle}
              </h3>
              <p className="text-xs text-neutral-400">
                {t.mapSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Tile Layer Selector */}
            <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-xl border border-neutral-700">
              <Layers className="w-3.5 h-3.5 text-neutral-400 ml-1.5 shrink-0" />
              {(Object.keys(TILE_LAYERS) as Array<keyof typeof TILE_LAYERS>).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTileKey(key)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeTileKey === key
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {key === 'voyager' ? 'Clair' : key === 'osm' ? 'OSM' : 'Transport'}
                </button>
              ))}
            </div>

            {/* Recenter Button */}
            <button
              type="button"
              onClick={handleResetView}
              title={t.resetView}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Departure, Destination & Mode Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Departure Selector */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>{t.departurePoint}</span>
              <button
                type="button"
                onClick={handleGetLocation}
                className="text-emerald-400 hover:text-emerald-300 font-semibold lowercase inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Crosshair className="w-3 h-3" />
                {t.locateMe}
              </button>
            </label>
            <select
              value={customOriginCoords ? 'gps' : selectedHubId}
              onChange={(e) => {
                if (e.target.value === 'gps') {
                  handleGetLocation();
                } else {
                  setCustomOriginCoords(null);
                  setSelectedHubId(e.target.value);
                }
              }}
              className="w-full bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden cursor-pointer"
            >
              {customOriginCoords && (
                <option value="gps">📍 {t.myLocation}</option>
              )}
              {DAKAR_HUBS.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Target Stadium Selector */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              {t.destinationPoint}
            </label>
            <select
              value={targetVenue?.id || ''}
              onChange={(e) => {
                const found = venues.find((v) => v.id === e.target.value);
                if (found) onSelectVenue(found);
              }}
              className="w-full bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden cursor-pointer"
            >
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  🏟️ {v.name} ({v.location})
                </option>
              ))}
            </select>
          </div>

          {/* Travel Mode Toggle */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Mode de transport :
            </label>
            <div className="grid grid-cols-3 gap-1 bg-neutral-800 p-1 rounded-xl border border-neutral-700">
              <button
                type="button"
                onClick={() => setTravelMode('TRANSIT')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  travelMode === 'TRANSIT'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>{t.modeTransit}</span>
              </button>

              <button
                type="button"
                onClick={() => setTravelMode('DRIVE')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  travelMode === 'DRIVE'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>{t.modeDrive}</span>
              </button>

              <button
                type="button"
                onClick={() => setTravelMode('WALK')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  travelMode === 'WALK'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Footprints className="w-3.5 h-3.5" />
                <span>{t.modeWalk}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Route Info banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-neutral-800 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-400">Trajet actif :</span>
            <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/80">
              {originLabel}
            </span>
            <span className="text-neutral-500 font-black">➔</span>
            <span className="font-bold text-white bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-700">
              {targetVenue?.name}
            </span>
          </div>

          {/* Transport Mode Badge according to stadium zone */}
          <div className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-300 flex items-center gap-1.5">
            {isDiamniadio ? (
              <>
                <Train className="w-3.5 h-3.5 text-blue-400" />
                <span>Zone Diamniadio : <strong>TER obligatoire</strong> (Gare Dakar ➔ Diamniadio)</span>
              </>
            ) : (
              <>
                <Bus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zone Dakar Centre : <strong>BRT Ligne 1 / Bus DDD</strong></span>
              </>
            )}
          </div>
        </div>

        {geoError && (
          <div className="text-[11px] text-amber-300 bg-amber-950/60 p-2 rounded-lg border border-amber-800/80 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{geoError}</span>
          </div>
        )}
      </div>

      {/* Main Interactive Leaflet Map Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-slate-100 z-0">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Quick Floating Venue Card overlay */}
        {targetVenue && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-[500] bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-neutral-200 pointer-events-none">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-emerald-800 uppercase mb-1">
              <span>{targetVenue.discipline}</span>
              <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                {isDiamniadio ? 'Pôle Diamniadio' : 'Dakar Centre'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 leading-tight">
              {targetVenue.name}
            </h4>
            <p className="text-xs text-neutral-600 mt-0.5">
              📍 {targetVenue.location}
            </p>
            <div className="mt-2 pt-2 border-t border-neutral-100 text-[11px] font-medium text-emerald-800 flex items-center gap-1.5">
              {isDiamniadio ? (
                <>
                  <Train className="w-3.5 h-3.5 text-blue-600" />
                  <span>Accès direct via TER Diamniadio + Navette</span>
                </>
              ) : (
                <>
                  <Bus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Accès BRT / Bus Dakar Dem Dikk</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Route Summary & Actions */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          {routeInfo ? (
            <>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold">{t.duration}</span>
                  <span className="text-sm font-black text-neutral-900">{routeInfo.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs">
                <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold">{t.distance}</span>
                  <span className="text-sm font-black text-neutral-900">{routeInfo.distance}</span>
                </div>
              </div>
            </>
          ) : (
            <span className="text-xs text-neutral-600 font-medium">
              {isRouteLoading ? t.calculating : `Itinéraire prêt vers ${targetVenue?.name}`}
            </span>
          )}

          {/* Transit Line Guidance Pill */}
          <div className="text-xs text-neutral-700 font-medium hidden md:flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/80">
            {isDiamniadio ? (
              <>
                <Train className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 font-semibold">Ligne TER Express (Gare Dakar ➔ Diamniadio)</span>
              </>
            ) : (
              <>
                <Bus className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-900 font-semibold">{targetVenue?.transitGuidance?.brtStation || 'Ligne BRT 1 Petersen - Guédiawaye'}</span>
              </>
            )}
          </div>
        </div>

        {/* External Navigation Links */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a
            href={osmDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>OpenStreetMap</span>
            <ExternalLink className="w-3 h-3 text-neutral-400 ml-0.5" />
          </a>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>Google Maps GPS</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

