/**
 * Typed environment variable access.
 * All EXPO_PUBLIC_ variables are accessible at runtime.
 * Private variables (no EXPO_PUBLIC_) are server-side only.
 */

export const Env = {
  appEnv:         (process.env.EXPO_PUBLIC_APP_ENV ?? 'development') as 'development' | 'staging' | 'production',
  apiBaseUrl:      process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:5000',
  useMockData:     process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true',
  featureDineout:  process.env.EXPO_PUBLIC_FEATURE_DINEOUT === 'true',
  featureDarkMode: process.env.EXPO_PUBLIC_FEATURE_DARK_MODE === 'true',
} as const;

export const isDev     = Env.appEnv === 'development';
export const isStaging = Env.appEnv === 'staging';
export const isProd    = Env.appEnv === 'production';
