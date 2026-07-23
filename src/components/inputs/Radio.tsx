/**
 * Radio — Single-Choice Selection Input
 *
 * Used for:
 *   - Dietary type selection (Veg / Non-Veg / Eggetarian / Jain / Vegan)
 *   - Payment mode selection (COD — only option in v1, BRD C-001)
 *   - Approval threshold selection in flat settings
 *   - Address selection when multiple saved addresses exist
 *
 * RadioGroup: manages mutual exclusion automatically.
 */

import React, { useCallback } from 'react';
import { Pressable, View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface RadioProps {
  selected: boolean;
  label: string;
  description?: string;
  onSelect: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Radio({
  selected,
  label,
  description,
  onSelect,
  disabled = false,
  style,
}: RadioProps) {
  const { colors, opacity } = useTheme();
  const dotScale = useSharedValue(selected ? 1 : 0);

  const dotAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale.value }],
  }));

  const handlePress = useCallback(() => {
    if (disabled || selected) return;
    dotScale.value = withSpring(1, { damping: 18, stiffness: 300 });
    onSelect();
  }, [disabled, selected, onSelect]);

  // Keep dot in sync with `selected` prop
  React.useEffect(() => {
    dotScale.value = withSpring(selected ? 1 : 0, { damping: 18, stiffness: 300 });
  }, [selected]);

  const outerBorderColor = selected ? colors.primary.default : colors.border.default;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.row, disabled && { opacity: opacity.disabled }, style]}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected, disabled }}
    >
      {/* Radio circle */}
      <View style={[styles.outer, { borderColor: outerBorderColor }]}>
        <Animated.View
          style={[styles.inner, { backgroundColor: colors.primary.default }, dotAnimStyle]}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text variant="body" color={colors.text.primary}>
          {label}
        </Text>
        {description && (
          <Text variant="caption" color={colors.text.muted}>
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

// ── RadioGroup ────────────────────────────────────────────────────────────────

interface RadioGroupProps<T extends string> {
  options: { value: T; label: string; description?: string }[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function RadioGroup<T extends string>({
  options,
  value,
  onChange,
  disabled = false,
  style,
}: RadioGroupProps<T>) {
  return (
    <View style={[styles.group, style]}>
      {options.map((option) => (
        <Radio
          key={option.value}
          selected={value === option.value}
          label={option.label}
          description={option.description}
          onSelect={() => onChange(option.value)}
          disabled={disabled}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  labelContainer: {
    flex: 1,
    gap: 2,
  },
  group: {
    gap: 16,
  },
});
