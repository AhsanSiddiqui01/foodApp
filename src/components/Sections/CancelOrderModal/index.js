import React, { useEffect, useState } from 'react';
import { themeColors } from '../../../theme';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { CANCEL_REASONS } from '../../../utils/orderStatus';

// Admin picks (or types) why an order is being cancelled; the customer sees this reason
const CancelOrderModal = ({ visible, orderLabel, saving, onConfirm, onClose }) => {
  const [reason, setReason] = useState('');
  const [custom, setCustom] = useState('');

  useEffect(() => {
    if (visible) {
      setReason('');
      setCustom('');
    }
  }, [visible]);

  const finalReason = custom.trim() || reason;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>✕</Text>
              </View>
              <Text style={styles.title}>Cancel {orderLabel}?</Text>
              <Text style={styles.message}>The customer will see the reason you choose.</Text>

              <View style={styles.reasons}>
                {CANCEL_REASONS.map((option) => {
                  const selected = !custom.trim() && reason === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      activeOpacity={0.8}
                      style={[styles.reason, selected && styles.reasonSelected]}
                      onPress={() => { setReason(option); setCustom(''); }}
                    >
                      <Text style={[styles.reasonText, selected && styles.reasonTextSelected]}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TextInput
                style={styles.input}
                value={custom}
                onChangeText={setCustom}
                placeholder="Or write another reason..."
                placeholderTextColor={themeColors().placeholder}
                maxLength={120}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.keepButton]} activeOpacity={0.8} onPress={onClose}>
                  <Text style={[styles.buttonText, styles.keepText]}>Keep Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton, (!finalReason || saving) && styles.cancelDisabled]}
                  activeOpacity={0.8}
                  disabled={!finalReason || saving}
                  onPress={() => onConfirm(finalReason)}
                >
                  {saving ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Cancel Order</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CancelOrderModal;
