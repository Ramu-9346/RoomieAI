/**
 * RestaurantCard — Restaurant Listing Component
 *
 * Used in:
 *   - Dineout options list (AI presents 3 ranked options)
 *   - Order history (restaurant identity in past orders)
 *   - "I've seen you order from here 6 times" memory surface
 *
 * Maps directly to the .dineout-option + .order-restaurant patterns
 * from the web demo.
 *
 * Props:
 *   name       — restaurant name (Fraunces Medium)
 *   meta       — "Jubilee Hills · ₹2,800 for 4" (Geist Mono)
 *   fitReason  — "Great veg menu · quiet corner section" (Fraunces italic)
 *   rating     — numeric rating (e.g., 4.4) — shown in green badge
 *   emoji      — food emoji for icon placeholder (🍛, 🍽, etc.)
 *   onPress    — navigates to restaurant detail or selects this option
 *   selected   — highlights with primary border when chosen
 *   deliveryTime — "35 min" for food cards
 *   distance   — "1.2 km"
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { RatingBadge } from '../primitives/Badge';

interface RestaurantCardProps {
  name: string;
  meta: string;
  fitReason?: string;
  rating?: number;
  emoji?: string;
  deliveryTime?: string;
  distance?: string;
  onPress?: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

export function RestaurantCard({
  name,
  meta,
  fitReason,
  rating,
  emoji = '🍽',
  deliveryTime,
  distance,
  onPress,
  selected = false,
  style,
}: RestaurantCardProps) {
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderRadius:    radius.xl,
          borderWidth:     1,
          borderColor:     selected
            ? colors.primary.default
            : pressed
            ? colors.border.strong
            : colors.border.default,
          padding: spacing.sp12,
          ...shadows.card,
        },
        pressed && { transform: [{ translateY: -1 }] },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${name}, rated ${rating}. ${fitReason ?? ''}`}
    >
      <View style={styles.row}>
        {/* Emoji icon */}
        <View
          style={[
            styles.icon,
            {
              backgroundColor: colors.accent.surface,
              borderRadius:    radius.md,
              width:           40,
              height:          40,
            },
          ]}
        >
          <Text variant="title" style={styles.emoji}>
            {emoji}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text variant="title" color={colors.text.primary} numberOfLines={1}>
            {name}
          </Text>

          <View style={styles.metaRow}>
            <Text variant="monoSmall" color={colors.text.muted}>
              {meta}
            </Text>
            {deliveryTime && (
              <>
                <Text variant="monoSmall" color={colors.border.default}>
                  {' · '}
                </Text>
                <Text variant="monoSmall" color={colors.text.muted}>
                  {deliveryTime}
                </Text>
              </>
            )}
          </View>

          {fitReason && (
            <Text
              variant="captionItalic"
              color={colors.success.text}
              style={styles.fitReason}
            >
              {fitReason}
            </Text>
          )}
        </View>

        {/* Rating */}
        {rating !== undefined && (
          <RatingBadge rating={rating} style={styles.rating} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           12,
  },
  icon: {
    alignItems:     'center',
    justifyContent: 'center',
    flexShrink:     0,
  },
  emoji: {
    fontSize:    20,
    includeFontPadding: false,
  },
  content: {
    flex: 1,
    gap:  3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  fitReason: {
    marginTop: 2,
  },
  rating: {
    flexShrink: 0,
    alignSelf:  'flex-start',
  },
});
