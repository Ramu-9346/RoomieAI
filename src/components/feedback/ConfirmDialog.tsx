/**
 * ConfirmDialog — Blocking confirmation modal
 *
 * Used for:
 *   - "Place order for ₹1,236?" (before holdConfirm button)
 *   - "Remove Priya from flat?"
 *   - "Cancel this order?" (if still within Swiggy cancellation window)
 *
 * Always shows title + body + two buttons (cancel / confirm).
 * Destructive variant colours the confirm button red.
 */

import React from 'react';
import { View, Modal, Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../../theme';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { colors, radius, spacing, shadows, opacity: opacityTokens, zIndex } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <Pressable
        style={[styles.scrim, { backgroundColor: `rgba(26,23,19,${opacityTokens.overlay})` }]}
        onPress={onCancel}
      />

      <View style={styles.centreWrap} pointerEvents="box-none">
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background.primary,
              borderRadius: radius.xxl,
              padding: spacing.sp24,
              ...shadows.modal,
              zIndex: zIndex.modal,
            },
          ]}
        >
          <Text variant="title" color={colors.text.primary} align="center">
            {title}
          </Text>

          {body && (
            <Text
              variant="body"
              color={colors.text.secondary}
              align="center"
              style={{ marginTop: spacing.sp8 }}
            >
              {body}
            </Text>
          )}

          <View style={[styles.actions, { marginTop: spacing.sp20, gap: spacing.sp8 }]}>
            <Button
              variant="secondary"
              size="md"
              onPress={onCancel}
              label={cancelLabel}
              style={styles.actionBtn}
            />
            <Button
              variant={destructive ? 'danger' : 'primary'}
              size="md"
              onPress={onConfirm}
              label={confirmLabel}
              style={styles.actionBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  centreWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    flex: 1,
  },
});
