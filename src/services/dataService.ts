import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { OlympicEvent, Accommodation, Restaurant, Venue, Ticket, HotelBooking } from '../types';
import { INITIAL_EVENTS, INITIAL_ACCOMMODATIONS, INITIAL_RESTAURANTS, INITIAL_VENUES } from '../data/initialData';

const LOCAL_STORAGE_KEYS = {
  events: 'dakar_joj_events',
  accommodations: 'dakar_joj_accommodations',
  restaurants: 'dakar_joj_restaurants',
  venues: 'dakar_joj_venues',
  tickets: 'dakar_joj_tickets',
  bookings: 'dakar_joj_bookings',
  mySchedule: 'dakar_joj_my_schedule'
};

// Helper for local storage with smart migration & merging
function getLocal<T extends { id?: string; transitGuidance?: any; coordinates?: any }>(key: string, fallback: T[]): T[] {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved) as T[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If parsed length is less than fallback or items miss transit guidance, merge fallback
        const existingMap = new Map(parsed.map(item => [item.id, item]));
        const merged = fallback.map(fallbackItem => {
          const existing = fallbackItem.id ? existingMap.get(fallbackItem.id) : undefined;
          if (!existing) return fallbackItem;
          // Keep user modifications, but ensure coordinates and transitGuidance exist
          return {
            ...fallbackItem,
            ...existing,
            coordinates: existing.coordinates || fallbackItem.coordinates,
            transitGuidance: existing.transitGuidance || fallbackItem.transitGuidance
          };
        });

        // Also append any custom user-added items that aren't in fallback
        parsed.forEach(item => {
          if (item.id && !merged.some(m => m.id === item.id)) {
            merged.push(item);
          }
        });

        setLocal(key, merged);
        return merged;
      }
    }
  } catch (e) {
    console.warn(`Error reading local storage for ${key}`, e);
  }
  setLocal(key, fallback);
  return fallback;
}

