export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  forMemberIds: string[]; // which members this item is for
  notes?: string;
}

export interface Cart {
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number; // sum of item prices
  deliveryFee: number;
  total: number;
  memberSelections: Record<string, string[]>; // memberId → menuItemId[]
  capWarning?: string; // set when approaching ₹1000 cap (BRD C-002)
  isOverCap: boolean;
}

export interface CartSummaryByMember {
  memberId: string;
  memberName: string;
  memberIndex: number;
  items: CartItem[];
  subtotal: number;
}
