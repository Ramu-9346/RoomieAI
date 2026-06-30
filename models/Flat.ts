import type { Member } from './Member';
import type { Address } from './Address';

export interface Flat {
  id: string;
  name: string;
  address: Address;
  inviteCode: string;
  adminUserId: string;
  members: Member[];
  settings: FlatSettings;
  createdAt: string;
  updatedAt: string;
}

export interface FlatSummary {
  id: string;
  name: string;
  inviteCode: string;
  memberCount: number;
}

export interface FlatSettings {
  defaultBudgetPerMember: number;   // ₹ — applies to food orders
  pollTimeoutMinutes: number;        // how long polls stay open
  requirePollForOrders: boolean;
  allowCODOnly: boolean;             // true always per BRD C-001
  currencyCode: string;              // "INR"
  timezone: string;                  // "Asia/Kolkata"
}
