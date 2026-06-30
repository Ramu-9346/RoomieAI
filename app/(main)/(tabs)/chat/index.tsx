/**
 * ChatScreen — AI conversation hub.
 * PLACEHOLDER: Full implementation in Phase 4 (Feature Screens).
 *
 * Will render:
 *   - TopAppBar (chat variant) with AI status dot + member avatars
 *   - Scrollable message list (AIMessageBubble, UserMessageBubble, ToolExecutionCard)
 *   - AIStatusTimeline (during multi-step AI flows)
 *   - ChatInput with quick replies
 */

import { View, StyleSheet } from 'react-native';
import { Text }             from '@components/primitives/Text';
import { useAppTheme }      from '@hooks/useAppTheme';

export default function ChatScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text variant="title" color={colors.text.primary} align="center">
        Chat
      </Text>
      <Text variant="captionItalic" color={colors.text.muted} align="center">
        AI conversation hub — Phase 4
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
});
