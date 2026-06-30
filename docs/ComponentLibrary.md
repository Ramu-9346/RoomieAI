# RoomieAI Component Library

All components are in `src/components/`. Import from the barrel:

```ts
import { Button, RestaurantCard, ChatInput, BottomSheet } from '../components';
// or from sub-categories:
import { AIMessageBubble } from '../components/ai';
```

---

## Primitives (`src/components/primitives/`)

### `<Text>`
Single source of truth for all text rendering. Never use RN `<Text>` directly.

```tsx
<Text variant="title" color={colors.text.primary}>Order Summary</Text>
<Text variant="captionItalic" color={colors.text.muted}>Suggested for you</Text>
<Text variant="mono" color={colors.text.primary}>₹1,236</Text>
```

Props: `variant`, `color`, `align`, `italic`, `bold`, `dim`, `numberOfLines`, `onPress`

---

### `<Button>`

```tsx
// Standard CTA
<Button variant="primary" size="lg" label="Place Order" onPress={…} />

// Danger confirmation
<Button variant="danger" size="md" label="Cancel Order" onPress={…} />

// Hold to confirm (BRD R-010)
<Button
  variant="holdConfirm"
  size="full"
  label="Hold to confirm order"
  onHoldComplete={handlePlaceOrder}
/>

// Icon-only toolbar button
<IconButton icon="share" onPress={…} />
```

Variants: `primary | secondary | ghost | danger | success | floating | holdConfirm`
Sizes: `sm (32px) | md (44px) | lg (52px) | full`

---

### `<Avatar>`

```tsx
// Member avatar (colour-coded by memberIndex)
<Avatar name="Priya" memberIndex={1} size="md" showOnlineStatus />

// AI agent avatar (ink bg, "R" in Fraunces italic)
<Avatar name="Roomie" memberIndex={-1} size="md" />

// Overlapping group
<AvatarGroup members={[…]} size="sm" />
```

Sizes: `sm (24) | md (30) | lg (44) | xl (56)`

---

### `<Badge>` / `<VegIndicator>`

```tsx
<CategoryBadge type="food" />      // Food · orange
<CategoryBadge type="grocery" />   // Grocery · green
<StatusBadge status="live" />      // LIVE · animated pulse
<RatingBadge rating={4.2} />       // 4.2 ★ · green bg
<VegIndicator isVeg={true} />      // Green square+dot
<VegIndicator isVeg={false} />     // Red square+dot
```

---

### `<Chip>`

```tsx
<Chip label="Veg only" type="filter" selected onRemove={…} />
<Chip label="Order again" type="quickReply" onPress={…} />
<ChipGroup chips={[…]} onToggle={…} />
```

Types: `default | filter | quickReply`

---

### `<Divider>`

```tsx
<Divider />                           // solid, default strength
<Divider style="dashed" />           // dashed
<Divider orientation="vertical" />   // vertical (in flex row)
```

---

## Inputs (`src/components/inputs/`)

### `<TextInput>`
Floating label, focus border animation, error state.
```tsx
<TextInput label="Flat name" value={name} onChangeText={setName} error={errors.name} />
```

### `<SearchBar>`
Magnifier + animated cancel button.
```tsx
<SearchBar value={q} onChangeText={setQ} placeholder="Search restaurants…" />
```

### `<OTPInput>`
6-box visual input with iOS autofill support.
```tsx
<OTPInput length={6} onComplete={handleOTPVerified} />
```

### `<Checkbox>` / `<Radio>` / `<Switch>` / `<SegmentControl>`
All animated with spring physics. `SegmentControl` uses layout-driven thumb.

---

## Cards (`src/components/cards/`)

### `<RestaurantCard>`
AI-curated suggestion card with `fitReason` (why Roomie picked it).
```tsx
<RestaurantCard
  name="Meghana Foods"
  meta="Biryani · 4.1 ★ · 28 min"
  fitReason="Matches Priya's veg preference, within budget"
  rating={4.1}
  emoji="🍛"
  deliveryTime="28 min"
  distance="1.2 km"
  onPress={…}
/>
```

### `<OrderCard>`
Full order breakdown: restaurant header + item list with VegIndicators + total.

### `<PollCard>`
Group voting card: shows each member's response with live update animation.

