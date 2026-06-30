# State Management — Zustand Architecture

## Philosophy

**Local state for local concerns, global store for shared concerns.**

React `useState` handles ephemeral UI state (loading spinners, input values, modal open/closed). Zustand handles state that multiple components or screens need to read or write.

## Stores

| Store | File | What it owns |
|---|---|---|
| `useAuthStore` | `store/authStore.ts` | JWT token, userId, auth status |
| `useUserStore` | `store/userStore.ts` | Current user profile + preferences |
| `useFlatStore` | `store/flatStore.ts` | Flat details + member roster |
| `useOrderStore` | `store/orderStore.ts` | Active order, cart, recent orders |
| `useChatStore` | `store/chatStore.ts` | Conversation messages, AI thinking state |
| `useNotificationStore` | `store/notificationStore.ts` | Notification list, push token |
| `useThemeStore` | `store/themeStore.ts` | User theme preference (light/dark/system) |
| `useSettingsStore` | `store/settingsStore.ts` | App settings, feature flags |

## Store Rules

### 1. Stores hold architecture, not business logic

A store action may update state. It must NOT make API calls, compute derived data, or navigate. API calls belong in hooks (via React Query); navigation belongs in components.

```ts
// ✅ Correct: pure state update
setActiveOrder: (order) =>
  set((state) => { state.activeOrder = order; }),

// ❌ Wrong: side effect in store
setActiveOrder: async (orderId) => {
  const order = await OrderService.getOrder(orderId); // NO
  set((state) => { state.activeOrder = order; });
},
```

### 2. Use Immer for mutations

All stores use `zustand/middleware/immer`. This allows mutating draft state directly inside `set()` without creating new objects manually.

```ts
// ✅ Immer style
updateMember: (userId, patch) =>
  set((state) => {
    const idx = state.members.findIndex((m) => m.userId === userId);
    if (idx !== -1) Object.assign(state.members[idx], patch);
  }),
```

### 3. Use selectors for granular re-renders

```ts
// ✅ Component only re-renders when flat.name changes
const flatName = useFlatStore((s) => s.flat?.name);

// ❌ Component re-renders on ANY flat state change
const { flat, members, isLoading } = useFlatStore();
```

### 4. Server state lives in React Query, not Zustand

Zustand stores **should not cache remote data** that React Query already manages. Use stores for session data, UI state, and data that doesn't expire. Use React Query for anything fetched from the API.

| Data type | Where to store |
|---|---|
| Auth token | `useAuthStore` (persisted) |
| Current user profile | `useUserStore` (hydrated from API, kept in sync) |
| Restaurant list | React Query (stale-while-revalidate) |
| Active order (needs polling) | Both: React Query polls, `useOrderStore` has the live value |
| Chat messages | `useChatStore` (streaming, real-time) |
| Feature flags | `useSettingsStore` (from env vars) |

### 5. Reset on logout

```ts
// store/index.ts
export function resetAllStores(): void {
  useAuthStore.getState().clearSession();
  useUserStore.getState().clearUser();
  useFlatStore.getState().clearFlat();
  useOrderStore.getState().clearOrders();
  useChatStore.getState().clearChat();
  useNotificationStore.getState().clearNotifications();
}
```

Call `resetAllStores()` in `useAuth().logout()`. This ensures no PII leaks between sessions (DPDP compliance).

## React Query Configuration

Configured in `config/queryClient.ts`:

- `staleTime: 5 min` — data stays fresh for 5 minutes (no refetch)
- `gcTime: 10 min` — unused cache kept 10 min after last subscriber
- `retry: 3` — automatic retry with exponential backoff
- `refetchOnWindowFocus: false` — mobile apps don't have window focus events

### Query Key Conventions

```ts
// Hierarchical keys — invalidate entire domain or specific items
export const restaurantKeys = {
  all:       ['restaurants']                      as const,
  suggested: (flatId: string) => ['restaurants', 'suggested', flatId] as const,
  detail:    (id: string)     => ['restaurants', 'detail', id]        as const,
};
```

Invalidating `['restaurants']` clears ALL restaurant queries. Invalidating `['restaurants', 'detail', id]` clears only that one.
