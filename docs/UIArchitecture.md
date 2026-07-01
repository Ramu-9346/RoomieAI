# UI Architecture

## Layer Model

```
┌───────────────────────────────────────────────────────────────┐
│                         Screens (app/)                        │
│   Compose components. Own navigation. Hold zero visual logic. │
│                              ↓                                │
│               Component Library (src/components/)             │
│   Receive everything via props. No data fetching.             │
│                              ↓                                │
│                  Design Tokens (src/theme/)                   │
│   Single source of truth for color, space, type, radius.      │
└───────────────────────────────────────────────────────────────┘
```

## Component Taxonomy

### Tier 1: Design Tokens (theme/)
Colors, typography, spacing, radius, shadows, animation constants.
**Rule:** Never use a hardcoded value in a component. Everything comes from `useTheme()`.

### Tier 2: Primitives (primitives/)
`Text`, `Button`, `Avatar`, `Badge`, `Chip`, `Divider`.
- Build on RN core only
- No dependency on other components
- All variants handled by a single prop (`variant`, `size`)

### Tier 3: Layout (layout/)
`ScreenContainer`, `SafeAreaLayout`, `Section`, `CardContainer`, `Grid`, `Spacer`, `StickyHeader`, `KeyboardAvoidView`.
- Build on RN core + Primitives
- No domain knowledge

### Tier 4: Compound Components
Typography wrappers, form controls, cards, navigation, feedback, AI components.
- Build on Tier 2 and Tier 3
- May combine multiple Tier 2 components
- Still no domain knowledge (everything via props)

### Tier 5: Feature Composites (future — features/)
Screen-specific components that know about a domain (OrderConfirmationFlow, ChatComposerWithAI).
- Not in Phase 4 — belongs in Phase 5 feature modules

---

## Theme Integration

```tsx
function MyComponent() {
  const { colors, spacing, radius, shadows } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background.elevated,
        borderRadius: radius.xxl,
        padding: spacing.cardPaddingMd,
        ...shadows.card,
      }}
    />
  );
}
```

**Golden rules:**
- `colors.background.primary` for the app background (cream #FBF7F0)
- `colors.background.elevated` for cards that sit on the cream background (white)
- `colors.text.primary` for headlines
- `colors.text.secondary` for body
- `colors.text.muted` for timestamps, metadata
- `colors.primary.default` for CTAs, active states (orange-deep #C65E00)
- Never use `colors.swiggy` (#FF5200) for anything except Swiggy wordmarks (BRD C-025)

---

## Animation Philosophy

All animations follow the Phase 2 duration constants:

| Duration | Value | Used for |
|---|---|---|
| `fast` | 150ms | Micro-interactions, focus rings, checkbox |
| `normal` | 250ms | Icon swaps, color transitions, tab moves |
| `message` | 400ms | Chat bubble entrance |
| `page` | 600ms | Screen content entrance |
| `holdConfirm` | 1000ms | Hold-to-confirm fill (BRD R-010) |

**Spring physics for interactivity** (button press, card lift):
```ts
withSpring(0.96, { damping: 22, stiffness: 350 })  // Ease.springSnappy
```

**Timing with easing for entrances** (modals, content):
```ts
withTiming(1, { duration: Duration.message, easing: Ease.out })
```

---

## Component Composition in Chat

The Chat screen assembles AI, card, and layout components together:

```
ChatList
  ├── AIMessageBubble (showAvatar, message)
  │   ├── Avatar ("R")
  │   ├── Text (body)
  │   └── [children] — attached cards
  │       ├── RestaurantCard × 3
  │       └── QuickReplyChips
  │
  ├── ThinkingIndicator (while AI is processing)
  │
  ├── UserMessageBubble (message, timestamp)
  │
  └── AIMessageBubble (with CartSummaryCard attached)
      └── CartSummaryCard
          └── HoldToConfirmButton (onHoldComplete)
```

None of these components know about Zustand stores, React Query, or API calls.
The Chat screen (Phase 5) wires them to `useChatStore` and `ChatService`.

---

## Dark Mode

Dark mode is fully prepared in Phase 2 tokens and Phase 4 components.

Activation:
1. User toggles in settings → `useThemeStore().setScheme('dark')`
2. `useAppTheme()` hook resolves scheme against `useColorScheme()`
3. Returns `darkTheme` tokens if dark, `theme` tokens if light
4. All components re-render with correct colors automatically

Components MUST NOT hardcode colors. All colors come from `useTheme()`.
Dark theme token differences: background inverts to `#1A1713`, text inverts to `#FBF7F0`, primary orange becomes `#FC8019` (brighter on dark).

---

## File Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component | PascalCase.tsx | `RestaurantCard.tsx` |
| Hook | useCamelCase.ts | `usePressScale.ts` |
| Index barrel | index.ts | `index.ts` |
| Types local to a component | Inline interface | `interface Props {}` |
| Types shared across components | `types/` folder | `types/common.ts` |

---

## Adding a New Component

1. Create `src/components/[folder]/ComponentName.tsx`
2. Export it from `src/components/[folder]/index.ts`
3. Verify it's exported from `src/components/index.ts`
4. It's now accessible as `import { ComponentName } from '@components'`

Checklist:
- [ ] Uses `useTheme()` for all colors, spacing, radius
- [ ] Has `style?: ViewStyle` prop for override
- [ ] Has `accessibilityRole` and `accessibilityLabel`
- [ ] Press feedback via Reanimated spring scale
- [ ] Loading state handled (spinner or skeleton)
- [ ] Disabled state handled (opacity.disabled)
- [ ] Works in both light and dark mode
- [ ] No hardcoded strings or data
