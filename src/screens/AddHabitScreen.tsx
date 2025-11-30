import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { CategoryPicker } from '../components/CategoryPicker';
import { ColorPicker } from '../components/ColorPicker';
import { TimePicker } from '../components/TimePicker';
import { useHabits } from '../hooks/useHabits';
import { HABIT_FREQUENCIES } from '../utils/constants';

interface FormValues {
  title: string;
  description: string;
  category: 'health' | 'productivity' | 'mindfulness' | 'fitness' | 'learning' | 'custom';
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  reminderTime: string;
  reminderEnabled: boolean;
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters'),
  description: yup
    .string()
    .max(200, 'Description must be less than 200 characters')
    .optional(),
  category: yup
    .string()
    .oneOf(['health', 'productivity', 'mindfulness', 'fitness', 'learning', 'custom'])
    .required('Category is required'),
  color: yup
    .string()
    .required('Color is required'),
  frequency: yup
    .string()
    .oneOf(['daily', 'weekly', 'custom'])
    .required('Frequency is required'),
  reminderTime: yup
    .string()
    .optional(),
  reminderEnabled: yup
    .boolean()
    .required(),
});

export const AddHabitScreen: React.FC = () => {
  const navigation = useNavigation();
  const { addNewHabit } = useHabits();
  const [customCategory, setCustomCategory] = useState('');

  const initialValues: FormValues = {
    title: '',
    description: '',
    category: 'health',
    color: '#6366F1',
    frequency: 'daily',
    reminderTime: '08:00',
    reminderEnabled: false,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const habitData = {
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
      };

      // If custom category is selected and there's text, use it
      if (values.category === 'custom' && customCategory.trim()) {
        habitData.category = customCategory.trim().toLowerCase() as 'custom';
      }

      await addNewHabit(habitData);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Add New Habit</Text>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Title *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter habit title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                />
                {touched.title && errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter habit description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  multiline
                  numberOfLines={3}
                />
                {touched.description && errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
              </View>

              <CategoryPicker
                selectedCategory={values.category}
                onSelectCategory={(category) => setFieldValue('category', category)}
              />

              {values.category === 'custom' && (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Custom Category</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChangeText={setCustomCategory}
                  />
                </View>
              )}

              <ColorPicker
                selectedColor={values.color}
                onSelectColor={(color) => setFieldValue('color', color)}
              />

              <View style={styles.formGroup}>
                <Text style={styles.label}>Frequency</Text>
                <View style={styles.frequencyContainer}>
                  {HABIT_FREQUENCIES.map((freq) => (
                    <TouchableOpacity
                      key={freq.id}
                      style={[
                        styles.frequencyButton,
                        values.frequency === freq.id && styles.selectedFrequencyButton
                      ]}
                      onPress={() => setFieldValue('frequency', freq.id)}
                    >
                      <Text
                        style={[
                          styles.frequencyText,
                          values.frequency === freq.id && styles.selectedFrequencyText
                        ]}
                      >
                        {freq.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Enable Reminder</Text>
                <TouchableOpacity
                  style={[
                    styles.switch,
                    values.reminderEnabled && styles.switchOn
                  ]}
                  onPress={() => setFieldValue('reminderEnabled', !values.reminderEnabled)}
                >
                  <View
                    style={[
                      styles.switchThumb,
                      values.reminderEnabled && styles.switchThumbOn
                    ]}
                  />
                </TouchableOpacity>
              </View>

              {values.reminderEnabled && (
                <TimePicker
                  selectedTime={values.reminderTime}
                  onTimeChange={(time) => setFieldValue('reminderTime', time)}
                />
              )}

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit as any}>
                <Text style={styles.submitButtonText}>Create Habit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: theme.colors.text,
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodyLarge,
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.bodyMedium,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.background,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    ...typography.bodySmall,
    color: theme.colors.danger,
    marginTop: spacing.xs,
  },
  frequencyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  frequencyButton: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedFrequencyButton: {
    backgroundColor: theme.colors.primary,
  },
  frequencyText: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  selectedFrequencyText: {
    color: theme.colors.surface,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: spacing.xs,
  },
  switchOn: {
    backgroundColor: theme.colors.primary,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  submitButtonText: {
    ...typography.h3,
    color: theme.colors.surface,
  },
});