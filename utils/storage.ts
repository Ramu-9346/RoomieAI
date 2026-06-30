/**
 * Typed storage abstraction.
 * Uses Expo SecureStore for sensitive data, MMKV for fast non-sensitive data.
 *
 * NEVER store raw API keys or PII in AsyncStorage — use SecureStore.
 */

import * as SecureStore from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';

import { StorageKey } from '@constants/enums';

// Fast key-value storage for non-sensitive data
export const mmkv = new MMKV({ id: 'roomieai-store' });

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
    try { return JSON.parse(raw) as T; } catch { return null; }
  },
};

// ─── Fast local storage (MMKV) ────────────────────────────────────────────────

export const LocalStorage = {
  set(key: string, value: string): void {
    mmkv.set(key, value);
  },

  get(key: string): string | undefined {
    return mmkv.getString(key);
  },

  setJSON<T>(key: string, value: T): void {
    mmkv.set(key, JSON.stringify(value));
  },

  getJSON<T>(key: string): T | null {
    const raw = mmkv.getString(key);
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
  },

  delete(key: string): void {
    mmkv.delete(key);
  },

  clearAll(): void {
    mmkv.clearAll();
  },
};
