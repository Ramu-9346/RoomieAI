import React, { useState } from 'react';
import {
  View,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
}

interface DropdownProps<T = string> {
  options: DropdownOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Dropdown<T = string>({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  error,
  disabled = false,
  style,
}: DropdownProps<T>) {
  const { colors, radius, spacing, shadows } = useTheme();
  const [open, setOpen] = useState(false);
  const rotate = useSharedValue(0);

  const selectedOption = options.find((o) => o.value === value);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 180}deg` }],
  }));

  const toggle = () => {
    if (disabled) return;
    const next = !open;
    setOpen(next);
    rotate.value = withTiming(next ? 1 : 0, { duration: 200 });
  };

  const select = (opt: DropdownOption<T>) => {
    if (opt.disabled) return;
    onChange(opt.value);
    setOpen(false);
    rotate.value = withTiming(0, { duration: 200 });
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text variant="eyebrow" color={colors.text.muted} style={styles.label}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={toggle}
        style={[
          styles.trigger,
          {
            borderRadius: radius.sm,
            borderColor: error ? colors.error.default : open ? colors.primary.default : colors.border.default,
            borderWidth: 1.5,
            backgroundColor: disabled ? colors.background.secondary : colors.background.elevated,
            paddingHorizontal: spacing.inputHorizontal,
            paddingVertical: spacing.inputVertical,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={label}
        disabled={disabled}
      >
        <Text
          variant="body"
          color={selectedOption ? colors.text.primary : colors.text.muted}
          style={styles.selectedText}
          numberOfLines={1}
        >
          {selectedOption?.label ?? placeholder}
        </Text>
        <Animated.View style={chevronStyle}>
          <Feather name="chevron-down" size={18} color={colors.text.muted} />
        </Animated.View>
      </Pressable>

      {error && (
        <Text variant="caption" color={colors.error.default} style={styles.error}>
          {error}
        </Text>
      )}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => { setOpen(false); rotate.value = withTiming(0, { duration: 200 }); }}
      >
        <Pressable style={styles.backdrop} onPress={() => { setOpen(false); rotate.value = withTiming(0, { duration: 200 }); }}>
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: colors.background.elevated,
                borderRadius: radius.xxl,
                ...shadows.elevated,
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(o) => String(o.value)}
              bounces={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => select(item)}
                  style={[
                    styles.option,
                    {
                      borderBottomColor: colors.border.subtle,
                      backgroundColor:
                        item.value === value ? colors.primary.surface : colors.transparent,
                    },
                    item.disabled && { opacity: 0.4 },
                  ]}
                >
                  <Text
                    variant="body"
                    color={item.value === value ? colors.primary.text : colors.text.primary}
                  >
                    {item.label}
                  </Text>
                  {item.description && (
                    <Text variant="caption" color={colors.text.muted}>
                      {item.description}
                    </Text>
                  )}
                  {item.value === value && (
                    <Feather name="check" size={16} color={colors.primary.default} />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { marginBottom: 2 },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: { flex: 1, marginRight: 8 },
  error: { marginTop: 2 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26,23,19,0.5)',
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 32,
  },
  sheet: {
    maxHeight: 320,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
});
