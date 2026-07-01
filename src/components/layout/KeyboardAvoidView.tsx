import React, { type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

interface KeyboardAvoidViewProps {
  children: ReactNode;
  style?: ViewStyle;
  offset?: number;
}

export function KeyboardAvoidView({
  children,
  style,
  offset = 0,
}: KeyboardAvoidViewProps) {
  return (
    <KeyboardAvoidingView
      style={[styles.base, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={offset}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});
