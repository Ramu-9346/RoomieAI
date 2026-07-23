/**
 * TopAppBar — Screen-level header
 *
 * Variants:
 *   default — title + optional left/right actions
 *   chat    — AI status indicator (●) + flat name + member avatars on right
 *   orders  — title + live order count badge
 *
 * Left slot: back arrow (when canGoBack) or custom left element
 * Right slot: icon buttons or AvatarGroup
 *
 * Always renders with safe area top padding.
 * Uses zIndex.header (50) to sit above content, below modals/toasts.
 */

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle, type ReactNode } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme';
import { AvatarGroup } from '../primitives/Avatar';
import { Text } from '../primitives/Text';

type TopAppBarVariant = 'default' | 'chat' | 'orders';

interface TopAppBarProps {
  variant?: TopAppBarVariant;
  title: string;
  subtitle?: string;
  canGoBack?: boolean;
  onBack?: () => void;
  rightElement?: ReactNode;
  liveCount?: number; // orders variant — shows badge
  memberAvatars?: { name: string; memberIndex: number }[]; // chat variant
  aiStatus?: 'idle' | 'thinking' | 'active';
  style?: ViewStyle;
}

export function TopAppBar({
  variant = 'default',
  title,
  subtitle,
  canGoBack = false,
  onBack,
  rightElement,
  liveCount,
  memberAvatars,
  aiStatus = 'idle',
  style,
}: TopAppBarProps) {
  const { colors, spacing, radius, zIndex } = useTheme();
  const insets = useSafeAreaInsets();

  const statusColor = {
    idle: colors.text.muted,
    thinking: '#F59E0B', // amber pulse when AI is thinking
    active: colors.success.default,
  }[aiStatus];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.primary,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border.default,
          paddingTop: insets.top + spacing.sp8,
          paddingBottom: spacing.sp10,
          paddingHorizontal: spacing.sp16,
          zIndex: zIndex.header,
        },
        style,
      ]}
    >
      {/* Left: back button or spacer */}
      <View style={styles.leftSlot}>
        {canGoBack && (
          <Pressable
            onPress={onBack}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.iconBtn}
          >
            <Feather name="arrow-left" size={20} color={colors.text.primary} />
          </Pressable>
        )}
      </View>

      {/* Centre: title block */}
      <View style={styles.centre}>
        {variant === 'chat' && (
          <View style={styles.aiStatusRow}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          </View>
        )}

        <Text variant="bodyMedium" color={colors.text.primary} align="center" numberOfLines={1}>
          {title}
        </Text>

        {subtitle && (
          <Text variant="monoSmall" color={colors.text.muted} align="center" numberOfLines={1}>
            {subtitle}
          </Text>
        )}

        {variant === 'orders' && liveCount !== undefined && liveCount > 0 && (
          <View
            style={[
              styles.liveChip,
              {
                backgroundColor: colors.success.surface,
                borderRadius: radius.xs,
              },
            ]}
          >
            <Text variant="monoSmall" color={colors.success.text}>
              {liveCount} live
            </Text>
          </View>
        )}
      </View>

      {/* Right: avatar group or custom element */}
      <View style={styles.rightSlot}>
        {variant === 'chat' && memberAvatars && memberAvatars.length > 0 ? (
          <AvatarGroup members={memberAvatars} size="sm" />
        ) : (
          (rightElement ?? null)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSlot: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centre: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  rightSlot: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconBtn: {
    padding: 4,
  },
  aiStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 2,
  },
  liveChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'center',
    marginTop: 2,
  },
});
