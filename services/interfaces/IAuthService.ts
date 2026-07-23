export interface IAuthService {
  /** Send OTP to phone. Returns requestId for verification. */
  sendOTP(phone: string): Promise<{ requestId: string }>;

  /** Verify OTP and return auth token */
  verifyOTP(
    phone: string,
    otp: string,
    requestId: string,
  ): Promise<{
    token: string;
    userId: string;
    expiresAt: string;
    isNewUser: boolean;
  }>;

  /** Refresh auth token */
  refreshToken(token: string): Promise<{ token: string; expiresAt: string }>;

  /** Revoke session (logout) */
  logout(token: string): Promise<void>;
}
