import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';
import {
  RANGE_PRESETS,
  presetRange,
  customRange,
  rangeLabel,
  startOfDay,
  addDays,
  formatDayYear,
} from '../../../utils/dateRange';
import { now } from '../../../utils/serverTime';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

// Month grid for picking a custom range: first tap = start, second tap = end
const CalendarModal = ({ visible, initial, onApply, onClose }) => {
  const today = startOfDay(now());
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [from, setFrom] = useState(initial ? initial.start : null);
  const [to, setTo] = useState(initial ? addDays(initial.end, -1) : null);

  const pick = (day) => {
    if (!from || to) {
      setFrom(day);
      setTo(null);
    } else if (day < from) {
      setTo(from);
      setFrom(day);
    } else {
      setTo(day);
    }
  };

  const firstWeekday = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];
  const isThisMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();
  const end = to || from;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.calendar}>
              <Text style={styles.calendarTitle}>Choose dates</Text>
              <Text style={styles.calendarHint}>
                {from
                  ? `${formatDayYear(from)}${to ? `  →  ${formatDayYear(to)}` : '  →  pick an end date'}`
                  : 'Tap a start date, then an end date'}
              </Text>

              <View style={styles.monthRow}>
                <TouchableOpacity
                  style={styles.monthArrow}
                  onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                >
                  <Text style={styles.monthArrowText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.monthName}>{MONTH_NAMES[month.getMonth()]} {month.getFullYear()}</Text>
                <TouchableOpacity
                  style={[styles.monthArrow, isThisMonth && styles.monthArrowDisabled]}
                  disabled={isThisMonth}
                  onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                >
                  <Text style={styles.monthArrowText}>›</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.grid}>
                {WEEKDAYS.map((day, index) => (
                  <Text key={`w${index}`} style={styles.weekday}>{day}</Text>
                ))}
                {cells.map((day, index) => {
                  if (!day) {
                    return <View key={`e${index}`} style={styles.cell} />;
                  }
                  const future = day > today;
                  const isEdge = (from && day.getTime() === from.getTime()) || (end && day.getTime() === end.getTime());
                  const inRange = from && end && day > from && day < end;
                  return (
                    <TouchableOpacity
                      key={day.getTime()}
                      style={[styles.cell, inRange && styles.cellInRange, isEdge && styles.cellEdge]}
                      disabled={future}
                      onPress={() => pick(day)}
                    >
                      <Text style={[
                        styles.cellText,
                        future && styles.cellTextFuture,
                        inRange && styles.cellTextInRange,
                        isEdge && styles.cellTextEdge,
                      ]}>
                        {day.getDate()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                  <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.applyButton, !from && styles.applyDisabled]}
                  disabled={!from}
                  onPress={() => onApply(customRange(from, to || from))}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Horizontal chips: Today / Yesterday / Last 7 Days / Last 30 Days / custom dates
const DateRangeBar = ({ value, onChange }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const isCustom = value.key === 'custom';

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {RANGE_PRESETS.map((preset) => {
          const selected = value.key === preset.key;
          return (
            <TouchableOpacity
              key={preset.key}
              activeOpacity={0.8}
              style={[styles.chip, selected && styles.chipActive]}
              onPress={() => onChange(presetRange(preset.key))}
            >
              <Text style={[styles.chipText, selected && styles.chipTextActive]}>{preset.label}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.chip, isCustom && styles.chipActive]}
          onPress={() => setCalendarOpen(true)}
        >
          <Text style={[styles.chipText, isCustom && styles.chipTextActive]}>
            📅 {isCustom ? rangeLabel(value) : 'Custom'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {calendarOpen && (
        <CalendarModal
          visible
          initial={isCustom ? value : null}
          onClose={() => setCalendarOpen(false)}
          onApply={(range) => {
            setCalendarOpen(false);
            onChange(range);
          }}
        />
      )}
    </View>
  );
};

export default DateRangeBar;
