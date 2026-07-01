import React, { type ReactNode, useCallback } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

interface StickyHeaderProps {
  children: ReactNode;
  scrollY?: Animated.SharedValue<number>;
  threshold?: number;
  style?: ViewStyle;
}

// Attach scrollHandler to your AnimatedScrollView/FlatList to animate header
export function useStickyHeaderScroll() {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  return { scrollY, onScroll };
}

export function StickyHeader({
  children,
  scrollY,
  threshold = 48,
  style,
}: StickyHeaderProps) {
  const { colors, shadows } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const progress = Math.min(scrollY.value / threshold, 1);
    return {
      shadowOpacity: interpolate(progress, [0, 1], [0, shadows.card.shadowOpacity ?? 0.08]),
      borderBottomWidth: interpolate(progress, [0, 1], [0, 1]),
      borderBottomColor: colors.border.subtle,
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.background.primary },
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    width: '100%',
  },
});
