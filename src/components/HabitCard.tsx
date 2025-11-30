import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Habit } from '@store/habitStore';
import { getCurrentDate } from '../utils/dateUtils';

interface HabitCardProps {
  habit: Habit;
  onPress: () => void;
  onToggle: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onPress, onToggle }) => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  category: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  streakContainer: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  streakText: {
    ...typography.caption,
    color: theme.colors.surface,
    fontWeight: '600',
  },
});