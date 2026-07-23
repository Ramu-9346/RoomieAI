import React, { useEffect } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface SnackbarProps {
  visible: boolean;
  message: string;
  action?: { label: string; onPress: () => void };
  duration?: number;
  onDismiss?: () => void;
  style?: ViewStyle;
}

export function Snackbar({
  visible,
  message,
  action,
  duration = 3000,
  onDismiss,
  style,
}: SnackbarProps) {
  const { colors, radius, spacing, zIndex } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(80);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 250 });
      opacity.value = withTiming(1, { duration: 250 });
      if (duration > 0 && onDismiss) {
        const t = setTimeout(onDismiss, duration);
        return () => clearTimeout(t);
      }
    } else {
      translateY.value = withTiming(80, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: insets.bottom + spacing.sp16,
          left: spacing.pageHorizontal,
          right: spacing.pageHorizontal,
          backgroundColor: colors.text.primary,
          borderRadius: radius.lg,
          zIndex: zIndex.toast,
        },
        animStyle,
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text variant="body" color={colors.text.inverse} style={styles.message} numberOfLines={2}>
        {message}
      </Text>
      {action && (
        <Pressable onPress={action.onPress} hitSlop={8}>
          <Text variant="bodyMedium" color={colors.primary.default}>
            {action.label}
          </Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  message: { flex: 1 },
});
