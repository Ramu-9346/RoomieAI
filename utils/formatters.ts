/**
 * Display string formatters — transform data models to user-facing strings.
 */

import type { DietaryType } from '@models/Preference';
import type { OrderStatus, OrderCategory } from '@models/Order';

// ─── Dietary ──────────────────────────────────────────────────────────────────

export function formatDietaryType(type: DietaryType): string {
  const map: Record<DietaryType, string> = {
    'veg':        'Vegetarian',
    'non-veg':    'Non-Veg',
    'eggetarian': 'Eggetarian',
    'jain':       'Jain',
    'vegan':      'Vegan',
  };
  return map[type];
}

// ─── Order ────────────────────────────────────────────────────────────────────

export function formatOrderStatus(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    pending:          'Preparing order',
    confirmed:        'Confirmed',
    placed:           'Order placed',
    preparing:        'Restaurant is cooking',
    out_for_delivery: 'Out for delivery',
    delivered:        'Delivered',
    cancelled:        'Cancelled',
  };
  return map[status];
}

export function formatOrderCategory(category: OrderCategory): string {
  const map: Record<OrderCategory, string> = {
    food:    'Food',
    grocery: 'Grocery',
    dineout: 'Dineout',
  };
  return map[category];
}

export function orderCategoryEmoji(category: OrderCategory): string {
  const map: Record<OrderCategory, string> = {
    food:    '🍛',
    grocery: '🛒',
    dineout: '🍽',
  };
  return map[category];
}

// ─── Names ────────────────────────────────────────────────────────────────────

/** "Ramu, Priya and 2 others" */
export function formatMemberList(names: string[], maxShown = 2): string {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0]!;
  if (names.length <= maxShown + 1) return names.join(' & ');
  const shown   = names.slice(0, maxShown).join(', ');
  const others  = names.length - maxShown;
  return `${shown} and ${others} other${others > 1 ? 's' : ''}`;
}

/** First name only */
export function firstName(fullName: string): string {
  return fullName.split(' ')[0] ?? fullName;
}

/** Initials — first letter of first and last name */
export function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0]?.[0] ?? '').toUpperCase();
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

// ─── Phone ────────────────────────────────────────────────────────────────────

/** "+91 98765 43210" */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^91/, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

// ─── Items ────────────────────────────────────────────────────────────────────

/** "4 items" */
export function formatItemCount(count: number): string {
  return `${count} item${count !== 1 ? 's' : ''}`;
}
