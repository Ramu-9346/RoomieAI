/**
 * Divider — Visual Separator Primitive
 *
 * Two styles from the web demo:
 *   solid  — 1px line (border-bottom: 1px solid var(--line))
 *   dashed — dashed line (border-top: 1px dashed var(--line)) used in
 *            the order total row
 *
 * Orientations:
 *   horizontal — default, full width
 *   vertical   — for inline separators (pipe character equivalent)
 *
 * Strengths:
 *   default — --line (#E8E0D0)
 *   subtle  — --line-soft (#F0EADB)
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

interface DividerProps {
  style?: 'solid' | 'dashed';
  strength?: 'default' | 'subtle';
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;   // vertical margin (top + bottom)
  style2?: ViewStyle; // additional styles (named style2 to avoid conflict)
}

export function Divider({
  style = 'solid',
  strength = 'default',
  orientation = 'horizontal',
  spacing: spacingProp,
  style2,
}: DividerProps) {
  const { colors } = useTheme();

  const color = strength === 'subtle'
    ? colors.border.subtle
    : colors.border.default;

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.vertical,
          { backgroundColor: color },
          spacingProp ? { marginHorizontal: spacingProp } : undefined,
          style2,
        ]}
      />
    );
  }

  if (style === 'dashed') {
    return (
      <View
        style={[
          styles.dashedContainer,
          spacingProp ? { marginVertical: spacingProp } : undefined,
          style2,
        ]}
      >
        <View
          style={[
            styles.dashedLine,
            {
              borderColor: color,
              borderStyle: 'dashed',
              borderWidth: 1,
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.horizontal,
        { backgroundColor: color },
        spacingProp ? { marginVertical: spacingProp } : undefined,
        style2,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    width:  '100%',
    height: StyleSheet.hairlineWidth > 0.5 ? 1 : StyleSheet.hairlineWidth,
  },
  vertical: {
    width:     StyleSheet.hairlineWidth > 0.5 ? 1 : StyleSheet.hairlineWidth,
    height:    '100%',
    alignSelf: 'stretch',
  },
  dashedContainer: {
    width:    '100%',
    overflow: 'hidden',
    height:   1,
  },
  dashedLine: {
    width:  '100%',
    height: 0,
  },
});
