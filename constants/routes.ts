/**
 * Typed route constants.
 * Use these instead of raw strings to prevent typos.
 */

export const Routes = {
  // Auth
  Auth: {
    Login:      '/(auth)/login'      as const,
    Onboarding: '/(auth)/onboarding' as const,
    Verify:     '/(auth)/verify'     as const,
  },

  // Main tabs
  Tabs: {
    Chat:    '/(main)/(tabs)/chat'    as const,
    Orders:  '/(main)/(tabs)/orders'  as const,
    Flat:    '/(main)/(tabs)/flat'    as const,
    History: '/(main)/(tabs)/history' as const,
  },

  // Modals (within main)
  Modal: {
    OrderDetail:      '/(main)/order-detail'      as const,
    RestaurantDetail: '/(main)/restaurant-detail'  as const,
    PollDetail:       '/(main)/poll-detail'        as const,
    MemberProfile:    '/(main)/member-profile'     as const,
    PaymentDetail:    '/(main)/payment-detail'     as const,
    InviteMember:     '/(main)/invite-member'      as const,
    Settings:         '/(main)/settings'           as const,
  },
} as const;

// Deep link paths (for push notification handling)
export const DeepLinks = {
  JoinFlat: 'join',
  Order:    'order',
  Poll:     'poll',
  Payment:  'payment',
} as const;
