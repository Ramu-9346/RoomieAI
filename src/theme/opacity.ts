/**
 * RoomieAI Opacity System
 *
 * Opacity tokens for consistent visual hierarchy.
 * Used for disabled states, overlays, muted elements, and loading states.
 *
 * Rules:
 * 1. Never use opacity for text colour — use theme.colors.text.muted instead
 * 2. Use opacity only for structural UI states (disabled, overlay, ghost)
 * 3. Animate opacity transitions using Duration.fast (150ms)
 */

export const opacity = {
  /**
   * full — 1.0
   * Used: Normal, active, fully interactive state
   */
  full: 1,

  /**
   * high — 0.9
   * Used: Pressed state for most interactive elements
   */
  high: 0.9,

  /**
   * medium — 0.7
   * Used: Secondary visual elements, placeholder content
   */
  medium: 0.7,

  /**
   * muted — 0.5
   * Used: Tool call text, audit log secondary info
   */
  muted: 0.5,

  /**
   * disabled — 0.4
   * Used: Disabled buttons, disabled inputs, disabled scenario cards
   * Web: ".scenario:disabled { opacity: 0.5 }" → using 0.4 on mobile
   * for better contrast on smaller screens
   */
  disabled: 0.4,

  /**
   * ghost — 0.25
   * Used: Ghost placeholder state before content loads
   */
  ghost: 0.25,

  /**
   * overlay — 0.5
   * Used: Overlay behind modals and bottom sheets
   * Note: This is an opacity value for use in rgba overlays, not direct
   * element opacity — use colors.background.overlay for actual overlay color
   */
  overlay: 0.5,

  /**
   * grain — 0.025
   * Used: Noise texture overlay on background (from web demo body::before)
   * Applied to the grain texture SVG overlay in the app background
   */
  grain: 0.025,

  /**
   * invisible — 0
   * Used: Animated elements in their "before" state (opacity: 0 → 1)
   */
  invisible: 0,

} as const;

export type OpacityKey = keyof typeof opacity;
