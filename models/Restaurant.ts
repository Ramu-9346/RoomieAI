export type RestaurantCategory = 'food' | 'dineout';

export interface Restaurant {
  id: string;
  name: string;
  category: RestaurantCategory;
  cuisines: string[];
  rating: number;
  ratingCount: number;
  deliveryTimeMin: number;     // minutes
  distanceKm: number;
  minOrderAmount: number;      // ₹
  costForTwo: number;          // ₹
  imageUrl?: string;
  emoji?: string;              // display emoji fallback
  isVegOnly: boolean;
  isOpen: boolean;
  swiggyRestaurantId: string;  // Swiggy's internal ID for MCP calls
  fitReason?: string;          // AI-generated: why it was suggested
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;               // ₹
  isVeg: boolean;
  imageUrl?: string;
  category: string;
  isAvailable: boolean;
}
