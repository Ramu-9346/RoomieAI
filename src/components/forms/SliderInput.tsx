import React, { useCallback } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface SliderInputProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  valueLabel?: (v: number) => string;
  onChange: (value: number) => void;
  style?: ViewStyle;
}

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 24;

export function SliderInput({
  value,
  min = 0,
  max = 100,
  step = 1,
  label,
  valueLabel,
  onChange,
  style,
}: SliderInputProps) {
  const { colors, radius } = useTheme();

  const progress = (value - min) / (max - min);
  const trackWidth = useSharedValue(0);
  const thumbX = useSharedValue(0);

  const snap = useCallback(
    (rawX: number) => {
      const width = trackWidth.value;
      if (width === 0) return;
      const clamped = Math.max(0, Math.min(rawX, width));
      const raw = min + (clamped / width) * (max - min);
      const stepped = Math.round(raw / step) * step;
      const final = Math.max(min, Math.min(max, stepped));
      onChange(final);
    },
    [min, max, step, onChange],
  );

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = thumbX.value;
    },
    onActive: (event, ctx) => {
      const newX = ctx.startX + event.translationX;
      thumbX.value = Math.max(0, Math.min(newX, trackWidth.value));
      runOnJS(snap)(thumbX.value);
    },
  });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value - THUMB_SIZE / 2 }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: `${(thumbX.value / (trackWidth.value || 1)) * 100}%` as unknown as number,
  }));

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.header}>
          <Text variant="eyebrow" color={colors.text.muted}>
            {label}
          </Text>
          <Text variant="mono" color={colors.primary.default}>
            {valueLabel ? valueLabel(value) : `${value}`}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.track,
          { backgroundColor: colors.border.default, borderRadius: radius.pill },
        ]}
        onLayout={(e) => {
          trackWidth.value = e.nativeEvent.layout.width;
          thumbX.value = e.nativeEvent.layout.width * progress;
        }}
      >
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: colors.primary.default, borderRadius: radius.pill },
            fillStyle,
          ]}
        />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.thumb,
              {
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                borderRadius: THUMB_SIZE / 2,
                backgroundColor: colors.primary.default,
              },
              thumbStyle,
            ]}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    left: 0,
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
