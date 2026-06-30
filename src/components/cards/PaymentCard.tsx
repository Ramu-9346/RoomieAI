/**
 * PaymentCard — UPI Bill Split Card
 *
 * The financial trust component. Mirrors .splits-card from the web demo.
 * Shows each member's exact share with a tap-to-pay UPI action.
 *
 * Structure:
 *   ┌──────────────────────────────────────────┐
 *   │ UPI SPLITS                               │  ← eyebrow label
 *   ├──────────────────────────────────────────│
 *   │ [R] Ramu      ₹449   [Your share]        │
 *   │ [P] Priya     ₹449   [UPI sent →]        │
 *   │ [A] Akash     ₹338   [UPI sent →]        │
 *   └──────────────────────────────────────────┘
 *
 * Split status:
 *   - 'self'    — "Your share" pill (no action — you're the COD payer)
 *   - 'pending' — orange UPI chip, tappable → opens UPI deep link
 *   - 'sent'    — green "Sent ✓" chip (self-reported in v1)
 *   - 'settled' — muted "Settled" label
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { Avatar } from '../primitives/Avatar';
import { Divider } from '../primitives/Divider';

export type SplitStatus = 'self' | 'pending' | 'sent' | 'settled';

export interface SplitEntry {
  name: string;
  memberIndex: number;
  amount: string;      // "₹449"
  status: SplitStatus;
  onPay?: () => void;  // opens UPI deep link
  onMarkPaid?: () => void;
}

interface PaymentCardProps {
  splits: SplitEntry[];
  orderTotal?: string;
  style?: ViewStyle;
}

export function PaymentCard({ splits, orderTotal, style }: PaymentCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius:    radius.lg,
          borderWidth:     1,
          borderColor:     colors.border.default,
          overflow:        'hidden',
          ...shadows.card,
        },
        style,
      ]}
    >
      {/* Header */}
      <View style={{ padding: spacing.sp14, paddingBottom: spacing.sp10 }}>
        <Text variant="eyebrow" color={colors.text.muted}>
          UPI Splits
        </Text>
      </View>

      {/* Split rows */}
      {splits.map((entry, i) => (
        <SplitRow
          key={`${entry.name}-${i}`}
          entry={entry}
          isLast={i === splits.length - 1}
          colors={colors}
          spacing={spacing}
          radius={radius}
        />
      ))}
    </View>
  );
}

// ── SplitRow ──────────────────────────────────────────────────────────────────

function SplitRow({
  entry,
  isLast,
  colors,
  spacing,
  radius,
}: {
  entry: SplitEntry;
  isLast: boolean;
  colors: any;
  spacing: any;
  radius: any;
}) {
  const statusContent = getStatusContent(entry, colors, radius, spacing);

  return (
    <View
      style={[
        styles.row,
        !isLast && {
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border.subtle,
        },
        { paddingHorizontal: spacing.sp14, paddingVertical: spacing.sp10 },
      ]}
    >
      <Avatar name={entry.name} memberIndex={entry.memberIndex} size="sm" />

      <Text variant="bodyMedium" color={colors.text.primary} style={styles.name}>
        {entry.name}
      </Text>

      <Text variant="monoMedium" color={colors.text.primary} style={styles.amount}>
        {entry.amount}
      </Text>

      {statusContent}
    </View>
  );
}

function getStatusContent(
  entry: SplitEntry,
  colors: any,
  radius: any,
  spacing: any,
) {
  switch (entry.status) {
    case 'self':
      return (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: colors.background.secondary,
              borderRadius:    radius.xs,
              paddingHorizontal: spacing.sp6,
              paddingVertical:   spacing.sp2,
            },
          ]}
        >
          <Text variant="monoSmall" color={colors.text.muted}>
            Your share
          </Text>
        </View>
      );

    case 'pending':
      return (
        <Pressable
          onPress={entry.onPay}
          style={[
            styles.chip,
            {
              backgroundColor: colors.primary.surface,
              borderRadius:    radius.xs,
              paddingHorizontal: spacing.sp6,
              paddingVertical:   spacing.sp2,
            },
          ]}
          accessibilityLabel={`Pay ${entry.name} ${entry.amount} via UPI`}
          accessibilityRole="button"
        >
          <Text variant="monoSmall" color={colors.primary.text}>
            UPI pay →
          </Text>
        </Pressable>
      );

    case 'sent':
      return (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: colors.success.surface,
              borderRadius:    radius.xs,
              paddingHorizontal: spacing.sp6,
              paddingVertical:   spacing.sp2,
            },
          ]}
        >
          <Text variant="monoSmall" color={colors.success.text}>
            Sent ✓
          </Text>
        </View>
      );

    case 'settled':
      return (
        <Text variant="monoSmall" color={colors.text.muted}>
          Settled
        </Text>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
  },
  name: {
    flex: 1,
  },
  amount: {
    flexShrink: 0,
  },
  chip: {
    flexShrink: 0,
    marginLeft: 8,
  },
});
