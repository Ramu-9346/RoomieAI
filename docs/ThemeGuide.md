# RoomieAI Theme Guide

All theme tokens live in `src/theme/`. Import them via `useTheme()`:

```ts
import { useTheme } from '../theme';
const { colors, typography, spacing, radius, shadows, zIndex, opacity } = useTheme();
```

---

## Colours (`src/theme/colors.ts`)

### Palette philosophy
The raw `palette` object contains all colour values. Semantic layers (`colors.light`, `colors.dark`) map intents to palette values. **Never reference `palette` directly in components — always go through the semantic layer.**

### Key semantic tokens

| Token | Light value | Purpose |
|---|---|---|
| `colors.background.primary` | `#FBF7F0` | All screen backgrounds |
| `colors.background.elevated` | `#FFFFFF` | Cards, inputs, elevated surfaces |
| `colors.background.secondary` | `#F3EDE3` | Input fill, secondary surfaces |
| `colors.text.primary` | `#1A1713` | Body text, headings |
| `colors.text.secondary` | `#3D3830` | Secondary labels |
| `colors.text.muted` | `#8C8070` | Placeholders, timestamps, captions |
| `colors.primary.default` | `#C65E00` | CTA buttons, active states |
| `colors.primary.surface` | `#FFF0E0` | Primary tint backgrounds |
| `colors.success.default` | `#2E7D4E` | Order success, veg indicator |
| `colors.error.default` | `#C0392B` | Errors, non-veg indicator |
| `colors.border.default` | `#E8E0D4` | Card borders, dividers |
| `colors.border.strong` | `#C8B8A0` | Focus rings, active borders |

### Member colours
`colors.members` is an array of 8 pastel colours for member identity rings.
Access by `colors.members[memberIndex % 8]`.

### Dark mode
`darkTheme` is exported from `src/theme/index.ts`. `useTheme()` automatically selects based on `useColorScheme()`. All components should use semantic tokens only — they switch automatically.

---

## Typography (`src/theme/typography.ts`)

### Font families
```ts
FontFamily.frauncesMedium    // Fraunces_500Medium
FontFamily.frauncesItalic    // Fraunces_500Medium_Italic
FontFamily.geistRegular      // Geist_400Regular
FontFamily.geistMedium       // Geist_500Medium
FontFamily.geistSemiBold     // Geist_600SemiBold
FontFamily.geistMono         // GeistMono_400Regular
FontFamily.geistMonoMedium   // GeistMono_500Medium
```

### Type scale
| Variant | Size | Family | Use |
|---|---|---|---|
| `displayXL` | 48 | Fraunces | Hero headings |
| `displayL` | 36 | Fraunces | Screen titles |
| `heading` | 28 | Fraunces | Section headings |
| `title` | 20 | Fraunces | Card titles |
| `subtitle` | 17 | Geist SemiBold | Subsection labels |
| `body` | 15 | Geist | Body copy |
| `bodyMedium` | 15 | Geist Medium | Emphasised body |
| `caption` | 13 | Geist | Secondary labels |
| `captionItalic` | 13 | Fraunces Italic | AI personality text |
| `button` | 14 | Geist SemiBold | Button labels |
| `eyebrow` | 11 | Geist SemiBold | Section eyebrows (all caps) |
| `mono` | 14 | Geist Mono | Prices, amounts |
| `monoMedium` | 14 | Geist Mono Medium | Prominent prices |
| `monoSmall` | 11 | Geist Mono | Timestamps, metadata |

### Usage rule
Always use the `<Text>` primitive with a `variant` prop. **Never import React Native `<Text>` directly.**

---

## Spacing (`src/theme/spacing.ts`)

8-point grid. All spacing tokens are multiples of 4pt minimum.

```ts
spacing.sp2   // 2
spacing.sp4   // 4
spacing.sp6   // 6
spacing.sp8   // 8
spacing.sp10  // 10
spacing.sp12  // 12
spacing.sp14  // 14
spacing.sp16  // 16  ← pageHorizontal
spacing.sp20  // 20
spacing.sp24  // 24  ← cardPaddingLg
spacing.sp32  // 32
spacing.sp48  // 48
spacing.sp64  // 64
spacing.sp96  // 96
```

Named aliases: `spacing.pageHorizontal (16)`, `spacing.cardPaddingLg (24)`, `spacing.tabBarHeight (60)`, `spacing.chatInputHeight (56)`.

---

## Radius (`src/theme/radius.ts`)

| Token | Value | Use |
|---|---|---|
| `radius.none` | 0 | Flush edges |
| `radius.xs` | 4 | Chips, status dots |
| `radius.sm` | 8 | Small buttons, icon buttons |
| `radius.md` | 10 | Input fields |
| `radius.lg` | 12 | Standard cards |
| `radius.xl` | 14 | Elevated cards |
| `radius.xxl` | 18 | Dialogs, larger cards |
| `radius.xxxl` | 24 | User message bubbles |
| `radius.pill` | 999 | Badges, chips, pill buttons |

---

## Shadows (`src/theme/shadow.ts`)

Use `shadows.token` (returns platform-correct ViewStyle fragment):

```ts
// iOS: shadowColor/Offset/Opacity/Radius
// Android: elevation
...shadows.xs       // subtle card lift
...shadows.card     // standard card
...shadows.floating // FAB, bottom sheet
...shadows.modal    // dialogs
```

Shadow colour is always warm ink (`#1A1713`), never cool grey.

---

## Z-Index (`src/theme/zIndex.ts`)

| Layer | Value | Includes |
|---|---|---|
| `base` | 0 | Content |
| `card` | 10 | Cards, elevated content |
| `sticky` | 20 | Sticky headers |
| `chatInput` | 35 | Chat input bar |
| `header` | 50 | TopAppBar |
| `overlay` | 60 | Scrim backgrounds |
| `bottomSheet` | 70 | Bottom sheets |
| `modal` | 80 | Dialogs |
| `toast` | 90 | Toast notifications |
| `debug` | 999 | Dev overlays only |

---

## Opacity (`src/theme/opacity.ts`)

| Token | Value | Use |
|---|---|---|
| `full` | 1.0 | Normal state |
| `high` | 0.9 | Slightly reduced |
| `medium` | 0.7 | Secondary elements |
| `muted` | 0.5 | Inactive icons |
| `disabled` | 0.4 | Disabled inputs/buttons |
| `ghost` | 0.25 | Ghost elements |
| `overlay` | 0.5 | Modal scrim |
| `grain` | 0.025 | Texture overlay |

---

## Animation (`src/theme/animation.ts`)

Key presets from `AnimationPreset`:

- **`messageEnter`**: Chat bubble entrance (translateY + opacity)
- **`holdConfirm`**: 1000ms linear fill for hold-to-confirm
- **`typingDot`**: Bouncing dot (600ms, -6px up)
- **`toolCallPulse`**: Border opacity pulse while MCP call is pending
- **`shimmer`**: Skeleton loading sweep
- **`toastEnter`**: Slide up + fade in
- **`bottomSheetEnter`**: Spring from bottom

Spring config: `{ damping: 22, stiffness: 300 }` (standard). Use `Ease.springStiff` for snappy button presses.
