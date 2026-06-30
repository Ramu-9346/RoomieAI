import React, { type ReactNode }             from 'react';
import { SafeAreaProvider as RNSafeAreaProvider } from 'react-native-safe-area-context';

interface SafeAreaProviderProps { children: ReactNode }

export function SafeAreaProvider({ children }: SafeAreaProviderProps) {
  return <RNSafeAreaProvider>{children}</RNSafeAreaProvider>;
}
