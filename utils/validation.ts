/**
 * Zod-based validation schemas for forms.
 * All schemas produce typed output; use `schema.parse()` in submit handlers.
 */

import { z } from 'zod';

// ─── Phone validation ──────────────────────────────────────────────────────────

const INDIA_PHONE_REGEX = /^[6-9]\d{9}$/;

export const phoneSchema = z
  .string()
  .min(10, 'Enter a 10-digit mobile number')
  .max(10, 'Enter a 10-digit mobile number')
  .regex(INDIA_PHONE_REGEX, 'Enter a valid Indian mobile number');

export const otpSchema = z
  .string()
  .length(6, 'OTP must be 6 digits')
  .regex(/^\d+$/, 'OTP must contain only digits');

// ─── Onboarding ────────────────────────────────────────────────────────────────

export const onboardingSchema = z.object({
  name:        z.string().min(2, 'Name must be at least 2 characters').max(50),
  dietaryType: z.enum(['veg', 'non-veg', 'eggetarian', 'jain', 'vegan']),
  allergens:   z.array(z.string()).default([]),
  cuisines:    z.array(z.string()).default([]),
});

export type OnboardingForm = z.infer<typeof onboardingSchema>;

// ─── Flat setup ────────────────────────────────────────────────────────────────

export const createFlatSchema = z.object({
  name:    z.string().min(2, 'Flat name is required').max(50),
  address: z.object({
    line1:   z.string().min(5, 'Address is required'),
    city:    z.string().min(2, 'City is required'),
    pincode: z.string().length(6, 'Enter a valid 6-digit pincode'),
  }),
});

export type CreateFlatForm = z.infer<typeof createFlatSchema>;

export const joinFlatSchema = z.object({
  inviteCode: z.string().length(6, 'Enter the 6-character invite code').toUpperCase(),
});

export type JoinFlatForm = z.infer<typeof joinFlatSchema>;

// ─── Chat message ──────────────────────────────────────────────────────────────

export const chatMessageSchema = z.object({
  content: z.string().min(1).max(2000),
});

// ─── Preference update ────────────────────────────────────────────────────────

export const preferenceSchema = z.object({
  dietaryType:    z.enum(['veg', 'non-veg', 'eggetarian', 'jain', 'vegan']),
  allergens:      z.array(z.string()),
  cuisines:       z.array(z.string()),
  budgetPerOrder: z.number().min(0).max(5000),
  spiceTolerance: z.enum(['mild', 'medium', 'hot']),
});

export type PreferenceForm = z.infer<typeof preferenceSchema>;
