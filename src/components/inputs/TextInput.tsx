/**
 * TextInput — Styled Form Input
 *
 * States:
 *   default  — bordered, cream background
 *   focused  — strong border (ink-soft), subtle shadow
 *   filled   — active with user content
 *   error    — red border, error message below
 *   disabled — opacity.disabled, not interactive
 *
 * Features:
 *   - Floating label (animates up on focus/fill)
 *   - Optional left icon
 *   - Optional right action icon (clear, visibility toggle)
 *   - Error message slot
 *   - Helper text slot
 *   - Multiline support (for preference notes, dislikes, etc.)
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  Pressable,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helper?: string;
  iconLeft?: string;
  iconRight?: string;
  onIconRightPress?: () => void;
  disabled?: boolean;
  multiline?: boolean;
  style?: ViewStyle;
  inputRef?: React.RefObject<RNTextInput>;
}

export function TextInput({
  label,
  value,
  onChangeText,
  error,
  helper,
  iconLeft,
  iconRight,
  onIconRightPress,
  disabled = false,
  multiline = false,
  style,
  inputRef: externalRef,
  ...rest
}: TextInputProps) {
  const { colors, radius, spacing, opacity, duration } = useTheme();
  const [focused, setFocused] = useState(false);
  const internalRef = useRef<RNTextInput>(null);
  const inputRef = externalRef ?? internalRef;

  const focusAnim = useSharedValue(value.length > 0 ? 1 : 0);

  const handleFocus = useCallback(() => {
    setFocused(true);
    focusAnim.value = withTiming(1, { duration: duration.fast });
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
    if (!value) {
      focusAnim.value = withTiming(0, { duration: duration.fast });
    }
  }, [value]);

  const labelAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(focusAnim.value, [0, 1], [0, -22]),
      },
      {
        scale: interpolate(focusAnim.value, [0, 1], [1, 0.78]),
      },
    ],
    color: interpolateColor(
      focusAnim.value,
      [0, 1],
      [colors.text.muted, error ? colors.error.default : colors.text.secondary],
    ),
    transformOrigin: 'left center' as any,
  }));

  const borderColor = error
    ? colors.error.default
    : focused
    ? colors.border.strong
    : colors.border.default;

  const hasIcon = Boolean(iconLeft || iconRight);

  return (
    <View style={[styles.wrapper, style]}>
      {/* Container */}
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={[
          styles.container,
          {
            borderColor,
            borderRadius: radius.sm,
            backgroundColor: colors.background.elevated,
            paddingLeft: iconLeft ? spacing.sp40 : spacing.sp14,
            paddingRight: iconRight ? spacing.sp40 : spacing.sp14,
            paddingTop: spacing.sp20,
            paddingBottom: spacing.sp12,
            minHeight: multiline ? 100 : 56,
            opacity: disabled ? opacity.disabled : 1,
          },
        ]}
      >
        {/* Left icon */}
        {iconLeft && (
          <View style={[styles.iconLeft, { top: 16 }]}>
            <Feather
              name={iconLeft as any}
              size={18}
              color={focused ? colors.text.secondary : colors.text.muted}
            />
          </View>
        )}

        {/* Floating label */}
        <Animated.Text
          style={[
            styles.label,
            {
              fontFamily: 'Geist_400Regular',
              fontSize: 15,
              left: iconLeft ? spacing.sp40 : spacing.sp14,
            },
            labelAnimStyle,
          ]}
          pointerEvents="none"
        >
          {label}
        </Animated.Text>

        {/* Actual input */}
        <RNTextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          multiline={multiline}
          style={[
            styles.input,
            {
              fontFamily: 'Geist_400Regular',
              fontSize: 15,
              color: colors.text.primary,
              includeFontPadding: false,
            },
          ]}
          placeholderTextColor={colors.text.muted}
          selectionColor={colors.primary.default}
          {...rest}
        />

        {/* Right icon */}
        {iconRight && (
          <Pressable
            onPress={onIconRightPress}
            style={[styles.iconRight, { top: 16 }]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather
              name={iconRight as any}
              size={18}
              color={colors.text.muted}
            />
          </Pressable>
        )}
      </Pressable>

      {/* Error message */}
      {error && (
        <View style={styles.messageRow}>
          <Feather name="alert-circle" size={12} color={colors.error.default} />
          <Text variant="caption" color={colors.error.text} style={styles.messageText}>
            {error}
          </Text>
        </View>
      )}

      {/* Helper text (hidden when error is showing) */}
      {!error && helper && (
        <Text variant="caption" color={colors.text.muted} style={styles.helper}>
          {helper}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    borderWidth: 1,
    position:    'relative',
    justifyContent: 'flex-end',
  },
  label: {
    position: 'absolute',
    top:      18,
  },
  input: {
    padding:  0,
    margin:   0,
    minHeight: 22,
  },
  iconLeft: {
    position: 'absolute',
    left:     14,
  },
  iconRight: {
    position: 'absolute',
    right:    14,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems:    'center',
    marginTop:     4,
    gap:           4,
  },
  messageText: {
    flex: 1,
  },
  helper: {
    marginTop: 4,
  },
});
