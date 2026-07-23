/**
 * ThemeStore — user theme preference (light/dark/system).
 * Persisted to AsyncStorage via Zustand persist middleware.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ThemeScheme = 'light' | 'dark' | 'system';

interface ThemeState {
  scheme: ThemeScheme;

  // Actions
  setScheme: (scheme: ThemeScheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    immer((set) => ({
      scheme: 'system' as ThemeScheme,

      setScheme: (scheme) => {
        set((state) => {
          state.scheme = scheme;
        });
      },
    })),
    {
      name: '@roomieai:theme',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
