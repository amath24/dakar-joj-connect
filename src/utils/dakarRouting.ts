/**
 * DAKAR REAL-ROAD & TERRESTRIAL ROUTING ENGINE (JOJ DAKAR 2026)
 * Fetches real OpenStreetMap turn-by-turn road networks (OSRM)
 * with robust zero-ocean terrestrial corridor fallback.
 */

export interface DakarRouteResult {
  points: [number, number][];
  distanceKm: number;
  durationMinutes: number;
  isRealRoad: boolean;
}

// In-memory route cache for instant switching
const routeCache = new Map<string, DakarRouteResult>();

export type DakarZone =
  | 'PLATEAU'
  | 'MEDINA_FANN'
  | 'OUAKAM_ALMADIES'
  | 'GRAND_YOFF'
  | 'PIKINE_GUEDIAWAYE'
  | 'RUFISQUE'
  | 'DIAMNIADIO'
  | 'AIBD';

export function getDakarZone(lat: number, lng: number): DakarZone {
  if (lng > -17.15) return 'AIBD';
  if (lng > -17.23) return 'DIAMNIADIO';
  if (lng > -17.34) return 'RUFISQUE';
  if (lng > -17.43) return 'PIKINE_GUEDIAWAYE';
  
  // Dakar Peninsula (lng <= -17.43)
  if (lng < -17.48 || (lat > 14.715 && lng < -17.47)) {
    return 'OUAKAM_ALMADIES';
  }
  if (lat > 14.73) {
    return 'GRAND_YOFF';
  }
  if (lat >= 14.68 && lng <= -17.445) {
    return 'MEDINA_FANN';
  }
  return 'PLATEAU';
}

/**
 * Key terrestrial waypoints along Dakar's solid road/rail infrastructure (for offline fallback)
 */
const LAND_NODES = {
  // Axe TER / Autoroute Baie de Hann (South -> East)
  COLOBANE: [14.6930, -17.4420] as [number, number],
  HANN: [14.7220, -17.4450] as [number, number],
  PATTEDOIE: [14.7390, -17.4370] as [number, number],
  PIKINE: [14.7570, -17.3940] as [number, number],
  THIAROYE: [14.7620, -17.3760] as [number, number],
  KEUR_MASSAR: [14.7660, -17.2910] as [number, number],
  RUFISQUE: [14.7260, -17.2700] as [number, number],
  BARGNY: [14.7170, -17.2300] as [number, number],
  DIAMNIADIO_HUB: [14.7268, -17.1884] as [number, number],

  // Axe Corniche Ouest & VDN (South -> West)
  MEDINA: [14.6865, -17.4497] as [number, number],
  FANN_POINT_E: [14.6934, -17.4662] as [number, number],
  MERMOZ_VDN: [14.7120, -17.4760] as [number, number],
  OUAKAM: [14.7222, -17.4947] as [number, number],
  ALMADIES: [14.7478, -17.5186] as [number, number],

  // Axe BRT (South -> North)
  OBELISQUE: [14.6950, -17.4520] as [number, number],
  BOURGUIBA: [14.7082, -17.4611] as [number, number],
  LIBERTE6: [14.7230, -17.4590] as [number, number],
  SENGHOR: [14.7483, -17.4528] as [number, number],
  GUEDIAWAYE: [14.7650, -17.4000] as [number, number],
  ARENE_NATIONALE: [14.7612, -17.3821] as [number, number]
};

/**
 * Computes a list of intermediate waypoints strictly on land between origin and destination
 */
