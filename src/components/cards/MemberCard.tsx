/**
 * MemberCard — Flat Member Profile Card
 *
 * Used in:
 *   - Flat tab → Members list
 *   - Member detail screen
 *   - Invite flow (showing who's already in the flat)
 *
 * Variants:
 *   - list     — compact row for member list (avatar + name + diet badge)
 *   - detail   — full card with preferences summary
 *   - invite   — pending invite state with "Waiting..." indicator
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { Avatar } from '../primitives/Avatar';
import { Chip } from '../primitives/Chip';

export type DietaryType = 'veg' | 'non-veg' | 'eggetarian' | 'jain' | 'vegan';

export interface MemberData {
  name: string;
  memberIndex: number;
  dietaryType: DietaryType;
  allergens?: string[];
  isOnline?: boolean;
  isAdmin?: boolean;
  joinedAt?: string;
}

type MemberCardVariant = 'list' | 'detail' | 'invite';

interface MemberCardProps {
  member: MemberData | { name: string; memberIndex: number; pending: true };
  variant?: MemberCardVariant;
  onPress?: () => void;
  onRemove?: () => void;
  style?: ViewStyle;
}

const DIETARY_LABELS: Record<DietaryType, string> = {
  'veg':       'Vegetarian',
  'non-veg':   'Non-Veg',
  'eggetarian': 'Eggetarian',
  'jain':      'Jain',
  'vegan':     'Vegan',
};

const DIETARY_COLORS: Record<DietaryType, 'success' | 'error' | 'warning' | 'default'> = {
  'veg':       'success',
  'non-veg':   'error',
  'eggetarian': 'warning',
  'jain':      'default',
  'vegan':     'success',
};

export function MemberCard({
  member,
  variant = 'list',
  onPress,
  onRemove,
  style,
}: MemberCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  const isPending = 'pending' in member && member.pending;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius:    radius.lg,
          borderWidth:     1,
          borderColor:     pressed ? colors.border.strong : colors.border.default,
          padding:         spacing.sp14,
          ...shadows.xs,
        },
        style,
      ]}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={`Member: ${member.name}`}
    >
      <View style={styles.row}>
        <Avatar
          name={member.name}
          memberIndex={member.memberIndex}
          size="lg"
          showOnlineStatus={!isPending && (member as MemberData).isOnline}
        />

        <View style={styles.content}>
          <View style={styles.nameRow}>
            <Text variant="bodyMedium" color={colors.text.primary}>
              {member.name}
            </Text>
            {!isPending && (member as MemberData).isAdmin && (
              <Text variant="monoSmall" color={colors.text.muted}>
                {' · Admin'}
              </Text>
            )}
          </View>

          {isPending ? (
            <Text variant="caption" color={colors.text.muted}>
              Invite pending...
            </Text>
          ) : (
            <Text
              variant="caption"
              color={colors.text.muted}
            >
              {DIETARY_LABELS[(member as MemberData).dietaryType]}
              {(member as MemberData).allergens?.length
                ? ` · ${(member as MemberData).allergens!.join(', ')} free`
                : ''}
            </Text>
          )}
        </View>

        <View style={styles.right}>
          {!isPending && onPress && (
            <Feather name="chevron-right" size={16} color={colors.text.muted} />
          )}
          {isPending && (
            <Text variant="monoSmall" color={colors.text.muted}>
              Pending
            </Text>
          )}
          {onRemove && (
            <Pressable
              onPress={onRemove}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityLabel={`Remove ${member.name}`}
              accessibilityRole="button"
            >
              <Feather name="x" size={16} color={colors.text.muted} />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           12,
  },
  content: {
    flex: 1,
    gap:  3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  right: {
    flexShrink: 0,
    gap:        8,
    alignItems: 'flex-end',
  },
});
