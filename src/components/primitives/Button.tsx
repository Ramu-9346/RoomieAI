/**
 * Button — RoomieAI Interaction Primitive
 *
 * Variants:
 *   primary     — ink background, cream text. Main CTAs.
 *   secondary   — white background, border, ink text. Confirmable alternative.
 *   ghost       — transparent background, no border, ink text. Tertiary actions.
 *   danger      — red background, white text. Destructive actions.
 *   success     — green background, white text. Settlement, confirmation.
 *   floating    — orange-deep background, cream text. FAB-style inline CTAs.
 *   holdConfirm — special variant with press-and-hold fill progress.
 *                 Used for "Confirm & Place" to prevent accidental orders (BRD R-010).
 *
 * Animation:
 *   - All buttons scale to 0.96 on press via spring animation (react-native-reanimated)
 *   - holdConfirm: fills a progress overlay; fires onLongPressComplete at 100%
 *   - Loading state: shows animated spinner inside button, disables interaction
 *   - Disabled: opacity.disabled (0.4), no press feedback
 *
 * Sizes:
 *   sm — compact (28px height)
 *   md — standard (44px height) — Apple minimum touch target
 *   lg — prominent (52px height)
 *   full — full width
 */

import { Feather } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  type ViewStyle,
  type PressableProps,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';

import { Text } from './Text';

export type ButtonVariant =
  'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'floating' | 'holdConfirm';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  /** Feather icon name to show before label */
  iconLeft?: string;
  /** Feather icon name to show after label */
  iconRight?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  /** holdConfirm variant only: fires after hold completes */
  onHoldComplete?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  onPress,
  onHoldComplete,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const { colors, spacing, duration, opacity } = useTheme();

  const scale = useSharedValue(1);
  const holdProgress = useSharedValue(0);
  const holdActive = useRef(false);

  // ── Scale animation ──────────────────────────────────────────────────────
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    if (disabled || loading) return;
    scale.value = withSpring(0.96, { damping: 22, stiffness: 350 });

    if (variant === 'holdConfirm' && onHoldComplete) {
      holdActive.current = true;
      holdProgress.value = withTiming(1, { duration: duration.holdConfirm }, (finished) => {
        if (finished && holdActive.current) {
          runOnJS(onHoldComplete)();
        }
      });
    }
  }, [disabled, loading, variant, onHoldComplete, duration.holdConfirm]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 22, stiffness: 350 });
    if (variant === 'holdConfirm') {
      holdActive.current = false;
      holdProgress.value = withTiming(0, { duration: duration.fast });
    }
  }, [variant, duration.fast]);

  // ── Variant styles ────────────────────────────────────────────────────────
  const variantStyles = getVariantStyles(variant, colors);

  // ── Hold progress overlay ─────────────────────────────────────────────────
  const holdOverlayStyle = useAnimatedStyle(() => ({
    width: `${holdProgress.value * 100}%` as unknown as number,
  }));

  // ── Size ──────────────────────────────────────────────────────────────────
  const sizeStyle = getSizeStyle(size, spacing);

  const iconColor = variantStyles.iconColor;
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <AnimatedPressable
      onPress={disabled || loading || variant === 'holdConfirm' ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={[
        styles.base,
        sizeStyle,
        variantStyles.container,
        size === 'full' && styles.fullWidth,
        disabled && { opacity: opacity.disabled },
        animatedStyle,
        style,
      ]}
    >
      {/* Hold-confirm fill overlay */}
      {variant === 'holdConfirm' && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.holdOverlay,
            { backgroundColor: colors.success.default },
            holdOverlayStyle,
          ]}
        />
      )}

      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator size="small" color={variantStyles.iconColor} style={styles.spinner} />
        ) : (
          <>
            {iconLeft && (
              <Feather
                name={iconLeft as any}
                size={iconSize}
                color={iconColor}
                style={styles.iconLeft}
              />
            )}
            <Text variant="button" color={variantStyles.textColor} style={styles.label}>
              {loading ? 'Please wait...' : label}
            </Text>
            {iconRight && (
              <Feather
                name={iconRight as any}
                size={iconSize}
                color={iconColor}
                style={styles.iconRight}
              />
            )}
          </>
        )}
      </View>
    </AnimatedPressable>
  );
}

