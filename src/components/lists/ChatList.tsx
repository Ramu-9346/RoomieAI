import React, { useRef, useEffect } from 'react';
import { FlatList, type ViewStyle, type ListRenderItem } from 'react-native';

import { useTheme } from '../../theme';

interface ChatListProps<T> {
  messages: T[];
  renderMessage: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  isTyping?: boolean;
  typingIndicator?: React.ReactNode;
  onEndReached?: () => void;
  style?: ViewStyle;
}

export function ChatList<T>({
  messages,
  renderMessage,
  keyExtractor,
  isTyping = false,
  typingIndicator,
  onEndReached,
  style,
}: ChatListProps<T>) {
  const { spacing } = useTheme();
  const listRef = useRef<FlatList>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isTyping]);

  return (
    <FlatList
      ref={listRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        gap: spacing.messageGap,
        paddingVertical: spacing.sp16,
        paddingBottom: spacing.sp32,
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      ListFooterComponent={
        isTyping && typingIndicator ? () => typingIndicator as JSX.Element : null
      }
      style={style}
    />
  );
}
