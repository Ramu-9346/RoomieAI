import type { Restaurant } from '@models/Restaurant';

export interface DineoutBooking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;       // ISO date
  time: string;       // "8:00 PM"
  partySize: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  swiggyBookingId: string;
}

export interface IDineoutService {
  /** Search dineout restaurants */
  searchDineout(lat: number, lng: number, partySize: number): Promise<Restaurant[]>;

  /** Get available time slots for a restaurant */
  getTimeSlots(restaurantId: string, date: string, partySize: number): Promise<string[]>;

  /** Book a table */
  bookTable(params: {
    restaurantId: string;
    date: string;
    time: string;
    partySize: number;
    flatId: string;
  }): Promise<DineoutBooking>;

  /** Cancel a booking */
  cancelBooking(bookingId: string): Promise<void>;
}
