/**
 * Chip — Selectable Tag Primitive
 *
 * Used for:
 *   - Dietary preference selection (Veg, Non-Veg, Eggetarian, Jain, Vegan)
 *   - Allergen tags (Peanuts, Dairy, Gluten, Shellfish)
 *   - Cuisine preferences (Biryani, Pizza, South Indian, etc.)
 *   - Quick reply options in chat
 *   - Filter chips in history screen
 *
 * States:
 *   - Default  — unselected, border, transparent bg
 *   - Selected — filled, colour depends on type
 *   - Disabled — opacity.disabled, not interactive
 *
 * Types:
 *   - default  — ink border / ink-soft bg when selected
 *   - dietary  — colour-coded by dietary category
 *   - filter   — orange-deep accent when selected
 *   - quickReply — cream bg with ink border; lighter than default
 *
 * With onRemove: shows an × icon for dismissable chip tags
 */

import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from './Text';

export type ChipType = 'default' | 'filter' | 'quickReply';

interface ChipProps {
  label: string;
  selected?: boolean;
  type?: ChipType;
  onPress?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

export function Chip({
  label,
  selected = false,
  type = 'default',
  onPress,
  onRemove,
  disabled = false,
  accessibilityLabel,
  style,
}: ChipProps) {
  const { colors, radius, spacing, opacity } = useTheme();

  const chipStyle = getChipStyle(type, selected, colors);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected, disabled }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: chipStyle.bg,
          borderColor:     chipStyle.border,
          borderRadius:    radius.pill,
          paddingVertical:   spacing.sp4,
          paddingHorizontal: onRemove ? spacing.sp12 : spacing.sp12,
          opacity:         disabled ? opacity.disabled : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View style={styles.inner}>
        <Text
          variant="caption"
          color={chipStyle.text}
          style={styles.label}
        >
          {label}
        </Text>
        {onRemove && (
          <Pressable
            onPress={onRemove}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
            accessibilityLabel={`Remove ${label}`}
            accessibilityRole="button"
          >
            <Feather
              name="x"
              size={12}
              color={chipStyle.text}
              style={styles.removeIcon}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

// ── ChipGroup ─────────────────────────────────────────────────────────────────
// Horizontal scrolling row of chips for preference selection.

interface ChipGroupProps<T extends string> {
  options: Array<{ value: T; label: string }>;
  selected: T | T[];
  onSelect: (value: T) => void;
  multiSelect?: boolean;
  type?: ChipType;
  style?: ViewStyle;
}

export function ChipGroup<T extends string>({
  options,
  selected,
  onSelect,
  multiSelect = false,
  type = 'default',
  style,
}: ChipGroupProps<T>) {
  const selectedValues = Array.isArray(selected) ? selected : [selected];

  return (
    <View style={[styles.group, style]}>
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={selectedValues.includes(option.value)}
          type={type}
          onPress={() => onSelect(option.value)}
          style={styles.groupChip}
        />
      ))}
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getChipStyle(
  type: ChipType,
  selected: boolean,
  colors: ReturnType<typeof useTheme>['colors'],
) {
  if (!selected) {
    return {
      bg:     colors.transparent,
      border: colors.border.default,
      text:   colors.text.secondary,
    };
  }

  switch (type) {
    case 'filter':
      return {
        bg:     colors.primary.default,
        border: colors.primary.default,
        text:   colors.text.inverse,
      };
    case 'quickReply':
      return {
        bg:     colors.background.secondary,
        border: colors.border.strong,
        text:   colors.text.primary,
      };
    default:
      return {
        bg:     colors.text.primary,
        border: colors.text.primary,
        text:   colors.text.inverse,
      };
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  base: {
    borderWidth:  1,
    alignSelf:    'flex-start',
  },
  inner: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  label: {
    includeFontPadding: false,
  },
  removeIcon: {
    marginLeft: 4,
  },
  group: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           8,
  },
  groupChip: {
    marginBottom: 0,
  },
});
