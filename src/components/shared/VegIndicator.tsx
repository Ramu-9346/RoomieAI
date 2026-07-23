import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

type DietaryType = 'veg' | 'non-veg' | 'eggetarian' | 'jain' | 'vegan';

interface VegIndicatorProps {
  type: DietaryType;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

// Indian food standard: square box with colored inner circle
export function VegIndicator({ type, size = 'md', style }: VegIndicatorProps) {
  const { colors, radius } = useTheme();

  const boxSize = size === 'sm' ? 12 : 16;
  const dotSize = size === 'sm' ? 6 : 8;

  const color =
    type === 'veg' || type === 'jain' || type === 'vegan'
      ? colors.veg
      : type === 'eggetarian'
        ? colors.warning.default
        : colors.nonVeg;

  return (
    <View
      style={[
        {
          width: boxSize,
          height: boxSize,
          borderRadius: radius.xs,
          borderWidth: 1.5,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
