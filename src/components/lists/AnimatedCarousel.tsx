import React, { useState, useCallback, type ReactNode } from 'react';
import {
  View,
  Pressable,
  FlatList,
  Dimensions,
  StyleSheet,
  type ViewStyle,
  type ListRenderItem,
} from 'react-native';
import { useTheme } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AnimatedCarouselProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  itemWidth?: number;
  showDots?: boolean;
  style?: ViewStyle;
}

export function AnimatedCarousel<T>({
  data,
  renderItem,
  keyExtractor,
  itemWidth = SCREEN_WIDTH - 64,
  showDots = true,
  style,
}: AnimatedCarouselProps<T>) {
  const { colors, spacing } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const onMomentumScrollEnd = useCallback((e: any) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index  = Math.round(offset / (itemWidth + spacing.sp16));
    setActiveIndex(index);
  }, [itemWidth, spacing.sp16]);

  return (
    <View style={style}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + spacing.sp16}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: spacing.pageHorizontal,
          gap: spacing.sp16,
        }}
      />

      {showDots && data.length > 1 && (
        <View style={styles.dots}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === activeIndex
                      ? colors.primary.default
                      : colors.border.default,
                  width: i === activeIndex ? 16 : 6,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 12,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});
