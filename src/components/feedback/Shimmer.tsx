import React, { useRef } from 'react';
import { View, Animated, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

interface ShimmerProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Shimmer({ width, height, borderRadius = 8, style }: ShimmerProps) {
  const { colors } = useTheme();

  const shimmerAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-(typeof width === 'number' ? width : 200), (typeof width === 'number' ? width : 200)],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.background.secondary,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(90deg, transparent, ${colors.background.elevated}, transparent)`,
          },
        ]}
      />
    </View>
  );
}

export function PageLoader({ message }: { message?: string }) {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colors.background.primary, alignItems: 'center', justifyContent: 'center', gap: spacing.sp16 },
      ]}
    >
      <Shimmer width={48} height={48} borderRadius={24} />
      {message && (
        <Shimmer width={160} height={16} />
      )}
    </View>
  );
}
