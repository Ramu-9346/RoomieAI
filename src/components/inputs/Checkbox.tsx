/**
 * Checkbox — Boolean Selection Input
 *
 * Used for:
 *   - Member approval confirmations
 *   - Allergen selection in preference setup
 *   - Privacy consent at onboarding (DPDP, BRD §21.7)
 *   - "Remember this preference" toggles
 *
 * States: unchecked → checked → indeterminate (for parent selectors)
 * Variants: default (ink) | success (green) | error (red)
 */

import React, { useCallback } from 'react';
import { Pressable, View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export type CheckboxVariant = 'default' | 'success' | 'error';

interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  label?: string;
  description?: string;
  variant?: CheckboxVariant;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function Checkbox({
  checked,
  indeterminate = false,
  label,
  description,
  variant = 'default',
  disabled = false,
  onPress,
  style,
  accessibilityLabel,
}: CheckboxProps) {
  const { colors, radius, opacity } = useTheme();
  const scale = useSharedValue(1);

  const variantColors = {
    default: { checked: colors.text.primary,    border: colors.border.strong  },
    success: { checked: colors.success.default, border: colors.success.default },
    error:   { checked: colors.error.default,   border: colors.error.default  },
  }[variant];

  const boxStyle: ViewStyle = {
    width:           20,
    height:          20,
    borderRadius:    radius.xs,
    borderWidth:     1.5,
    borderColor:     (checked || indeterminate) ? variantColors.checked : colors.border.default,
    backgroundColor: (checked || indeterminate) ? variantColors.checked : colors.background.elevated,
    alignItems:      'center',
    justifyContent:  'center',
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(0.85, { damping: 22, stiffness: 400 }, () => {
      scale.value = withSpring(1, { damping: 22, stiffness: 400 });
    });
    onPress();
  }, [disabled, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.row,
        disabled && { opacity: opacity.disabled },
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
    >
      <Animated.View style={[boxStyle, animStyle]}>
        {checked && !indeterminate && (
          <Feather name="check" size={13} color={colors.white} strokeWidth={3} />
        )}
        {indeterminate && (
          <View style={[styles.indeterminateLine, { backgroundColor: colors.white }]} />
        )}
      </Animated.View>

      {(label || description) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text variant="body" color={colors.text.primary}>
              {label}
            </Text>
          )}
          {description && (
            <Text variant="caption" color={colors.text.muted}>
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           10,
  },
  labelContainer: {
    flex: 1,
    gap:  2,
  },
  indeterminateLine: {
    width:        10,
    height:       2,
    borderRadius: 1,
  },
});
