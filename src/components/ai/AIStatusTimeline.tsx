/**
 * AIStatusTimeline — Multi-step agent progress indicator
 *
 * Shown above the chat input while RoomieAI is executing a complex task
 * (e.g., "Polling 3 restaurants → Checking availability → Building cart").
 *
 * Matches the `.ai-status-timeline` concept from the web demo
 * where a sequence of tool calls is shown as a vertical step list.
 *
 * Structure:
 *   ┌─────────────────────────────────┐
 *   │ ✓  Checking preferences         │  ← completed (green)
 *   │ ●  Searching restaurants...     │  ← active (animated pulse)
 *   │ ○  Building cart                │  ← pending (muted)
 *   │ ○  Calculating splits           │  ← pending (muted)
 *   └─────────────────────────────────┘
 *
 * Use as a slide-up panel above ChatInput while AI is working.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useEffect as useReanimatedEffect,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export type StepStatus = 'pending' | 'active' | 'completed' | 'error';

export interface TimelineStep {
  id: string;
  label: string;
  status: StepStatus;
  detail?: string;
}

interface AIStatusTimelineProps {
  steps: TimelineStep[];
  style?: ViewStyle;
}

export function AIStatusTimeline({ steps, style }: AIStatusTimelineProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:  colors.background.elevated,
          borderRadius:     radius.xl,
          borderWidth:      1,
          borderColor:      colors.border.default,
          padding:          spacing.sp14,
          gap:              spacing.sp2,
          ...shadows.xs,
        },
        style,
      ]}
    >
      {steps.map((step, i) => (
        <StepRow
          key={step.id}
          step={step}
          isLast={i === steps.length - 1}
          colors={colors}
          spacing={spacing}
        />
      ))}
    </View>
  );
}

function StepRow({
  step,
  isLast,
  colors,
  spacing,
}: {
  step: TimelineStep;
  isLast: boolean;
  colors: any;
  spacing: any;
}) {
  const pulseScale = useSharedValue(1);
  useReanimatedEffect(() => {
    if (step.status === 'active') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 500 }),
          withTiming(1,   { duration: 500 }),
        ),
        -1,
        false,
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 150 });
    }
  }, [step.status]);

  const dotAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const dotColor = {
    pending:   colors.border.default,
    active:    colors.primary.default,
    completed: colors.success.default,
    error:     colors.error.default,
  }[step.status];

  const labelColor = {
    pending:   colors.text.muted,
    active:    colors.text.primary,
    completed: colors.text.secondary,
    error:     colors.error.text,
  }[step.status];

  return (
    <View style={styles.step}>
      {/* Connector line + dot column */}
      <View style={styles.dotCol}>
        {/* Vertical connector above dot (except first row) */}
        <View
          style={[
            styles.connectorTop,
            { backgroundColor: step.status === 'pending' ? colors.border.subtle : colors.success.border },
          ]}
        />

        {step.status === 'completed' ? (
          <View
            style={[
              styles.dotIcon,
              { backgroundColor: colors.success.surface, borderRadius: 7 },
            ]}
          >
            <Feather name="check" size={10} color={colors.success.default} />
          </View>
        ) : step.status === 'error' ? (
          <View
            style={[
              styles.dotIcon,
              { backgroundColor: colors.error.surface, borderRadius: 7 },
            ]}
          >
            <Feather name="x" size={10} color={colors.error.default} />
          </View>
        ) : (
          <Animated.View
            style={[
              styles.dot,
              dotAnimStyle,
              {
                backgroundColor: dotColor,
                borderRadius:    4,
                opacity:         step.status === 'pending' ? 0.4 : 1,
              },
            ]}
          />
        )}

        {/* Vertical connector below dot (except last row) */}
        {!isLast && (
          <View
            style={[
              styles.connectorBottom,
              { backgroundColor: colors.border.subtle },
            ]}
          />
        )}
      </View>

      {/* Label + detail */}
      <View style={[styles.labelCol, { paddingBottom: isLast ? 0 : spacing.sp10 }]}>
        <Text
          variant={step.status === 'active' ? 'bodyMedium' : 'caption'}
          color={labelColor}
        >
          {step.label}
        </Text>
        {step.detail && step.status !== 'pending' && (
          <Text variant="monoSmall" color={colors.text.muted}>
            {step.detail}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  step: {
    flexDirection: 'row',
    gap:           10,
  },
  dotCol: {
    alignItems:  'center',
    width:       14,
    flexShrink:  0,
  },
  connectorTop: {
    width:  1,
    height: 6,
  },
  connectorBottom: {
    width:  1,
    flex:   1,
    minHeight: 8,
  },
  dot: {
    width:  8,
    height: 8,
  },
  dotIcon: {
    width:          14,
    height:         14,
    alignItems:     'center',
    justifyContent: 'center',
  },
  labelCol: {
    flex: 1,
    gap:  2,
  },
});
