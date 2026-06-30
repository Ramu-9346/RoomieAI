/**
 * Currency utilities — always Indian Rupees (INR).
 * All amounts are stored as plain numbers (₹, not paise).
 */

const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style:    'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Format number to "₹1,236" */
export function formatRupees(amount: number): string {
  return INR_FORMATTER.format(amount);
}

/** Format number to "₹1.2K" for compact display */
export function formatRupeesCompact(amount: number): string {
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)}L`;
  if (amount >= 1_000)    return `₹${(amount / 1_000).toFixed(1)}K`;
  return formatRupees(amount);
}

/** Split total evenly among N members; return per-member amount */
export function splitEvenly(total: number, memberCount: number): number {
  if (memberCount === 0) return 0;
  return Math.ceil(total / memberCount);
}

/** Calculate per-member amounts with remainder assigned to first member */
export function splitWithRemainder(
  total: number,
  memberCount: number,
): number[] {
  if (memberCount === 0) return [];
  const base      = Math.floor(total / memberCount);
  const remainder = total - base * memberCount;
  return Array.from({ length: memberCount }, (_, i) =>
    i === 0 ? base + remainder : base,
  );
}

/** Generate UPI deep link for payment */
export function buildUPIDeepLink(params: {
  pa: string;   // payee VPA
  pn: string;   // payee name
  am: number;   // amount
  tn: string;   // transaction note
}): string {
  const searchParams = new URLSearchParams({
    pa: params.pa,
    pn: params.pn,
    am: params.am.toString(),
    cu: 'INR',
    tn: params.tn,
  });
  return `upi://pay?${searchParams.toString()}`;
}

/** Check if food cart is approaching ₹1000 cap (BRD C-002) */
export function isCAPWarning(amount: number): boolean {
  return amount >= 800 && amount < 1000;
}

export function isOverCAP(amount: number): boolean {
  return amount >= 1000;
}
