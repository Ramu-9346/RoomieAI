/**
 * RoomieAI Typography System
 *
 * Three-font design: each font has a strict, non-overlapping role.
 *
 * FRAUNCES (serif, variable optical size)
 *   → Display headings, brand wordmark, agent voice, editorial moments
 *   → Conveys warmth, personality, and premium positioning
 *   → Use italic variant for emphasis within headings
 *
 * GEIST (geometric sans-serif)
 *   → All body copy, UI labels, descriptions, navigation
 *   → Neutral, highly legible, modern
 *
 * GEIST MONO (monospace)
 *   → Prices, timestamps, order IDs, tool call strings, badge labels
 *   → Signals precision and technical trustworthiness
 *   → Always use for any numeric data in a financial context
 *
 * Font loading: fonts are loaded via expo-font at app bootstrap.
 * Font family strings must match the names registered with useFonts().
 */

import { Platform } from 'react-native';

// ─── Font families ────────────────────────────────────────────────────────────

export const FontFamily = {
  // Fraunces weights available: 300 (Light), 400 (Regular), 500 (Medium),
  // 600 (SemiBold), 700 (Bold). Each has an italic variant.
  serifLight:          'Fraunces_300Light',
  serifLightItalic:    'Fraunces_300Light_Italic',
  serifRegular:        'Fraunces_400Regular',
  serifRegularItalic:  'Fraunces_400Regular_Italic',
  serifMedium:         'Fraunces_500Medium',
  serifMediumItalic:   'Fraunces_500Medium_Italic',
  serifSemiBold:       'Fraunces_600SemiBold',
  serifBold:           'Fraunces_700Bold',

  // Geist weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  sansLight:     'Geist_300Light',
  sansRegular:   'Geist_400Regular',
  sansMedium:    'Geist_500Medium',
  sansSemiBold:  'Geist_600SemiBold',
  sansBold:      'Geist_700Bold',

  // Geist Mono weights: 400 (Regular), 500 (Medium)
  monoRegular:  'GeistMono_400Regular',
  monoMedium:   'GeistMono_500Medium',

  // System fallback stack — matches web demo's "-apple-system, sans-serif"
  system: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
} as const;

// ─── Type scale ───────────────────────────────────────────────────────────────
// Pixel values correspond to the clamp() sizes from the web demo,
// adapted to mobile screen widths (375–430px base).
// lineHeight values are absolute pixels (React Native requirement).

export const TypeScale = {
  // Display XL — hero headings, onboarding splash
  // Web: clamp(42px, 5.5vw, 72px) → mobile fixed at 48px
  displayXL: 48,

  // Display L — section headings ("Try it yourself")
  // Web: 32px
  displayL: 32,

  // Heading — card group titles, modal headings
  // Web: 24px (flat-card-name)
  heading: 24,

  // Title — card titles, restaurant names, scenario titles
  // Web: 19–22px
  title: 20,

  // Subtitle — supporting titles, member names in cards
  // Web: 17px
  subtitle: 17,

  // Body — primary body text (web: 15px baseline)
  body: 15,

  // Caption — metadata, timestamps, secondary info
  // Web: 13px
  caption: 13,

  // Micro — badges, pill labels, tick marks
  // Web: 10–11px
  micro: 11,

  // Button — CTA label text
  button: 14,

  // Mono — prices, IDs, timestamps, order codes, tool call text
  // Web: 12–13px mono
  mono: 13,
  monoSmall: 11,
  monoLarge: 15,
} as const;

// ─── Line heights (absolute px) ───────────────────────────────────────────────
// Derived from web demo's em-based line heights.

export const LineHeight = {
  tight:       TypeScale.displayXL * 1.02,  // ~49  — display headings
  snug:        TypeScale.displayL  * 1.15,  // ~37  — section headings
  normal:      TypeScale.body      * 1.5,   // ~23  — body text
  relaxed:     TypeScale.subtitle  * 1.55,  // ~26  — important sub-copy
  caption:     TypeScale.caption   * 1.5,   // ~20  — captions / metadata
  mono:        TypeScale.mono      * 1.4,   // ~18  — mono data lines
} as const;

// ─── Letter spacing (absolute pts, converted from em) ────────────────────────
// React Native letterSpacing is in pts; multiply fontSize × em value.

export const LetterSpacing = {
  tightest:  -2.5,   // display XL at -0.035em  (48 × -0.035 ≈ -1.7 → -2)
  tight:     -1.0,   // heading/title at -0.02em (24 × -0.02 ≈ -0.5)
  normal:     0,
  wide:       0.5,   // eyebrow labels at 0.04em (13 × 0.04 ≈ 0.5)
  wider:      1.0,   // badge text at 0.08em (13 × 0.08 ≈ 1)
  widest:     1.5,   // mono labels at 0.1em (13 × 0.1 ≈ 1.3)
} as const;

// ─── Pre-built text styles ────────────────────────────────────────────────────
// Use the Text component's `variant` prop which maps to these.
// All components use these — never inline font values.

