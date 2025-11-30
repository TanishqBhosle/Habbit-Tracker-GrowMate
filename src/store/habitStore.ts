import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import { getCurrentDate } from '../utils/dateUtils';

export interface Habit {
  id: string;
  title: string;
  description?: string;
  category: 'health' | 'productivity' | 'mindfulness' | 'fitness' | 'learning' | 'custom';
  color: string;
  icon?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  reminderTime?: string;
  reminderEnabled: boolean;
  targetDays?: number[];
  createdAt: string;
  currentStreak: number;
  longestStreak: number;
  completedDates: string[];
  lastCompletedDate?: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  loadHabits: () => Promise<void>;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => Promise<void>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitCompletion: (id: string, date?: string) => Promise<void>;
  getHabitById: (id: string) => Habit | undefined;
  resetStreakIfNeeded: (id: string) => Promise<void>;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      isLoading: true,
      error: null,
      
      loadHabits: async () => {
        set({ isLoading: true, error: null });
        try {
          const storedHabits = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
          if (storedHabits) {
            const parsedHabits = JSON.parse(storedHabits);
            // Ensure habits is always an array
            set({ habits: Array.isArray(parsedHabits) ? parsedHabits : [] });
          }
        } catch (error) {
          console.error('Error loading habits:', error);
          set({ error: 'Failed to load habits' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      addHabit: async (habitData: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => {
        try {
          const newHabit: Habit = {
            id: Math.random().toString(36).substr(2, 9),
            ...habitData,
            createdAt: getCurrentDate(),
            currentStreak: 0,
            longestStreak: 0,
            completedDates: []
          };
          
          const { habits } = get();
          const updatedHabits = [...habits, newHabit];
          set({ habits: updatedHabits });
          await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(updatedHabits));
        } catch (error) {
          set({ error: 'Failed to add habit' });
        }
      },
      
      updateHabit: async (id: string, updates: Partial<Habit>) => {
        try {
          const { habits } = get();
          const updatedHabits = habits.map((habit: Habit) => 
            habit.id === id ? { ...habit, ...updates } : habit
          );
          set({ habits: updatedHabits });
          await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(updatedHabits));
        } catch (error) {
          set({ error: 'Failed to update habit' });
        }
      },
      
      deleteHabit: async (id: string) => {
        try {
          const { habits } = get();
          const updatedHabits = habits.filter((habit: Habit) => habit.id !== id);
          set({ habits: updatedHabits });
          await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(updatedHabits));
        } catch (error) {
          set({ error: 'Failed to delete habit' });
        }
      },
      
      toggleHabitCompletion: async (id: string, date: string = getCurrentDate()) => {
        try {
          const { habits } = get();
          const habit = habits.find((h: Habit) => h.id === id);
          
          if (!habit) return;
          
          let updatedCompletedDates = [...habit.completedDates];
          let lastCompletedDate = habit.lastCompletedDate;
          
          // Toggle completion
          if (updatedCompletedDates.includes(date)) {
            // Remove date if already completed
            updatedCompletedDates = updatedCompletedDates.filter(d => d !== date);
            if (lastCompletedDate === date) {
              // Find the new last completed date
              const sortedDates = [...updatedCompletedDates].sort((a, b) => 
                new Date(b).getTime() - new Date(a).getTime()
              );
              lastCompletedDate = sortedDates[0];
            }
          } else {
            // Add date if not completed
            updatedCompletedDates.push(date);
            lastCompletedDate = date;
          }
          
          const updatedHabits = habits.map((h: Habit) => 
            h.id === id 
              ? { ...h, completedDates: updatedCompletedDates, lastCompletedDate } 
              : h
          );
          
          set({ habits: updatedHabits });
          await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(updatedHabits));
        } catch (error) {
          set({ error: 'Failed to toggle habit completion' });
        }
      },
      
      getHabitById: (id: string) => {
        const { habits } = get();
        return habits.find((habit: Habit) => habit.id === id);
      },
      
      resetStreakIfNeeded: async (id: string) => {
        const { habits } = get();
        const habit = habits.find((h: Habit) => h.id === id);
        
        if (!habit) return;
        
        // Implement streak reset logic here if needed
        // For now, we'll just return as the streak calculation is handled elsewhere
      }
    }),
    {
      name: STORAGE_KEYS.HABITS,
      storage: {
        getItem: async (name: string) => {
          const str = await AsyncStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: async (name: string, value: any) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      },
      partialize: (state) => ({ habits: state.habits })
    }
  )
);