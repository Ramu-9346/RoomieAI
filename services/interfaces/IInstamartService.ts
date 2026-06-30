import type { GroceryItem } from '@models/Cart';

export interface GroceryProduct {
  id: string;
  name: string;
  brand?: string;
  unit: string;         // "1L", "500g", "12 pc"
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  instamartProductId: string;
}

export interface GroceryCart {
  items: Array<{ product: GroceryProduct; quantity: number }>;
  total: number;
  estimatedDeliveryMinutes: number;
}

export interface IInstamartService {
  /** Search Instamart products */
  searchProducts(query: string, lat: number, lng: number): Promise<GroceryProduct[]>;

  /** Build AI-curated grocery cart based on flat needs */
  buildSmartCart(flatId: string, lat: number, lng: number): Promise<GroceryCart>;

  /** Place grocery order */
  placeGroceryOrder(flatId: string, cart: GroceryCart): Promise<{ orderId: string }>;
}
