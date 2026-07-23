/**
 * FlatScreen — flat roster, member management, and statistics.
 *
 * Shell layout only. No flat data, no member data, no API calls.
 *
 * Layout:
 *   - AppHeader: "Flat 4B" + settings icon
 *   - Members section: NoMembers empty state + "Invite Member" CTA
 *   - Invite card: flat code placeholder (masked, no real code)
 *   - Statistics: 3 placeholder stat tiles (orders, spending, members)
 *   - Monthly summary: empty analytics placeholders
 *
 * Future wiring: Phase 6 will connect useFlatStore, MemberList,
 * real invite codes, and Swiggy token status indicator.
 */

import { Feather } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import { AppHeader, ScreenContainer, Section, Spacer, NoMembers, Text } from '@components';
import { useAppTheme } from '@hooks/useAppTheme';

// ── Stat tile ─────────────────────────────────────────────────────────────────

interface StatTileProps {
  label: string;
  value: string;
  icon: ComponentProps<typeof Feather>['name'];
}

function StatTile({ label, value, icon }: StatTileProps) {
  const { colors, spacing, radius, shadows } = useAppTheme();

  return (
    <View
      style={[
        styles.statTile,
        {
          backgroundColor: colors.background.elevated,
          borderRadius: radius.xl,
          padding: spacing.sp16,
          ...shadows.card,
        },
      ]}
    >
      <Feather name={icon} size={18} color={colors.primary.default} />
      <Spacer size="sp8" />
      <Text variant="heading" color={colors.text.primary}>
        {value}
      </Text>
      <Text variant="caption" color={colors.text.muted}>
        {label}
      </Text>
    </View>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function FlatScreen() {
  const { colors, spacing, radius } = useAppTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background.primary }]}>
      <AppHeader
        title="Flat 4B"
        subtitle="0 of 5 members joined"
        rightElement={
          <Pressable
            onPress={() => {
              /* future: open flat settings modal */
            }}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Flat settings"
          >
            <Feather name="settings" size={20} color={colors.text.primary} />
          </Pressable>
        }
      />

      <ScreenContainer scrollable padded contentContainerStyle={styles.content}>
        {/* ── Members ────────────────────────────────────────────────── */}
        <Section
          title="Members"
          headerRight={
            <Pressable
              onPress={() => {
                /* future: open invite sheet */
              }}
              accessibilityRole="button"
              accessibilityLabel="Invite member"
            >
              <Text variant="caption" color={colors.primary.default}>
                + Invite
              </Text>
            </Pressable>
          }
        >
          <NoMembers
            onPrimaryPress={() => {
              /* future: open invite sheet */
            }}
          />
        </Section>

        <Spacer size="sp28" />

        {/* ── Invite card ────────────────────────────────────────────── */}
        <View
          style={[
            styles.inviteCard,
            {
              backgroundColor: colors.primary.surface,
              borderRadius: radius.xl,
              padding: spacing.cardPaddingLg,
              borderWidth: 1,
              borderColor: colors.primary.default,
            },
          ]}
        >
          <View style={styles.inviteCardRow}>
            <View>
              <Text variant="eyebrow" color={colors.primary.text}>
                Flat Invite Code
              </Text>
              <Spacer size="sp8" />
              <Text variant="heading" color={colors.text.primary}>
                ── ── ──
              </Text>
              <Spacer size="sp4" />
              <Text variant="caption" color={colors.text.secondary}>
                Share this code to invite flatmates
              </Text>
            </View>
            <View
              style={[
                styles.shareBtn,
                {
                  backgroundColor: colors.primary.default,
                  borderRadius: radius.md,
                  padding: spacing.sp10,
                },
              ]}
            >
              <Feather name="share-2" size={18} color={colors.text.inverse} />
            </View>
          </View>
        </View>

        <Spacer size="sp28" />

        {/* ── Statistics ─────────────────────────────────────────────── */}
        <Section title="This Month">
          <View style={styles.statsRow}>
            <StatTile label="Orders" value="0" icon="shopping-bag" />
            <StatTile label="Members" value="0" icon="users" />
            <StatTile label="Spent" value="₹0" icon="credit-card" />
          </View>
        </Section>

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
  inviteCard: {
    // styled inline
  },
  inviteCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shareBtn: {
    // styled inline
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statTile: {
    flex: 1,
  },
});
