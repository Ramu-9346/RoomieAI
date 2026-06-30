# RoomieAI Design Principles

## 1. Warmth Over Sterility

RoomieAI lives in shared homes, not corporate dashboards. Every surface defaults to cream (`#FBF7F0`), not white. Text is warm ink (`#1A1713`), not pure black. Shadows carry a warm tint, not cool grey. The product should feel like it belongs on a kitchen table, not a trading floor.

**In practice:** Never use `#FFFFFF` or `#000000`. Always pull from the palette.

---

## 2. Trust is Earned, Not Assumed

This AI handles real money and food preferences. The UI must show every reasoning step — tool calls, status updates, poll results, payment splits — not hide them behind a loading spinner. Transparency = trust.

**In practice:** Always render `ToolExecutionCard` for MCP calls. Never silently execute. Show `AIStatusTimeline` for multi-step flows.

---

## 3. The Hold is a Feature

Placing a group order is irreversible. The `holdConfirm` button pattern (1s press-and-hold) is a deliberate friction point. It prevents accidental taps, creates a moment of intentional confirmation, and communicates weight. Do not shortcut it to a regular button under pressure.

**In practice:** The "Confirm & Place Order" button is always `variant="holdConfirm"`. No exceptions per BRD R-010.

---

## 4. Members are People, Not Usernames

The colour-coded member identity system (8 pastel ring colours, Fraunces italic initials) exists so that at a glance, you know which items Priya ordered and what Akash owes. Avatars and member colours must be consistent throughout a session.

**In practice:** `memberIndex` is the single source of truth for identity colour. Never assign colours randomly or by name hash.

---

## 5. Mono for Data, Serif for Warmth, Sans for Body

Three fonts, three registers:
- **Geist** (sans): everyday body text, labels, UI prose — readable and neutral
- **Fraunces** (serif): AI voice, editorial moments, prices, suggested items — personality and warmth
- **Geist Mono**: numbers, amounts, timestamps, status codes — legibility at a glance

**In practice:** Prices always use `mono` variants. AI messages use `body` (Geist). Headings and key CTA labels may use Fraunces `title` or `display`.

---

## 6. Orange is Swiggy's, Not Ours

`#FF5200` is Swiggy's brand orange. BRD constraint C-025 reserves it exclusively for Swiggy wordmarks. RoomieAI's CTA colour is `#C65E00` (orange-deep) — visually related, clearly distinct. Confusing the two would create false Swiggy affiliation.

**In practice:** The primary button background is `colors.primary.default` (`#C65E00`). Never hardcode `#FF5200`.

---

## 7. Safe at Every Step

All PII must be scrubbed before reaching the Claude API. Payment amounts, phone numbers, and addresses displayed in the UI must never be echoed into LLM prompts verbatim. The UI layer doesn't enforce this — it's the API boundary concern — but UI designers must not build flows that encourage raw PII entry into the chat field.

**In practice:** Phone number collection uses the `OTPInput` + verification flow, not a free-text chat message.

---

## 8. Every Card is a Contract

Cards (RestaurantCard, OrderCard, PaymentCard, GroceryCard) represent AI-generated structured data that members will act on with real money. Their layout and information hierarchy must never be changed for aesthetic reasons alone. What you see is what gets ordered.

**In practice:** Card field order (name → meta → price → CTA) is fixed. Do not reorder for visual balance.
