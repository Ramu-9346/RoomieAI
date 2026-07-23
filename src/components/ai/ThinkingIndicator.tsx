/**
 * ThinkingIndicator — Animated typing/thinking dots
 *
 * Shown in AIMessageBubble while the Claude API is streaming a response.
 * Three dots that animate with staggered bounce (matches web demo `.typing-dots`).
 *
 * Optional `label` text beside the dots: "Checking Swiggy...", "Placing order..."
 *
 * Animation:
 *   Each dot: withRepeat(withSequence(up → down)) with stagger offset.
 *   Stagger: 150ms between dots (Stagger.s3 token).
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

const DOT_SIZE = 6;
const BOUNCE_UP = -6;
const DOT_DURATION = 400;
const STAGGER = 150;

interface ThinkingIndicatorProps {
  label?: string;
  style?: ViewStyle;
}

export function ThinkingIndicator({ label, style }: ThinkingIndicatorProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.pill,
          paddingVertical: spacing.sp10,
          paddingHorizontal: spacing.sp14,
          gap: 6,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <BounceDot key={i} delayMs={i * STAGGER} color={colors.text.muted} />
        ))}
      </View>
      {label && (
        <Text variant="captionItalic" color={colors.text.muted}>
          {label}
        </Text>
      )}
    </View>
  );
}

function BounceDot({ delayMs, color }: { delayMs: number; color: string }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(BOUNCE_UP, { duration: DOT_DURATION / 2, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: DOT_DURATION / 2, easing: Easing.in(Easing.ease) }),
          withTiming(0, { duration: STAGGER }), // pause before repeat
        ),
        -1,
        false,
      ),
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[styles.dot, animStyle, { backgroundColor: color, borderRadius: DOT_SIZE / 2 }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
  },
});
