import React from 'react';
import { themed } from '../../../theme';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { fonts } from '../../../assets/fonts';

// App-styled yes/no dialog (e.g. "Delete Chicken Biryani?"). With hideCancel it is a
// single-button notice (e.g. "Account Suspended").
const ConfirmModal = ({ visible, title, message, confirmText = 'Confirm', cancelText = 'Cancel', destructive, hideCancel, onConfirm, onCancel }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel || onConfirm}>
    <TouchableWithoutFeedback onPress={onCancel || onConfirm}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            {!!message && <Text style={styles.message}>{message}</Text>}
            <View style={styles.buttonRow}>
              {!hideCancel && (
                <TouchableOpacity style={[styles.button, styles.cancelButton]} activeOpacity={0.8} onPress={onCancel}>
                  <Text style={[styles.buttonText, styles.cancelText]}>{cancelText}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, destructive ? styles.destructiveButton : styles.confirmButton, hideCancel && styles.singleButton]}
                activeOpacity={0.8}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(21,34,43,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: c.card,
    borderRadius: 22,
    paddingTop: 24,
    paddingBottom: 18,
    paddingHorizontal: 20,
    elevation: 12,
  },
  title: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 18,
    color: c.text,
  },
  message: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: c.textSecondary,
    marginTop: 6,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 22,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: c.border,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: c.primary,
    marginLeft: 10,
  },
  destructiveButton: {
    backgroundColor: c.danger,
    marginLeft: 10,
  },
  singleButton: {
    marginLeft: 0,
  },
  buttonText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 15,
    color: c.onPrimary,
  },
  cancelText: {
    color: c.text,
  },
});

export default ConfirmModal;

// live light/dark styles (see src/theme)
const styles = themed(makeStyles);
