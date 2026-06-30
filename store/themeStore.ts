/**
 * ThemeStore — user theme preference (light/dark/system).
 * Persisted to MMKV.
 */

import { create }       from 'zustand';
import { immer }        from 'zustand/middleware/immer';
import { LocalStorage } from '@utils/storage';

export type ThemeScheme = 'light' | 'dark' | 'system';

interface ThemeState {
  scheme: ThemeScheme;

  // Actions
  setScheme: (scheme: ThemeScheme) => void;
}

const THEME_KEY = '@roomieai:theme';

export const useThemeStore = create<ThemeState>()(
  immer((set) => ({
    scheme: (LocalStorage.get(THEME_KEY) as ThemeScheme) ?? 'system',

    setScheme: (scheme) => {
      LocalStorage.set(THEME_KEY, scheme);
      set((state) => { state.scheme = scheme; });
    },
  })),
);
