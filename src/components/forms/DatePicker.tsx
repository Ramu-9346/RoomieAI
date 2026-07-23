import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Pressable, Modal, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  style?: ViewStyle;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDate(d: Date) {
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  minDate,
  maxDate,
  style,
}: DatePickerProps) {
  const { colors, radius, spacing, shadows } = useTheme();
  const [open, setOpen] = useState(false);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth());
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectDay = (day: number) => {
    const selected = new Date(viewYear, viewMonth, day);
    if (minDate && selected < minDate) return;
    if (maxDate && selected > maxDate) return;
    onChange(selected);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const isSelected = (day: number) =>
    value &&
    value.getDate() === day &&
    value.getMonth() === viewMonth &&
    value.getFullYear() === viewYear;

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text variant="eyebrow" color={colors.text.muted}>
          {label}
        </Text>
      )}
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
        accessibilityLabel={label ?? 'Date picker'}
      >
        <Text
          variant="body"
          color={value ? colors.text.primary : colors.text.muted}
          style={styles.flex}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Feather name="calendar" size={18} color={colors.text.muted} />
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
            <View style={[styles.calHeader, { borderBottomColor: colors.border.subtle }]}>
              <Pressable onPress={prevMonth} hitSlop={12}>
                <Feather name="chevron-left" size={22} color={colors.text.primary} />
              </Pressable>
              <Text variant="heading" color={colors.text.primary}>
                {MONTHS[viewMonth]} {viewYear}
              </Text>
              <Pressable onPress={nextMonth} hitSlop={12}>
                <Feather name="chevron-right" size={22} color={colors.text.primary} />
              </Pressable>
            </View>

            <View style={styles.dayLabels}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <Text key={i} variant="monoSmall" color={colors.text.muted} style={styles.dayLabel}>
                  {d}
                </Text>
              ))}
            </View>

            <View style={styles.grid}>
              {cells.map((day, i) => (
                <Pressable
                  key={i}
                  onPress={() => day && selectDay(day)}
                  disabled={!day}
                  style={[
                    styles.cell,
                    day &&
                      isSelected(day) && {
                        backgroundColor: colors.primary.default,
                        borderRadius: radius.pill,
                      },
                  ]}
                >
                  {day ? (
                    <Text
                      variant="body"
                      color={isSelected(day) ? colors.white : colors.text.primary}
                    >
                      {day}
                    </Text>
                  ) : null}
                </Pressable>
              ))}
            </View>

            <View style={styles.footer}>
              <Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} size="md" />
            </View>
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
  sheet: { padding: 20, paddingBottom: 36 },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  dayLabels: { flexDirection: 'row', marginBottom: 4 },
  dayLabel: { flex: 1, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: `${100 / 7}%` as unknown as number,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { marginTop: 12, alignItems: 'flex-end' },
});
