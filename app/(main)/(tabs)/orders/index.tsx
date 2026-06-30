/**
 * OrdersScreen — live and recent orders.
 * PLACEHOLDER: Full implementation in Phase 4.
 *
 * Will render:
 *   - TopAppBar (orders variant) with live badge
 *   - Live order status card (if active order)
 *   - Recent orders list (OrderCard)
 */

import { View, StyleSheet } from 'react-native';
import { Text }             from '@components/primitives/Text';
import { useAppTheme }      from '@hooks/useAppTheme';

export default function OrdersScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text variant="title" color={colors.text.primary} align="center">
        Orders
      </Text>
      <Text variant="captionItalic" color={colors.text.muted} align="center">
        Live & recent orders — Phase 4
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
});
