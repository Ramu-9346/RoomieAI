# Navigation Architecture

## Expo Router — File-Based Routing

RoomieAI uses Expo Router v4 for type-safe, file-system-based navigation. Every file in `app/` is a route.

## Route Groups

Route groups use `(parentheses)` naming and do NOT appear in the URL path. They exist to share a layout without affecting the URL.

```
(auth)/login     → URL: /login
(main)/(tabs)/chat → URL: /chat
```

## Full Route Tree

```
app/
├── _layout.tsx              ← Root: font loading + AppProvider
│                              Redirects to (auth) or (main) based on session
│
├── (auth)/_layout.tsx       ← Stack navigator, no header
│   ├── login.tsx            → /login
│   ├── verify.tsx           → /verify
│   └── onboarding.tsx       → /onboarding
│
└── (main)/_layout.tsx       ← Stack with modal presentations
    ├── (tabs)/_layout.tsx   ← Custom tab bar (Phase 2 BottomTabBar)
    │   ├── chat/index.tsx   → /chat   (default tab)
    │   ├── orders/index.tsx → /orders
    │   ├── flat/index.tsx   → /flat
    │   └── history/index.tsx → /history
    │
    ├── order-detail.tsx     → /order-detail?id=  (modal)
    ├── restaurant-detail.tsx → /restaurant-detail?id= (modal)
    ├── poll-detail.tsx      → /poll-detail?id=  (modal)
    ├── member-profile.tsx   → /member-profile?id= (modal)
    ├── payment-detail.tsx   → /payment-detail?id= (modal)
    ├── invite-member.tsx    → /invite-member     (modal)
    └── settings.tsx         → /settings          (modal)
```

## Auth Flow

```
App Launch
  │
  ├── useAuthBootstrap() reads SecureStore
  │
  ├── Token found + not onboarded → redirect to /onboarding
  ├── Token found + onboarded     → redirect to /chat
  └── No token                    → redirect to /login
```

The root `_layout.tsx` runs `useAuthBootstrap()` on mount. It calls `router.replace()` to redirect without leaving a history entry — pressing Back on the login screen exits the app rather than going back to a blank splash.

## Deep Linking

Scheme: `roomieai://`

| URL | Destination |
|---|---|
| `roomieai://join?code=FLAT4B` | `/invite-member?code=FLAT4B` |
| `roomieai://order?id=order_001` | `/order-detail?id=order_001` |
| `roomieai://poll?id=poll_001` | `/poll-detail?id=poll_001` |
| `roomieai://payment?id=order_001` | `/payment-detail?id=order_001` |

Deep links work even when the app is closed — Expo Router handles the initial URL and navigates after the root layout mounts.

## Push Notification Navigation

When a push notification is tapped, Expo Notifications provides a `data.deepLink` field. The notification handler (in the root `_layout.tsx`) reads this and calls `router.push(deepLink)`.

## Navigation from Code

```ts
import { router } from 'expo-router';
import { Routes }  from '@constants/routes';

// Navigate
router.push(Routes.Modal.OrderDetail);   // adds to history
router.replace(Routes.Tabs.Chat);        // replaces current route
router.back();                           // go back

// Navigate with params
router.push({ pathname: Routes.Modal.OrderDetail, params: { orderId } });
```

## Custom Tab Bar Integration

The Phase 2 `BottomTabBar` component is wired into Expo Router's `Tabs` via the `tabBar` prop. This means:
- The custom tab bar controls visual appearance (cream bg, Feather icons, badge counts)
- Expo Router controls actual navigation state
- Badge counts come from `useNotificationStore().unreadCount`

## Type-Safe Routes

With `"typedRoutes": true` in `app.json`, Expo Router generates a `Href` type for all routes. Use `Routes` constants (`constants/routes.ts`) to avoid raw strings anywhere in the app.
