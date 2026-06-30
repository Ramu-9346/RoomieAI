/**
 * ErrorBanner — Inline error state for failed AI actions
 *
 * Used in chat thread when:
 *   - Swiggy API call fails
 *   - Cart cap (₹1000) exceeded
 *   - Restaurant unavailable
 *   - Network timeout
 *
 * Shows error + optional retry CTA.
 * Styled to match chat message width (not full-screen blocking).
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface ErrorBannerProps {
  message: string;
  detail?: string;
  retryLabel?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export function ErrorBanner({
  message,
  detail,
  retryLabel = 'Try again',
  onRetry,
  style,
}: ErrorBannerProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.error.surface,
          borderRadius:    radius.xl,
          borderWidth:     1,
          borderColor:     colors.error.border,
          padding:         spacing.sp14,
          ...shadows.xs,
        },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <View style={styles.row}>
        <Feather name="alert-circle" size={16} color={colors.error.default} />
        <View style={styles.text}>
          <Text variant="bodyMedium" color={colors.error.text}>{message}</Text>
          {detail && (
            <Text variant="caption" color={colors.error.text}>{detail}</Text>
          )}
        </View>
      </View>

      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={({ pressed }) => [
            styles.retryBtn,
            {
              backgroundColor: pressed ? colors.error.default : colors.error.surface,
              borderRadius:    radius.sm,
              borderWidth:     1,
              borderColor:     colors.error.border,
              marginTop:       spacing.sp10,
              paddingVertical: spacing.sp6,
              paddingHorizontal: spacing.sp12,
              alignSelf:       'flex-start',
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={retryLabel}
        >
          <Text variant="button" color={colors.error.text}>{retryLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           10,
  },
  text: {
    flex: 1,
    gap:  2,
  },
  retryBtn: {
    alignSelf: 'flex-start',
  },
});
