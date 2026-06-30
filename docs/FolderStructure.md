# RoomieAI — Folder Structure

Every folder has exactly one responsibility. Adding a feature never requires touching more than 2 folders.

```
RoomieAI/
│
├── app/                        ← Expo Router file-system routes (ONLY screens)
│   ├── _layout.tsx             ← Root: font loading + AppProvider + auth bootstrap
│   ├── +not-found.tsx          ← 404 fallback
│   ├── (auth)/                 ← Auth route group (not in URL path)
│   │   ├── _layout.tsx         ← Stack navigator for auth
│   │   ├── login.tsx           ← Phone entry screen
│   │   ├── verify.tsx          ← OTP verification
│   │   └── onboarding.tsx      ← Name + dietary preferences
│   └── (main)/                 ← Authenticated app route group
│       ├── _layout.tsx         ← Stack with modal presentations
│       ├── (tabs)/             ← Bottom tab group
│       │   ├── _layout.tsx     ← Tab navigator + custom BottomTabBar
│       │   ├── chat/index.tsx  ← Chat tab
│       │   ├── orders/index.tsx← Orders tab
│       │   ├── flat/index.tsx  ← Flat tab
│       │   └── history/index.tsx ← History tab
│       ├── order-detail.tsx    ← Modal: order detail
│       ├── restaurant-detail.tsx ← Modal: restaurant + menu
│       ├── poll-detail.tsx     ← Modal: poll responses
│       ├── member-profile.tsx  ← Modal: member preferences
│       ├── payment-detail.tsx  ← Modal: UPI splits
│       ├── invite-member.tsx   ← Modal: invite flow
│       └── settings.tsx        ← Modal: app settings
│
├── src/                        ← Phase 2 output (design system)
│   ├── components/             ← All UI components (primitives → AI)
│   └── theme/                  ← Design tokens + useTheme() hook
│
├── components/                 ← Root-level re-export of src/components
├── theme/                      ← Root-level re-export of src/theme
│
├── models/                     ← TypeScript domain interfaces
│   ├── User.ts, Flat.ts, Restaurant.ts, Order.ts
│   ├── Poll.ts, Cart.ts, Payment.ts, Member.ts
│   ├── Chat.ts, Notification.ts, Preference.ts, Address.ts
│   └── index.ts
│
├── types/                      ← Generic TypeScript utility types
│   ├── api.ts                  ← ApiResponse, ApiMeta, ApiState
│   ├── navigation.ts           ← Typed route params
│   ├── common.ts               ← PartialBy, Nullable, callback types
│   └── index.ts
│
├── constants/                  ← App-wide constants + enums
│   ├── app.ts                  ← BRD business rules, limits, brand colours
│   ├── routes.ts               ← Typed route path constants
│   ├── enums.ts                ← All domain enums
│   └── index.ts
│
├── store/                      ← Zustand state stores
│   ├── authStore.ts            ← Auth token + session
│   ├── userStore.ts            ← Current user + preferences
│   ├── flatStore.ts            ← Flat + member roster
│   ├── orderStore.ts           ← Active order + cart
│   ├── chatStore.ts            ← Conversation + AI state
│   ├── notificationStore.ts    ← Notification list + push token
│   ├── themeStore.ts           ← User theme preference
│   ├── settingsStore.ts        ← App settings + feature flags
│   └── index.ts                ← Barrel + resetAllStores()
│
├── services/                   ← Data access layer (swappable)
│   ├── interfaces/             ← Service contracts (TypeScript interfaces)
│   │   ├── IAuthService.ts
│   │   ├── IRestaurantService.ts
│   │   ├── IOrderService.ts
│   │   ├── IChatService.ts
│   │   ├── IPaymentService.ts
│   │   ├── IInstamartService.ts
│   │   ├── IDineoutService.ts
│   │   ├── INotificationService.ts
│   │   └── IHomeService.ts
│   ├── implementations/
│   │   ├── static/             ← JSON mock implementations (Phase 3)
│   │   └── api/                ← .NET API implementations (Phase 5)
│   ├── factory.ts              ← Picks implementation based on EXPO_PUBLIC_USE_MOCK_DATA
│   └── index.ts
│
├── hooks/                      ← Custom React hooks
│   ├── useAuth.ts              ← Auth state + logout
│   ├── useAppTheme.ts          ← Theme tokens for active scheme
│   ├── usePermissions.ts       ← Push + location permissions
│   ├── useRestaurants.ts       ← React Query: restaurant queries
│   ├── useOrders.ts            ← React Query: order queries + mutations
│   ├── useMembers.ts           ← Store selectors for flat members
│   └── index.ts
│
├── providers/                  ← React context providers
│   ├── GestureProvider.tsx     ← GestureHandlerRootView (must be outermost)
│   ├── SafeAreaProvider.tsx    ← Safe area context
│   ├── QueryProvider.tsx       ← React Query client
│   ├── ThemeProvider.tsx       ← StatusBar + SystemUI colours
│   ├── ToastProvider.tsx       ← Global toast overlay + context
│   └── index.tsx               ← AppProvider: compose all providers
│
├── config/                     ← Environment + client configuration
│   ├── env.ts                  ← Typed EXPO_PUBLIC_ variable access
│   ├── api.ts                  ← Axios instance with interceptors
│   ├── queryClient.ts          ← React Query client + defaults
│   └── index.ts
│
├── utils/                      ← Pure utility functions
│   ├── currency.ts             ← ₹ formatting, UPI deep links, cap checks
│   ├── date.ts                 ← IST-aware date formatting (date-fns)
│   ├── validation.ts           ← Zod schemas for forms
│   ├── formatters.ts           ← Display string transforms
│   ├── storage.ts              ← SecureStore + MMKV typed wrappers
│   ├── logger.ts               ← Environment-gated console wrapper
│   ├── permissions.ts          ← Push + location permission helpers
│   ├── errorMapping.ts         ← Error codes → user messages
│   └── index.ts
│
├── navigation/                 ← Navigation helpers (not screens)
│   ├── useAuthBootstrap.ts     ← Hydrate auth from storage on launch
│   ├── linking.ts              ← Deep link scheme configuration
│   └── index.ts
│
├── mock/                       ← Production-like JSON mock data
│   ├── home.json
│   ├── restaurants.json
│   ├── orders.json
│   ├── members.json
│   ├── polls.json
│   ├── grocery.json
│   ├── notifications.json
│   └── chat.json
│
├── features/                   ← Feature modules (Phase 4+)
│   └── (empty — created in Phase 4)
│
├── assets/                     ← Static assets
│   ├── fonts/                  ← Fraunces + Geist + GeistMono TTF files
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
│
├── docs/                       ← Architecture documentation
│
└── [config files]
    ├── package.json
    ├── app.json
    ├── tsconfig.json
    ├── babel.config.js
    ├── metro.config.js
    ├── tailwind.config.js
    ├── global.css
    ├── .eslintrc.js
    ├── .prettierrc
    ├── .editorconfig
    ├── .gitignore
    ├── .env.example
    ├── .lintstagedrc.js
    └── .husky/
```

## The Rule: One Folder, One Concern

| You want to...                   | Touch only...                      |
|----------------------------------|------------------------------------|
| Add a new screen                 | `app/`                             |
| Add a new component              | `src/components/`                  |
| Change a design token            | `src/theme/`                       |
| Add a new domain model           | `models/`                          |
| Switch from mock to real API     | `services/factory.ts`              |
| Add a new API endpoint           | `services/interfaces/` + `services/implementations/api/` |
| Add global state                 | `store/`                           |
| Add a custom hook                | `hooks/`                           |
| Change how data is formatted     | `utils/formatters.ts`              |
| Change error messages            | `utils/errorMapping.ts`            |
