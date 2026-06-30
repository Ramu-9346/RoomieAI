/**
 * RoomieAI Color System
 *
 * Source of truth: RoomiAI.html CSS variables.
 * Two layers: raw palette (never use directly) → semantic tokens (always use).
 *
 * Brand rule (BRD §15.5 C-025): Swiggy orange #FF5200 is reserved for Swiggy
 * wordmarks only. RoomieAI's primary action colour is --orange-deep: #C65E00.
 */

// ─── Raw palette ─────────────────────────────────────────────────────────────
// Never reference these directly in components. Use the semantic layer below.

const palette = {
  // Warm cream — editorial warmth, not clinical white
  cream:       '#FBF7F0',
  cream2:      '#F5EFE4',

  // Warm ink — not pure black; avoids the harshness of #000
  ink:         '#1A1713',
  inkSoft:     '#44403B',
  inkMuted:    '#6B6761',

  // Border/divider — warm beige tones, never cold grey
  line:        '#E8E0D0',
  lineSoft:    '#F0EADB',

  // Brand orange — RoomieAI's own orange family
  orange:      '#FC8019',   // used for live dots, accent decorations
  orangeDeep:  '#C65E00',   // primary CTA, eyebrow labels, active states
  orangeSoft:  '#FFF1E1',   // badge backgrounds, tinted surfaces

  // Success / veg / live indicator
  green:       '#1BA672',
  greenSoft:   '#E6F5EE',

  // Error / non-veg indicator (Indian food standard — red dot = non-veg)
  red:         '#E23744',
  redSoft:     '#FEE8EA',

  // Dineout / reservation accent
  purple:      '#6B4E9B',
  purpleSoft:  '#EDE5F5',

  // Premium gold — sparingly used for special states
  gold:        '#B88A2B',
  goldSoft:    '#FEF6E1',

  // Member identity colours (from web demo, must stay consistent)
  memberA:     '#C65E00',   // slot 1
  memberB:     '#6B4E9B',   // slot 2
  memberC:     '#1BA672',   // slot 3
  memberD:     '#2B5A8C',   // slot 4
  memberE:     '#A0522D',   // slot 5
  memberF:     '#2E8B57',   // slot 6
  memberG:     '#8B4513',   // slot 7
  memberH:     '#4B0082',   // slot 8

  // Swiggy brand colour — ONLY for "Powered by Swiggy" marks (BRD C-024)
  swiggyOrange: '#FF5200',

  // Absolute
  white:       '#FFFFFF',
  black:       '#000000',
  transparent: 'transparent' as const,
} as const;

// ─── Semantic colour tokens ───────────────────────────────────────────────────

