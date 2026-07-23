import React, { type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface GestureProviderProps {
  children: ReactNode;
}

export function GestureProvider({ children }: GestureProviderProps) {
  return <GestureHandlerRootView style={styles.root}>{children}</GestureHandlerRootView>;
}

const styles = StyleSheet.create({ root: { flex: 1 } });
