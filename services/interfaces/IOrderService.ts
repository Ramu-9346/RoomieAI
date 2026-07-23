import type { Cart } from '@models/Cart';
import type { Order, OrderStatus, OrderHistoryItem } from '@models/Order';

export interface PlaceOrderParams {
  flatId: string;
  cart: Cart;
  memberIds: string[];
  deliveryNote?: string;
}

export interface IOrderService {
  /** Place a new order (COD only — BRD C-001) */
  placeOrder(params: PlaceOrderParams): Promise<Order>;

  /** Get live order status */
  getOrder(orderId: string): Promise<Order>;

  /** Get order history for the flat */
  getOrderHistory(flatId: string, page?: number): Promise<OrderHistoryItem[]>;

  /** Cancel an order (only if not yet preparing) */
  cancelOrder(orderId: string, reason: string): Promise<void>;

  /** Subscribe to order status updates (polling fallback) */
  pollOrderStatus(orderId: string): Promise<OrderStatus>;
}
