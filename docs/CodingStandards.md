# Coding Standards

## TypeScript

- **Strict mode enabled.** No `@ts-ignore`, no `// @ts-expect-error` without a comment explaining why.
- Prefer `type` over `interface` for union types and aliases; prefer `interface` for object shapes that may be extended.
- Use `as const` for literal arrays and objects that must not be widened.
- Use `satisfies` operator for type-checking object literals without losing narrowing.
- Always use `type` imports: `import type { Foo } from './Foo'` (ESLint enforces this).

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component | PascalCase | `RestaurantCard` |
| Hook | `use` prefix + camelCase | `useOrderHistory` |
| Store | `use` prefix + PascalCase + `Store` | `useOrderStore` |
| Service interface | `I` prefix + PascalCase | `IOrderService` |
| Enum | PascalCase members | `OrderStatus.Delivered` |
| Constant | SCREAMING_SNAKE | `FOOD_CART_CAP_RUPEES` |
| Type alias | PascalCase | `SplitStatus` |
| File | Same as default export | `OrderCard.tsx` |
| Mock data | kebab-case.json | `restaurants.json` |

## Component Rules

1. **No `React.FC`** — use function declaration with typed props interface.
2. **One component per file.** Sub-components used only within a file may live in the same file.
3. **Props interfaces are local** unless used by multiple components, then move to `types/`.
4. **No default export for hooks or utilities** — named exports only.
5. Screens in `app/` use default exports (required by Expo Router).
6. **Never use RN `<Text>` directly** — always use the `<Text>` primitive from `src/components/primitives/Text.tsx`.
7. **Never hardcode colours** — always use `colors.X.Y` from `useAppTheme()`.

## StyleSheet Rules

- Use `StyleSheet.create()` outside the component function (evaluated once, not on each render).
- Theme-dependent styles (colours, fonts) are applied inline: `style={[styles.container, { backgroundColor: colors.background.primary }]}`.
- Never use `NativeWind` utility classes inside `StyleSheet.create()`.
- Minimum touch target: 44×44pt. Enforce with `hitSlop` or explicit width/height.

## Import Order

ESLint enforces this order (enforced by `eslint-plugin-import`):
1. `react` / `react-native` (built-ins)
2. Third-party packages (`@tanstack/react-query`, `zustand`, etc.)
3. Internal aliases (`@components`, `@store`, `@utils`, etc.)
4. Relative imports (`./Foo`, `../Bar`)

## Commit Messages

Conventional Commits format. Enforced by Husky `commit-msg` hook:
```
feat(chat): add AI message streaming
fix(order): prevent duplicate order on retry
docs(readme): add development setup
refactor(store): flatten chat store actions
```

Types: `feat | fix | docs | style | refactor | perf | test | chore | revert | build | ci`

## No Comment Rules (Phase 2 Convention)

- Write no comments unless the WHY is non-obvious
- No JSDoc for simple getters/setters
- No "what" comments — the code should explain itself
- Do comment: workarounds for library bugs, BRD constraint references, platform differences

## Testing (Phase 4+)

- Unit tests for: utilities, store actions, formatters
- Integration tests for: service implementations
- No mocks for integration tests (BRD lesson from docs)
- Component snapshot tests for primitive components only
