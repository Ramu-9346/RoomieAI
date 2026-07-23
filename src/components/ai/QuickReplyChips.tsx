import React, { useEffect } from 'react';
import { ScrollView, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface QuickReply {
  id: string;
  label: string;
  emoji?: string;
}

interface QuickReplyChipsProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
  style?: ViewStyle;
}

function QuickReplyChip({
  reply,
  onPress,
  index,
}: {
  reply: QuickReply;
  onPress: () => void;
  index: number;
}) {
  const { colors, radius, spacing } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(index * 60, withTiming(1, { duration: 300 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.94, { damping: 22, stiffness: 350 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 22, stiffness: 350 });
        }}
        style={[
          styles.chip,
          {
            borderRadius: radius.pill,
            borderWidth: 1.5,
            borderColor: colors.primary.default,
            backgroundColor: colors.primary.surface,
            paddingHorizontal: spacing.sp14,
            paddingVertical: spacing.sp8,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={reply.label}
      >
        {reply.emoji && (
          <Text variant="body" style={styles.emoji}>
            {reply.emoji}
          </Text>
        )}
        <Text variant="bodyMedium" color={colors.primary.text} numberOfLines={1}>
          {reply.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function QuickReplyChips({ replies, onSelect, style }: QuickReplyChipsProps) {
  const { spacing } = useTheme();

  if (replies.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: spacing.sp8,
        paddingHorizontal: spacing.pageHorizontal,
        paddingVertical: spacing.sp4,
      }}
      style={style}
    >
      {replies.map((reply, i) => (
        <QuickReplyChip key={reply.id} reply={reply} onPress={() => onSelect(reply)} index={i} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  emoji: { fontSize: 14 },
});
