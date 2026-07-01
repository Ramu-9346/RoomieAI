import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface RecommendationCardProps {
  title: string;
  reason: string;
  emoji?: string;
  confidence?: 'high' | 'medium' | 'low';
  onPress?: () => void;
  onDismiss?: () => void;
  style?: ViewStyle;
}

export function RecommendationCard({
  title,
  reason,
  emoji = '✨',
  confidence = 'high',
  onPress,
  onDismiss,
  style,
}: RecommendationCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  const borderColor =
    confidence === 'high'   ? colors.primary.default
    : confidence === 'medium' ? colors.warning.default
    : colors.border.default;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xl,
          padding: spacing.cardPaddingMd,
          borderWidth: 1.5,
          borderColor,
          ...shadows.card,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Recommendation: ${title}`}
    >
      <View style={styles.row}>
        <Text variant="title" style={styles.emoji}>{emoji}</Text>
        <View style={styles.content}>
          <Text variant="bodyMedium" color={colors.text.primary} numberOfLines={2}>
            {title}
          </Text>
          <Text variant="captionItalic" color={colors.success.text} numberOfLines={2}>
            {reason}
          </Text>
        </View>
        {onDismiss && (
          <Pressable onPress={onDismiss} hitSlop={8} accessibilityLabel="Dismiss">
            <Feather name="x" size={16} color={colors.text.muted} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  emoji: { fontSize: 24, flexShrink: 0 },
  content: { flex: 1, gap: 2 },
});
