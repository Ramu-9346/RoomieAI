/**
 * StaticRestaurantService — reads from mock/restaurants.json.
 * Swap for ApiRestaurantService when .NET backend is ready.
 */

import type { IRestaurantService, RestaurantSearchParams } from '../../interfaces/IRestaurantService';
import type { Restaurant, MenuItem }                        from '@models/Restaurant';
import restaurantsData                                      from '@mock/restaurants.json';

export class StaticRestaurantService implements IRestaurantService {
  async searchRestaurants(params: RestaurantSearchParams): Promise<Restaurant[]> {
    const all = restaurantsData.restaurants as Restaurant[];

    return all.filter((r) => {
      if (params.vegOnly && !r.isVegOnly) return false;
      if (params.query) {
        const q = params.query.toLowerCase();
        return r.name.toLowerCase().includes(q) ||
               r.cuisines.some((c) => c.toLowerCase().includes(q));
      }
      return true;
    });
  }

  async getSuggestedRestaurants(flatId: string, lat: number, lng: number): Promise<Restaurant[]> {
    const all = restaurantsData.restaurants as Restaurant[];
    return all.filter((r) => r.fitReason != null).slice(0, 3);
  }

  async getRestaurantDetail(restaurantId: string): Promise<Restaurant & { menu: MenuItem[] }> {
    const all  = restaurantsData.restaurants as Restaurant[];
    const rest = all.find((r) => r.id === restaurantId);
    if (!rest) throw new Error(`Restaurant not found: ${restaurantId}`);
    return { ...rest, menu: restaurantsData.menu as MenuItem[] };
  }

  async getMenu(restaurantId: string): Promise<MenuItem[]> {
    return restaurantsData.menu as MenuItem[];
  }
}
