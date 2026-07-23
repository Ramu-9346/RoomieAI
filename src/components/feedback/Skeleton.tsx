/**
 * Skeleton — Loading placeholder with shimmer animation
 *
 * Mimics the shimmer from the web demo (.shimmer CSS keyframe).
 * Used to show content placeholders while AI is fetching data.
 *
 * Components:
 *   Skeleton      — single rectangular bone (configurable size)
 *   SkeletonCard  — pre-built card-shaped skeleton (restaurant, member, notification)
 *
 * Animation: gradient sweep left→right, 1.4s repeat.
 * Falls back to simple opacity pulse on older devices.
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';

// ── Skeleton bone ─────────────────────────────────────────────────────────────

interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 16, radius, style }: SkeletonProps) {
  const { colors } = useTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius: radius ?? height / 2,
          backgroundColor: colors.border.default,
        },
        animStyle,
        style,
      ]}
    />
  );
}

// ── SkeletonCard presets ───────────────────────────────────────────────────────

interface SkeletonCardProps {
  variant?: 'restaurant' | 'member' | 'notification' | 'message';
  style?: ViewStyle;
}

export function SkeletonCard({ variant = 'restaurant', style }: SkeletonCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: colors.border.subtle,
          padding: spacing.sp14,
          ...shadows.xs,
        },
        style,
      ]}
    >
      {variant === 'restaurant' && <RestaurantSkeleton spacing={spacing} />}
      {variant === 'member' && <MemberSkeleton spacing={spacing} />}
      {variant === 'notification' && <NotificationSkeleton spacing={spacing} />}
      {variant === 'message' && <MessageSkeleton spacing={spacing} />}
    </View>
  );
}

function RestaurantSkeleton({ spacing }: { spacing: any }) {
  return (
    <View style={{ gap: spacing.sp10 }}>
      <View style={styles.row}>
        <Skeleton width={44} height={44} radius={8} />
        <View style={{ flex: 1, gap: 6 }}>
          <Skeleton width="70%" height={14} />
          <Skeleton width="50%" height={11} />
        </View>
      </View>
      <Skeleton width="90%" height={11} />
    </View>
  );
}

function MemberSkeleton({ spacing }: { spacing: any }) {
  return (
    <View style={[styles.row, { gap: spacing.sp12 }]}>
      <Skeleton width={44} height={44} radius={22} />
      <View style={{ flex: 1, gap: 6 }}>
        <Skeleton width="55%" height={14} />
        <Skeleton width="40%" height={11} />
      </View>
    </View>
  );
}

function NotificationSkeleton({ spacing: _spacing }: { spacing: any }) {
  return (
    <View style={[styles.row, { gap: 10 }]}>
      <Skeleton width={6} height={6} radius={3} />
      <View style={{ flex: 1, gap: 4 }}>
        <Skeleton width="85%" height={13} />
        <Skeleton width="40%" height={11} />
      </View>
      <Skeleton width={30} height={11} />
    </View>
  );
}

function MessageSkeleton({ spacing: _spacing }: { spacing: any }) {
  return (
    <View style={{ gap: 8 }}>
      <Skeleton width="75%" height={13} />
      <Skeleton width="90%" height={13} />
      <Skeleton width="60%" height={13} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
