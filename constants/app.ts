/**
 * App-wide constants.
 * Business rules from BRD are marked with their constraint ID.
 */

// ─── BRD Business Rules ────────────────────────────────────────────────────────
export const FOOD_CART_CAP_RUPEES    = 1000;  // BRD C-002: max food cart per order
export const SWIGGY_TOKEN_TTL_DAYS   = 5;     // BRD C-004: Swiggy token valid 5 days
export const HOLD_CONFIRM_DURATION_MS = 1000; // BRD R-010: hold-to-confirm press time
export const COD_ONLY                = true;  // BRD C-001: cash on delivery only

// ─── Poll config ───────────────────────────────────────────────────────────────
export const DEFAULT_POLL_TIMEOUT_MINUTES = 5;
export const MAX_POLL_OPTIONS            = 5;

// ─── Members ───────────────────────────────────────────────────────────────────
export const MAX_FLAT_MEMBERS = 8;
export const MEMBER_COLOURS   = [
  '#E8B4A0', // terracotta blush
  '#A8C8A0', // sage green
  '#A0B8D8', // dusty blue
  '#C8A8D8', // lavender
  '#E8D0A0', // warm sand
  '#A8D8C8', // teal mint
  '#D8A8A8', // rose
  '#B8C8A8', // olive
] as const;

// ─── Chat ──────────────────────────────────────────────────────────────────────
export const MAX_CHAT_MESSAGE_LENGTH = 2000;
export const CHAT_HISTORY_PAGE_SIZE  = 30;

// ─── Pagination ────────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;

// ─── DPDP compliance (Indian Data Protection) ──────────────────────────────────
export const DATA_RETENTION_DAYS = 30;

// ─── Swiggy ────────────────────────────────────────────────────────────────────
export const SWIGGY_BRAND_COLOUR = '#FF5200'; // NEVER use for RoomieAI UI (BRD C-025)
export const ROOMIEAI_PRIMARY    = '#C65E00'; // RoomieAI CTA colour

// ─── App ──────────────────────────────────────────────────────────────────────
export const APP_NAME    = 'RoomieAI';
export const APP_VERSION = '1.0.0';
export const SUPPORT_EMAIL = 'support@roomieai.in';
