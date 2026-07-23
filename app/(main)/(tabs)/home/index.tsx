/**
 * HomeScreen — Activity feed + quick actions.
 *
 * Shell layout only. No business data, no API calls, no state management.
 *
 * Sections:
 *   - AppHeader: flat name + user avatar
 *   - Greeting: "Good [time], [name]" + current date
 *   - Active Order: NoOrders empty card (will show live status when real data flows)
 *   - Quick Actions: 4 action chips (Order Food, Groceries, Start Poll, Split Bills)
 *   - Flat Members: AvatarStack placeholder + invite hint
 *   - AI Suggestions: ActionSuggestionCard placeholder
 *
 * Page entrance: staggered fade-up animation via Reanimated.
 */

import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

import {
  AppHeader,
  ScreenContainer,
  Section,
  Spacer,
  NoOrders,
  AvatarStack,
  ActionSuggestionCard,
  Text,
} from '@components';
import { Routes } from '@constants/routes';
import { useAppTheme } from '@hooks/useAppTheme';

// ── Greeting logic ────────────────────────────────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// ── Quick action config ───────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: 'Order Food', icon: 'shopping-bag', route: Routes.Tabs.AI },
  { label: 'Groceries', icon: 'shopping-cart', route: Routes.Tabs.AI },
  { label: 'Start Poll', icon: 'bar-chart-2', route: Routes.Tabs.AI },
  { label: 'Split Bills', icon: 'credit-card', route: Routes.Tabs.Flat },
] as const;

// ── Stagger animation hook ────────────────────────────────────────────────────

function useStaggerFadeUp(index: number, delay = 80) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    const d = index * delay;
    opacity.value = withDelay(d, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(d, withTiming(0, { duration: 500 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { colors, spacing, radius, shadows } = useAppTheme();

  const greetingAnim = useStaggerFadeUp(0);
  const activeOrderAnim = useStaggerFadeUp(1);
  const quickActionsAnim = useStaggerFadeUp(2);
  const membersAnim = useStaggerFadeUp(3);
  const suggestionsAnim = useStaggerFadeUp(4);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background.primary }]}>
      <AppHeader
        title="Flat 4B"
        subtitle="Your home base"
        showAvatar
        avatarName="You"
        avatarIndex={0}
        onAvatarPress={() => router.push(Routes.Tabs.Profile)}
        rightElement={
          <Pressable
            onPress={() => {
              /* notification sheet — future */
            }}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Feather name="bell" size={22} color={colors.text.primary} />
          </Pressable>
        }
      />

      <ScreenContainer scrollable padded contentContainerStyle={styles.content}>
        {/* ── Greeting ─────────────────────────────────────────────────── */}
        <Animated.View style={greetingAnim}>
          <Text variant="heading" color={colors.text.primary}>
            {getGreeting()} 👋
          </Text>
          <Spacer size="sp4" />
          <Text variant="caption" color={colors.text.muted}>
            {getFormattedDate()}
          </Text>
        </Animated.View>

        <Spacer size="sp28" />

        {/* ── Active Order ─────────────────────────────────────────────── */}
        <Animated.View style={activeOrderAnim}>
          <Section title="Active Order">
            <NoOrders onPrimaryPress={() => router.push(Routes.Tabs.AI)} style={styles.emptyCard} />
          </Section>
        </Animated.View>

        <Spacer size="sp28" />

        {/* ── Quick Actions ─────────────────────────────────────────────── */}
        <Animated.View style={quickActionsAnim}>
          <Section title="Quick Actions">
            <View style={styles.actionsGrid}>
              {QUICK_ACTIONS.map((action) => (
                <Pressable
                  key={action.label}
                  onPress={() => router.push(action.route)}
                  style={[
                    styles.actionChip,
                    {
                      backgroundColor: colors.background.elevated,
                      borderRadius: radius.lg,
                      borderWidth: 1,
                      borderColor: colors.border.default,
                      ...shadows.card,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                >
                  <Feather name={action.icon} size={18} color={colors.primary.default} />
                  <Text variant="caption" color={colors.text.primary} align="center">
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Section>
        </Animated.View>

        <Spacer size="sp28" />

        {/* ── Flat Members ─────────────────────────────────────────────── */}
        <Animated.View style={membersAnim}>
          <Section
            title="Flat Members"
            headerRight={
              <Pressable
                onPress={() => router.push(Routes.Tabs.Flat)}
                accessibilityRole="button"
                accessibilityLabel="See all members"
              >
                <Text variant="caption" color={colors.primary.default}>
                  See all
                </Text>
              </Pressable>
            }
          >
            <View
              style={[
                styles.membersCard,
                {
                  backgroundColor: colors.background.elevated,
                  borderRadius: radius.xl,
                  padding: spacing.cardPaddingMd,
                  ...shadows.card,
                },
              ]}
            >
              <AvatarStack members={[]} maxVisible={5} size="md" />
              <Spacer size="sp12" />
              <Text variant="body" color={colors.text.secondary}>
                Invite your flatmates to get started
              </Text>
              <Spacer size="sp12" />
              <Pressable
                onPress={() => router.push(Routes.Tabs.Flat)}
                style={[
                  styles.inviteBtn,
                  {
                    borderRadius: radius.md,
                    borderWidth: 1.5,
                    borderColor: colors.primary.default,
                    paddingVertical: spacing.sp10,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Invite flatmates"
              >
                <Text variant="button" color={colors.primary.default} align="center">
                  + Invite Members
                </Text>
              </Pressable>
            </View>
          </Section>
        </Animated.View>

        <Spacer size="sp28" />

        {/* ── AI Suggestions ───────────────────────────────────────────── */}
        <Animated.View style={suggestionsAnim}>
          <Section title="Roomie Suggests">
            <ActionSuggestionCard
              type="order"
              title="Start tonight's group order"
              description="It's dinner time — let Roomie find restaurants everyone will love"
              onPress={() => router.push(Routes.Tabs.AI)}
            />
            <Spacer size="sp12" />
            <ActionSuggestionCard
              type="grocery"
              title="Grocery restock reminder"
              description="Milk, eggs, and bread are likely running low based on your order history"
              onPress={() => router.push(Routes.Tabs.AI)}
            />
          </Section>
        </Animated.View>

        <Spacer size="sp40" />
      </ScreenContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  emptyCard: {
    minHeight: 180,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionChip: {
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  membersCard: {
    // CardContainer equivalent — elevated on cream
  },
  inviteBtn: {
    width: '100%',
  },
});
