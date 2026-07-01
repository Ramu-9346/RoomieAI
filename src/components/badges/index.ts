import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useEffect,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

// ─── StatusBadge ─────────────────────────────────────────────────────────────

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface StatusBadgeProps {
  status: OrderStatus;
  style?: ViewStyle;
}

export function StatusBadge({ status, style }: StatusBadgeProps) {
  const { colors, radius } = useTheme();

  const config: Record<OrderStatus, { label: string; color: string; surface: string }> = {
    pending:          { label: 'Pending',          color: colors.text.muted,        surface: colors.background.secondary },
    confirmed:        { label: 'Confirmed',         color: colors.primary.default,   surface: colors.primary.surface },
    preparing:        { label: 'Preparing',         color: colors.warning.default,   surface: colors.warning.surface },
    out_for_delivery: { label: 'On the way',        color: colors.primary.default,   surface: colors.primary.surface },
    delivered:        { label: 'Delivered',         color: colors.success.default,   surface: colors.success.surface },
    cancelled:        { label: 'Cancelled',         color: colors.error.default,     surface: colors.error.surface },
  };

  const { label, color, surface } = config[status];

  return (
    <View
      style={[
        styles.baseBadge,
        { backgroundColor: surface, borderRadius: radius.pill },
        style,
      ]}
    >
      <Text variant="monoSmall" color={color}>
        {label}
      </Text>
    </View>
  );
}

// ─── CountBadge ──────────────────────────────────────────────────────────────

interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: 'primary' | 'error' | 'success';
  style?: ViewStyle;
}

export function CountBadge({ count, max = 99, variant = 'error', style }: CountBadgeProps) {
  const { colors, radius } = useTheme();

  const displayCount = count > max ? `${max}+` : `${count}`;
  const color =
    variant === 'primary' ? colors.primary
    : variant === 'success' ? colors.success
    : colors.error;

  return (
    <View
      style={[
        styles.countBadge,
        {
          backgroundColor: color.default,
          borderRadius: radius.pill,
          minWidth: 18,
          height: 18,
          paddingHorizontal: count > 9 ? 5 : 0,
        },
        style,
      ]}
    >
      <Text variant="monoSmall" color={colors.white}>
        {displayCount}
      </Text>
    </View>
  );
}

// ─── NotificationBadge ───────────────────────────────────────────────────────

interface NotificationBadgeProps {
  count: number;
  style?: ViewStyle;
}

export function NotificationBadge({ count, style }: NotificationBadgeProps) {
  if (count === 0) return null;
  return <CountBadge count={count} variant="error" style={style} />;
}

// ─── RoleBadge ───────────────────────────────────────────────────────────────

interface RoleBadgeProps {
  role: 'admin' | 'member';
  style?: ViewStyle;
}

export function RoleBadge({ role, style }: RoleBadgeProps) {
  const { colors, radius } = useTheme();

  return (
    <View
      style={[
        styles.baseBadge,
        {
          backgroundColor: role === 'admin' ? colors.primary.surface : colors.background.secondary,
          borderRadius: radius.pill,
        },
        style,
      ]}
    >
      <Text
        variant="monoSmall"
        color={role === 'admin' ? colors.primary.text : colors.text.muted}
      >
        {role === 'admin' ? 'Admin' : 'Member'}
      </Text>
    </View>
  );
}

// ─── DiscountBadge ───────────────────────────────────────────────────────────

interface DiscountBadgeProps {
  percent: number;
  style?: ViewStyle;
}

export function DiscountBadge({ percent, style }: DiscountBadgeProps) {
  const { colors, radius } = useTheme();

  return (
    <View
      style={[
        styles.baseBadge,
        {
          backgroundColor: colors.success.surface,
          borderRadius: radius.pill,
        },
        style,
      ]}
    >
      <Text variant="monoSmall" color={colors.success.text}>
        {percent}% OFF
      </Text>
    </View>
  );
}

// ─── LiveBadge ───────────────────────────────────────────────────────────────

interface LiveBadgeProps {
  style?: ViewStyle;
}

export function LiveBadge({ style }: LiveBadgeProps) {
  const { colors, radius, duration } = useTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: duration.pulse / 2 }),
        withTiming(1,   { duration: duration.pulse / 2 }),
      ),
      -1,
    );
  }, []);

  const dotStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View
      style={[
        styles.liveBadge,
        {
          backgroundColor: colors.error.surface,
          borderRadius: radius.pill,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            width: 5,
            height: 5,
            borderRadius: 3,
            backgroundColor: colors.error.default,
          },
          dotStyle,
        ]}
      />
      <Text variant="monoSmall" color={colors.error.text}>
        LIVE
      </Text>
    </View>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  baseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  countBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
});
