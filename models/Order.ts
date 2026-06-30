import type { CartItem } from './Cart';
import type { Payment } from './Payment';

export type OrderStatus =
  | 'pending'        // AI building order, not yet placed
  | 'confirmed'      // user held-to-confirm, waiting Swiggy
  | 'placed'         // Swiggy accepted
  | 'preparing'      // restaurant acknowledged
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type OrderCategory = 'food' | 'grocery' | 'dineout';

export interface Order {
  id: string;
  flatId: string;
  category: OrderCategory;
  restaurantId: string;
  restaurantName: string;
  restaurantEmoji?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  placedByUserId: string;
  memberIds: string[];
  payment?: Payment;
  swiggyOrderId?: string;      // populated after Swiggy places order
  estimatedDeliveryAt?: string;
  placedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderHistoryItem {
  id: string;
  category: OrderCategory;
  restaurantName: string;
  restaurantEmoji?: string;
  itemCount: number;
  total: number;
  status: OrderStatus;
  settlementStatus: 'all-settled' | 'partial' | 'pending';
  createdAt: string;
}
