import React from 'react';
import { StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

// ─── Heading ──────────────────────────────────────────────────────────────────

interface HeadingProps {
  children: string;
  level?: 1 | 2 | 3;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export function Heading({ children, level = 1, color, style, numberOfLines }: HeadingProps) {
  const { colors } = useTheme();
  const variant = level === 1 ? 'displayL' : level === 2 ? 'heading' : 'title';
  return (
    <Text
      variant={variant}
      color={color ?? colors.text.primary}
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// ─── Title ────────────────────────────────────────────────────────────────────

interface TitleProps {
  children: string;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export function Title({ children, color, style, numberOfLines }: TitleProps) {
  const { colors } = useTheme();
  return (
    <Text
      variant="title"
      color={color ?? colors.text.primary}
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// ─── Subtitle ─────────────────────────────────────────────────────────────────

export function Subtitle({ children, color, style, numberOfLines }: TitleProps) {
  const { colors } = useTheme();
  return (
    <Text
      variant="subtitle"
      color={color ?? colors.text.secondary}
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// ─── Body ─────────────────────────────────────────────────────────────────────

interface BodyProps {
  children: string;
  medium?: boolean;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export function Body({ children, medium = false, color, style, numberOfLines }: BodyProps) {
  const { colors } = useTheme();
  return (
    <Text
      variant={medium ? 'bodyMedium' : 'body'}
      color={color ?? colors.text.secondary}
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// ─── Caption ──────────────────────────────────────────────────────────────────

interface CaptionProps {
  children: string;
  italic?: boolean;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export function Caption({ children, italic = false, color, style, numberOfLines }: CaptionProps) {
  const { colors } = useTheme();
  return (
    <Text
      variant={italic ? 'captionItalic' : 'caption'}
      color={color ?? colors.text.muted}
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// ─── Label (eyebrow) ─────────────────────────────────────────────────────────

interface LabelProps {
  children: string;
  color?: string;
  style?: TextStyle;
}

export function Label({ children, color, style }: LabelProps) {
  const { colors } = useTheme();
  return (
    <Text
      variant="eyebrow"
      color={color ?? colors.primary.text}
      style={style}
    >
      {children}
    </Text>
  );
}

// ─── Price ────────────────────────────────────────────────────────────────────
// Auto-formats a numeric rupee amount using Geist Mono

interface PriceProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  style?: TextStyle;
  showRupee?: boolean;
}

export function Price({ amount, size = 'md', color, style, showRupee = true }: PriceProps) {
  const { colors } = useTheme();
  const variant = size === 'sm' ? 'monoSmall' : size === 'lg' ? 'monoMedium' : 'mono';
  const formatted = new Intl.NumberFormat('en-IN').format(Math.round(amount));

  return (
    <Text variant={variant} color={color ?? colors.text.primary} style={style}>
      {showRupee ? `₹${formatted}` : formatted}
    </Text>
  );
}

// ─── Currency (split amount) ──────────────────────────────────────────────────

interface CurrencyProps {
  amount: number;
  color?: string;
  style?: TextStyle;
  compact?: boolean;
}

export function Currency({ amount, color, style, compact = false }: CurrencyProps) {
  const { colors } = useTheme();
  const formatted = compact
    ? amount >= 1000
      ? `₹${(amount / 1000).toFixed(1)}k`
      : `₹${amount}`
    : `₹${new Intl.NumberFormat('en-IN').format(Math.round(amount))}`;

  return (
    <Text variant="monoMedium" color={color ?? colors.text.primary} style={style}>
      {formatted}
    </Text>
  );
}

// ─── GradientText ─────────────────────────────────────────────────────────────
// Uses a simple orange primary color for now — masked gradient requires @react-native-masked-view

interface GradientTextProps {
  children: string;
  style?: TextStyle;
}

export function GradientText({ children, style }: GradientTextProps) {
  const { colors } = useTheme();
  return (
    <Text variant="title" color={colors.primary.default} style={style}>
      {children}
    </Text>
  );
}
