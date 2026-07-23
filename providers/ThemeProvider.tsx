/**
 * ThemeProvider — sets system UI style based on the active theme scheme.
 * Wraps StatusBar and configures system appearance.
 */

import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { type ReactNode, useEffect } from 'react';

import { useAppTheme } from '@hooks/useAppTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDark, colors } = useAppTheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background.primary);
  }, [colors.background.primary]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {children}
    </>
  );
}
