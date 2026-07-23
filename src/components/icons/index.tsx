/**
 * Icon wrapper — always use this, never import from @expo/vector-icons directly.
 *
 * Why: wrapping ensures consistent sizing, color from theme, and accessibility labels.
 * Future: swap Feather for a custom icon font without touching any caller.
 */

import { Feather } from '@expo/vector-icons';
import React from 'react';
import type { ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const SIZE_MAP = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export function Icon({ name, size = 'md', color, style, accessibilityLabel }: IconProps) {
  const { colors } = useTheme();

  const px = typeof size === 'number' ? size : SIZE_MAP[size];
  const iconColor = color ?? colors.text.secondary;

  return (
    <Feather
      name={name as any}
      size={px}
      color={iconColor}
      style={style as any}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : 'none'}
    />
  );
}

// Preset icon components for the most common use cases
export function CheckIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="check" {...props} />;
}
export function XIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="x" {...props} />;
}
export function ChevronRightIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="chevron-right" {...props} />;
}
export function ChevronDownIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="chevron-down" {...props} />;
}
export function SearchIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="search" {...props} />;
}
export function BellIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="bell" {...props} />;
}
export function SettingsIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="settings" {...props} />;
}
export function UserIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="user" {...props} />;
}
export function HomeIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="home" {...props} />;
}
export function StarIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="star" {...props} />;
}
export function ArrowLeftIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="arrow-left" {...props} />;
}
export function MicIcon(props: Omit<IconProps, 'name'>) {
  return <Icon name="mic" {...props} />;
}
