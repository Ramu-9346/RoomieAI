/**
 * NotificationStore — in-app notification list and unread count.
 */

import { create } from 'zustand';
import { immer }  from 'zustand/middleware/immer';

import type { AppNotification } from '@models/Notification';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  pushToken: string | null;

  // Actions
  setNotifications: (notifications: AppNotification[]) => void;
  prependNotification: (notification: AppNotification) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  setPushToken: (token: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  immer((set) => ({
    notifications: [],
    unreadCount:   0,
    pushToken:     null,

    setNotifications: (notifications) =>
      set((state) => {
        state.notifications = notifications;
        state.unreadCount   = notifications.filter((n) => !n.isRead).length;
      }),

    prependNotification: (notification) =>
      set((state) => {
        state.notifications.unshift(notification);
        if (!notification.isRead) state.unreadCount += 1;
      }),

    markAsRead: (id) =>
      set((state) => {
        const n = state.notifications.find((n) => n.id === id);
        if (n && !n.isRead) {
          n.isRead     = true;
          n.readAt     = new Date().toISOString();
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }),

    markAllRead: () =>
      set((state) => {
        const now = new Date().toISOString();
        state.notifications.forEach((n) => {
          n.isRead = true;
          n.readAt = now;
        });
        state.unreadCount = 0;
      }),

    setPushToken: (token) =>
      set((state) => { state.pushToken = token; }),

    clearNotifications: () =>
      set((state) => {
        state.notifications = [];
        state.unreadCount   = 0;
      }),
  })),
);
