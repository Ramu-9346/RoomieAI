import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { RatingBadge } from '../primitives/Badge';
import { VegIndicator } from '../shared/VegIndicator';

interface RestaurantCompactCardProps {
  name: string;
  cuisine: string;
  rating?: number;
  deliveryTime?: string;
  isVegOnly?: boolean;
  emoji?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export function RestaurantCompactCard({
  name,
  cuisine,
  rating,
  deliveryTime,
  isVegOnly = false,
  emoji = '🍽',
  onPress,
  style,
}: RestaurantCompactCardProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          width: 140,
          borderRadius: radius.xl,
          backgroundColor: colors.background.elevated,
          borderWidth: 1,
          borderColor: colors.border.subtle,
          padding: spacing.sp12,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${cuisine}`}
    >
      <View style={[styles.icon, { backgroundColor: colors.accent.surface, borderRadius: radius.md }]}>
        <Text variant="title" style={styles.emoji}>{emoji}</Text>
      </View>
      <Text variant="bodyMedium" color={colors.text.primary} numberOfLines={1} style={{ marginTop: 8 }}>
        {name}
      </Text>
      <Text variant="caption" color={colors.text.muted} numberOfLines={1}>
        {cuisine}
      </Text>
      <View style={styles.footer}>
        {rating !== undefined && <RatingBadge rating={rating} />}
        {deliveryTime && (
          <Text variant="monoSmall" color={colors.text.muted}>{deliveryTime}</Text>
        )}
        {isVegOnly && <VegIndicator type="veg" size="sm" />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  icon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 22 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
});
