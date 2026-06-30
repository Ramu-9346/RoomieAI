import type { Order } from './Order';
import type { Poll } from './Poll';

export type MessageRole = 'user' | 'assistant' | 'system';

export type AttachmentType = 'restaurant_card' | 'order_card' | 'poll_card' | 'grocery_card' | 'payment_card' | 'tool_call';

export interface MessageAttachment {
  type: AttachmentType;
  orderId?: string;
  pollId?: string;
  restaurantId?: string;
  toolCallId?: string;
  data?: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  attachments?: MessageAttachment[];
  memberName?: string;         // for user messages
  memberIndex?: number;
  isStreaming?: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  flatId: string;
  messages: ChatMessage[];
  isAIThinking: boolean;
  currentAgentStep?: string;   // e.g. "Searching restaurants…"
  createdAt: string;
  updatedAt: string;
}
