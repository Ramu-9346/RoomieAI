/**
 * Onboarding — 3-page horizontal paging experience.
 *
 * Pages:
 *   1. Coordinate Food Orders    — 🛵  group ordering, dietary preferences
 *   2. Smart Grocery Restocking  — 🛒  AI reminders, shared cart, auto-split
 *   3. Shared Living Assistant   — 🏠  polls, bills, flat coordination
 *
 * Controls:
 *   - Skip button (top-right, hidden on last page) → marks onboarded + navigates to main
 *   - Next button → scrolls to next page
 *   - Get Started button (last page only) → marks onboarded + navigates to main
 *   - Swipe gestures → native FlatList pagingEnabled
 *   - Dot indicators (bottom) → animated width for active dot
 *
 * Onboarding status is stored in AsyncStorage (StorageKey.Onboarded = 'true').
 * Once set, app/index.tsx will skip onboarding on all future launches.
 */

import { router } from 'expo-router';
import { useRef, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
  type ViewToken,
  type ListRenderItemInfo,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@components';
import { StorageKey } from '@constants/enums';
import { Routes } from '@constants/routes';
import { useAppTheme } from '@hooks/useAppTheme';
import { LocalStorage } from '@utils/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Onboarding page data ──────────────────────────────────────────────────────

interface Page {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
}

const PAGES: Page[] = [
  {
    id: '1',
    emoji: '🛵',
    title: 'Coordinate\nFood Orders',
    subtitle: 'One order. Everyone happy.',
    description:
      "RoomieAI learns each flatmate's dietary preferences and budget limits, then coordinates a single Swiggy order that works for everyone — no more 5-thread WhatsApp vote.",
  },
  {
    id: '2',
    emoji: '🛒',
    title: 'Smart Grocery\nRestocking',
    subtitle: 'Never run out of milk again.',
    description:
      'Track what\'s running low, get AI-powered restock reminders, and split the Instamart bill automatically. No more "who bought the last eggs" debates.',
  },
  {
    id: '3',
    emoji: '🏠',
    title: 'Shared Living\nAssistant',
    subtitle: 'For people who actually like their flatmates.',
    description:
      'Group polls, automatic bill splitting, shared budgets, and a coordination layer that keeps everyone on the same page — without anyone becoming the flat manager.',
  },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Page>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLast = currentIndex === PAGES.length - 1;

  // Stable callbacks for FlatList (must not change between renders)
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const index = viewableItems[0]?.index;
    if (index !== null && index !== undefined) {
      setCurrentIndex(index);
    }
  });

  function handleNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex < PAGES.length) {
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  }

  function completeOnboarding() {
    LocalStorage.set(StorageKey.Onboarded, 'true');
    router.replace(Routes.Tabs.Home);
  }

  const renderPage = useCallback(
    ({ item }: ListRenderItemInfo<Page>) => (
      <OnboardingPage page={item} colors={colors} spacing={spacing} radius={radius} />
    ),
    [colors, spacing, radius],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Skip button — top right, hidden on last page */}
      {!isLast && (
        <Pressable
          onPress={completeOnboarding}
          style={[
            styles.skipBtn,
            {
              paddingTop: insets.top + spacing.sp12,
              paddingRight: spacing.sp20,
              paddingBottom: spacing.sp8,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
          hitSlop={8}
        >
          <Text variant="body" color={colors.text.muted}>
            Skip
          </Text>
        </Pressable>
      )}

      {/* Page carousel */}
      <FlatList
        ref={listRef}
        data={PAGES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={renderPage}
        style={styles.list}
        bounces={false}
      />

      {/* Footer: dots + CTA */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom + spacing.sp24,
            paddingHorizontal: spacing.pageHorizontal,
          },
        ]}
      >
        {/* Progress dots */}
        <View
          style={styles.dots}
          accessibilityLabel={`Page ${currentIndex + 1} of ${PAGES.length}`}
        >
          {PAGES.map((_, i) => (
            <DotIndicator key={i} active={i === currentIndex} colors={colors} radius={radius} />
          ))}
        </View>

        {/* CTA button */}
        {isLast ? (
          <Pressable
            onPress={completeOnboarding}
            style={[
              styles.ctaBtn,
              {
                backgroundColor: colors.text.primary,
                borderRadius: radius.lg,
                paddingVertical: spacing.sp16,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Get started with RoomieAI"
          >
            <Text variant="button" color={colors.text.inverse} align="center">
              Get Started
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleNext}
            style={[
              styles.ctaBtn,
              {
                backgroundColor: colors.text.primary,
                borderRadius: radius.lg,
                paddingVertical: spacing.sp16,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Next page"
          >
            <Text variant="button" color={colors.text.inverse} align="center">
              Next
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ── Dot indicator ─────────────────────────────────────────────────────────────

interface DotProps {
  active: boolean;
  colors: ReturnType<typeof useAppTheme>['colors'];
  radius: ReturnType<typeof useAppTheme>['radius'];
}

function DotIndicator({ active, colors, radius }: DotProps) {
  const width = useSharedValue(active ? 24 : 8);

  const dotStyle = useAnimatedStyle(() => ({ width: width.value }));

  // Update width when active changes
  width.value = withTiming(active ? 24 : 8, { duration: 250 });

  return (
    <Animated.View
      style={[
        dotStyle,
        {
          height: 8,
          borderRadius: radius.pill,
          backgroundColor: active ? colors.primary.default : colors.border.default,
        },
      ]}
    />
  );
}

// ── Onboarding page ───────────────────────────────────────────────────────────

interface PageProps {
  page: Page;
  colors: ReturnType<typeof useAppTheme>['colors'];
  spacing: ReturnType<typeof useAppTheme>['spacing'];
  radius: ReturnType<typeof useAppTheme>['radius'];
}

function OnboardingPage({ page, colors, radius }: PageProps) {
  return (
    <View style={[styles.page, { width: SCREEN_WIDTH }]}>
      {/* Illustration placeholder */}
      <View
        style={[
          styles.illustration,
          {
            backgroundColor: colors.background.secondary,
            borderRadius: radius.xxxl,
            borderWidth: 1,
            borderColor: colors.border.subtle,
          },
        ]}
        accessibilityRole="image"
        accessibilityLabel={`Illustration for ${page.title}`}
      >
        <Text style={styles.illustrationEmoji}>{page.emoji}</Text>
      </View>

      {/* Text content */}
      <View style={styles.textBlock}>
        <Text
          variant="displayL"
          color={colors.text.primary}
          align="center"
          style={styles.pageTitle}
        >
          {page.title}
        </Text>

        <Text
          variant="bodyMedium"
          color={colors.primary.default}
          align="center"
          style={styles.pageSubtitle}
        >
          {page.subtitle}
        </Text>

        <Text
          variant="body"
          color={colors.text.secondary}
          align="center"
          style={styles.pageDescription}
        >
          {page.description}
        </Text>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'flex-end',
  },
  list: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 32,
  },
  illustration: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: {
    fontSize: 80,
    lineHeight: 96,
  },
  textBlock: {
    alignItems: 'center',
    gap: 10,
    maxWidth: 320,
  },
  pageTitle: {
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    marginTop: 2,
  },
  pageDescription: {
    marginTop: 4,
    lineHeight: 22,
  },
  footer: {
    gap: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  ctaBtn: {
    width: '100%',
  },
});
