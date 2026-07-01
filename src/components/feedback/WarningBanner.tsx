import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface WarningBannerProps {
  message: string;
  action?: { label: string; onPress: () => void };
  onDismiss?: () => void;
  style?: ViewStyle;
}

export function WarningBanner({ message, action, onDismiss, style }: WarningBannerProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.warning.surface,
          borderRadius: radius.md,
          borderLeftWidth: 3,
          borderLeftColor: colors.warning.default,
          paddingHorizontal: spacing.sp14,
          paddingVertical: spacing.sp10,
          gap: spacing.sp8,
        },
        style,
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.row}>
        <Feather name="alert-triangle" size={16} color={colors.warning.default} />
        <Text variant="bodyMedium" color={colors.warning.text} style={styles.flex} numberOfLines={3}>
          {message}
        </Text>
        {onDismiss && (
          <Pressable onPress={onDismiss} hitSlop={8}>
            <Feather name="x" size={16} color={colors.warning.text} />
          </Pressable>
        )}
      </View>
      {action && (
        <Pressable onPress={action.onPress}>
          <Text variant="bodyMedium" color={colors.warning.default}>{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  flex: { flex: 1 },
});
