/**
 * ChatInput — The primary text composition bar
 *
 * Fixed to bottom of Chat screen (above tab bar).
 * Height: 56px (chatInputHeight token) + safe area bottom.
 * zIndex: chatInput (35) — above content, below modals.
 *
 * Layout:
 *   [left tools] [text input field] [send / voice toggle]
 *
 * States:
 *   idle        — placeholder "Message Roomie…", send btn disabled
 *   has-text    — send btn enabled (ink fill)
 *   sending     — spinner replaces send, input disabled
 *   ai-thinking — entire bar dimmed with "Roomie is thinking…" hint
 *
 * Send button: circular 36px button, spring scale on press.
 * Voice note: mic icon — NOT implemented in v1, shown as future placeholder.
 *
 * QuickReply row (optional): horizontally scrollable ChipGroup shown
 * above the input when AI provides suggestions.
 */

import React, { useState, useRef } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { Spinner } from '../feedback/Loading';
import { Chip } from '../primitives/Chip';

interface QuickReply {
  id: string;
  label: string;
}

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: (text: string) => void;
  placeholder?: string;
  sending?: boolean;
  aiThinking?: boolean;
  quickReplies?: QuickReply[];
  onQuickReply?: (reply: QuickReply) => void;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ChatInput({
  value,
  onChangeText,
  onSend,
  placeholder = 'Message Roomie…',
  sending     = false,
  aiThinking  = false,
  quickReplies,
  onQuickReply,
  style,
}: ChatInputProps) {
  const { colors, radius, spacing, zIndex, opacity: opacityTokens } = useTheme();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<RNTextInput>(null);
  const sendScale = useSharedValue(1);

  const canSend = value.trim().length > 0 && !sending && !aiThinking;

  function handleSend() {
    if (!canSend) return;
    sendScale.value = withSpring(0.85, { damping: 10, stiffness: 500 }, () => {
      sendScale.value = withSpring(1, { damping: 12, stiffness: 300 });
    });
    onSend(value.trim());
  }

  const sendBtnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendScale.value }],
  }));

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor:  colors.background.primary,
          borderTopWidth:   StyleSheet.hairlineWidth,
          borderTopColor:   colors.border.default,
          paddingBottom:    Math.max(insets.bottom, spacing.sp8),
          zIndex:           zIndex.chatInput,
          opacity:          aiThinking ? opacityTokens.disabled : opacityTokens.full,
        },
        style,
      ]}
    >
      {/* Quick replies row */}
      {quickReplies && quickReplies.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickRepliesContent}
          style={styles.quickReplies}
        >
          {quickReplies.map((reply) => (
            <Chip
              key={reply.id}
              label={reply.label}
              type="quickReply"
              onPress={() => onQuickReply?.(reply)}
            />
          ))}
        </ScrollView>
      )}

      {/* AI thinking hint */}
      {aiThinking && (
        <View style={[styles.thinkingHint, { paddingHorizontal: spacing.sp16 }]}>
          <Text variant="captionItalic" color={colors.text.muted}>
            Roomie is thinking…
          </Text>
        </View>
      )}

      {/* Input row */}
      <View
        style={[
          styles.inputRow,
          {
            paddingHorizontal: spacing.sp12,
            paddingTop:        spacing.sp8,
            gap:               spacing.sp8,
          },
        ]}
      >
        {/* Text field */}
        <View
          style={[
            styles.field,
            {
              backgroundColor: colors.background.secondary,
              borderRadius:    radius.pill,
              borderWidth:     1,
              borderColor:     colors.border.default,
              paddingVertical:   Platform.OS === 'ios' ? 10 : 6,
              paddingHorizontal: spacing.sp14,
              minHeight:         44,
            },
          ]}
        >
          <RNTextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.text.muted}
            multiline
            maxLength={2000}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={handleSend}
            editable={!sending && !aiThinking}
            style={[
              styles.textInput,
              {
                color:      colors.text.primary,
                fontFamily: 'Geist_400Regular',
                fontSize:   15,
                lineHeight: 22,
              },
            ]}
            accessibilityLabel="Chat message input"
          />
        </View>

        {/* Send button */}
        <AnimatedPressable
          onPress={handleSend}
          disabled={!canSend}
          style={[
            styles.sendBtn,
            sendBtnStyle,
            {
              backgroundColor: canSend ? colors.text.primary : colors.background.secondary,
              borderRadius:    radius.pill,
              borderWidth:     1,
              borderColor:     canSend ? colors.text.primary : colors.border.default,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !canSend }}
        >
          {sending ? (
            <Spinner size="sm" color={colors.background.primary} />
          ) : (
            <Feather
              name="arrow-up"
              size={18}
              color={canSend ? colors.background.primary : colors.text.muted}
            />
          )}
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  quickReplies: {
    maxHeight:  44,
  },
  quickRepliesContent: {
    paddingHorizontal: 12,
    paddingVertical:   8,
    gap:               6,
    flexDirection:     'row',
    alignItems:        'center',
  },
  thinkingHint: {
    paddingTop:    4,
    paddingBottom: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems:    'flex-end',
  },
  field: {
    flex: 1,
  },
  textInput: {
    padding: 0,  // override default RN TextInput padding
    maxHeight: 120,
  },
  sendBtn: {
    width:          40,
    height:         40,
    alignItems:     'center',
    justifyContent: 'center',
    flexShrink:     0,
  },
});