export function getTerrestrialWaypoints(
  origin: [number, number],
  dest: [number, number]
): [number, number][] {
  const originZone = getDakarZone(origin[0], origin[1]);
  const destZone = getDakarZone(dest[0], dest[1]);

  if (originZone === destZone) {
    return [];
  }

  // 1. Toward DIAMNIADIO / RUFISQUE / AIBD
  if (destZone === 'DIAMNIADIO' || destZone === 'RUFISQUE' || destZone === 'AIBD') {
    const waypointsToEast: [number, number][] = [];

    if (originZone === 'OUAKAM_ALMADIES') {
      waypointsToEast.push(LAND_NODES.OUAKAM, LAND_NODES.SENGHOR, LAND_NODES.PATTEDOIE);
    } else if (originZone === 'GRAND_YOFF') {
      waypointsToEast.push(LAND_NODES.PATTEDOIE);
    } else if (originZone === 'MEDINA_FANN') {
      waypointsToEast.push(LAND_NODES.MEDINA, LAND_NODES.COLOBANE, LAND_NODES.HANN, LAND_NODES.PATTEDOIE);
    } else if (originZone === 'PLATEAU') {
      waypointsToEast.push(LAND_NODES.COLOBANE, LAND_NODES.HANN, LAND_NODES.PATTEDOIE);
    }

    waypointsToEast.push(LAND_NODES.PIKINE, LAND_NODES.THIAROYE, LAND_NODES.KEUR_MASSAR, LAND_NODES.RUFISQUE);

    if (destZone === 'DIAMNIADIO' || destZone === 'AIBD') {
      waypointsToEast.push(LAND_NODES.BARGNY, LAND_NODES.DIAMNIADIO_HUB);
    }

    return waypointsToEast;
  }

  // 2. Coming FROM Diamniadio / Rufisque / AIBD toward Dakar Peninsula
  if (originZone === 'DIAMNIADIO' || originZone === 'RUFISQUE' || originZone === 'AIBD') {
    const waypointsFromEast: [number, number][] = [];

    if (originZone === 'AIBD' || originZone === 'DIAMNIADIO') {
      waypointsFromEast.push(LAND_NODES.DIAMNIADIO_HUB, LAND_NODES.BARGNY);
    }
    waypointsFromEast.push(LAND_NODES.RUFISQUE, LAND_NODES.KEUR_MASSAR, LAND_NODES.THIAROYE, LAND_NODES.PIKINE, LAND_NODES.PATTEDOIE);

    if (destZone === 'OUAKAM_ALMADIES') {
      waypointsFromEast.push(LAND_NODES.SENGHOR, LAND_NODES.OUAKAM);
    } else if (destZone === 'MEDINA_FANN') {
      waypointsFromEast.push(LAND_NODES.HANN, LAND_NODES.COLOBANE, LAND_NODES.MEDINA);
    } else if (destZone === 'PLATEAU') {
      waypointsFromEast.push(LAND_NODES.HANN, LAND_NODES.COLOBANE);
    }

    return waypointsFromEast;
  }

  // 3. Toward PIKINE / GUEDIAWAYE / ARÈNE NATIONALE
  if (destZone === 'PIKINE_GUEDIAWAYE') {
    if (originZone === 'PLATEAU') {
      return [LAND_NODES.COLOBANE, LAND_NODES.HANN, LAND_NODES.PATTEDOIE, LAND_NODES.PIKINE];
    }
    if (originZone === 'MEDINA_FANN') {
      return [LAND_NODES.MEDINA, LAND_NODES.COLOBANE, LAND_NODES.HANN, LAND_NODES.PATTEDOIE, LAND_NODES.PIKINE];
    }
    if (originZone === 'OUAKAM_ALMADIES') {
      return [LAND_NODES.OUAKAM, LAND_NODES.SENGHOR, LAND_NODES.PATTEDOIE, LAND_NODES.PIKINE];
    }
    if (originZone === 'GRAND_YOFF') {
      return [LAND_NODES.PATTEDOIE, LAND_NODES.PIKINE];
    }
  }

  // 4. Toward OUAKAM / ALMADIES (West Coast)
  if (destZone === 'OUAKAM_ALMADIES') {
    if (originZone === 'PLATEAU') {
      return [LAND_NODES.MEDINA, LAND_NODES.FANN_POINT_E, LAND_NODES.MERMOZ_VDN, LAND_NODES.OUAKAM];
    }
    if (originZone === 'MEDINA_FANN') {
      return [LAND_NODES.FANN_POINT_E, LAND_NODES.MERMOZ_VDN, LAND_NODES.OUAKAM];
    }
    if (originZone === 'GRAND_YOFF') {
      return [LAND_NODES.SENGHOR, LAND_NODES.OUAKAM];
    }
    if (originZone === 'PIKINE_GUEDIAWAYE') {
      return [LAND_NODES.PATTEDOIE, LAND_NODES.SENGHOR, LAND_NODES.OUAKAM];
    }
  }

  // 5. Toward GRAND YOFF / SENGHOR (North)
  if (destZone === 'GRAND_YOFF') {
    if (originZone === 'PLATEAU') {
      return [LAND_NODES.COLOBANE, LAND_NODES.OBELISQUE, LAND_NODES.BOURGUIBA, LAND_NODES.LIBERTE6];
    }
    if (originZone === 'MEDINA_FANN') {
      return [LAND_NODES.BOURGUIBA, LAND_NODES.LIBERTE6];
    }
    if (originZone === 'OUAKAM_ALMADIES') {
      return [LAND_NODES.OUAKAM];
    }
    if (originZone === 'PIKINE_GUEDIAWAYE') {
      return [LAND_NODES.PATTEDOIE];
    }
  }

  // 6. Toward MEDINA / FANN / POINT E
  if (destZone === 'MEDINA_FANN') {
    if (originZone === 'OUAKAM_ALMADIES') {
      return [LAND_NODES.OUAKAM, LAND_NODES.MERMOZ_VDN, LAND_NODES.FANN_POINT_E];
    }
    if (originZone === 'PLATEAU') {
      return [LAND_NODES.MEDINA];
    }
    if (originZone === 'GRAND_YOFF') {
      return [LAND_NODES.LIBERTE6, LAND_NODES.BOURGUIBA];
    }
    if (originZone === 'PIKINE_GUEDIAWAYE') {
      return [LAND_NODES.PATTEDOIE, LAND_NODES.HANN, LAND_NODES.COLOBANE];
    }
  }

  // 7. Toward PLATEAU (South)
  if (destZone === 'PLATEAU') {
    if (originZone === 'OUAKAM_ALMADIES') {
      return [LAND_NODES.OUAKAM, LAND_NODES.MERMOZ_VDN, LAND_NODES.FANN_POINT_E, LAND_NODES.MEDINA];
    }
    if (originZone === 'MEDINA_FANN') {
      return [LAND_NODES.MEDINA];
    }
    if (originZone === 'GRAND_YOFF') {
      return [LAND_NODES.LIBERTE6, LAND_NODES.BOURGUIBA, LAND_NODES.OBELISQUE, LAND_NODES.COLOBANE];
    }
    if (originZone === 'PIKINE_GUEDIAWAYE') {
      return [LAND_NODES.PATTEDOIE, LAND_NODES.HANN, LAND_NODES.COLOBANE];
    }
  }

  return [];
}

