import { useAuthStore } from './authStore';
import { useChatStore } from './chatStore';
import { useFlatStore } from './flatStore';
import { useNotificationStore } from './notificationStore';
import { useOrderStore } from './orderStore';
import { useUserStore } from './userStore';

export { useAuthStore } from './authStore';
export type { AuthStatus } from './authStore';
export { useUserStore } from './userStore';
export { useFlatStore } from './flatStore';
export { useOrderStore } from './orderStore';
export { useChatStore } from './chatStore';
export { useNotificationStore } from './notificationStore';
export { useThemeStore } from './themeStore';
export type { ThemeScheme } from './themeStore';
export { useSettingsStore } from './settingsStore';

/** Reset all stores — call on logout */
export function resetAllStores(): void {
  const { clearSession } = useAuthStore.getState();
  const { clearUser } = useUserStore.getState();
  const { clearFlat } = useFlatStore.getState();
  const { clearOrders } = useOrderStore.getState();
  const { clearChat } = useChatStore.getState();
  const { clearNotifications } = useNotificationStore.getState();

  clearSession();
  clearUser();
  clearFlat();
  clearOrders();
  clearChat();
  clearNotifications();
}
