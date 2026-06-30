/**
 * AuthStore — authentication session state.
 * Stores the JWT token and session metadata.
 * Persisted to SecureStore; hydrated on app launch.
 */

import { create } from 'zustand';
import { immer }  from 'zustand/middleware/immer';

export type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  token: string | null;
  userId: string | null;
  expiresAt: string | null;

  // Actions
  setSession: (token: string, userId: string, expiresAt: string) => void;
  clearSession: () => void;
  setStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    status:    'unknown',
    token:     null,
    userId:    null,
    expiresAt: null,

    setSession: (token, userId, expiresAt) =>
      set((state) => {
        state.status    = 'authenticated';
        state.token     = token;
        state.userId    = userId;
        state.expiresAt = expiresAt;
      }),

    clearSession: () =>
      set((state) => {
        state.status    = 'unauthenticated';
        state.token     = null;
        state.userId    = null;
        state.expiresAt = null;
      }),

    setStatus: (status) =>
      set((state) => { state.status = status; }),
  })),
);
