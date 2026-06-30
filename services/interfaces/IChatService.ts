import type { ChatMessage, Conversation } from '@models/Chat';

export interface SendMessageParams {
  conversationId: string;
  flatId:         string;
  userId:         string;
  content:        string;
}

export interface IChatService {
  /** Get or create a conversation for the flat */
  getConversation(flatId: string): Promise<Conversation>;

  /** Send a user message and get AI response stream */
  sendMessage(params: SendMessageParams): Promise<AsyncIterable<ChatMessage>>;

  /** Get message history (paginated) */
  getMessages(conversationId: string, cursor?: string): Promise<{
    messages: ChatMessage[];
    nextCursor?: string;
  }>;

  /** Clear conversation history (DPDP: user-triggered deletion) */
  clearHistory(conversationId: string): Promise<void>;
}