export const colors = {

  // ── Light mode ─────────────────────────────────────────────────────────────
  light: {
    /**
     * Background layers — ordered low (base) → high (elevated)
     * Think of these as an elevation stack: primary sits behind everything,
     * elevated sits on top (modals, cards on cream).
     */
    background: {
      primary:  palette.cream,               // Main app bg — always cream
      secondary: palette.cream2,             // Card fill, tinted sections
      elevated:  palette.white,              // Cards placed ON cream bg
      overlay:  'rgba(26, 23, 19, 0.5)',     // Behind modals & bottom sheets
    },

    /**
     * Text hierarchy — four levels.
     * primary → secondary → muted → inverse (on dark surfaces).
     */
    text: {
      primary:   palette.ink,               // Headlines, important body
      secondary: palette.inkSoft,           // Normal body text
      muted:     palette.inkMuted,          // Labels, timestamps, placeholders
      inverse:   palette.cream,             // Text on ink/orange backgrounds
      link:      palette.orangeDeep,        // Tappable inline text
    },

    /**
     * Border & dividers — three strengths.
     * subtle for internal row separators; default for card outlines; strong
     * for focused inputs and selected states.
     */
    border: {
      default:  palette.line,
      subtle:   palette.lineSoft,
      strong:   palette.inkSoft,
    },

    /**
     * Primary brand action colour (orange-deep).
     * Used for: CTAs, active tab indicators, eyebrow text, progress fills.
     */
    primary: {
      default:  palette.orangeDeep,
      surface:  palette.orangeSoft,         // Tinted background for primary elements
      text:     palette.orangeDeep,         // Text/icon on primary surface
    },

    /**
     * Status: success
     * Used for: veg indicator, live status, settled payment, order confirmed.
     */
    success: {
      default:  palette.green,
      surface:  palette.greenSoft,
      text:     palette.green,
    },

    /**
     * Status: error
     * Used for: non-veg indicator, order failed, validation error.
     */
    error: {
      default:  palette.red,
      surface:  palette.redSoft,
      text:     palette.red,
    },

    /**
     * Status: warning
     * Used for: budget warnings, re-auth expiry notices.
     */
    warning: {
      default:  palette.gold,
      surface:  palette.goldSoft,
      text:     palette.gold,
    },

    /**
     * Accent: dineout / reservation purple
     * Used only for Dineout MCP-related elements to distinguish them visually
     * from food (orange) and grocery (green).
     */
    accent: {
      default:  palette.purple,
      surface:  palette.purpleSoft,
      text:     palette.purple,
    },

    /**
     * Member colours — up to 8 flat members, each gets a distinct colour
     * that stays consistent across all cards, avatars, and splits.
     */
    member: [
      palette.memberA,
      palette.memberB,
      palette.memberC,
      palette.memberD,
      palette.memberE,
      palette.memberF,
      palette.memberG,
      palette.memberH,
    ] as const,

    /**
     * Indian food domain semantics — these map to the national standard:
     * green square dot = vegetarian, red square dot = non-vegetarian.
     */
    veg:     palette.green,
    nonVeg:  palette.red,

    /**
     * Swiggy brand — reserved exclusively for "Powered by Swiggy" marks.
     * Never use as RoomieAI's primary colour (BRD C-025).
     */
    swiggy: palette.swiggyOrange,

    // Utility
    white:       palette.white,
    transparent: palette.transparent,
  },

  // ── Dark mode (prepared, not active in v1) ─────────────────────────────────
  // Inverts cream/ink while preserving warm undertones.
  // Background shifts from cream to warm-dark; text from ink to cream.
  dark: {
    background: {
      primary:   '#1A1713',
      secondary: '#221E1A',
      elevated:  '#2C2824',
      overlay:   'rgba(0, 0, 0, 0.65)',
    },
    text: {
      primary:   '#FBF7F0',
      secondary: '#D6CFBE',
      muted:     '#8C857C',
      inverse:   '#1A1713',
      link:      '#FC8019',
    },
    border: {
      default:  '#3A3530',
      subtle:   '#2C2824',
      strong:   '#6B6761',
    },
    primary: {
      default:  '#FC8019',
      surface:  '#2D1F0E',
      text:     '#FC8019',
    },
    success: {
      default:  '#1BA672',
      surface:  '#0D2B1E',
      text:     '#4CC99A',
    },
    error: {
      default:  '#E23744',
      surface:  '#2B1219',
      text:     '#F07D86',
    },
    warning: {
      default:  '#B88A2B',
      surface:  '#2B2210',
      text:     '#D4A94A',
    },
    accent: {
      default:  '#8B6FC0',
      surface:  '#1E1630',
      text:     '#A990D9',
    },
    member: [
      '#E07040',
      '#8B6FC0',
      '#4CC99A',
      '#5A8FD0',
      '#C07850',
      '#50AA80',
      '#A0784B',
      '#7050B0',
    ] as const,
    veg:     '#4CC99A',
    nonVeg:  '#F07D86',
    swiggy:  palette.swiggyOrange,
    white:   palette.white,
    transparent: palette.transparent,
  },

  // Raw palette export — only for internal theme use
  palette,

} as const;

export type LightColors  = typeof colors.light;
export type DarkColors   = typeof colors.dark;
export type ThemeColors  = LightColors | DarkColors;
export type ColorScheme  = 'light' | 'dark';
