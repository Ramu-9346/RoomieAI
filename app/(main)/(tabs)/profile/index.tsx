/**
 * ProfileScreen — Personal settings and preferences.
 *
 * Shell layout only. No auth, no real user data, no API calls.
 *
 * Layout:
 *   - Profile header: large avatar + name + role chip
 *   - Account section: Edit Profile, Dietary Preferences, Notifications
 *   - Flat Settings section: Flat Details, Budget Limits
 *   - About section: Privacy Policy, Terms of Service, Version
 *   - Sign Out button (ghost/danger — no action in shell)
 */

import { Feather } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, Avatar, Spacer } from '@components';
import { APP_VERSION } from '@constants/app';
import { useAppTheme } from '@hooks/useAppTheme';

// ── Settings row ──────────────────────────────────────────────────────────────

interface MenuRowProps {
  icon: ComponentProps<typeof Feather>['name'];
  label: string;
  sublabel?: string;
  onPress?: () => void;
  destructive?: boolean;
}

function MenuRow({ icon, label, sublabel, onPress, destructive = false }: MenuRowProps) {
  const { colors, spacing, radius } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuRow,
        {
          paddingHorizontal: spacing.sp16,
          paddingVertical: spacing.sp14,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.menuRowLeft}>
        <View
          style={[
            styles.menuIcon,
            {
              backgroundColor: destructive ? colors.error.surface : colors.background.secondary,
              borderRadius: radius.sm,
            },
          ]}
        >
          <Feather
            name={icon}
            size={16}
            color={destructive ? colors.error.default : colors.text.secondary}
          />
        </View>
        <View style={styles.menuRowText}>
          <Text variant="body" color={destructive ? colors.error.default : colors.text.primary}>
            {label}
          </Text>
          {sublabel && (
            <Text variant="caption" color={colors.text.muted}>
              {sublabel}
            </Text>
          )}
        </View>
      </View>
      {!destructive && <Feather name="chevron-right" size={16} color={colors.text.muted} />}
    </Pressable>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────

function SectionDivider({ title }: { title: string }) {
  const { colors, spacing } = useAppTheme();
  return (
    <View style={[styles.sectionHeader, { paddingHorizontal: spacing.pageHorizontal }]}>
      <Text variant="eyebrow" color={colors.text.muted}>
        {title}
      </Text>
    </View>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const { colors, spacing, radius, shadows } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background.primary }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.sp32 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Profile header ───────────────────────────────────────────── */}
      <View
        style={[
          styles.profileHeader,
          {
            paddingTop: insets.top + spacing.sp24,
            paddingHorizontal: spacing.pageHorizontal,
            paddingBottom: spacing.sp24,
            backgroundColor: colors.background.elevated,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.subtle,
          },
        ]}
      >
        <Avatar name="You" memberIndex={0} size="xl" />
        <Spacer size="sp12" />
        <Text variant="heading" color={colors.text.primary} align="center">
          Your Name
        </Text>
        <Spacer size="sp4" />
        <View style={styles.roleChip}>
          <View
            style={[
              styles.roleChipInner,
              {
                backgroundColor: colors.primary.surface,
                borderRadius: radius.pill,
                paddingHorizontal: spacing.sp12,
                paddingVertical: spacing.sp4,
              },
            ]}
          >
            <Text variant="caption" color={colors.primary.text}>
              Member · Flat 4B
            </Text>
          </View>
        </View>
      </View>

      <Spacer size="sp8" />

      {/* ── Account ──────────────────────────────────────────────────── */}
      <SectionDivider title="Account" />
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.background.elevated,
            borderRadius: radius.xl,
            marginHorizontal: spacing.pageHorizontal,
            ...shadows.card,
          },
        ]}
      >
        <MenuRow icon="edit-2" label="Edit Profile" sublabel="Name, phone, photo" />
        <View style={[styles.separator, { backgroundColor: colors.border.subtle }]} />
        <MenuRow icon="coffee" label="Dietary Preferences" sublabel="Veg, budget, cuisine likes" />
        <View style={[styles.separator, { backgroundColor: colors.border.subtle }]} />
        <MenuRow icon="bell" label="Notification Settings" sublabel="Orders, polls, payments" />
      </View>

      <Spacer size="sp20" />

      {/* ── Flat Settings ────────────────────────────────────────────── */}
      <SectionDivider title="Flat Settings" />
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.background.elevated,
            borderRadius: radius.xl,
            marginHorizontal: spacing.pageHorizontal,
            ...shadows.card,
          },
        ]}
      >
        <MenuRow icon="home" label="Flat Details" sublabel="Name, location, invite code" />
        <View style={[styles.separator, { backgroundColor: colors.border.subtle }]} />
        <MenuRow icon="sliders" label="Budget Limits" sublabel={`Per-order cap: ₹1,000`} />
        <View style={[styles.separator, { backgroundColor: colors.border.subtle }]} />
        <MenuRow icon="moon" label="Appearance" sublabel="Light / Dark / System" />
      </View>

      <Spacer size="sp20" />

      {/* ── About ────────────────────────────────────────────────────── */}
      <SectionDivider title="About" />
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.background.elevated,
            borderRadius: radius.xl,
            marginHorizontal: spacing.pageHorizontal,
            ...shadows.card,
          },
        ]}
      >
        <MenuRow icon="shield" label="Privacy Policy" />
        <View style={[styles.separator, { backgroundColor: colors.border.subtle }]} />
        <MenuRow icon="file-text" label="Terms of Service" />
        <View style={[styles.separator, { backgroundColor: colors.border.subtle }]} />
        <View
          style={[
            styles.menuRow,
            {
              paddingHorizontal: spacing.sp16,
              paddingVertical: spacing.sp14,
            },
          ]}
        >
          <View style={styles.menuRowLeft}>
            <View
              style={[
                styles.menuIcon,
                {
                  backgroundColor: colors.background.secondary,
                  borderRadius: radius.sm,
                },
              ]}
            >
              <Feather name="info" size={16} color={colors.text.secondary} />
            </View>
            <Text variant="body" color={colors.text.primary}>
              Version
            </Text>
          </View>
          <Text variant="mono" color={colors.text.muted}>
            {APP_VERSION}
          </Text>
        </View>
      </View>

      <Spacer size="sp32" />

      {/* ── Sign Out ─────────────────────────────────────────────────── */}
      <View style={{ paddingHorizontal: spacing.pageHorizontal }}>
        <Pressable
          onPress={() => {
            /* Future: logout() from useAuth */
          }}
          style={[
            styles.signOutBtn,
            {
              borderRadius: radius.lg,
              borderWidth: 1.5,
              borderColor: colors.error.default,
              paddingVertical: spacing.sp14,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Sign out of RoomieAI"
        >
          <Feather name="log-out" size={16} color={colors.error.default} />
          <Text variant="button" color={colors.error.default}>
            Sign Out
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  profileHeader: {
    alignItems: 'center',
  },
  roleChip: {
    alignItems: 'center',
    marginTop: 6,
  },
  roleChipInner: {
    // inner chip styling handled inline
  },
  sectionHeader: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  card: {
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRowText: {
    flex: 1,
    gap: 2,
  },
  separator: {
    height: 1,
    marginLeft: 60,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