export const TextStyles = {
  /**
   * DISPLAY XL
   * Usage: Onboarding hero headline, splash screen brand statement
   * Font: Fraunces Medium — editorial authority at large size
   * Example: "The ordering coordinator your flat never had to become."
   */
  displayXL: {
    fontFamily:    FontFamily.serifMedium,
    fontSize:      TypeScale.displayXL,
    lineHeight:    LineHeight.tight,
    letterSpacing: LetterSpacing.tightest,
    color:         undefined as unknown as string, // injected by Text component from theme
  },

  /**
   * DISPLAY L
   * Usage: Section titles on chat screen, major feature headings
   * Font: Fraunces Medium
   * Example: "Try it yourself"
   */
  displayL: {
    fontFamily:    FontFamily.serifMedium,
    fontSize:      TypeScale.displayL,
    lineHeight:    LineHeight.snug,
    letterSpacing: LetterSpacing.tight,
  },

  /**
   * HEADING
   * Usage: Card group headings, modal titles, flat name in flat card
   * Font: Fraunces Medium
   * Example: "The Gachibowli Four"
   */
  heading: {
    fontFamily:    FontFamily.serifMedium,
    fontSize:      TypeScale.heading,
    lineHeight:    TypeScale.heading * 1.2,
    letterSpacing: LetterSpacing.tight,
  },

  /**
   * TITLE
   * Usage: Scenario card titles, restaurant names, order card restaurant
   * Font: Fraunces Medium
   * Example: "Paradise Restaurant", "Order dinner for everyone"
   */
  title: {
    fontFamily:    FontFamily.serifMedium,
    fontSize:      TypeScale.title,
    lineHeight:    TypeScale.title * 1.2,
    letterSpacing: LetterSpacing.tight,
  },

  /**
   * SUBTITLE
   * Usage: Key sub-copy, import supporting text under headings
   * Font: Geist Regular — not serif; this is explanatory prose
   * Example: "PGs, rented flats, joint families..."
   */
  subtitle: {
    fontFamily:    FontFamily.sansRegular,
    fontSize:      TypeScale.subtitle,
    lineHeight:    LineHeight.relaxed,
    letterSpacing: LetterSpacing.normal,
  },

  /**
   * BODY
   * Usage: All body text, chat bubble content, descriptions, labels
   * Font: Geist Regular — default reading font
   */
  body: {
    fontFamily:    FontFamily.sansRegular,
    fontSize:      TypeScale.body,
    lineHeight:    LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  /**
   * BODY MEDIUM
   * Usage: Slightly emphasised body — member names in poll rows, item names
   * Font: Geist Medium
   */
  bodyMedium: {
    fontFamily:    FontFamily.sansMedium,
    fontSize:      TypeScale.body,
    lineHeight:    LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  /**
   * CAPTION
   * Usage: Timestamps, secondary metadata, restaurant time/distance
   * Font: Geist Regular
   * Example: "35 min · Gachibowli", "2d ago"
   */
  caption: {
    fontFamily:    FontFamily.sansRegular,
    fontSize:      TypeScale.caption,
    lineHeight:    LineHeight.caption,
    letterSpacing: LetterSpacing.normal,
  },

  /**
   * CAPTION MEDIUM
   * Usage: Scenario prompt text (italic serif in web), dietary fit reasons
   * Font: Fraunces Regular Italic — for small emotive moments
   * Example: "Hey Roomie, order dinner for the flat tonight."
   */
  captionItalic: {
    fontFamily:    FontFamily.serifRegularItalic,
    fontSize:      TypeScale.caption,
    lineHeight:    LineHeight.caption,
    letterSpacing: LetterSpacing.normal,
  },

  /**
   * BUTTON
   * Usage: All button labels
   * Font: Geist Medium — weight provides authority without aggression
   */
  button: {
    fontFamily:    FontFamily.sansMedium,
    fontSize:      TypeScale.button,
    lineHeight:    TypeScale.button * 1.4,
    letterSpacing: LetterSpacing.normal,
  },

  /**
   * EYEBROW
   * Usage: Section labels above headings ("AN AGENT FOR SHARED LIVING"),
   *        category badges (FOOD, GROCERY, DINEOUT), card labels
   * Font: Geist Mono — uppercase precision signals a system-level label
   */
  eyebrow: {
    fontFamily:    FontFamily.monoRegular,
    fontSize:      TypeScale.micro,
    lineHeight:    TypeScale.micro * 1.6,
    letterSpacing: LetterSpacing.wider,
    textTransform: 'uppercase' as const,
  },

  /**
   * MONO
   * Usage: Prices, order IDs, timestamps, tool call strings, split amounts
   * Font: Geist Mono Regular
   * Example: "₹1,236", "#SW82619", "9:12 PM", "swiggy_food.build_cart()"
   */
  mono: {
    fontFamily:    FontFamily.monoRegular,
    fontSize:      TypeScale.mono,
    lineHeight:    LineHeight.mono,
    letterSpacing: LetterSpacing.normal,
  },

  /**
   * MONO SMALL
   * Usage: Micro timestamps, badge subtext, subtle data labels
   * Font: Geist Mono Regular
   */
  monoSmall: {
    fontFamily:    FontFamily.monoRegular,
    fontSize:      TypeScale.monoSmall,
    lineHeight:    TypeScale.monoSmall * 1.6,
    letterSpacing: LetterSpacing.wide,
  },

  /**
   * MONO MEDIUM
   * Usage: Prices that need extra weight — total amounts, per-person splits
   * Font: Geist Mono Medium
   */
  monoMedium: {
    fontFamily:    FontFamily.monoMedium,
    fontSize:      TypeScale.mono,
    lineHeight:    LineHeight.mono,
    letterSpacing: LetterSpacing.normal,
  },

} as const;

export type TextVariant = keyof typeof TextStyles;
