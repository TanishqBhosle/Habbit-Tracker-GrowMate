import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Habit } from '../store/habitStore';
import { getCurrentDate } from '../utils/dateUtils';

interface HabitCardProps {
  habit: Habit;
  onPress: () => void;
  onToggle: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onPress, onToggle }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const isCompletedToday = habit.completedDates.includes(getCurrentDate());
  
  return (
    <TouchableOpacity 
      style={[styles.container, { borderLeftColor: habit.color }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {habit.title}
          </Text>
          <TouchableOpacity 
            style={[styles.checkbox, isCompletedToday && styles.checkboxChecked]}
            onPress={onToggle}
          >
            {isCompletedToday && (
              <View style={styles.checkmark} />
            )}
          </TouchableOpacity>
        </View>
        
        {habit.description && (
          <Text style={styles.description} numberOfLines={2}>
            {habit.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{habit.category}</Text>
          </View>
          
          {habit.currentStreak > 0 && (
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>🔥 {habit.currentStreak} days</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderLeftWidth: 4,
    marginBottom: spacing.sm,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: theme.colors.text,
    flex: 1,
    marginRight: spacing.md,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.surface,
  },
  description: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: 12,
  },
  category: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  streakContainer: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: 12,
  },
  streakText: {
    ...typography.caption,
    color: theme.colors.surface,
    fontWeight: '600',
  },
});