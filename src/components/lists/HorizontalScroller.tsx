import React, { type ReactNode } from 'react';
import { ScrollView, View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface HorizontalScrollerProps {
  children: ReactNode;
  title?: string;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
  itemGap?: number;
  paddingHorizontal?: number;
  style?: ViewStyle;
}

export function HorizontalScroller({
  children,
  title,
  showSeeAll = false,
  onSeeAll,
  itemGap,
  paddingHorizontal,
  style,
}: HorizontalScrollerProps) {
  const { colors, spacing } = useTheme();
  const gap = itemGap ?? spacing.sp12;
  const ph  = paddingHorizontal ?? spacing.pageHorizontal;

  return (
    <View style={style}>
      {(title || showSeeAll) && (
        <View style={[styles.header, { paddingHorizontal: ph, marginBottom: spacing.sp12 }]}>
          {title && (
            <Text variant="eyebrow" color={colors.primary.text}>{title}</Text>
          )}
          {showSeeAll && onSeeAll && (
            <Text variant="caption" color={colors.primary.default} onPress={onSeeAll}>
              See all
            </Text>
          )}
        </View>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap, paddingHorizontal: ph, paddingRight: ph + gap }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
