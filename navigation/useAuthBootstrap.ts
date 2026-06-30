/**
 * useAuthBootstrap — run once at app launch.
 * Reads stored auth token from SecureStore and hydrates the AuthStore.
 * Redirects to the correct initial route.
 */

import { useEffect, useState } from 'react';
import { router }              from 'expo-router';
import { useAuthStore }        from '@store/authStore';
import { useUserStore }        from '@store/userStore';
import { SecureStorage }       from '@utils/storage';
import { StorageKey }          from '@constants/enums';
import { Routes }              from '@constants/routes';
import { Logger }              from '@utils/logger';

export function useAuthBootstrap() {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { setSession, setStatus }     = useAuthStore();

  useEffect(() => {
    async function bootstrap() {
      try {
        const token     = await SecureStorage.get(StorageKey.AuthToken);
        const userId    = await SecureStorage.get(StorageKey.User);
        const onboarded = await SecureStorage.get(StorageKey.Onboarded);

        if (token && userId) {
          setSession(token, userId, '');  // expiresAt stored separately if needed
          Logger.info('Bootstrap', 'Session restored');

          if (onboarded !== 'true') {
            router.replace(Routes.Auth.Onboarding);
          } else {
            router.replace(Routes.Tabs.Chat);
          }
        } else {
          setStatus('unauthenticated');
          router.replace(Routes.Auth.Login);
        }
      } catch (err) {
        Logger.error('Bootstrap', 'Failed to restore session', err);
        setStatus('unauthenticated');
        router.replace(Routes.Auth.Login);
      } finally {
        setIsAuthReady(true);
      }
    }

    bootstrap();
  }, []);

  return { isAuthReady };
}
