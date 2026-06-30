/**
 * RoomieAI Animation Standards
 *
 * All animations are derived from or directly ported from the web demo's
 * CSS keyframes and transition values.
 *
 * Philosophy:
 * - Animations serve communication, not decoration
 * - Every animation tells the user something: content arrived, action succeeded,
 *   system is working
 * - Short and purposeful: nothing exceeds 500ms in standard UI
 * - Easing: always ease-out for enter, ease-in for exit (mirrors physics)
 *
 * Implementation note:
 * Duration and easing constants are used with react-native-reanimated v3.
 * withTiming(value, { duration, easing }) for most animations.
 * withSpring(value, config) for physics-based interactions.
 */

import { Easing } from 'react-native-reanimated';

// ─── Duration tokens ──────────────────────────────────────────────────────────

export const Duration = {
  /**
   * instant — 0ms
   * Used: State changes that should appear instantaneous (toggle icons)
   */
  instant: 0,

  /**
   * fast — 150ms
   * Used: Micro-interactions (button press tint, checkbox check, border focus)
   * Web: "transition: all 0.15s" on buttons and links
   */
  fast: 150,

  /**
   * normal — 250ms
   * Used: Icon swaps, colour transitions, tab indicator movement
   */
  normal: 250,

  /**
   * message — 400ms
   * Used: Chat message bubble entrance (msg-in keyframe from web demo)
   * Web: "animation: msg-in 0.4s ease-out forwards"
   */
  message: 400,

  /**
   * page — 600ms
   * Used: Page entrance fade-up (stagger-1/2/3/4 from web demo)
   * Web: "animation: fade-up 0.6s"
   */
  page: 600,

  /**
   * slow — 800ms
   * Used: Success banner entrance, skeleton shimmer cycle half
   */
  slow: 800,

  /**
   * typing — 1300ms
   * Used: Typing indicator full cycle (three dots)
   * Web: "animation: typing 1.3s infinite ease-in-out"
   */
  typing: 1300,

  /**
   * pulse — 1500ms
   * Used: Tool call pulsing dot (orange while running)
   * Web: "animation: pulse 1.5s infinite"
   */
  pulse: 1500,

  /**
   * shimmer — 1200ms
   * Used: Skeleton loading shimmer sweep
   */
  shimmer: 1200,

  /**
   * holdConfirm — 1000ms
   * Used: Press-and-hold confirm button fill animation
   * Gives user time to consciously commit before irreversible action (BRD R-010)
   */
  holdConfirm: 1000,

} as const;

// ─── Stagger delays ───────────────────────────────────────────────────────────
// For sequenced entrance animations (matches web demo stagger-1/2/3/4).

export const Stagger = {
  s1: 50,    // first element
  s2: 150,   // second element
  s3: 250,   // third element
  s4: 350,   // fourth element
  s5: 450,   // fifth element
} as const;

// ─── Easing presets ──────────────────────────────────────────────────────────
// react-native-reanimated Easing functions.

export const Ease = {
  /**
   * out — decelerates into position
   * Used for: entrances, appearing elements (mirrors ease-out from CSS)
   */
  out: Easing.out(Easing.cubic),

  /**
   * in — accelerates out of position
   * Used for: exits, disappearing elements
   */
  in: Easing.in(Easing.cubic),

  /**
   * inOut — accelerates then decelerates
   * Used for: progress fills, shimmer sweeps
   */
  inOut: Easing.inOut(Easing.cubic),

  /**
   * linear — constant velocity
   * Used for: pulse opacity, shimmer position
   */
  linear: Easing.linear,

  /**
   * spring — physics-based (use withSpring, not withTiming)
   * Config reference only
   */
  springConfig: {
    damping:   18,
    stiffness: 200,
    mass:      0.8,
    overshootClamping: false,
  },

  /**
   * springSnappy — faster spring for button press feedback
   */
  springSnappy: {
    damping:   22,
    stiffness: 350,
    mass:      0.6,
    overshootClamping: true,
  },

} as const;

// ─── Named animation presets ──────────────────────────────────────────────────
// Reference configs for the most-used animations.
// These document intent; components implement them using reanimated hooks.

export const AnimationPreset = {
  /**
   * messageEnter
   * From: web demo msg-in keyframe
   * Motion: fade in + rise 8px, 400ms ease-out
   * Used: Every chat bubble entering the conversation
   */
  messageEnter: {
    from: { opacity: 0, translateY: 8 },
    to:   { opacity: 1, translateY: 0 },
    duration: Duration.message,
    easing:   'out',
  },

  /**
   * pageEnter
   * From: web demo fade-up keyframe
   * Motion: fade in + rise 16px, 600ms ease-out
   * Used: Screen content on initial render, staggered by Stagger.s1-s4
   */
  pageEnter: {
    from: { opacity: 0, translateY: 16 },
    to:   { opacity: 1, translateY: 0 },
    duration: Duration.page,
    easing:   'out',
  },

  /**
   * typingDot
   * From: web demo typing keyframe
   * Motion: translateY bounce 0 → -4px → 0, opacity 0.4 → 1 → 0.4
   * Stagger: 150ms between each of 3 dots
   * Used: ThinkingIndicator component — always visible while AI is responding
   */
  typingDot: {
    translateY: { from: 0, peak: -4, to: 0 },
    opacity:    { from: 0.4, peak: 1, to: 0.4 },
    duration:   Duration.typing,
    stagger:    150,
  },

  /**
   * toolCallPulse
   * From: web demo pulse keyframe
   * Motion: opacity 1 → 0.3 → 1, 1.5s infinite
   * Used: Orange dot on ToolExecutionCard while tool is running
   * Transition: stops when status becomes 'done', dot turns green
   */
  toolCallPulse: {
    opacity: { from: 1, peak: 0.3, to: 1 },
    duration: Duration.pulse,
  },

  /**
   * buttonPress
   * Motion: scale 1 → 0.96, spring snap-back
   * Used: All Pressable button components
   */
  buttonPress: {
    scale: { pressed: 0.96, resting: 1 },
    duration: Duration.fast,
  },

  /**
   * holdConfirm
   * Motion: progress fill 0 → 1 over holdConfirm duration
   * Used: Confirm & Place button — linear fill, haptic on completion
   */
  holdConfirm: {
    progress: { from: 0, to: 1 },
    duration: Duration.holdConfirm,
    easing:   'linear',
  },

  /**
   * shimmer
   * Motion: translateX sweeps across element (-width → +width), 1.2s infinite
   * Used: Skeleton loading components
   */
  shimmer: {
    translateX: { from: -1, to: 1 },  // relative to element width
    duration:   Duration.shimmer,
    easing:     'inOut',
  },

  /**
   * toast
   * Motion: slide in from bottom (translateY: 80 → 0), fade in
   * Used: Toast and snackbar notifications
   */
  toastEnter: {
    from: { opacity: 0, translateY: 80 },
    to:   { opacity: 1, translateY: 0 },
    duration: Duration.normal,
    easing:   'out',
  },

  /**
   * bottomSheetEnter
   * Motion: slide up from bottom of screen
   * Used: BottomSheet component
   */
  bottomSheetEnter: {
    from: { translateY: '100%' },
    to:   { translateY: 0 },
    duration: Duration.normal,
    easing:   'out',
  },

  /**
   * pollVote
   * Motion: avatar spring-scales in when a vote is received
   * Used: PollCard — real-time vote receipt
   */
  pollVote: {
    scale: { from: 0.5, to: 1 },
    springConfig: 'springSnappy',
  },

} as const;

export type AnimationPresetKey = keyof typeof AnimationPreset;
