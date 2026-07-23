import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Avatar } from '../primitives/Avatar';

type OnlineStatus = 'online' | 'away' | 'offline';

interface StatusAvatarProps {
  name: string;
  memberIndex: number;
  avatarUrl?: string;
  status?: OnlineStatus;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function StatusAvatar({
  name,
  memberIndex,
  avatarUrl,
  status = 'offline',
  size = 'md',
  style,
}: StatusAvatarProps) {
  const { colors } = useTheme();

  const dotSize = size === 'sm' ? 8 : 10;
  const dotOffset = size === 'sm' ? -1 : 0;

  const dotColor =
    status === 'online'
      ? colors.success.default
      : status === 'away'
        ? colors.warning.default
        : colors.text.muted;

  return (
    <View style={[{ position: 'relative', alignSelf: 'flex-start' }, style]}>
      <Avatar name={name} memberIndex={memberIndex} avatarUrl={avatarUrl} size={size} />
      <View
        style={{
          position: 'absolute',
          bottom: dotOffset,
          right: dotOffset,
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: dotColor,
          borderWidth: 1.5,
          borderColor: colors.background.elevated,
        }}
      />
    </View>
  );
}
