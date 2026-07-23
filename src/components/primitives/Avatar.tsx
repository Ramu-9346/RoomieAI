/**
 * Avatar — Member Identity Primitive
 *
 * Renders a circular avatar with a member's initial and their assigned
 * identity colour from the member colour scale.
 *
 * Colour assignment is deterministic — member index 0 always gets memberA,
 * index 1 gets memberB, etc. This ensures consistency across every card,
 * poll, split, and audit log entry.
 *
 * Variants:
 *   - Standard circular avatar with initial
 *   - With border (used in member row overlaps — members-row from web demo)
 *   - With "online" status dot
 *   - AI Agent avatar (uses ink bg, Fraunces "R" italic)
 *
 * Sizes match the web demo:
 *   - sm: 24px (poll rows, split rows)
 *   - md: 30px (chat bubble avatars)
 *   - lg: 44px (flat card member row)
 *   - xl: 56px (profile header)
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

import { Text } from './Text';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  /** Display name — first character used as initial */
  name: string;
  /**
   * Member slot index (0–7).
   * Determines colour from theme.colors.member array.
   * Use -1 for the AI agent avatar (renders with ink background).
   */
  memberIndex: number;
  size?: AvatarSize;
  /** Adds a cream-coloured border ring (for overlapping member rows) */
  withBorder?: boolean;
  /** Shows a green status dot in the bottom-right corner */
  showOnlineStatus?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const SIZES: Record<AvatarSize, number> = {
  sm: 24,
  md: 30,
  lg: 44,
  xl: 56,
};

const FONT_SIZES: Record<AvatarSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 20,
};

const BORDER_WIDTHS: Record<AvatarSize, number> = {
  sm: 2,
  md: 2,
  lg: 3,
  xl: 3,
};

const STATUS_DOT_SIZES: Record<AvatarSize, number> = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
};

export function Avatar({
  name,
  memberIndex,
  size = 'md',
  withBorder = false,
  showOnlineStatus = false,
  style,
  accessibilityLabel,
}: AvatarProps) {
  const { colors, radius } = useTheme();

  const dimensionPx = SIZES[size];
  const fontSize = FONT_SIZES[size];
  const initial = name.charAt(0).toUpperCase();

  // memberIndex === -1 → AI agent (ink bg, serif italic)
  const isAgent = memberIndex === -1;
  const bgColor = isAgent ? colors.text.primary : colors.member[memberIndex % colors.member.length];

  const containerStyle: ViewStyle = {
    width: dimensionPx,
    height: dimensionPx,
    borderRadius: radius.pill,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
    ...(withBorder
      ? {
          borderWidth: BORDER_WIDTHS[size],
          borderColor: colors.background.secondary,
        }
      : {}),
  };

  const statusDotSize = STATUS_DOT_SIZES[size];

  return (
    <View
      style={[containerStyle, style]}
      accessibilityLabel={accessibilityLabel ?? `Avatar for ${name}`}
      accessibilityRole="image"
    >
      <Text
        variant="body"
        color={colors.white}
        style={{
          fontFamily: isAgent ? 'Fraunces_500Medium_Italic' : 'Geist_600SemiBold',
          fontSize,
          lineHeight: fontSize * 1.2,
          includeFontPadding: false,
        }}
      >
        {isAgent ? 'R' : initial}
      </Text>

      {showOnlineStatus && (
        <View
          style={[
            styles.statusDot,
            {
              width: statusDotSize,
              height: statusDotSize,
              borderRadius: radius.pill,
              backgroundColor: colors.success.default,
              borderColor: colors.background.primary,
              borderWidth: 2,
              bottom: withBorder ? BORDER_WIDTHS[size] : 0,
              right: withBorder ? BORDER_WIDTHS[size] : 0,
            },
          ]}
        />
      )}
    </View>
  );
}

// ── AvatarGroup ───────────────────────────────────────────────────────────────
// Renders overlapping member avatars (matches .members-row from web demo).

interface AvatarGroupProps {
  members: { name: string; memberIndex: number }[];
  size?: AvatarSize;
  maxVisible?: number;
  style?: ViewStyle;
}

export function AvatarGroup({ members, size = 'lg', maxVisible = 5, style }: AvatarGroupProps) {
  const { colors } = useTheme();
  const visible = members.slice(0, maxVisible);
  const overflowCount = members.length - maxVisible;
  const overlapOffset = SIZES[size] * 0.25;

  return (
    <View style={[styles.group, style]}>
      {visible.map((member, i) => (
        <Avatar
          key={`${member.name}-${i}`}
          name={member.name}
          memberIndex={member.memberIndex}
          size={size}
          withBorder
          style={{ marginLeft: i === 0 ? 0 : -overlapOffset }}
        />
      ))}
      {overflowCount > 0 && (
        <View
          style={{
            width: SIZES[size],
            height: SIZES[size],
            borderRadius: 999,
            backgroundColor: colors.background.secondary,
            borderWidth: 2,
            borderColor: colors.background.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: -overlapOffset,
          }}
        >
          <Text
            variant="body"
            color={colors.text.muted}
            style={{ fontSize: FONT_SIZES[size], fontFamily: 'Geist_500Medium' }}
          >
            +{overflowCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  statusDot: {
    position: 'absolute',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
