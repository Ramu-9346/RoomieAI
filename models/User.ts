import type { DietaryType } from './Preference';

export interface User {
  id: string;
  name: string;
  phone: string;             // E.164 format: +91XXXXXXXXXX
  avatarUrl?: string;
  flatId?: string;
  memberIndex: number;       // 0-7, maps to member colour
  isOnboarded: boolean;
  createdAt: string;         // ISO 8601
  updatedAt: string;
}

export interface UserProfile extends User {
  preferences: import('./Preference').Preference;
  flat?: import('./Flat').FlatSummary;
}
