/**
 * API response envelope types.
 * All .NET API responses follow this shape.
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: ApiError[];
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  field?: string;
  message: string;
}

export interface ApiMeta {
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: ApiMeta;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiState<T> {
  data: T | null;
  status: ApiStatus;
  error: string | null;
}

// React Query key factories
export type QueryKey = readonly (string | number | boolean | object)[];
