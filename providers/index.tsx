/**
 * AppProvider — root provider composition.
 * Wraps the entire app in the correct provider order:
 *
 *   GestureHandler  (must be outermost for gesture recognizers)
 *   SafeArea        (layout measurements)
 *   Query           (React Query + client)
 *   Theme           (StatusBar + system UI colours)
 *   Toast           (imperative toast overlay)
 */

import React, { type ReactNode } from 'react';
import { GestureProvider }  from './GestureProvider';
import { SafeAreaProvider } from './SafeAreaProvider';
import { QueryProvider }    from './QueryProvider';
import { ThemeProvider }    from './ThemeProvider';
import { ToastProvider }    from './ToastProvider';

interface AppProviderProps { children: ReactNode }

export function AppProvider({ children }: AppProviderProps) {
  return (
    <GestureProvider>
      <SafeAreaProvider>
        <QueryProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureProvider>
  );
}

export { useToast }      from './ToastProvider';
export { ToastManager }  from './ToastProvider';
