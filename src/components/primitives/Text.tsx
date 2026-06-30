/**
 * Text — RoomieAI Typography Primitive
 *
 * The single source of all text rendering in the app.
 * Never use React Native's <Text> directly — always use this component.
 *
 * Props:
 *   variant   — maps to TextStyles keys (displayXL, body, mono, etc.)
 *   color     — semantic color key or explicit hex string
 *   align     — text alignment
 *   italic    — switches to italic variant of the current font family
 *   bold      — switches to bold weight of the current font family
 *   dim       — reduces opacity to opacity.muted (for secondary text)
 *   onPress   — makes text tappable (renders as TouchableOpacity)
 *
 * Variants use the three-font system automatically:
 *   - display*, heading, title → Fraunces (serif)
 *   - body, subtitle, button, caption → Geist (sans)
 *   - mono*, eyebrow → Geist Mono
 */

import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  type TextStyle,
  type StyleProp,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme';
import { TextStyles, type TextVariant } from '../../theme/typography';

interface TextProps {
  /** Typography variant — defines font, size, weight, and line height */
  variant?: TextVariant;
  /** Override text color. Accepts any valid CSS/RN color string */
  color?: string;
  /** Horizontal text alignment */
  align?: 'left' | 'center' | 'right';
  /** Force italic — switches to the italic variant of the font family */
  italic?: boolean;
  /** Override with bold weight */
  bold?: boolean;
  /** Reduce to muted opacity */
  dim?: boolean;
  /** Number of lines before truncation with ellipsis */
  numberOfLines?: number;
  /** Makes the text element tappable */
  onPress?: () => void;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Additional StyleSheet styles — applied after variant styles */
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const SERIF_ITALIC_MAP: Partial<Record<TextVariant, string>> = {
  displayXL:  'Fraunces_500Medium_Italic',
  displayL:   'Fraunces_500Medium_Italic',
  heading:    'Fraunces_500Medium_Italic',
  title:      'Fraunces_500Medium_Italic',
  captionItalic: 'Fraunces_400Regular_Italic',
};

const BOLD_MAP: Partial<Record<TextVariant, string>> = {
  body:     'Geist_700Bold',
  subtitle: 'Geist_700Bold',
  button:   'Geist_700Bold',
  caption:  'Geist_600SemiBold',
  mono:     'GeistMono_500Medium',
  monoSmall: 'GeistMono_500Medium',
};

export function Text({
  variant = 'body',
  color,
  align = 'left',
  italic = false,
  bold = false,
  dim = false,
  numberOfLines,
  onPress,
  accessibilityLabel,
  style,
  children,
}: TextProps) {
  const { colors, opacity } = useTheme();

  const variantStyle = TextStyles[variant];

  const resolvedColor = color ?? colors.text.primary;

  const fontFamilyOverride = italic
    ? (SERIF_ITALIC_MAP[variant] ?? variantStyle.fontFamily)
    : bold
    ? (BOLD_MAP[variant] ?? variantStyle.fontFamily)
    : undefined;

  const composedStyle: TextStyle = {
    ...variantStyle,
    color: resolvedColor,
    textAlign: align,
    ...(fontFamilyOverride ? { fontFamily: fontFamilyOverride } : {}),
    ...(dim ? { opacity: opacity.muted } : {}),
  };

  const textElement = (
    <RNText
      style={[composedStyle, style]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={onPress ? 'link' : 'text'}
    >
      {children}
    </RNText>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {textElement}
      </TouchableOpacity>
    );
  }

  return textElement;
}

export default Text;
