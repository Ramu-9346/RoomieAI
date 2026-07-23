/**
 * useOrders — React Query wrapper around OrderService.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { OrderService } from '@services/index';
import type { PlaceOrderParams } from '@services/interfaces/IOrderService';
import { useFlatStore } from '@store/flatStore';
import { useOrderStore } from '@store/orderStore';

export const orderKeys = {
  all: ['orders'] as const,
  history: (flatId: string) => ['orders', 'history', flatId] as const,
  detail: (id: string) => ['orders', 'detail', id] as const,
};

export function useOrderHistory() {
  const flat = useFlatStore((s) => s.flat);

  return useQuery({
    queryKey: orderKeys.history(flat?.id ?? ''),
    queryFn: async () => {
      const history = await OrderService.getOrderHistory(flat?.id ?? '');
      return history;
    },
    enabled: !!flat?.id,
    staleTime: 2 * 60 * 1000,
  });
}

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  const { setActiveOrder, setPlacing } = useOrderStore();
  const flat = useFlatStore((s) => s.flat);

  return useMutation({
    mutationFn: (params: PlaceOrderParams) => OrderService.placeOrder(params),

    onMutate: () => setPlacing(true),

    onSuccess: (order) => {
      setActiveOrder(order);
      setPlacing(false);
      queryClient.invalidateQueries({ queryKey: orderKeys.history(flat?.id ?? '') });
    },

    onError: () => setPlacing(false),
  });
}
