/**
 * NotificationCard — In-App Notification Row
 *
 * Used in:
 *   - Notification centre (future)
 *   - Activity feed on Home screen (for notification-type activities)
 *   - Matches .activity-row from web demo
 *
 * Types:
 *   poll      — orange dot, "Dinner poll is live"
 *   order     — green dot, "Order placed"
 *   payment   — orange dot, "Priya paid ₹449"
 *   reminder  — blue dot, "Re-verify Swiggy (token expires tomorrow)"
 *   system    — muted dot, "Flat settings updated"
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export type NotificationType = 'poll' | 'order' | 'payment' | 'reminder' | 'system';

interface NotificationCardProps {
  type: NotificationType;
  title: string;
  subtitle?: string;
  timestamp: string;
  unread?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const DOT_COLORS: Record<NotificationType, string> = {
  poll:     'orange',
  order:    'green',
  payment:  'orange',
  reminder: 'blue',
  system:   'muted',
};

export function NotificationCard({
  type,
  title,
  subtitle,
  timestamp,
  unread = false,
  onPress,
  style,
}: NotificationCardProps) {
  const { colors, radius, spacing } = useTheme();

  const dotColor = {
    orange: colors.primary.default,
    green:  colors.success.default,
    blue:   '#2B5A8C',
    muted:  colors.text.muted,
  }[DOT_COLORS[type]];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: unread ? colors.primary.surface : colors.background.elevated,
          borderRadius:    radius.md,
          borderWidth:     1,
          borderColor:     pressed ? colors.border.strong : colors.border.subtle,
          padding:         spacing.sp10,
          paddingHorizontal: spacing.sp12,
          flexDirection:   'row',
          alignItems:      'center',
          gap:             10,
        },
        style,
      ]}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={title}
    >
      {/* Coloured dot */}
      <View
        style={[
          styles.dot,
          { backgroundColor: dotColor },
        ]}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text
          variant={unread ? 'bodyMedium' : 'body'}
          color={colors.text.primary}
          numberOfLines={2}
        >
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color={colors.text.muted} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Timestamp */}
      <Text variant="monoSmall" color={colors.text.muted} style={styles.timestamp}>
        {timestamp}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dot: {
    width:        6,
    height:       6,
    borderRadius: 3,
    flexShrink:   0,
  },
  content: {
    flex: 1,
    gap:  2,
  },
  timestamp: {
    flexShrink: 0,
    textAlign:  'right',
  },
});
