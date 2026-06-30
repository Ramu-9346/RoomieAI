export type SplitStatus = 'self' | 'pending' | 'sent' | 'settled';

export interface PaymentSplit {
  memberId: string;
  memberName: string;
  memberIndex: number;
  amount: number;              // ₹
  status: SplitStatus;
  upiId?: string;              // for generating deep links
  paidAt?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  flatId: string;
  total: number;
  splits: PaymentSplit[];
  payerId: string;             // COD payer (opens door)
  settledCount: number;
  totalCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UPIDeepLink {
  pa: string;                  // payee VPA
  pn: string;                  // payee name
  am: string;                  // amount (string for URL)
  cu: string;                  // currency "INR"
  tn: string;                  // transaction note
}
