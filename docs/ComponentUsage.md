# Component Usage Guide

## Import Convention

Always import from the root barrel:

```tsx
import {
  PrimaryButton,
  RestaurantCard,
  EmptyState,
  usePageStagger,
} from '@components';
```

Never import from sub-paths:
```tsx
// ❌ Never do this
import { PrimaryButton } from '../../src/components/buttons';
```

---

## Layout: Standard Screen

```tsx
import { ScreenContainer, Section, Spacer } from '@components';

export default function OrdersScreen() {
  return (
    <ScreenContainer scrollable padded>
      <Section title="Active Order">
        <OrderCard ... />
      </Section>
      <Spacer size="sp24" />
      <Section title="Recent">
        ...
      </Section>
    </ScreenContainer>
  );
}
```

## Layout: Modal Sheet

```tsx
import { PageHeader, ScreenContainer, BackButton } from '@components';
import { router } from 'expo-router';

export default function OrderDetailModal() {
  return (
    <>
      <PageHeader
        title="Order Details"
        subtitle="#SW82619"
        onBack={() => router.back()}
      />
      <ScreenContainer scrollable padded>
        ...
      </ScreenContainer>
    </>
  );
}
```

---

## Typography

```tsx
import { Heading, Body, Caption, Price, Label } from '@components';

<Label>Active Order</Label>
<Heading level={2}>Meghana Foods</Heading>
<Body>4 items · Estimated 35 min</Body>
<Caption>Ordered 9:12 PM</Caption>
<Price amount={1236} size="lg" />
```

---

## Cards

```tsx
import { RestaurantCard, BudgetCard, CartSummaryCard } from '@components';

<RestaurantCard
  name="Meghana Foods"
  meta="Koramangala · ₹400 for 2"
  fitReason="Biryani fits Ramu & Sana's non-veg pref"
  rating={4.4}
  emoji="🍛"
  deliveryTime="35 min"
  selected={selectedId === 'rest_001'}
  onPress={() => setSelectedId('rest_001')}
/>

<BudgetCard
  budgetPerMember={1000}
  spentPerMember={820}
  memberCount={4}
/>

<CartSummaryCard
  items={cartItems}
  total={1236}
  isOverCap={false}
  onEdit={() => router.push('/cart')}
  onConfirm={handleConfirmOrder}
/>
```

---

## Form Components

```tsx
import { PasswordField, Dropdown, ChipSelector, SliderInput } from '@components';

// Password field
<PasswordField
  value={password}
  onChangeText={setPassword}
  error={errors.password}
/>

// Dietary preference selector
<ChipSelector
  label="Dietary Preference"
  multiSelect={false}
  options={[
    { label: 'Veg', value: 'veg', emoji: '🥦' },
    { label: 'Non-Veg', value: 'non-veg', emoji: '🍗' },
    { label: 'Eggetarian', value: 'eggetarian', emoji: '🥚' },
    { label: 'Jain', value: 'jain', emoji: '🫘' },
  ]}
  value={pref}
  onChange={setPref}
/>

// Budget slider
<SliderInput
  label="Per-order Budget"
  min={100}
  max={1000}
  step={50}
  value={budget}
  onChange={setBudget}
  valueLabel={(v) => `₹${v}`}
/>
```

---

## Buttons

```tsx
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  HoldToConfirmButton,
} from '@components';

// Standard actions
<PrimaryButton label="Place Order" onPress={handleOrder} />
<SecondaryButton label="Edit Cart" onPress={() => router.push('/cart')} />
<DangerButton label="Cancel Order" onPress={handleCancel} loading={isCancelling} />

// Irreversible action — requires 1-second hold (BRD R-010)
<HoldToConfirmButton
  label="Hold to Confirm Order"
  onHoldComplete={handleConfirm}
  size="full"
/>
```

---

## Empty States

```tsx
import { NoOrders, NoRestaurants, NoSearchResults } from '@components';

// In an orders screen
if (orders.length === 0) {
  return <NoOrders onPrimaryPress={() => router.push('/chat')} />;
}

// In search results
if (results.length === 0) {
  return <NoSearchResults query={searchQuery} onClear={clearSearch} />;
}
```

---

## Loading Skeletons

```tsx
import { RestaurantSkeleton, ListSkeleton, PageSkeleton } from '@components';

if (isLoading) {
  return <ListSkeleton rows={3} />;
}
```

---

## Feedback

```tsx
import {
  Snackbar,
  WarningBanner,
  LoadingOverlay,
  ActionSheet,
} from '@components';

// Transient message
<Snackbar
  visible={showSnack}
  message="Order placed successfully!"
  onDismiss={() => setShowSnack(false)}
  duration={3000}
/>

// Inline warning (budget approaching cap)
{cartTotal > 800 && (
  <WarningBanner
    message={`Cart total ₹${cartTotal} is approaching the ₹1000 per-member limit`}
  />
)}

// Action sheet
<ActionSheet
  visible={showSheet}
  title="Order Options"
  options={[
    { label: 'Share Receipt', icon: 'share-2', onPress: handleShare },
    { label: 'Reorder', icon: 'refresh-cw', onPress: handleReorder },
    { label: 'Cancel Order', icon: 'x-circle', destructive: true, onPress: handleCancel },
  ]}
  onCancel={() => setShowSheet(false)}
/>
```

---

## AI Components

```tsx
import {
  AIMessageBubble,
  UserMessageBubble,
  ThinkingIndicator,
  ActionSuggestionCard,
  QuickReplyChips,
  VoiceInputButton,
} from '@components';

// Chat thread
<AIMessageBubble
  message="I found 3 restaurants that work for everyone's dietary preferences."
  timestamp="9:14 PM"
  showAvatar
>
  <RestaurantCard ... />
  <RestaurantCard ... />
</AIMessageBubble>

<UserMessageBubble
  message="Let's go with Meghana Foods"
  timestamp="9:15 PM"
/>

// While AI is thinking
{isThinking && <ThinkingIndicator currentStep="Building your cart..." />}

// Suggested actions
<ActionSuggestionCard
  type="poll"
  title="Start a dinner poll?"
  description="Let everyone vote before ordering"
  onPress={handleStartPoll}
/>

// Quick replies
<QuickReplyChips
  replies={[
    { id: '1', label: 'Order for all', emoji: '🛵' },
    { id: '2', label: 'Start a poll', emoji: '📊' },
    { id: '3', label: 'Show budget', emoji: '💰' },
  ]}
  onSelect={(reply) => sendMessage(reply.label)}
/>
```

---

## Accessibility Checklist

Every screen should verify:
- [ ] All `Pressable` elements have `accessibilityRole` and `accessibilityLabel`
- [ ] Interactive states use `accessibilityState={{ disabled, busy, checked }}`
- [ ] Color is never the only differentiator (icons + text alongside)
- [ ] Minimum touch target 44×44pt (use `hitSlop` if smaller)
- [ ] Dynamic font scaling respected (avoid fixed line heights)
- [ ] VoiceOver/TalkBack traversal order is logical (use `accessibilityViewIsModal` on modals)
