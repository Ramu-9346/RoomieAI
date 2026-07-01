import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  useEffect,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';

interface EmptyStateProps {
  emoji: string;
  title: string;
  description?: string;
  primaryAction?: { label: string; onPress: () => void };
  secondaryAction?: { label: string; onPress: () => void };
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  children?: ReactNode;
}

export function EmptyState({
  emoji,
  title,
  description,
  primaryAction,
  secondaryAction,
  size = 'md',
  style,
  children,
}: EmptyStateProps) {
  const { colors, spacing } = useTheme();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value    = withDelay(100, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(100, withTiming(0, { duration: 400 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const emojiSize  = size === 'sm' ? 40  : size === 'lg' ? 72  : 56;
  const titleSize  = size === 'sm' ? 'title' : 'heading';
  const padding    = size === 'sm' ? spacing.sp24 : spacing.sp40;

  return (
    <Animated.View style={[styles.container, { padding }, animStyle, style]}>
      <Text variant="displayXL" style={[styles.emoji, { fontSize: emojiSize }]}>
        {emoji}
      </Text>
      <Text variant={titleSize} color={colors.text.primary} style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="body" color={colors.text.muted} style={styles.description}>
          {description}
        </Text>
      )}
      {children}
      {(primaryAction || secondaryAction) && (
        <View style={styles.actions}>
          {primaryAction && (
            <Button
              label={primaryAction.label}
              onPress={primaryAction.onPress}
              variant="primary"
              size="md"
            />
          )}
          {secondaryAction && (
            <Button
              label={secondaryAction.label}
              onPress={secondaryAction.onPress}
              variant="ghost"
              size="md"
            />
          )}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emoji: {
    includeFontPadding: false,
    marginBottom: 4,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 280,
  },
  actions: {
    marginTop: 8,
    gap: 8,
    alignItems: 'center',
  },
});
