import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { HABIT_CATEGORIES } from '../utils/constants';

interface CategoryPickerProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoriesContainer}>
        {HABIT_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodyLarge,
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedCategoryButton: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  selectedCategoryText: {
    color: theme.colors.surface,
  },
});