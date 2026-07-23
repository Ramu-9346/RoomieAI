/**
 * OrderCard — Complete Food Order Summary Card
 *
 * The richest card in the product. Mirrors .order-card from web demo exactly.
 *
 * Structure:
 *   ┌─────────────────────────────────────────┐
 *   │ 🍛 Paradise Restaurant    ★ 4.4         │  ← RestaurantHeader
 *   │    35 min · 1.2 km                      │
 *   ├─────────────────────────────────────────┤
 *   │ [🟢] Hyderabadi Chicken Dum Biryani     │  ← OrderItem (×n)
 *   │      For you + Priya          ₹649      │
 *   │ [🟢] Paradise Veg Biryani               │
 *   │      For Akash                ₹329      │
 *   ├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│  ← dashed divider
 *   │ Order total                   ₹1,236   │  ← OrderTotal
 *   └─────────────────────────────────────────┘
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { RatingBadge, VegIndicator } from '../primitives/Badge';
import { Divider } from '../primitives/Divider';
import { Text } from '../primitives/Text';

export interface OrderItem {
  name: string;
  isVeg: boolean;
  forMembers: string; // "For you + Priya"
  price: string; // "₹649"
}

interface OrderCardProps {
  restaurantName: string;
  restaurantEmoji?: string;
  rating?: number;
  deliveryTime?: string;
  distance?: string;
  items: OrderItem[];
  total: string; // "₹1,236"
  style?: ViewStyle;
}

export function OrderCard({
  restaurantName,
  restaurantEmoji = '🍛',
  rating,
  deliveryTime,
  distance,
  items,
  total,
  style,
}: OrderCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: colors.border.default,
          overflow: 'hidden',
          ...shadows.card,
        },
        style,
      ]}
    >
      {/* Restaurant header */}
      <View
        style={[
          styles.header,
          {
            padding: spacing.sp14,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.subtle,
          },
        ]}
      >
        <View
          style={[
            styles.restaurantIcon,
            { backgroundColor: colors.primary.surface, borderRadius: radius.md },
          ]}
        >
          <Text variant="title" style={styles.emoji}>
            {restaurantEmoji}
          </Text>
        </View>

        <View style={styles.restaurantInfo}>
          <Text variant="title" color={colors.text.primary} numberOfLines={1}>
            {restaurantName}
          </Text>
          <View style={styles.metaRow}>
            {deliveryTime && (
              <Text variant="monoSmall" color={colors.text.muted}>
                {deliveryTime}
              </Text>
            )}
            {deliveryTime && distance && (
              <Text variant="monoSmall" color={colors.border.default}>
                {' '}
                ·{' '}
              </Text>
            )}
            {distance && (
              <Text variant="monoSmall" color={colors.text.muted}>
                {distance}
              </Text>
            )}
          </View>
        </View>

        {rating !== undefined && <RatingBadge rating={rating} />}
      </View>

      {/* Items list */}
      <View style={{ padding: spacing.sp12 }}>
        {items.map((item, i) => (
          <OrderItemRow
            key={i}
            item={item}
            colors={colors}
            spacing={spacing}
            isLast={i === items.length - 1}
          />
        ))}
      </View>

      {/* Dashed divider + total */}
      <Divider style="dashed" strength="default" />
      <View
        style={[
          styles.totalRow,
          {
            padding: spacing.sp12,
            backgroundColor: colors.background.primary,
          },
        ]}
      >
        <Text variant="monoSmall" color={colors.text.muted}>
          Order total
        </Text>
        <Text variant="monoMedium" color={colors.text.primary}>
          {total}
        </Text>
      </View>
    </View>
  );
}

// ── Internal sub-component ────────────────────────────────────────────────────

function OrderItemRow({
  item,
  colors,
  spacing,
  isLast,
}: {
  item: OrderItem;
  colors: ReturnType<typeof useTheme>['colors'];
  spacing: ReturnType<typeof useTheme>['spacing'];
  isLast: boolean;
}) {
  return (
    <View
      style={[
        styles.itemRow,
        !isLast && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border.subtle,
          paddingBottom: spacing.sp8,
          marginBottom: spacing.sp8,
        },
      ]}
    >
      <VegIndicator isVeg={item.isVeg} style={styles.vegIndicator} />

      <View style={styles.itemContent}>
        <Text variant="body" color={colors.text.secondary} numberOfLines={2}>
          {item.name}
        </Text>
        <Text variant="captionItalic" color={colors.text.muted}>
          {item.forMembers}
        </Text>
      </View>

      <Text variant="monoMedium" color={colors.text.primary} style={styles.price}>
        {item.price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  restaurantIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: {
    fontSize: 22,
  },
  restaurantInfo: {
    flex: 1,
    gap: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  vegIndicator: {
    marginTop: 3,
    flexShrink: 0,
  },
  itemContent: {
    flex: 1,
    gap: 2,
  },
  price: {
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
