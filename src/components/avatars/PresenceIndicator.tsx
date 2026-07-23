import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';

interface PresenceIndicatorProps {
  isOnline: boolean;
  size?: number;
  pulse?: boolean;
  style?: ViewStyle;
}

export function PresenceIndicator({
  isOnline,
  size = 8,
  pulse = true,
  style,
}: PresenceIndicatorProps) {
  const { colors, duration } = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isOnline && pulse) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: duration.pulse / 2 }),
          withTiming(1.0, { duration: duration.pulse / 2 }),
        ),
        -1,
      );
    } else {
      scale.value = 1;
    }
  }, [isOnline, pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.wrapper, { width: size, height: size }, style]}>
      {isOnline && pulse && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: size / 2,
              backgroundColor: colors.success.default,
              opacity: 0.3,
            },
            animatedStyle,
          ]}
        />
      )}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isOnline ? colors.success.default : colors.text.muted,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
