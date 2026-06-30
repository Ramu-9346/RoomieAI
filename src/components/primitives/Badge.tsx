/**
 * Badge — Category & Status Label Primitive
 *
 * Two types:
 *
 * 1. CategoryBadge — food / grocery / dineout domain labels
 *    Matches the .scenario-badge system from the web demo.
 *    - food    → orange-soft bg, orange-deep text
 *    - grocery → green-soft bg, green text
 *    - dineout → purple-soft bg, purple text
 *
 * 2. StatusBadge — live / demo / pending / settled pill labels
 *    Matches the .demo-pill and "LIVE" badge from the web demo.
 *    Uses pill radius and eyebrow typography.
 *
 * 3. RatingBadge — Swiggy-style star rating (green bg, white text)
 *    Matches .restaurant-rating from web demo.
 *
 * 4. VegIndicator — Indian food standard veg/non-veg square indicator
 *    Green square with green dot = veg
 *    Red square with red dot = non-veg
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from './Text';

// ── CategoryBadge ─────────────────────────────────────────────────────────────

export type CategoryBadgeType = 'food' | 'grocery' | 'dineout';

interface CategoryBadgeProps {
  type: CategoryBadgeType;
  label?: string;   // custom label; defaults to type name
  style?: ViewStyle;
}

const CATEGORY_LABELS: Record<CategoryBadgeType, string> = {
  food:    'Swiggy Food MCP',
  grocery: 'Swiggy Instamart MCP',
  dineout: 'Swiggy Dineout MCP',
};

export function CategoryBadge({ type, label, style }: CategoryBadgeProps) {
  const { colors, radius, spacing } = useTheme();

  const palette = {
    food:    { bg: colors.primary.surface, text: colors.primary.text },
    grocery: { bg: colors.success.surface, text: colors.success.text },
    dineout: { bg: colors.accent.surface,  text: colors.accent.text },
  }[type];

  return (
    <View
      style={[
        styles.categoryBadge,
        {
          backgroundColor: palette.bg,
          borderRadius:    radius.xs,
          paddingHorizontal: spacing.sp8,
          paddingVertical:   spacing.sp4,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Category: ${label ?? CATEGORY_LABELS[type]}`}
    >
      <Text variant="eyebrow" color={palette.text}>
        {label ?? CATEGORY_LABELS[type]}
      </Text>
    </View>
  );
}

// ── StatusBadge ───────────────────────────────────────────────────────────────

export type StatusBadgeType = 'live' | 'demo' | 'online' | 'pending' | 'settled' | 'cancelled';

interface StatusBadgeProps {
  type: StatusBadgeType;
  label?: string;
  style?: ViewStyle;
}

export function StatusBadge({ type, label, style }: StatusBadgeProps) {
  const { colors, radius, spacing } = useTheme();

  const statusColors = {
    live:      { bg: colors.success.surface, text: colors.success.text,   dot: colors.success.default },
    online:    { bg: colors.success.surface, text: colors.success.text,   dot: colors.success.default },
    demo:      { bg: colors.primary.surface, text: colors.primary.text,   dot: colors.primary.default },
    pending:   { bg: colors.warning.surface, text: colors.warning.text,   dot: colors.warning.default },
    settled:   { bg: colors.success.surface, text: colors.success.text,   dot: colors.success.default },
    cancelled: { bg: colors.error.surface,   text: colors.error.text,     dot: colors.error.default },
  }[type];

  const displayLabel = label ?? type.toUpperCase();

  return (
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor:  statusColors.bg,
          borderRadius:     radius.pill,
          paddingHorizontal: spacing.sp8,
          paddingVertical:   spacing.sp4,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${displayLabel}`}
    >
      <View
        style={[
          styles.statusDot,
          { backgroundColor: statusColors.dot },
        ]}
      />
      <Text variant="eyebrow" color={statusColors.text} style={styles.statusLabel}>
        {displayLabel}
      </Text>
    </View>
  );
}

// ── RatingBadge ───────────────────────────────────────────────────────────────

interface RatingBadgeProps {
  rating: number;     // e.g., 4.4
  style?: ViewStyle;
}

export function RatingBadge({ rating, style }: RatingBadgeProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.ratingBadge,
        {
          backgroundColor: colors.success.default,
          borderRadius:    radius.xs,
          paddingHorizontal: spacing.sp8,
          paddingVertical:   spacing.sp4,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Rating: ${rating} out of 5`}
    >
      <Text variant="monoSmall" color={colors.white} style={styles.ratingText}>
        ★ {rating.toFixed(1)}
      </Text>
    </View>
  );
}

// ── VegIndicator ──────────────────────────────────────────────────────────────
// Indian food standard: square border with filled circle inside.
// Green = vegetarian, Red = non-vegetarian.

interface VegIndicatorProps {
  isVeg: boolean;
  size?: number;   // defaults to 14px (from web demo)
  style?: ViewStyle;
}

export function VegIndicator({ isVeg, size = 14, style }: VegIndicatorProps) {
  const { colors } = useTheme();

  const color = isVeg ? colors.veg : colors.nonVeg;
  const dotSize = size * 0.43;  // ~6px dot inside 14px square

  return (
    <View
      style={[
        {
          width:       size,
          height:      size,
          borderWidth: 1.5,
          borderColor: color,
          borderRadius: 2,
          alignItems:  'center',
          justifyContent: 'center',
        },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <View
        style={{
          width:        dotSize,
          height:       dotSize,
          borderRadius: 999,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  categoryBadge: {
    alignSelf: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems:    'center',
    alignSelf:     'flex-start',
  },
  statusDot: {
    width:        5,
    height:       5,
    borderRadius: 999,
    marginRight:  5,
  },
  statusLabel: {
    lineHeight: 14,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems:    'center',
    alignSelf:     'flex-start',
  },
  ratingText: {
    color:      '#FFFFFF',
    fontFamily: 'GeistMono_500Medium',
  },
});
