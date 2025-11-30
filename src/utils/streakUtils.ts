import { Habit } from '@store/habitStore';
import { getCurrentDate, isConsecutiveDay, parseDate } from './dateUtils';

export const calculateStreak = (habit: Habit): { currentStreak: number; longestStreak: number; lastCompletedDate?: string } => {
  const { completedDates, lastCompletedDate } = habit;
  
  if (completedDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: habit.longestStreak,
      lastCompletedDate: undefined
    };
  }

  // Sort dates in descending order (newest first)
  const sortedDates = [...completedDates].sort((a, b) => {
    return parseDate(b).getTime() - parseDate(a).getTime();
  });

  const today = getCurrentDate();
  let currentStreak = 0;
  let longestStreak = habit.longestStreak;

  // Check if the habit was completed today
  if (sortedDates[0] === today) {
    currentStreak = 1;
    
    // Calculate streak by checking consecutive days backwards from today
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const currentDate = sortedDates[i];
      const nextDate = sortedDates[i + 1];
      
      if (isConsecutiveDay(nextDate, currentDate)) {
        currentStreak++;
      } else {
        break; // Break if not consecutive
      }
    }
  } else {
    // Check if the habit was completed yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (sortedDates[0] === yesterdayStr) {
      currentStreak = 1;
      
      // Calculate streak by checking consecutive days backwards from yesterday
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const currentDate = sortedDates[i];
        const nextDate = sortedDates[i + 1];
        
        if (isConsecutiveDay(nextDate, currentDate)) {
          currentStreak++;
        } else {
          break; // Break if not consecutive
        }
      }
    }
  }

  // Update longest streak if current streak is greater
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  return {
    currentStreak,
    longestStreak,
    lastCompletedDate: sortedDates[0]
  };
};

export const shouldResetStreak = (habit: Habit): boolean => {
  const { completedDates, lastCompletedDate } = habit;
  
  if (!lastCompletedDate) return false;
  
  const today = getCurrentDate();
  return !isConsecutiveDay(lastCompletedDate, today) && 
         lastCompletedDate !== today &&
         !completedDates.includes(today);
};