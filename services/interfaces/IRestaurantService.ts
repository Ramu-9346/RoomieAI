import type { Restaurant, MenuItem } from '@models/Restaurant';

export interface RestaurantSearchParams {
  query?: string;
  lat: number;
  lng: number;
  cuisines?: string[];
  vegOnly?: boolean;
  maxDeliveryTime?: number;
  flatId?: string; // used to filter by member preferences
}

export interface IRestaurantService {
  /** Search restaurants by location and filters */
  searchRestaurants(params: RestaurantSearchParams): Promise<Restaurant[]>;

  /** Get AI-curated suggestions for the flat */
  getSuggestedRestaurants(flatId: string, lat: number, lng: number): Promise<Restaurant[]>;

  /** Get restaurant detail with menu */
  getRestaurantDetail(restaurantId: string): Promise<Restaurant & { menu: MenuItem[] }>;

  /** Get menu for a restaurant */
  getMenu(restaurantId: string): Promise<MenuItem[]>;
}
