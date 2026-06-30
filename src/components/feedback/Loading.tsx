/**
 * Loading — Spinner and full-screen loading overlay
 *
 * Components exported:
 *   Spinner         — inline circular spinner (uses reanimated rotate)
 *   LoadingOverlay  — full-screen semi-transparent blocking overlay
 *   PageLoading     — centred spinner for initial screen load
 *
 * Size tokens: sm (16), md (24), lg (36)
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

// ── Spinner ───────────────────────────────────────────────────────────────────

const SPINNER_SIZE = { sm: 16, md: 24, lg: 36 } as const;

interface SpinnerProps {
  size?: keyof typeof SPINNER_SIZE;
  color?: string;
  style?: ViewStyle;
}

export function Spinner({ size = 'md', color, style }: SpinnerProps) {
  const { colors } = useTheme();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const px    = SPINNER_SIZE[size];
  const stroke = px * 0.1 + 1;
  const c     = color ?? colors.primary.default;

  return (
    <Animated.View
      style={[
        animStyle,
        {
          width:        px,
          height:       px,
          borderRadius: px / 2,
          borderWidth:  stroke,
          borderColor:  `${c}30`,  // track
          borderTopColor: c,        // arc
        },
        style,
      ]}
    />
  );
}

// ── LoadingOverlay ─────────────────────────────────────────────────────────────

interface LoadingOverlayProps {
  visible: boolean;
  label?: string;
}

export function LoadingOverlay({ visible, label }: LoadingOverlayProps) {
  const { colors, radius, opacity, zIndex } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View
        style={[
          styles.overlayBg,
          {
            backgroundColor: `rgba(26,23,19,${opacity.overlay})`,
            zIndex:           zIndex.overlay,
          },
        ]}
      >
        <View
          style={[
            styles.overlayCard,
            {
              backgroundColor: colors.background.elevated,
              borderRadius:    radius.xl,
              padding:         32,
              gap:             16,
            },
          ]}
        >
          <Spinner size="lg" />
          {label && (
            <Text variant="body" color={colors.text.secondary} align="center">
              {label}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

// ── PageLoading ────────────────────────────────────────────────────────────────

interface PageLoadingProps {
  label?: string;
  style?: ViewStyle;
}

export function PageLoading({ label, style }: PageLoadingProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.page, style]}>
      <Spinner size="lg" />
      {label && (
        <Text variant="body" color={colors.text.muted} align="center">
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlayBg: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  overlayCard: {
    alignItems:     'center',
    justifyContent: 'center',
    minWidth:       120,
  },
  page: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            16,
  },
});
