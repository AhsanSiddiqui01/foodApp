import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';
import { formatMinutes } from '../../../utils/serviceSettings';

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// Pick a time of day; value / result are minutes after midnight (e.g. 570 = 9:30 AM)
const TimePickerModal = ({ visible, title, value, onSave, onClose }) => {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [pm, setPm] = useState(false);

  useEffect(() => {
    if (visible) {
      const hour24 = Math.floor(value / 60) % 24;
      setHour(hour24 % 12 === 0 ? 12 : hour24 % 12);
      setMinute(Math.round((value % 60) / 5) * 5 % 60);
      setPm(hour24 >= 12);
    }
  }, [visible, value]);

  const total = ((hour % 12) + (pm ? 12 : 0)) * 60 + minute;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.preview}>{formatMinutes(total)}</Text>

              <View style={styles.periodRow}>
                {[false, true].map((isPm) => (
                  <TouchableOpacity
                    key={isPm ? 'pm' : 'am'}
                    style={[styles.period, pm === isPm && styles.periodActive]}
                    onPress={() => setPm(isPm)}
                  >
                    <Text style={[styles.periodText, pm === isPm && styles.periodTextActive]}>{isPm ? 'PM' : 'AM'}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Hour</Text>
              <View style={styles.grid}>
                {HOURS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.cell, styles.hourCell, hour === option && styles.cellActive]}
                    onPress={() => setHour(option)}
                  >
                    <Text style={[styles.cellText, hour === option && styles.cellTextActive]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Minute</Text>
              <View style={styles.grid}>
                {MINUTES.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.cell, styles.minuteCell, minute === option && styles.cellActive]}
                    onPress={() => setMinute(option)}
                  >
                    <Text style={[styles.cellText, minute === option && styles.cellTextActive]}>
                      :{String(option).padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                  <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => onSave(total)}>
                  <Text style={styles.buttonText}>Set Time</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TimePickerModal;