function setLocal<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing local storage for ${key}`, e);
  }
}

export class DataService {
  private static instance: DataService;
  private seededCollections = new Set<string>();

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Real-time subscribers
  public subscribeEvents(callback: (events: OlympicEvent[]) => void): () => void {
    const local = getLocal<OlympicEvent>(LOCAL_STORAGE_KEYS.events, INITIAL_EVENTS);
    callback(local);

    try {
      const colRef = collection(db, 'events');
      const unsubscribe = onSnapshot(colRef, async (snapshot) => {
        if (snapshot.empty && !this.seededCollections.has('events')) {
          this.seededCollections.add('events');
          await this.seedCollection('events', INITIAL_EVENTS);
          return;
        }
        if (!snapshot.empty) {
          const list: OlympicEvent[] = [];
          snapshot.forEach((d) => list.push({ ...d.data(), id: d.id } as OlympicEvent));
          setLocal(LOCAL_STORAGE_KEYS.events, list);
          callback(list);
        }
      }, (error) => {
        console.warn('Firestore events listener fallback:', error);
      });
      return unsubscribe;
    } catch (e) {
      console.warn('Events subscription error:', e);
      return () => {};
    }
  }

  public subscribeAccommodations(callback: (items: Accommodation[]) => void): () => void {
    const local = getLocal<Accommodation>(LOCAL_STORAGE_KEYS.accommodations, INITIAL_ACCOMMODATIONS);
    callback(local);

    try {
      const colRef = collection(db, 'accommodations');
      const unsubscribe = onSnapshot(colRef, async (snapshot) => {
        if (snapshot.empty && !this.seededCollections.has('accommodations')) {
          this.seededCollections.add('accommodations');
          await this.seedCollection('accommodations', INITIAL_ACCOMMODATIONS);
          return;
        }
        if (!snapshot.empty) {
          const list: Accommodation[] = [];
          snapshot.forEach((d) => list.push({ ...d.data(), id: d.id } as Accommodation));
          setLocal(LOCAL_STORAGE_KEYS.accommodations, list);
          callback(list);
        }
      }, (error) => {
        console.warn('Firestore accommodations fallback:', error);
      });
      return unsubscribe;
    } catch (e) {
      console.warn('Accommodations subscription error:', e);
      return () => {};
    }
  }

  public subscribeRestaurants(callback: (items: Restaurant[]) => void): () => void {
    const local = getLocal<Restaurant>(LOCAL_STORAGE_KEYS.restaurants, INITIAL_RESTAURANTS);
    callback(local);

    try {
      const colRef = collection(db, 'restaurants');
      const unsubscribe = onSnapshot(colRef, async (snapshot) => {
        if (snapshot.empty && !this.seededCollections.has('restaurants')) {
          this.seededCollections.add('restaurants');
          await this.seedCollection('restaurants', INITIAL_RESTAURANTS);
          return;
        }
        if (!snapshot.empty) {
          const list: Restaurant[] = [];
          snapshot.forEach((d) => list.push({ ...d.data(), id: d.id } as Restaurant));
          setLocal(LOCAL_STORAGE_KEYS.restaurants, list);
          callback(list);
        }
      }, (error) => {
        console.warn('Firestore restaurants fallback:', error);
      });
      return unsubscribe;
    } catch (e) {
      console.warn('Restaurants subscription error:', e);
      return () => {};
    }
  }

  public subscribeVenues(callback: (items: Venue[]) => void): () => void {
    const local = getLocal<Venue>(LOCAL_STORAGE_KEYS.venues, INITIAL_VENUES);
    callback(local);

    try {
      const colRef = collection(db, 'venues');
      const unsubscribe = onSnapshot(colRef, async (snapshot) => {
        if (snapshot.empty && !this.seededCollections.has('venues')) {
          this.seededCollections.add('venues');
          await this.seedCollection('venues', INITIAL_VENUES);
          return;
        }
        if (!snapshot.empty) {
          const list: Venue[] = [];
          snapshot.forEach((d) => list.push({ ...d.data(), id: d.id } as Venue));
          setLocal(LOCAL_STORAGE_KEYS.venues, list);
          callback(list);
        }
      }, (error) => {
        console.warn('Firestore venues fallback:', error);
      });
      return unsubscribe;
    } catch (e) {
      console.warn('Venues subscription error:', e);
      return () => {};
    }
  }

  public subscribeTickets(callback: (items: Ticket[]) => void): () => void {
    const local = getLocal<Ticket>(LOCAL_STORAGE_KEYS.tickets, []);
    callback(local);

    try {
      const colRef = collection(db, 'tickets');
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        const list: Ticket[] = [];
        snapshot.forEach((d) => list.push({ ...d.data(), id: d.id } as Ticket));
        setLocal(LOCAL_STORAGE_KEYS.tickets, list);
        callback(list);
      }, (error) => {
        console.warn('Firestore tickets fallback:', error);
        callback(getLocal<Ticket>(LOCAL_STORAGE_KEYS.tickets, []));
      });
      return unsubscribe;
    } catch (e) {
      return () => {};
    }
  }

  // Seed default collections to Firestore
  public async seedCollection<T extends { id: string }>(colName: string, items: T[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      for (const item of items) {
        const docRef = doc(db, colName, item.id);
        batch.set(docRef, item);
      }
      await batch.commit();
      console.log(`Seeded ${items.length} items to ${colName}`);
    } catch (e) {
      console.warn(`Seeding ${colName} error:`, e);
    }
  }

  // Save / Update generic entity
  public async saveItem<T extends { id: string }>(colName: string, item: T): Promise<void> {
    // 1. Update local storage immediately for fast UI
    const current = getLocal<T>(`dakar_joj_${colName}`, []);
    const index = current.findIndex((x) => x.id === item.id);
    if (index >= 0) {
      current[index] = item;
    } else {
      current.unshift(item);
    }
    setLocal(`dakar_joj_${colName}`, current);

    // 2. Sync with Firestore
    try {
      const docRef = doc(db, colName, item.id);
      await setDoc(docRef, item, { merge: true });
    } catch (e) {
      console.warn(`Error writing to Firestore ${colName}:`, e);
    }
  }

  // Delete entity
  public async deleteItem(colName: string, id: string): Promise<void> {
    const current = getLocal<{ id: string }>(`dakar_joj_${colName}`, []);
    const filtered = current.filter((x) => x.id !== id);
    setLocal(`dakar_joj_${colName}`, filtered);

    try {
      const docRef = doc(db, colName, id);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn(`Error deleting from Firestore ${colName}:`, e);
    }
  }

  // Book Ticket
  public async purchaseTicket(ticket: Omit<Ticket, 'id' | 'bookingCode' | 'purchasedAt'>): Promise<Ticket> {
    const id = 'tkt-' + Math.random().toString(36).substring(2, 9);
    const bookingCode = 'JOJ-' + Math.floor(100000 + Math.random() * 900000);
    const fullTicket: Ticket = {
      ...ticket,
      id,
      bookingCode,
      purchasedAt: new Date().toISOString()
    };
    await this.saveItem('tickets', fullTicket);
    return fullTicket;
  }

  // Book Hotel Room
  public async bookHotel(booking: Omit<HotelBooking, 'id' | 'bookedAt'>): Promise<HotelBooking> {
    const id = 'bk-' + Math.random().toString(36).substring(2, 9);
    const fullBooking: HotelBooking = {
      ...booking,
      id,
      bookedAt: new Date().toISOString()
    };
    await this.saveItem('bookings', fullBooking);
    return fullBooking;
  }

  // User's custom program saved in LocalStorage & sync
  public getMySchedule(): string[] {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.mySchedule);
      return saved ? JSON.parse(saved) : ['evt-1', 'evt-2'];
    } catch {
      return ['evt-1', 'evt-2'];
    }
  }

  public toggleMySchedule(eventId: string): string[] {
    const current = this.getMySchedule();
    const exists = current.includes(eventId);
    const updated = exists ? current.filter((id) => id !== eventId) : [...current, eventId];
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.mySchedule, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving schedule', e);
    }
    return updated;
  }

  // Export full DB to JSON
  public async exportFullDatabase(): Promise<string> {
    const events = getLocal<OlympicEvent>(LOCAL_STORAGE_KEYS.events, INITIAL_EVENTS);
    const accommodations = getLocal<Accommodation>(LOCAL_STORAGE_KEYS.accommodations, INITIAL_ACCOMMODATIONS);
    const restaurants = getLocal<Restaurant>(LOCAL_STORAGE_KEYS.restaurants, INITIAL_RESTAURANTS);
    const venues = getLocal<Venue>(LOCAL_STORAGE_KEYS.venues, INITIAL_VENUES);
    const tickets = getLocal<Ticket>(LOCAL_STORAGE_KEYS.tickets, []);

    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      events,
      accommodations,
      restaurants,
      venues,
      tickets
    };
    return JSON.stringify(data, null, 2);
  }

  // Import JSON DB
  public async importFullDatabase(jsonString: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.events)) {
        setLocal(LOCAL_STORAGE_KEYS.events, data.events);
        await this.seedCollection('events', data.events);
      }
      if (Array.isArray(data.accommodations)) {
        setLocal(LOCAL_STORAGE_KEYS.accommodations, data.accommodations);
        await this.seedCollection('accommodations', data.accommodations);
      }
      if (Array.isArray(data.restaurants)) {
        setLocal(LOCAL_STORAGE_KEYS.restaurants, data.restaurants);
        await this.seedCollection('restaurants', data.restaurants);
      }
      if (Array.isArray(data.venues)) {
        setLocal(LOCAL_STORAGE_KEYS.venues, data.venues);
        await this.seedCollection('venues', data.venues);
      }
      return true;
    } catch (e) {
      console.error('Failed to import database JSON:', e);
      return false;
    }
  }

  // Reset to default data
  public async resetToDefaults(): Promise<void> {
    setLocal(LOCAL_STORAGE_KEYS.events, INITIAL_EVENTS);
    setLocal(LOCAL_STORAGE_KEYS.accommodations, INITIAL_ACCOMMODATIONS);
    setLocal(LOCAL_STORAGE_KEYS.restaurants, INITIAL_RESTAURANTS);
    setLocal(LOCAL_STORAGE_KEYS.venues, INITIAL_VENUES);
    await Promise.all([
      this.seedCollection('events', INITIAL_EVENTS),
      this.seedCollection('accommodations', INITIAL_ACCOMMODATIONS),
      this.seedCollection('restaurants', INITIAL_RESTAURANTS),
      this.seedCollection('venues', INITIAL_VENUES)
    ]);
  }
}

export const dataService = DataService.getInstance();
