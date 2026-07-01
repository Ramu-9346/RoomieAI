import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface AnalyticsCardProps {
  title: string;
  value: string;
  subvalue?: string;
  trend?: number;
  icon?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
  style?: ViewStyle;
}

export function AnalyticsCard({
  title,
  value,
  subvalue,
  trend,
  icon = 'trending-up',
  color = 'primary',
  style,
}: AnalyticsCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  const themeColor = colors[color];
  const trendPositive = (trend ?? 0) >= 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xxl,
          padding: spacing.cardPaddingMd,
          ...shadows.card,
          borderWidth: 1,
          borderColor: colors.border.subtle,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: themeColor.surface, borderRadius: radius.md }]}>
          <Feather name={icon as any} size={18} color={themeColor.default} />
        </View>
        {trend !== undefined && (
          <View style={styles.trend}>
            <Feather
              name={trendPositive ? 'trending-up' : 'trending-down'}
              size={14}
              color={trendPositive ? colors.success.default : colors.error.default}
            />
            <Text
              variant="monoSmall"
              color={trendPositive ? colors.success.default : colors.error.default}
            >
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>

      <Text variant="monoMedium" color={themeColor.default} style={styles.value}>
        {value}
      </Text>
      {subvalue && (
        <Text variant="monoSmall" color={colors.text.muted}>
          {subvalue}
        </Text>
      )}
      <Text variant="caption" color={colors.text.muted} style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  iconBox: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  trend: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  value: { fontSize: 22 },
  title: { marginTop: 4 },
});