/**
 * Returns the complete array of coordinates from origin to destination strictly on land
 */
export function getFullTerrestrialRoute(
  origin: [number, number],
  dest: [number, number]
): [number, number][] {
  const waypoints = getTerrestrialWaypoints(origin, dest);
  return [origin, ...waypoints, dest];
}

/**
 * Calculates polyline length in kilometers using Haversine
 */
export function calculateDistanceKm(points: [number, number][]): number {
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [lat1, lon1] = points[i];
    const [lat2, lon2] = points[i + 1];
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    total += R * c;
  }
  return Math.round(total * 10) / 10;
}

/**
 * Asynchronously queries the live OpenStreetMap (OSRM) Road Routing API.
 * Uses exact road coordinates and turns. Falls back gracefully to land waypoints if offline.
 */
export async function fetchLiveRoadRoute(
  origin: [number, number],
  dest: [number, number],
  mode: 'TRANSIT' | 'DRIVE' | 'WALK' = 'DRIVE'
): Promise<DakarRouteResult> {
  const cacheKey = `${origin[0].toFixed(4)},${origin[1].toFixed(4)}_${dest[0].toFixed(4)},${dest[1].toFixed(4)}_${mode}`;

  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey)!;
  }

  const osrmProfile = mode === 'WALK' ? 'foot' : 'driving';
  const startLng = origin[1];
  const startLat = origin[0];
  const destLng = dest[1];
  const destLat = dest[0];

  // Try OpenStreetMap OSRM public routing servers
  const endpoints = [
    `https://router.project-osrm.org/route/v1/${osrmProfile}/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`,
    `https://routing.openstreetmap.de/routed-car/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // GeoJSON coordinates are [lng, lat], convert to Leaflet [lat, lng]
          const roadPoints: [number, number][] = route.geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );

          // Guarantee exact origin & destination pinning
          if (roadPoints.length > 0) {
            roadPoints[0] = origin;
            roadPoints[roadPoints.length - 1] = dest;
          }

          const distKm = Math.round((route.distance / 1000) * 10) / 10;
          const durMin = Math.round(route.duration / 60);

          const result: DakarRouteResult = {
            points: roadPoints,
            distanceKm: distKm,
            durationMinutes: durMin,
            isRealRoad: true
          };

          routeCache.set(cacheKey, result);
          return result;
        }
      }
    } catch (err) {
      // Continue to next endpoint or fallback
    }
  }

  // Fallback to strict terrestrial corridor
  const fallbackPoints = getFullTerrestrialRoute(origin, dest);
  const fallbackDist = calculateDistanceKm(fallbackPoints);
  const fallbackDuration = mode === 'WALK' 
    ? Math.round((fallbackDist / 4.5) * 60)
    : Math.max(8, Math.round(fallbackDist * 1.6));

  const fallbackResult: DakarRouteResult = {
    points: fallbackPoints,
    distanceKm: fallbackDist,
    durationMinutes: fallbackDuration,
    isRealRoad: false
  };

  routeCache.set(cacheKey, fallbackResult);
  return fallbackResult;
}
