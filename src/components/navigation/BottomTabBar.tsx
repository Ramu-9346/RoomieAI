/**
 * BottomTabBar — Primary 5-tab navigation
 *
 * Tabs (in order):
 *   Home     — activity feed, quick actions, AI suggestions
 *   AI       — Roomie conversation hub (chat with the AI coordinator)
 *   Orders   — live & recent group orders
 *   Flat     — member roster + preferences + invite
 *   Profile  — personal settings, preferences, about
 *
 * Design notes:
 *   - 60px tall (tabBarHeight token)
 *   - Cream (#FBF7F0) background with top border
 *   - Active tab: ink label + filled icon colour
 *   - Inactive tab: muted label + muted icon (opacity 0.5)
 *   - Tab label uses monoSmall so numbers align cleanly
 *   - Badge count supported on any tab (e.g. pending polls on AI tab)
 *   - Safe-area-aware (paddingBottom from useSafeAreaInsets)
 *   - Spring-scale animation on press for satisfying haptic feel
 *
 * Navigation pattern follows React Navigation's BottomTabBar exactly:
 *   - Navigates using route.name from state.routes (never hardcoded strings)
 *   - Emits tabPress event before navigating so listeners can cancel it
 */

import { Feather } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

// Kept for external consumers that import this type.
export type TabName = 'Home' | 'AI' | 'Orders' | 'Flat' | 'Profile';

interface TabVisual {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
}

// Ordered to match <Tabs.Screen> declaration order in _layout.tsx.
const TAB_VISUALS: TabVisual[] = [
  { icon: 'home', label: 'Home' },
  { icon: 'cpu', label: 'AI' },
  { icon: 'shopping-bag', label: 'Orders' },
  { icon: 'users', label: 'Flat' },
  { icon: 'user', label: 'Profile' },
];

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, spacing, zIndex } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.primary,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border.default,
          paddingBottom: Math.max(insets.bottom, spacing.sp6),
          zIndex: zIndex.header,
        },
      ]}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const visual = TAB_VISUALS[index];
        const options = descriptors[route.key].options;
        const badge = typeof options.tabBarBadge === 'number' ? options.tabBarBadge : undefined;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            // Use route.name from state so we never rely on a hardcoded string.
            // Expo Router registers these as "home/index", "ai/index", etc.
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        if (!visual) return null;

        return (
          <TabItem
            key={route.key}
            visual={visual}
            isActive={isFocused}
            badge={badge}
            onPress={onPress}
            onLongPress={onLongPress}
            colors={colors}
            spacing={spacing}
          />
        );
      })}
    </View>
  );
}

// ── TabItem ───────────────────────────────────────────────────────────────────

interface TabItemProps {
  visual: TabVisual;
  isActive: boolean;
  badge?: number;
  onPress: () => void;
  onLongPress: () => void;
  colors: ReturnType<typeof useTheme>['colors'];
  spacing: ReturnType<typeof useTheme>['spacing'];
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TabItem({ visual, isActive, badge, onPress, onLongPress, colors }: TabItemProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withSpring(0.88, { damping: 12, stiffness: 400 });
  }
  function handlePressOut() {
    scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  }

  const iconColor = isActive ? colors.text.primary : colors.text.muted;
  const labelColor = isActive ? colors.text.primary : colors.text.muted;

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.tab, animStyle]}
      accessibilityRole="tab"
      accessibilityLabel={visual.label}
      accessibilityState={{ selected: isActive }}
    >
      <View style={styles.iconWrap}>
        <Feather
          name={visual.icon}
          size={22}
          color={iconColor}
          style={isActive ? { opacity: 1 } : { opacity: 0.5 }}
        />
        {!!badge && badge > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary.default }]}>
            <Text variant="monoSmall" color="#FFFFFF" style={styles.badgeText}>
              {badge > 9 ? '9+' : String(badge)}
            </Text>
          </View>
        )}
      </View>
      <Text
        variant="monoSmall"
        color={labelColor}
        style={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      >
        {visual.label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 8,
    height: 60 + 20, // tabBarHeight + safe area
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: 2,
  },
  iconWrap: {
    position: 'relative',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    lineHeight: 12,
  },
});
