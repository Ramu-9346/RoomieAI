/**
 * SearchBar — Search Input Component
 *
 * Used for:
 *   - Searching restaurants on Swiggy Food
 *   - Searching grocery items on Instamart
 *   - Filtering history feed
 *   - Searching flat members
 *
 * Features:
 *   - Magnifier icon on left
 *   - Clear (×) button when text exists
 *   - Cancel text button (pulls keyboard away, clears text)
 *   - Animated width reduction when focused (to accommodate Cancel)
 *   - Light cream background — contrasts slightly with page bg
 */

import { Feather } from '@expo/vector-icons';
import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Animated as RNAnimated,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface SearchBarProps extends Pick<TextInputProps, 'placeholder' | 'autoFocus'> {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  style?: ViewStyle;
}

export function SearchBar({
  value,
  onChangeText,
  onFocus,
  onBlur,
  onCancel,
  showCancel = true,
  placeholder = 'Search...',
  autoFocus = false,
  style,
}: SearchBarProps) {
  const { colors, radius } = useTheme();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const cancelWidth = useRef(new RNAnimated.Value(0)).current;
  const cancelOpacity = useRef(new RNAnimated.Value(0)).current;

  const handleFocus = useCallback(() => {
    setFocused(true);
    onFocus?.();
    if (showCancel) {
      RNAnimated.parallel([
        RNAnimated.timing(cancelWidth, { toValue: 64, duration: 200, useNativeDriver: false }),
        RNAnimated.timing(cancelOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [onFocus, showCancel]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleCancel = useCallback(() => {
    inputRef.current?.blur();
    onChangeText('');
    onCancel?.();
    RNAnimated.parallel([
      RNAnimated.timing(cancelWidth, { toValue: 0, duration: 200, useNativeDriver: false }),
      RNAnimated.timing(cancelOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [onChangeText, onCancel]);

  const handleClear = useCallback(() => {
    onChangeText('');
    inputRef.current?.focus();
  }, [onChangeText]);

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.background.secondary,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: focused ? colors.border.strong : colors.transparent,
          },
        ]}
      >
        <Feather name="search" size={16} color={colors.text.muted} style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          autoFocus={autoFocus}
          returnKeyType="search"
          clearButtonMode="never"
          style={[
            styles.input,
            {
              fontFamily: 'Geist_400Regular',
              fontSize: 15,
              color: colors.text.primary,
            },
          ]}
          selectionColor={colors.primary.default}
        />
        {value.length > 0 && (
          <Pressable
            onPress={handleClear}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Feather name="x-circle" size={16} color={colors.text.muted} style={styles.clearIcon} />
          </Pressable>
        )}
      </View>

      {showCancel && (
        <RNAnimated.View style={{ width: cancelWidth, opacity: cancelOpacity, overflow: 'hidden' }}>
          <Pressable
            onPress={handleCancel}
            style={styles.cancelButton}
            accessibilityLabel="Cancel search"
            accessibilityRole="button"
          >
            <Text variant="body" color={colors.primary.default}>
              Cancel
            </Text>
          </Pressable>
        </RNAnimated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 0,
    includeFontPadding: false,
  },
  clearIcon: {
    marginLeft: 8,
  },
  cancelButton: {
    paddingLeft: 8,
    height: 44,
    justifyContent: 'center',
  },
});
