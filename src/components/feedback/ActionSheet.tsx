import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, FlatList, Modal, StyleSheet, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';

export interface ActionSheetOption {
  label: string;
  icon?: React.ComponentProps<typeof Feather>['name'];
  description?: string;
  destructive?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

interface ActionSheetProps {
  visible: boolean;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
  onCancel: () => void;
  style?: ViewStyle;
}

export function ActionSheet({
  visible,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
  onCancel,
  style,
}: ActionSheetProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.background.elevated,
              borderTopLeftRadius: radius.xxxl,
              borderTopRightRadius: radius.xxxl,
              paddingBottom: insets.bottom + spacing.sp16,
              ...shadows.elevated,
            },
            style,
          ]}
        >
          {/* Drag handle */}
          <View style={[styles.handle, { backgroundColor: colors.border.default }]} />

          {(title || message) && (
            <View style={[styles.header, { borderBottomColor: colors.border.subtle }]}>
              {title && (
                <Text variant="heading" color={colors.text.primary}>
                  {title}
                </Text>
              )}
              {message && (
                <Text variant="body" color={colors.text.muted}>
                  {message}
                </Text>
              )}
            </View>
          )}

          <FlatList
            data={options}
            keyExtractor={(o, i) => `${o.label}-${i}`}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  item.onPress();
                  onCancel();
                }}
                disabled={item.disabled}
                style={[
                  styles.option,
                  { borderBottomColor: colors.border.subtle },
                  item.disabled && { opacity: 0.4 },
                ]}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                {item.icon && (
                  <Feather
                    name={item.icon}
                    size={20}
                    color={item.destructive ? colors.error.default : colors.text.secondary}
                  />
                )}
                <View style={styles.optionContent}>
                  <Text
                    variant="bodyMedium"
                    color={item.destructive ? colors.error.default : colors.text.primary}
                  >
                    {item.label}
                  </Text>
                  {item.description && (
                    <Text variant="caption" color={colors.text.muted}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </Pressable>
            )}
          />

          <Pressable
            onPress={onCancel}
            style={[
              styles.cancel,
              {
                backgroundColor: colors.background.secondary,
                borderRadius: radius.lg,
                marginHorizontal: spacing.pageHorizontal,
                marginTop: spacing.sp8,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
          >
            <Text variant="bodyMedium" color={colors.text.secondary}>
              {cancelLabel}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(26,23,19,0.5)' },
  sheet: {},
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 14,
  },
  optionContent: { flex: 1, gap: 2 },
  cancel: { paddingVertical: 16, alignItems: 'center' },
});
