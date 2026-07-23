import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Skeleton } from '../feedback/Skeleton';

// ─── CardSkeleton ──────────────────────────────────────────────────────────────

interface SkeletonProps {
  style?: ViewStyle;
}

export function CardSkeleton({ style }: SkeletonProps) {
  const { colors, radius, spacing } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xxl,
          padding: spacing.cardPaddingMd,
          gap: spacing.sp12,
          borderWidth: 1,
          borderColor: colors.border.subtle,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        <Skeleton width={44} height={44} borderRadius={radius.md} />
        <View style={[styles.col, { gap: 8 }]}>
          <Skeleton width={140} height={16} />
          <Skeleton width={100} height={12} />
        </View>
      </View>
      <Skeleton width="100%" height={12} />
      <Skeleton width="70%" height={12} />
    </View>
  );
}

// ─── RestaurantSkeleton ───────────────────────────────────────────────────────

export function RestaurantSkeleton({ style }: SkeletonProps) {
  const { colors, radius, spacing } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xl,
          padding: spacing.sp12,
          gap: 10,
          borderWidth: 1,
          borderColor: colors.border.subtle,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        <Skeleton width={40} height={40} borderRadius={radius.md} />
        <View style={[styles.col, { gap: 6, flex: 1 }]}>
          <Skeleton width="80%" height={16} />
          <Skeleton width="60%" height={12} />
          <Skeleton width="90%" height={12} />
        </View>
        <Skeleton width={32} height={22} borderRadius={radius.sm} />
      </View>
    </View>
  );
}

// ─── OrderSkeleton ────────────────────────────────────────────────────────────

export function OrderSkeleton({ style }: SkeletonProps) {
  const { colors, radius, spacing } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xxl,
          padding: spacing.cardPaddingLg,
          gap: spacing.sp16,
          borderWidth: 1,
          borderColor: colors.border.subtle,
        },
        style,
      ]}
    >
      <View style={styles.spaceBetween}>
        <Skeleton width={120} height={18} />
        <Skeleton width={70} height={22} borderRadius={radius.pill} />
      </View>
      <Skeleton width="100%" height={1} />
      {[0, 1, 2].map((i) => (
        <View key={i} style={styles.spaceBetween}>
          <Skeleton width={`${50 + i * 10}%` as any} height={14} />
          <Skeleton width={60} height={14} />
        </View>
      ))}
      <Skeleton width="100%" height={48} borderRadius={8} />
    </View>
  );
}

// ─── ChatSkeleton ─────────────────────────────────────────────────────────────

export function ChatSkeleton({ style }: SkeletonProps) {
  const { spacing } = useTheme();
  return (
    <View style={[{ gap: spacing.messageGap, paddingHorizontal: spacing.pageHorizontal }, style]}>
      {/* AI message */}
      <View style={[styles.row, { gap: 8 }]}>
        <Skeleton width={30} height={30} borderRadius={15} />
        <View style={[styles.col, { gap: 6, flex: 1 }]}>
          <Skeleton width="90%" height={14} />
          <Skeleton width="75%" height={14} />
        </View>
      </View>
      {/* User message */}
      <View style={[styles.row, { gap: 8, justifyContent: 'flex-end' }]}>
        <View style={[styles.col, { gap: 6, alignItems: 'flex-end' }]}>
          <Skeleton width={180} height={40} borderRadius={18} />
        </View>
      </View>
      {/* AI message */}
      <View style={[styles.row, { gap: 8 }]}>
        <Skeleton width={30} height={30} borderRadius={15} />
        <View style={[styles.col, { gap: 6, flex: 1 }]}>
          <Skeleton width="95%" height={14} />
          <Skeleton width="60%" height={14} />
          <Skeleton width="80%" height={14} />
        </View>
      </View>
    </View>
  );
}

// ─── ProfileSkeleton ──────────────────────────────────────────────────────────

export function ProfileSkeleton({ style }: SkeletonProps) {
  const { colors, radius, spacing } = useTheme();
  return (
    <View style={[{ gap: spacing.sp20 }, style]}>
      <View style={styles.center}>
        <Skeleton width={80} height={80} borderRadius={40} />
        <Skeleton width={120} height={20} />
        <Skeleton width={80} height={14} />
      </View>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[
            styles.spaceBetween,
            {
              backgroundColor: colors.background.elevated,
              borderRadius: radius.xl,
              padding: spacing.sp16,
            },
          ]}
        >
          <Skeleton width={24} height={24} borderRadius={12} />
          <Skeleton width="60%" height={16} />
          <Skeleton width={60} height={14} borderRadius={radius.pill} />
        </View>
      ))}
    </View>
  );
}

// ─── ListSkeleton ─────────────────────────────────────────────────────────────

interface ListSkeletonProps extends SkeletonProps {
  rows?: number;
}

export function ListSkeleton({ rows = 4, style }: ListSkeletonProps) {
  const { spacing } = useTheme();
  return (
    <View style={[{ gap: spacing.sp12 }, style]}>
      {Array.from({ length: rows }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </View>
  );
}

// ─── PageSkeleton ─────────────────────────────────────────────────────────────

export function PageSkeleton({ style }: SkeletonProps) {
  const { spacing } = useTheme();
  return (
    <View
      style={[
        { gap: spacing.sp24, padding: spacing.pageHorizontal, paddingTop: spacing.sp24 },
        style,
      ]}
    >
      <Skeleton width={200} height={28} />
      <Skeleton width={280} height={16} />
      <ListSkeleton rows={3} />
    </View>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  col: { flexDirection: 'column' },
  spaceBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  center: { alignItems: 'center', gap: 8 },
});
