import { Habit } from '@store/habitStore';
import { getCurrentDate, getStartOfWeek, getWeekDates } from '../utils/dateUtils';

export interface WeeklyAnalytics {
  weekStartDate: string;
  totalCompleted: number;
  completionRate: number;
  bestHabit?: string;
  missedDays: number;
  categoryBreakdown: Record<string, number>;
}

export class AnalyticsService {
  static calculateWeeklyAnalytics(habits: Habit[]): WeeklyAnalytics {
    const today = new Date();
    const weekStart = getStartOfWeek(today);
    const weekDates = getWeekDates(weekStart);
    
    const weekStartDate = weekDates[0];
    
    // Calculate total completions for the week
    let totalCompleted = 0;
    const categoryBreakdown: Record<string, number> = {};
    
    habits.forEach(habit => {
      const completedThisWeek = habit.completedDates.filter((date: string) => 
        weekDates.includes(date)
      ).length;
      
      totalCompleted += completedThisWeek;
      
      // Update category breakdown
      if (!categoryBreakdown[habit.category]) {
        categoryBreakdown[habit.category] = 0;
      }
      categoryBreakdown[habit.category] += completedThisWeek;
    });
    
    // Calculate completion rate
    const totalPossibleCompletions = habits.length * 7;
    const completionRate = totalPossibleCompletions > 0 
      ? Math.round((totalCompleted / totalPossibleCompletions) * 100) 
      : 0;
    
    // Find best performing habit
    let bestHabit: string | undefined;
    let maxCompletions = 0;
    
    habits.forEach(habit => {
      const completions = habit.completedDates.filter((date: string) => 
        weekDates.includes(date)
      ).length;
      
      if (completions > maxCompletions) {
        maxCompletions = completions;
        bestHabit = habit.title;
      }
    });
    
    // Calculate missed days
    const todayIndex = weekDates.indexOf(getCurrentDate());
    // Calculate expected completions (habits * days passed in the week)
    const expectedCompletions = habits.length * Math.max(0, todayIndex + 1);
    const missedDays = Math.max(0, expectedCompletions - totalCompleted);
    
    return {
      weekStartDate,
      totalCompleted,
      completionRate,
      bestHabit,
      missedDays,
      categoryBreakdown
    };
  }
  
  static getHabitCompletionData(habit: Habit, days: number = 30): { date: string; completed: boolean }[] {
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      data.push({
        date: dateString,
        completed: habit.completedDates.includes(dateString)
      });
    }
    
    return data;
  }
}