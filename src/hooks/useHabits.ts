import { useEffect, useState } from 'react';
import { useHabitStore } from '../store/habitStore';
import type { Habit } from '../store/habitStore';
import { calculateStreak, shouldResetStreak } from '../utils/streakUtils';
import { getCurrentDate } from '../utils/dateUtils';

export const useHabits = () => {
  const { habits, loadHabits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion } = useHabitStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await loadHabits();
      setIsLoading(false);
    };

    initialize();
  }, [loadHabits]);

  const addNewHabit = async (habitData: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => {
    await addHabit(habitData);
  };

  const updateExistingHabit = async (id: string, updates: any) => {
    await updateHabit(id, updates);
  };

  const deleteExistingHabit = async (id: string) => {
    await deleteHabit(id);
  };

  const toggleHabit = async (id: string, date?: string) => {
    await toggleHabitCompletion(id, date);
  };

  const getHabitWithUpdatedStreak = (habitId: string) => {
    const habit = habits.find((h: Habit) => h.id === habitId);
    if (!habit) return undefined;

    // Check if streak should be reset
    if (shouldResetStreak(habit)) {
      // Reset streak logic would go here
    }

    // Calculate current streak
    const streakData = calculateStreak(habit);
    
    return {
      ...habit,
      ...streakData
    };
  };

  return {
    habits,
    isLoading,
    addNewHabit,
    updateExistingHabit,
    deleteExistingHabit,
    toggleHabit,
    getHabitWithUpdatedStreak
  };
};