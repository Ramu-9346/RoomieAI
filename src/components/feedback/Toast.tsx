/**
 * Toast — Transient notification overlay
 *
 * Slides in from bottom, auto-dismisses after `duration` ms.
 * Sits at zIndex.toast (90).
 *
 * Types:
 *   success  — green left border, check icon
 *   error    — red left border, x icon
 *   info     — ink left border, info icon
 *   warning  — amber left border, alert icon
 *
 * Usage — imperative via ToastManager:
 *   ToastManager.show({ type: 'success', message: 'Order placed!' })
 *
 * Declarative:
 *   <Toast visible={show} type="success" message="Done" onDismiss={…} />
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  visible: boolean;
  type?: ToastType;
  message: string;
  subtitle?: string;
  duration?: number;
  onDismiss?: () => void;
  style?: ViewStyle;
}

const TYPE_CONFIG: Record<ToastType, { icon: string; getColor: (c: any) => string }> = {
  success: { icon: 'check',      getColor: (c) => c.success.default },
  error:   { icon: 'x',         getColor: (c) => c.error.default   },
  info:    { icon: 'info',       getColor: (c) => c.text.primary    },
  warning: { icon: 'alert-circle', getColor: (c) => '#F59E0B'       },
};

export function Toast({
  visible,
  type = 'info',
  message,
  subtitle,
  duration = 3000,
  onDismiss,
  style,
}: ToastProps) {
  const { colors, radius, spacing, shadows, zIndex } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(100);
  const opacity    = useSharedValue(0);
  const timer      = useRef<ReturnType<typeof setTimeout>>();
  const config     = TYPE_CONFIG[type];
  const accentColor = config.getColor(colors);

  useEffect(() => {
    if (visible) {
      opacity.value    = withTiming(1, { duration: 220, easing: Easing.out(Easing.ease) });
      translateY.value = withSpring(0, { damping: 22, stiffness: 300 });
      if (duration > 0) {
        timer.current = setTimeout(() => onDismiss?.(), duration);
      }
    } else {
      clearTimeout(timer.current);
      opacity.value    = withTiming(0, { duration: 180 });
      translateY.value = withTiming(60, { duration: 200 });
    }
    return () => clearTimeout(timer.current);
  }, [visible]);

  const animStyle = useAnimatedStyle(() => ({
    opacity:   opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible && opacity.value === 0) return null;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          bottom:  insets.bottom + 80, // above tab bar
          zIndex:  zIndex.toast,
          paddingHorizontal: spacing.sp16,
        },
        animStyle,
      ]}
      pointerEvents={visible ? 'box-none' : 'none'}
    >
      <Pressable
        onPress={onDismiss}
        style={[
          styles.container,
          {
            backgroundColor: colors.background.elevated,
            borderRadius:    radius.lg,
            borderLeftWidth: 3,
            borderLeftColor: accentColor,
            padding:         spacing.sp14,
            ...shadows.floating,
          },
          style,
        ]}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
      >
        <View style={styles.iconWrap}>
          <Feather name={config.icon as any} size={18} color={accentColor} />
        </View>
        <View style={styles.content}>
          <Text variant="bodyMedium" color={colors.text.primary} numberOfLines={2}>
            {message}
          </Text>
          {subtitle && (
            <Text variant="caption" color={colors.text.muted} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        <Pressable
          onPress={onDismiss}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        >
          <Feather name="x" size={16} color={colors.text.muted} />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left:     0,
    right:    0,
  },
  container: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
  },
  iconWrap: {
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap:  2,
  },
});
