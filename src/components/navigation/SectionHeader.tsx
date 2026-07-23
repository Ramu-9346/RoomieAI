import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onPress: () => void };
  icon?: string;
  style?: ViewStyle;
}

export function SectionHeader({ title, subtitle, action, icon, style }: SectionHeaderProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: spacing.pageHorizontal, marginBottom: spacing.sp12 },
        style,
      ]}
    >
      <View style={styles.left}>
        {icon && <Feather name={icon as any} size={16} color={colors.primary.default} />}
        <View style={styles.titleGroup}>
          <Text variant="eyebrow" color={colors.primary.text}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" color={colors.text.muted}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {action && (
        <Pressable
          onPress={action.onPress}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <Text variant="caption" color={colors.primary.default}>
            {action.label}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  titleGroup: { gap: 1 },
});
