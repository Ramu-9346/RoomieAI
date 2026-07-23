// ── Phase 2: Primitives ───────────────────────────────────────────────────────
export * from './primitives';

// ── Phase 2: Inputs ───────────────────────────────────────────────────────────
export * from './inputs';

// ── Phase 2+4: Cards ──────────────────────────────────────────────────────────
export * from './cards';

// ── Phase 2+4: Navigation ─────────────────────────────────────────────────────
export * from './navigation';

// ── Phase 2+4: Feedback ───────────────────────────────────────────────────────
export * from './feedback';

// ── Phase 2+4: AI Components ──────────────────────────────────────────────────
export * from './ai';

// ── Phase 4: Layout ───────────────────────────────────────────────────────────
export * from './layout';

// ── Phase 4: Typography ───────────────────────────────────────────────────────
export * from './typography';

// ── Phase 4: Buttons ──────────────────────────────────────────────────────────
export * from './buttons';

// ── Phase 4: Avatars ──────────────────────────────────────────────────────────
export * from './avatars';

// ── Phase 4: Badges ───────────────────────────────────────────────────────────
// StatusBadge collides with primitives/Badge's StatusBadge (different props —
// order-lifecycle status vs. generic type/label); disambiguated here.
export {
  StatusBadge as OrderStatusBadge,
  CountBadge,
  NotificationBadge,
  RoleBadge,
  DiscountBadge,
  LiveBadge,
} from './badges';

// ── Phase 4: Forms ────────────────────────────────────────────────────────────
export * from './forms';

// ── Phase 4: Empty States ─────────────────────────────────────────────────────
export * from './emptyStates';

// ── Phase 4: Loaders ──────────────────────────────────────────────────────────
export * from './loaders';

// ── Phase 4: Lists ────────────────────────────────────────────────────────────
export * from './lists';

// ── Phase 4: Icons ────────────────────────────────────────────────────────────
export * from './icons';

// ── Phase 4: Animations ───────────────────────────────────────────────────────
export * from './animations';

// ── Phase 4: Shared ───────────────────────────────────────────────────────────
// VegIndicator collides with primitives/Badge's VegIndicator (different props —
// 5-way dietary type vs. boolean isVeg); disambiguated here.
export {
  VegIndicator as DietaryIndicator,
  PriceDisplay,
  OrderStatusDot,
  RatingStars,
} from './shared';
