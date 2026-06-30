/**
 * RoomieAI Theme — Unified Export
 *
 * Single import point for all design tokens.
 * Usage: import { theme, useTheme } from '../theme'
 *
 * The `theme` object contains all light-mode tokens by default.
 * The `useTheme()` hook returns the correct token set based on
 * the device's color scheme (light/dark).
 */

import { useColorScheme } from 'react-native';
import { colors, type ColorScheme, type ThemeColors } from './colors';
import { FontFamily, TextStyles, TypeScale, LineHeight, LetterSpacing, type TextVariant } from './typography';
import { spacing } from './spacing';
import { radius, type RadiusKey } from './radius';
import { shadow, shadows, type ShadowKey } from './shadow';
import { Duration, Stagger, Ease, AnimationPreset, type AnimationPresetKey } from './animation';
import { IconSize, Icons, type IconName, type IconSizeKey } from './icons';
import { zIndex, type ZIndexKey } from './zIndex';
import { opacity, type OpacityKey } from './opacity';

// ─── Composed theme object ────────────────────────────────────────────────────

export const theme = {
  colors:    colors.light,
  font:      FontFamily,
  text:      TextStyles,
  typeScale: TypeScale,
  lineHeight: LineHeight,
  letterSpacing: LetterSpacing,
  spacing,
  radius,
  shadow,
  shadows,
  duration:  Duration,
  stagger:   Stagger,
  ease:      Ease,
  animation: AnimationPreset,
  icon:      Icons,
  iconSize:  IconSize,
  zIndex,
  opacity,
} as const;

export type Theme = typeof theme;

// ─── Dark theme ───────────────────────────────────────────────────────────────

export const darkTheme: Theme = {
  ...theme,
  colors: colors.dark as unknown as ThemeColors,
};

// ─── useTheme hook ────────────────────────────────────────────────────────────
/**
 * Returns the correct theme based on device colour scheme.
 * Memoisation is not needed — useColorScheme() is already stable.
 *
 * Usage:
 *   const { colors, spacing, radius } = useTheme();
 */
export function useTheme(): Theme & { isDark: boolean; scheme: ColorScheme } {
  const scheme = (useColorScheme() ?? 'light') as ColorScheme;
  const isDark = scheme === 'dark';
  return {
    ...(isDark ? darkTheme : theme),
    isDark,
    scheme,
  };
}

// ─── Re-exports ───────────────────────────────────────────────────────────────
// Individual token exports for tree-shaking and direct access.

export { colors }                               from './colors';
export type { ColorScheme, ThemeColors }        from './colors';

export {
  FontFamily, TextStyles, TypeScale, LineHeight, LetterSpacing,
}                                               from './typography';
export type { TextVariant }                     from './typography';

export { spacing }                              from './spacing';
export type { SpacingKey }                      from './spacing';

export { radius }                               from './radius';
export type { RadiusKey }                       from './radius';

export { shadow, shadows }                      from './shadow';
export type { ShadowKey }                       from './shadow';

export { Duration, Stagger, Ease, AnimationPreset } from './animation';
export type { AnimationPresetKey }              from './animation';

export { Icons, IconSize }                      from './icons';
export type { IconName, IconSizeKey }           from './icons';

export { zIndex }                               from './zIndex';
export type { ZIndexKey }                       from './zIndex';

export { opacity }                              from './opacity';
export type { OpacityKey }                      from './opacity';
