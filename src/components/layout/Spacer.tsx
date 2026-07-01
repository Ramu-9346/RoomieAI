import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import type { SpacingKey } from '../../theme';

interface SpacerProps {
  size?: SpacingKey | number;
  axis?: 'vertical' | 'horizontal';
  flex?: boolean;
}

export function Spacer({ size = 'sp16', axis = 'vertical', flex = false }: SpacerProps) {
  const { spacing } = useTheme();

  if (flex) {
    return <View style={{ flex: 1 }} />;
  }

  const px = typeof size === 'number' ? size : spacing[size] ?? 16;

  return (
    <View
      style={
        axis === 'vertical'
          ? { height: px, width: '100%' }
          : { width: px, height: 1 }
      }
    />
  );
}
