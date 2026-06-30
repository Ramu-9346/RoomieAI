export type NotificationType =
  | 'poll_created'
  | 'poll_closed'
  | 'order_placed'
  | 'order_delivered'
  | 'order_cancelled'
  | 'payment_received'
  | 'payment_reminder'
  | 'member_joined'
  | 'member_left'
  | 'token_expiry'             // Swiggy token expires soon (BRD C-004)
  | 'system';

export interface NotificationPayload {
  orderId?: string;
  pollId?: string;
  memberId?: string;
  amount?: number;
  deepLink?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  payload: NotificationPayload;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}
