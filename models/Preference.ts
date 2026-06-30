export type DietaryType = 'veg' | 'non-veg' | 'eggetarian' | 'jain' | 'vegan';

export interface Preference {
  userId: string;
  dietaryType: DietaryType;
  allergens: Allergen[];
  cuisines: string[];            // ["South Indian", "Chinese"]
  budgetPerOrder: number;        // ₹ per member per order
  spiceTolerance: 'mild' | 'medium' | 'hot';
  updatedAt: string;
}

export type Allergen =
  | 'gluten'
  | 'dairy'
  | 'nuts'
  | 'eggs'
  | 'shellfish'
  | 'soy'
  | 'fish'
  | 'sesame';
