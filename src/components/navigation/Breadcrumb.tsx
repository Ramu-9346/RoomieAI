import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  style?: ViewStyle;
}

export function Breadcrumb({ items, style }: BreadcrumbProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={index} style={styles.item}>
            <Pressable
              onPress={item.onPress}
              disabled={isLast || !item.onPress}
              accessibilityRole={item.onPress ? 'link' : 'text'}
            >
              <Text
                variant={isLast ? 'bodyMedium' : 'caption'}
                color={isLast ? colors.text.primary : colors.primary.default}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
            {!isLast && <Feather name="chevron-right" size={14} color={colors.text.muted} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 2 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});
