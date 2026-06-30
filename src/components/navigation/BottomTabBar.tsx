/**
 * BottomTabBar — Primary 4-tab navigation
 *
 * Tabs (in order):
 *   Chat      — AI conversation hub
 *   Orders    — live & recent orders
 *   Flat      — member roster + preferences
 *   History   — settled orders + spend analytics
 *
 * Design notes:
 *   - 60px tall (tabBarHeight token)
 *   - Cream (#FBF7F0) background with top border
 *   - Active tab: ink label + filled icon colour
 *   - Inactive tab: muted label + muted icon
 *   - Tab label uses monoSmall so numbers align cleanly
 *   - Badge count for pending polls/orders on Chat tab
 *   - Safe-area-aware (paddingBottom from useSafeAreaInsets)
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export type TabName = 'Chat' | 'Orders' | 'Flat' | 'History';

interface TabConfig {
  name: TabName;
  icon: string;
  iconFilled: string;
  label: string;
}

const TABS: TabConfig[] = [
  { name: 'Chat',    icon: 'message-circle',  iconFilled: 'message-circle',  label: 'Chat'    },
  { name: 'Orders',  icon: 'shopping-bag',    iconFilled: 'shopping-bag',    label: 'Orders'  },
  { name: 'Flat',    icon: 'home',            iconFilled: 'home',            label: 'Flat'    },
  { name: 'History', icon: 'clock',           iconFilled: 'clock',           label: 'History' },
];

interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
  badgeCounts?: Partial<Record<TabName, number>>;
  style?: ViewStyle;
}

export function BottomTabBar({
  activeTab,
  onTabPress,
  badgeCounts = {},
  style,
}: BottomTabBarProps) {
  const { colors, spacing, zIndex } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.primary,
          borderTopWidth:  StyleSheet.hairlineWidth,
          borderTopColor:  colors.border.default,
          paddingBottom:   Math.max(insets.bottom, spacing.sp6),
          zIndex:          zIndex.header,
        },
        style,
      ]}
      accessibilityRole="tablist"
    >
      {TABS.map((tab) => (
        <TabItem
          key={tab.name}
          tab={tab}
          isActive={activeTab === tab.name}
          badge={badgeCounts[tab.name]}
          onPress={() => onTabPress(tab.name)}
          colors={colors}
          spacing={spacing}
        />
      ))}
    </View>
  );
}

// ── TabItem ───────────────────────────────────────────────────────────────────

interface TabItemProps {
  tab: TabConfig;
  isActive: boolean;
  badge?: number;
  onPress: () => void;
  colors: any;
  spacing: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TabItem({ tab, isActive, badge, onPress, colors, spacing }: TabItemProps) {
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

  const iconColor  = isActive ? colors.text.primary     : colors.text.muted;
  const labelColor = isActive ? colors.text.primary     : colors.text.muted;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.tab, animStyle]}
      accessibilityRole="tab"
      accessibilityLabel={tab.label}
      accessibilityState={{ selected: isActive }}
    >
      <View style={styles.iconWrap}>
        <Feather
          name={tab.icon as any}
          size={22}
          color={iconColor}
          style={isActive ? { opacity: 1 } : { opacity: 0.5 }}
        />
        {!!badge && badge > 0 && (
          <View
            style={[
              styles.badge,
              { backgroundColor: colors.primary.default },
            ]}
          >
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
        {tab.label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop:    8,
    height:        60 + 20, // tabBarHeight + safe area
  },
  tab: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            3,
    paddingTop:     2,
  },
  iconWrap: {
    position: 'relative',
    width:    24,
    height:   24,
    alignItems:     'center',
    justifyContent: 'center',
  },
  badge: {
    position:     'absolute',
    top:          -4,
    right:        -6,
    minWidth:     16,
    height:       16,
    borderRadius: 8,
    alignItems:     'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize:   9,
    lineHeight: 12,
  },
});
