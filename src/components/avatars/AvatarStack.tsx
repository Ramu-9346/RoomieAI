import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Avatar } from '../primitives/Avatar';
import { Text } from '../primitives/Text';

interface AvatarStackMember {
  name: string;
  memberIndex: number;
  avatarUrl?: string;
}

interface AvatarStackProps {
  members: AvatarStackMember[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function AvatarStack({
  members,
  maxVisible = 4,
  size = 'sm',
  style,
}: AvatarStackProps) {
  const { colors, radius } = useTheme();

  const visible = members.slice(0, maxVisible);
  const overflow = members.length - maxVisible;

  const avatarSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 30;
  const overlap = avatarSize * 0.35;

  return (
    <View style={[styles.container, style]}>
      {visible.map((member, index) => (
        <View
          key={member.memberIndex}
          style={[
            {
              marginLeft: index === 0 ? 0 : -overlap,
              zIndex: visible.length - index,
            },
          ]}
        >
          <Avatar
            name={member.name}
            memberIndex={member.memberIndex}
            avatarUrl={member.avatarUrl}
            size={size}
            bordered
          />
        </View>
      ))}
      {overflow > 0 && (
        <View
          style={[
            styles.overflow,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              backgroundColor: colors.background.secondary,
              borderWidth: 2,
              borderColor: colors.background.elevated,
              marginLeft: -overlap,
              zIndex: 0,
            },
          ]}
        >
          <Text variant="monoSmall" color={colors.text.muted}>
            +{overflow}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overflow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
