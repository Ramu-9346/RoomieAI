/**
 * Named button exports — thin wrappers over the Phase 2 Button primitive.
 * These make screen code self-documenting without duplicating logic.
 *
 * Usage:
 *   import { PrimaryButton, DangerButton } from '@components';
 *   <PrimaryButton label="Place Order" onPress={...} />
 */

import React from 'react';
import type { ViewStyle } from 'react-native';

import { Button, type ButtonSize } from '../primitives/Button';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  size?: ButtonSize;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function PrimaryButton(props: ButtonProps) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: ButtonProps) {
  return <Button variant="secondary" {...props} />;
}

export function GhostButton(props: ButtonProps) {
  return <Button variant="ghost" {...props} />;
}

export function OutlineButton(props: ButtonProps) {
  return <Button variant="secondary" {...props} />;
}

export function DangerButton(props: ButtonProps) {
  return <Button variant="danger" {...props} />;
}

export function SuccessButton(props: ButtonProps) {
  return <Button variant="success" {...props} />;
}

export function FloatingButton(props: ButtonProps) {
  return <Button variant="floating" {...props} />;
}

export function LoadingButton(props: Omit<ButtonProps, 'loading'>) {
  return <Button variant="primary" loading {...props} />;
}

interface HoldToConfirmButtonProps extends Omit<ButtonProps, 'onPress'> {
  onHoldComplete?: () => void;
}

export function HoldToConfirmButton({ onHoldComplete, ...rest }: HoldToConfirmButtonProps) {
  return <Button variant="holdConfirm" onHoldComplete={onHoldComplete} {...rest} />;
}
