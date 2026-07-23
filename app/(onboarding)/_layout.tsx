/**
 * Onboarding Layout — wraps the 3-page onboarding experience.
 *
 * Uses a fade animation for entry from the splash screen.
 * No header shown — the onboarding screen manages its own UI.
 */

import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />;
}
