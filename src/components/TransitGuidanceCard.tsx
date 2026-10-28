import React, { useState } from 'react';
import { TransitGuidance, Coordinates, Language } from '../types';
import {
  Bus,
  Train,
  Car,
  Clock,
  Navigation,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info
} from 'lucide-react';

interface TransitGuidanceCardProps {
  transit?: TransitGuidance;
  coordinates?: Coordinates;
  title: string;
  locationName?: string;
  language?: Language;
  defaultExpanded?: boolean;
  onNavigateToMap?: () => void;
  compact?: boolean;
}

export const TransitGuidanceCard: React.FC<TransitGuidanceCardProps> = ({
  transit,
  coordinates,
  title,
  locationName,
  language = 'fr',
  defaultExpanded = false,
  onNavigateToMap,
  compact = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!transit && !coordinates) return null;

  const destinationLat = coordinates?.lat || 14.7303;
  const destinationLng = coordinates?.lng || -17.1895;

  const osmUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=14.6715%2C-17.4326%3B${destinationLat}%2C${destinationLng}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`;

  const t = {
    fr: {
      transitTitle: 'Itinéraire & Moyens de Transport',
      howToGetThere: 'Comment s’y rendre ? (Bus, TER, Taxis)',
      busLines: 'Lignes de Bus & Navettes',
      ter: 'Gare Train Express Régional (TER)',
      brt: 'Ligne BRT (Bus Rapid Transit)',
      carTaxi: 'Voiture, Taxi & VTC',
      jojShuttle: 'Navette Spéciale JOJ 2026',
      estimatedDuration: 'Durée depuis le centre-ville',
      openOsm: 'Itinéraire OpenStreetMap',
      openMaps: 'Itinéraire GPS',
      viewOnMap: 'Localiser sur la carte',
      showMore: 'Voir les transports & bus',
      showLess: 'Masquer les détails'
    },
    en: {
      transitTitle: 'Itinerary & Transit Guidance',
      howToGetThere: 'How to get there? (Bus, TER, Taxis)',
      busLines: 'Bus Lines & Shuttles',
      ter: 'Regional Express Train Station (TER)',
      brt: 'BRT Line (Bus Rapid Transit)',
      carTaxi: 'Car, Taxi & Rideshare',
      jojShuttle: 'Official YOG Shuttle',
      estimatedDuration: 'Estimated from city center',
      openOsm: 'OpenStreetMap Route',
      openMaps: 'GPS Directions',
      viewOnMap: 'Locate on map',
      showMore: 'Show transit & bus options',
      showLess: 'Hide details'
    }
  }[language];

  if (compact) {
    return (
      <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200/80 text-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-950">
            <Bus className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.howToGetThere}</span>
          </div>
          {transit?.estimatedDurationFromCenter && (
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold text-[10px]">
              ⏱️ {transit.estimatedDurationFromCenter}
            </span>
          )}
        </div>

        {transit?.busLines && transit.busLines.length > 0 && (
          <p className="text-neutral-700 text-[11px] mb-1">
            <strong>Bus :</strong> {transit.busLines.join(' • ')}
          </p>
        )}

        {(transit?.terStation || transit?.brtStation) && (
          <p className="text-neutral-700 text-[11px] mb-1.5">
            <strong>Train / BRT :</strong> {transit.terStation || transit.brtStation}
          </p>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-emerald-200/60 mt-1">
          <a
            href={osmUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-800 hover:text-black underline cursor-pointer"
          >
            <Navigation className="w-3 h-3 text-emerald-700" />
            <span>{t.openOsm}</span>
            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50/90 to-neutral-50 rounded-xl border border-emerald-200/90 overflow-hidden shadow-2xs">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-emerald-100/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-950 block">
              {t.transitTitle}
            </span>
            <span className="text-[11px] text-neutral-600">
              {transit?.estimatedDurationFromCenter
                ? `Trajet : ~${transit.estimatedDurationFromCenter} depuis Dakar centre`
                : t.howToGetThere}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 hidden sm:inline">
            {isExpanded ? t.showLess : t.showMore}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-emerald-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-emerald-700" />
          )}
        </div>
      </button>

      {/* Expanded transit info */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-emerald-200/60 space-y-3 animate-in fade-in duration-200">
          
          {/* Bus Lines */}
          {transit?.busLines && transit.busLines.length > 0 && (
            <div className="flex items-start gap-2.5 text-xs">
              <Bus className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-bold mb-1">{t.busLines}</strong>
                <div className="flex flex-wrap gap-1.5">
                  {transit.busLines.map((bus, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white text-emerald-900 font-medium rounded-md border border-emerald-300/80 shadow-2xs text-[11px]"
                    >
                      {bus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TER Train Station */}
          {transit?.terStation && (
            <div className="flex items-start gap-2.5 text-xs">
              <Train className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-bold">{t.ter}</strong>
                <span className="text-neutral-700 text-[11px]">{transit.terStation}</span>
              </div>
            </div>
          )}

          {/* BRT Station */}
          {transit?.brtStation && (
            <div className="flex items-start gap-2.5 text-xs">
              <Bus className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-bold">{t.brt}</strong>
                <span className="text-neutral-700 text-[11px]">{transit.brtStation}</span>
              </div>
            </div>
          )}

          {/* Car / Taxi / VTC Info */}
          {transit?.carTaxiInfo && (
            <div className="flex items-start gap-2.5 text-xs">
              <Car className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-bold">{t.carTaxi}</strong>
                <span className="text-neutral-700 text-[11px] leading-relaxed">
                  {transit.carTaxiInfo}
                </span>
              </div>
            </div>
          )}

          {/* Special JOJ Shuttle */}
          {transit?.jojShuttle && (
            <div className="flex items-start gap-2.5 text-xs bg-emerald-100/70 p-2 rounded-lg border border-emerald-300/80">
              <Sparkles className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block font-bold">{t.jojShuttle}</strong>
                <span className="text-emerald-900 text-[11px] font-medium">
                  {transit.jojShuttle}
                </span>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-200/80">
            <div className="flex items-center gap-2">
              <a
                href={osmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.openOsm}</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <span>GPS Direct</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>

            {onNavigateToMap && (
              <button
                type="button"
                onClick={onNavigateToMap}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
              >
                {t.viewOnMap}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
