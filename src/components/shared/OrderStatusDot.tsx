import React from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useEffect,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface OrderStatusDotProps {
  status: OrderStatus;
  size?: number;
  style?: ViewStyle;
}

export function OrderStatusDot({ status, size = 8, style }: OrderStatusDotProps) {
  const { colors, duration } = useTheme();
  const opacity = useSharedValue(1);
  const isLive = status === 'confirmed' || status === 'preparing' || status === 'out_for_delivery';

  useEffect(() => {
    if (isLive) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: duration.pulse / 2 }),
          withTiming(1,   { duration: duration.pulse / 2 }),
        ),
        -1,
      );
    } else {
      opacity.value = 1;
    }
  }, [isLive]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const color =
    status === 'delivered'   ? colors.success.default
    : status === 'cancelled' ? colors.error.default
    : isLive                 ? colors.primary.default
    : colors.text.muted;

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        isLive && animatedStyle,
        style,
      ]}
    />
  );
}
