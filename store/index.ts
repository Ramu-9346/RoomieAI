export { useAuthStore }                  from './authStore';
export type { AuthStatus }               from './authStore';
export { useUserStore }                  from './userStore';
export { useFlatStore }                  from './flatStore';
export { useOrderStore }                 from './orderStore';
export { useChatStore }                  from './chatStore';
export { useNotificationStore }          from './notificationStore';
export { useThemeStore }                 from './themeStore';
export type { ThemeScheme }              from './themeStore';
export { useSettingsStore }              from './settingsStore';

/** Reset all stores — call on logout */
export function resetAllStores(): void {
  const { clearSession }       = require('./authStore').useAuthStore.getState();
  const { clearUser }          = require('./userStore').useUserStore.getState();
  const { clearFlat }          = require('./flatStore').useFlatStore.getState();
  const { clearOrders }        = require('./orderStore').useOrderStore.getState();
  const { clearChat }          = require('./chatStore').useChatStore.getState();
  const { clearNotifications } = require('./notificationStore').useNotificationStore.getState();

  clearSession();
  clearUser();
  clearFlat();
  clearOrders();
  clearChat();
  clearNotifications();
}
