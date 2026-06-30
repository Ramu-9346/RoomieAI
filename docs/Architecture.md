# RoomieAI — Architecture Overview

## System Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                          UI Layer                               │
│  app/ (Expo Router screens) + src/components/ (design system)  │
│                          ↕                                       │
│                     Custom Hooks                                │
│            (hooks/ — React Query + store selectors)             │
│                          ↕                                       │
│              State (Zustand) + Server State (React Query)       │
│                          ↕                                       │
│                     Service Layer                               │
│         (services/ — interfaces → factory → implementations)    │
│                          ↕                                       │
│    ┌──────────────┬────────────────┬──────────────────────┐    │
│    │ mock/ (JSON) │ .NET API       │ Claude + Swiggy MCP  │    │
│    │  Phase 3     │ Phase 5        │ Phase 6              │    │
│    └──────────────┴────────────────┴──────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Decisions

### Expo SDK 52 + Expo Router v4
**Why Expo:** Fastest path to production on both iOS and Android without native build complexity. OTA updates via EAS. Rich plugin system for native modules.

**Why Expo Router:** File-system routing eliminates separate navigation config. Type-safe routes with typed routes experiment. Deep link config in one place. Works seamlessly with authentication redirects.

### Zustand v5 (not Redux, not Context)
**Why Zustand:** Zero boilerplate. Actions are co-located with state. Immer middleware for immutable updates. Selector-based subscriptions for granular re-renders. No Provider needed (global singleton). `resetAllStores()` is trivial for logout/DPDP cleanup.

### React Query v5 (for server state)
**Why React Query:** Server state and UI state have different lifecycles. React Query handles caching, background refetching, optimistic updates, and retry automatically. Zustand would need manual stale tracking. Separation of concerns.

### Service Factory Pattern
**Why not just import mock JSON directly?** The app will graduate from mock → .NET API → Claude+MCP. If components imported JSON directly, every component would need updating when the data source changes. The factory pattern means: change one line, entire app switches data source.

### Axios (not fetch)
**Why Axios:** Interceptors for auth token injection and error transformation. Built-in request cancellation. Consistent error handling. Easier to mock in tests.

### MMKV (not AsyncStorage)
**Why MMKV:** 10x faster than AsyncStorage. Synchronous reads (no async for simple flags like "is onboarded"). Used for non-sensitive preferences (theme, settings). AsyncStorage is only used as React Query's offline cache persister.

### Zod (not Yup)
**Why Zod:** TypeScript-first — schemas generate types, no duplicate type definitions. Better error messages. Smaller bundle.

### NativeWind v4 (alongside custom theme)
**Why both?** The Phase 2 design system provides typed token access via `useAppTheme()`. NativeWind provides utility classes for quick layout work in screens (Phase 4). They coexist — components use tokens, screens may use utility classes for spacing/layout. This avoids premature token extraction for one-off screen layouts.

## Data Flow for an Order

```
User types: "Order dinner for all of us"
  │
  ↓ useChatStore.setDraft()
  │
ChatInput component → onSend()
  │
  ↓ ChatService.sendMessage() [Phase 6: Claude API]
  │
  │  Claude receives: message + flat members + preferences + location
  │  Claude calls: Swiggy Food MCP → search_restaurants
  │  Claude receives: list of restaurants
  │  Claude streams: AI message with RestaurantCards attached
  │
  ↓ useChatStore.appendMessage() for each streamed chunk
  │
  ↓ Message with restaurant attachment rendered as RestaurantCard
  │
User selects restaurant → "Go with Meghana"
  │
  ↓ Claude calls: Swiggy Food MCP → get_menu, build_cart
  │  Claude: applies member dietary preferences, ₹1000 cap check (BRD C-002)
  │  Claude streams: OrderCard with per-member breakdown
  │
User holds-to-confirm (BRD R-010: 1s hold)
  │
  ↓ usePlaceOrder() mutation → OrderService.placeOrder()
  │  [Phase 6: Claude calls Swiggy MCP → place_order with check-then-retry (BRD C-011)]
  │
  ↓ Order confirmed → useOrderStore.setActiveOrder()
  ↓ Notification sent to all members (INotificationService)
  ↓ PaymentCard with UPI splits rendered in chat
```

## DPDP Act 2023 Compliance

- PII (phone numbers, names) stored only in SecureStore
- LLM boundary: chat content is scrubbed before sending to Claude API
- 30-day data retention: `clearHistory()` deletes messages older than DATA_RETENTION_DAYS
- Logout: `resetAllStores()` clears all in-memory PII immediately
- Push tokens: stored in SecureStore, registered with backend on login, deregistered on logout

## BRD Constraints Encoded in Architecture

| Constraint | Code location |
|---|---|
| C-001: COD only | `IOrderService.placeOrder` has no payment method param; `FlatSettings.allowCODOnly = true` |
| C-002: ₹1000 food cap | `utils/currency.ts: isOverCAP()`, `Cart.isOverCap`, `StaticOrderService` validates |
| C-004: 5-day Swiggy token | `utils/date.ts: isTokenExpiringSoon()`, `HomeData.swiggyTokenExpiresAt`, `Notification type: token_expiry` |
| C-011: check-then-retry | Documented in service interface JSDoc; enforced in MCP implementation (Phase 6) |
| C-025: Swiggy orange reserved | `constants/app.ts: SWIGGY_BRAND_COLOUR` constant, never used in Phase 2 theme |
| R-010: holdConfirm | `Button variant="holdConfirm"` in Phase 2; `HOLD_CONFIRM_DURATION_MS = 1000` in constants |
