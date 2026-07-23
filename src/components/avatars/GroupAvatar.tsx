import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface GroupAvatarProps {
  emoji?: string;
  name: string;
  memberCount: number;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function GroupAvatar({
  emoji = '🏠',
  name: _name,
  memberCount: _memberCount,
  size = 'md',
  style,
}: GroupAvatarProps) {
  const { colors, radius } = useTheme();

  const containerSize = size === 'sm' ? 36 : size === 'lg' ? 56 : 44;
  const fontSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  return (
    <View style={[{ alignItems: 'center', gap: 4 }, style]}>
      <View
        style={[
          styles.avatar,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: radius.lg,
            backgroundColor: colors.primary.surface,
          },
        ]}
      >
        <Text variant="title" style={{ fontSize }}>
          {emoji}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
