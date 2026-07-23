/**
 * AppProvider — root provider composition.
 * Wraps the entire app in the correct provider order:
 *
 *   ErrorBoundary   (outermost — catches any unhandled render errors)
 *   GestureHandler  (must be inside ErrorBoundary, outermost for gestures)
 *   SafeArea        (layout measurements)
 *   Query           (React Query + client)
 *   Theme           (StatusBar + system UI colours)
 *   Toast           (imperative toast overlay)
 */

import React, { type ReactNode } from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import { GestureProvider } from './GestureProvider';
import { QueryProvider } from './QueryProvider';
import { SafeAreaProvider } from './SafeAreaProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary>
      <GestureProvider>
        <SafeAreaProvider>
          <QueryProvider>
            <ThemeProvider>
              <ToastProvider>{children}</ToastProvider>
            </ThemeProvider>
          </QueryProvider>
        </SafeAreaProvider>
      </GestureProvider>
    </ErrorBoundary>
  );
}

export { useToast } from './ToastProvider';
export { ToastManager } from './ToastProvider';
