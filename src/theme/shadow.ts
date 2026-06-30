/**
 * RoomieAI Shadow / Elevation System
 *
 * React Native shadows work differently per platform:
 *   iOS:     shadowColor + shadowOffset + shadowOpacity + shadowRadius
 *   Android: elevation (maps to Material Design shadow)
 *
 * Strategy: Each token exports both ios and android variants.
 * The shadow() helper merges the correct values for the current platform.
 *
 * Semantic tokens correspond to element elevation in the visual stack:
 *   none → card → floating → modal → fab
 *
 * Colour note: Shadows use warm-black (#1A1713) instead of pure black
 * to maintain the warm editorial feel of the cream palette.
 */

import { Platform, ViewStyle } from 'react-native';

interface ShadowStyle {
  shadowColor:   string;
  shadowOffset:  { width: number; height: number };
  shadowOpacity: number;
  shadowRadius:  number;
  elevation:     number;
}

const SHADOW_COLOR = '#1A1713';  // warm ink — matches --ink

function makeShadow(
  yOffset: number,
  radius: number,
  opacity: number,
  elevation: number,
): ShadowStyle {
  return {
    shadowColor:   SHADOW_COLOR,
    shadowOffset:  { width: 0, height: yOffset },
    shadowOpacity: opacity,
    shadowRadius:  radius,
    elevation,
  };
}

// ─── Raw shadow tokens ────────────────────────────────────────────────────────

const shadowTokens = {
  /**
   * none
   * Used: Flat surfaces on cream background (no shadow needed)
   */
  none: makeShadow(0, 0, 0, 0),

  /**
   * xs
   * Used: Subtle card lift on hover (scenario cards on web)
   * "0 8px 24px rgba(0,0,0,0.04)" from web demo
   */
  xs: makeShadow(2, 8, 0.04, 1),

  /**
   * card
   * Used: Standard card elevation — OrderCard, PollCard, MemberCard, etc.
   * Sits just above the cream background
   */
  card: makeShadow(2, 12, 0.06, 3),

  /**
   * cardHover
   * Used: Card in active/selected state, scenario card on press
   * "0 8px 24px rgba(0,0,0,0.08)" — slightly more prominent
   */
  cardHover: makeShadow(8, 24, 0.08, 6),

  /**
   * floating
   * Used: Floating chat input bar, floating action button, floating tooltips
   * Must feel distinct from the content it floats above
   */
  floating: makeShadow(4, 16, 0.12, 8),

  /**
   * modal
   * Used: Dialogs, confirmation modals
   * Strongest standard shadow — signals highest elevation
   */
  modal: makeShadow(8, 32, 0.16, 16),

  /**
   * bottomSheet
   * Used: Bottom sheet drawers (grocery cart review, payment confirmation)
   * Top-edge shadow only; offset is negative to cast upward
   */
  bottomSheet: {
    shadowColor:   SHADOW_COLOR,
    shadowOffset:  { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius:  20,
    elevation:     12,
  },

  /**
   * fab
   * Used: Floating action button (if used independently of tab bar)
   * Prominent but not alarming
   */
  fab: makeShadow(6, 20, 0.18, 10),

} as const;

// ─── Platform-resolved shadow helper ─────────────────────────────────────────
// Call shadow('card') in StyleSheet to get platform-correct styles.

export function shadow(
  token: keyof typeof shadowTokens
): Partial<ViewStyle> {
  const s = shadowTokens[token];
  if (Platform.OS === 'android') {
    return { elevation: s.elevation };
  }
  return {
    shadowColor:   s.shadowColor,
    shadowOffset:  s.shadowOffset,
    shadowOpacity: s.shadowOpacity,
    shadowRadius:  s.shadowRadius,
  };
}

export const shadows = shadowTokens;
export type ShadowKey = keyof typeof shadowTokens;
