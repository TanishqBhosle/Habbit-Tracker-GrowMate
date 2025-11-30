import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useHabitStore } from '../store/habitStore';
import { calculateStreak } from '../utils/streakUtils';

export const useStreaks = () => {
  const { habits, updateHabit } = useHabitStore();
  const [appState, setAppState] = useState(AppState.currentState);
  
  // Ensure habits is always an array
  const safeHabits = Array.isArray(habits) ? habits : [];

  useEffect(() => {
    // Update streaks when app comes to foreground
    const handleAppStateChange = (nextAppState: any) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        updateStreaks();
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // @ts-ignore
      subscription?.remove();
    };
  }, [appState, habits]);

  const updateStreaks = async () => {
    for (const habit of safeHabits) {
      const streakData = calculateStreak(habit);
      
      // Only update if streak data has changed
      if (
        streakData.currentStreak !== habit.currentStreak ||
        streakData.longestStreak !== habit.longestStreak ||
        streakData.lastCompletedDate !== habit.lastCompletedDate
      ) {
        await updateHabit(habit.id, streakData);
      }
    }
  };

  return {
    updateStreaks
  };
};