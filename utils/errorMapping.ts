/**
 * Error code → user-friendly message mapping.
 * All Swiggy MCP error codes and internal codes are mapped here.
 */

export type AppErrorCode =
  // Auth
  | 'AUTH_INVALID_OTP'
  | 'AUTH_OTP_EXPIRED'
  | 'AUTH_SESSION_EXPIRED'
  // Flat
  | 'FLAT_INVITE_INVALID'
  | 'FLAT_INVITE_EXPIRED'
  | 'FLAT_FULL'
  // Swiggy
  | 'SWIGGY_TOKEN_EXPIRED'       // BRD C-004
  | 'SWIGGY_TOKEN_INVALID'
  | 'SWIGGY_RESTAURANT_CLOSED'
  | 'SWIGGY_ITEM_UNAVAILABLE'
  | 'SWIGGY_CART_CAP_EXCEEDED'   // BRD C-002: ₹1000 cap
  | 'SWIGGY_ORDER_FAILED'
  | 'SWIGGY_RATE_LIMITED'
  // Network
  | 'NETWORK_UNAVAILABLE'
  | 'REQUEST_TIMEOUT'
  | 'SERVER_ERROR'
  // Generic
  | 'UNKNOWN';

const ERROR_MESSAGES: Record<AppErrorCode, string> = {
  AUTH_INVALID_OTP:         'That OTP is incorrect. Please try again.',
  AUTH_OTP_EXPIRED:         'OTP expired. Tap "Resend" to get a new one.',
  AUTH_SESSION_EXPIRED:     'Your session expired. Please log in again.',
  FLAT_INVITE_INVALID:      'That invite code is not valid.',
  FLAT_INVITE_EXPIRED:      'That invite link has expired. Ask your flatmate for a new one.',
  FLAT_FULL:                'This flat already has 8 members — the maximum allowed.',
  SWIGGY_TOKEN_EXPIRED:     'Your Swiggy connection expired. Tap to re-verify.',
  SWIGGY_TOKEN_INVALID:     'Could not connect to Swiggy. Please re-link your account.',
  SWIGGY_RESTAURANT_CLOSED: 'This restaurant is currently closed.',
  SWIGGY_ITEM_UNAVAILABLE:  'One or more items are no longer available.',
  SWIGGY_CART_CAP_EXCEEDED: 'Food cart cannot exceed ₹1,000 per order.',
  SWIGGY_ORDER_FAILED:      'Order could not be placed on Swiggy. Please try again.',
  SWIGGY_RATE_LIMITED:      'Too many requests to Swiggy. Please wait a moment.',
  NETWORK_UNAVAILABLE:      'No internet connection. Check your network and try again.',
  REQUEST_TIMEOUT:          'Request timed out. Please try again.',
  SERVER_ERROR:             'Something went wrong on our end. Please try again.',
  UNKNOWN:                  'Something went wrong. Please try again.',
};

export function getErrorMessage(code: AppErrorCode | string): string {
  return ERROR_MESSAGES[code as AppErrorCode] ?? ERROR_MESSAGES.UNKNOWN;
}

export function mapHttpStatusToError(status: number): AppErrorCode {
  if (status === 401) return 'AUTH_SESSION_EXPIRED';
  if (status === 429) return 'SWIGGY_RATE_LIMITED';
  if (status >= 500)  return 'SERVER_ERROR';
  return 'UNKNOWN';
}

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly userMessage: string;

  constructor(code: AppErrorCode, detail?: string) {
    super(detail ?? getErrorMessage(code));
    this.code        = code;
    this.userMessage = getErrorMessage(code);
    this.name        = 'AppError';
  }
}
