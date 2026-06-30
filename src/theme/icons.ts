/**
 * RoomieAI Icon System
 *
 * Primary library: Feather (from @expo/vector-icons)
 * Secondary library: MaterialCommunityIcons (from @expo/vector-icons)
 *   → Only when Feather doesn't have the required icon
 *
 * Why Feather:
 * - Minimal, thin-stroke style (1.5px stroke weight at 24px)
 * - 287 icons — covers all RoomieAI needs
 * - Consistent optical weight — matches the editorial brand personality
 * - No filled/outlined inconsistency (all icons are outlined, which pairs
 *   well with the serif typography and cream palette)
 *
 * Why NOT MaterialIcons / Ionicons:
 * - Mixed filled and outlined variants cause visual inconsistency
 * - Heavier visual weight clashes with the premium editorial look
 * - Ionicons has platform-variant logos (iOS vs Android) which creates
 *   an inconsistent brand experience
 *
 * Rules:
 * 1. Never mix icon styles — always Feather first
 * 2. Never use emoji as icons (except in legacy web demo compatibility)
 * 3. Always reference icon names through this file (not hardcoded strings)
 * 4. Size always comes from IconSize tokens
 * 5. Color always comes from the theme colors system
 */

// ─── Icon size scale ──────────────────────────────────────────────────────────

export const IconSize = {
  /**
   * xs — 12px
   * Used: Inline icons within mono labels, tiny status indicators
   */
  xs: 12,

  /**
   * sm — 16px
   * Used: Inline icons in body text, tab bar icons, button icons, back arrows
   */
  sm: 16,

  /**
   * md — 20px
   * Used: Standard action icons, search icon, form icons
   */
  md: 20,

  /**
   * lg — 24px
   * Used: Primary navigation icons (Feather's base design size)
   */
  lg: 24,

  /**
   * xl — 32px
   * Used: Feature icons in cards (cart icon, restaurant icon header)
   */
  xl: 32,

  /**
   * xxl — 40px
   * Used: Dineout restaurant icon, empty state icons
   */
  xxl: 40,

  /**
   * display — 48px
   * Used: Onboarding illustrations, large empty state markers
   */
  display: 48,

} as const;

// ─── Icon name map ────────────────────────────────────────────────────────────
// Maps semantic UI roles to Feather icon names.
// All names are valid @expo/vector-icons Feather icon identifiers.

export const Icons = {

  // ── Navigation & actions ──────────────────────────────────────────────────
  back:          'arrow-left',
  forward:       'arrow-right',
  close:         'x',
  menu:          'menu',
  more:          'more-horizontal',
  moreVertical:  'more-vertical',
  externalLink:  'external-link',
  share:         'share-2',
  copy:          'copy',
  refresh:       'refresh-cw',
  settings:      'settings',
  search:        'search',
  clear:         'x-circle',
  filter:        'sliders',

  // ── Confirmation & state ──────────────────────────────────────────────────
  check:         'check',
  checkCircle:   'check-circle',
  alertCircle:   'alert-circle',
  alertTriangle: 'alert-triangle',
  info:          'info',
  help:          'help-circle',

  // ── Add / Remove ──────────────────────────────────────────────────────────
  add:           'plus',
  addCircle:     'plus-circle',
  remove:        'minus',
  removeCircle:  'minus-circle',
  trash:         'trash-2',
  edit:          'edit-2',

  // ── Tab bar icons ─────────────────────────────────────────────────────────
  tabHome:       'home',
  tabChat:       'message-circle',
  tabHistory:    'clock',
  tabFlat:       'users',
  tabProfile:    'user',

  // ── Food / Ordering domain ────────────────────────────────────────────────
  food:          'package',     // food delivery
  grocery:       'shopping-bag', // instamart
  dineout:       'map-pin',    // restaurant reservation
  cart:          'shopping-cart',
  order:         'clipboard',
  delivery:      'truck',
  restaurant:    'home',        // restaurant building

  // ── People ────────────────────────────────────────────────────────────────
  user:          'user',
  users:         'users',
  userPlus:      'user-plus',
  userMinus:     'user-minus',

  // ── Chat / AI ────────────────────────────────────────────────────────────
  chat:          'message-circle',
  send:          'send',
  mic:           'mic',
  micOff:        'mic-off',
  bot:           'cpu',           // AI agent indicator

  // ── Payment / Finance ─────────────────────────────────────────────────────
  payment:       'credit-card',
  split:         'git-branch',    // represents splitting/branching
  rupee:         'dollar-sign',   // closest Feather equivalent
  upi:           'zap',           // quick payment

  // ── Status ────────────────────────────────────────────────────────────────
  live:          'radio',
  online:        'wifi',
  offline:       'wifi-off',
  pending:       'clock',
  loading:       'loader',

  // ── Misc ──────────────────────────────────────────────────────────────────
  star:          'star',
  starFill:      'star',          // filled variant — use with color fill
  location:      'map-pin',
  calendar:      'calendar',
  bell:          'bell',
  bellOff:       'bell-off',
  eye:           'eye',
  eyeOff:        'eye-off',
  lock:          'lock',
  unlock:        'unlock',
  link:          'link',
  arrowUp:       'arrow-up',
  arrowDown:     'arrow-down',
  chevronRight:  'chevron-right',
  chevronDown:   'chevron-down',
  chevronUp:     'chevron-up',

  // ── Icons requiring MaterialCommunityIcons ────────────────────────────────
  // Feather does not have these; import from MaterialCommunityIcons when used
  vegIndicator:     'checkbox-blank',      // MCIcons — veg square (green)
  nonVegIndicator:  'checkbox-blank',      // MCIcons — non-veg square (red)
  whatsapp:         'whatsapp',            // MCIcons
  upiLogo:          'bank-transfer',       // MCIcons

} as const;

export type IconName = keyof typeof Icons;
export type IconSizeKey = keyof typeof IconSize;
