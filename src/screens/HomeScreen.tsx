import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { useHabits } from '../hooks/useHabits';
import { HabitCard } from '../components/HabitCard';
import type { Habit } from '../store/habitStore';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { habits, isLoading, toggleHabit } = useHabits();
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  // Ensure habits is always an array
  const safeHabits = Array.isArray(habits) ? habits : [];
  
  const styles = getStyles(theme);

  const handleAddHabit = () => {
    navigation.navigate('AddHabit');
  };

  const handleHabitPress = (habitId: string) => {
    navigation.navigate('HabitDetail', { habitId });
  };

  const handleToggleHabit = (habitId: string) => {
    toggleHabit(habitId);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading habits..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Your Habits</Text>
              <Text style={styles.subtitle}>
                {safeHabits.length} {safeHabits.length === 1 ? 'habit' : 'habits'}
              </Text>
            </View>
            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              <Text style={styles.themeToggleText}>{isDarkMode ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {safeHabits.length === 0 ? (
          <EmptyState
            title="No habits yet"
            description="Create your first habit to start your journey"
            icon="🌱"
          />
        ) : (
          <View style={styles.habitsContainer}>
            {safeHabits.map((habit: Habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onPress={() => handleHabitPress(habit.id)}
                onToggle={() => handleToggleHabit(habit.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
    marginBottom: spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: theme.colors.text,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginTop: spacing.xxs,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  themeToggleText: {
    fontSize: 20,
  },
  habitsContainer: {
    paddingBottom: spacing.xxl,
  },
  addButton: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    ...typography.h1,
    color: theme.colors.surface,
    lineHeight: 60,
  },
});