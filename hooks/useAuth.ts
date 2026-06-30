/**
 * useAuth — authentication state and actions.
 * Hydrates from SecureStore on first call.
 */

import { useCallback }           from 'react';
import { router }                from 'expo-router';
import { useAuthStore }          from '@store/authStore';
import { useUserStore }          from '@store/userStore';
import { SecureStorage }         from '@utils/storage';
import { StorageKey }            from '@constants/enums';
import { Routes }                from '@constants/routes';
import { resetAllStores }        from '@store/index';

export function useAuth() {
  const { status, token, userId, setSession, clearSession, setStatus } = useAuthStore();
  const { user, isOnboarded, clearUser } = useUserStore();

  const logout = useCallback(async () => {
    await SecureStorage.delete(StorageKey.AuthToken);
    resetAllStores();
    router.replace(Routes.Auth.Login);
  }, []);

  const isAuthenticated = status === 'authenticated' && !!token;

  return {
    isAuthenticated,
    isLoading:       status === 'unknown',
    isOnboarded,
    user,
    token,
    userId,
    logout,
    setSession,
    clearSession,
    setStatus,
  };
}
