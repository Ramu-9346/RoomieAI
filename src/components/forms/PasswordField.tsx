import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { TextInput } from '../inputs/TextInput';

interface PasswordFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function PasswordField({
  value,
  onChangeText,
  label = 'Password',
  placeholder = '••••••••',
  error,
  helperText,
  disabled,
  style,
}: PasswordFieldProps) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const toggleIcon = (
    <Pressable
      onPress={() => setVisible((v) => !v)}
      hitSlop={8}
      accessibilityLabel={visible ? 'Hide password' : 'Show password'}
      accessibilityRole="button"
    >
      <Feather name={visible ? 'eye-off' : 'eye'} size={18} color={colors.text.muted} />
    </Pressable>
  );

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      label={label}
      placeholder={placeholder}
      secureTextEntry={!visible}
      error={error}
      helperText={helperText}
      disabled={disabled}
      rightElement={toggleIcon}
      style={style}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
