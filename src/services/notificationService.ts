import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Habit } from '../store/habitStore';

// Check if we're running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    // Skip if in Expo Go
    if (isExpoGo) return false;
    
    try {
      const Notifications = await import('expo-notifications');
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  static async createChannel(): Promise<void> {
    // Skip channel creation in Expo Go
    if (isExpoGo) return;
    
    if (Platform.OS === 'android') {
      const Notifications = await import('expo-notifications');
      await Notifications.setNotificationChannelAsync('habit-reminders', {
        name: 'Habit Reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  static async scheduleHabitReminder(habit: Habit): Promise<string | null> {
    // Skip scheduling in Expo Go
    if (isExpoGo) return null;
    
    try {
      const Notifications = await import('expo-notifications');
      // Cancel any existing notifications for this habit
      await this.cancelHabitReminder(habit.id);
      
      if (!habit.reminderEnabled || !habit.reminderTime) {
        return null;
      }

      const [hours, minutes] = habit.reminderTime.split(':').map(Number);
      
      // Create a daily repeating trigger
      const trigger: any = {
        type: 'daily',
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
    // Skip cancellation in Expo Go
    if (isExpoGo) return;
    
    try {
      const Notifications = await import('expo-notifications');
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
    // Skip cancellation in Expo Go
    if (isExpoGo) return;
    
    try {
      const Notifications = await import('expo-notifications');
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all reminders:', error);
    }
  }

  static async handleNotificationResponse(response: any): Promise<void> {
    const habitId = response.notification.request.content.data?.habitId;
    if (habitId) {
      // Handle navigation to habit detail screen
      console.log('Notification tapped for habit:', habitId);
    }
  }
}