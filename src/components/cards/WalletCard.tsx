import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface WalletSplit {
  memberName: string;
  memberIndex: number;
  amount: number;
  status: 'self' | 'pending' | 'sent' | 'settled';
  upiId?: string;
}

interface WalletCardProps {
  orderId: string;
  total: number;
  splits: WalletSplit[];
  onUPIPay?: (split: WalletSplit) => void;
  style?: ViewStyle;
}

const STATUS_LABELS: Record<WalletSplit['status'], string> = {
  self: 'You paid',
  pending: 'Pending',
  sent: 'Sent',
  settled: 'Settled',
};

export function WalletCard({ orderId, total, splits, onUPIPay, style }: WalletCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xxl,
          padding: spacing.cardPaddingLg,
          ...shadows.card,
          gap: spacing.sp16,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <Text variant="eyebrow" color={colors.primary.text}>Payment Split</Text>
        <Text variant="monoSmall" color={colors.text.muted}>#{orderId.slice(-6)}</Text>
      </View>

      {splits.map((split, i) => {
        const memberColor = colors.member[split.memberIndex % 8] as string;
        const statusColor =
          split.status === 'settled' ? colors.success.default
          : split.status === 'pending' ? colors.warning.default
          : split.status === 'self'   ? colors.primary.default
          : colors.text.muted;

        return (
          <View key={i} style={styles.row}>
            <View style={[styles.dot, { backgroundColor: memberColor }]} />
            <Text variant="bodyMedium" color={colors.text.primary} style={styles.flex}>
              {split.memberName}
            </Text>
            <Text variant="mono" color={colors.text.primary}>
              ₹{new Intl.NumberFormat('en-IN').format(split.amount)}
            </Text>
            {split.status === 'pending' && onUPIPay ? (
              <Pressable
                onPress={() => onUPIPay(split)}
                style={[styles.payBtn, { backgroundColor: colors.success.surface, borderRadius: radius.xs }]}
                accessibilityLabel={`Pay ${split.memberName}`}
              >
                <Text variant="monoSmall" color={colors.success.text}>PAY</Text>
              </Pressable>
            ) : (
              <Text variant="monoSmall" color={statusColor} style={styles.status}>
                {STATUS_LABELS[split.status]}
              </Text>
            )}
          </View>
        );
      })}

      <View style={[styles.total, { borderTopColor: colors.border.subtle }]}>
        <Text variant="bodyMedium" color={colors.text.primary}>Total</Text>
        <Text variant="monoMedium" color={colors.text.primary}>
          ₹{new Intl.NumberFormat('en-IN').format(total)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flex: { flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  payBtn: { paddingHorizontal: 8, paddingVertical: 3 },
  status: { minWidth: 48, textAlign: 'right' },
  total: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth },
});
