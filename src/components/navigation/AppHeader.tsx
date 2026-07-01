import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { Avatar } from '../primitives/Avatar';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showAvatar?: boolean;
  avatarName?: string;
  avatarIndex?: number;
  avatarUrl?: string;
  rightElement?: ReactNode;
  onAvatarPress?: () => void;
  style?: ViewStyle;
}

export function AppHeader({
  title,
  subtitle,
  showAvatar = false,
  avatarName,
  avatarIndex = 0,
  avatarUrl,
  rightElement,
  onAvatarPress,
  style,
}: AppHeaderProps) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.sp8,
          paddingHorizontal: spacing.pageHorizontal,
          paddingBottom: spacing.sp12,
          backgroundColor: colors.background.primary,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border.subtle,
        },
        style,
      ]}
    >
      <View style={styles.left}>
        {showAvatar && avatarName && (
          <Pressable onPress={onAvatarPress} hitSlop={8}>
            <Avatar name={avatarName} memberIndex={avatarIndex} avatarUrl={avatarUrl} size="sm" />
          </Pressable>
        )}
        <View style={styles.titleBlock}>
          {title && (
            <Text variant="heading" color={colors.text.primary} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text variant="caption" color={colors.text.muted} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement && <View style={styles.right}>{rightElement}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  titleBlock: { flex: 1, gap: 1 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 12 },
});
