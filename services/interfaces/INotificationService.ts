import type { AppNotification } from '@models/Notification';

export interface INotificationService {
  /** Register device push token */
  registerPushToken(userId: string, token: string): Promise<void>;

  /** Get notification history */
  getNotifications(userId: string, page?: number): Promise<AppNotification[]>;

  /** Mark notification as read */
  markAsRead(notificationId: string): Promise<void>;

  /** Mark all as read */
  markAllRead(userId: string): Promise<void>;
}
