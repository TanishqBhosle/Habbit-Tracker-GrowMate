import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Habit } from '@store/habitStore';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    try {
      // Check if we're running in Expo Go
      const isExpoGo = Constants.appOwnership === 'expo';
      
      if (isExpoGo) {
        console.warn('Push notifications are not available in Expo Go. Use a development build instead.');
        return false;
      }
      
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  static async createChannel(): Promise<void> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('habit-reminders', {
        name: 'Habit Reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  static async scheduleHabitReminder(habit: Habit): Promise<string | null> {
    try {
      // Cancel any existing notifications for this habit
      await this.cancelHabitReminder(habit.id);
      
      if (!habit.reminderEnabled || !habit.reminderTime) {
        return null;
      }

      const [hours, minutes] = habit.reminderTime.split(':').map(Number);
      
      // Create a daily repeating trigger
      const trigger: Notifications.DailyTriggerInput = {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hours,
        minute: minutes,
      };

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Habit Reminder',
          body: `Time to complete your habit: ${habit.title}`,
          data: { habitId: habit.id },
        },
        trigger,
      });

      return identifier;
    } catch (error) {
      console.error('Error scheduling habit reminder:', error);
      return null;
    }
  }

  static async cancelHabitReminder(habitId: string): Promise<void> {
    try {
      // Get all scheduled notifications
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      
      // Cancel notifications for this habit
      for (const notification of scheduled) {
        if (notification.content.data?.habitId === habitId) {
          await Notifications.cancelScheduledNotificationAsync(notification.identifier);
        }
      }
    } catch (error) {
      console.error('Error canceling habit reminder:', error);
    }
  }

  static async cancelAllReminders(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all reminders:', error);
    }
  }

  static async handleNotificationResponse(response: Notifications.NotificationResponse): Promise<void> {
    const habitId = response.notification.request.content.data?.habitId;
    if (habitId) {
      // Handle navigation to habit detail screen
      console.log('Notification tapped for habit:', habitId);
    }
  }
}