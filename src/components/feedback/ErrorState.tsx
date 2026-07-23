import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We hit an unexpected error. Please try again.',
  onRetry,
  style,
}: ErrorStateProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.sp32,
          gap: spacing.sp16,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: colors.error.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name="alert-circle" size={28} color={colors.error.default} />
      </View>
      <Text variant="heading" color={colors.text.primary} style={{ textAlign: 'center' }}>
        {title}
      </Text>
      <Text variant="body" color={colors.text.muted} style={{ textAlign: 'center' }}>
        {message}
      </Text>
      {onRetry && (
        <Button label="Try Again" variant="secondary" onPress={onRetry} iconLeft="refresh-cw" />
      )}
    </View>
  );
}

export function OfflineState({ onRetry, style }: { onRetry?: () => void; style?: ViewStyle }) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.sp32,
          gap: spacing.sp16,
        },
        style,
      ]}
    >
      <Text variant="displayXL" style={{ fontSize: 56 }}>
        📡
      </Text>
      <Text variant="heading" color={colors.text.primary} style={{ textAlign: 'center' }}>
        No Internet
      </Text>
      <Text variant="body" color={colors.text.muted} style={{ textAlign: 'center' }}>
        Check your connection. Some features may work offline.
      </Text>
      {onRetry && <Button label="Retry" variant="secondary" onPress={onRetry} iconLeft="wifi" />}
    </View>
  );
}
