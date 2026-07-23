/**
 * UserMessageBubble — Human member's message in the chat thread
 *
 * Design (mirrors .user-message from web demo):
 *   - Right-aligned pill bubble
 *   - Ink background (#1A1713), cream text
 *   - Member avatar on right (member colour-coded)
 *   - Rounded pill: borderRadius.xxxl on all corners
 *   - Max width 75% of chat width
 *   - Timestamp below-right in monoSmall muted
 *   - showAvatar: false for consecutive messages from same member
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Avatar } from '../primitives/Avatar';
import { Text } from '../primitives/Text';

interface UserMessageBubbleProps {
  message: string;
  memberName: string;
  memberIndex: number;
  timestamp?: string;
  showAvatar?: boolean;
  style?: ViewStyle;
}

export function UserMessageBubble({
  message,
  memberName,
  memberIndex,
  timestamp,
  showAvatar = true,
  style,
}: UserMessageBubbleProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingHorizontal: spacing.sp16,
          paddingVertical: spacing.sp6,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Bubble */}
        <View style={styles.bubbleWrap}>
          <View
            style={[
              styles.bubble,
              {
                backgroundColor: colors.text.primary,
                borderRadius: radius.xxxl,
                paddingVertical: spacing.sp10,
                paddingHorizontal: spacing.sp14,
              },
            ]}
          >
            <Text variant="body" color={colors.background.primary}>
              {message}
            </Text>
          </View>

          {timestamp && (
            <Text variant="monoSmall" color={colors.text.muted} style={styles.timestamp}>
              {timestamp}
            </Text>
          )}
        </View>

        {/* Avatar — always reserves width for alignment */}
        <View style={styles.avatarCol}>
          {showAvatar && <Avatar name={memberName} memberIndex={memberIndex} size="md" />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '85%',
  },
  bubbleWrap: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 4,
  },
  bubble: {
    alignSelf: 'flex-end',
    maxWidth: '100%',
  },
  avatarCol: {
    width: 30,
    flexShrink: 0,
  },
  timestamp: {
    alignSelf: 'flex-end',
  },
});
