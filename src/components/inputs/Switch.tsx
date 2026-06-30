/**
 * Switch — Toggle Input
 *
 * Used for:
 *   - Notification preferences (poll alerts on/off, order updates on/off)
 *   - "Include me in this order" quick toggle in poll response
 *   - Budget warning toggle in flat settings
 *   - Auto-confirm on routine orders (advanced setting, future)
 *
 * Design:
 *   - Custom implementation — not React Native's native Switch
 *   - Ensures visual consistency across iOS and Android
 *   - OFF: cream-2 bg, ink-muted thumb
 *   - ON: success-green bg (matches veg/live green), cream thumb
 *   - Animated thumb slide with spring physics
 */

import React, { useCallback } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { View } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const TRACK_WIDTH  = 48;
const TRACK_HEIGHT = 28;
const THUMB_SIZE   = 22;
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - 6;

export function Switch({
  value,
  onValueChange,
  label,
  description,
  disabled = false,
  style,
  accessibilityLabel,
}: SwitchProps) {
  const { colors, opacity } = useTheme();

  const progress = useSharedValue(value ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, { damping: 20, stiffness: 280 });
  }, [value]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: progress.value * THUMB_TRAVEL },
    ],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.border.default, colors.success.default],
    ),
  }));

  const handlePress = useCallback(() => {
    if (disabled) return;
    onValueChange(!value);
  }, [disabled, value, onValueChange]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.row,
        disabled && { opacity: opacity.disabled },
        style,
      ]}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel ?? label ?? 'Toggle switch'}
      accessibilityState={{ checked: value, disabled }}
    >
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

      {/* Track */}
      <Animated.View
        style={[
          styles.track,
          { width: TRACK_WIDTH, height: TRACK_HEIGHT },
          trackStyle,
        ]}
      >
        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              width:           THUMB_SIZE,
              height:          THUMB_SIZE,
              backgroundColor: colors.white,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            12,
  },
  labelContainer: {
    flex: 1,
    gap:  2,
  },
  track: {
    borderRadius:   99,
    justifyContent: 'center',
    padding:        3,
    flexShrink:     0,
  },
  thumb: {
    borderRadius: 99,
    shadowColor:  '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius:  2,
    elevation:     2,
  },
});
