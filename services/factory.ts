/**
 * ServiceFactory — resolves the correct service implementation.
 *
 * Layer priority:
 *   1. EXPO_PUBLIC_USE_MOCK_DATA=true  → Static (JSON) implementation
 *   2. (future) EXPO_PUBLIC_APP_ENV=development  → API implementation pointing to local .NET
 *   3. (future) production  → API implementation pointing to prod .NET
 *
 * Adding a new data source never touches UI components or hooks —
 * only this factory and the service implementation change.
 */

import { StaticHomeService } from './implementations/static/StaticHomeService';
import { StaticOrderService } from './implementations/static/StaticOrderService';
import { StaticRestaurantService } from './implementations/static/StaticRestaurantService';
import type { IHomeService } from './interfaces/IHomeService';
import type { IOrderService } from './interfaces/IOrderService';
import type { IRestaurantService } from './interfaces/IRestaurantService';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

// ─── Singleton instances ───────────────────────────────────────────────────────
// Instantiated once; shared across the app via this module.

export const RestaurantService: IRestaurantService = USE_MOCK
  ? new StaticRestaurantService()
  : new StaticRestaurantService(); // swap right side for ApiRestaurantService

export const OrderService: IOrderService = USE_MOCK
  ? new StaticOrderService()
  : new StaticOrderService(); // swap for ApiOrderService

export const HomeService: IHomeService = USE_MOCK
  ? new StaticHomeService()
  : new StaticHomeService(); // swap for ApiHomeService
