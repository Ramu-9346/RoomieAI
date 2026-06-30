import type { DietaryType } from './Preference';

export interface Member {
  userId: string;
  flatId: string;
  name: string;
  memberIndex: number;       // 0-7 — stable for identity colour
  isAdmin: boolean;
  isActive: boolean;
  isOnline: boolean;
  dietaryType: DietaryType;
  allergens: string[];
  joinedAt: string;
}

export interface MemberInvite {
  id: string;
  flatId: string;
  invitedPhone: string;
  invitedByUserId: string;
  status: 'pending' | 'accepted' | 'expired';
  expiresAt: string;
  createdAt: string;
}
