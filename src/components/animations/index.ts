/**
 * Animation utilities — reusable hooks and presets for consistent motion.
 *
 * All animations use react-native-reanimated 3.
 * These wrap the Duration, Ease, Stagger constants from the Phase 2 theme.
 */

import { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay, useEffect } from 'react-native-reanimated';
import { Duration, Ease, Stagger } from '../../theme';

// ─── useFadeIn ───────────────────────────────────────────────────────────────

export function useFadeIn(delay = 0) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: Duration.message, easing: Ease.out }));
  }, []);

  return useAnimatedStyle(() => ({ opacity: opacity.value }));
}

// ─── useSlideIn ──────────────────────────────────────────────────────────────

export function useSlideIn(fromY = 16, delay = 0) {
  const opacity    = useSharedValue(0);
  const translateY = useSharedValue(fromY);

  useEffect(() => {
    opacity.value    = withDelay(delay, withTiming(1, { duration: Duration.message, easing: Ease.out }));
    translateY.value = withDelay(delay, withTiming(0, { duration: Duration.message, easing: Ease.out }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

// ─── useScaleIn ──────────────────────────────────────────────────────────────

export function useScaleIn(delay = 0) {
  const scale   = useSharedValue(0.85);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value   = withDelay(delay, withSpring(1, { damping: 18, stiffness: 200 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: Duration.normal }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
}

// ─── usePageStagger ──────────────────────────────────────────────────────────
// For screen content that enters staggered.

export function usePageStagger(index: 0 | 1 | 2 | 3 | 4 = 0) {
  const delays: Record<number, number> = {
    0: Stagger.s1,
    1: Stagger.s2,
    2: Stagger.s3,
    3: Stagger.s4,
    4: Stagger.s5,
  };
  return useSlideIn(16, delays[index]);
}

// ─── usePressScale ───────────────────────────────────────────────────────────
// Returns handlers + animated style for press feedback.

export function usePressScale(to = 0.96) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlers = {
    onPressIn:  () => { scale.value = withSpring(to,  { damping: 22, stiffness: 350 }); },
    onPressOut: () => { scale.value = withSpring(1,    { damping: 22, stiffness: 350 }); },
  };

  return { animStyle, ...handlers };
}
