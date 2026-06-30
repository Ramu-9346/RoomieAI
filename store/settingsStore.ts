/**
 * SettingsStore — app-level user settings and feature flags.
 */

import { create } from 'zustand';
import { immer }  from 'zustand/middleware/immer';

interface FeatureFlags {
  dineout:  boolean;
  darkMode: boolean;
  mockData: boolean;
}

interface SettingsState {
  notificationsEnabled: boolean;
  hapticFeedback:       boolean;
  featureFlags:         FeatureFlags;

  // Actions
  setNotifications: (enabled: boolean) => void;
  setHaptic:        (enabled: boolean) => void;
  setFeatureFlag:   (flag: keyof FeatureFlags, value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  immer((set) => ({
    notificationsEnabled: true,
    hapticFeedback:       true,
    featureFlags: {
      dineout:  process.env.EXPO_PUBLIC_FEATURE_DINEOUT === 'true',
      darkMode: process.env.EXPO_PUBLIC_FEATURE_DARK_MODE === 'true',
      mockData: process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true',
    },

    setNotifications: (enabled) =>
      set((state) => { state.notificationsEnabled = enabled; }),

    setHaptic: (enabled) =>
      set((state) => { state.hapticFeedback = enabled; }),

    setFeatureFlag: (flag, value) =>
      set((state) => { state.featureFlags[flag] = value; }),
  })),
);
