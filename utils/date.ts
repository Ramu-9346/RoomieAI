/**
 * Date utilities — IST (Asia/Kolkata) aware.
 * Uses date-fns for formatting; no moment.js.
 */

import {
  formatDistanceToNow,
  format,
  isToday,
  isYesterday,
  parseISO,
  differenceInMinutes,
  addDays,
  isBefore,
} from 'date-fns';

/** "2 hours ago", "just now", etc. */
export function timeAgo(isoString: string): string {
  try {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
  } catch {
    return '';
  }
}

/** "Today", "Yesterday", "Mon 29 Jun" */
export function friendlyDate(isoString: string): string {
  try {
    const date = parseISO(isoString);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'EEE d MMM');
  } catch {
    return '';
  }
}

/** "2:14 PM" — for chat timestamps */
export function chatTime(isoString: string): string {
  try {
    return format(parseISO(isoString), 'h:mm a');
  } catch {
    return '';
  }
}

/** "Mon 29 Jun · 2:14 PM" */
export function fullDateTime(isoString: string): string {
  try {
    return format(parseISO(isoString), 'EEE d MMM · h:mm a');
  } catch {
    return '';
  }
}

/** "2d ago", "5h ago", "30m ago" */
export function shortTimeAgo(isoString: string): string {
  try {
    const mins = differenceInMinutes(new Date(), parseISO(isoString));
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  } catch {
    return '';
  }
}

/** Check if Swiggy token is expiring within N days (BRD C-004) */
export function isTokenExpiringSoon(expiryIso: string, warningDays = 1): boolean {
  try {
    return isBefore(parseISO(expiryIso), addDays(new Date(), warningDays));
  } catch {
    return false;
  }
}

/** ISO 8601 from now */
export function nowISO(): string {
  return new Date().toISOString();
}

/** ISO 8601 N minutes from now */
export function minutesFromNow(minutes: number): string {
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}
