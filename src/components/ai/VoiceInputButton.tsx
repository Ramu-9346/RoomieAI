import React from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface VoiceInputButtonProps {
  isRecording?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function VoiceInputButton({
  isRecording = false,
  onPress,
  onLongPress,
  disabled = false,
  style,
}: VoiceInputButtonProps) {
  const { colors, radius, opacity: opacityTokens } = useTheme();

  const scale      = useSharedValue(1);
  const ringScale  = useSharedValue(1);
  const ringOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (isRecording) {
      ringScale.value   = withRepeat(withTiming(1.6, { duration: 1000 }), -1, true);
      ringOpacity.value = withRepeat(withSequence(withTiming(0.5, { duration: 500 }), withTiming(0, { duration: 500 })), -1);
    } else {
      ringScale.value   = 1;
      ringOpacity.value = 0;
    }
  }, [isRecording]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bgColor = isRecording ? colors.error.default : colors.background.secondary;
  const iconColor = isRecording ? colors.white : colors.text.secondary;

  return (
    <Animated.View style={[styles.wrapper, style]}>
      {/* Pulse ring */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.ring,
          { backgroundColor: colors.error.default, borderRadius: 999 },
          ringStyle,
        ]}
      />

      <Animated.View style={buttonStyle}>
        <Pressable
          onPress={disabled ? undefined : onPress}
          onLongPress={disabled ? undefined : onLongPress}
          onPressIn={() => { scale.value = withSpring(0.9, { damping: 22, stiffness: 350 }); }}
          onPressOut={() => { scale.value = withSpring(1,   { damping: 22, stiffness: 350 }); }}
          disabled={disabled}
          style={[
            styles.button,
            {
              backgroundColor: bgColor,
              borderRadius: radius.pill,
              borderWidth: isRecording ? 0 : 1.5,
              borderColor: colors.border.default,
              opacity: disabled ? opacityTokens.disabled : 1,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={isRecording ? 'Stop recording' : 'Start voice input'}
          accessibilityState={{ pressed: isRecording }}
        >
          <Feather
            name={isRecording ? 'square' : 'mic'}
            size={20}
            color={iconColor}
          />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  ring: {
    position: 'absolute',
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
