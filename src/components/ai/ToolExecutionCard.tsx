/**
 * ToolExecutionCard — Inline display of MCP tool calls
 *
 * Rendered in the chat thread as a collapsible technical disclosure.
 * Matches `.tool-call` from the web demo.
 *
 * Shows which Swiggy MCP server + tool is being called with:
 *   - Animated pulse border while pending
 *   - Green checkmark on success
 *   - Red × on error
 *   - Collapsible detail section (result summary or error)
 *
 * Tool call types:
 *   food     — orange accent
 *   instamart — green accent
 *   dineout  — purple accent
 *   internal — muted (coordinator / memory agents)
 */

import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export type ToolCallStatus = 'pending' | 'success' | 'error';
export type ToolCallSource = 'food' | 'instamart' | 'dineout' | 'internal';

interface ToolExecutionCardProps {
  source: ToolCallSource;
  toolName: string;
  summary?: string; // e.g. "Found 8 restaurants near Koramangala"
  status: ToolCallStatus;
  errorMessage?: string;
  style?: ViewStyle;
}

const SOURCE_CONFIG: Record<
  ToolCallSource,
  { label: string; icon: React.ComponentProps<typeof Feather>['name'] }
> = {
  food: { label: 'Swiggy Food', icon: 'package' },
  instamart: { label: 'Swiggy Instamart', icon: 'shopping-bag' },
  dineout: { label: 'Swiggy Dineout', icon: 'map-pin' },
  internal: { label: 'Internal', icon: 'cpu' },
};

export function ToolExecutionCard({
  source,
  toolName,
  summary,
  status,
  errorMessage,
  style,
}: ToolExecutionCardProps) {
  const { colors, radius, spacing } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const config = SOURCE_CONFIG[source];

  const pulseOpacity = useSharedValue(1);
  useEffect(() => {
    if (status === 'pending') {
      pulseOpacity.value = withRepeat(
        withSequence(withTiming(0.3, { duration: 600 }), withTiming(1, { duration: 600 })),
        -1,
        false,
      );
    } else {
      pulseOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [status]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const statusIcon = {
    pending: null,
    success: <Feather name="check-circle" size={14} color={colors.success.default} />,
    error: <Feather name="x-circle" size={14} color={colors.error.default} />,
  }[status];

  const borderColor = {
    pending: colors.border.default,
    success: colors.success.border,
    error: colors.error.border,
  }[status];

  const accentColor = getAccentColor(source, colors);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor,
          overflow: 'hidden',
        },
        status === 'pending' && pulseStyle,
        style,
      ]}
    >
      <Pressable
        onPress={() => (summary || errorMessage ? setExpanded((e) => !e) : undefined)}
        style={[
          styles.header,
          {
            padding: spacing.sp10,
            paddingHorizontal: spacing.sp12,
            gap: 8,
            backgroundColor: colors.background.elevated,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`${config.label} · ${toolName}`}
        accessibilityState={{ expanded }}
      >
        {/* Left accent stripe */}
        <View style={[styles.accentStripe, { backgroundColor: accentColor }]} />

        <Feather name={config.icon} size={14} color={accentColor} />

        <Text variant="monoSmall" color={colors.text.muted} style={styles.label}>
          {config.label}
        </Text>

        <Text variant="monoSmall" color={colors.text.secondary} style={{ flex: 1 }}>
          {toolName}
        </Text>

        {status === 'pending' ? (
          <Text variant="monoSmall" color={colors.text.muted}>
            ···
          </Text>
        ) : (
          statusIcon
        )}

        {(summary || errorMessage) && (
          <Feather
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={12}
            color={colors.text.muted}
          />
        )}
      </Pressable>

      {/* Expandable detail */}
      {expanded && (summary || errorMessage) && (
        <View
          style={[
            styles.detail,
            {
              padding: spacing.sp10,
              paddingHorizontal: spacing.sp12,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: colors.border.subtle,
              backgroundColor:
                status === 'error' ? colors.error.surface : colors.background.primary,
            },
          ]}
        >
          <Text
            variant="monoSmall"
            color={status === 'error' ? colors.error.text : colors.text.secondary}
          >
            {errorMessage ?? summary}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

function getAccentColor(
  source: ToolCallSource,
  colors: ReturnType<typeof useTheme>['colors'],
): string {
  switch (source) {
    case 'food':
      return colors.primary.default; // orange-deep
    case 'instamart':
      return colors.success.default; // green
    case 'dineout':
      return '#7C3AED'; // purple
    case 'internal':
      return colors.text.muted;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accentStripe: {
    width: 3,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  label: {
    flexShrink: 0,
  },
  detail: {
    width: '100%',
  },
});
