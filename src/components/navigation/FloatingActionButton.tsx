/**
 * FloatingActionButton — Chat screen compose trigger
 *
 * Not a traditional FAB — in RoomieAI it's a pill button that appears
 * on History / Flat tabs to "Start ordering" (returns user to Chat).
 *
 * Also used as a scroll-to-bottom button in the Chat thread
 * when the user has scrolled up past 3 messages.
 *
 * Variants:
 *   compose      — pill: "Start ordering" with message-circle icon
 *   scrollBottom — circular, arrow-down, 40px
 */

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

type FABVariant = 'compose' | 'scrollBottom';

interface FABProps {
  variant?: FABVariant;
  onPress: () => void;
  label?: string;
  visible?: boolean;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FloatingActionButton({
  variant = 'compose',
  onPress,
  label = 'Start ordering',
  visible = true,
  style,
}: FABProps) {
  const { colors, radius, shadows, zIndex } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withSpring(0.94, { damping: 12, stiffness: 400 });
  }
  function handlePressOut() {
    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
  }

  if (!visible) return null;

  if (variant === 'scrollBottom') {
    return (
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        style={[
          styles.scrollBtn,
          {
            backgroundColor: colors.background.elevated,
            borderRadius: radius.pill,
            borderWidth: 1,
            borderColor: colors.border.default,
            zIndex: zIndex.chatInput - 1,
            ...shadows.floating,
          },
          style,
        ]}
      >
        <AnimatedPressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.scrollBtnInner, animStyle]}
          accessibilityRole="button"
          accessibilityLabel="Scroll to bottom"
        >
          <Feather name="arrow-down" size={18} color={colors.text.primary} />
        </AnimatedPressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={[
        styles.composeFab,
        {
          backgroundColor: colors.text.primary,
          borderRadius: radius.pill,
          zIndex: zIndex.chatInput - 1,
          ...shadows.floating,
        },
        style,
      ]}
    >
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.composeFabInner, animStyle]}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Feather name="message-circle" size={18} color={colors.background.primary} />
        <Text variant="button" color={colors.background.primary}>
          {label}
        </Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollBtn: {
    width: 40,
    height: 40,
  },
  scrollBtnInner: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  composeFab: {
    alignSelf: 'center',
  },
  composeFabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
});
