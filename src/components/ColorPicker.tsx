import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { HABIT_COLORS } from '../utils/constants';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  selectedColor, 
  onSelectColor 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Color</Text>
      <View style={styles.colorsContainer}>
        {HABIT_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColorButton
            ]}
            onPress={() => onSelectColor(color)}
          >
            {selectedColor === color && (
              <View style={styles.checkmark} />
            )}
          </TouchableOpacity>
        ))}
      </View>
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
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorButton: {
    borderColor: theme.colors.text,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    alignSelf: 'center',
    marginTop: 10,
  },
});