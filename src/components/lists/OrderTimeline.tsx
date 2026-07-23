import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

type OrderStatus =
  'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface TimelineStep {
  status: OrderStatus;
  label: string;
  timestamp?: string;
}

const ALL_STEPS: TimelineStep[] = [
  { status: 'confirmed', label: 'Order Confirmed' },
  { status: 'preparing', label: 'Preparing Your Food' },
  { status: 'out_for_delivery', label: 'Out for Delivery' },
  { status: 'delivered', label: 'Delivered' },
];

const STATUS_ORDER: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
];

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  timestamps?: Partial<Record<OrderStatus, string>>;
  style?: ViewStyle;
}

export function OrderTimeline({ currentStatus, timestamps, style }: OrderTimelineProps) {
  const { colors, spacing } = useTheme();

  if (currentStatus === 'cancelled') {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.step}>
          <View style={[styles.dot, { backgroundColor: colors.error.default }]}>
            <Feather name="x" size={12} color={colors.white} />
          </View>
          <Text variant="bodyMedium" color={colors.error.default}>
            Order Cancelled
          </Text>
        </View>
      </View>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  return (
    <View style={[styles.container, style]}>
      {ALL_STEPS.map((step, i) => {
        const stepIdx = STATUS_ORDER.indexOf(step.status);
        const done = stepIdx <= currentIdx;
        const active = stepIdx === currentIdx;
        const ts = timestamps?.[step.status];

        return (
          <View key={step.status} style={styles.stepRow}>
            <View style={styles.track}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: done ? colors.success.default : colors.border.default,
                    borderColor: active ? colors.success.default : 'transparent',
                    borderWidth: active ? 2 : 0,
                  },
                ]}
              >
                {done && !active && <Feather name="check" size={10} color={colors.white} />}
              </View>
              {i < ALL_STEPS.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor:
                        done && stepIdx < currentIdx
                          ? colors.success.default
                          : colors.border.subtle,
                    },
                  ]}
                />
              )}
            </View>
            <View
              style={[
                styles.stepContent,
                { paddingBottom: i < ALL_STEPS.length - 1 ? spacing.sp20 : 0 },
              ]}
            >
              <Text
                variant={active ? 'bodyMedium' : 'body'}
                color={done ? colors.text.primary : colors.text.muted}
              >
                {step.label}
              </Text>
              {ts && (
                <Text variant="monoSmall" color={colors.text.muted}>
                  {ts}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 0 },
  stepRow: { flexDirection: 'row', gap: 12 },
  track: { alignItems: 'center', width: 24 },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 2,
  },
  stepContent: { flex: 1, gap: 2, paddingTop: 2 },
});