### `<MemberCard>`
Flat member row (list/detail/invite variants) with dietary type.

### `<PaymentCard>`
UPI split card: each member's share with status chip (your share / UPI pay → / Sent ✓ / Settled).

### `<GroceryCard>`
Instamart cart summary in dual-column item grid.

### `<NotificationCard>`
Activity row with colour-coded dot (poll/order/payment/reminder/system).

### `<HistoryCard>`
Past order row: emoji icon + title + subtitle + settlement chip.

---

## Navigation (`src/components/navigation/`)

### `<BottomTabBar>`
4-tab bar (Chat, Orders, Flat, History) with badge counts.
```tsx
<BottomTabBar
  activeTab={tab}
  onTabPress={setTab}
  badgeCounts={{ Chat: 2 }}
/>
```

### `<TopAppBar>`
Screen header with variant support (default / chat / orders).
```tsx
<TopAppBar
  variant="chat"
  title="Flat 4B"
  aiStatus="thinking"
  memberAvatars={members}
/>
```

### `<FloatingActionButton>`
Pill "Start ordering" or scroll-to-bottom button.

---

## Feedback (`src/components/feedback/`)

### `<Toast>`
Auto-dismissing notification (success/error/info/warning).
```tsx
<Toast visible={show} type="success" message="Order placed!" onDismiss={…} />
```

### `<Spinner>` / `<LoadingOverlay>` / `<PageLoading>`
Loading states at three scales.

### `<Skeleton>` / `<SkeletonCard>`
Pulsing placeholder bones for content loading states.
```tsx
<SkeletonCard variant="restaurant" />
<Skeleton width="60%" height={14} />
```

### `<BottomSheet>`
Drag-to-dismiss modal drawer from bottom.
```tsx
<BottomSheet visible={open} onDismiss={close} snapPoint="half" title="Order details">
  <OrderCard … />
</BottomSheet>
```

### `<ConfirmDialog>`
Blocking confirm/cancel modal. Destructive variant for irreversible actions.
```tsx
<ConfirmDialog
  visible={showConfirm}
  title="Place order for ₹1,236?"
  body="Order will be placed via Swiggy COD."
  onConfirm={placeOrder}
  onCancel={cancel}
/>
```

### `<SuccessBanner>` / `<ErrorBanner>`
In-chat inline success/error states (not toasts — rendered inside chat thread).

---

## AI Components (`src/components/ai/`)

### `<AIMessageBubble>`
Roomie's message in the chat thread. Left-aligned, full width, accepts card children.
```tsx
<AIMessageBubble
  message="I found 3 restaurants that work for everyone."
  timestamp="2:14 PM"
  showAvatar
>
  <RestaurantCard … />
  <RestaurantCard … />
</AIMessageBubble>
```

### `<UserMessageBubble>`
Human message: right-aligned ink pill bubble.
```tsx
<UserMessageBubble
  message="Order dinner for all of us"
  memberName="Ramu"
  memberIndex={0}
  timestamp="2:13 PM"
/>
```

### `<ThinkingIndicator>`
Three animated bouncing dots. Used inside `AIMessageBubble` while streaming.
```tsx
<ThinkingIndicator label="Checking Swiggy…" />
```

### `<ToolExecutionCard>`
MCP tool call disclosure: source server + tool name + status + collapsible result.
```tsx
<ToolExecutionCard
  source="food"
  toolName="search_restaurants"
  summary="Found 8 restaurants near Koramangala"
  status="success"
/>
```

### `<AIStatusTimeline>`
Multi-step agent progress as a vertical step list.
```tsx
<AIStatusTimeline steps={[
  { id: '1', label: 'Checking preferences', status: 'completed' },
  { id: '2', label: 'Searching restaurants…', status: 'active', detail: 'Swiggy Food MCP' },
  { id: '3', label: 'Building cart', status: 'pending' },
]} />
```

### `<ChatInput>`
Primary text composition bar with quick reply chips.
```tsx
<ChatInput
  value={draft}
  onChangeText={setDraft}
  onSend={handleSend}
  sending={isSending}
  aiThinking={isThinking}
  quickReplies={suggestions}
  onQuickReply={handleQuickReply}
/>
```
