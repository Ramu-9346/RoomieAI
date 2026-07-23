/**
 * PollCard — Group Voting Response Card
 *
 * Mirrors the .poll-card structure from the web demo exactly.
 * Rendered inline in the AI chat stream after polls are sent.
 *
 * Structure:
 *   ┌──────────────────────────────────────────┐
 *   │ Tonight's dinner — who's in?             │  ← Fraunces title
 *   ├──────────────────────────────────────────│
 *   │ [P]  Priya     in · craving biryani   ✓  │  ← PollRow
 *   │ [A]  Akash     in · veg please        ✓  │
 *   │ [V]  Vikram    out · at office 🏢     —  │
 *   └──────────────────────────────────────────┘
 *
 * Live mode: when isPending=true, new responses spring-animate in as they arrive.
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Avatar } from '../primitives/Avatar';
import { Text } from '../primitives/Text';

export interface PollResponse {
  name: string;
  memberIndex: number;
  answer: string; // "in · craving biryani", "out · at office 🏢"
  isIn: boolean; // true → ✓ green, false → — muted
  pending?: boolean; // true → "waiting..." shimmer
}

interface PollCardProps {
  question: string;
  responses: PollResponse[];
  totalMembers?: number; // to show "2/4 responded"
  style?: ViewStyle;
}

export function PollCard({ question, responses, totalMembers, style }: PollCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  const responded = responses.filter((r) => !r.pending).length;
  const showProgress = totalMembers !== undefined;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.border.default,
          overflow: 'hidden',
          ...shadows.card,
        },
        style,
      ]}
    >
      {/* Question header */}
      <View style={{ padding: spacing.sp14, paddingBottom: spacing.sp10 }}>
        <Text variant="title" color={colors.text.primary}>
          {question}
        </Text>
        {showProgress && (
          <Text variant="monoSmall" color={colors.text.muted} style={styles.progress}>
            {responded}/{totalMembers} responded
          </Text>
        )}
      </View>

      {/* Responses */}
      {responses.map((response, i) => (
        <PollRow
          key={`${response.name}-${i}`}
          response={response}
          isLast={i === responses.length - 1}
          colors={colors}
          spacing={spacing}
        />
      ))}
    </View>
  );
}

// ── PollRow ───────────────────────────────────────────────────────────────────

function PollRow({
  response,
  isLast,
  colors,
  spacing,
}: {
  response: PollResponse;
  isLast: boolean;
  colors: ReturnType<typeof useTheme>['colors'];
  spacing: ReturnType<typeof useTheme>['spacing'];
}) {
  const opacity = useSharedValue(response.pending ? 0.5 : 1);
  const rowStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  // Spring in when response arrives (pending → resolved)
  React.useEffect(() => {
    if (!response.pending) {
      opacity.value = withSpring(1, { damping: 18, stiffness: 280 });
    }
  }, [response.pending]);

  return (
    <Animated.View
      style={[
        styles.row,
        !isLast && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border.subtle,
        },
        { paddingHorizontal: spacing.sp14, paddingVertical: spacing.sp10 },
        rowStyle,
      ]}
    >
      <Avatar name={response.name} memberIndex={response.memberIndex} size="sm" />

      <Text variant="bodyMedium" color={colors.text.primary} style={styles.name}>
        {response.name}
      </Text>

      <Text
        variant="captionItalic"
        color={response.pending ? colors.text.muted : colors.text.muted}
        style={styles.answer}
        numberOfLines={1}
      >
        {response.pending ? 'waiting...' : response.answer}
      </Text>

      <Text
        variant="bodyMedium"
        color={response.isIn ? colors.success.default : colors.text.muted}
        style={styles.check}
      >
        {response.pending ? '○' : response.isIn ? '✓' : '—'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progress: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    minWidth: 50,
  },
  answer: {
    flex: 1,
  },
  check: {
    flexShrink: 0,
    minWidth: 16,
    textAlign: 'right',
  },
});
