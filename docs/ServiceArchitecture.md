# Service Architecture

## The Dependency Inversion Principle

UI components and hooks depend on **interfaces**, not implementations. The `ServiceFactory` decides which concrete class to inject. This means swapping from mock JSON to a live API requires changing **one line in `services/factory.ts`** — nothing else.

```
UI Components
     ↓
  Custom Hooks (useRestaurants, useOrders…)
     ↓
  Service Interfaces (IRestaurantService, IOrderService…)
     ↓
  Service Factory (decides which implementation to use)
     ↓
  ┌──────────────────┬──────────────────┬──────────────────┐
  │  StaticService   │   ApiService     │  SwiggyMCPService│
  │  (mock JSON)     │  (.NET backend)  │  (Claude + MCP)  │
  └──────────────────┴──────────────────┴──────────────────┘
```

## Data Layer Evolution

### Phase 3 (Now) — Static JSON
```ts
// services/factory.ts
export const RestaurantService: IRestaurantService =
  new StaticRestaurantService(); // reads from mock/restaurants.json
```

### Phase 5 (Next) — .NET API
```ts
// Change only this line — all hooks and UI are untouched
export const RestaurantService: IRestaurantService =
  new ApiRestaurantService(apiClient); // calls POST /api/restaurants/search
```

### Phase 6 (Future) — Claude AI + Swiggy MCP
```ts
export const RestaurantService: IRestaurantService =
  new MCPRestaurantService(claudeAgent, swiggyFoodMCP);
```

## Service Interfaces

All interfaces live in `services/interfaces/`. They define the contract between the app and the data source. **Never import a concrete service class in a hook or component** — always go through the interface type.

### IRestaurantService

```ts
interface IRestaurantService {
  searchRestaurants(params): Promise<Restaurant[]>;
  getSuggestedRestaurants(flatId, lat, lng): Promise<Restaurant[]>;
  getRestaurantDetail(restaurantId): Promise<Restaurant & { menu }>;
  getMenu(restaurantId): Promise<MenuItem[]>;
}
```

### IOrderService

```ts
interface IOrderService {
  placeOrder(params): Promise<Order>;          // COD only (BRD C-001)
  getOrder(orderId): Promise<Order>;
  getOrderHistory(flatId, page?): Promise<OrderHistoryItem[]>;
  cancelOrder(orderId, reason): Promise<void>;
  pollOrderStatus(orderId): Promise<OrderStatus>;
}
```

### IChatService

The most complex service — manages streaming AI responses.

```ts
interface IChatService {
  getConversation(flatId): Promise<Conversation>;
  sendMessage(params): Promise<AsyncIterable<ChatMessage>>; // streaming
  getMessages(convId, cursor?): Promise<{ messages, nextCursor }>;
  clearHistory(convId): Promise<void>;                      // DPDP compliance
}
```

## Error Handling

All services throw `AppError` on failure:
```ts
throw new AppError('SWIGGY_CART_CAP_EXCEEDED', 'Cart total exceeds ₹1000 limit');
```

Hooks catch `AppError` and surface `userMessage` to the UI via the toast system. Raw error details are logged (via `Logger`) but never displayed to users.

## Check-Then-Retry Pattern (BRD C-011)

For non-idempotent Swiggy MCP calls (place order, book table), the service implementation MUST:
1. Check if the operation already succeeded before retrying
2. Never place the same order twice

```ts
// Example in MCPOrderService (Phase 6)
async placeOrder(params) {
  // check-then-retry (BRD C-011)
  const existing = await this.mcp.checkPendingOrder(params.cart.restaurantId);
  if (existing) return existing;   // idempotency guard

  return this.mcp.placeOrder(params);
}
```
