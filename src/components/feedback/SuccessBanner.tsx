/**
 * SuccessBanner — Full-width in-chat success state
 *
 * Slides in from above, auto-dismisses OR stays persistent.
 * Used after:
 *   - Order placed successfully
 *   - Payment split sent
 *   - Swiggy token verified
 *
 * NOT a toast — this is wider, more prominent, rendered inside
 * the chat scroll area as a special message bubble type.
 */

import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface SuccessBannerProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export function SuccessBanner({ visible, title, subtitle, style }: SuccessBannerProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const translateY = useSharedValue(-24);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 220 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 280 });
    } else {
      opacity.value = withTiming(0, { duration: 180 });
      translateY.value = withTiming(-16, { duration: 200 });
    }
  }, [visible]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.success.surface,
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: colors.success.border,
          padding: spacing.sp14,
          ...shadows.xs,
        },
        animStyle,
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: colors.success.default,
            borderRadius: radius.pill,
          },
        ]}
      >
        <Feather name="check" size={16} color="#FFFFFF" />
      </View>
      <View style={styles.text}>
        <Text variant="bodyMedium" color={colors.success.text}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color={colors.success.text}>
            {subtitle}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  iconCircle: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