// ── Icon Button ───────────────────────────────────────────────────────────────
// Square button with only an icon — for toolbar actions, navigation actions.

interface IconButtonProps {
  icon: string;
  size?: ButtonSize;
  variant?: Extract<ButtonVariant, 'primary' | 'secondary' | 'ghost'>;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel: string;
  style?: ViewStyle;
}

export function IconButton({
  icon,
  size = 'md',
  variant = 'ghost',
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
}: IconButtonProps) {
  const { colors, radius, opacity } = useTheme();
  const scale = useSharedValue(1);
  const variantStyles = getVariantStyles(variant, colors);
  const iconSizePx = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const containerSize = size === 'sm' ? 32 : size === 'lg' ? 52 : 44;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => {
        scale.value = withSpring(0.92, { damping: 22, stiffness: 350 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 22, stiffness: 350 });
      }}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={[
        {
          width: containerSize,
          height: containerSize,
          borderRadius: radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          ...variantStyles.container,
        },
        disabled && { opacity: opacity.disabled },
        animatedStyle,
        style,
      ]}
    >
      <Feather name={icon as any} size={iconSizePx} color={variantStyles.iconColor} />
    </AnimatedPressable>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getVariantStyles(variant: ButtonVariant, colors: ReturnType<typeof useTheme>['colors']) {
  switch (variant) {
    case 'primary':
      return {
        container: { backgroundColor: colors.text.primary, borderWidth: 0 } as ViewStyle,
        textColor: colors.text.inverse,
        iconColor: colors.text.inverse,
      };
    case 'secondary':
      return {
        container: {
          backgroundColor: colors.background.elevated,
          borderWidth: 1,
          borderColor: colors.border.default,
        } as ViewStyle,
        textColor: colors.text.secondary,
        iconColor: colors.text.secondary,
      };
    case 'ghost':
      return {
        container: { backgroundColor: colors.transparent, borderWidth: 0 } as ViewStyle,
        textColor: colors.text.secondary,
        iconColor: colors.text.secondary,
      };
    case 'danger':
      return {
        container: { backgroundColor: colors.error.default, borderWidth: 0 } as ViewStyle,
        textColor: colors.white,
        iconColor: colors.white,
      };
    case 'success':
      return {
        container: { backgroundColor: colors.success.default, borderWidth: 0 } as ViewStyle,
        textColor: colors.white,
        iconColor: colors.white,
      };
    case 'floating':
      return {
        container: { backgroundColor: colors.primary.default, borderWidth: 0 } as ViewStyle,
        textColor: colors.text.inverse,
        iconColor: colors.text.inverse,
      };
    case 'holdConfirm':
      return {
        container: {
          backgroundColor: colors.text.primary,
          borderWidth: 0,
          overflow: 'hidden',
        } as ViewStyle,
        textColor: colors.text.inverse,
        iconColor: colors.text.inverse,
      };
  }
}

function getSizeStyle(
  size: ButtonSize,
  spacing: ReturnType<typeof useTheme>['spacing'],
): ViewStyle {
  switch (size) {
    case 'sm':
      return { height: 32, paddingHorizontal: spacing.sp12 };
    case 'md':
      return { height: 44, paddingHorizontal: spacing.sp16 };
    case 'lg':
      return { height: 52, paddingHorizontal: spacing.sp20 };
    case 'full':
      return { height: 52, paddingHorizontal: spacing.sp20, width: '100%' };
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  label: {
    zIndex: 1,
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  spinner: {
    marginHorizontal: 8,
  },
  holdOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    opacity: 0.35,
  },
});
