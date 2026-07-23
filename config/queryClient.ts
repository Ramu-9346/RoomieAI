/**
 * React Query client configuration.
 * Global defaults: 3 retries, 5-minute stale time, smart error handling.
 */

import { QueryClient } from '@tanstack/react-query';

import { Logger } from '@utils/logger';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      refetchOnWindowFocus: false, // mobile: no window focus concept
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        Logger.error('ReactQuery', 'Mutation failed', error);
      },
    },
  },
});
