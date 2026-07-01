import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  style?: ViewStyle;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 12,
  showValue = true,
  style,
}: RatingStarsProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {showValue && (
        <Text variant="monoSmall" color={colors.success.default}>
          {rating.toFixed(1)}
        </Text>
      )}
      <Feather name="star" size={size} color={colors.success.default} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});
