import { useEffect } from 'react';
import Constants from 'expo-constants';
import { useHabitStore } from '../store/habitStore';
import { NotificationService } from '../services/notificationService';
import { Habit } from '../store/habitStore';

// Check if we're running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

export const useNotifications = () => {
  const { habits } = useHabitStore();
  
  // Ensure habits is always an array
  const safeHabits = Array.isArray(habits) ? habits : [];

  useEffect(() => {
    // Request permissions and create channel on app start
    const setupNotifications = async () => {
      await NotificationService.requestPermissions();
      await NotificationService.createChannel();
    };

    // Only run setup if not in Expo Go
    if (!isExpoGo) {
      setupNotifications();
    }
  }, []);

  useEffect(() => {
    // Schedule reminders when habits change
    const scheduleReminders = async () => {
      // Cancel all existing reminders
      await NotificationService.cancelAllReminders();
      
      // Schedule reminders for all habits with reminders enabled
      for (const habit of safeHabits) {
        if (habit.reminderEnabled && habit.reminderTime) {
          await NotificationService.scheduleHabitReminder(habit);
        }
      }
    };

    // Only schedule reminders if not in Expo Go
    if (!isExpoGo) {
      scheduleReminders();
    }
  }, [safeHabits]);

  useEffect(() => {
    // Handle notification responses
    // Skip if in Expo Go as notifications are not available
    if (isExpoGo) return;
    
    let unsubscribe: (() => void) | undefined;
    
    const setupNotificationListener = async () => {
      const Notifications = await import('expo-notifications');
      const subscription = Notifications.addNotificationResponseReceivedListener(
        NotificationService.handleNotificationResponse
      );
      unsubscribe = subscription.remove;
    };
    
    setupNotificationListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
};