import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

type CardSize = 'sm' | 'md' | 'lg';
type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';

interface CardContainerProps {
  children: ReactNode;
  size?: CardSize;
  variant?: CardVariant;
  style?: ViewStyle;
}

export function CardContainer({
  children,
  size = 'md',
  variant = 'elevated',
  style,
}: CardContainerProps) {
  const { colors, radius, shadows, spacing } = useTheme();

  const padding =
    size === 'sm' ? spacing.cardPaddingSm
    : size === 'lg' ? spacing.cardPaddingLg
    : spacing.cardPaddingMd;

  const variantStyle: ViewStyle =
    variant === 'elevated'
      ? { backgroundColor: colors.background.elevated, ...shadows.card }
      : variant === 'outlined'
      ? { backgroundColor: colors.background.elevated, borderWidth: 1, borderColor: colors.border.default }
      : variant === 'filled'
      ? { backgroundColor: colors.background.secondary }
      : { backgroundColor: colors.transparent };

  return (
    <View
      style={[
        styles.base,
        { borderRadius: radius.xxl, padding },
        variantStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    overflow: 'hidden',
  },
});
