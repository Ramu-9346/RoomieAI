import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export type ActionType = 'order' | 'poll' | 'grocery' | 'dineout' | 'payment' | 'custom';

interface ActionSuggestionCardProps {
  title: string;
  description: string;
  type?: ActionType;
  onPress: () => void;
  onDismiss?: () => void;
  style?: ViewStyle;
}

const ACTION_ICON: Record<ActionType, React.ComponentProps<typeof Feather>['name']> = {
  order: 'shopping-bag',
  poll: 'bar-chart-2',
  grocery: 'shopping-cart',
  dineout: 'star',
  payment: 'credit-card',
  custom: 'zap',
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ActionSuggestionCard({
  title,
  description,
  type = 'custom',
  onPress,
  onDismiss,
  style,
}: ActionSuggestionCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 22, stiffness: 350 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 22, stiffness: 350 });
      }}
      style={[
        {
          backgroundColor: colors.primary.surface,
          borderRadius: radius.xl,
          padding: spacing.sp14,
          borderWidth: 1.5,
          borderColor: colors.primary.default,
          ...shadows.card,
        },
        animStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Suggested action: ${title}`}
    >
      <View style={styles.row}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: radius.md,
            backgroundColor: colors.primary.default,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name={ACTION_ICON[type]} size={18} color={colors.text.inverse} />
        </View>

        <View style={styles.content}>
          <Text variant="bodyMedium" color={colors.primary.text} numberOfLines={1}>
            {title}
          </Text>
          <Text variant="caption" color={colors.text.secondary} numberOfLines={2}>
            {description}
          </Text>
        </View>

        <View style={styles.actions}>
          {onDismiss && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                onDismiss();
              }}
              hitSlop={8}
              accessibilityLabel="Dismiss suggestion"
            >
              <Feather name="x" size={16} color={colors.text.muted} />
            </Pressable>
          )}
          <Feather name="chevron-right" size={18} color={colors.primary.default} />
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  content: { flex: 1, gap: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
