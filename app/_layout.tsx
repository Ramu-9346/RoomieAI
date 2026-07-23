/**
 * Root Layout — entry point for Expo Router.
 *
 * Responsibilities:
 *   1. Load custom fonts (Fraunces, Geist, GeistMono)
 *   2. Wrap entire app in providers (gesture, safe area, query, theme, toast)
 *   3. Hide native splash screen once fonts are ready
 *   4. Render <Slot /> — Expo Router renders app/index.tsx (custom animated splash)
 *
 * Navigation flow (Phase 5):
 *   Native splash → Custom splash (app/index.tsx) → Onboarding or Main
 *
 * Future auth integration:
 *   Restore useAuthBootstrap() call here or inside app/index.tsx routing logic.
 *   The (auth)/ group is already scaffolded and ready to receive auth screens.
 */

import {
  useFonts,
  Fraunces_500Medium,
  Fraunces_500Medium_Italic,
} from '@expo-google-fonts/fraunces';
import { Geist_400Regular, Geist_500Medium, Geist_600SemiBold } from '@expo-google-fonts/geist';
import { GeistMono_400Regular, GeistMono_500Medium } from '@expo-google-fonts/geist-mono';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AppProvider } from '@providers/index';
import '../global.css';

// Hold native splash visible until fonts are ready
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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
