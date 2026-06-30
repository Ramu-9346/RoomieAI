/**
 * ChatStore — conversation thread, AI state, and quick replies.
 */

import { create } from 'zustand';
import { immer }  from 'zustand/middleware/immer';

import type { ChatMessage, Conversation } from '@models/Chat';

interface ChatState {
  conversation: Conversation | null;
  messages: ChatMessage[];
  isAIThinking: boolean;
  currentAgentStep: string | null;
  draft: string;
  quickReplies: Array<{ id: string; label: string }>;

  // Actions
  setConversation:  (conv: Conversation) => void;
  appendMessage:    (msg: ChatMessage) => void;
  updateMessage:    (id: string, patch: Partial<ChatMessage>) => void;
  setAIThinking:    (thinking: boolean, step?: string) => void;
  setDraft:         (text: string) => void;
  setQuickReplies:  (replies: Array<{ id: string; label: string }>) => void;
  clearQuickReplies:() => void;
  clearChat:        () => void;
}

export const useChatStore = create<ChatState>()(
  immer((set) => ({
    conversation:     null,
    messages:         [],
    isAIThinking:     false,
    currentAgentStep: null,
    draft:            '',
    quickReplies:     [],

    setConversation: (conv) =>
      set((state) => {
        state.conversation = conv;
        state.messages     = conv.messages;
      }),

    appendMessage: (msg) =>
      set((state) => { state.messages.push(msg); }),

    updateMessage: (id, patch) =>
      set((state) => {
        const idx = state.messages.findIndex((m) => m.id === id);
        if (idx !== -1) Object.assign(state.messages[idx]!, patch);
      }),

    setAIThinking: (thinking, step) =>
      set((state) => {
        state.isAIThinking     = thinking;
        state.currentAgentStep = step ?? null;
      }),

    setDraft: (text) =>
      set((state) => { state.draft = text; }),

    setQuickReplies: (replies) =>
      set((state) => { state.quickReplies = replies; }),

    clearQuickReplies: () =>
      set((state) => { state.quickReplies = []; }),

    clearChat: () =>
      set((state) => {
        state.conversation     = null;
        state.messages         = [];
        state.isAIThinking     = false;
        state.currentAgentStep = null;
        state.draft            = '';
        state.quickReplies     = [];
      }),
  })),
);
