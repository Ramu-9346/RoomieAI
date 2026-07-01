import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

interface GridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: number;
  style?: ViewStyle;
}

export function Grid({ children, columns = 2, gap, style }: GridProps) {
  const { spacing } = useTheme();
  const columnGap = gap ?? spacing.sp12;

  const childArray = React.Children.toArray(children);

  return (
    <View style={[styles.container, { gap: columnGap }, style]}>
      {childArray.map((child, index) => (
        <View
          key={index}
          style={{
            width: `${100 / columns}%` as unknown as number,
            paddingRight: index % columns !== columns - 1 ? columnGap / 2 : 0,
            paddingLeft: index % columns !== 0 ? columnGap / 2 : 0,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

// Convenience: single item fills grid width
interface GridItemProps {
  children: ReactNode;
  span?: number;
  style?: ViewStyle;
}

export function GridItem({ children, style }: GridItemProps) {
  return <View style={[styles.item, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flex: 1,
  },
});
