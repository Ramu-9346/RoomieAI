import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  style?: ViewStyle;
}

export function LoadingOverlay({ visible, message, style }: LoadingOverlayProps) {
  const { colors, radius, spacing, zIndex } = useTheme();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [visible]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colors.background.overlay, zIndex: zIndex.overlay },
        styles.container,
        animStyle,
        style,
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityLiveRegion="polite"
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: colors.background.elevated,
            borderRadius: radius.xxl,
            padding: spacing.sp24,
            gap: spacing.sp12,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary.default} />
        {message && (
          <Text variant="bodyMedium" color={colors.text.secondary} style={styles.text}>
            {message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  box: { alignItems: 'center', minWidth: 140 },
  text: { textAlign: 'center' },
});
