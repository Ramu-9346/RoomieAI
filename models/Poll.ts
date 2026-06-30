export type PollStatus = 'active' | 'closed' | 'expired';

export interface PollOption {
  id: string;
  label: string;
  emoji?: string;
}

export interface PollResponse {
  memberId: string;
  memberName: string;
  memberIndex: number;
  optionId: string;
  respondedAt: string;
}

export interface Poll {
  id: string;
  flatId: string;
  question: string;
  options: PollOption[];
  responses: PollResponse[];
  status: PollStatus;
  createdByUserId: string;
  relatedOrderId?: string;     // if poll is for a specific order decision
  expiresAt: string;
  createdAt: string;
}

export interface PollSummary {
  id: string;
  question: string;
  status: PollStatus;
  respondedCount: number;
  totalCount: number;
  winningOptionId?: string;
}
