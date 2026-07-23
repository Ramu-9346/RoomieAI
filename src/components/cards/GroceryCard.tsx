/**
 * GroceryCard — Instamart Cart Summary Card
 *
 * Mirrors .cart-card from the web demo.
 * Displays the AI-built grocery cart in a compact dual-column grid.
 *
 * Structure:
 *   ┌──────────────────────────────────────────┐
 *   │ 🛒 Weekly essentials · Instamart         │  ← cart header
 *   │    14 items · Delivery in 10 min         │
 *   ├──────────────────────────────────────────│
 *   │ Amul Milk    2 × 1L  │ Eggs      12 pc  │  ← 2-col grid
 *   │ Onions       1 kg    │ Tomatoes  500 g   │
 *   │ ...                  │ ...               │
 *   └──────────────────────────────────────────┘
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export interface GroceryItem {
  name: string;
  quantity: string; // "2 × 1L", "1 kg", "12 pc"
}

interface GroceryCardProps {
  title?: string;
  subtitle?: string; // "14 items · Delivery in 10 min"
  items: GroceryItem[];
  style?: ViewStyle;
}

export function GroceryCard({
  title = 'Weekly essentials · Instamart',
  subtitle,
  items,
  style,
}: GroceryCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  // Pair items for two-column layout
  const rows: [GroceryItem, GroceryItem | null][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push([items[i], items[i + 1] ?? null]);
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.border.default,
          overflow: 'hidden',
          ...shadows.card,
        },
        style,
      ]}
    >
      {/* Header */}
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
            styles.cartIcon,
            {
              backgroundColor: colors.success.surface,
              borderRadius: radius.sm,
              width: 32,
              height: 32,
            },
          ]}
        >
          <Text variant="body" style={styles.cartEmoji}>
            🛒
          </Text>
        </View>

        <View style={styles.headerText}>
          <Text variant="bodyMedium" color={colors.text.primary} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="monoSmall" color={colors.text.muted}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Item grid */}
      <View style={{ padding: spacing.sp12 }}>
        {rows.map(([left, right], i) => (
          <View key={i} style={styles.gridRow}>
            <GroceryItemCell item={left} colors={colors} radius={radius} spacing={spacing} />
            {right ? (
              <GroceryItemCell item={right} colors={colors} radius={radius} spacing={spacing} />
            ) : (
              <View style={styles.gridCell} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

function GroceryItemCell({
  item,
  colors,
  radius,
  spacing,
}: {
  item: GroceryItem;
  colors: ReturnType<typeof useTheme>['colors'];
  radius: ReturnType<typeof useTheme>['radius'];
  spacing: ReturnType<typeof useTheme>['spacing'];
}) {
  return (
    <View
      style={[
        styles.gridCell,
        {
          backgroundColor: colors.background.primary,
          borderRadius: radius.xs,
          paddingHorizontal: spacing.sp8,
          paddingVertical: spacing.sp6,
        },
      ]}
    >
      <Text
        variant="caption"
        color={colors.text.secondary}
        numberOfLines={1}
        style={styles.itemName}
      >
        {item.name}
      </Text>
      <Text variant="monoSmall" color={colors.text.muted}>
        {item.quantity}
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
    gap: 10,
  },
  cartIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cartEmoji: {
    fontSize: 16,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  gridCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    marginRight: 4,
  },
});
