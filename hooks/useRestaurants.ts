/**
 * useRestaurants — React Query wrapper around RestaurantService.
 */

import { useQuery }           from '@tanstack/react-query';
import { RestaurantService }  from '@services/index';
import { useFlatStore }       from '@store/flatStore';

export const restaurantKeys = {
  all:        ['restaurants'] as const,
  suggested:  (flatId: string) => ['restaurants', 'suggested', flatId] as const,
  detail:     (id: string)     => ['restaurants', 'detail', id]        as const,
  menu:       (id: string)     => ['restaurants', 'menu', id]          as const,
};

export function useSuggestedRestaurants() {
  const flat = useFlatStore((s) => s.flat);

  return useQuery({
    queryKey: restaurantKeys.suggested(flat?.id ?? ''),
    queryFn:  () => RestaurantService.getSuggestedRestaurants(
      flat?.id ?? '',
      flat?.address.lat ?? 12.9141,
      flat?.address.lng ?? 77.6411,
    ),
    enabled:   !!flat?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRestaurantDetail(restaurantId: string) {
  return useQuery({
    queryKey: restaurantKeys.detail(restaurantId),
    queryFn:  () => RestaurantService.getRestaurantDetail(restaurantId),
    enabled:  !!restaurantId,
  });
}
