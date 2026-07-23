import { Feather } from '@expo/vector-icons';
import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: ReactNode;
  style?: ViewStyle;
}

export function PageHeader({ title, subtitle, onBack, rightElement, style }: PageHeaderProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: spacing.pageHorizontal,
          paddingVertical: spacing.sp12,
          gap: spacing.sp8,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border.subtle,
          backgroundColor: colors.background.primary,
        },
        style,
      ]}
    >
      {onBack && (
        <Pressable
          onPress={onBack}
          style={styles.back}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Feather name="arrow-left" size={20} color={colors.text.secondary} />
        </Pressable>
      )}
      <View style={styles.titleRow}>
        <View style={styles.flex}>
          <Text variant="heading" color={colors.text.primary} numberOfLines={2}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" color={colors.text.muted} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightElement && <View>{rightElement}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  back: { alignSelf: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  flex: { flex: 1, gap: 2 },
});
