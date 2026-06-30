/**
 * Shared utility types used across the app.
 */

// Makes specified keys optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Makes specified keys required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Nullable wrapper
export type Nullable<T> = T | null;

// Loading state tuple
export type AsyncState<T> = { data: T; loading: boolean; error: string | null };

// ID types for domain clarity
export type UserId         = string;
export type FlatId         = string;
export type OrderId        = string;
export type PollId         = string;
export type RestaurantId   = string;
export type NotificationId = string;
export type ConversationId = string;

// Currency — always in paise internally, display as ₹
export type PaiseAmount = number;
export type RupeeDisplay = string;  // "₹449"

// Form field error map
export type FieldErrors<T extends object> = Partial<Record<keyof T, string>>;

// Generic callback types
export type VoidCallback    = () => void;
export type AsyncCallback   = () => Promise<void>;
export type Callback<T>     = (value: T) => void;
export type AsyncCallbackFn<T> = (value: T) => Promise<void>;
