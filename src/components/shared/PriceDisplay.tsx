import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface PriceDisplayProps {
  amount: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  emphasis?: boolean;
  style?: ViewStyle;
}

export function PriceDisplay({
  amount,
  label,
  size = 'md',
  emphasis = false,
  style,
}: PriceDisplayProps) {
  const { colors } = useTheme();

  const formatted = `₹${new Intl.NumberFormat('en-IN').format(Math.round(amount))}`;
  const priceVariant =
    size === 'sm' ? 'monoSmall' : emphasis || size === 'lg' ? 'monoMedium' : 'mono';

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text variant="caption" color={colors.text.muted}>
          {label}
        </Text>
      )}
      <Text variant={priceVariant} color={emphasis ? colors.primary.default : colors.text.primary}>
        {formatted}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
});
