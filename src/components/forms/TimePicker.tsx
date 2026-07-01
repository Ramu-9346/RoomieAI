import React, { useState } from 'react';
import { View, Pressable, Modal, ScrollView, StyleSheet, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  label?: string;
  placeholder?: string;
  style?: ViewStyle;
}

function pad(n: number) { return n.toString().padStart(2, '0'); }

const HOURS   = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = ['00', '15', '30', '45'];
const PERIODS = ['AM', 'PM'];

export function TimePicker({
  value,
  onChange,
  label,
  placeholder = 'Select time',
  style,
}: TimePickerProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const [open, setOpen] = useState(false);
  const [hour,   setHour]   = useState(7);
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('PM');

  const formatted = value ?? `${pad(hour)}:${minute} ${period}`;

  const confirm = () => {
    onChange(`${pad(hour)}:${minute} ${period}`);
    setOpen(false);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text variant="eyebrow" color={colors.text.muted}>{label}</Text>}

      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.trigger,
          {
            borderRadius: radius.sm,
            borderColor: colors.border.default,
            borderWidth: 1.5,
            backgroundColor: colors.background.elevated,
            paddingHorizontal: spacing.inputHorizontal,
            paddingVertical: spacing.inputVertical,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={label ?? 'Time picker'}
      >
        <Text variant="mono" color={value ? colors.text.primary : colors.text.muted} style={styles.flex}>
          {formatted}
        </Text>
        <Feather name="clock" size={18} color={colors.text.muted} />
      </Pressable>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: colors.background.elevated,
                borderTopLeftRadius: radius.xxxl,
                borderTopRightRadius: radius.xxxl,
                ...shadows.elevated,
              },
            ]}
          >
            <Text variant="heading" color={colors.text.primary} style={styles.sheetTitle}>
              Select Time
            </Text>

            <View style={styles.pickers}>
              {/* Hour */}
              <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
                {HOURS.map((h) => (
                  <Pressable key={h} onPress={() => setHour(h)} style={[styles.timeCell, h === hour && { backgroundColor: colors.primary.surface, borderRadius: radius.md }]}>
                    <Text variant="mono" color={h === hour ? colors.primary.text : colors.text.muted}>{pad(h)}</Text>
                  </Pressable>
                ))}
              </ScrollView>

              <Text variant="heading" color={colors.text.muted}>:</Text>

              {/* Minute */}
              <View style={styles.column}>
                {MINUTES.map((m) => (
                  <Pressable key={m} onPress={() => setMinute(m)} style={[styles.timeCell, m === minute && { backgroundColor: colors.primary.surface, borderRadius: radius.md }]}>
                    <Text variant="mono" color={m === minute ? colors.primary.text : colors.text.muted}>{m}</Text>
                  </Pressable>
                ))}
              </View>

              {/* AM/PM */}
              <View style={styles.column}>
                {PERIODS.map((p) => (
                  <Pressable key={p} onPress={() => setPeriod(p as 'AM' | 'PM')} style={[styles.timeCell, p === period && { backgroundColor: colors.primary.surface, borderRadius: radius.md }]}>
                    <Text variant="mono" color={p === period ? colors.primary.text : colors.text.muted}>{p}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Button label="Confirm" size="full" onPress={confirm} style={styles.confirmBtn} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  trigger: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(26,23,19,0.5)' },
  sheet: { padding: 24, paddingBottom: 36, gap: 20 },
  sheetTitle: { textAlign: 'center' },
  pickers: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  column: { maxHeight: 200, flexGrow: 0 },
  timeCell: { paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center' },
  confirmBtn: { marginTop: 8 },
});
