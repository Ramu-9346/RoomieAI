# RoomieAI Design System

## Overview

The RoomieAI design system is a production-grade token + component library for the React Native mobile app. It encodes all visual decisions from the web demo (`RoomiAI.html`) into typed, themeable, reanimated-powered building blocks.

**Stack:** React Native + Expo · `react-native-reanimated` v3 · `@expo/vector-icons` (Feather + MaterialCommunityIcons) · TypeScript

---

## Directory Structure

```
src/
├── theme/
│   ├── colors.ts         ← colour tokens + dark mode
│   ├── typography.ts     ← font families + type scale
│   ├── spacing.ts        ← 8-point grid
│   ├── radius.ts         ← border radius tokens
│   ├── shadow.ts         ← elevation (iOS + Android)
│   ├── animation.ts      ← duration, easing, spring configs, presets
│   ├── icons.ts          ← semantic icon name map
│   ├── zIndex.ts         ← stacking layer system
│   ├── opacity.ts        ← opacity tokens
│   └── index.ts          ← composed theme + useTheme() hook
└── components/
    ├── primitives/        ← Text, Button, Avatar, Badge, Chip, Divider
    ├── inputs/            ← TextInput, SearchBar, OTPInput, Checkbox, Radio, Switch, SegmentControl
    ├── cards/             ← RestaurantCard, OrderCard, PollCard, MemberCard, PaymentCard, GroceryCard, NotificationCard, HistoryCard
    ├── navigation/        ← BottomTabBar, TopAppBar, FloatingActionButton
    ├── feedback/          ← Toast, Loading, Skeleton, BottomSheet, ConfirmDialog, SuccessBanner, ErrorBanner
    ├── ai/                ← AIMessageBubble, UserMessageBubble, ThinkingIndicator, ToolExecutionCard, AIStatusTimeline, ChatInput
    └── index.ts           ← root barrel export

docs/
├── DesignSystem.md        ← this file
├── ComponentLibrary.md    ← component API reference
├── ThemeGuide.md          ← token reference
└── DesignPrinciples.md    ← product design philosophy
```

---

## Colour Philosophy

### Base palette
- **Cream** `#FBF7F0` — all screen backgrounds (warm, not white)
- **Warm ink** `#1A1713` — primary text, dark surfaces (not pure black)
- **Orange-deep** `#C65E00` — RoomieAI CTA colour
- **Swiggy orange** `#FF5200` — reserved exclusively for Swiggy wordmarks (BRD C-025)

### Semantic layers
All components use semantic tokens (`colors.background.primary`, `colors.text.muted`, etc.) — never raw hex values. The semantic layer has a `light` and `dark` variant; `useTheme()` resolves the correct one via `useColorScheme()`.

---

## Typography System

Three-font approach:
- **Fraunces** (variable serif) — AI voice, editorial moments, warmth
- **Geist** (sans-serif) — everyday body text, UI labels
- **Geist Mono** — numbers, prices, timestamps, status metadata

16 pre-built `TextStyle` objects cover every use case from `displayXL` (48pt hero) to `monoSmall` (11pt timestamp). The `<Text>` primitive component is the only way to render text — it handles font-family switching for italic/bold variants.

---

## Spacing System

8-point grid. Token names are `sp{value}` (e.g., `sp16 = 16pt`). All padding, margin, and gap values must use these tokens.

---

## Animation Principles

All animations use `react-native-reanimated` v3 worklets:
- **Spring** for interactive elements (buttons, thumb, hold-confirm fill)
- **Timing + Easing** for enter/exit transitions
- **withRepeat + withSequence** for loading states (dots, shimmer, pulse)
- Hold-confirm: `withTiming(1, { duration: 1000 })` — the 1s fill is the UX feature
- Never animate on the JS thread (`useAnimatedStyle` + `useSharedValue` always)

---

## Icon System

Primary set: **Feather** (`@expo/vector-icons/Feather`) — thin stroke, consistent weight, 24px standard.
Secondary: **MaterialCommunityIcons** — used only for `upi` icon (no Feather equivalent).

All icon names are mapped semantically in `src/theme/icons.ts`. Use the map instead of raw strings to catch renames at compile time.

---

## Dark Mode

`darkTheme` is exported from `src/theme/index.ts`. `useTheme()` auto-selects based on the device colour scheme. All dark mode colours are pre-defined in `colors.ts`. No component-level `if (isDark)` logic needed — semantic tokens switch automatically.

---

## Platform Handling

- **Shadows**: `makeShadow()` helper in `shadow.ts` generates both iOS shadow properties and Android `elevation`. Spread `...shadows.card` — never write raw shadow styles.
- **Safe area**: All fixed-position components (BottomTabBar, TopAppBar, ChatInput, Toast) use `useSafeAreaInsets()` from `react-native-safe-area-context`.
- **OTP input**: Single hidden RNTextInput + visual boxes (not native component) for cross-platform consistency.

---

## Accessibility

- All interactive components have `accessibilityRole`
- `accessibilityLabel` on every icon-only button
- `accessibilityState={{ disabled, selected, expanded }}` on relevant components
- `accessibilityLiveRegion` on Toast and banners
- Minimum touch target: 44×44pt (all buttons enforce this via `hitSlop` or explicit sizing)

---

## What This System Does NOT Include

By design, Phase 2 excludes:
- Screen-level layouts and navigation stacks
- Business logic and state management
- API clients or MCP server integration
- Mock data or fixtures
- React Navigation configuration
- Expo Router setup

These belong to Phase 3 (Feature Implementation). This system provides all the building blocks; Phase 3 assembles them into screens.
