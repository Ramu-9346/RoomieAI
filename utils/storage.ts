/**
 * Typed storage abstraction.
 * Uses Expo SecureStore for sensitive data, AsyncStorage for fast non-sensitive data.
 *
 * NEVER store raw API keys or PII in AsyncStorage — use SecureStore.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import type { StorageKey } from '@constants/enums';

// In-memory cache keeps LocalStorage reads synchronous.
const cache = new Map<string, string>();

// Preloads all AsyncStorage keys into the cache on module import.
// Callers that must read a value written in a previous session should
// await hydratePromise before calling LocalStorage.get().
export const hydratePromise: Promise<void> = AsyncStorage.getAllKeys().then(async (keys) => {
  if (keys.length === 0) return;
  const pairs = await AsyncStorage.multiGet(Array.from(keys));
  for (const [key, value] of pairs) {
    if (value !== null) cache.set(key, value);
  }
});

// ─── Secure (encrypted) storage ───────────────────────────────────────────────

export const SecureStorage = {
  async set(key: StorageKey, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  },

  async get(key: StorageKey): Promise<string | null> {
    return SecureStore.getItemAsync(key);
  },

  async delete(key: StorageKey): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  },

  async setJSON<T>(key: StorageKey, value: T): Promise<void> {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },

  async getJSON<T>(key: StorageKey): Promise<T | null> {
    const raw = await SecureStore.getItemAsync(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
};

// ─── Local storage (AsyncStorage + memory cache) ──────────────────────────────
// Reads are synchronous from the in-memory cache.
// Writes update the cache immediately and persist to AsyncStorage in the background.

export const LocalStorage = {
  set(key: string, value: string): void {
    cache.set(key, value);
    AsyncStorage.setItem(key, value);
  },

  get(key: string): string | undefined {
    return cache.get(key);
  },

  setJSON<T>(key: string, value: T): void {
    const str = JSON.stringify(value);
    cache.set(key, str);
    AsyncStorage.setItem(key, str);
  },

  getJSON<T>(key: string): T | null {
    const raw = cache.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  delete(key: string): void {
    cache.delete(key);
    AsyncStorage.removeItem(key);
  },

  clearAll(): void {
    const keys = [...cache.keys()];
    cache.clear();
    AsyncStorage.multiRemove(keys);
  },
};
