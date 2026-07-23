/**
 * Custom Animated Splash Screen
 *
 * Shown immediately after fonts are loaded (native splash hides first).
 * Plays a 2.6s brand animation then routes to onboarding or main app.
 *
 * Animation sequence:
 *   0ms    — Logo mark fades + scales in (600ms, ease-out spring)
 *   300ms  — Wordmark "RoomieAI" fades in (300ms)
 *   600ms  — Tagline slides up + fades in (400ms)
 *   2600ms — Navigate (cache check: onboarded → main, else → onboarding)
 *
 * Routing (AsyncStorage read via hydrated cache):
 *   - First launch:       → /(onboarding)
 *   - Returning user:     → /(main)/(tabs)/home
 *   - Future auth layer:  will intercept between onboarding and main
 */

import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '@components';
import { StorageKey } from '@constants/enums';
import { Routes } from '@constants/routes';
import { useAppTheme } from '@hooks/useAppTheme';
import { hydratePromise, LocalStorage } from '@utils/storage';

export default function SplashScreen() {
  const { colors, radius } = useAppTheme();

  // ── Shared animation values ───────────────────────────────────────────────
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.82);
  const wordOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(16);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const wordStyle = useAnimatedStyle(() => ({
    opacity: wordOpacity.value,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));

  // ── Navigate after animation completes ───────────────────────────────────
  async function navigate() {
    await hydratePromise;
    const onboarded = LocalStorage.get(StorageKey.Onboarded);
    if (onboarded === 'true') {
      router.replace(Routes.Tabs.Home);
    } else {
      router.replace(Routes.Onboarding);
    }
  }

  // ── Animation sequence ───────────────────────────────────────────────────
  useEffect(() => {
    // Logo: spring scale + fade
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withSpring(1, { damping: 20, stiffness: 200, mass: 0.8 });

    // Wordmark: delayed fade
    wordOpacity.value = withDelay(300, withTiming(1, { duration: 300 }));

    // Tagline: slide up + fade
    taglineOpacity.value = withDelay(650, withTiming(1, { duration: 400 }));
    taglineY.value = withDelay(650, withTiming(0, { duration: 400 }));

    const timer = setTimeout(navigate, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.primary }]}
      accessibilityLabel="RoomieAI loading"
    >
      {/* ── Logo + wordmark ─────────────────────────────────────────────── */}
      <View style={styles.center}>
        <Animated.View style={logoStyle}>
          <View
            style={[
              styles.logoMark,
              {
                backgroundColor: colors.text.primary,
                borderRadius: radius.xxl,
              },
            ]}
          >
            <Text variant="displayXL" color={colors.text.inverse} style={styles.logoLetter}>
              R
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.wordRow, wordStyle]}>
          <Text variant="heading" color={colors.text.primary} style={styles.wordmark}>
            RoomieAI
          </Text>
        </Animated.View>
      </View>

      {/* ── Tagline ────────────────────────────────────────────────────── */}
      <Animated.View style={[styles.tagline, taglineStyle]}>
        <Text variant="body" color={colors.text.secondary} align="center">
          Swiggy already solved delivery.{'\n'}RoomieAI solves coordination.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    gap: 20,
  },
  logoMark: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: 52,
    lineHeight: 60,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  wordRow: {
    alignItems: 'center',
  },
  wordmark: {
    letterSpacing: -0.5,
  },
  tagline: {
    position: 'absolute',
    bottom: 72,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
});
