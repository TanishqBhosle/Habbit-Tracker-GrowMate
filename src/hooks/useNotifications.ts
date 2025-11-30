import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useHabitStore } from '@store/habitStore';
import { NotificationService } from '@services/notificationService';
import { Habit } from '@store/habitStore';

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

    setupNotifications();
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

    scheduleReminders();
  }, [safeHabits]);

  useEffect(() => {
    // Handle notification responses
    const subscription = Notifications.addNotificationResponseReceivedListener(
      NotificationService.handleNotificationResponse
    );

    return () => {
      subscription.remove();
    };
  }, []);
};