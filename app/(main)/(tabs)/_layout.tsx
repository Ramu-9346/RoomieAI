/**
 * Tab Layout — 5-tab navigation using the custom BottomTabBar.
 *
 * Tabs: Home | AI | Orders | Flat | Profile
 *
 * Screen names use the full path segment (folder/index) because that is what
 * Expo Router registers from the filesystem. Navigation is handled entirely
 * inside BottomTabBar using state.routes — no hardcoded route strings here.
 */

import { Tabs } from 'expo-router';

import { BottomTabBar } from '@components/navigation/BottomTabBar';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
      <Tabs.Screen name="home/index" options={{ title: 'Home' }} />
      <Tabs.Screen name="ai/index" options={{ title: 'AI' }} />
      <Tabs.Screen name="orders/index" options={{ title: 'Orders' }} />
      <Tabs.Screen name="flat/index" options={{ title: 'Flat' }} />
      <Tabs.Screen name="profile/index" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
