/**
 * Application-wide enums.
 * Use these instead of raw strings to catch typos at compile time.
 */

export enum AppEnvironment {
  Development = 'development',
  Staging     = 'staging',
  Production  = 'production',
}

export enum OrderStatus {
  Pending          = 'pending',
  Confirmed        = 'confirmed',
  Placed           = 'placed',
  Preparing        = 'preparing',
  OutForDelivery   = 'out_for_delivery',
  Delivered        = 'delivered',
  Cancelled        = 'cancelled',
}

export enum OrderCategory {
  Food     = 'food',
  Grocery  = 'grocery',
  Dineout  = 'dineout',
}

export enum PollStatus {
  Active  = 'active',
  Closed  = 'closed',
  Expired = 'expired',
}

export enum SplitStatus {
  Self     = 'self',
  Pending  = 'pending',
  Sent     = 'sent',
  Settled  = 'settled',
}

export enum DietaryType {
  Veg        = 'veg',
  NonVeg     = 'non-veg',
  Eggetarian = 'eggetarian',
  Jain       = 'jain',
  Vegan      = 'vegan',
}

export enum NotificationType {
  PollCreated      = 'poll_created',
  PollClosed       = 'poll_closed',
  OrderPlaced      = 'order_placed',
  OrderDelivered   = 'order_delivered',
  OrderCancelled   = 'order_cancelled',
  PaymentReceived  = 'payment_received',
  PaymentReminder  = 'payment_reminder',
  MemberJoined     = 'member_joined',
  MemberLeft       = 'member_left',
  TokenExpiry      = 'token_expiry',
  System           = 'system',
}

export enum MessageRole {
  User      = 'user',
  Assistant = 'assistant',
  System    = 'system',
}

export enum StorageKey {
  AuthToken    = '@roomieai:auth_token',
  User         = '@roomieai:user',
  FlatId       = '@roomieai:flat_id',
  Onboarded    = '@roomieai:onboarded',
  ThemeScheme  = '@roomieai:theme',
  PushToken    = '@roomieai:push_token',
}
