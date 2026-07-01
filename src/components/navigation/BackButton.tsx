import React from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface BackButtonProps {
  onPress: () => void;
  label?: string;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function BackButton({ onPress, label, style }: BackButtonProps) {
  const { colors, radius } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.92, { damping: 22, stiffness: 350 }); }}
      onPressOut={() => { scale.value = withSpring(1,    { damping: 22, stiffness: 350 }); }}
      style={[
        styles.button,
        {
          borderRadius: radius.md,
          backgroundColor: colors.background.secondary,
          borderWidth: 1,
          borderColor: colors.border.default,
        },
        animStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label ?? 'Go back'}
      hitSlop={8}
    >
      <Feather name="arrow-left" size={18} color={colors.text.secondary} />
      {label && (
        <Text variant="bodyMedium" color={colors.text.secondary}>
          {label}
        </Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
});
