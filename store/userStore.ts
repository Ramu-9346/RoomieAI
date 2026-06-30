/**
 * UserStore — current logged-in user profile and preferences.
 */

import { create } from 'zustand';
import { immer }  from 'zustand/middleware/immer';

import type { User }       from '@models/User';
import type { Preference } from '@models/Preference';

interface UserState {
  user: User | null;
  preferences: Preference | null;
  isOnboarded: boolean;

  // Actions
  setUser:        (user: User) => void;
  setPreferences: (prefs: Preference) => void;
  setOnboarded:   (value: boolean) => void;
  clearUser:      () => void;
}

export const useUserStore = create<UserState>()(
  immer((set) => ({
    user:        null,
    preferences: null,
    isOnboarded: false,

    setUser: (user) =>
      set((state) => { state.user = user; }),

    setPreferences: (prefs) =>
      set((state) => { state.preferences = prefs; }),

    setOnboarded: (value) =>
      set((state) => { state.isOnboarded = value; }),

    clearUser: () =>
      set((state) => {
        state.user        = null;
        state.preferences = null;
        state.isOnboarded = false;
      }),
  })),
);
