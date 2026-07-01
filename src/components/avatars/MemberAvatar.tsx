import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Avatar } from '../primitives/Avatar';
import { Text } from '../primitives/Text';

interface MemberAvatarProps {
  name: string;
  memberIndex: number;
  avatarUrl?: string;
  role?: 'admin' | 'member';
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  style?: ViewStyle;
}

export function MemberAvatar({
  name,
  memberIndex,
  avatarUrl,
  role,
  isOnline = false,
  size = 'md',
  showLabel = false,
  style,
}: MemberAvatarProps) {
  const { colors } = useTheme();

  const dotSize = 10;

  return (
    <View style={[{ alignItems: 'center', gap: 4 }, style]}>
      <View style={{ position: 'relative', alignSelf: 'flex-start' }}>
        <Avatar name={name} memberIndex={memberIndex} avatarUrl={avatarUrl} size={size} />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: isOnline ? colors.success.default : colors.border.default,
            borderWidth: 1.5,
            borderColor: colors.background.elevated,
          }}
        />
      </View>
      {showLabel && (
        <Text variant="monoSmall" color={colors.text.muted} numberOfLines={1}>
          {name.split(' ')[0]}
        </Text>
      )}
    </View>
  );
}
