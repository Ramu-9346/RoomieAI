import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  headerRight?: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  spacing?: 'compact' | 'normal' | 'loose';
}

export function Section({
  title,
  subtitle,
  children,
  headerRight,
  style,
  contentStyle,
  spacing: spacingVariant = 'normal',
}: SectionProps) {
  const { colors, spacing } = useTheme();

  const gap =
    spacingVariant === 'compact' ? spacing.sp12
    : spacingVariant === 'loose'  ? spacing.sp24
    : spacing.sp16;

  return (
    <View style={[{ gap }, style]}>
      {(title || headerRight) && (
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            {title && (
              <Text variant="eyebrow" color={colors.primary.text}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text variant="caption" color={colors.text.muted}>
                {subtitle}
              </Text>
            )}
          </View>
          {headerRight && <View>{headerRight}</View>}
        </View>
      )}
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
});
