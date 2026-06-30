/**
 * RoomieAI Spacing System — 8-point base grid
 *
 * All spacing values are multiples of 4pt (half-grid).
 * The 8pt grid ensures visual rhythm across all screens.
 *
 * Rules:
 * 1. Never use a spacing value not in this scale
 * 2. All paddings, margins, gaps reference these tokens
 * 3. Icon sizes and avatar sizes also follow this grid
 * 4. The grid ensures consistent vertical rhythm in lists and cards
 *
 * Naming: sp4 → 4pt, sp8 → 8pt, etc.
 */

export const spacing = {
  // ── Half steps (for tight internal padding) ──
  sp2:   2,    // decorative only — dot sizes, very tight insets
  sp4:   4,    // inner chip padding, tight row gaps

  // ── Quarter grid ──
  sp6:   6,    // row internal padding in compact tables

  // ── Full grid base ──
  sp8:   8,    // minimum button padding, chip gap, icon offset
  sp10:  10,   // activity row padding (from web demo)
  sp12:  12,   // card internal padding (compact), input vertical padding
  sp14:  14,   // input horizontal padding, tool call padding
  sp16:  16,   // standard mobile horizontal page padding
  sp18:  18,   // card internal padding (medium)
  sp20:  20,   // card internal padding (comfortable)
  sp24:  24,   // primary card padding, section gaps within cards
  sp28:  28,   // demo grid gap equivalent
  sp32:  32,   // section separator, hero horizontal padding
  sp40:  40,   // major section separator
  sp48:  48,   // hero padding top
  sp56:  56,   // hero padding top desktop (reference only)
  sp64:  64,   // large section spacing
  sp80:  80,   // section bottom padding
  sp96:  96,   // extra large section separation

  // ── Screen-level constants ──
  // Horizontal page gutters
  pageHorizontal:  16,   // standard mobile page padding
  pageVertical:    24,   // standard mobile page top/bottom padding

  // Card internal padding
  cardPaddingSm:   14,   // compact cards (tool call, activity row)
  cardPaddingMd:   18,   // standard inner cards (poll row, split row)
  cardPaddingLg:   24,   // primary cards (flat card, order card)

  // List item padding
  listItemVertical:   10,   // row padding in lists
  listItemHorizontal: 14,   // row horizontal padding

  // Input padding
  inputVertical:    14,
  inputHorizontal:  16,

  // Chat message gap
  messageGap:   18,    // vertical gap between chat bubbles

  // Bottom bar height (safe area excluded)
  tabBarHeight:    60,
  chatInputHeight: 56,

} as const;

export type SpacingKey = keyof typeof spacing;
