import * as yup from 'yup';

export const habitValidationSchema = yup.object({
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
  targetDays: yup
    .array()
    .of(yup.number())
    .optional()
});

export type HabitFormData = yup.InferType<typeof habitValidationSchema>;