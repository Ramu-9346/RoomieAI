/**
 * Typed route constants.
 * Use these instead of raw strings to prevent typos.
 */

export const Routes = {
  // Splash
  Splash: '/' as const,

  // Onboarding (Phase 5 — no auth required)
  Onboarding: '/(onboarding)' as const,

  // Auth (future — slots in without restructuring)
  Auth: {
    Login: '/(auth)/login' as const,
    Onboarding: '/(auth)/onboarding' as const,
    Verify: '/(auth)/verify' as const,
  },

  // Main tabs (Phase 5: 5-tab layout)
  Tabs: {
    Home: '/(main)/(tabs)/home' as const,
    AI: '/(main)/(tabs)/ai' as const,
    Orders: '/(main)/(tabs)/orders' as const,
    Flat: '/(main)/(tabs)/flat' as const,
    Profile: '/(main)/(tabs)/profile' as const,
  },

  // Modals (within main)
  Modal: {
    OrderDetail: '/(main)/order-detail' as const,
    RestaurantDetail: '/(main)/restaurant-detail' as const,
    PollDetail: '/(main)/poll-detail' as const,
    MemberProfile: '/(main)/member-profile' as const,
    PaymentDetail: '/(main)/payment-detail' as const,
    InviteMember: '/(main)/invite-member' as const,
    Settings: '/(main)/settings' as const,
  },
} as const;

// Deep link paths (for push notification handling)
export const DeepLinks = {
  JoinFlat: 'join',
  Order: 'order',
  Poll: 'poll',
  Payment: 'payment',
} as const;
