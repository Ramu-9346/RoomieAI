import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  forMembers?: string[];
}

interface CartSummaryCardProps {
  items: CartItem[];
  total: number;
  deliveryFee?: number;
  isOverCap?: boolean;
  capWarning?: string;
  onConfirm?: () => void;
  onEdit?: () => void;
  style?: ViewStyle;
}

export function CartSummaryCard({
  items,
  total,
  deliveryFee = 0,
  isOverCap = false,
  capWarning,
  onConfirm,
  onEdit,
  style,
}: CartSummaryCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  const grandTotal = total + deliveryFee;

  return (
    <View
      style={[
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xxl,
          padding: spacing.cardPaddingLg,
          ...shadows.card,
          borderWidth: isOverCap ? 1.5 : 1,
          borderColor: isOverCap ? colors.error.default : colors.border.default,
          gap: spacing.sp12,
        },
        style,
      ]}
    >
      <Text variant="eyebrow" color={colors.primary.text}>Cart Summary</Text>

      {items.map((item, i) => (
        <View key={i} style={styles.row}>
          <Text variant="bodyMedium" color={colors.text.primary} style={styles.flex} numberOfLines={1}>
            {item.quantity}× {item.name}
          </Text>
          <Text variant="mono" color={colors.text.secondary}>
            ₹{new Intl.NumberFormat('en-IN').format(item.price * item.quantity)}
          </Text>
        </View>
      ))}

      <View style={[styles.divider, { borderColor: colors.border.subtle }]} />

      {deliveryFee > 0 && (
        <View style={styles.row}>
          <Text variant="caption" color={colors.text.muted}>Delivery fee</Text>
          <Text variant="monoSmall" color={colors.text.muted}>
            ₹{new Intl.NumberFormat('en-IN').format(deliveryFee)}
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text variant="bodyMedium" color={colors.text.primary}>Total</Text>
        <Text variant="monoMedium" color={isOverCap ? colors.error.default : colors.text.primary}>
          ₹{new Intl.NumberFormat('en-IN').format(grandTotal)}
        </Text>
      </View>

      {capWarning && (
        <View style={[styles.capRow, { backgroundColor: colors.warning.surface, borderRadius: radius.md }]}>
          <Text variant="caption" color={colors.warning.text}>{capWarning}</Text>
        </View>
      )}

      {(onEdit || onConfirm) && (
        <View style={styles.actions}>
          {onEdit && (
            <Button label="Edit Cart" variant="secondary" size="md" onPress={onEdit} style={styles.flex} />
          )}
          {onConfirm && (
            <Button
              label="Confirm Order"
              variant={isOverCap ? 'danger' : 'holdConfirm'}
              size="md"
              onHoldComplete={onConfirm}
              style={styles.flex}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  flex: { flex: 1 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth },
  capRow: { paddingHorizontal: 12, paddingVertical: 8 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 4 },
});
