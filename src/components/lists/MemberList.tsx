import React from 'react';
import { FlatList, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { MemberCard } from '../cards/MemberCard';

interface Member {
  userId: string;
  name: string;
  memberIndex: number;
  avatarUrl?: string;
  isAdmin?: boolean;
  isOnline?: boolean;
  dietaryType?: string;
  allergens?: string[];
}

interface MemberListProps {
  members: Member[];
  onMemberPress?: (userId: string) => void;
  style?: ViewStyle;
}

export function MemberList({ members, onMemberPress, style }: MemberListProps) {
  const { spacing } = useTheme();

  return (
    <FlatList
      data={members}
      keyExtractor={(m) => m.userId}
      scrollEnabled={false}
      contentContainerStyle={{ gap: spacing.sp8 }}
      renderItem={({ item }) => (
        <MemberCard
          name={item.name}
          memberIndex={item.memberIndex}
          avatarUrl={item.avatarUrl}
          isAdmin={item.isAdmin}
          isOnline={item.isOnline}
          dietaryType={item.dietaryType as any}
          allergens={item.allergens}
          onPress={onMemberPress ? () => onMemberPress(item.userId) : undefined}
        />
      )}
      style={style}
    />
  );
}
