import React, { type ReactNode } from 'react';
import { View, ScrollView, StyleSheet, type ViewStyle, type ScrollViewProps } from 'react-native';

import { useTheme } from '../../theme';

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollProps?: Omit<ScrollViewProps, 'style' | 'contentContainerStyle'>;
}

export function ScreenContainer({
  children,
  scrollable = false,
  padded = true,
  style,
  contentContainerStyle,
  scrollProps,
}: ScreenContainerProps) {
  const { colors, spacing } = useTheme();

  const baseStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background.primary,
  };

  if (scrollable) {
    return (
      <ScrollView
        style={[baseStyle, padded && { paddingHorizontal: spacing.pageHorizontal }, style]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingVertical: spacing.pageVertical },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollProps}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[baseStyle, padded && { paddingHorizontal: spacing.pageHorizontal }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});
