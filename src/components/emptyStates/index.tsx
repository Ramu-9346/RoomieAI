import React from 'react';
import type { ViewStyle } from 'react-native';

import { EmptyState } from './EmptyState';

export { EmptyState } from './EmptyState';

// ─── Domain empty states ──────────────────────────────────────────────────────

interface DomainEmptyProps {
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  style?: ViewStyle;
}

export function NoOrders({ onPrimaryPress, style }: DomainEmptyProps) {
  return (
    <EmptyState
      emoji="🛵"
      title="No orders yet"
      description="Your flat hasn't ordered anything together yet. Let Roomie suggest dinner!"
      primaryAction={onPrimaryPress ? { label: 'Order Now', onPress: onPrimaryPress } : undefined}
      style={style}
    />
  );
}

export function NoRestaurants({ onPrimaryPress, style }: DomainEmptyProps) {
  return (
    <EmptyState
      emoji="🔍"
      title="No restaurants found"
      description="Try a different search or let Roomie suggest options based on everyone's preferences."
      primaryAction={onPrimaryPress ? { label: 'Ask Roomie', onPress: onPrimaryPress } : undefined}
      style={style}
    />
  );
}

export function NoMembers({ onPrimaryPress, style }: DomainEmptyProps) {
  return (
    <EmptyState
      emoji="👥"
      title="Just you so far"
      description="Invite your flatmates to start ordering together and splitting bills automatically."
      primaryAction={
        onPrimaryPress ? { label: 'Invite Members', onPress: onPrimaryPress } : undefined
      }
      style={style}
    />
  );
}

export function NoChat({ onPrimaryPress, style }: DomainEmptyProps) {
  return (
    <EmptyState
      emoji="🤖"
      title="Start a conversation"
      description="Hi! I'm Roomie. Tell me what your flat wants to eat tonight and I'll handle the rest."
      primaryAction={onPrimaryPress ? { label: 'Say Hello', onPress: onPrimaryPress } : undefined}
      style={style}
    />
  );
}

export function NoInternet({ onPrimaryPress, style }: DomainEmptyProps) {
  return (
    <EmptyState
      emoji="📡"
      title="No internet connection"
      description="Check your Wi-Fi or mobile data. Some features may still work offline."
      primaryAction={onPrimaryPress ? { label: 'Try Again', onPress: onPrimaryPress } : undefined}
      style={style}
    />
  );
}

export function NoNotifications({ style }: DomainEmptyProps) {
  return (
    <EmptyState
      emoji="🔔"
      title="You're all caught up"
      description="No new notifications. Order activity, poll updates, and payment reminders will appear here."
      style={style}
    />
  );
}

export function NoSearchResults({ query, onClear, style }: DomainEmptyProps & { query?: string }) {
  return (
    <EmptyState
      emoji="🤷"
      title="No results"
      description={
        query ? `Nothing matched "${query}". Try different keywords.` : 'No results found.'
      }
      primaryAction={onClear ? { label: 'Clear Search', onPress: onClear } : undefined}
      style={style}
    />
  );
}

export function NoGroceryItems({ onPrimaryPress, style }: DomainEmptyProps) {
  return (
    <EmptyState
      emoji="🛒"
      title="Cart is empty"
      description="Ask Roomie to build a smart cart based on what's running low in your flat."
      primaryAction={
        onPrimaryPress ? { label: 'Build Smart Cart', onPress: onPrimaryPress } : undefined
      }
      style={style}
    />
  );
}
