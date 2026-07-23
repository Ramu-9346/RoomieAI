import type { AppNotification } from '@models/Notification';
import type { Order } from '@models/Order';
import type { Poll } from '@models/Poll';
import type { Restaurant } from '@models/Restaurant';

export interface HomeData {
  activeOrder: Order | null;
  pendingPolls: Poll[];
  recentOrders: Order[];
  suggestedRestaurants: Restaurant[];
  notifications: AppNotification[];
  swiggyTokenExpiresAt?: string; // for token expiry warning (BRD C-004)
}

export interface IHomeService {
  /** Aggregate home screen data in a single call */
  getHomeData(flatId: string): Promise<HomeData>;
}
