import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface TimePickerProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ 
  selectedTime, 
  onTimeChange 
}) => {
  const [showPicker, setShowPicker] = useState(false);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];
  
  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };
  
  const parseTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return { hour, minute };
  };
  
  const { hour: selectedHour, minute: selectedMinute } = parseTime(selectedTime);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reminder Time</Text>
      <TouchableOpacity 
        style={styles.timeButton}
        onPress={() => setShowPicker(!showPicker)}
      >
        <Text style={styles.timeText}>{selectedTime}</Text>
      </TouchableOpacity>
      
      {showPicker && (
        <View style={styles.pickerContainer}>
          <View style={styles.column}>
            <Text style={styles.columnLabel}>Hour</Text>
            {hours.map((hour) => (
              <TouchableOpacity
                key={hour}
                style={[
                  styles.pickerItem,
                  selectedHour === hour && styles.selectedPickerItem
                ]}
                onPress={() => onTimeChange(formatTime(hour, selectedMinute))}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    selectedHour === hour && styles.selectedPickerItemText
                  ]}
                >
                  {hour.toString().padStart(2, '0')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.column}>
            <Text style={styles.columnLabel}>Minute</Text>
            {minutes.map((minute) => (
              <TouchableOpacity
                key={minute}
                style={[
                  styles.pickerItem,
                  selectedMinute === minute && styles.selectedPickerItem
                ]}
                onPress={() => onTimeChange(formatTime(selectedHour, minute))}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    selectedMinute === minute && styles.selectedPickerItemText
                  ]}
                >
                  {minute.toString().padStart(2, '0')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodyLarge,
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  timeButton: {
    backgroundColor: theme.colors.background,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeText: {
    ...typography.h3,
    color: theme.colors.text,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  columnLabel: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  pickerItem: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginVertical: 2,
    borderRadius: 8,
  },
  selectedPickerItem: {
    backgroundColor: theme.colors.primary,
  },
  pickerItemText: {
    ...typography.bodyLarge,
    color: theme.colors.textSecondary,
  },
  selectedPickerItemText: {
    color: theme.colors.surface,
  },
});