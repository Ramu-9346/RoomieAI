import React from 'react';
import { FlatList, View, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { RestaurantCard } from '../cards/RestaurantCard';
import { RestaurantSkeleton } from '../loaders/index';

interface Restaurant {
  id: string;
  name: string;
  meta: string;
  fitReason?: string;
  rating?: number;
  emoji?: string;
  deliveryTime?: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
  selectedId?: string;
  onPress?: (id: string) => void;
  style?: ViewStyle;
}

export function RestaurantList({
  restaurants,
  isLoading = false,
  selectedId,
  onPress,
  style,
}: RestaurantListProps) {
  const { spacing } = useTheme();

  if (isLoading) {
    return (
      <View style={{ gap: spacing.sp12 }}>
        {[0, 1, 2].map((i) => (
          <RestaurantSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(r) => r.id}
      scrollEnabled={false}
      contentContainerStyle={{ gap: spacing.sp12 }}
      renderItem={({ item }) => (
        <RestaurantCard
          name={item.name}
          meta={item.meta}
          fitReason={item.fitReason}
          rating={item.rating}
          emoji={item.emoji}
          deliveryTime={item.deliveryTime}
          selected={item.id === selectedId}
          onPress={onPress ? () => onPress(item.id) : undefined}
        />
      )}
      style={style}
    />
  );
}
