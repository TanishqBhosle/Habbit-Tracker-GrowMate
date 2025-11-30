import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  visible, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  if (!visible) return null;
  
  return (
    <View style={styles.overlay}>
      <View style={styles.dialog}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={onCancel}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              {cancelText}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]} 
            onPress={onConfirm}
          >
            <Text style={[styles.buttonText, styles.confirmButtonText]}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    width: '80%',
    maxWidth: 300,
  },
  title: {
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.background,
    marginRight: spacing.sm,
  },
  confirmButton: {
    backgroundColor: theme.colors.danger,
    marginLeft: spacing.sm,
  },
  buttonText: {
    ...typography.bodyLarge,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
  },
  confirmButtonText: {
    color: theme.colors.surface,
  },
});