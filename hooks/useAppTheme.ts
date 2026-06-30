/**
 * useAppTheme — merges Zustand theme preference with system colour scheme.
 * Returns the Phase 2 theme tokens for the active scheme.
 *
 * Named useAppTheme to avoid conflict with Phase 2's useTheme() from src/theme.
 */

import { useColorScheme }  from 'react-native';
import { useThemeStore }   from '@store/themeStore';
import { theme, darkTheme } from '@theme';

export function useAppTheme() {
  const { scheme } = useThemeStore();
  const systemScheme = useColorScheme();

  const activeScheme = scheme === 'system'
    ? (systemScheme ?? 'light')
    : scheme;

  const tokens = activeScheme === 'dark' ? darkTheme : theme;

  return {
    ...tokens,
    isDark:       activeScheme === 'dark',
    scheme:       activeScheme,
    userScheme:   scheme,
  };
}
