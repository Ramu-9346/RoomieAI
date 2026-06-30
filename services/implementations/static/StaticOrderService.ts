/**
 * StaticOrderService — reads from mock/orders.json.
 * Swap for ApiOrderService when .NET backend is ready.
 */

import type { IOrderService, PlaceOrderParams } from '../../interfaces/IOrderService';
import type { Order, OrderStatus, OrderHistoryItem } from '@models/Order';
import ordersData                                     from '@mock/orders.json';
import { nowISO }                                     from '@utils/date';

export class StaticOrderService implements IOrderService {
  async placeOrder(params: PlaceOrderParams): Promise<Order> {
    // In mock mode, return a synthetic placed order
    const order: Order = {
      id:              `order_${Date.now()}`,
      flatId:          params.flatId,
      category:        'food',
      restaurantId:    params.cart.restaurantId,
      restaurantName:  params.cart.restaurantName,
      items:           params.cart.items,
      subtotal:        params.cart.subtotal,
      deliveryFee:     params.cart.deliveryFee,
      total:           params.cart.total,
      status:          'placed',
      placedByUserId:  'current-user',
      memberIds:       params.memberIds,
      placedAt:        nowISO(),
      createdAt:       nowISO(),
      updatedAt:       nowISO(),
    };
    return order;
  }

  async getOrder(orderId: string): Promise<Order> {
    const found = (ordersData.orders as Order[]).find((o) => o.id === orderId);
    if (!found) throw new Error(`Order not found: ${orderId}`);
    return found;
  }

  async getOrderHistory(flatId: string): Promise<OrderHistoryItem[]> {
    return ordersData.history as OrderHistoryItem[];
  }

  async cancelOrder(orderId: string, reason: string): Promise<void> {
    // No-op in static mode
  }

  async pollOrderStatus(orderId: string): Promise<OrderStatus> {
    return 'placed';
  }
}
