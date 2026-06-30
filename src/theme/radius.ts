/**
 * RoomieAI Border Radius System
 *
 * Extracted directly from the web demo's component border-radius values.
 * The radius scale communicates element hierarchy: larger radius = more
 * prominent / interactive element.
 *
 * Rules:
 * 1. Never use a hardcoded radius value in a component
 * 2. Match the semantic token to the component type, not the pixel value
 * 3. The pill radius is for status badges and category chips only
 */

export const radius = {
  /**
   * none — 0px
   * Used: Dividers, bottom sheet drag handle, full-width elements
   */
  none: 0,

  /**
   * xs — 4px
   * Used: UPI action chips inside split cards, micro badges
   * Web reference: .split-upi (4px), veg indicator box (2px border-radius)
   */
  xs: 4,

  /**
   * sm — 8px
   * Used: Buttons, cart item rows, icon containers in headers
   * Web reference: .btn (8px), .cart-item (6px rounded up)
   */
  sm: 8,

  /**
   * md — 10px
   * Used: Activity rows, tool call cards, reset button
   * Web reference: .activity-row (10px), .tool-call (10px)
   */
  md: 10,

  /**
   * lg — 12px
   * Used: Inner data cards (poll card, split card, cart card, dineout option)
   * Web reference: .poll-card (12px), .splits-card (12px), .cart-card (12px)
   */
  lg: 12,

  /**
   * xl — 14px
   * Used: Scenario cards, order cards, dineout option cards
   * Web reference: .scenario (14px), .order-card (14px)
   */
  xl: 14,

  /**
   * xxl — 18px
   * Used: Primary surface cards (flat card, chat window, main feature cards)
   * Web reference: .flat-card (18px), .chat-window (18px)
   */
  xxl: 18,

  /**
   * xxxl — 24px
   * Used: Bottom sheet top corners, large modal surfaces
   * Not directly in web demo — extrapolated for mobile sheet corners
   */
  xxxl: 24,

  /**
   * pill — 999px
   * Used: Status badges ("LIVE", "DEMO"), category chips, member status dots
   * Web reference: .demo-pill (100px), .restaurant-rating (5px on small),
   *   .badge (100px), .agent-dot glow (100px)
   * Note: 999px is equivalent to 100px on React Native — never clips square elements
   */
  pill: 999,

} as const;

export type RadiusKey = keyof typeof radius;
