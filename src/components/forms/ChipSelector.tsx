import React from 'react';
import { View, Pressable, ScrollView, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface ChipOption<T = string> {
  label: string;
  value: T;
  emoji?: string;
}

interface ChipSelectorProps<T = string> {
  options: ChipOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  multiSelect?: boolean;
  label?: string;
  scrollable?: boolean;
  style?: ViewStyle;
}

export function ChipSelector<T = string>({
  options,
  value,
  onChange,
  multiSelect = false,
  label,
  scrollable = true,
  style,
}: ChipSelectorProps<T>) {
  const { colors, radius, spacing } = useTheme();

  const selectedValues = Array.isArray(value) ? value : [value];

  const isSelected = (v: T) => selectedValues.includes(v);

  const toggle = (v: T) => {
    if (!multiSelect) {
      onChange(v);
      return;
    }
    const arr = [...selectedValues];
    const idx = arr.indexOf(v);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(v);
    onChange(arr as T);
  };

  const chips = options.map((opt) => {
    const selected = isSelected(opt.value);
    return (
      <Pressable
        key={String(opt.value)}
        onPress={() => toggle(opt.value)}
        style={[
          styles.chip,
          {
            borderRadius: radius.pill,
            paddingHorizontal: spacing.sp12,
            paddingVertical: spacing.sp6,
            borderWidth: 1.5,
            borderColor: selected ? colors.primary.default : colors.border.default,
            backgroundColor: selected ? colors.primary.surface : colors.background.elevated,
          },
        ]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: selected }}
        accessibilityLabel={opt.label}
      >
        {opt.emoji && (
          <Text variant="body" style={styles.emoji}>{opt.emoji}</Text>
        )}
        <Text
          variant="bodyMedium"
          color={selected ? colors.primary.text : colors.text.secondary}
        >
          {opt.label}
        </Text>
      </Pressable>
    );
  });

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text variant="eyebrow" color={colors.text.muted} style={styles.label}>
          {label}
        </Text>
      )}
      {scrollable ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {chips}
        </ScrollView>
      ) : (
        <View style={styles.wrap}>{chips}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
  label: {},
  scroll: { gap: 8, paddingRight: 4 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  emoji: { fontSize: 14 },
});
