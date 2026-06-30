/**
 * OrderStore — current active order and cart state.
 * Live orders are tracked here so components react to status changes.
 */

import { create } from 'zustand';
import { immer }  from 'zustand/middleware/immer';

import type { Order, OrderStatus } from '@models/Order';
import type { Cart }               from '@models/Cart';

interface OrderState {
  activeOrder: Order | null;
  cart: Cart | null;
  recentOrders: Order[];
  isPlacing: boolean;

  // Actions
  setActiveOrder:  (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setCart:         (cart: Cart | null) => void;
  clearCart:       () => void;
  setRecentOrders: (orders: Order[]) => void;
  setPlacing:      (placing: boolean) => void;
  clearOrders:     () => void;
}

export const useOrderStore = create<OrderState>()(
  immer((set) => ({
    activeOrder:  null,
    cart:         null,
    recentOrders: [],
    isPlacing:    false,

    setActiveOrder: (order) =>
      set((state) => { state.activeOrder = order; }),

    updateOrderStatus: (orderId, status) =>
      set((state) => {
        if (state.activeOrder?.id === orderId) {
          state.activeOrder.status = status;
        }
        const idx = state.recentOrders.findIndex((o) => o.id === orderId);
        if (idx !== -1) state.recentOrders[idx]!.status = status;
      }),

    setCart: (cart) =>
      set((state) => { state.cart = cart; }),

    clearCart: () =>
      set((state) => { state.cart = null; }),

    setRecentOrders: (orders) =>
      set((state) => { state.recentOrders = orders; }),

    setPlacing: (placing) =>
      set((state) => { state.isPlacing = placing; }),

    clearOrders: () =>
      set((state) => {
        state.activeOrder  = null;
        state.cart         = null;
        state.recentOrders = [];
        state.isPlacing    = false;
      }),
  })),
);
