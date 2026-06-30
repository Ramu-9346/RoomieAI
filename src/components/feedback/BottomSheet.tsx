/**
 * BottomSheet — Modal drawer from bottom
 *
 * Used for:
 *   - Restaurant detail expansion
 *   - Order confirmation preview
 *   - Member preference editor
 *   - Payment breakdown
 *
 * Behaviour:
 *   - Slides up from bottom on open (spring)
 *   - Drag handle at top
 *   - Scrim (semi-transparent overlay) tappable to dismiss
 *   - Swipe-down gesture via PanResponder to dismiss
 *   - snapPoints: 'half' (50%), 'full' (90%), 'auto' (content height)
 *
 * Safe-area-aware footer padding.
 */

import React, { useEffect, useRef, ReactNode } from 'react';
import {
  View,
  Pressable,
  Modal,
  PanResponder,
  Dimensions,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type SnapPoint = 'half' | 'full' | 'auto';

interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  snapPoint?: SnapPoint;
  title?: string;
  children: ReactNode;
  contentStyle?: ViewStyle;
}

export function BottomSheet({
  visible,
  onDismiss,
  snapPoint = 'half',
  title,
  children,
  contentStyle,
}: BottomSheetProps) {
  const { colors, radius, spacing, zIndex, opacity: opacityTokens } = useTheme();
  const insets = useSafeAreaInsets();

  const sheetHeight = {
    half: SCREEN_HEIGHT * 0.50,
    full: SCREEN_HEIGHT * 0.90,
    auto: undefined,  // grows with content, capped at 90%
  }[snapPoint];

  const translateY  = useSharedValue(SCREEN_HEIGHT);
  const bgOpacity   = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 28, stiffness: 300 });
      bgOpacity.value  = withTiming(1, { duration: 250 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 280 });
      bgOpacity.value  = withTiming(0, { duration: 220 });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const scrimStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  // Swipe-down-to-dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 8 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderRelease: (_, g) => {
        if (g.dy > 80) {
          runOnJS(onDismiss)();
        } else {
          translateY.value = withSpring(0, { damping: 28, stiffness: 300 });
        }
      },
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.value = g.dy;
      },
    }),
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      {/* Scrim */}
      <Animated.View
        style={[StyleSheet.absoluteFillObject, scrimStyle]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <Pressable
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: `rgba(26,23,19,${opacityTokens.overlay})` },
          ]}
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Close"
        />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          sheetStyle,
          {
            backgroundColor: colors.background.primary,
            borderTopLeftRadius:  radius.xxxl,
            borderTopRightRadius: radius.xxxl,
            zIndex:               zIndex.bottomSheet,
            maxHeight:            SCREEN_HEIGHT * 0.92,
            height:               sheetHeight,
            paddingBottom:        insets.bottom + spacing.sp16,
          },
        ]}
      >
        {/* Drag handle */}
        <View
          {...panResponder.panHandlers}
          style={styles.handleArea}
          accessibilityRole="adjustable"
          accessibilityLabel="Drag to dismiss"
        >
          <View
            style={[
              styles.handle,
              { backgroundColor: colors.border.strong },
            ]}
          />
        </View>

        {/* Optional title */}
        {title && (
          <View style={{ paddingHorizontal: spacing.sp16, paddingBottom: spacing.sp12 }}>
            <Text variant="title" color={colors.text.primary} align="center">
              {title}
            </Text>
          </View>
        )}

        {/* Content */}
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left:     0,
    right:    0,
    bottom:   0,
  },
  handleArea: {
    alignItems:     'center',
    paddingVertical: 12,
  },
  handle: {
    width:        36,
    height:       4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
});
