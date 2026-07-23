/**
 * SegmentControl — Tab-Like Option Selector
 *
 * Used for:
 *   - History tab filter: All / Food / Grocery / Dineout
 *   - Splits view: Outstanding / Settled
 *   - Budget view: Weekly / Monthly
 *   - Flat settings: Approval threshold selector
 *
 * Design:
 *   - Pill-shaped container (cream-2 bg)
 *   - Active segment: white bg with card shadow, slides with spring animation
 *   - Labels: Geist body, muted when inactive, primary when active
 *   - Not a native SegmentedControl — fully custom for cross-platform consistency
 */

import React, { useRef, useCallback } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle, type LayoutRectangle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface SegmentControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  style?: ViewStyle;
}

export function SegmentControl<T extends string>({
  options,
  value,
  onChange,
  style,
}: SegmentControlProps<T>) {
  const { colors, radius, shadows } = useTheme();
  const segmentLayouts = useRef<LayoutRectangle[]>([]);
  const currentIndex = options.findIndex((o) => o.value === value);

  const thumbX = useSharedValue(0);
  const thumbWidth = useSharedValue(0);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value }],
    width: thumbWidth.value,
  }));

  const handleLayout = useCallback(
    (index: number, layout: LayoutRectangle) => {
      segmentLayouts.current[index] = layout;
      if (index === currentIndex) {
        thumbX.value = layout.x;
        thumbWidth.value = layout.width;
      }
    },
    [currentIndex],
  );

  const handlePress = useCallback(
    (index: number) => {
      const layout = segmentLayouts.current[index];
      if (layout) {
        thumbX.value = withSpring(layout.x, { damping: 22, stiffness: 300 });
        thumbWidth.value = withSpring(layout.width, { damping: 22, stiffness: 300 });
      }
      onChange(options[index].value);
    },
    [options, onChange],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.secondary,
          borderRadius: radius.pill,
          padding: 3,
        },
        style,
      ]}
    >
      {/* Sliding thumb */}
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: colors.background.elevated,
            borderRadius: radius.pill,
            ...shadows.xs,
          },
          thumbStyle,
        ]}
        pointerEvents="none"
      />

      {/* Segment buttons */}
      {options.map((option, i) => {
        const isActive = value === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(i)}
            onLayout={(e) => handleLayout(i, e.nativeEvent.layout)}
            style={styles.segment}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isActive }}
          >
            <Text
              variant="caption"
              color={isActive ? colors.text.primary : colors.text.muted}
              bold={isActive}
              align="center"
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 0,
  },
  segment: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 12,
    zIndex: 1,
    alignItems: 'center',
  },
});
