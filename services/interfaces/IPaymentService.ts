import type { Payment, PaymentSplit } from '@models/Payment';

export interface IPaymentService {
  /** Get payment detail for an order */
  getPayment(orderId: string): Promise<Payment>;

  /** Mark a split as "sent" (self-reporting in v1) */
  markSplitSent(orderId: string, memberId: string): Promise<void>;

  /** Mark a split as "settled" */
  markSplitSettled(orderId: string, memberId: string): Promise<void>;

  /** Get unsettled splits for the current user */
  getUnsettledSplits(userId: string): Promise<(PaymentSplit & { orderId: string })[]>;
}
