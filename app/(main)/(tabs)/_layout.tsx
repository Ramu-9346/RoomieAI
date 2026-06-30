/**
 * Tab Layout — uses custom BottomTabBar from the Phase 2 design system.
 * Expo Router's Tabs component drives the actual tab state;
 * the visual tab bar is rendered separately via tabBar prop.
 */

import { useState }            from 'react';
import { Tabs }                from 'expo-router';
import { BottomTabBar }        from '@components/navigation/BottomTabBar';
import type { TabName }        from '@components/navigation/BottomTabBar';

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState<TabName>('Chat');

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            const routeMap: Record<TabName, string> = {
              Chat:    'chat',
              Orders:  'orders',
              Flat:    'flat',
              History: 'history',
            };
            props.navigation.navigate(routeMap[tab]);
          }}
        />
      )}
    >
      <Tabs.Screen name="chat/index"    options={{ title: 'Chat' }}    />
      <Tabs.Screen name="orders/index"  options={{ title: 'Orders' }}  />
      <Tabs.Screen name="flat/index"    options={{ title: 'Flat' }}    />
      <Tabs.Screen name="history/index" options={{ title: 'History' }} />
    </Tabs>
  );
}
