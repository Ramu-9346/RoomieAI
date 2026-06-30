/**
 * HistoryCard — Order History List Item
 *
 * Used in the History tab timeline.
 * Compact card that summarises a past order or booking.
 *
 * Types:
 *   food     — food emoji, restaurant name, item count, total
 *   grocery  — cart emoji, "Weekly restock", item count, total
 *   dineout  — fork emoji, restaurant name, date/time, party size
 *
 * Split settlement status shown inline as a small status chip.
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { CategoryBadge, type CategoryBadgeType } from '../primitives/Badge';

export type HistoryItemType = 'food' | 'grocery' | 'dineout';

export type SettlementStatus = 'all-settled' | 'partial' | 'pending';

const TYPE_CONFIG: Record<HistoryItemType, {
  emoji: string;
  category: CategoryBadgeType;
}> = {
  food:    { emoji: '🍛', category: 'food' },
  grocery: { emoji: '🛒', category: 'grocery' },
  dineout: { emoji: '🍽', category: 'dineout' },
};

interface HistoryCardProps {
  type: HistoryItemType;
  title: string;         // Restaurant name / "Weekly restock" / restaurant for booking
  subtitle: string;      // "4 items · ₹1,236" / "14 items · ₹1,698" / "4 pax · Sat 8 PM"
  timestamp: string;     // "2d ago", "Sun 29 Jun"
  settlementStatus?: SettlementStatus;
  onPress?: () => void;
  style?: ViewStyle;
}

export function HistoryCard({
  type,
  title,
  subtitle,
  timestamp,
  settlementStatus,
  onPress,
  style,
}: HistoryCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const config = TYPE_CONFIG[type];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius:    radius.xl,
          borderWidth:     1,
          borderColor:     pressed ? colors.border.strong : colors.border.default,
          padding:         spacing.sp14,
          ...shadows.xs,
        },
        style,
      ]}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${title}, ${subtitle}, ${timestamp}`}
    >
      <View style={styles.row}>
        {/* Type icon */}
        <View
          style={[
            styles.icon,
            {
              backgroundColor: getIconBg(type, colors),
              borderRadius:    radius.md,
            },
          ]}
        >
          <Text variant="title" style={styles.emoji}>
            {config.emoji}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text variant="bodyMedium" color={colors.text.primary} numberOfLines={1}>
            {title}
          </Text>
          <Text variant="monoSmall" color={colors.text.muted}>
            {subtitle}
          </Text>

          {settlementStatus && (
            <SettlementChip status={settlementStatus} colors={colors} radius={radius} />
          )}
        </View>

        {/* Right side: timestamp + chevron */}
        <View style={styles.right}>
          <Text variant="monoSmall" color={colors.text.muted}>
            {timestamp}
          </Text>
          {onPress && (
            <Feather
              name="chevron-right"
              size={14}
              color={colors.text.muted}
              style={styles.chevron}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}

function SettlementChip({
  status,
  colors,
  radius,
}: {
  status: SettlementStatus;
  colors: any;
  radius: any;
}) {
  const config = {
    'all-settled': { bg: colors.success.surface, text: colors.success.text,   label: 'Settled' },
    'partial':     { bg: colors.warning.surface, text: colors.warning.text,   label: 'Partial' },
    'pending':     { bg: colors.primary.surface, text: colors.primary.text,   label: 'Pending' },
  }[status];

  return (
    <View
      style={{
        backgroundColor:  config.bg,
        borderRadius:     radius.xs,
        paddingHorizontal: 6,
        paddingVertical:   2,
        alignSelf:        'flex-start',
        marginTop:        3,
      }}
    >
      <Text variant="monoSmall" color={config.text}>{config.label}</Text>
    </View>
  );
}

function getIconBg(type: HistoryItemType, colors: any): string {
  switch (type) {
    case 'food':    return colors.primary.surface;
    case 'grocery': return colors.success.surface;
    case 'dineout': return colors.accent.surface;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           12,
  },
  icon: {
    width:          44,
    height:         44,
    alignItems:     'center',
    justifyContent: 'center',
    flexShrink:     0,
  },
  emoji: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap:  2,
  },
  right: {
    flexShrink: 0,
    alignItems: 'flex-end',
    gap:        4,
  },
  chevron: {
    marginTop: 2,
  },
});
