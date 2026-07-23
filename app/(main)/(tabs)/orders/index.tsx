/**
 * OrdersScreen — group food and grocery orders.
 *
 * Shell layout only. No order data, no API calls.
 *
 * Layout:
 *   - AppHeader: "Orders" + optional live badge
 *   - Segment tabs: Active | Past
 *   - Active tab: NoOrders empty state + CTA to start an order via AI
 *   - Past tab: empty state (same component, different copy)
 *
 * Future wiring: Phase 6 will connect useOrderStore, OrderCard list,
 * and live status polling.
 */

import { router } from 'expo-router';
import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import { AppHeader, ScreenContainer, NoOrders, Text } from '@components';
import { Routes } from '@constants/routes';
import { useAppTheme } from '@hooks/useAppTheme';

type OrderTab = 'active' | 'past';

export default function OrdersScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const [activeTab, setActiveTab] = useState<OrderTab>('active');

  return (
    <View style={[styles.screen, { backgroundColor: colors.background.primary }]}>
      <AppHeader title="Orders" subtitle="Group food & grocery" />

      {/* ── Segment control ─────────────────────────────────────────── */}
      <View
        style={[
          styles.segmentWrap,
          {
            paddingHorizontal: spacing.pageHorizontal,
            paddingVertical: spacing.sp12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.subtle,
          },
        ]}
      >
        <View
          style={[
            styles.segment,
            {
              backgroundColor: colors.background.secondary,
              borderRadius: radius.lg,
              padding: 4,
            },
          ]}
        >
          {(['active', 'past'] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.segmentBtn,
                {
                  borderRadius: radius.md,
                  paddingVertical: spacing.sp8,
                  backgroundColor: activeTab === tab ? colors.background.elevated : 'transparent',
                },
              ]}
              accessibilityRole="tab"
              accessibilityLabel={tab === 'active' ? 'Active orders' : 'Past orders'}
              accessibilityState={{ selected: activeTab === tab }}
            >
              <Text
                variant="bodyMedium"
                color={activeTab === tab ? colors.text.primary : colors.text.muted}
                align="center"
              >
                {tab === 'active' ? 'Active' : 'Past'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <ScreenContainer style={styles.content}>
        <View style={styles.emptyWrap}>
          {activeTab === 'active' ? (
            <NoOrders onPrimaryPress={() => router.push(Routes.Tabs.AI)} />
          ) : (
            <NoOrders onPrimaryPress={() => router.push(Routes.Tabs.AI)} />
          )}
        </View>
      </ScreenContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  segmentWrap: {
    // top segment bar below header
  },
  segment: {
    flexDirection: 'row',
  },
  segmentBtn: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
  },
});
