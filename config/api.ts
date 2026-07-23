/**
 * Axios instance with interceptors for auth, logging, and error mapping.
 * All API calls should use this instance — never call axios directly.
 */

import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@store/authStore';
import { mapHttpStatusToError, AppError } from '@utils/errorMapping';
import { Logger } from '@utils/logger';

import { Env } from './env';

export const apiClient = axios.create({
  baseURL: Env.apiBaseUrl,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-App-Version': '1.0.0',
  },
});

// ─── Request interceptor: inject auth token ───────────────────────────────────
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  Logger.api(config.method?.toUpperCase() ?? 'GET', config.url ?? '', 0);
  return config;
});

// ─── Response interceptor: log + map errors ───────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    Logger.api(
      response.config.method?.toUpperCase() ?? 'GET',
      response.config.url ?? '',
      response.status,
    );
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status ?? 0;
    const errCode = mapHttpStatusToError(status);
    Logger.error('API', `${error.config?.url} → ${status}`, errCode);

    if (status === 401) {
      useAuthStore.getState().clearSession();
    }

    return Promise.reject(new AppError(errCode));
  },
);
