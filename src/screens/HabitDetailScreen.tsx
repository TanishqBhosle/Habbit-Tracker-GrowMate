import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { useHabits } from '../hooks/useHabits';
import type { Habit } from '../store/habitStore';
import { StreakBadge } from '../components/StreakBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { getCurrentDate } from '../utils/dateUtils';

type HabitDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type HabitDetailScreenRouteProp = RouteProp<RootStackParamList, 'HabitDetail'>;

export const HabitDetailScreen: React.FC = () => {
  const navigation = useNavigation<HabitDetailScreenNavigationProp>();
  const route = useRoute<HabitDetailScreenRouteProp>();
  const { habitId } = route.params;
  const { habits, toggleHabit, deleteExistingHabit } = useHabits();
  const { theme } = useTheme();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const habit = habits.find((h: Habit) => h.id === habitId);
  
  const styles = getStyles(theme);

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text>Habit not found</Text>
      </View>
    );
  }

  const isCompletedToday = habit.completedDates.includes(getCurrentDate());

  const handleToggleHabit = () => {
    toggleHabit(habitId);
  };

  const handleEditHabit = () => {
    navigation.navigate('EditHabit', { habitId });
  };

  const handleDeleteHabit = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteExistingHabit(habitId);
      setShowDeleteDialog(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting habit:', error);
      Alert.alert('Error', 'Failed to delete habit');
    }
  };

  const getCompletionRate = () => {
    if (habit.completedDates.length === 0) return 0;
    const daysSinceCreation = Math.ceil(
      (new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.min(100, Math.round((habit.completedDates.length / Math.max(1, daysSinceCreation)) * 100));
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.header, { borderLeftColor: habit.color }]}>
          <Text style={styles.title}>{habit.title}</Text>
          <Text style={styles.category}>{habit.category}</Text>
        </View>

        {habit.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{habit.description}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.progressContainer}>
            <StreakBadge streak={habit.currentStreak} />
            <Text style={styles.completionText}>
              {habit.completedDates.length} completions • {getCompletionRate()}% success rate
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{habit.currentStreak}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{habit.longestStreak}</Text>
              <Text style={styles.statLabel}>Longest Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{habit.completedDates.length}</Text>
              <Text style={styles.statLabel}>Total Completed</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminder</Text>
          {habit.reminderEnabled && habit.reminderTime ? (
            <Text style={styles.reminderText}>
              Daily at {habit.reminderTime}
            </Text>
          ) : (
            <Text style={styles.reminderText}>No reminder set</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.toggleButton, isCompletedToday && styles.toggleButtonActive]}
          onPress={handleToggleHabit}
        >
          <Text style={[styles.actionButtonText, isCompletedToday && styles.toggleButtonActiveText]}>
            {isCompletedToday ? 'Completed' : 'Mark as Done'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEditHabit}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDeleteHabit}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <ConfirmDialog
        visible={showDeleteDialog}
        title="Delete Habit"
        message={`Are you sure you want to delete "${habit.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteDialog(false)}
        confirmText="Delete"
      />
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
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
  header: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderLeftWidth: 6,
    marginBottom: spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    ...typography.h1,
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  category: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  completionText: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginTop: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
    backgroundColor: theme.colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.xs,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    ...typography.h1,
    color: theme.colors.primary,
    marginBottom: spacing.xxs,
  },
  statLabel: {
    ...typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  reminderText: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    backgroundColor: theme.colors.surface,
    padding: spacing.md,
    borderRadius: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  toggleButton: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  toggleButtonActive: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  toggleButtonActiveText: {
    color: theme.colors.surface,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
  },
  actionButtonText: {
    ...typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
});