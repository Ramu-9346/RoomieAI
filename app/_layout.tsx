/**
 * Root Layout — entry point for Expo Router.
 *
 * Responsibilities:
 *   1. Load custom fonts
 *   2. Hydrate auth state from SecureStore
 *   3. Wrap entire app in providers
 *   4. Handle auth-based routing (redirect to /login if not authenticated)
 *   5. Hide splash screen once ready
 */

import { useEffect } from 'react';
import { Slot }      from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Fraunces_500Medium,
  Fraunces_500Medium_Italic,
} from '@expo-google-fonts/fraunces';
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
} from '@expo-google-fonts/geist';
import {
  GeistMono_400Regular,
  GeistMono_500Medium,
} from '@expo-google-fonts/geist-mono';

import { AppProvider }        from '@providers/index';
import { useAuthBootstrap }   from '../navigation/useAuthBootstrap';
import '../global.css';

// Keep splash visible until fonts + auth are ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fraunces_500Medium,
    Fraunces_500Medium_Italic,
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    GeistMono_400Regular,
    GeistMono_500Medium,
  });

  const { isAuthReady } = useAuthBootstrap();

  useEffect(() => {
    if (fontsLoaded && isAuthReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAuthReady]);

  if (!fontsLoaded || !isAuthReady) return null;

  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
