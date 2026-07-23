/**
 * Deep link configuration for Expo Router.
 * Scheme: roomieai://
 *
 * Supported deep links:
 *   roomieai://join?code=FLAT4B       → Join flat screen
 *   roomieai://order?id=order_001     → Order detail modal
 *   roomieai://poll?id=poll_001       → Poll detail modal
 *   roomieai://payment?id=order_001   → Payment detail modal
 */

import type { LinkingOptions } from '@react-navigation/native';

export const linkingConfig: LinkingOptions<Record<string, unknown>> = {
  prefixes: ['roomieai://', 'https://roomieai.in'],
  config: {
    screens: {
      '(auth)': {
        screens: {
          login: 'login',
          verify: 'verify',
        },
      },
      '(main)': {
        screens: {
          '(tabs)': {
            screens: {
              home: 'home',
              ai: 'ai',
              orders: 'orders',
              flat: 'flat',
              profile: 'profile',
            },
          },
          'order-detail': 'order/:id',
          'restaurant-detail': 'restaurant/:id',
          'poll-detail': 'poll/:id',
          'payment-detail': 'payment/:id',
          'invite-member': 'join',
        },
      },
    },
  },
};
