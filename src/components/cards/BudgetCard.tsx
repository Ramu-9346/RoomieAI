import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface BudgetCardProps {
  budgetPerMember: number;
  spentPerMember: number;
  memberCount: number;
  style?: ViewStyle;
}

export function BudgetCard({
  budgetPerMember,
  spentPerMember,
  memberCount,
  style,
}: BudgetCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  const progress = Math.min(spentPerMember / budgetPerMember, 1);
  const fillWidth = useSharedValue(0);

  useEffect(() => {
    fillWidth.value = withTiming(progress, { duration: 600 });
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${fillWidth.value * 100}%` as unknown as number,
  }));

  const progressColor =
    progress >= 1
      ? colors.error.default
      : progress >= 0.8
        ? colors.warning.default
        : colors.success.default;

  const remaining = budgetPerMember - spentPerMember;
  const fmt = (n: number) =>
    `₹${new Intl.NumberFormat('en-IN').format(Math.max(0, Math.round(n)))}`;

  return (
    <View
      style={[
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xxl,
          padding: spacing.cardPaddingMd,
          ...shadows.card,
          gap: spacing.sp12,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <Text variant="eyebrow" color={colors.primary.text}>
          Per-Member Budget
        </Text>
        <Text variant="monoSmall" color={colors.text.muted}>
          {memberCount} members
        </Text>
      </View>

      <View style={styles.amounts}>
        <View>
          <Text variant="caption" color={colors.text.muted}>
            Spent
          </Text>
          <Text variant="monoMedium" color={progressColor}>
            {fmt(spentPerMember)}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.right}>
          <Text variant="caption" color={colors.text.muted}>
            Remaining
          </Text>
          <Text
            variant="monoMedium"
            color={remaining > 0 ? colors.success.default : colors.error.default}
          >
            {fmt(remaining)}
          </Text>
        </View>
        <View style={styles.right}>
          <Text variant="caption" color={colors.text.muted}>
            Budget
          </Text>
          <Text variant="mono" color={colors.text.secondary}>
            {fmt(budgetPerMember)}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View
        style={[
          styles.track,
          { backgroundColor: colors.border.default, borderRadius: radius.pill },
        ]}
      >
        <Animated.View
          style={[
            { height: 6, backgroundColor: progressColor, borderRadius: radius.pill },
            fillStyle,
          ]}
        />
      </View>

      {progress >= 0.8 && (
        <Text variant="captionItalic" color={progressColor}>
          {progress >= 1
            ? `Cart exceeds ₹${budgetPerMember} per-member limit`
            : `Approaching ₹${budgetPerMember} per-member limit`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amounts: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  right: { alignItems: 'flex-end' },
  separator: { flex: 1 },
  track: { height: 6, width: '100%', overflow: 'hidden' },
});
