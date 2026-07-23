/**
 * AIMessageBubble — Roomie's outgoing message in the chat thread
 *
 * Design:
 *   - Cream surface (#FBF7F0 → background.primary), no explicit bg needed
 *   - Left-aligned, full chat width (not a narrow bubble like user messages)
 *   - Optional avatar ("R" in Fraunces italic, ink background) on left
 *   - Text uses body/Geist for prose, captionItalic for soft suggestions
 *   - Attached cards (RestaurantCard, GroceryCard, PollCard) rendered below text
 *   - Timestamp bottom-right in monoSmall muted
 *
 * Props:
 *   message      — the text content (supports markdown-light: **bold**)
 *   timestamp    — display string ("2:14 PM")
 *   showAvatar   — whether to render the AI avatar (first message of a run)
 *   isTyping     — if true, renders ThinkingIndicator instead of text
 *   children     — any attached card components rendered below text
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle, type ReactNode } from 'react-native';

import { useTheme } from '../../theme';
import { Avatar } from '../primitives/Avatar';
import { Text } from '../primitives/Text';

interface AIMessageBubbleProps {
  message?: string;
  timestamp?: string;
  showAvatar?: boolean;
  isTyping?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
}

export function AIMessageBubble({
  message,
  timestamp,
  showAvatar = false,
  isTyping = false,
  children,
  style,
}: AIMessageBubbleProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          gap: spacing.sp8,
          paddingHorizontal: spacing.sp16,
          paddingVertical: spacing.sp6,
        },
        style,
      ]}
    >
      {/* AI avatar column — always reserves width for alignment */}
      <View style={styles.avatarCol}>
        {showAvatar && <Avatar name="Roomie" memberIndex={-1} size="md" />}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {isTyping
          ? // Placeholder so ThinkingIndicator can be imported here
            // Import ThinkingIndicator at the screen level and pass as child
            null
          : message && (
              <Text variant="body" color={colors.text.primary} style={styles.messageText}>
                {message}
              </Text>
            )}

        {children && (
          <View style={{ marginTop: message ? spacing.sp10 : 0, gap: spacing.sp8 }}>
            {children}
          </View>
        )}

        {timestamp && (
          <Text variant="monoSmall" color={colors.text.muted} style={styles.timestamp}>
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  avatarCol: {
    width: 30, // md avatar size
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  messageText: {
    lineHeight: 22,
  },
  timestamp: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});
