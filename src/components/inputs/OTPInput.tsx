/**
 * OTPInput — 6-Digit One-Time Password Input
 *
 * Used for:
 *   - Phone number verification during onboarding
 *   - Swiggy re-authentication prompt (every 5 days, BRD C-004)
 *
 * Design:
 *   - 6 individual boxes, each 48×56px
 *   - Focused box gets orange-deep border (primary.default)
 *   - Filled box gets ink border with ink text
 *   - Error state: all boxes turn red border
 *   - Auto-advances to next box on input
 *   - Auto-focuses previous box on backspace when empty
 *   - Pastes full code from clipboard when any box receives paste event
 *
 * Accessibility:
 *   - Single hidden TextInput handles actual input (for Android compatibility)
 *   - Visible boxes are purely decorative + focus indicators
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: ViewStyle;
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  error,
  disabled = false,
  autoFocus = false,
  style,
}: OTPInputProps) {
  const { colors, radius, spacing, opacity } = useTheme();
  const [focused, setFocused] = useState(false);
  const hiddenInputRef = useRef<TextInput>(null);

  const digits = value.split('').slice(0, length);
  while (digits.length < length) digits.push('');

  const focusedIndex = focused ? Math.min(digits.filter(Boolean).length, length - 1) : -1;

  const handlePress = useCallback(() => {
    hiddenInputRef.current?.focus();
  }, []);

  const handleChange = useCallback(
    (text: string) => {
      // Strip non-numeric characters
      const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
      onChange(cleaned);
    },
    [onChange, length],
  );

  const BOX_SIZE = 48;
  const BOX_HEIGHT = 56;

  return (
    <View style={[styles.wrapper, style]}>
      {/* Tap target + visual boxes */}
      <Pressable
        onPress={handlePress}
        style={[styles.boxRow, { gap: spacing.sp8 }]}
        accessibilityLabel={`OTP input, ${digits.filter(Boolean).length} of ${length} digits entered`}
        accessibilityRole="none"
        disabled={disabled}
      >
        {digits.map((digit, i) => {
          const isFocused = focusedIndex === i;
          const hasError  = Boolean(error);

          const borderColor = hasError
            ? colors.error.default
            : isFocused
            ? colors.primary.default
            : digit
            ? colors.border.strong
            : colors.border.default;

          const bgColor = hasError
            ? colors.error.surface
            : colors.background.elevated;

          return (
            <View
              key={i}
              style={[
                styles.box,
                {
                  width:           BOX_SIZE,
                  height:          BOX_HEIGHT,
                  borderRadius:    radius.sm,
                  borderColor,
                  backgroundColor: bgColor,
                  opacity:         disabled ? opacity.disabled : 1,
                },
              ]}
            >
              {digit ? (
                <Text
                  variant="heading"
                  color={hasError ? colors.error.text : colors.text.primary}
                  align="center"
                >
                  {digit}
                </Text>
              ) : isFocused ? (
                // Blinking cursor simulation
                <View
                  style={[styles.cursor, { backgroundColor: colors.primary.default }]}
                />
              ) : null}
            </View>
          );
        })}
      </Pressable>

      {/* Hidden actual input */}
      <TextInput
        ref={hiddenInputRef}
        value={value}
        onChangeText={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        editable={!disabled}
        style={styles.hiddenInput}
        caretHidden
        accessibilityLabel="Enter OTP code"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
      />

      {/* Error message */}
      {error && (
        <Text
          variant="caption"
          color={colors.error.text}
          style={styles.error}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap:        8,
  },
  boxRow: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  box: {
    borderWidth:    1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  cursor: {
    width:  2,
    height: 24,
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    width:    1,
    height:   1,
    opacity:  0,
    left:     -9999,
  },
  error: {
    marginTop: 6,
    textAlign: 'center',
  },
});
