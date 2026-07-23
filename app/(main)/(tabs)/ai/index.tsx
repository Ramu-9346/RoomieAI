/**
 * AIScreen — Roomie conversation hub.
 *
 * Shell layout only. No AI integration, no message sending, no Zustand chat store.
 *
 * Layout:
 *   - AppHeader: "Roomie" + AI status indicator dot
 *   - Body (flex 1):
 *       • Empty state (NoChat) when conversation is blank
 *       • QuickReplyChips with suggested starter prompts
 *   - ChatInput: composition bar (controlled, no send logic)
 *   - KeyboardAvoidView: correct behaviour on iOS/Android
 *
 * Future wiring: ChatScreen (Phase 6) will replace this with useChatStore,
 * ChatList, AIMessageBubble, ThinkingIndicator, and ChatService integration.
 */

import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  AppHeader,
  NoChat,
  QuickReplyChips,
  ChatInput,
  KeyboardAvoidView,
  Text,
  Spacer,
} from '@components';
import { useAppTheme } from '@hooks/useAppTheme';

// ── Suggested prompts ─────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  { id: '1', label: 'Order dinner for all', emoji: '🛵' },
  { id: '2', label: 'Start a food poll', emoji: '📊' },
  { id: '3', label: 'Check grocery list', emoji: '🛒' },
  { id: '4', label: 'Split last order', emoji: '💰' },
  { id: '5', label: 'Book a restaurant', emoji: '🍽️' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AIScreen() {
  const { colors, spacing } = useAppTheme();
  const [draft, setDraft] = useState('');

  function handleSend(_text: string) {
    // Phase 5 shell: no-op — Phase 6 will wire to ChatService + useChatStore
    setDraft('');
  }

  function handleQuickReply(reply: { id: string; label: string }) {
    // Phase 5 shell: pre-fill the input
    setDraft(reply.label);
  }

  return (
    <KeyboardAvoidView style={[styles.screen, { backgroundColor: colors.background.primary }]}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <AppHeader
        title="Roomie"
        subtitle="Your shared living assistant"
        rightElement={
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: colors.success.default }]} />
            <Text variant="caption" color={colors.text.muted}>
              Ready
            </Text>
          </View>
        }
      />

      {/* ── Conversation area ───────────────────────────────────────────── */}
      <View style={styles.body}>
        {/* Empty state */}
        <View style={styles.emptyWrap}>
          <NoChat onPrimaryPress={() => setDraft('Order dinner for all of us')} />
        </View>

        {/* Suggested prompts */}
        <View style={styles.promptsWrap}>
          <Text
            variant="caption"
            color={colors.text.muted}
            align="center"
            style={{ marginBottom: spacing.sp8 }}
          >
            Suggested
          </Text>
          <QuickReplyChips replies={SUGGESTED_PROMPTS} onSelect={handleQuickReply} />
          <Spacer size="sp12" />
        </View>
      </View>

      {/* ── Chat input ──────────────────────────────────────────────────── */}
      <ChatInput
        value={draft}
        onChangeText={setDraft}
        onSend={handleSend}
        placeholder="Message Roomie…"
        sending={false}
        aiThinking={false}
      />
    </KeyboardAvoidView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  promptsWrap: {
    paddingBottom: 8,
  },
});
